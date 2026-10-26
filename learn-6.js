/* Learn: the 6 (defensive midfielder). Format is described in learn-core.js. */
(function () {
const KEYS = [
  {
    key: 'Get out of their shadow',
    rule: "When our backs have the ball, don't hide behind their forward. Slide into a gap so the pass can reach you.",
    intro: 'Our 4 has the ball and wants to play forward. Watch where the 6 stands.',
    start: {
      us: { 1: [25, 71], 3: [8, 60], 4: [25, 64], 2: [42, 60], 6: [25, 52], 10: [27, 38], 11: [5, 31], 9: [25, 25], 7: [45, 31] },
      them: { 1: [25, 3], 2: [10, 24], 4: [25, 20], 3: [40, 24], 6: [24, 33], 10: [26, 45], 7: [12, 50], 9: [25, 57], 11: [38, 50] },
      ball: 'us:4'
    },
    steps: [
      { snap: 's0', t: 1.4, say: 'Their 9 steps up to press our 4.',
        them: { 9: [26.5, 59], 7: [12, 52.5], 11: [38, 52.5], 10: [26, 47] }, us: { 6: [25.5, 52.5] } },
      { freeze: 'bad',
        text: "The 6 is standing in their 9's shadow, the dark area behind the 9 where the ball can't get through. The 4 can't pass to the 6, and their 9 can press the 4 without worrying about that pass.",
        marks: [{ s: ['them:9', 'us:4'] }, { h: ['them:9'], c: 'bad' }],
        options: [
          { t: 'Slide sideways into the gap between their 9 and their 7', ok: true,
            why: "Out of the 9's shadow there's a clear line from the 4, and their 9 can't block the pass and press the 4 at the same time." },
          { t: 'Run back to stand next to the 4',
            why: "That's close, but their 9 can press both of them. And from back there, the 6 can't help us go forward." },
          { t: 'Run forward to join our 10',
            why: 'Now the pass has to get past their 9 and their 10, and the middle is empty if we lose it.' }
        ],
        rewind: 's0',
        fix: [
          { t: 1.4, say: 'This time the 6 slides out of the shadow, into the gap.',
            them: { 9: [26.5, 59], 7: [12, 52.5], 11: [38, 52.5], 10: [25, 47] }, us: { 6: [16, 55] } },
          { t: .9, pass: 'us:6', face: { 'us:6': [.5, -1] }, say: 'Now the pass is on.' }
        ],
        after: { text: 'Two steps sideways and the lane is open. Their 9 is out of the game, and nobody had to make a tackle.', marks: [{ h: ['them:9'], c: 'good' }] } },
      { t: 1.0, say: 'The 6 takes it on the half-turn, already facing forward.',
        us: { 6: [17.5, 52], 10: [22, 41], 9: [24, 26] }, them: { 7: [13.5, 50.5], 10: [26.5, 47] } },
      { t: .85, pass: 'us:10', say: 'And plays it straight into the 10.' },
      { t: 1.1, say: "Their front three can't get back in time.",
        us: { 10: [23, 36.5], 11: [7, 27], 7: [43, 27], 9: [28, 24] }, them: { 6: [28.5, 32], 9: [24, 56], 7: [14, 53], 10: [25, 44] } },
      { freeze: 'good',
        text: 'The 6 took it facing forward, then found the 10. Two passes, and all three of their forwards are behind the ball.',
        marks: [{ h: ['them:9', 'them:7', 'them:11'], c: 'good' }] }
    ]
  },

  {
    key: 'Check your shoulder',
    rule: "Look over your shoulder before the ball gets to you. If someone's close, play it first time. If nobody is, turn.",
    intro: 'Our 4 is about to pass to the 6. Watch whether the 6 looks around before the ball arrives.',
    start: {
      us: { 1: [25, 71], 3: [9, 59], 4: [27, 64], 2: [42, 60], 6: [26, 51], 10: [29, 37], 11: [5, 31], 9: [25, 25], 7: [45, 31] },
      them: { 1: [25, 3], 2: [10, 23], 4: [25, 20], 3: [40, 24], 6: [23, 33], 10: [27, 45], 7: [12, 50], 9: [34, 57], 11: [40, 49] },
      ball: 'us:4'
    },
    steps: [
      { snap: 's0', t: 1.0, pass: 'us:6', face: { 'us:6': 'down' }, them: { 10: [27.2, 47.1], 9: [32, 59] },
        say: 'The 4 plays it into the 6, who is facing our own goal.' },
      { t: .8, us: { 6: [25.6, 50.4] }, face: { 'us:6': 'up' }, them: { 10: [26.5, 46.6] }, say: 'The 6 turns without looking...', close: 1 },
      { t: .6, pass: 'them:10', them: { 10: [25, 47] }, us: { 6: [27.5, 50.5] }, say: '...straight into their 10.', close: 1 },
      { t: 1.0, them: { 10: [21, 53], 9: [30, 61.5] }, us: { 6: [26, 51.5], 4: [26, 64] }, say: "And now they're running at our goal." },
      { freeze: 'bad',
        text: "The 6 turned without looking. Their 10 was right behind, so the turn went straight into the tackle, and now they're running at our goal.",
        marks: [{ h: ['them:10'], c: 'bad' }],
        options: [
          { t: 'Look over the shoulder first, see the 10, and play it first time to the 3', ok: true,
            why: 'One look before the ball arrives shows the 10 is there. A first-time pass to the 3 leaves the 10 behind.' },
          { t: 'Shield the ball and wait for help',
            why: 'Their 10 is already right there, and more of them are coming. Waiting just gives them time to take it.' },
          { t: 'Turn faster',
            why: "Turning faster doesn't help if you turn into a player you didn't see. The look is what says: don't turn." }
        ],
        rewind: 's0',
        fix: [
          { t: 1.0, pass: 'us:6', face: { 'us:6': 'down' }, them: { 10: [27.2, 47.1], 9: [32, 59] }, look: ['us:6', [27, 43]],
            say: 'This time the 6 looks over the shoulder before the ball arrives...' },
          { t: .8, pass: 'us:3', us: { 3: [9, 57] }, say: '...sees the 10, and plays it first time to the 3.' }
        ],
        after: { text: "The look made the decision. Their 10 was close, so the 6 didn't try to turn. One touch to the 3, and their press is beaten.",
          marks: [{ v: ['us:6', [27, 43]] }, { h: ['them:10'], c: 'good' }] } },
      { t: 1.0, pass: 'us:4', us: { 4: [25, 63], 6: [31, 49] }, them: { 10: [20, 52] }, say: 'Their 10 chases the ball, so the 3 plays it back to the 4.' },
      { t: 1.0, pass: 'us:6', face: { 'us:6': 'down' }, look: ['us:6', [30, 38]], say: 'The 4 finds the 6 again, and again the 6 looks first.' },
      { t: 1.1, us: { 6: [31, 44], 10: [34, 35] }, face: { 'us:6': 'up' }, them: { 6: [27, 38] }, say: 'Nobody close this time, so the 6 turns and drives forward.' },
      { freeze: 'good',
        text: 'Same habit, different answer. This time the look showed nobody close, so the 6 turned and drove forward. Look first, then decide.',
        marks: [{ v: ['us:6', [30, 36]] }] }
    ]
  },

  {
    key: 'Switch the play',
    rule: 'If one side is crowded, get the ball and send it to the other side, fast.',
    intro: 'Our 3 has the ball on the left, and their players are crowding that side. Watch the 6.',
    start: {
      us: { 1: [25, 71], 3: [8, 57], 4: [22, 63], 2: [40, 58], 6: [24, 50], 10: [22, 38], 11: [6, 36], 9: [24, 26], 7: [44, 32] },
      them: { 1: [25, 3], 2: [9, 30], 4: [20, 22], 3: [34, 24], 6: [17, 38], 10: [16, 45], 7: [11, 49], 9: [23, 57], 11: [34, 48] },
      ball: 'us:3'
    },
    steps: [
      { t: 1.0, us: { 6: [20, 51] }, them: { 7: [8, 52], 10: [14, 48] }, say: 'Their 7 closes the 3 down. The 6 moves across to give the 3 a pass.' },
      { t: .8, pass: 'us:6', face: { 'us:6': 'right' }, say: 'The 3 plays it inside to the 6.' },
      { freeze: 'good',
        text: 'The 3 was stuck in the corner. The 6 moved into the space alongside, so the 3 had an easy pass out of the crowd.',
        marks: [{ z: [12, 47, 8], c: 'bad' }] },
      { snap: 's1', t: 1.0, pass: 'them:6', pd: .15, us: { 11: [8, 40] }, them: { 6: [13, 43], 2: [9, 34] },
        say: 'Then the 6 plays it straight back up the crowded left...' },
      { t: .9, them: { 6: [17, 47], 10: [21, 44.5] }, us: { 6: [21, 50.5] }, say: '...and their 6 picks it off.' },
      { freeze: 'bad',
        text: 'The 6 sent it back into the crowd. Four of their players were on that side, and our 2 was wide open on the other side.',
        marks: [{ z: [12, 44, 9], c: 'bad' }, { h: ['us:2'], c: 'good' }],
        options: [
          { t: 'Play it across to the 2 on the open side', ok: true,
            why: 'Their whole team shifted left. One pass to the 2, and the 2 has the whole right side to run into.' },
          { t: 'Dribble past their 7',
            why: 'Dribbling into four of their players is how you lose it. The space is on the other side.' },
          { t: 'Play it back to the 3',
            why: "It's safe, but the 3 is stuck in the crowd too. It doesn't get us out." }
        ],
        rewind: 's1',
        fix: [
          { t: 1.1, pass: 'us:2', us: { 2: [42, 55] }, them: { 11: [37, 50] }, say: 'This time the 6 swings it across to the 2.' },
          { t: 1.2, us: { 2: [44, 46], 7: [46, 28], 10: [28, 35] }, them: { 11: [40, 47.5], 3: [38, 28] }, say: 'The 2 has the whole right side to run into.' }
        ],
        after: { text: "That's the switch. Their whole team was on the left, so one pass to the right put the 2 in all that space.",
          marks: [{ z: [41, 40, 7], c: 'good' }] } },
      { t: 1.0, pass: 'us:7', us: { 7: [45, 24] }, them: { 3: [40, 24.5] }, say: 'And the 2 finds the 7 up the line.' },
      { freeze: 'good', head: 'See what the 6 started?',
        text: 'The 6 took the ball from the crowded side and sent it straight to the open side. Two passes later, we are attacking down the right.',
        marks: [{ h: ['us:7'], c: 'good' }] }
    ]
  },

  {
    key: 'Protect the middle',
    rule: 'When they have the ball, stay in the middle, close to their 10. Let the wide players be handled by our wide players.',
    intro: 'They have the ball at the back. Watch how the 6 moves when the ball moves.',
    start: {
      us: { 1: [25, 70], 3: [12, 57], 4: [25, 60], 2: [38, 57], 6: [25, 45], 10: [24, 34], 11: [11, 32], 9: [27, 28], 7: [39, 32] },
      them: { 1: [25, 4], 2: [8, 17], 4: [24, 14], 3: [41, 17], 6: [25, 23], 10: [26, 39], 7: [7, 38], 9: [24, 53], 11: [43, 38] },
      ball: 'them:4'
    },
    steps: [
      { t: 1.2, pass: 'them:3', them: { 3: [42, 19], 10: [28, 37] },
        us: { 9: [33, 23], 7: [38, 26], 10: [28, 31.5], 6: [27, 43], 2: [38, 55], 4: [26, 59], 3: [15, 57], 11: [14, 32] },
        say: 'Their 4 passes it out to the right. Our whole team shifts across.' },
      { freeze: 'good',
        text: "When the ball went right, the 6 shifted right too, but only a few steps: still in the middle, close to their 10, and right in the way of a pass to their 9.",
        marks: [{ l: ['them:3', 'them:9'], c: 'bad', x: 1, xat: [30, 40] }, { h: ['them:10', 'them:9'], c: 'them' }] },
      { snap: 's1', t: 1.0, pass: 'them:11', them: { 11: [44, 33], 3: [42, 21] }, say: 'Their 3 plays it up the line to their 11.' },
      { t: 1.1, us: { 6: [40, 32.5], 2: [42, 41] }, them: { 11: [44, 35], 10: [26, 41] }, say: 'The 6 sprints out wide to chase the ball...' },
      { t: .9, pass: 'them:10', face: { 'them:10': 'down' }, say: '...so their 11 slips it inside to their 10.' },
      { t: 1.0, them: { 10: [25, 47], 9: [21, 54] }, us: { 4: [25, 55], 10: [27, 36] }, say: 'Their 10 turns and runs straight at our back line.' },
      { freeze: 'bad',
        text: 'The 6 chased the ball out wide. Our 2 already had their 11 covered, so now nobody is in the middle, and their 10 is free to turn and run at us.',
        marks: [{ z: [26, 43, 6], c: 'bad' }, { h: ['them:10'], c: 'bad' }],
        options: [
          { t: 'Stay in the middle, close to their 10, and let the 2 take their 11', ok: true,
            why: "The 2 handles the wide player. The 6 protects the middle, so the pass inside isn't there." },
          { t: "Chase the ball too, so it's two against one",
            why: 'Two on one sounds good, but it empties the middle. One pass inside beats both of them.' },
          { t: 'Drop back into our back line',
            why: 'Too deep. Their 10 gets the ball in front of our backs with time to turn and shoot.' }
        ],
        rewind: 's1',
        fix: [
          { t: 1.0, pass: 'them:11', them: { 11: [44, 33], 3: [42, 21], 10: [27, 38] }, us: { 2: [42, 41], 6: [32, 40], 4: [28, 57] },
            say: 'This time the 2 steps up to their 11, and the 6 stays in the middle.' },
          { t: 1.0, them: { 11: [45, 36] }, us: { 2: [43, 42] }, say: 'Their 11 looks inside, but the 6 is in the way.' },
          { t: 1.0, pass: 'them:3', them: { 3: [43, 23] }, say: 'So their 11 has to play it back.' }
        ],
        after: { text: 'The 2 took their 11, the 6 stayed close to their 10, and they had to go backwards. The middle stayed shut.',
          marks: [{ h: ['them:10'], c: 'good' }] } }
    ]
  },

  {
    key: 'Stay home, slow the counter',
    rule: 'When we attack, stay behind the ball. If we lose it, get in front of the runner, stay on your feet and push the runner wide.',
    intro: "We're attacking. Watch where the 6 goes, and what the 6 does when we lose the ball.",
    start: {
      us: { 1: [25, 66], 3: [10, 50], 4: [25, 54], 2: [40, 50], 6: [25, 42], 10: [27, 24], 11: [8, 20], 9: [24, 13], 7: [42, 18] },
      them: { 1: [25, 3], 2: [11, 13], 4: [21, 8], 3: [37, 12], 6: [26, 19], 10: [20, 28], 7: [12, 33], 9: [27, 36], 11: [38, 31] },
      ball: 'us:7'
    },
    steps: [
      { t: 1.2, us: { 10: [30, 18.5], 9: [26, 11], 11: [7, 17], 6: [26, 41], 2: [40, 46], 3: [12, 46] }, them: { 3: [40, 15], 6: [25.5, 21.5] },
        say: 'Our 7 has it near their box. Everyone pushes forward, except the 6.' },
      { freeze: 'good',
        text: "Everyone went forward, but the 6 stayed behind the ball, right in front of their 9. If we lose it, the 6 is already in the way.",
        marks: [{ h: ['them:9', 'them:10'], c: 'them' }] },
      { snap: 's1', t: .9, pass: 'them:6', pd: .1, them: { 6: [30, 23] }, say: 'Our 7 tries to cut it inside, and their 6 intercepts.' },
      { t: .9, pass: 'them:10', face: { 'them:10': 'down' }, them: { 10: [22, 31] }, say: 'Their 6 finds their 10, who turns to run.' },
      { t: 1.0, us: { 6: [22.5, 34.8] }, them: { 10: [22, 33] }, say: 'The 6 dives in to win it...', close: 1 },
      { t: 1.0, them: { 10: [27, 44], 9: [23, 48], 7: [16, 44] }, us: { 6: [19.5, 37] }, say: '...and their 10 goes right past.', close: 1 },
      { freeze: 'bad',
        text: 'The 6 dived in. Their 10 went straight past, and now our three backs are facing three of their players running at them.',
        marks: [{ h: ['them:10', 'them:9', 'them:7'], c: 'bad' }],
        options: [
          { t: 'Get in front of their 10, stay on your feet, and steer the run toward the sideline', ok: true,
            why: "The 6 doesn't have to win the ball. Slowing their 10 down gives our 10 and wingers time to get back." },
          { t: 'Slide in harder',
            why: "Miss, and their 10 is through. Staying on your feet means you're still in the way." },
          { t: 'Sprint back to our goal',
            why: 'Running away gives their 10 a free run with the ball. Get in the way first.' }
        ],
        rewind: 's1',
        fix: [
          { t: .9, pass: 'them:6', pd: .1, them: { 6: [30, 23] }, say: 'Same turnover...' },
          { t: .9, pass: 'them:10', face: { 'them:10': 'down' }, them: { 10: [22, 31] }, us: { 6: [23, 38] },
            say: "This time the 6 gets in front of their 10 and doesn't dive in." },
          { t: 1.2, them: { 10: [17, 37] }, us: { 6: [20, 40.5], 10: [25, 29], 11: [15, 28], 7: [34, 29] }, say: 'The 6 shows their 10 the sideline...' },
          { t: 1.2, them: { 10: [13, 42], 7: [8, 47], 9: [28, 46] }, us: { 6: [17, 44], 10: [21, 36], 11: [10, 36], 3: [11, 50] },
            say: '...and keeps their 10 busy while help arrives.' }
        ],
        after: { text: "The 6 didn't even win the ball, and that's fine. Their 10 got slowed down and pushed wide, and now our 10, our 11 and our 3 are back to help.",
          marks: [{ h: ['us:10', 'us:11', 'us:3'], c: 'good' }] } }
    ]
  }
];
window.LEARN_LIB.define({ me: '6', keys: KEYS });
})();
