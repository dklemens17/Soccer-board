/* Learn: the wide center backs. Written for the 3 (left) and mirrored for the 2.
   Side-specific words use the placeholders described in learn-core.js. */
(function () {
const KEYS = [
  {
    key: 'Push the winger down the line',
    rule: 'When their winger runs at you, stay between the ball and our goal, on your feet, and push the winger toward the sideline.',
    intro: 'Their {t7} gets the ball and runs at our {3}. Watch how the {3} defends.',
    start: {
      us: { 1: [25, 70], 3: [11, 57], 4: [25, 59], 2: [39, 57], 6: [24, 47], 10: [26, 36], 11: [10, 38], 9: [27, 26], 7: [40, 37] },
      them: { 1: [25, 4], 2: [10, 29], 4: [24, 22], 3: [39, 28], 6: [28, 31.5], 10: [20, 44], 7: [8, 47], 9: [28, 51], 11: [40, 47] },
      ball: 'them:10'
    },
    steps: [
      { t: .9, pass: 'them:7', face: { 'them:7': 'down' }, them: { 7: [8, 48] }, say: 'Their 10 plays it out to their {t7}.' },
      { snap: 's1', t: 1.0, them: { 7: [10, 52] }, us: { 3: [11, 55.6] }, say: 'Their {t7} runs at our {3}...' },
      { t: .6, us: { 3: [10.5, 52.5] }, close: 1, say: 'The {3} dives in...' },
      { t: .7, them: { 7: [15, 56] }, us: { 3: [8.5, 51] }, close: 1, say: '...and their {t7} cuts inside, past the {3}.' },
      { t: .8, them: { 7: [18, 62] }, us: { 4: [22, 61] }, say: 'Now their {t7} is heading for our goal.' },
      { t: .6, shot: [23, 75.8], say: 'Their {t7} shoots.' },
      { freeze: 'bad',
        text: 'The {3} dived in. Once their {t7} got past, nobody was between the ball and our goal, and their {t7} cut inside to shoot.',
        marks: [{ h: ['them:7'], c: 'bad' }],
        options: [
          { t: 'Stay on your feet, goal-side of their {t7}, and push the play down the line', ok: true,
            why: 'Down the line, near the sideline, is the least dangerous place for an attacker. In front of our goal is the most dangerous.' },
          { t: 'Dive in harder',
            why: "Miss again, and the attacker is through. Staying on your feet keeps you in the way." },
          { t: 'Back off all the way into our box',
            why: 'That much room lets the attacker pick a cross or a shot. Stay close, but on your feet.' }
        ],
        rewind: 's1',
        fix: [
          { t: .9, us: { 3: [13, 56] }, them: { 7: [9, 54] }, say: 'This time the {3} stays on the inside, without diving in...' },
          { t: 1.0, us: { 3: [10.5, 62] }, them: { 7: [6, 60] }, say: '...and pushes their {t7} down the line, toward the corner...' },
          { t: .7, pass: 'us:3', us: { 3: [8, 62] }, close: 1, say: '...where there is no room left.' }
        ],
        after: { text: 'The {3} stayed between their {t7} and our goal and pushed the play down the line. In the corner, the attacker ran out of room.',
          marks: [{ h: ['them:7'], c: 'good' }] } }
    ]
  },

  {
    key: 'Tuck in',
    rule: 'When the ball is on the other side of the field, move in toward our 4. Close the gap in the middle.',
    intro: "They're attacking down our {right} side. Watch our {3}.",
    start: {
      us: { 1: [25, 70], 3: [8, 57], 4: [25, 59], 2: [38, 58], 6: [27, 46], 10: [27, 35.5], 11: [10, 38], 9: [26, 26], 7: [41, 40] },
      them: { 1: [25, 4], 2: [10, 28], 4: [24, 22], 3: [40, 30], 6: [29, 31.5], 10: [33, 44], 7: [9, 47], 9: [24, 52], 11: [43, 52] },
      ball: 'them:11'
    },
    steps: [
      { t: 1.0, us: { 2: [40, 56.5], 4: [28, 59], 6: [29, 48] }, them: { 11: [44, 60], 9: [22, 54] }, say: 'Their {t11} runs at our {2}. Our 4 shifts across to help.' },
      { snap: 's1', t: 1.0, us: { 3: [7, 58] }, them: { 7: [10, 52], 9: [20, 56] }, say: 'The {3} stays out wide on the {left}...' },
      { t: 1.0, pass: 'them:9', air: true, them: { 9: [17, 62] }, say: '...so the cross finds their 9 in the gap between our {3} and our 4.' },
      { t: .5, shot: [22, 75.8], say: 'Header!' },
      { freeze: 'bad',
        text: 'The {3} stayed out wide even though the ball was on the other side. That left a big gap between the {3} and our 4, and their 9 ran right into it.',
        marks: [{ z: [17, 60, 5], c: 'bad' }, { h: ['them:9'], c: 'bad' }],
        options: [
          { t: 'Tuck in toward our 4 to close the gap', ok: true,
            why: "With the ball on the far side, their {t7} out wide isn't the danger. The middle of our box is, and tucking in covers it." },
          { t: 'Stay wide to mark their {t7}',
            why: 'Their {t7} is far from the ball. If the ball switches, the {3} has time to get back out.' },
          { t: 'Run over to help our {2}',
            why: 'The 4 and the 6 are already helping. Running across leaves our whole {left} side empty.' }
        ],
        rewind: 's1',
        fix: [
          { t: 1.0, us: { 3: [16, 59] }, them: { 7: [10, 52], 9: [20, 56] }, say: 'This time the {3} tucks in toward our 4...' },
          { t: 1.0, pass: 'us:3', air: true, us: { 3: [17.5, 60.5] }, them: { 9: [19, 58.5] }, close: 1, say: '...and gets to the cross first...' },
          { t: .8, pass: [2, 42], air: true, pd: .1, them: { 9: [21, 57] }, say: '...and heads it away.' }
        ],
        after: { text: 'With the ball on the far side, the {3} tucked in to close the gap next to our 4, and got to the cross first.',
          marks: [{ h: ['them:9'], c: 'good' }] } }
    ]
  },

  {
    key: 'Support the winger',
    rule: 'When our {11} has the ball and is under pressure, get close behind at an angle, so there is always an easy pass.',
    intro: 'Our {11} has the ball on the {left}, and two of their players close in. Watch the {3}.',
    start: {
      us: { 1: [25, 70], 3: [9, 58], 4: [24, 58], 2: [40, 56], 6: [23, 46], 10: [26, 35], 11: [6, 38], 9: [25, 24], 7: [44, 30] },
      them: { 1: [25, 4], 2: [10, 29], 4: [24, 20], 3: [38, 24], 6: [24, 30.5], 10: [16, 42], 7: [13, 50], 9: [26, 52], 11: [38, 46] },
      ball: 'us:11'
    },
    steps: [
      { snap: 's0', t: 1.0, them: { 2: [5, 33.5], 10: [10, 36.5] }, say: 'Their {t2} and their 10 close in on the {11}.' },
      { t: 1.0, them: { 2: [5, 34.5], 10: [9.5, 37] }, us: { 11: [5.5, 38.5] }, say: 'The {3} stays back, so the {11} has nobody close to pass to...' },
      { t: .6, pass: 'them:10', them: { 10: [8.5, 37.5] }, close: 1, say: '...and they take it away.' },
      { t: .8, them: { 10: [15, 44] }, say: 'Their 10 is away.' },
      { freeze: 'bad',
        text: 'The {3} stayed back. Our {11} was trapped against the sideline with two players closing in and no easy pass, and lost the ball.',
        marks: [{ z: [11, 45, 4.5], c: 'good' }, { h: ['us:11'], c: 'us' }],
        options: [
          { t: 'Move up close behind the {11}, at an angle, for an easy pass', ok: true,
            why: 'A pass back to the {3} gets the {11} out of trouble. From there the {3} can find the 6 or switch it.' },
          { t: 'Stay back in case we lose it',
            why: 'The 4 and the 6 are there for that. If nobody helps the {11}, we lose it anyway.' },
          { t: 'Sprint past the {11} down the line',
            why: 'With two defenders right there, a ball down the line is hard to play. The {11} needs an easy pass first.' }
        ],
        rewind: 's0',
        fix: [
          { t: 1.0, us: { 3: [11, 45] }, them: { 2: [5, 34.5], 10: [9.5, 36.5] }, say: 'This time the {3} moves up behind the {11}, at an angle...' },
          { t: .8, pass: 'us:3', face: { 'us:3': [.8, -.6] }, say: '...so the {11} has an easy pass back...' },
          { t: .9, pass: 'us:6', say: '...and the {3} plays it inside to the 6, away from the pressure.' }
        ],
        after: { text: "The {3} got close behind the {11}, at an angle. One pass back, one pass inside, and we're out of trouble.",
          marks: [{ h: ['them:2', 'them:10'], c: 'good' }] } }
    ]
  },

  {
    key: 'Open up to the field',
    rule: 'When the keeper gives you the ball, open your body to the field, so you can see the {11} and play forward.',
    intro: 'Our keeper rolls it out to the {3}. Watch which way the {3} faces.',
    start: {
      us: { 1: [25, 71], 3: [8, 62], 4: [25, 63], 2: [42, 62], 6: [24, 52], 10: [27, 38], 11: [5, 40], 9: [25, 26], 7: [45, 33] },
      them: { 1: [25, 3], 2: [8, 30], 4: [25, 21], 3: [40, 26], 6: [24, 33.5], 10: [21, 45], 7: [14, 52], 9: [29, 57], 11: [37, 52] },
      ball: 'us:1'
    },
    steps: [
      { snap: 's0', t: 1.0, pass: 'us:3', face: { 'us:3': 'left' }, them: { 7: [12, 56] }, say: 'The keeper rolls it out to the {3}, who takes it facing the sideline.' },
      { t: .9, them: { 7: [9, 58.5] }, us: { 3: [7, 62.5] }, say: 'Their {t7} closes in...' },
      { t: .8, pass: 'us:1', say: '...and the only pass in view is back to the keeper.' },
      { freeze: 'bad',
        text: 'The {3} took the ball facing the sideline, so the rest of the field was out of view. Their {t7} closed in, and the only pass left was back to the keeper.',
        marks: [{ h: ['us:11'], c: 'good' }, { a: ['us:3', 'us:11'], c: 'good', dash: 1 }],
        options: [
          { t: 'Open up to the field and play it down the line to the {11}', ok: true,
            why: "Facing the field, the {3} can see the {11} free down the line. One pass and we're past their {t7}." },
          { t: 'Dribble past their {t7}',
            why: 'Dribbling near our own goal is risky. A pass forward is quicker and safer.' },
          { t: 'Kick it as far as possible',
            why: 'Long and hopeful usually gives it back to them. The {11} was free for a proper pass.' }
        ],
        rewind: 's0',
        fix: [
          { t: 1.0, pass: 'us:3', face: { 'us:3': [.2, -1] }, them: { 7: [12, 56] }, look: ['us:3', [6, 42]], say: 'This time the {3} opens up to the field as the ball arrives...' },
          { t: .9, pass: 'us:11', us: { 11: [5, 42] }, say: '...sees the {11} free, and plays it down the line.' },
          { t: 1.0, us: { 11: [8, 33] }, them: { 2: [10, 28] }, say: "And we're on our way up the {left}." }
        ],
        after: { text: 'Facing the field, the {3} saw the {11} free down the line straight away. One pass, and their {t7} was out of the game.',
          marks: [{ h: ['them:7'], c: 'good' }] } }
    ]
  },

  {
    key: 'Recovery run',
    rule: "If you get beaten, sprint back toward our near post, inside the attacker. Don't just chase from behind.",
    intro: 'Their {t7} is about to get past our {3}. Watch how the {3} recovers.',
    start: {
      us: { 1: [25, 70], 3: [10, 46], 4: [24, 58], 2: [39, 56], 6: [25, 45], 10: [27, 35], 11: [10, 32], 9: [26, 25], 7: [40, 35] },
      them: { 1: [25, 4], 2: [10, 25], 4: [24, 20], 3: [39, 26], 6: [28, 30], 10: [20, 40], 7: [8, 42], 9: [28, 51], 11: [40, 46] },
      ball: 'them:7'
    },
    steps: [
      { t: .8, them: { 7: [6, 49] }, us: { 3: [11, 44.5] }, say: 'Their {t7} knocks it past the {3} down the line.' },
      { snap: 's1', t: 1.0, them: { 7: [8, 58] }, us: { 3: [9, 53] }, say: 'The {3} chases right behind...' },
      { t: .9, them: { 7: [15, 63] }, us: { 3: [11, 58.5] }, say: '...so their {t7} cuts inside, toward our goal.' },
      { t: .6, shot: [23, 75.8], say: 'Their {t7} shoots.' },
      { freeze: 'bad',
        text: 'The {3} chased straight behind their {t7}. That left the inside open, so the attacker just cut inside toward our goal.',
        marks: [{ h: ['them:7'], c: 'bad' }],
        options: [
          { t: 'Sprint back on a line toward our near post, inside the attacker', ok: true,
            why: 'Running inside gets the {3} between the attacker and our goal again, so the only way left is wide.' },
          { t: 'Slide in from behind',
            why: "From behind it's almost always a foul, maybe even a penalty." },
          { t: 'Stop and let the 4 deal with it',
            why: 'Then our 4 is left alone and their 9 is free. Keep running.' }
        ],
        rewind: 's1',
        fix: [
          { t: 1.0, them: { 7: [8, 58] }, us: { 3: [13, 57] }, say: 'This time the {3} sprints back on a line toward our near post...' },
          { t: .9, them: { 7: [6, 64] }, us: { 3: [10.5, 62] }, say: '...gets inside, so their {t7} can only go wide...' },
          { t: .9, pass: 'us:4', pd: .3, air: true, us: { 4: [26, 61] }, say: '...and the cross from there goes straight to our 4.' }
        ],
        after: { text: 'The {3} sprinted back inside the attacker, toward our near post. That shut the way to goal, so their {t7} had to go wide, and the cross was easy for our 4.',
          marks: [{ h: ['them:7'], c: 'good' }] } }
    ]
  }
];
window.LEARN_LIB.define({ me: '3', mirrorTo: '2', keys: KEYS });
})();
