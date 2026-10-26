/* Shared pieces for the position riddle sets.

   Each position has its own file (riddles-9.js, riddles-gk.js, ...) that calls
   RIDDLE_LIB.defineSet({ me, chapters, riddles }). The page loads only the file
   for the position the player picks.

   Coordinates, answer formats and grading are described at the top of riddles-6.js.

   Mirrored sets: the wide center backs (3 and 2) and the wingers (11 and 7) play the
   same situations on opposite sides. Those sets are written once for the left side
   and mirrored. In their text, write side-specific words as placeholders so the
   mirror reads correctly:
     {3} {2} {11} {7}      our numbers        {t2} {t3} {t7} {t11}   their numbers
     {left} {right} {Left} {Right}
   On the left-side set they print as written; on the mirrored set they swap.
*/
(function () {
const LIB = window.RIDDLE_LIB = window.RIDDLE_LIB || {};
window.RIDDLE_SETS = window.RIDDLE_SETS || {};

LIB.P = (g, t, w, extra) => Object.assign({ g, t, w }, extra || {});
LIB.TOO_SAFE = w => LIB.P(1, 'Too safe', w);
LIB.FAR = LIB.P(0, 'Out of range', 'Way too far from goal. Keep the ball and build the attack.');

window.POSITIONS = [
  { n: '1',  name: 'Keeper',          title: 'the keeper',  file: 'riddles-gk.js', soon: true },
  { n: '3',  name: 'Left defender',   title: 'the 3',       file: 'riddles-wide-cb.js', soon: true },
  { n: '4',  name: 'Center back',     title: 'the 4',       file: 'riddles-cb.js', soon: true },
  { n: '2',  name: 'Right defender',  title: 'the 2',       file: 'riddles-wide-cb.js', soon: true },
  { n: '6',  name: 'Defensive mid',   title: 'the 6',       file: 'riddles-6.js' },
  { n: '10', name: 'Attacking mid',   title: 'the 10',      file: 'riddles-10.js' },
  { n: '11', name: 'Left wing',       title: 'the 11',      file: 'riddles-wing.js', soon: true },
  { n: '9',  name: 'Striker',         title: 'the 9',       file: 'riddles-9.js' },
  { n: '7',  name: 'Right wing',      title: 'the 7',       file: 'riddles-wing.js', soon: true }
];

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
const mp = p => [mx(p[0]), p[1]];
const swapKeys = o => { const out = {}; for (const k in o) out[sw(k)] = o[k]; return out; };
const mzone = z => { const c = z.slice(); c[0] = mx(c[0]); if (c.length > 6 && c[6] != null) c[6] = sw(c[6]); if (c.length > 7 && c[7] != null) c[7] = sw(c[7]); return c; };

function mirror(r) {
  const m = JSON.parse(JSON.stringify(r));
  m.us = {}; for (const k in r.us) m.us[sw(k)] = mp(r.us[k]);
  m.them = {}; for (const k in r.them) m.them[sw(k)] = mp(r.them[k]);
  if (r.arrows) m.arrows = r.arrows.map(a => Object.assign({}, a, { from: mp(a.from), to: mp(a.to) }));
  if (r.pass) { m.pass = swapKeys(r.pass); for (const k in m.pass) if (m.pass[k].cut) m.pass[k].cut = sw(m.pass[k].cut); }
  if (r.lead) m.lead = r.lead.map(mzone);
  if (r.zones) m.zones = r.zones.map(mzone);
  if (r.carry) m.carry = r.carry.map(mzone);
  if (r.shoot && r.shoot.end) m.shoot.end = mp(r.shoot.end);
  if (typeof r.ball === 'string') m.ball = sw(r.ball);
  else if (r.ball) m.ball = { team: r.ball.team, n: sw(r.ball.n) };
  if (r.best) { m.best = Object.assign({}, r.best); if (r.best.to) m.best.to = sw(r.best.to); if (r.best.at) m.best.at = mp(r.best.at); }
  if (r.follow) m.follow = r.follow.map(f => Object.assign({}, f, { n: sw(f.n), dx: f.dx ? -f.dx : f.dx }));
  if (r.payoff) m.payoff = { to: sw(r.payoff.to) };
  m.me = sw(r.me);
  return m;
}

LIB.defineSet = function (def) {
  const riddles = def.riddles.map(r => Object.assign({ me: def.me }, r));
  window.RIDDLE_SETS[def.me] = { me: def.me, chapters: fillText(def.chapters, TEXT_LEFT), riddles: riddles.map(r => fillText(r, TEXT_LEFT)) };
  if (def.mirrorTo) {
    window.RIDDLE_SETS[def.mirrorTo] = { me: def.mirrorTo, chapters: fillText(def.chapters, TEXT_RIGHT),
      riddles: riddles.map(r => fillText(mirror(r), TEXT_RIGHT)) };
  }
};
})();
