/* Background music: original beats played live with Web Audio. No recordings, nothing to download.

   "Pulse": a soft kick and rim, a pad that breathes with the kick, and a gentle arpeggio on top, in D
   (D Bm G A) at 96 bpm. It schedules a bar at a time and follows a 32-bar form so a long session
   doesn't hear the same 10 seconds over and over:
     bars 0-7 lighter, 8-15 full, 16-23 full with open hats, 24-27 a breakdown without the kick, 28-31 full.
   Small random changes from bar to bar keep it loose.

   window.Music.start()   start it (call from a tap: browsers block sound before one)
   window.Music.stop(fade)
   window.Music.duck(secs, level)   dip under the crowd and the whistle, then come back
   window.Music.setLevel(v)   play it softer on a page (Learn uses .8)
   window.Music.render(style, bars, gain, only, from)   render to a WAV (base64) for checking
*/
(function () {
'use strict';
const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
function rng(seed) { let s = (seed >>> 0) || 1; return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296; }

/* ---------- instruments, built for one audio context and one style's mix ---------- */
function instruments(c, out, verb, style) {
  const M = k => (style.mix && style.mix[k] != null ? style.mix[k] : 1);
  const noiseBuf = (() => { const b = c.createBuffer(1, c.sampleRate * 2, c.sampleRate), d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; return b; })();
  // soft saturation: gives the kick and bass some harmonics, so they still come through on a phone speaker
  const warm = (() => { const n = 1024, cv = new Float32Array(n); for (let i = 0; i < n; i++) { const x = i / (n - 1) * 2 - 1; cv[i] = Math.tanh(2.2 * x) / Math.tanh(2.2); } return cv; })();
  const shaper = () => { const s = c.createWaveShaper(); s.curve = warm; return s; };
  const env = (t, peak, a, d, sustain = 0, hold = 0, rel = .05) => {
    const g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(peak, t + a);
    if (sustain) { g.gain.setTargetAtTime(peak * sustain, t + a, d / 3); g.gain.setValueAtTime(peak * sustain, t + a + hold); g.gain.linearRampToValueAtTime(0, t + a + hold + rel); }
    else g.gain.setTargetAtTime(0, t + a, d / 4);
    return g;
  };
  const noise = (t, len) => { const s = c.createBufferSource(); s.buffer = noiseBuf; s.start(t, Math.random() * 1.5); s.stop(t + len); return s; };
  const pan = (node, p) => { if (!c.createStereoPanner) return node; const sp = c.createStereoPanner(); sp.pan.value = p; node.connect(sp); return sp; };
  const hatHp = style.hatHp || 7000;
  return {
    kick(t, v) {
      v *= M('kick');
      const o = c.createOscillator(); o.frequency.setValueAtTime(160, t); o.frequency.exponentialRampToValueAtTime(48, t + .1);
      const g = c.createGain(); g.gain.setValueAtTime(.9, t); g.gain.exponentialRampToValueAtTime(.001, t + .4);
      const sh = shaper(), lvl = c.createGain(); lvl.gain.value = v;
      o.connect(g); g.connect(sh); sh.connect(lvl); lvl.connect(out); o.start(t); o.stop(t + .42);
      // a short knock and a click on top, so the beat still reads on a phone speaker
      const k = c.createOscillator(); k.type = 'triangle'; k.frequency.setValueAtTime(230, t); k.frequency.exponentialRampToValueAtTime(120, t + .06);
      const kg = c.createGain(); kg.gain.setValueAtTime(v * .55, t); kg.gain.exponentialRampToValueAtTime(.001, t + .08); k.connect(kg); kg.connect(out); k.start(t); k.stop(t + .1);
      const n = noise(t, .02), hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1800;
      const ng = c.createGain(); ng.gain.setValueAtTime(v * .4, t); ng.gain.exponentialRampToValueAtTime(.001, t + .015); n.connect(hp); hp.connect(ng); ng.connect(out);
    },
    hat(t, v, open) {
      v *= M('hat');
      const n = noise(t, open ? .3 : .06), hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = hatHp;
      const g = c.createGain(); g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.001, t + (open ? .24 : .04));
      n.connect(hp); hp.connect(g); pan(g, .25).connect(out);
    },
    rim(t, v) {
      v *= M('rim');
      const o = c.createOscillator(); o.type = 'triangle'; o.frequency.value = 820;
      const n = noise(t, .02), bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2500; bp.Q.value = 3;
      const g = c.createGain(); g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.001, t + .05);
      o.connect(g); n.connect(bp); bp.connect(g); g.connect(out); g.connect(verb); o.start(t); o.stop(t + .06);
    },
    bass(t, m, dur, v) {
      v *= M('bass');
      const f = mtof(m), o = c.createOscillator(), saw = c.createOscillator(); o.frequency.value = f; saw.type = 'sawtooth'; saw.frequency.value = f;
      const sg = c.createGain(); sg.gain.value = .6;
      const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = style.bassTone || 700; lp.Q.value = .7;
      const g = env(t, v, .012, .5, .75, Math.max(.05, dur - .08), .08), sh = shaper();
      o.connect(lp); saw.connect(sg); sg.connect(lp); lp.connect(g); g.connect(sh); sh.connect(out);
      [o, saw].forEach(x => { x.start(t); x.stop(t + dur + .15); });
    },
    pluck(t, m, dur, v, bright = 2400) {
      v *= M('pluck');
      const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = mtof(m); o.detune.value = (Math.random() - .5) * 8;
      const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.Q.value = 2; lp.frequency.setValueAtTime(bright, t); lp.frequency.exponentialRampToValueAtTime(380, t + .22);
      const g = env(t, v, .004, .45, .25, Math.max(.03, dur - .05), .1);
      o.connect(lp); lp.connect(g); const pn = pan(g, (Math.random() - .5) * .6); pn.connect(out); pn.connect(verb);
      o.start(t); o.stop(t + dur + .3);
    },
    pad(t, notes, dur, v, duck) {
      v *= M('pad');
      const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1300; lp.Q.value = .4;
      const g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .35); g.gain.setValueAtTime(v, t + dur - .3); g.gain.linearRampToValueAtTime(0, t + dur + .3);
      const pump = c.createGain(); pump.gain.value = 1;
      (duck || []).forEach(k => { pump.gain.setValueAtTime(1, k); pump.gain.linearRampToValueAtTime(.35, k + .02); pump.gain.linearRampToValueAtTime(1, k + .3); });
      notes.forEach(m => [-7, 7].forEach(cents => { const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = mtof(m); o.detune.value = cents; o.connect(lp); o.start(t); o.stop(t + dur + .35); }));
      lp.connect(g); g.connect(pump); pump.connect(out); pump.connect(verb);
    },
  };
}

/* ---------- the styles ---------- */
// where we are in the 32-bar form: 0 lighter, 1 full, 2 full with open hats, 3 breakdown (first half) then full
const part = b => Math.floor(b / 8) % 4;
const breakdown = b => part(b) === 3 && b % 8 < 4;

const STYLES = {
  // steady and smooth: a soft pad that breathes with the kick and a gentle arpeggio on top
  pulse: {
    name: 'Pulse', bpm: 96, swing: .5, tone: 8000, hatHp: 7500, bassTone: 850,
    mix: { kick: .38, rim: .9, hat: 1, bass: .1, pad: .075, pluck: .41 },
    // D Bm G A
    chords: [[38, [54, 57, 62]], [35, [54, 59, 62]], [31, [55, 59, 62]], [33, [57, 61, 64]]],
    bar(I, b, T, r) {
      const [root, notes] = this.chords[b % 4], p = part(b), brk = breakdown(b), kicks = brk ? [] : [0, 8];
      if (!brk && r() < .5) kicks.push(10);
      kicks.forEach(i => I.kick(T.at(i), 1));
      if (p) { I.rim(T.at(4), 1); I.rim(T.at(12), 1); }
      for (let i = 0; i < 16; i += 2) I.hat(T.at(i), i % 4 ? 1 : .6);
      if (b % 2 === 1) I.hat(T.at(15), .5);
      if (p === 2) [6, 14].forEach(i => I.hat(T.at(i), .45, true));
      I.bass(T.at(0), root, T.len(7.5), 1); I.bass(T.at(8), root, T.len(7.5), .85);
      I.pad(T.at(0), notes, T.len(16), 1, kicks.map(i => T.at(i)));
      const arp = notes.concat(notes.map(m => m + 12)), seq = arp.concat(arp.slice(1, -1).reverse());
      const every = p ? 1 : 2;
      for (let i = 0; i < 16; i += every) I.pluck(T.at(i), seq[(i + b * 2) % seq.length] + 12, T.len(.8), i % 4 === 0 ? 1 : .65, 1800);
    }
  }
};

/* ---------- playing it ---------- */
function chain(c, dest, tone) {
  // the music bus: a gentle low-pass for warmth, a little room, and a compressor to keep it even
  const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = tone; lp.Q.value = .5;
  const comp = c.createDynamicsCompressor(); comp.threshold.value = -18; comp.ratio.value = 3; comp.attack.value = .01; comp.release.value = .2;
  const out = c.createGain();
  const n = Math.round(c.sampleRate * 1.6), ir = c.createBuffer(2, n, c.sampleRate);
  for (let ch = 0; ch < 2; ch++) { const d = ir.getChannelData(ch); for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-5.5 * i / n); }
  const cv = c.createConvolver(); cv.buffer = ir; const wet = c.createGain(); wet.gain.value = .2;
  const verb = c.createGain(); verb.connect(cv); cv.connect(wet); wet.connect(lp);
  out.connect(lp); lp.connect(comp); comp.connect(dest);
  return { out, verb };
}
function timing(style, t0) {
  const step = 60 / style.bpm / 4, sw = (style.swing - .5) * 2 * step;
  return { at: i => t0 + i * step + (Math.floor(i) % 2 ? sw : 0), len: n => n * step, bar: step * 16 };
}

const VOLUME = .15;         // where the music sits under the effects: about -29 LUFS, some 14 dB under the cheers
let ac = null, master = null, timer = 0, nextBar = 0, barNo = 0, cur = null, I = null, rnd = rng(7), level = 1;
function context() {
  const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
  if (!ac) { try { ac = new AC(); } catch (e) { return null; } }
  if (ac.state === 'suspended' && !document.hidden) ac.resume().catch(() => {});
  return ac;
}
function start(name) {
  const style = STYLES[name] || STYLES.pulse, c = context(); if (!c) return;
  if (cur === style && timer) return;
  stop(.4);
  cur = style; rnd = rng(Date.now() & 0xffff);
  master = c.createGain(); master.gain.setValueAtTime(0, c.currentTime); master.gain.linearRampToValueAtTime(VOLUME * level, c.currentTime + 2);
  master.connect(c.destination);
  const ch = chain(c, master, style.tone); I = instruments(c, ch.out, ch.verb, style);
  nextBar = c.currentTime + .15; barNo = 0;
  const tick = () => {
    if (!cur || c.state !== 'running') return;
    if (nextBar < c.currentTime) nextBar = c.currentTime + .05;     // fell behind (a frozen tab): pick up cleanly
    while (nextBar < c.currentTime + .7) { const T = timing(cur, nextBar); cur.bar(I, barNo++, T, rnd); nextBar += T.bar; }
  };
  tick(); timer = setInterval(tick, 200);
}
function stop(fade = .6) {
  clearInterval(timer); timer = 0;
  if (master && ac) { const m = master, t = ac.currentTime; m.gain.cancelScheduledValues(t); m.gain.setValueAtTime(m.gain.value, t); m.gain.linearRampToValueAtTime(0, t + fade); setTimeout(() => { try { m.disconnect(); } catch (e) {} }, (fade + 3) * 1000); }
  master = null; cur = null;
}
// make room for the crowd and the whistle: dip, hold, then come back
function duck(secs = 2, to = .2) {
  if (!master || !ac) return;
  const g = master.gain, t = ac.currentTime, full = VOLUME * level;
  g.cancelScheduledValues(t); g.setValueAtTime(g.value, t); g.linearRampToValueAtTime(full * to, t + .12);
  g.setValueAtTime(full * to, t + secs); g.linearRampToValueAtTime(full, t + secs + 1.5);
}
// a page can play it softer (Learn plays it a little lower than Puzzles)
function setLevel(v) {
  level = v;
  if (master && ac) { const g = master.gain, t = ac.currentTime; g.cancelScheduledValues(t); g.setValueAtTime(g.value, t); g.linearRampToValueAtTime(VOLUME * level, t + .5); }
}
// pause while the page is hidden, so it doesn't play from a pocket or another tab
document.addEventListener('visibilitychange', () => {
  if (!ac) return;
  if (document.hidden) ac.suspend().catch(() => {});
  else if (cur) ac.resume().catch(() => {});
});

// for checking without speakers: render some bars and hand back a stereo WAV (base64)
async function render(name, bars = 12, gain = 1, only, from = 0) {
  const style = STYLES[name] || STYLES.pulse, rate = 44100, T0 = timing(style, .05), secs = T0.bar * bars + 2;
  const oc = new OfflineAudioContext(2, Math.round(rate * secs), rate), g = oc.createGain(); g.gain.value = gain; g.connect(oc.destination);
  const ch = chain(oc, g, style.tone), all = instruments(oc, ch.out, ch.verb, style), r = rng(7);
  const inst = only ? Object.fromEntries(Object.keys(all).map(k => [k, only.includes(k) ? all[k] : () => {}])) : all;
  for (let b = 0; b < bars; b++) style.bar(inst, from + b, timing(style, .05 + b * T0.bar), r);
  const buf = await oc.startRendering(), L = buf.getChannelData(0), R = buf.getChannelData(1), n = L.length;
  const dv = new DataView(new ArrayBuffer(44 + n * 4)), w = (o, s) => [...s].forEach((ch, i) => dv.setUint8(o + i, ch.charCodeAt(0)));
  w(0, 'RIFF'); dv.setUint32(4, 36 + n * 4, true); w(8, 'WAVEfmt '); dv.setUint32(16, 16, true); dv.setUint16(20, 1, true); dv.setUint16(22, 2, true);
  dv.setUint32(24, rate, true); dv.setUint32(28, rate * 4, true); dv.setUint16(32, 4, true); dv.setUint16(34, 16, true); w(36, 'data'); dv.setUint32(40, n * 4, true);
  let peak = 0;
  for (let i = 0; i < n; i++) for (const [j, d] of [[0, L], [1, R]]) { const v = Math.max(-1, Math.min(1, d[i])); peak = Math.max(peak, Math.abs(d[i])); dv.setInt16(44 + i * 4 + j * 2, v * 32767, true); }
  let bin = ''; const u = new Uint8Array(dv.buffer); for (let i = 0; i < u.length; i += 32768) bin += String.fromCharCode.apply(null, u.subarray(i, i + 32768));
  return { peak, wav: btoa(bin), secs };
}

window.Music = {
  start, stop, duck, setLevel, render, VOLUME,
  styles: Object.keys(STYLES).map(k => ({ id: k, name: STYLES[k].name })),
  get playing() { return !!timer; },
  get style() { return cur ? Object.keys(STYLES).find(k => STYLES[k] === cur) : null; }
};
})();
