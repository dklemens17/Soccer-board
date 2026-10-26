/* Learn: the 9 (striker). Format is described in learn-core.js. */
(function () {
const LINE = y => ({ l: [[1, y], [49, y]], c: 'w' });   // the offside line, across the field
const KEYS = [
  {
    key: 'Time your run in behind',
    rule: "Stay level with their last defender. Start your run when our passer is ready, not before.",
    intro: 'Our 10 has the ball in the middle. Watch when the 9 starts running.',
    start: {
      us: { 1: [25, 68], 3: [11, 50], 4: [25, 54], 2: [39, 50], 6: [25, 42], 10: [24, 32], 11: [7, 22], 9: [28, 19], 7: [43, 22] },
      them: { 1: [25, 3], 2: [11, 15], 4: [24, 16], 3: [37, 15], 6: [22, 26], 10: [28, 37], 7: [12, 38], 9: [26, 46], 11: [37, 36] },
      ball: 'us:10'
    },
    steps: [
      { snap: 's0', t: 1.2, us: { 10: [25, 29], 9: [30, 10] }, them: { 6: [22.5, 25.5] }, say: 'The 10 carries it forward. The 9 is already off and running...' },
      { t: .9, pass: 'us:9', pd: .1, say: '...and the 10 plays it through.' },
      { freeze: 'bad', head: 'Offside! See what the 9 just did?',
        text: "The 9 ran too early. When the 10 played the pass, the 9 was already past their last defender (the dotted line). That's offside, and play stops.",
        marks: [LINE(15), { h: ['us:9'], c: 'bad' }],
        options: [
          { t: "Wait level with their last defender, then go as the 10 plays it", ok: true,
            why: 'Level with the last defender is onside. Starting as the pass is played still gets the 9 in behind first.' },
          { t: 'Run even faster',
            why: "Speed doesn't fix it. Offside is about where you are when the ball is played, not how fast you get there." },
          { t: 'Stand still and wait for a pass to feet',
            why: 'Then their defenders can step in front and win it. The run in behind is the danger. It just needs the right timing.' }
        ],
        rewind: 's0',
        fix: [
          { t: 1.2, us: { 10: [25, 29], 9: [28.5, 16.5] }, them: { 6: [22.5, 25.5] }, say: 'This time the 9 waits, level with their last defender...' },
          { t: 1.0, us: { 9: [30, 9] }, pass: 'us:9', pd: .1, say: '...and goes just as the 10 plays it.' },
          { freeze: 'good', head: 'Onside!',
            text: 'When the 10 played it, the 9 was level with their last defender, so it was onside. Then the 9 raced past.',
            marks: [LINE(15)] },
          { t: .7, us: { 9: [28, 6] }, them: { 1: [25, 2.8], 4: [26, 10.5] }, say: 'Through on goal...' },
          { t: .6, shot: [22.5, -.8], goal: true, say: '...goal!' }
        ],
        after: { text: 'Same run, better timing. The 9 started from the line instead of past it, so it was onside, and the 9 still got there first.',
          marks: [{ h: ['us:9'], c: 'good' }] } }
    ]
  },

  {
    key: 'Hold it up',
    rule: 'With a defender on your back, keep your body between the defender and the ball, and lay it off to a teammate.',
    intro: 'Our 4 plays a long ball up to the 9. Their 4 is right behind the 9.',
    start: {
      us: { 1: [25, 70], 3: [10, 54], 4: [25, 57], 2: [40, 54], 6: [24, 45], 10: [28, 35], 11: [7, 28], 9: [25, 22], 7: [43, 28] },
      them: { 1: [25, 3], 2: [11, 16], 4: [25, 17], 3: [39, 16], 6: [31, 25], 10: [22, 40], 7: [12, 42], 9: [26, 50], 11: [38, 40] },
      ball: 'us:4'
    },
    steps: [
      { snap: 's0', t: 1.3, pass: 'us:9', air: true, face: { 'us:9': 'down' }, us: { 9: [25, 23.5], 10: [29, 30] }, them: { 4: [25, 19.7], 6: [33, 24] },
        say: 'The 4 plays it long, up to the 9. Their 4 is tight behind the 9.' },
      { t: .8, us: { 9: [24, 22] }, face: { 'us:9': 'up' }, them: { 4: [24.5, 20] }, close: 1, say: 'The 9 tries to spin past their 4...' },
      { t: .6, pass: 'them:4', them: { 4: [23, 20.5] }, us: { 9: [26.5, 21.5] }, close: 1, say: '...and runs straight into their 4.' },
      { t: .8, them: { 4: [18.5, 24] }, say: 'Ball lost.' },
      { freeze: 'bad',
        text: 'The 9 tried to turn with their 4 right behind. The defender could see the ball and stepped in. Our 10 was right there for an easy pass.',
        marks: [{ h: ['us:10'], c: 'good' }, { h: ['them:4'], c: 'bad' }],
        options: [
          { t: 'Keep your body between their 4 and the ball, and lay it off to the 10', ok: true,
            why: "Shielding keeps the ball safe. The 10 is facing their goal, so a simple lay-off gets us playing forward." },
          { t: 'Spin the other way',
            why: 'Their 4 is close enough to follow either way. With a defender on your back, turning is the risky choice.' },
          { t: 'Kick it as far forward as possible',
            why: "There's nobody up there. It just gives the ball back to them." }
        ],
        rewind: 's0',
        fix: [
          { t: 1.3, pass: 'us:9', air: true, face: { 'us:9': 'down' }, us: { 9: [25, 23.5], 10: [29, 30] }, them: { 4: [25, 19.7], 6: [33, 24] }, say: 'Same long ball...' },
          { t: .8, us: { 9: [25.5, 24], 10: [31, 28.5] }, them: { 4: [25.5, 20.3] }, say: 'This time the 9 shields the ball, keeping their 4 behind...' },
          { t: .8, pass: 'us:10', face: { 'us:10': 'up' }, say: '...and lays it off to the 10.' },
          { t: 1.0, us: { 10: [33, 22], 9: [22, 16] }, them: { 4: [29, 23], 6: [36.5, 27] }, say: 'Then the 9 spins in behind...' },
          { t: .8, pass: 'us:9', us: { 9: [21, 11] }, say: '...for the ball back.' }
        ],
        after: { text: 'The 9 shielded the ball, laid it off to the 10, and spun in behind for the return. That is holding it up.',
          marks: [{ h: ['us:9'], c: 'good' }] } }
    ]
  },

  {
    key: 'Attack the near post',
    rule: 'When a cross is coming, get in front of your defender and attack the near post.',
    intro: 'Our 11 is about to cross from the left. Watch the 9.',
    start: {
      us: { 1: [25, 66], 3: [10, 46], 4: [25, 50], 2: [40, 46], 6: [27, 38], 10: [30, 24], 11: [6, 12], 9: [27, 13], 7: [42, 20] },
      them: { 1: [25, 3], 2: [10, 10], 4: [24, 9.5], 3: [35, 10], 6: [27, 19], 10: [21, 30], 7: [12, 34], 9: [26, 44], 11: [37, 32] },
      ball: 'us:11'
    },
    steps: [
      { t: 1.0, us: { 11: [5, 6] }, them: { 2: [9, 4.5] }, say: 'The 11 gets to the end line.' },
      { snap: 's1', t: .9, us: { 9: [28, 9] }, them: { 4: [23.5, 8] }, say: 'The 9 drifts in behind their 4...' },
      { t: .9, pass: 'them:4', air: true, pd: .15, them: { 4: [22, 6.5] }, say: '...and their 4 heads the cross away.' },
      { t: .8, pass: 'them:10', air: true, say: 'Cleared.' },
      { freeze: 'bad',
        text: 'The 9 waited behind their 4. The defender was between the 9 and the ball, so the cross was easy to clear.',
        marks: [{ z: [20, 5, 3.5], c: 'good' }, { h: ['them:4'], c: 'bad' }],
        options: [
          { t: 'Dart across in front of their 4 to the near post', ok: true,
            why: 'Getting in front puts the 9 between the defender and the ball. Whoever gets there first wins it.' },
          { t: 'Stand still and wait for the ball to arrive',
            why: 'Standing still lets the defender stay in front. Crosses are won by moving.' },
          { t: 'Run back out of the box for a pass',
            why: "With the ball out wide, the box is where goals come from. The 9 needs to attack it." }
        ],
        rewind: 's1',
        fix: [
          { t: .6, us: { 9: [20, 12] }, say: 'This time the 9 darts across in front of their 4...' },
          { t: .6, us: { 9: [19.5, 6.5] }, pass: 'us:9', air: true, face: { 'us:9': [.3, -1] }, say: '...to the near post...' },
          { t: .5, shot: [23.5, -.8], goal: true, say: '...and flicks it in!' }
        ],
        after: { text: "The 9 got in front of the defender, between their 4 and the ball, and attacked the near post. Defenders hate that run, because they can't watch the ball and the 9 at the same time.",
          marks: [{ h: ['them:4'], c: 'them' }] } }
    ]
  },

  {
    key: 'Shoot early',
    rule: "If you can see the goal and you're in range, shoot early, low, toward the far corner.",
    intro: 'The 10 slips the 9 in at the edge of the box. Watch what the 9 does with it.',
    start: {
      us: { 1: [25, 66], 3: [10, 48], 4: [25, 52], 2: [40, 48], 6: [26, 40], 10: [26, 28], 11: [8, 22], 9: [31, 20], 7: [43, 22] },
      them: { 1: [27, 3], 2: [12, 14], 4: [23, 13], 3: [37, 14], 6: [24, 23], 10: [21, 34], 7: [12, 36], 9: [27, 46], 11: [37, 34] },
      ball: 'us:10'
    },
    steps: [
      { t: .9, pass: 'us:9', us: { 9: [31, 16] }, face: { 'us:9': 'up' }, say: 'The 10 slips it to the 9 at the edge of the box.' },
      { snap: 's1', t: 1.0, us: { 9: [30, 12.5] }, them: { 3: [33.5, 11], 4: [26, 10] }, say: 'The 9 can see the goal, but takes another touch...' },
      { t: .7, us: { 9: [29, 10.5] }, them: { 3: [31, 9.5], 4: [26.5, 9] }, close: 1, say: '...and another...' },
      { t: .6, pass: 'them:3', them: { 3: [30.5, 8] }, close: 1, say: '...and their 3 blocks it.' },
      { t: .6, them: { 3: [35, 7], 4: [25, 11.5] }, say: 'Chance gone.' },
      { freeze: 'bad',
        text: 'The 9 had a clear look at goal from the edge of the box, but kept dribbling. Every touch let their defenders get closer, until there was no shot left.',
        marks: [{ z: [31, 16, 3.2], c: 'good' }, { h: ['them:3'], c: 'bad' }],
        options: [
          { t: 'Shoot first time, low toward the far corner', ok: true,
            why: 'From there the 9 can see the goal. Shooting early catches the keeper and the defenders before they are set.' },
          { t: 'Dribble around the keeper',
            why: 'That takes even more touches, and the defenders are already closing in.' },
          { t: 'Pass it back to the 10',
            why: 'A safe pass, but the 9 was the one with the chance. When you can see the goal, take it.' }
        ],
        rewind: 's1',
        fix: [
          { t: .6, shot: [22, -.8], goal: true, say: 'This time the 9 hits it first time, low to the far corner. Goal!' }
        ],
        after: { text: 'The 9 could see the goal and shot straight away, before their defenders could close in. Early, low and across the keeper.',
          marks: [{ h: ['them:3', 'them:4'], c: 'them' }] } }
    ]
  },

  {
    key: 'Press from the front',
    rule: 'When their defender has the ball, curve your run so your body cuts off the pass across. Push them toward the sideline.',
    intro: 'Their 4 has the ball at the back. Watch how the 9 presses.',
    start: {
      us: { 1: [25, 68], 3: [11, 52], 4: [25, 56], 2: [39, 52], 6: [25, 42], 10: [25, 30], 11: [10, 24], 9: [26, 20], 7: [40, 24] },
      them: { 1: [25, 3], 2: [8, 13], 4: [25, 10], 3: [42, 13], 6: [21, 24], 10: [29, 36], 7: [12, 40], 9: [26, 48], 11: [38, 40] },
      ball: 'them:4'
    },
    steps: [
      { snap: 's0', t: 1.0, us: { 9: [25.5, 14] }, say: 'The 9 sprints straight at their 4...' },
      { t: 1.0, pass: 'them:3', them: { 3: [43, 15] }, say: '...who just passes it across to their 3.' },
      { t: 1.1, them: { 3: [44, 26] }, us: { 7: [41, 30.5], 9: [30, 14] }, say: 'Their 3 has a free run up the right.' },
      { freeze: 'bad',
        text: 'The 9 ran straight at their 4, so the pass across to their 3 was wide open. One pass and our press was beaten.',
        marks: [{ h: ['them:3'], c: 'bad' }],
        options: [
          { t: 'Curve the run so your body blocks the pass across to their 3', ok: true,
            why: "Coming from the side, the 9's shadow covers their 3. Their 4 can only go toward their 2 and the sideline, where our 11 is waiting." },
          { t: 'Run faster, straight at their 4',
            why: "Faster doesn't close the pass across. One touch and the ball is out to their 3." },
          { t: 'Wait at the halfway line',
            why: 'Then they bring the ball up for free. The press only works if the 9 starts it.' }
        ],
        rewind: 's0',
        fix: [
          { t: .6, us: { 9: [31, 16] }, say: 'This time the 9 curves the run...' },
          { t: .6, us: { 9: [30, 11.5] }, say: '...so the 9 blocks the pass across to their 3.' },
          { freeze: 'good', head: 'See the shadow?',
            text: "Coming from the side, the 9 cuts off their 3. Their 4 can't pass across and can only go the other way.",
            marks: [{ s: ['us:9', 'them:4'], len: 15 }, { h: ['them:3'], c: 'them' }] },
          { t: 1.0, pass: 'them:2', them: { 2: [7, 16] }, say: 'So their 4 plays it the only way left, out to their 2.' },
          { t: 1.0, us: { 11: [9, 21], 10: [16, 25], 9: [16, 13] }, them: { 2: [7, 18] }, say: 'Our 11 and 10 are waiting. Their 2 is trapped by the sideline.' },
          { t: .7, pass: 'us:11', close: 1, say: 'And we win it back, high up the field.' }
        ],
        after: { text: 'The 9 pressed so their 4 could only go one way, toward the sideline, where our 11 and 10 were waiting. That is how a 9 starts the press.',
          marks: [{ h: ['us:11', 'us:10'], c: 'good' }] } }
    ]
  }
];
window.LEARN_LIB.define({ me: '9', keys: KEYS });
})();
