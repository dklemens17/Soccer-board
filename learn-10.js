/* Learn: the 10 (attacking midfielder). Format is described in learn-core.js. */
(function () {
const KEYS = [
  {
    key: 'Find the pocket',
    rule: "Get into the gap between their midfielders and their back line. That's where you can turn and hurt them.",
    intro: 'Our 6 has the ball. Watch where the 10 goes to get it.',
    start: {
      us: { 1: [25, 70], 3: [10, 52], 4: [25, 56], 2: [40, 52], 6: [25, 44], 10: [29, 31], 11: [6, 26], 9: [25, 18], 7: [44, 26] },
      them: { 1: [25, 3], 2: [10, 15], 4: [25, 13], 3: [40, 15], 6: [25, 27], 10: [21, 38], 7: [12, 40], 9: [24, 49], 11: [38, 40] },
      ball: 'us:6'
    },
    steps: [
      { snap: 's0', t: 1.2, us: { 10: [31, 17] }, them: { 3: [35, 15], 6: [26, 30] }, say: 'The 10 runs up toward their back line...' },
      { t: 1.0, pass: 'us:2', say: '...so the 6 has nobody to find in the middle, and goes sideways.' },
      { freeze: 'bad',
        text: "He ran up onto their back line, next to our 9. Their backs can mark both of them, and there's nobody in the space between their midfield and their defense.",
        marks: [{ z: [29, 23, 5], c: 'good' }, { h: ['them:3'], c: 'bad' }],
        options: [
          { t: 'Stop in the gap between their 6 and their back line', ok: true,
            why: "In the pocket, their 6 is behind him and their backs don't want to step out. The 6 can find him, and he can turn." },
          { t: 'Come all the way back to stand next to our 6',
            why: "Then he's in front of their whole midfield. He gets the ball, but there's nothing to turn into." },
          { t: 'Stay where he started, beside their 6',
            why: 'Their 6 is right there to step in and win any pass to him.' }
        ],
        rewind: 's0',
        fix: [
          { t: 1.2, us: { 10: [31, 23] }, say: 'This time he stops in the gap between their 6 and their back line.' },
          { t: .9, pass: 'us:10', face: { 'us:10': [.4, -1] }, say: 'The 6 finds him, and he takes it half-turned.' },
          { t: 1.0, us: { 10: [33, 19], 9: [23, 14] }, them: { 3: [38, 16.5], 4: [27, 14] }, say: 'He turns, and now their back line has a problem.' }
        ],
        after: { text: 'In the pocket he could get the ball and turn. Now their defenders have to choose: step up to him and leave space behind, or let him run at them.',
          marks: [{ h: ['them:3', 'them:4'], c: 'them' }] } }
    ]
  },

  {
    key: 'Open up on the half-turn',
    rule: 'Open your body before the ball arrives so you can see their goal. If the 9 is running, play him in.',
    intro: 'Our 4 has the ball. Watch how the 10 stands when the pass comes to him.',
    start: {
      us: { 1: [25, 70], 3: [9, 55], 4: [22, 58], 2: [41, 55], 6: [30, 46], 10: [17, 36], 11: [5, 28], 9: [22, 21], 7: [44, 28] },
      them: { 1: [25, 3], 2: [10, 17], 4: [26, 15], 3: [39, 18], 6: [24, 30], 10: [27, 41], 7: [10, 45], 9: [28, 51], 11: [38, 44] },
      ball: 'us:4'
    },
    steps: [
      { snap: 's0', t: 1.0, pass: 'us:10', face: { 'us:10': 'down' }, them: { 6: [21, 32.5] }, say: 'The 4 plays it into the 10. He takes it facing our own goal.' },
      { t: .9, us: { 9: [19, 11] }, them: { 6: [20, 33.5], 4: [24, 13], 2: [13, 14] }, say: "Our 9 makes a run in behind, but the 10 can't see it." },
      { t: .9, pass: 'us:4', say: 'So he plays it all the way back to the 4.' },
      { freeze: 'bad',
        text: "He took the ball facing our own goal, so he never saw the 9's run. Their 6 closed him down and he had to play it all the way back.",
        marks: [{ a: ['us:9', [21, 4]], c: 'good', dash: 1 }, { h: ['them:6'], c: 'bad' }],
        options: [
          { t: 'Open up on the half-turn as the ball comes, and slip the 9 in behind', ok: true,
            why: "Standing sideways-on, he sees the ball and their goal at the same time, so he spots the 9's run and plays it first time." },
          { t: 'Take a few touches to turn all the way around',
            why: "Every touch gives their 6 more time to close him down, and by then the 9's run is over." },
          { t: 'Wait for the 9 to come back for it',
            why: "The chance is the 9's run right now. If he waits, it's gone." }
        ],
        rewind: 's0',
        fix: [
          { t: 1.0, pass: 'us:10', face: { 'us:10': [.25, -1] }, them: { 6: [21, 32.5] }, look: ['us:10', [20, 14]],
            say: 'This time he opens up as the ball arrives, half-turned toward their goal.' },
          { t: 1.0, pass: 'us:9', pd: .35, us: { 9: [19, 11] }, them: { 2: [13, 14], 4: [24, 13], 6: [21, 33.5] }, say: 'He sees the 9 going and slides it in behind.' },
          { t: .8, us: { 9: [21, 6.5] }, them: { 1: [24.5, 3.5], 4: [24, 10.5] }, say: 'One on one with the keeper...' },
          { t: .6, shot: [26.6, -.8], goal: true, say: '...goal!' }
        ],
        after: { text: "Half-turned, he could see the ball and their goal at the same time. He spotted the 9's run straight away and played it first time.",
          marks: [{ h: ['us:9'], c: 'good' }] } }
    ]
  },

  {
    key: 'Arrive late at the top of the box',
    rule: "When our winger gets to the end line, don't run into the crowd. Wait at the top of the box for the pull-back.",
    intro: 'Our 7 is racing down the right. Watch where the 10 goes.',
    start: {
      us: { 1: [25, 66], 3: [12, 46], 4: [25, 50], 2: [40, 44], 6: [26, 38], 10: [28, 26], 11: [8, 20], 9: [24, 16], 7: [43, 18] },
      them: { 1: [25, 3], 2: [11, 12], 4: [23, 9], 3: [37, 11], 6: [27, 19], 10: [22, 30], 7: [12, 34], 9: [26, 44], 11: [36, 32] },
      ball: 'us:7'
    },
    steps: [
      { t: 1.2, us: { 7: [45, 8], 9: [26, 10.5], 11: [14, 12], 10: [29, 21] }, them: { 3: [41, 5], 4: [24.5, 6.5], 2: [17.5, 9], 6: [27, 15] },
        say: 'The 7 races to the end line. Our 9 and 11 attack the box.' },
      { snap: 's1', t: 1.0, us: { 10: [32, 10] }, them: { 6: [28, 14] }, say: 'The 10 sprints into the box too...' },
      { t: .8, pass: 'them:6', them: { 6: [28.5, 16] }, say: '...so when the 7 pulls it back, nobody is there.' },
      { t: .9, pass: 'them:11', pd: .2, say: 'Their 6 clears it out to their 11.' },
      { freeze: 'bad',
        text: 'He ran into the box with everyone else. Our 9 and 11 were already there, so the space at the top of the box was empty, and the pull-back went straight to their 6.',
        marks: [{ z: [29, 18, 4.5], c: 'good' }],
        options: [
          { t: 'Hold back at the top of the box and wait for the pull-back', ok: true,
            why: 'The defenders all run toward their goal, so the top of the box opens up. Arriving late, he gets there with time to shoot.' },
          { t: 'Run to the near post',
            why: 'The 9 is already attacking that space. Two attackers in the same spot are easy to defend.' },
          { t: 'Run back to help defend',
            why: "We have the ball in their corner. This is the moment to be ready to score." }
        ],
        rewind: 's1',
        fix: [
          { t: 1.0, us: { 10: [29, 19.5] }, them: { 6: [28, 14.5] }, say: 'This time the 10 slows down and waits at the top of the box.' },
          { t: .8, pass: 'us:10', face: { 'us:10': 'up' }, us: { 10: [29, 18] }, say: 'The 7 pulls it back to him...' },
          { t: .6, shot: [23, -.8], goal: true, say: '...and he hits it first time. Goal!' }
        ],
        after: { text: 'Everyone else ran at the goal, so the top of the box was wide open. He arrived late, had time, and scored.',
          marks: [{ z: [29, 18, 4.5], c: 'good' }] } }
    ]
  },

  {
    key: 'Pass and go',
    rule: 'Pass and move straight away. The return pass puts you behind the defender.',
    intro: 'The 10 has the ball and their 6 is coming at him. Watch what he does after he passes.',
    start: {
      us: { 1: [25, 68], 3: [11, 50], 4: [25, 54], 2: [39, 50], 6: [25, 42], 10: [24, 31], 11: [7, 22], 9: [27, 18], 7: [43, 22] },
      them: { 1: [25, 3], 2: [11, 12], 4: [24, 11], 3: [38, 13], 6: [25, 24], 10: [22, 37], 7: [12, 38], 9: [27, 46], 11: [37, 36] },
      ball: 'us:10'
    },
    steps: [
      { snap: 's0', t: 1.0, us: { 9: [29, 21] }, them: { 6: [21, 28], 4: [26, 14] }, say: 'Their 6 steps up to the 10. Our 9 checks back toward the ball.' },
      { t: .7, pass: 'us:9', face: { 'us:9': 'down' }, say: 'The 10 plays it into the 9...' },
      { t: 1.0, them: { 4: [28.5, 17.5], 6: [24, 26] }, say: '...and stands still, watching.' },
      { t: .7, pass: 'them:4', them: { 4: [28.5, 18.5] }, close: 1, say: 'The 9 has nowhere to go, and their 4 wins it from behind.' },
      { t: .7, them: { 4: [32, 15] }, say: 'And they have it back.' },
      { freeze: 'bad',
        text: 'He passed and then stood still. The 9 had nobody to give it back to, and their 4 came right through him to win it.',
        marks: [{ a: ['us:10', [25, 21]], c: 'good', dash: 1 }, { h: ['them:6'], c: 'bad' }],
        options: [
          { t: 'Burst past their 6 straight after the pass, for the ball back', ok: true,
            why: "The moment he passes, their 6 is watching the ball. One quick run and he's behind him, and the 9 can lay it straight into his path." },
          { t: 'Wait for the 9 to turn',
            why: "The 9 has their 4 right on his back. He can't turn, so he needs someone to give it to." },
          { t: 'Ask for it back right where he is',
            why: 'Their 6 is right there. The return pass goes straight into him.' }
        ],
        rewind: 's0',
        fix: [
          { t: 1.0, us: { 9: [29, 21] }, them: { 6: [21, 28], 4: [26, 14] }, say: 'Same start...' },
          { t: .7, pass: 'us:9', face: { 'us:9': 'down' }, say: 'The 10 plays it into the 9...' },
          { t: 1.0, us: { 10: [25, 21.5] }, them: { 4: [28.5, 17] }, pass: 'us:10', pd: .45, face: { 'us:10': 'up' },
            say: '...and bursts past their 6. The 9 lays it first time into his path.' },
          { t: .9, us: { 10: [25, 12.5] }, them: { 2: [17, 10], 3: [33, 10], 1: [25, 5], 4: [30, 17] }, say: 'Now he is running at their goal...' },
          { t: .6, shot: [22.5, -.8], goal: true, say: '...goal!' }
        ],
        after: { text: 'Pass and go. The second he passed, he ran past their 6, so the 9 had an easy ball straight back into his path.',
          marks: [{ h: ['them:6', 'them:4'], c: 'them' }] } }
    ]
  },

  {
    key: 'Press first',
    rule: 'When we lose the ball, press straight away. Curve your run so your body blocks the pass to their 6.',
    intro: 'Their 4 has just won the ball. Watch how fast the 10 reacts, and which way he runs.',
    start: {
      us: { 1: [25, 68], 3: [11, 50], 4: [25, 54], 2: [39, 50], 6: [26, 40], 10: [27, 25], 11: [8, 22], 9: [29, 16], 7: [42, 20] },
      them: { 1: [25, 3], 2: [10, 13], 4: [25, 9], 3: [38, 13], 6: [22, 21], 10: [24, 34], 7: [12, 36], 9: [27, 46], 11: [37, 34] },
      ball: 'them:4'
    },
    steps: [
      { snap: 's0', t: 1.0, us: { 9: [28.5, 12], 10: [28, 29] }, say: 'Our 9 jumps on their 4. The 10 jogs back.' },
      { t: .9, pass: 'them:6', face: { 'them:6': 'down' }, them: { 6: [21, 22] }, say: 'So their 4 plays it into their 6...' },
      { t: 1.1, them: { 6: [23, 30], 10: [20, 38], 9: [29, 48] }, us: { 10: [28.5, 33], 6: [25.5, 43] },
        say: "...who turns and drives forward. Now we're all running backward." },
      { freeze: 'bad',
        text: 'He jogged back when we lost it. That left their 6 free in the middle, the easiest pass for their 4, and now they are running at us.',
        marks: [{ h: ['them:6'], c: 'bad' }],
        options: [
          { t: 'Press right away, stepping into the line between their 4 and their 6', ok: true,
            why: 'Our 9 is already on their 4. With the 10 standing in the way of their 6, their 4 has nowhere good to go.' },
          { t: 'Sprint back to our half',
            why: 'Running back gives them the middle. The best time to win it back is right after we lose it.' },
          { t: 'Run straight at their 4 as well',
            why: "Two on their 4 leaves their 6 free, and one pass beats both of them." }
        ],
        rewind: 's0',
        fix: [
          { t: 1.0, us: { 9: [28.5, 12], 10: [24, 16.5] }, say: 'This time the 10 reacts straight away and steps into the line between their 4 and their 6.' },
          { freeze: 'good',
            text: "He's standing right between their 4 and their 6. Their 6 is in his shadow, so that pass is gone, and our 9 is on the 4.",
            marks: [{ s: ['us:10', 'them:4'], len: 8 }, { h: ['them:6'], c: 'them' }] },
          { t: 1.0, pass: 'them:2', them: { 2: [9, 11] }, say: "Their 4 can't find the 6, so he goes wide to their 2." },
          { t: 1.1, us: { 11: [10, 15.5], 10: [17, 16], 9: [22, 13] }, them: { 2: [8, 11.5] }, say: 'Our 11, 10 and 9 trap him by the sideline...' },
          { t: .7, pass: 'us:11', us: { 11: [9.5, 14] }, close: 1, say: '...and win it back, right by their goal.' }
        ],
        after: { text: 'He reacted right away and blocked the middle. They had to go wide, and we trapped them by the sideline and won it back.',
          marks: [{ h: ['them:6'], c: 'good' }] } }
    ]
  }
];
window.LEARN_LIB.define({ me: '10', keys: KEYS });
})();
