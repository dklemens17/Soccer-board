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

/* ---------- instruments, built for one audio context and one style's mix ----------
   Kept light on purpose, so it runs on cheap tablets: each note is just a sound source and a volume
   envelope, and the filters, distortion and stereo placement are built once and shared. No filter
   moves while a note plays (those are costly to compute). */
function instruments(c, out, verb, style) {
  const M = k => (style.mix && style.mix[k] != null ? style.mix[k] : 1);
  const noiseBuf = (() => { const b = c.createBuffer(1, c.sampleRate * 2, c.sampleRate), d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; return b; })();
  const noise = (t, len) => { const s = c.createBufferSource(); s.buffer = noiseBuf; s.start(t, Math.random() * 1.5); s.stop(t + len); return s; };
  // soft saturation: gives the kick and bass some harmonics, so they still come through on a phone speaker
  const warm = (() => { const n = 1024, cv = new Float32Array(n); for (let i = 0; i < n; i++) { const x = i / (n - 1) * 2 - 1; cv[i] = Math.tanh(2.2 * x) / Math.tanh(2.2); } return cv; })();
  const shaper = () => { const s = c.createWaveShaper(); s.curve = warm; return s; };
  const filter = (type, f, q, to) => { const x = c.createBiquadFilter(); x.type = type; x.frequency.value = f; x.Q.value = q; if (to) x.connect(to); return x; };
  const gain = (v, to) => { const g = c.createGain(); g.gain.value = v; if (to) g.connect(to); return g; };
  const side = p => { if (!c.createStereoPanner) return out; const sp = c.createStereoPanner(); sp.pan.value = p; sp.connect(out); return sp; };
  const env = (t, peak, a, d, sustain = 0, hold = 0, rel = .05) => {
    const g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(peak, t + a);
    if (sustain) { g.gain.setTargetAtTime(peak * sustain, t + a, d / 3); g.gain.setValueAtTime(peak * sustain, t + a + hold); g.gain.linearRampToValueAtTime(0, t + a + hold + rel); }
    else g.gain.setTargetAtTime(0, t + a, d / 4);
    return g;
  };
  const left = side(-.3), right = side(.3);
  // shared buses
  const kickBus = gain(M('kick')), kickSat = shaper(); kickBus.connect(kickSat); kickSat.connect(out);
  const clickHp = filter('highpass', 1800, .7, out);
  const hatHp = filter('highpass', style.hatHp || 7000, .7, right);
  const rimBp = filter('bandpass', 2500, 3, out); rimBp.connect(verb);
  const bassLp = filter('lowpass', style.bassTone || 700, .7, null), bassSat = shaper(); bassLp.connect(bassSat); bassSat.connect(out);
  const pluckL = gain(1, left), pluckR = gain(1, right); pluckL.connect(verb); pluckR.connect(verb);
  // the pluck's tone: a soft, rounded saw (a few harmonics fading off), made once
  const H = 10, re = new Float32Array(H + 1), im = new Float32Array(H + 1);
  for (let k = 1; k <= H; k++) im[k] = Math.pow(.62, k - 1) / k;
  const pluckWave = c.createPeriodicWave(re, im);
  return {
    kick(t, v) {
      const o = c.createOscillator(); o.frequency.setValueAtTime(160, t); o.frequency.exponentialRampToValueAtTime(48, t + .1);
      const g = c.createGain(); g.gain.setValueAtTime(.9 * v, t); g.gain.exponentialRampToValueAtTime(.001, t + .4);
      o.connect(g); g.connect(kickBus); o.start(t); o.stop(t + .42);
      // a short knock and a click on top, so the beat still reads on a phone speaker
      v *= M('kick');
      const k = c.createOscillator(); k.type = 'triangle'; k.frequency.setValueAtTime(230, t); k.frequency.exponentialRampToValueAtTime(120, t + .06);
      const kg = c.createGain(); kg.gain.setValueAtTime(v * .55, t); kg.gain.exponentialRampToValueAtTime(.001, t + .08); k.connect(kg); kg.connect(out); k.start(t); k.stop(t + .1);
      const n = noise(t, .02), ng = c.createGain(); ng.gain.setValueAtTime(v * .4, t); ng.gain.exponentialRampToValueAtTime(.001, t + .015); n.connect(ng); ng.connect(clickHp);
    },
    hat(t, v, open) {
      v *= M('hat');
      const n = noise(t, open ? .3 : .06), g = c.createGain(); g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.001, t + (open ? .24 : .04));
      n.connect(g); g.connect(hatHp);
    },
    rim(t, v) {
      v *= M('rim');
      const o = c.createOscillator(); o.type = 'triangle'; o.frequency.value = 820;
      const g = c.createGain(); g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.001, t + .05);
      const n = noise(t, .02); n.connect(g); o.connect(g); g.connect(rimBp); g.connect(out); o.start(t); o.stop(t + .06);
    },
    bass(t, m, dur, v) {
      v *= M('bass');
      const f = mtof(m), o = c.createOscillator(), saw = c.createOscillator(); o.frequency.value = f; saw.type = 'sawtooth'; saw.frequency.value = f;
      const g = env(t, v, .012, .5, .75, Math.max(.05, dur - .08), .08), sg = gain(.6, g);
      o.connect(g); saw.connect(sg); g.connect(bassLp);
      [o, saw].forEach(x => { x.start(t); x.stop(t + dur + .15); });
    },
    pluck(t, m, dur, v) {
      v *= M('pluck');
      const o = c.createOscillator(); o.setPeriodicWave(pluckWave); o.frequency.value = mtof(m); o.detune.value = (Math.random() - .5) * 8;
      const g = env(t, v, .004, .3, .2, Math.max(.03, dur - .05), .12);
      o.connect(g); g.connect(Math.random() < .5 ? pluckL : pluckR);
      o.start(t); o.stop(t + dur + .3);
    },
    pad(t, notes, dur, v, duck) {
      v *= M('pad');
      const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1300; lp.Q.value = .4;
      const g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .35); g.gain.setValueAtTime(v, t + dur - .3); g.gain.linearRampToValueAtTime(0, t + dur + .3);
      (duck || []).forEach(k => { g.gain.setValueAtTime(v, k); g.gain.linearRampToValueAtTime(v * .35, k + .02); g.gain.linearRampToValueAtTime(v, k + .3); });
      notes.forEach(m => [-7, 7].forEach(cents => { const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = mtof(m); o.detune.value = cents; o.connect(lp); o.start(t); o.stop(t + dur + .35); }));
      lp.connect(g); g.connect(out); g.connect(verb);
    }
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
    mix: { kick: .3, rim: .63, hat: 1.1, bass: .112, pad: .075, pluck: .33 },
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
      for (let i = 0; i < 16; i += every) I.pluck(T.at(i), seq[(i + b * 2) % seq.length] + 12, T.len(.8), i % 4 === 0 ? 1 : .65);
    }
  }
};

/* ---------- playing it ---------- */
function chain(c, dest, tone) {
  // the music bus: a gentle low-pass for warmth and a little room. The room is two soft echoes, one
  // each side, that feed back and darken as they fade (much cheaper than a convolution reverb).
  const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = tone; lp.Q.value = .5;
  const out = c.createGain(); out.connect(lp); lp.connect(dest);
  const verb = c.createGain(), dark = c.createBiquadFilter(); dark.type = 'lowpass'; dark.frequency.value = 2200; verb.connect(dark);
  [[.171, -.6], [.237, .6]].forEach(([time, p]) => {
    const d = c.createDelay(1), fb = c.createGain(), wet = c.createGain(); d.delayTime.value = time; fb.gain.value = .42; wet.gain.value = .3;
    dark.connect(d); d.connect(fb); fb.connect(d); d.connect(wet);
    if (c.createStereoPanner) { const sp = c.createStereoPanner(); sp.pan.value = p; wet.connect(sp); sp.connect(lp); } else wet.connect(lp);
  });
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
  // background music doesn't need to react instantly, so ask for bigger buffers: more slack for a slow tablet
  if (!ac) { try { ac = new AC({ latencyHint: 'playback' }); } catch (e) { try { ac = new AC(); } catch (e2) { return null; } } }
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
