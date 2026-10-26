/* Shared pieces for Learn mode.

   Each position has 5 keys (role responsibilities). Each key is a short simulation the
   player watches. It stops at freeze frames ("Timeout! See what the 6 just did?") to point
   out a good moment, or a mistake followed by a multiple-choice question and a replay of
   the better choice.

   Field: 50 wide (x, 0 = left touchline) by 75 long (y, 0 = their goal line). We attack up.

   A key:
     { key: 'Get open between their forwards',      // the responsibility
       rule: 'One sentence the player should remember.',
       intro: 'What to watch for (shown before Play).',
       start: { us: { '1': [x, y], ... all 9 }, them: { ... all 9 }, ball: 'us:4' },
       steps: [ ...steps ] }

   A step (everything optional; listed players move together over t seconds):
     { t: 1, us: { '6': [x, y] }, them: { '9': [x, y] },
       pass: 'us:10' | [x, y],    // the ball goes to that player (where that player ends this step) or to a spot
       pd: .3,                    // pass leaves this far into the step (0 to 1)
       air: true,                 // a lofted pass or cross (goes over players)
       shot: [x, y], goal: true,  // a shot; goal plays the crowd
       face: { 'us:6': 'down' },  // which way a player faces (up, down, left, right), for where the ball sits
       look: ['us:6', [x, y]],    // flash a "look over the shoulder" cone toward that spot
       say: 'Caption while this step plays.',
       snap: 's0' }               // remember the field before this step, so a mistake can rewind here

   A freeze frame:
     { freeze: 'good' | 'bad', head: 'See what the 6 just did?' (default), text: '...',
       marks: [ ...marks ], trail: false (hide the auto trail of the player's run and passes),
       // for 'bad' only:
       ask: 'What should the 6 have done instead?', options: [ { t: '...', ok: true, why: '...' }, ... ],
       rewind: 's0', fix: [ ...steps showing the better choice ], after: { text, marks } }
     After a 'bad' freeze and its fix, the steps that follow carry on from where the fix ended.

   Marks (player refs like 'us:6', or [x, y]); c is good, bad, us, them or w (white):
     { a: [from, to], c, dash }   arrow           { l: [from, to], c, x: 1 }  lane (x crosses it out)
     { z: [x, y, r], c }          area            { h: ['them:9', ...], c }    ring players
     { v: ['us:6', [x, y]] }      look cone
     { s: ['them:9', 'us:4'] }    the shadow their 9 casts away from the ball (where a pass can't reach)

   Mirrored sets (the 3 and 2, the 11 and 7) are written for the left side and mirrored, with
   the same text placeholders as the puzzles: {3} {2} {11} {7} {t2} {t3} {t7} {t11} {left} {right} {Left} {Right}.
*/
(function () {
window.LEARN_SETS = window.LEARN_SETS || {};
// positions that have their keys written (the others show as coming soon)
window.LEARN_FILES = { '6': 'learn-6.js', '10': 'learn-10.js', '9': 'learn-9.js', '11': 'learn-wing.js', '7': 'learn-wing.js', '4': 'learn-cb.js', '3': 'learn-wide-cb.js', '2': 'learn-wide-cb.js', '1': 'learn-gk.js' };

const SWAP = { '3': '2', '2': '3', '11': '7', '7': '11' };
const sw = n => (n in SWAP ? SWAP[n] : n);
const TEXT_LEFT = { '{3}': '3', '{2}': '2', '{11}': '11', '{7}': '7', '{t2}': '2', '{t3}': '3', '{t7}': '7', '{t11}': '11',
  '{left}': 'left', '{right}': 'right', '{Left}': 'Left', '{Right}': 'Right' };
const TEXT_RIGHT = { '{3}': '2', '{2}': '3', '{11}': '7', '{7}': '11', '{t2}': '3', '{t3}': '2', '{t7}': '11', '{t11}': '7',
  '{left}': 'right', '{right}': 'left', '{Left}': 'Right', '{Right}': 'Left' };
function fillText(v, map) {
  if (typeof v === 'string') return v.replace(/\{(t?\d+|left|right|Left|Right)\}/g, m => (m in map ? map[m] : m));
  if (Array.isArray(v)) return v.map(x => fillText(x, map));
  if (v && typeof v === 'object') { const o = {}; for (const k in v) o[k] = fillText(v[k], map); return o; }
  return v;
}

const mx = x => Math.round((50 - x) * 100) / 100;
const isPt = v => Array.isArray(v) && typeof v[0] === 'number';
const mref = v => typeof v === 'string' && v.includes(':') ? v.split(':')[0] + ':' + sw(v.split(':')[1]) : isPt(v) ? [mx(v[0]), v[1]] : v;
const mteam = o => { const out = {}; for (const k in o) out[sw(k)] = [mx(o[k][0]), o[k][1]]; return out; };
const FACE = { left: 'right', right: 'left' };
function mmark(m) {
  const c = Object.assign({}, m);
  if (m.a) c.a = m.a.map(mref);
  if (m.l) c.l = m.l.map(mref);
  if (m.v) c.v = m.v.map(mref);
  if (m.s) c.s = m.s.map(mref);
  if (m.h) c.h = m.h.map(mref);
  if (m.z) c.z = [mx(m.z[0]), m.z[1], m.z[2]];
  return c;
}
function mstep(s) {
  const c = Object.assign({}, s);
  if (s.us) c.us = mteam(s.us);
  if (s.them) c.them = mteam(s.them);
  if (s.pass) c.pass = mref(s.pass);
  if (s.shot) c.shot = mref(s.shot);
  if (s.look) c.look = s.look.map(mref);
  if (s.face) { c.face = {}; for (const k in s.face) { const f = s.face[k]; c.face[mref(k)] = isPt(f) ? [-f[0], f[1]] : (FACE[f] || f); } }
  if (s.marks) c.marks = s.marks.map(mmark);
  if (s.fix) c.fix = s.fix.map(mstep);
  if (s.after) c.after = mstep(s.after);
  return c;
}
function mkey(k) {
  const c = Object.assign({}, k);
  c.start = { us: mteam(k.start.us), them: mteam(k.start.them), ball: mref(k.start.ball) };
  c.steps = k.steps.map(mstep);
  return c;
}

window.LEARN_LIB = {
  define(def) {
    window.LEARN_SETS[def.me] = { me: def.me, keys: fillText(def.keys, TEXT_LEFT) };
    if (def.mirrorTo) window.LEARN_SETS[def.mirrorTo] = { me: def.mirrorTo, keys: fillText(def.keys.map(mkey), TEXT_RIGHT) };
  }
};
})();
