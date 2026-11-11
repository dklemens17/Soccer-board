/* Motion for Puzzles: short animated plays on the puzzle field, the way a tactics video tells it.

   A puzzle can carry a `motion` object (see the top of riddles-6.js):
     intro  the build-up that plays when the puzzle opens, ending on the frozen moment you decide in
     after  what happens next, keyed by answer: a teammate's number for a pass to feet ('10'),
            'lead0' / 'carry0' / 'zone0' for the answer zones, 'shoot', 'else'. The best answer's
            entry is also what "Show the best answer" plays. { replace: true, steps } plays instead of
            the normal pass animation.

   A step (everything optional; players listed move together over t seconds):
     { t: 1, us: { '6': [x, y] }, them: { '10': [x, y] },
       pass: 'us:10' | [x, y], pd: .2 (when in the step the ball leaves), air: true, shot: [x, y],
       face: { 'us:6': 'up' | 'down' | 'left' | 'right' },
       head: 'Big caption', sub: 'Smaller line under it' (head: '' hides the caption),
       cam: { at: 'us:10' | 'ball' | [x, y], zoom: 1.4, tilt: .5 } | 'wide',
       tag: { 'them:9': 'PRESS', 'us:10': ['FREE', 'good'] } (null removes one), untag: true,
       focus: ['us:10', 'them:6', ...] (everyone else fades; null brings them back),
       chain: [{ ns: ['them:2', 'them:4', 'them:3'], c: 'good' }] (a line linking players; [] clears),
       hatch: [{ pts: [[x, y] | 'them:4', ...], c: 'gold' | 'good' | 'bad' }] (shaded space; [] clears),
       marks: [{ a: [from, to], c, dash }, { l: [from, to], c, x: true }, { ring: 'us:10', c }] ([] clears),
       wait: 1 (hold after the step) }

   Built to stay light on cheap tablets: one requestAnimationFrame loop, a few SVG paths, and the
   camera is a single CSS transform.
*/
(function () {
'use strict';
const COL = { good: '#7cffb2', bad: '#ff5a5a', gold: '#ffd23f', us: '#ffd23f', them: '#ff7a59', w: '#ffffff' };
const FACES = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
const r2 = n => Math.round(n * 100) / 100;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const lerp = (a, b, u) => [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
const norm = v => { const d = Math.hypot(v[0], v[1]) || 1; return [v[0] / d, v[1] / d]; };
const easeIO = u => u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
const easeOut = u => 1 - (1 - u) * (1 - u);
const clone = o => JSON.parse(JSON.stringify(o));

window.RiddleMotion = function (api) {
  const { M, VW, VH, NS, NUMS, tok, ballEl, pitch, cam, layer, stage, calm } = api;
  let S = null, gen = 0, skipping = false, speed = 1;
  const live = [];                     // things drawn on the field that follow the players

  /* ---------- state ---------- */
  const ref = s => s.split(':');
  const posOf = v => typeof v === 'string' ? (v === 'ball' ? S.ball.at : S[ref(v)[0]][ref(v)[1]]) : v;
  const teamDir = team => team === 'us' ? [0, -1] : [0, 1];
  const dirOf = key => S.dir[key] || teamDir(key.split(':')[0]);
  // where the ball sits for a player facing d: in front, a little to the side (matches the page)
  function footAt(p, d) {
    const k = api.tokYards() * .5 + .35, f = norm(d);
    let side = [-f[1], f[0]]; if (side[0] < 0 || (side[0] === 0 && side[1] < 0)) side = [-side[0], -side[1]];
    return [p[0] + f[0] * k * .78 + side[0] * k * .62, p[1] + f[1] * k * .78 + side[1] * k * .62];
  }
  function put(el, p) { el.style.transition = ''; el.style.left = ((p[0] + M) / VW * 100) + '%'; el.style.top = ((p[1] + M) / VH * 100) + '%'; }
  function placeAll() {
    for (const team of ['us', 'them']) for (const n of NUMS) put(tok[team][n], S[team][n]);
    if (S.ball.h) S.ball.at = footAt(posOf(S.ball.h), dirOf(S.ball.h));
    put(ballEl, S.ball.at);
    drawLive();
  }
  // start from the page's current field: { us, them, ball: 'us:6' | null, ballAt, dir }
  function begin(snap) {
    S = { us: clone(snap.us), them: clone(snap.them), ball: { h: snap.spot ? null : snap.ball, at: snap.ballAt.slice() }, dir: Object.assign({}, snap.dir || {}) };
    if (!S.ball.h && !snap.spot) {
      // a ball lying loose next to someone (a pass into space just arrived): that player has it
      let best = null, bd = 3.6;
      for (const team of ['us', 'them']) for (const n of NUMS) { const d = dist(S[team][n], S.ball.at); if (d < bd) { bd = d; best = team + ':' + n; } }
      if (best) S.ball.h = best;
    }
  }

  /* ---------- the clock ---------- */
  function tween(dur, onFrame) {
    const my = gen;
    return new Promise(res => {
      if (skipping || calm) { onFrame(1); return res(my === gen); }
      let el = 0, last = performance.now();
      const tick = now => {
        if (my !== gen) return res(false);
        el += Math.min(64, now - last) * speed; last = now;
        const u = skipping ? 1 : Math.min(1, el / Math.max(1, dur * 1000));
        onFrame(u);
        if (u >= 1) return res(true);
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }
  const hold = secs => tween(secs, () => {});

  /* ---------- camera ---------- */
  let camTimer = 0, camOn = false;
  function camTo(c, secs, endOf) {
    clearTimeout(camTimer);
    const wide = !c || c === 'wide';
    let tf = 'none';
    if (!wide) {
      const p = c.at == null ? S.ball.at : endOf(c.at), z = c.zoom || 1.4, tilt = api.land() ? 0 : (c.tilt || 0);
      const hx = 50 / z, hy = 50 / z;
      const fx = clamp((p[0] + M) / VW * 100, hx, 100 - hx), fy = clamp((p[1] + M) / VH * 100, hy, 100 - hy);
      const persp = Math.round(pitch.clientHeight * 1.7);
      tf = `perspective(${persp}px) rotateX(${r2(tilt * 26)}deg) scale(${z}) translate(${r2(50 - fx)}%, ${r2(50 - fy)}%)`;
    }
    const instant = skipping || calm || !secs;
    cam.style.transition = instant ? 'none' : `transform ${secs / speed}s cubic-bezier(.45,.05,.25,1)`;
    if (!wide) { pitch.classList.add('cam-on'); camOn = true; }
    cam.style.transform = tf;
    if (wide && camOn) {
      const off = () => { pitch.classList.remove('cam-on'); camOn = false; };
      if (instant) off(); else camTimer = setTimeout(off, secs / speed * 1000 + 30);
    }
  }

  /* ---------- caption, stamp, tags, fading ---------- */
  const capEl = document.createElement('div'); capEl.className = 'mcap'; capEl.setAttribute('aria-live', 'polite');
  capEl.innerHTML = '<b></b><span></span>'; stage.appendChild(capEl);
  const stampEl = document.createElement('div'); stampEl.className = 'mstamp'; stampEl.hidden = true; stage.appendChild(stampEl);
  function fitOverlay(el) {
    const p = pitch.getBoundingClientRect(), s = stage.getBoundingClientRect();
    el.style.left = (p.left - s.left) + 'px'; el.style.width = p.width + 'px';
    return { p, s };
  }
  function caption(head, sub, where) {
    if (!head) { capEl.classList.remove('on'); return; }
    capEl.querySelector('b').textContent = head; capEl.querySelector('span').textContent = sub || '';
    const { p, s } = fitOverlay(capEl);
    capEl.classList.toggle('low', where === 'low');
    capEl.style.top = where === 'low' ? '' : (p.top - s.top) + 'px';
    capEl.style.bottom = where === 'low' ? (s.bottom - p.bottom) + 'px' : '';
    capEl.classList.remove('on'); void capEl.offsetWidth; capEl.classList.add('on');
  }
  function stamp(text) {
    if (calm) return;
    stampEl.textContent = text; stampEl.hidden = false;
    const { p, s } = fitOverlay(stampEl); stampEl.style.top = (p.top - s.top + p.height * .42) + 'px';
    stampEl.classList.remove('play'); void stampEl.offsetWidth; stampEl.classList.add('play');
    const my = gen; setTimeout(() => { if (my === gen) stampEl.hidden = true; }, 1300);
  }
  function setTag(key, v) {
    const [team, n] = ref(key), el = tok[team][n];
    let a = el.querySelector('.mtag-a');
    if (v == null) { if (a) a.remove(); el.classList.remove('tagged'); return; }
    const [text, c] = Array.isArray(v) ? v : [v, 'gold'];
    // their players usually have the player they're closing down below them, so their tags sit on top
    if (!a) { a = document.createElement('b'); a.className = 'mtag-a' + (team === 'them' ? ' up' : ''); a.innerHTML = '<i class="mtag"></i>'; el.appendChild(a); }
    el.classList.add('tagged');
    const i = a.querySelector('.mtag'); i.textContent = text; i.style.setProperty('--tc', COL[c] || c);
  }
  function untagAll() { pitch.querySelectorAll('.mtag-a').forEach(a => a.remove()); pitch.querySelectorAll('.tok.tagged').forEach(t => t.classList.remove('tagged')); }
  function focus(keys) {
    for (const team of ['us', 'them']) for (const n of NUMS) tok[team][n].classList.toggle('faded', !!keys && !keys.includes(team + ':' + n));
  }

  /* ---------- drawings that follow the players ---------- */
  const el = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); (parent || layer).appendChild(e); return e; };
  const gHatch = el('g', {}), gChain = el('g', {}), gMark = el('g', {});
  const defs = el('defs', {});
  for (const k of ['gold', 'good', 'bad']) {
    defs.insertAdjacentHTML('beforeend', `<pattern id="mh-${k}" width="1.5" height="1.5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="1.5" height="1.5" fill="${COL[k]}" fill-opacity=".12"/><rect width=".42" height="1.5" fill="${COL[k]}" fill-opacity=".85"/></pattern>`);
  }
  for (const k of ['gold', 'good', 'bad', 'w']) defs.insertAdjacentHTML('beforeend', `<marker id="mah-${k}" viewBox="0 0 10 10" refX="4" refY="5" markerWidth="4" markerHeight="4" orient="auto" markerUnits="strokeWidth"><path d="M0 0L10 5L0 10Z" fill="${COL[k]}"/></marker>`);
  const path = pts => 'M' + pts.map(p => `${r2(p[0])} ${r2(p[1])}`).join('L');
  function trim(a, b, ka, kb) { const len = dist(a, b); if (len < .1) return [a, b]; const u = [(b[0] - a[0]) / len, (b[1] - a[1]) / len]; return [[a[0] + u[0] * ka, a[1] + u[1] * ka], [b[0] - u[0] * kb, b[1] - u[1] * kb]]; }
  function drawLive() { for (const d of live) d.update(); }
  function setChains(list) {
    gChain.replaceChildren(); for (let i = live.length - 1; i >= 0; i--) if (live[i].kind === 'chain') live.splice(i, 1);
    for (const c of list || []) {
      const under = el('path', { fill: 'none', stroke: 'rgba(5,30,15,.45)', 'stroke-width': 1.15, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, gChain);
      const line = el('path', { fill: 'none', stroke: COL[c.c || 'good'] || c.c, 'stroke-width': .62, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: .95 }, gChain);
      live.push({ kind: 'chain', update() { const d = path(c.ns.map(posOf)); under.setAttribute('d', d); line.setAttribute('d', d); } });
    }
  }
  function setHatch(list) {
    gHatch.replaceChildren(); for (let i = live.length - 1; i >= 0; i--) if (live[i].kind === 'hatch') live.splice(i, 1);
    for (const h of list || []) {
      const c = h.c || 'gold';
      const p = el('path', { fill: `url(#mh-${c})`, stroke: COL[c], 'stroke-width': .28, 'stroke-linejoin': 'round', class: 'mfade' }, gHatch);
      live.push({ kind: 'hatch', update() { p.setAttribute('d', path(h.pts.map(posOf)) + 'Z'); } });
    }
  }
  function setMarks(list) {
    gMark.replaceChildren(); for (let i = live.length - 1; i >= 0; i--) if (live[i].kind === 'mark') live.splice(i, 1);
    const rt = () => api.tokYards() * .55;
    for (const m of list || []) {
      const c = m.c || 'w', col = COL[c] || c;
      if (m.ring) {
        const o = el('circle', { fill: 'none', stroke: col, 'stroke-width': .4, class: 'mfade' }, gMark);
        live.push({ kind: 'mark', update() { const p = posOf(m.ring); o.setAttribute('cx', r2(p[0])); o.setAttribute('cy', r2(p[1])); o.setAttribute('r', r2(rt() + .7)); } });
      }
      const pair = m.a || m.l;
      if (pair) {
        const p = el('path', { fill: 'none', stroke: col, 'stroke-width': m.a ? .55 : .48, 'stroke-linecap': 'round', class: 'mfade' }, gMark);
        if (m.a) p.setAttribute('marker-end', `url(#mah-${c in COL ? c : 'w'})`);
        if (m.dash || m.l) p.setAttribute('stroke-dasharray', '1 1.1');
        const x = m.x ? el('path', { stroke: COL.bad, 'stroke-width': .75, 'stroke-linecap': 'round', fill: 'none', class: 'mfade' }, gMark) : null;
        live.push({ kind: 'mark', update() {
          const isRef = v => typeof v === 'string';
          const [a, b] = trim(posOf(pair[0]), posOf(pair[1]), isRef(pair[0]) ? rt() : 0, isRef(pair[1]) ? rt() + (m.a ? .3 : 0) : 0);
          p.setAttribute('d', path([a, b]));
          if (x) { const q = lerp(a, b, .5), s = 1.3; x.setAttribute('d', `M${r2(q[0] - s)} ${r2(q[1] - s)}L${r2(q[0] + s)} ${r2(q[1] + s)}M${r2(q[0] + s)} ${r2(q[1] - s)}L${r2(q[0] - s)} ${r2(q[1] + s)}`); }
        } });
      }
    }
  }

  /* ---------- one step ---------- */
  async function runStep(st) {
    const moves = [];
    for (const team of ['us', 'them']) for (const n in (st[team] || {})) {
      const from = S[team][n].slice(), to = st[team][n].slice();
      if (dist(from, to) > .01) moves.push({ team, n, from, to });
    }
    const endPos = key => { const [team, n] = ref(key), m = moves.find(x => x.team === team && x.n === n); return m ? m.to : S[team][n]; };
    // which way players face: a ball carrier faces where it runs; a step can turn anyone
    const dirs = [], setDir = (key, d) => dirs.push({ key, from: dirOf(key), to: norm(d) });
    for (const m of moves) if (S.ball.h === m.team + ':' + m.n && dist(m.from, m.to) > 1) setDir(m.team + ':' + m.n, [m.to[0] - m.from[0], m.to[1] - m.from[1]]);
    for (const k in (st.face || {})) setDir(k, FACES[st.face[k]] || st.face[k]);
    let kick = null;
    const target = st.pass || st.shot;
    if (target != null) {
      let recv = null, to;
      if (typeof target === 'string') {
        recv = target; const e = endPos(recv), m = moves.find(x => x.team + ':' + x.n === recv);
        const fd = st.face && st.face[recv] ? (FACES[st.face[recv]] || st.face[recv]) : m && dist(m.from, m.to) > 1.5 ? [m.to[0] - m.from[0], m.to[1] - m.from[1]] : dirOf(recv);
        S.dir[recv] = norm(fd); to = footAt(e, fd);
      } else to = target.slice();
      kick = { recv, to, from: null, pd: st.pd || 0 };
    }
    // where the camera aims: a player's or the ball's position at the end of this step
    const endOf = v => v === 'ball' ? (kick ? kick.to : S.ball.h ? footAt(endPos(S.ball.h), dirOf(S.ball.h)) : S.ball.at) : typeof v === 'string' ? endPos(v) : v;
    if ('cam' in st) camTo(st.cam, st.camT != null ? st.camT : (st.t || 1), endOf);
    if ('head' in st) caption(st.head, st.sub, st.low ? 'low' : '');
    if (st.untag) untagAll();
    for (const k in (st.tag || {})) setTag(k, st.tag[k]);
    if ('focus' in st) focus(st.focus);
    if ('chain' in st) setChains(st.chain);
    if ('hatch' in st) setHatch(st.hatch);
    if ('marks' in st) setMarks(st.marks);
    drawLive();
    const ok = await tween(st.t || 1, u => {
      const e = easeIO(u);
      for (const m of moves) { const p = lerp(m.from, m.to, e); S[m.team][m.n] = p; put(tok[m.team][m.n], p); }
      const du = Math.min(1, u / .3);
      for (const d of dirs) S.dir[d.key] = norm(lerp(d.from, d.to, du));
      if (kick && u >= kick.pd) {
        if (!kick.from) { kick.from = S.ball.at.slice(); S.ball.h = null; }
        const ub = kick.pd >= 1 ? 1 : (u - kick.pd) / (1 - kick.pd);
        S.ball.at = lerp(kick.from, kick.to, st.shot || st.air ? ub : easeOut(ub));
        if (st.air) ballEl.style.transform = `scale(${r2(1 + .55 * Math.sin(Math.PI * ub))})`;
      } else if (S.ball.h) S.ball.at = footAt(posOf(S.ball.h), dirOf(S.ball.h));
      put(ballEl, S.ball.at);
      drawLive();
    });
    ballEl.style.transform = '';
    if (!ok) return false;
    for (const m of moves) S[m.team][m.n] = m.to.slice();
    for (const d of dirs) S.dir[d.key] = d.to;
    if (kick) { S.ball.h = kick.recv; S.ball.at = kick.to.slice(); }
    placeAll();
    if (st.wait && !(await hold(st.wait))) return false;
    return true;
  }
  async function run(steps) {
    const my = gen;
    for (const st of steps) { if (!(await runStep(st)) || my !== gen) return false; }
    return my === gen;
  }

  /* ---------- what the page calls ---------- */
  function clear() {
    gen++; skipping = false;
    caption(''); stampEl.hidden = true; untagAll(); focus(null); setChains([]); setHatch([]); setMarks([]);
    camTo('wide', 0); ballEl.style.transform = '';
  }
  return {
    // the build-up: players start where `intro.start` says and play into the puzzle's frozen moment
    async intro(intro, snap) {
      clear(); begin(snap);
      const finalUs = clone(snap.us), finalThem = clone(snap.them), holder = snap.spot ? null : snap.ball;
      for (const team of ['us', 'them']) Object.assign(S[team], clone((intro.start || {})[team] || {}));
      if (intro.start && 'ball' in intro.start) S.ball.h = intro.start.ball;
      if (intro.start && intro.start.dir) Object.assign(S.dir, intro.start.dir);
      placeAll();
      if (intro.cam) camTo(intro.cam, 0, posOf);
      if (!(await run(intro.steps || []))) return false;
      // anyone not quite home yet settles into place
      const settle = { t: .45, us: {}, them: {} }; let off = false;
      for (const [team, fin] of [['us', finalUs], ['them', finalThem]]) for (const n in fin) if (dist(S[team][n], fin[n]) > .05) { settle[team][n] = fin[n]; off = true; }
      if (S.ball.h !== holder && holder) { settle.pass = holder; off = true; }
      if (off && !(await runStep(settle))) return false;
      if (camOn) { camTo('wide', .45); if (!(await hold(.45))) return false; }
      caption('');
      return true;
    },
    // what happens after an answer: carries on from the field as it is
    async after(steps, snap) { skipping = false; const my = gen; begin(snap); const ok = await run(steps); if (ok) caption(''); return ok && my === gen ? clone(S) : null; },
    caption, stamp, clear,
    skip() { skipping = true; caption(''); },
    setSpeed(x) { speed = x; }
  };
};

/* ---------- an automatic build-up, for puzzles without a written one ----------
   Nobody passes (most prompts don't say where the ball came from). The team without the ball closes in
   toward it, the team with it moves up in support, anyone with a movement arrow runs along it, and the
   ball carrier brings the ball in. On a set piece the ball stays on its spot. Starting spots that would
   put two players on top of each other, or make them run through each other, are dropped. */
window.RiddleMotion.autoIntro = function (r) {
  const holder = typeof r.ball === 'string' ? ['us', r.ball] : [r.ball.team, r.ball.n];
  const atk = holder[0], up = team => team === 'us' ? -1 : 1, fin = { us: r.us, them: r.them };
  const ball = r.ballAt || fin[holder[0]][holder[1]];
  let seed = 7; for (const ch of r.title) seed = (Math.imul(seed, 31) + ch.charCodeAt(0)) >>> 0;
  const rnd = () => (seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296;
  const start = { us: {}, them: {} }, R2 = p => [r2(p[0]), r2(p[1])];
  for (const team of ['us', 'them']) for (const n in fin[team]) {
    const p = fin[team][n];
    let q;
    if (n === '1') q = [p[0] + (ball[0] - p[0]) * -.04, p[1] - up(team) * .8];
    else if (team === atk) q = [p[0] + (rnd() - .5) * 1.4, p[1] - up(team) * (1.8 + rnd() * 1.4)];
    else { const d = norm([p[0] - ball[0], p[1] - ball[1]]), k = 1.5 + rnd() * 1.3; q = [p[0] + d[0] * k, p[1] + d[1] * k]; }
    start[team][n] = R2(q);
  }
  for (const a of r.arrows || []) {
    let best = null, bd = 3.5;
    for (const n in fin[a.team]) { const d = dist(fin[a.team][n], a.from); if (d < bd) { bd = d; best = n; } }
    if (best) { const p = fin[a.team][best], d = norm([a.to[0] - a.from[0], a.to[1] - a.from[1]]); start[a.team][best] = R2([p[0] - d[0] * 3.2, p[1] - d[1] * 3.2]); }
  }
  const [ht, hn] = holder, hp = fin[ht][hn];
  if (r.ballAt) start[ht][hn] = hp.slice();
  else if (r.facing === 'back') start[ht][hn] = R2([hp[0], hp[1] - 1.6]);
  else start[ht][hn] = R2([hp[0], hp[1] - up(ht) * 2.6]);
  // drop starting spots that collide, one at a time, until none do
  const keys = []; for (const team of ['us', 'them']) for (const n in fin[team]) keys.push([team, n]);
  for (let guard = 0; guard < 40; guard++) {
    let bad = null;
    outer: for (let i = 0; i < keys.length; i++) for (let j = i + 1; j < keys.length; j++) {
      const [ta, na] = keys[i], [tb, nb] = keys[j];
      const a0 = start[ta][na], a1 = fin[ta][na], b0 = start[tb][nb], b1 = fin[tb][nb];
      if (dist(a0, a1) < .01 && dist(b0, b1) < .01) continue;
      for (let u = 0; u <= 1; u += .125) {
        const d = dist(lerp(a0, a1, u), lerp(b0, b1, u)), need = u === 0 ? 4.2 : 2.8;
        if (d < need && d < dist(a1, b1) - .05) { bad = dist(a0, a1) >= dist(b0, b1) ? [ta, na] : [tb, nb]; break outer; }
      }
    }
    if (!bad) break;
    start[bad[0]][bad[1]] = fin[bad[0]][bad[1]].slice();
  }
  const moveUs = {}, moveThem = {};
  for (const n in fin.us) if (dist(start.us[n], fin.us[n]) > .01) moveUs[n] = fin.us[n];
  for (const n in fin.them) if (dist(start.them[n], fin.them[n]) > .01) moveThem[n] = fin.them[n];
  const ballStart = r.ballAt || start[ht][hn];
  return {
    start: { us: start.us, them: start.them, ball: r.ballAt ? null : ht + ':' + hn },
    cam: { at: ballStart, zoom: 1.45, tilt: .45 },
    steps: [{ t: 1.6, us: moveUs, them: moveThem, cam: { at: ball, zoom: 1.3, tilt: .45 } }, { t: .8, cam: 'wide' }]
  };
};
})();
