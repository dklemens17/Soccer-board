/* Learn: the wingers. Written for the 11 (left wing) and mirrored for the 7.
   Side-specific words use the placeholders described in learn-core.js. */
(function () {
const KEYS = [
  {
    key: 'Stay wide',
    rule: 'When we have the ball, stay wide on the sideline. It pulls their defense apart and opens up the middle.',
    intro: 'Our 6 has the ball. Watch where the {11} goes.',
    start: {
      us: { 1: [25, 68], 3: [10, 52], 4: [25, 55], 2: [40, 52], 6: [24, 42], 10: [27, 30], 11: [5, 30], 9: [25, 19], 7: [45, 28] },
      them: { 1: [25, 3], 2: [10, 17], 4: [24, 15], 3: [38, 17], 6: [24, 27], 10: [29, 37], 7: [12, 42], 9: [29, 48], 11: [37, 38] },
      ball: 'us:6'
    },
    steps: [
      { snap: 's0', t: 1.2, us: { 11: [15, 27] }, them: { 2: [14, 21], 6: [23, 27.5] }, say: 'The {11} drifts inside toward the ball...' },
      { t: .9, pass: 'us:4', say: '...and the 6 has nothing forward, so he plays it back.' },
      { freeze: 'bad',
        text: 'He drifted into the middle. Their {t2} came inside with him, the middle is crowded, and the whole {left} side is empty.',
        marks: [{ z: [6, 24, 6], c: 'good' }, { h: ['them:2'], c: 'bad' }],
        options: [
          { t: 'Stay wide, right on the {left} sideline', ok: true,
            why: 'Staying wide drags their {t2} out with him. That opens a gap in the middle, or a free pass down the line.' },
          { t: 'Come even closer to the ball',
            why: 'That brings his defender with him and makes the middle even more crowded.' },
          { t: 'Run into the box',
            why: "There's no ball to run onto yet. First the team needs space to get it forward." }
        ],
        rewind: 's0',
        fix: [
          { t: 1.2, us: { 11: [4, 26], 10: [16, 26] }, them: { 2: [7, 21.5] }, say: 'This time the {11} stays wide, and their {t2} has to go with him...' },
          { t: 1.0, pass: 'us:10', face: { 'us:10': 'up' }, say: '...which opens a gap, and the 6 finds the 10 in it.' }
        ],
        after: { text: 'By staying wide he pulled their {t2} out of the middle. That opened a gap, and the 6 could play forward through it.',
          marks: [{ h: ['them:2'], c: 'them' }] } }
    ]
  },

  {
    key: 'Take him on',
    rule: 'When you get the ball one on one with space in front of you, run at the defender fast. Make him back up, then go past him.',
    intro: 'The {11} is about to get the ball on the {left} with only their {t2} in front of him. Watch what he does.',
    start: {
      us: { 1: [25, 66], 3: [11, 48], 4: [25, 52], 2: [39, 48], 6: [25, 40], 10: [24, 28], 11: [6, 30], 9: [26, 16], 7: [43, 22] },
      them: { 1: [25, 3], 2: [9, 19], 4: [24, 12], 3: [36, 13], 6: [26, 23], 10: [21, 34], 7: [13, 38], 9: [28, 44], 11: [36, 32] },
      ball: 'us:6'
    },
    steps: [
      { t: 1.0, pass: 'us:11', face: { 'us:11': 'up' }, them: { 2: [8, 22] }, say: "The 6 finds the {11} out wide. It's just him and their {t2}." },
      { snap: 's1', t: 1.0, us: { 11: [6, 29] }, them: { 2: [8, 25.5], 6: [15, 24] }, say: 'He stops the ball and waits...' },
      { t: 1.0, them: { 6: [11.5, 27.5] }, us: { 11: [5.5, 29.5] }, say: '...and their 6 comes over to help.' },
      { t: .8, pass: 'us:6', say: "Now it's two against one, so he passes it back." },
      { freeze: 'bad',
        text: 'He had their {t2} one on one with space to run into, but he stopped and waited. That gave their 6 time to come across, and the chance was gone.',
        marks: [{ z: [7, 20, 5], c: 'good' }, { h: ['them:6'], c: 'bad' }],
        options: [
          { t: "Run at their {t2} straight away, while it's one on one", ok: true,
            why: 'Running at a defender makes him back up and guess. Going early, before help arrives, is when one on one works.' },
          { t: 'Pass it back to the 6 straight away',
            why: 'Safe, but he had the best chance on the field: one defender, with space behind him.' },
          { t: 'Wait for the {3} to come and help',
            why: 'Waiting lets their help arrive too. The one on one was there right now.' }
        ],
        rewind: 's1',
        fix: [
          { t: 1.0, us: { 11: [7, 23.5] }, them: { 2: [8, 19] }, say: 'This time he runs straight at their {t2}, who backs off...' },
          { t: .8, us: { 11: [4, 17] }, them: { 2: [9, 19.5] }, say: '...then knocks it past him down the line...' },
          { t: 1.0, us: { 11: [6, 9], 9: [25, 11], 10: [23, 19] }, them: { 2: [8, 15], 4: [21, 9], 1: [22.5, 3.5] }, say: '...gets to the end line...' },
          { t: .8, pass: 'us:10', say: '...and cuts it back to the 10.' },
          { t: .6, shot: [27.3, -.8], goal: true, say: 'Goal!' }
        ],
        after: { text: 'He ran at their {t2} while it was one on one. The defender had to back off, and once the {11} was past him, the whole box opened up.',
          marks: [{ h: ['them:2'], c: 'them' }] } }
    ]
  },

  {
    key: 'Run in behind',
    rule: 'When our 6 or 10 has the ball facing forward, spin and run in behind their fullback.',
    intro: "Our 10 has the ball facing forward. Watch the {11}'s run.",
    start: {
      us: { 1: [25, 68], 3: [10, 50], 4: [25, 54], 2: [39, 50], 6: [25, 42], 10: [21, 32], 11: [7, 26], 9: [27, 17.5], 7: [43, 24] },
      them: { 1: [25, 3], 2: [9, 20], 4: [25, 14], 3: [37, 15], 6: [25, 25], 10: [28, 37], 7: [13, 39], 9: [27, 47], 11: [37, 35] },
      ball: 'us:10'
    },
    steps: [
      { snap: 's0', t: 1.0, us: { 11: [8, 31] }, them: { 2: [9.5, 27.2] }, say: 'The {11} comes short, asking for it to his feet...' },
      { t: .8, pass: 'us:11', face: { 'us:11': 'right' }, say: '...the 10 plays it to him, with their {t2} right behind.' },
      { t: .6, pass: 'them:2', them: { 2: [8, 29] }, us: { 11: [10, 32] }, close: 1, say: 'Their {t2} steps in and nicks it.' },
      { t: .8, them: { 2: [5, 36] }, say: 'Ball lost.' },
      { freeze: 'bad',
        text: 'He came short to the ball with their {t2} right on his back. The defender saw it coming and stepped in. Behind their {t2} was all that space.',
        marks: [{ z: [9, 13, 6], c: 'good' }, { h: ['them:2'], c: 'bad' }],
        options: [
          { t: 'Spin and run in behind their {t2}', ok: true,
            why: 'Their {t2} was watching the ball. A run behind him is hard to track, and the 10 was facing forward, ready to play it.' },
          { t: 'Come even shorter',
            why: 'Coming closer just drags the defender with him into the crowd.' },
          { t: 'Stand still and wait',
            why: 'Standing still makes him easy to mark. Runs are what pull defenders apart.' }
        ],
        rewind: 's0',
        fix: [
          { t: .5, us: { 11: [7, 28.5] }, them: { 2: [9.5, 24.2] }, say: 'This time he fakes coming short...' },
          { t: .6, us: { 11: [5, 21] }, say: '...then spins in behind their {t2}...' },
          { t: .8, us: { 11: [12, 13] }, pass: 'us:11', pd: .1, say: '...and the 10 slides it into his path.' },
          { t: .8, us: { 11: [16, 7] }, them: { 2: [12, 16], 4: [21, 10], 1: [23, 3.5] }, say: 'In on goal...' },
          { t: .6, shot: [22.3, -.8], goal: true, say: '...and he finishes it.' }
        ],
        after: { text: 'While their {t2} was watching the ball, he spun in behind him. The 10 was facing forward, so the pass was easy.',
          marks: [{ h: ['them:2'], c: 'them' }] } }
    ]
  },

  {
    key: 'Attack the far post',
    rule: 'When the ball is on the other wing, get into the box and attack the far post.',
    intro: 'Our {7} has the ball on the far side. Watch the {11}.',
    start: {
      us: { 1: [25, 66], 3: [11, 48], 4: [25, 52], 2: [40, 46], 6: [26, 40], 10: [29, 24], 11: [5, 22], 9: [25, 14], 7: [44, 16] },
      them: { 1: [25, 3], 2: [12, 13], 4: [24, 10], 3: [37, 11], 6: [27, 19], 10: [22, 32], 7: [12, 36], 9: [27, 44.5], 11: [37, 30] },
      ball: 'us:7'
    },
    steps: [
      { t: 1.1, us: { 7: [45, 7], 9: [26, 10] }, them: { 3: [41, 6], 4: [22.5, 7], 1: [27, 3] }, say: 'The {7} gets to the end line on the {right}. Our 9 attacks the near post.' },
      { snap: 's1', t: 1.0, us: { 11: [5, 18] }, them: { 2: [13, 10] }, say: 'The {11} stays out wide on the {left} sideline...' },
      { t: 1.0, pass: [17, 6], air: true, say: '...so when the cross comes over, nobody is at the far post.' },
      { t: .7, pass: 'them:2', them: { 2: [16, 8.8] }, say: 'Their {t2} clears it.' },
      { freeze: 'bad',
        text: 'He stayed out on the sideline. The cross went over everyone to the far post, and nobody was there to meet it.',
        marks: [{ z: [17, 6, 3.5], c: 'good' }, { h: ['them:2'], c: 'bad' }],
        options: [
          { t: 'Run into the box toward the far post', ok: true,
            why: 'Crosses that beat the first defenders drop at the far post. A winger arriving there scores a lot of goals.' },
          { t: 'Stay wide in case the ball comes back out',
            why: 'Our backs and the 6 handle that. When the ball is on the other wing, his job is to get into the box.' },
          { t: 'Run to the near post too',
            why: 'Our 9 is already there. Two players at the near post leaves the far post empty.' }
        ],
        rewind: 's1',
        fix: [
          { t: 1.0, us: { 11: [15, 9] }, them: { 2: [19.5, 12] }, say: 'This time the {11} cuts inside, toward the far post...' },
          { t: 1.0, pass: 'us:11', air: true, us: { 11: [16, 6.5] }, say: '...and the {7} crosses it right to him.' },
          { t: .5, shot: [24, -.8], goal: true, say: 'Goal!' }
        ],
        after: { text: 'With the ball on the other wing, he got into the box and attacked the far post. The cross went over everyone, and he was there.',
          marks: [{ z: [17, 6, 3.5], c: 'good' }] } }
    ]
  },

  {
    key: 'Track back',
    rule: 'When they attack down your side, sprint back and stay with their fullback, so our {3} is never two against one.',
    intro: "They're attacking down our {left} side. Watch the {11}.",
    start: {
      us: { 1: [25, 70], 3: [11, 58], 4: [25, 61], 2: [38, 58], 6: [24, 48], 10: [27, 37], 11: [9, 36], 9: [26, 26], 7: [41, 34] },
      them: { 1: [25, 4], 2: [10, 30], 4: [24, 22], 3: [38, 24], 6: [25, 32.5], 10: [23, 44], 7: [8, 46], 9: [27, 53], 11: [38, 48] },
      ball: 'them:6'
    },
    steps: [
      { snap: 's0', t: 1.0, pass: 'them:7', say: 'Their 6 plays it out to their {t7}.' },
      { t: 1.2, them: { 2: [6, 40] }, us: { 11: [12, 31] }, say: 'Their {t2} sprints forward past the {11}, who just watches him go.' },
      { t: 1.0, them: { 2: [5, 52], 7: [12, 50] }, us: { 3: [10, 55] }, say: 'Now our {3} has two of them to deal with...' },
      { t: .8, pass: 'them:2', say: '...their {t7} slips it to their {t2}...' },
      { t: .9, pass: 'them:9', air: true, them: { 9: [21, 60] }, say: '...and he crosses it into our box.' },
      { freeze: 'bad',
        text: 'He watched their {t2} run past him. That left our {3} alone against two of them, and they got the cross in.',
        marks: [{ a: ['us:11', [6, 47]], c: 'good', dash: 1 }, { h: ['them:2'], c: 'bad' }],
        options: [
          { t: 'Sprint back and stay with their {t2}', ok: true,
            why: 'Then our {3} only has their {t7} to worry about, and their {t2} has no free run.' },
          { t: 'Stay up the field, ready for a counter',
            why: "If they score, there's no counter. When they attack down his side, he helps first." },
          { t: 'Run back to the middle of our box',
            why: 'Our 4 and {2} cover the middle. The danger is their {t2} running free down the line.' }
        ],
        rewind: 's0',
        fix: [
          { t: 1.0, pass: 'them:7', say: 'Same start...' },
          { t: 1.2, them: { 2: [6, 40] }, us: { 11: [5, 44] }, say: 'This time the {11} sprints back with their {t2}...' },
          { t: 1.0, them: { 7: [12, 50], 2: [5, 48] }, us: { 11: [4.5, 52], 3: [10, 55] }, say: '...and stays between him and our goal.' },
          { t: 1.0, pass: 'them:10', say: 'With nobody free, their {t7} has to play it back.' }
        ],
        after: { text: 'He sprinted back and stayed with their {t2}. Our {3} only had one player to deal with, and they had to go backward.',
          marks: [{ h: ['us:11', 'us:3'], c: 'good' }] } }
    ]
  }
];
window.LEARN_LIB.define({ me: '11', mirrorTo: '7', keys: KEYS });
})();
