/* Learn: the 4 (center back). Format is described in learn-core.js. */
(function () {
const KEYS = [
  {
    key: 'Cover behind the 3 and 2',
    rule: 'When our 3 or 2 steps up to the ball, slide across to cover the space behind.',
    intro: 'Their 7 has the ball on our left, and our 3 steps up to press. Watch the 4.',
    start: {
      us: { 1: [25, 70], 3: [10, 55], 4: [25, 57], 2: [40, 55], 6: [24, 45], 10: [26, 34], 11: [10, 38], 9: [27, 25], 7: [40, 36] },
      them: { 1: [25, 4], 2: [9, 28], 4: [24, 21], 3: [39, 26], 6: [26, 30], 10: [30, 42], 7: [8, 44], 9: [25, 50], 11: [40, 46] },
      ball: 'them:7'
    },
    steps: [
      { t: 1.0, us: { 3: [12, 48.5] }, them: { 7: [9, 45] }, say: 'Our 3 steps up to their 7.' },
      { snap: 's1', t: 1.0, them: { 9: [18, 53] }, us: { 4: [24.5, 57] }, say: 'Their 9 drifts toward the space behind our 3. The 4 stays in the middle.' },
      { t: 1.0, pass: 'them:9', pd: .25, them: { 9: [6, 59] }, say: 'Their 7 slips it in behind our 3...' },
      { t: .9, them: { 9: [10, 66] }, us: { 4: [17, 63], 1: [22, 70] }, say: '...and their 9 is through, with our 4 too far away to help.' },
      { freeze: 'bad',
        text: 'When our 3 stepped up, the 4 stayed in the middle. The space behind the 3 was empty, so one pass put their 9 through.',
        marks: [{ z: [9, 59, 6], c: 'bad' }, { h: ['them:9'], c: 'bad' }],
        options: [
          { t: 'Slide across behind the 3, into the space the 3 left', ok: true,
            why: "The 3 can step up with confidence when the 4 is covering behind. Their 9's run goes straight to the 4." },
          { t: 'Step up next to the 3',
            why: 'Then both of them are in front of the ball, and nobody is behind them.' },
          { t: 'Stay in the middle in case of a cross',
            why: 'Our 2 and 6 can tuck in to cover the middle. The danger was right behind the 3.' }
        ],
        rewind: 's1',
        fix: [
          { t: 1.0, them: { 9: [18, 53] }, us: { 4: [17, 57.5], 2: [33, 57], 6: [22, 47] }, say: 'This time the 4 slides across behind the 3...' },
          { t: 1.0, pass: 'us:4', pd: .25, us: { 4: [8.5, 58] }, them: { 9: [12, 56] }, say: '...so when their 7 slips it in behind, the 4 is already there.' },
          { t: .8, pass: 'us:1', say: 'The 4 plays it safely back to the keeper.' }
        ],
        after: { text: 'When the 3 stepped up, the 4 slid across to cover. Their pass in behind went straight to the 4.',
          marks: [{ h: ['us:3', 'us:4'], c: 'good' }] } }
    ]
  },

  {
    key: 'Step up together',
    rule: 'When the ball goes backward, step up with the other backs. Never stay deep on your own.',
    intro: 'Their 6 plays the ball back. Watch our back line.',
    start: {
      us: { 1: [25, 70], 3: [12, 54], 4: [22, 56], 2: [38, 54], 6: [25, 44], 10: [25, 32], 11: [10, 36], 9: [26, 24], 7: [40, 36] },
      them: { 1: [25, 4], 2: [8, 26], 4: [24, 18], 3: [40, 26], 6: [18, 37], 10: [32, 40], 7: [10, 46], 9: [24, 50], 11: [37, 46] },
      ball: 'them:6'
    },
    steps: [
      { t: 1.0, pass: 'them:2', us: { 11: [9, 31], 10: [20, 30] }, say: 'Their 6 plays it back to their 2.' },
      { snap: 's1', t: 1.1, us: { 3: [12, 48], 2: [38, 48] }, them: { 7: [10, 44], 11: [36, 44.5], 9: [28, 50] }, say: 'Our 3 and 2 step up. The 4 stays deep.' },
      { t: 1.1, pass: 'them:9', air: true, pd: .3, them: { 9: [28, 59] }, say: 'Their 2 plays a long ball over the top...' },
      { t: .8, them: { 9: [29, 63] }, us: { 4: [24, 60], 1: [25, 69] }, say: '...and their 9 is in behind.' },
      { t: .6, shot: [23, 75.8], say: 'Their 9 shoots.' },
      { freeze: 'bad',
        text: 'Our 3 and 2 stepped up, but the 4 stayed deep. That kept their 9 onside, and the long ball put their 9 in behind our line.',
        marks: [{ l: [[1, 48], [49, 48]], c: 'w' }, { h: ['us:3', 'us:2'], c: 'us' }],
        options: [
          { t: 'Step up in line with the 3 and the 2', ok: true,
            why: 'Stepping up together leaves their 9 offside, or at least squeezes the space to run into.' },
          { t: 'Drop even deeper to cover the long ball',
            why: 'Dropping deeper gives their 9 more room and keeps the run onside.' },
          { t: 'Follow their 9 everywhere',
            why: 'Following one player leaves holes in our line. The backs move together, as one line.' }
        ],
        rewind: 's1',
        fix: [
          { t: 1.1, us: { 3: [12, 48], 2: [38, 48], 4: [24, 46.5], 6: [25, 40.5] }, them: { 7: [10, 44], 11: [36, 44.5], 9: [28, 50] },
            say: 'This time the 4 steps up with them...' },
          { t: 1.1, pass: [29, 61], air: true, pd: .3, them: { 9: [28, 58] }, say: '...so when their 2 plays the long ball, their 9 is offside.' }
        ],
        after: { head: 'Offside!', text: 'The 4 stepped up with the 3 and the 2. When the ball was played, their 9 was behind our line (the dotted line), so their 9 was offside.',
          marks: [{ l: [[1, 47.5], [49, 47.5]], c: 'w' }, { h: ['us:3', 'us:4', 'us:2'], c: 'good' }] } }
    ]
  },

  {
    key: "Don't let their 9 turn",
    rule: 'When their 9 gets it facing away from our goal, stay tight behind, on your feet. Make their 9 play it backward.',
    intro: 'Their 6 plays it into their 9. Watch our 4.',
    start: {
      us: { 1: [25, 70], 3: [12, 56], 4: [25, 57], 2: [38, 56], 6: [21, 46], 10: [26, 35], 11: [10, 38], 9: [27, 26], 7: [40, 37] },
      them: { 1: [25, 4], 2: [9, 28], 4: [24, 21], 3: [39, 28], 6: [29, 40], 10: [18, 41], 7: [8, 46], 9: [25, 52], 11: [41, 47] },
      ball: 'them:6'
    },
    steps: [
      { snap: 's0', t: .9, pass: 'them:9', face: { 'them:9': 'up' }, us: { 4: [25, 55.5] }, say: 'Their 6 plays it into their 9, who is facing away from our goal.' },
      { t: .7, us: { 4: [28.5, 52.5] }, them: { 9: [24, 53] }, close: 1, say: 'The 4 tries to nip around their 9 to win it...' },
      { t: .8, them: { 9: [22, 58] }, us: { 4: [27.5, 51.5] }, face: { 'them:9': 'down' }, say: '...but their 9 rolls past and turns toward goal.' },
      { t: .6, shot: [23.5, 75.8], say: 'Their 9 shoots.' },
      { freeze: 'bad',
        text: 'The 4 tried to go around their 9 to win the ball. That opened the way to our goal, and their 9 simply turned.',
        marks: [{ h: ['them:9'], c: 'bad' }],
        options: [
          { t: "Stay tight behind, on your feet, so their 9 can't turn", ok: true,
            why: "From behind, the 4 can see the ball, and their 9 can't see the 4. Their 9 has to play it backward." },
          { t: 'Slide in from behind',
            why: "That's a foul or a miss. Either way, their 9 is in a dangerous spot." },
          { t: 'Back off to have more room',
            why: 'Room is exactly what their 9 wants: space to turn and run at our goal.' }
        ],
        rewind: 's0',
        fix: [
          { t: .9, pass: 'them:9', face: { 'them:9': 'up' }, us: { 4: [25, 55.5] }, say: 'Same pass...' },
          { t: 1.0, them: { 9: [23.5, 52.5] }, us: { 4: [24, 56] }, say: 'This time the 4 stays tight behind their 9, without diving in...' },
          { t: 1.0, them: { 9: [26, 52.5] }, us: { 4: [26.5, 56] }, say: '...and moves with every attempt to turn.' },
          { t: .9, pass: 'them:6', say: 'So their 9 has to play it back.' }
        ],
        after: { text: "The 4 stayed tight behind their 9 and moved with every turn, without diving in. Their 9 couldn't turn, so the danger went backward.",
          marks: [{ h: ['them:9'], c: 'good' }] } }
    ]
  },

  {
    key: 'Play through their press',
    rule: "When their forwards press, don't just kick it away. Find the 6 in the gap between them.",
    intro: 'The 4 has the ball, and their forwards are coming to press. Watch what the 4 does with it.',
    start: {
      us: { 1: [25, 71], 3: [8, 61], 4: [25, 64], 2: [42, 61], 6: [24, 52], 10: [27, 38], 11: [5, 32], 9: [25, 25], 7: [45, 32] },
      them: { 1: [25, 3], 2: [10, 25], 4: [25, 20], 3: [40, 25], 6: [25, 33.5], 10: [20, 45], 7: [13, 51], 9: [29, 57], 11: [37, 51] },
      ball: 'us:4'
    },
    steps: [
      { snap: 's0', t: 1.0, them: { 9: [27, 60], 7: [11, 55], 11: [38, 55] }, us: { 6: [22, 53] }, say: 'Their 9 presses the 4.' },
      { t: 1.1, pass: [26, 27], air: true, pd: .2, say: 'The 4 just kicks it long...' },
      { t: .7, pass: 'them:4', them: { 4: [26, 23] }, us: { 9: [22, 29] }, say: '...their 4 wins it...' },
      { t: .9, pass: 'them:6', air: true, say: '...and it comes straight back.' },
      { freeze: 'bad',
        text: 'Their 9 pressed, so the 4 kicked it long without looking. Our 9 was outnumbered up there, so the ball came straight back, and we never got to play.',
        marks: [{ h: ['us:6'], c: 'good' }, { l: ['us:4', 'us:6'], c: 'good' }],
        options: [
          { t: 'Pass into the 6, who is open between their forwards', ok: true,
            why: 'Their 9 pressing the 4 leaves a gap behind. One pass into the 6 and their whole front line is beaten.' },
          { t: 'Dribble past their 9',
            why: 'A risky dribble right in front of our own goal. If it goes wrong, they score.' },
          { t: 'Pass back to the keeper',
            why: "Sometimes that's fine, but here the 6 was wide open. Going back just invites more pressure." }
        ],
        rewind: 's0',
        fix: [
          { t: 1.0, them: { 9: [27, 60], 7: [11, 55], 11: [38, 55] }, us: { 6: [22, 53] }, say: 'Same press...' },
          { t: .9, pass: 'us:6', face: { 'us:6': [.2, -1] }, say: 'This time the 4 passes into the 6, in the gap between their forwards...' },
          { t: 1.0, us: { 6: [23, 48], 10: [30, 40] }, them: { 10: [19, 47] }, say: '...the 6 turns...' },
          { t: .8, pass: 'us:10', say: '...and finds the 10. Their whole front line is beaten.' }
        ],
        after: { text: 'Instead of kicking it away, the 4 found the 6 in the gap their 9 left behind. Two passes, and their press is beaten.',
          marks: [{ h: ['them:9', 'them:7', 'them:11'], c: 'good' }] } }
    ]
  },

  {
    key: 'When in doubt, clear it',
    rule: 'In our box, under pressure, with no safe pass: clear it high and wide. Never dribble in front of our own goal.',
    intro: 'A cross is coming into our box. Watch what the 4 does with it.',
    start: {
      us: { 1: [25, 71], 3: [16, 62], 4: [25, 63], 2: [37, 62], 6: [24, 52], 10: [27, 42], 11: [10, 46], 9: [26, 32], 7: [42, 50] },
      them: { 1: [25, 4], 2: [9, 32], 4: [24, 24], 3: [39, 30], 6: [28, 37.5], 10: [21, 48.5], 7: [12, 55], 9: [28, 57], 11: [44, 62] },
      ball: 'them:11'
    },
    steps: [
      { t: 1.0, pass: 'us:4', air: true, us: { 4: [27, 64] }, them: { 9: [29.5, 61] }, say: 'Their 11 crosses, and our 4 gets to it first.' },
      { snap: 's1', t: .8, us: { 4: [24, 65] }, them: { 9: [25.5, 62.5], 10: [22, 57.5] }, close: 1, say: 'The 4 tries to dribble out of the box...' },
      { t: .6, pass: 'them:9', them: { 9: [24, 63.5] }, close: 1, say: '...and their 9 takes it away.' },
      { t: .6, shot: [22.5, 75.8], us: { 4: [27.5, 65] }, close: 1, say: 'Shot!' },
      { freeze: 'bad',
        text: 'The 4 tried to dribble out of our own box with their 9 right there. Lose it there, and they are one kick from scoring.',
        marks: [{ h: ['them:9'], c: 'bad' }],
        options: [
          { t: 'Clear it high and wide, out toward the sideline', ok: true,
            why: "When there's no safe pass, getting it far from our goal is the right call. Wide is safer than straight down the middle." },
          { t: 'Pass it across our box to the 3',
            why: "A pass across our own goal is the most dangerous pass in soccer. If it's cut out, they score." },
          { t: 'Shield it and wait for help',
            why: 'Their 9 is already there and more are coming. Waiting in our box is how goals happen.' }
        ],
        rewind: 's1',
        fix: [
          { t: .9, pass: [48, 44], air: true, pd: .2, us: { 4: [26, 64] }, say: 'This time the 4 clears it, high and wide.' },
          { t: .8, us: { 3: [15, 58], 2: [36, 58], 4: [25, 59], 6: [25, 50] }, them: { 9: [28, 54], 10: [20, 48] }, say: 'Danger gone, and our line steps out together.' }
        ],
        after: { text: 'No safe pass and their 9 right there, so the 4 cleared it high and wide: out of our box and away from the middle. Simple and safe.',
          marks: [{ h: ['them:9'], c: 'good' }] } }
    ]
  }
];
window.LEARN_LIB.define({ me: '4', keys: KEYS });
})();
