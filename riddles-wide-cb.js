/* Riddles for the wide center backs. Written for the 3 on the left; the 2's set is the mirror image.
   Side-specific words use the placeholders described in riddles-core.js. */
(function () {
const { P, TOO_SAFE, steal, say } = window.RIDDLE_LIB;

const CHAPTERS = [
  { name: 'Build out', blurb: 'You have the ball. Start the attack from the back.' },
  { name: 'Long ball or safe ball', blurb: 'Over them, through them, or out of trouble.' },
  { name: 'Defend your side', blurb: '1 v 1 on the wing. Show the winger outside and stay on your feet.' },
  { name: 'Tuck in and cover', blurb: 'Ball far away? Help in the middle.' },
  { name: 'Join the attack', blurb: 'When to go forward, and when to stay home.' },
  { name: 'Transitions', blurb: 'The ball just changed teams. React first.' }
];

const RIDDLES = [
/* ---------------- 1. Build out ---------------- */
{ ch: 0, type: 'ball', title: 'Into the run',
  prompt: 'You have the ball with time. Your {11} is wide on the line, and their {t2} is way inside.',
  hint: 'Is there grass in front of your {11}?',
  lesson: 'Teammate free with open grass ahead? Play it into the space ahead, to run onto.',
  us:   { 1:[25,71], 3:[12,56], 4:[25,59], 2:[38,57], 6:[24,46], 10:[26,33], 11:[6,38], 9:[25,19], 7:[44,30] },
  them: { 1:[25,4], 2:[18,26], 4:[24,23], 3:[38,23], 6:[27,37], 10:[22,42], 9:[29,52], 7:[17,49], 11:[40,49] },
  ball: '3',
  pass: {
    11: P(2, 'Good', 'The {11} is free, with open grass ahead. Play it in front of the {11} to run onto.'),
    6:  P(1, 'Marked', 'Their 10 is right on your 6.'),
    4:  TOO_SAFE('Sideways, when your {11} was free up the line.'),
    1:  TOO_SAFE('Back to the keeper when your {11} was free.')
  },
  lead: [
    [6, 28, 3.5, 3, 'Pro choice', 'Their {t2} was way inside, so you played it into the open grass in front of your {11}. The {11} runs onto it at full speed.', '11', null, true]
  ],
  leadNote: 'Your {11} has open grass ahead. Play it into that space.',
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Your {11} is free. Use that.'),
  best: { kind: 'pass', to: '11', at: [6,28] } },

{ ch: 0, type: 'ball', title: 'To feet',
  prompt: 'You have the ball with time. Your {11} came short, but their {t2} is right behind.',
  hint: 'Where is their {t2}? What happens to a pass in front of your {11}?',
  lesson: 'Defender right behind your teammate? Play it to feet. A pass in front runs straight to the defender.',
  us:   { 1:[25,71], 3:[12,56], 4:[25,59], 2:[38,57], 6:[24,46], 10:[26,33], 11:[7,39], 9:[25,19], 7:[44,30] },
  them: { 1:[25,4], 2:[8,34.4], 4:[24,23], 3:[38,23], 6:[27,37], 10:[22,42], 9:[29,52], 7:[17,49], 11:[40,49] },
  ball: '3',
  pass: {
    11: P(3, 'Pro choice', 'Their {t2} was right behind, so you played it to feet. The {11} can hold it, set it back, or turn if their {t2} gets too close.'),
    6:  P(1, 'Marked', 'Their 10 is right on your 6.'),
    4:  TOO_SAFE('Sideways, when your {11} had come short for it.'),
    1:  TOO_SAFE('Back to the keeper when your {11} had come short for it.')
  },
  lead: [
    [7, 30, 3.5, 0, 'Into the run', 'Their {t2} is right behind your {11}. A pass in front goes straight to their {t2}.', '11', '2']
  ],
  leadNote: 'Their {t2} is right behind. Play it to feet.',
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Your {11} came short for it. Use that pass.'),
  best: { kind: 'pass', to: '11' } },

{ ch: 0, type: 'ball', title: 'Step in with it',
  prompt: 'Nobody is pressing you. Their {t7} went back to mark your {11}.',
  hint: 'Who is in front of you? What can you do with that space?',
  lesson: 'Nobody in front of you? Dribble forward into the space. Make one of them come to you, and a teammate gets free.',
  us:   { 1:[25,71], 3:[12,57], 4:[25,59], 2:[38,57], 6:[25,47], 10:[27,33], 11:[6,36], 9:[25,19], 7:[44,30] },
  them: { 1:[25,4], 2:[12,24], 4:[24,23], 3:[38,23], 6:[29,36.5], 10:[23,43], 9:[28,53], 7:[8,40], 11:[40,49] },
  ball: '3',
  pass: {
    11: P(0, 'Intercepted', 'Their {t7} is right in front of your {11} and steps in.', { cut: '7' }),
    6:  P(1, 'Marked', 'Their 10 is right on your 6.'),
    4:  TOO_SAFE('Sideways, when you had open grass in front of you.'),
    1:  TOO_SAFE('Back to the keeper with nobody pressing you?')
  },
  shoot: null,
  carry: [[14, 45, 4, 3, 'Pro choice', 'Nobody was in front of you, so you dribbled into the space. Now one of them has to come to you, and a teammate gets free.']],
  elsewhere: P(1, 'Not quite', 'Dribble forward into the open space in front of you.'),
  best: { kind: 'carry', at: [14,45] } },

{ ch: 0, type: 'ball', title: 'Move it across',
  prompt: 'Their {t7} and 9 are pressing you. Their whole team has shifted to your side.',
  hint: 'Where is the free space? Who can get the ball there?',
  lesson: 'Crowded on your side? Move the ball to the other side through the middle. Your 4 can switch it.',
  us:   { 1:[25,71], 3:[12,57], 4:[24,60], 2:[39,57], 6:[22,46], 10:[24,33], 11:[6,33], 9:[25,19], 7:[44,30] },
  them: { 1:[25,4], 2:[12,22], 4:[24,23], 3:[37,23], 6:[27,36.5], 10:[22,42], 9:[16.5,54], 7:[10,51.5], 11:[31,50] },
  ball: '3',
  arrows: [{ team: 'them', from: [9.4,48.6], to: [9.9,51.2] }, { team: 'them', from: [18.2,52], to: [16.8,53.7] }],
  pass: {
    4:  P(3, 'Pro choice', 'Their team crowded your side, so you played it to your 4. The 4 can switch it to your {2}, who is free.'),
    1:  P(2, 'Good', 'Safe, and your keeper can switch it. But your 4 was free and closer.'),
    2:  P(1, 'Across our box', 'A long pass across the front of our goal is risky. Your 4 can switch it more safely.'),
    6:  P(0, 'Intercepted', 'Their 9 is standing in that lane.', { cut: '9' }),
    11: P(0, 'Intercepted', 'Their {t7} is right in that lane.', { cut: '7' })
  },
  shoot: null,
  carry: [],
  elsewhere: P(0, 'Trapped', 'Two players are on you. Dribbling here loses the ball.'),
  best: { kind: 'pass', to: '4' } },

{ ch: 0, type: 'ball', title: 'Look inside',
  prompt: 'Their {t7} is standing in the line between you and your {11}.',
  hint: 'That pass is blocked. Who is free inside?',
  lesson: 'If the pass up the line is blocked, look inside. A free teammate in the middle is the way forward.',
  us:   { 1:[25,71], 3:[11,57], 4:[25,60], 2:[39,57], 6:[20,47], 10:[26,33], 11:[6,37], 9:[25,19], 7:[44,30] },
  them: { 1:[25,4], 2:[10,26], 4:[24,23], 3:[38,23], 6:[25,37], 10:[27,43], 9:[28,53], 7:[9,50], 11:[38,49] },
  ball: '3',
  pass: {
    6:  P(3, 'Pro choice', 'Their {t7} blocked the pass up the line, so you played it inside to your 6. The 6 is free and facing forward.'),
    11: P(0, 'Intercepted', 'Their {t7} is standing right in that lane.', { cut: '7' }),
    4:  TOO_SAFE('Safe, but your 6 was free and facing forward.'),
    1:  TOO_SAFE('Back to the keeper when your 6 was free.')
  },
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'The pass up the line is blocked. Look inside.'),
  best: { kind: 'pass', to: '6' } },

/* ---------------- 2. Long ball or safe ball ---------------- */
{ ch: 1, type: 'ball', title: 'Down the line',
  prompt: 'Their {t7} is closing you down from the inside, and their 9 is blocking the pass to your 4.',
  hint: 'Which way is their {t7} coming from? Where is the free space?',
  lesson: 'Pressed from the inside? Go down the line. Put it into the space ahead of your winger.',
  us:   { 1:[25,71], 3:[10,60], 4:[25,61], 2:[38,59], 6:[24,49], 10:[24,36], 11:[6,38], 9:[25,22], 7:[43,34] },
  them: { 1:[25,4], 2:[16,31], 4:[26,25.5], 3:[38,26], 6:[22,40], 10:[26,45], 9:[21,57.5], 7:[14,56.5], 11:[37,52] },
  ball: '3',
  arrows: [{ team: 'them', from: [16,54], to: [14.2,56.3] }],
  pass: {
    11: P(2, 'Good', 'The {11} is free, but there is open grass ahead. Play it into that space.'),
    4:  P(1, 'Risky', 'Across the front of our box, with their 9 right there.'),
    6:  P(0, 'Intercepted', 'Their {t7} is coming from that side and steps into the pass.', { cut: '7' }),
    1:  P(1, 'Risky', 'Back to the keeper with their {t7} chasing it.')
  },
  lead: [
    [5, 30, 4, 3, 'Pro choice', 'Their {t7} came from the inside, so you went down the line, into the space ahead of your {11}.', '11', null, true]
  ],
  leadNote: 'Go down the line, into the space ahead of your {11}.',
  shoot: null,
  carry: [],
  elsewhere: P(0, 'Trapped', 'Their {t7} is on you. Dribbling here loses the ball.'),
  best: { kind: 'pass', to: '11', at: [5,30] } },

{ ch: 1, type: 'ball', title: 'The long switch', air: true,
  prompt: 'You have time on the ball. Their whole team has shifted to our {left} side. Your {7} is all alone on the far wing.',
  hint: 'Where is the space on the field?',
  lesson: 'Their team all on one side and you have time? Hit the long ball to the far side. One pass skips their whole team.',
  us:   { 1:[25,71], 3:[12,55], 4:[25,59], 2:[37,57], 6:[22,45], 10:[20,33], 11:[6,32], 9:[22,20], 7:[44,31] },
  them: { 1:[25,4], 2:[10,27], 4:[21,15.5], 3:[32,18], 6:[23,28.5], 10:[18,40], 9:[21,51], 7:[15,46], 11:[30,47] },
  ball: '3',
  pass: {
    7:  P(3, 'Pro choice', 'Their whole team shifted to your side, so you hit the long ball to your {7}. The {7} has the whole far wing open.'),
    4:  P(2, 'Good', 'Safe, and your 4 can move it on. But you had time to hit the long switch yourself.'),
    2:  P(1, 'Risky', 'A long pass across the front of our box. If it gets cut out, they are in on goal.'),
    11: P(1, 'Crowded', 'Their {t2} and {t7} are on that side. The space is on the other wing.'),
    6:  P(1, 'Crowded', 'Their 9 and 10 are close. The space is on the far side.'),
    1:  TOO_SAFE('Back to the keeper when you had time to switch it.')
  },
  lead: [
    [45, 23, 3.5, 3, 'Pro choice', 'Their whole team shifted to your side, so you switched it into the space ahead of your {7}. The {7} runs onto it with nobody near.', '7', null, true]
  ],
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Their team is all on your side. Switch it.'),
  best: { kind: 'pass', to: '7' } },

{ ch: 1, type: 'ball', title: 'Over their {t2}', air: true,
  prompt: 'Their {t2} pushed up to mark your {11}. Your 9 is sprinting into the space behind.',
  hint: 'Where is the space? Who is running into it?',
  lesson: 'When their wide defender pushes up, the space is behind. Play it over the top for a runner.',
  us:   { 1:[25,71], 3:[12,56], 4:[25,59], 2:[38,57], 6:[24,46], 10:[25,34], 11:[9,38], 9:[20,27], 7:[44,30] },
  them: { 1:[25,4], 2:[12,34], 4:[25,25], 3:[38,25], 6:[27,39], 10:[22,50], 9:[29,54], 7:[15,50.5], 11:[40,50] },
  ball: '3',
  arrows: [{ team: 'us', from: [19.4,25.4], to: [13.4,18], dash: 1 }],
  pass: {
    11: P(1, 'Marked', 'Their {t2} is right on your {11}. The space is behind their {t2}.'),
    9:  P(1, 'To feet?', 'Your 9 is running into the space behind their {t2}. Play it there.'),
    6:  P(1, 'Marked', 'Their 10 is right on your 6.'),
    4:  TOO_SAFE('Safe, but the space behind their {t2} was the way forward.'),
    1:  TOO_SAFE('Back to the keeper when your 9 was making the run.')
  },
  lead: [
    [10, 18, 4, 3, 'Pro choice', 'Their {t2} pushed up, so you played it over the top into the space your 9 is running into.', '9', null, true],
    [9, 28, 3, 1, 'Their {t2} gets it', 'Their {t2} is closer to that spot than your {11}.', '11', '2']
  ],
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Your 9 is running into the space behind their {t2}. Find that run.'),
  best: { kind: 'pass', to: '9', at: [10,18] } },

{ ch: 1, type: 'ball', title: 'Kick it out',
  prompt: "You're trapped in the corner by our goal. Their {t7} is on you, and their 9 is blocking the pass inside.",
  hint: "Is there a safe pass? If not, what's the safest thing to do?",
  lesson: 'Trapped near our goal with no safe pass? Kick it out of play. A throw-in for them beats losing the ball in front of our goal.',
  us:   { 1:[25,71], 3:[4,64], 4:[22,62], 2:[37,59], 6:[22,51], 10:[24,39], 11:[13,40], 9:[26,26], 7:[42,36] },
  them: { 1:[25,4], 2:[7,43], 4:[25,30], 3:[37,32], 6:[25,44], 10:[19,55], 9:[13,63], 7:[7,61], 11:[35,53] },
  ball: '3',
  arrows: [{ team: 'them', from: [8.6,58.6], to: [7.2,60.7] }],
  pass: {
    4:  P(0, 'Intercepted', 'Their 9 is standing in that lane.', { cut: '9' }),
    6:  P(0, 'Intercepted', 'Their {t7} is right in that lane.', { cut: '7' }),
    11: P(0, 'Blocked', 'Their {t7} is right in front of you.', { cut: '7' }),
    1:  P(1, 'Risky', "A slow pass across our goal with their 9 right there. One toe on it from their 9, and it's a goal.")
  },
  out: P(3, 'Pro choice', 'Trapped in the corner with no safe pass, you kicked it out of play. A throw-in for them is much better than losing the ball in front of our goal.'),
  lead: [
    [6, 42, 4.5, 1, 'To them', 'Up the line, it lands right at their {t2}, and they attack again.', '11', '2']
  ],
  shoot: null,
  carry: [],
  elsewhere: P(0, 'Trapped', 'Their {t7} is on you, right by our goal. Dribbling here is too risky.'),
  best: { kind: 'pass', at: [-2,62.5], out: true } },

{ ch: 1, type: 'ball', title: 'Skip their midfield',
  prompt: 'Their midfield has pushed up. Your 10 has drifted toward your side, into the space behind them.',
  hint: 'Look past their midfield.',
  lesson: 'A pass that skips their midfield is worth more than three sideways passes. Find the free player between the lines.',
  us:   { 1:[25,71], 3:[12,57], 4:[25,60], 2:[38,57], 6:[27,48], 10:[19,39], 11:[6,34], 9:[26,20], 7:[44,31] },
  them: { 1:[25,4], 2:[10,26], 4:[24,23.5], 3:[38,25], 6:[27,40], 10:[25,51], 9:[30,56], 7:[11,50.5], 11:[40,49] },
  ball: '3',
  pass: {
    10: P(3, 'Pro choice', 'Their midfield pushed up, so you found your 10 behind them. One pass skipped their whole midfield.'),
    6:  P(1, 'Marked', 'Their 10 is right on your 6.'),
    11: P(0, 'Intercepted', 'Their {t7} is right in that lane.', { cut: '7' }),
    4:  TOO_SAFE('Safe, but your 10 was free between their lines.'),
    1:  TOO_SAFE('Back to the keeper when your 10 was free.')
  },
  leadNote: 'Your 10 is free right there. Play it to feet.',
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Look for the free player between their lines.'),
  best: { kind: 'pass', to: '10' } },

/* ---------------- 3. Defend your side ---------------- */
{ ch: 2, type: 'move', title: 'Show the winger outside',
  prompt: 'Their {t7} has the ball and is running at you. Your 4 is inside. Drag the {3}.',
  hint: 'Which way do you want their {t7} to go: toward our goal, or toward the sideline?',
  lesson: '1 v 1 on the wing? Get goal side, on the inside shoulder, and show the winger down the line, away from our goal.',
  us:   { 1:[25,71], 3:[13,58], 4:[24,59], 2:[37,57], 6:[22,46], 10:[24,35], 11:[9,35], 9:[25,23], 7:[42,34] },
  them: { 1:[25,4], 2:[11,29], 4:[25,27], 3:[38,29], 6:[22,40], 10:[30,45], 9:[26,53], 7:[10,46], 11:[40,48] },
  ball: { team: 'them', n: '7' },
  zones: [
    [12.2, 49.8, 1.8, 3, 'Pro spot', 'You got goal side, on the inside, a couple of yards off. Their {t7} can only go down the line, away from our goal.'],
    [7.5, 49.5, 1.8, 1, 'Wrong shoulder', 'On the outside, you are showing their {t7} inside, toward our goal.'],
    [10, 47.6, 1, 0, 'Dived in', 'You dove in. One touch past you and their {t7} is gone.'],
    [13, 58, 2.6, 1, 'Too far', 'Their {t7} has all the time in the world to cross or cut inside.']
  ],
  elsewhere: P(1, 'Not quite', 'Get goal side, on the inside shoulder.'),
  best: { kind: 'move', at: [12.2,49.8] } },

{ ch: 2, type: 'move', title: 'Close down the winger',
  prompt: 'Their 6 is passing it out to their {t7} on the wing. Drag the {3}.',
  hint: 'When is the best time to get close: before or after the first touch?',
  lesson: 'Close in while the ball is traveling. Get there as it arrives, goal side, so the first touch is under pressure.',
  us:   { 1:[25,71], 3:[14,58], 4:[25,60], 2:[37,57], 6:[24,45], 10:[24,34], 11:[11,33], 9:[26,22], 7:[42,32] },
  them: { 1:[25,4], 2:[12,26], 4:[24,25.5], 3:[38,28], 6:[20,38], 10:[31,44], 9:[27,52], 7:[8,44], 11:[40,47] },
  ball: { team: 'them', n: '6' },
  arrows: [{ team: 'them', from: [18.6,38.8], to: [9.8,43.3], dash: 1 }],
  zones: [
    [10, 48, 2, 3, 'Pro spot', 'You closed in while the ball was rolling. Their {t7} has to take a first touch with you right there.'],
    [14, 58, 2.6, 1, 'Too far', 'You waited. Now their {t7} controls it, turns, and runs at you.'],
    [8, 40.5, 1.8, 0, 'Wrong side', 'You ran past their {t7}, who is now goal side of you.']
  ],
  elsewhere: P(1, 'Not quite', 'Get there as the ball arrives, goal side.'),
  best: { kind: 'move', at: [10,48] } },

{ ch: 2, type: 'move', title: 'Trust your {11}',
  prompt: 'Their {t7} has the ball. Their {t2} is overlapping on the outside, and your {11} is chasing back. Drag the {3}.',
  hint: 'Your {11} has the runner. Who is yours?',
  lesson: 'Trust your teammates. If your winger tracks the overlap, you stay on the ball.',
  us:   { 1:[25,71], 3:[8,53], 4:[24,59], 2:[37,57], 6:[23,46], 10:[24,35], 11:[8,41.5], 9:[26,23], 7:[42,33] },
  them: { 1:[25,4], 2:[6,37.4], 4:[25,26.5], 3:[38,28], 6:[21,39], 10:[30,44], 9:[27,53], 7:[13,46], 11:[40,48] },
  ball: { team: 'them', n: '7' },
  arrows: [{ team: 'them', from: [6,38.8], to: [4.8,47.5], dash: 1 }, { team: 'us', from: [8.2,43.6], to: [6.6,47], dash: 1 }],
  zones: [
    [15, 49.8, 1.9, 3, 'Pro spot', 'Your {11} is tracking the overlap, so you stayed on the ball, goal side and on the inside. Now their {t7} has nowhere to go.'],
    [5.5, 50.5, 2.2, 1, 'Doubled up', 'Your {11} has the runner. Now their {t7} cuts inside with nobody there.'],
    [8, 53, 2.2, 1, 'Too far', 'Their {t7} has time to pick a pass.']
  ],
  elsewhere: P(1, 'Not quite', 'Your {11} has the runner. You take the ball.'),
  best: { kind: 'move', at: [15,49.8] } },

{ ch: 2, type: 'move', title: 'Recovery run',
  prompt: 'Their {t7} got past you and is dribbling toward our box. Drag the {3}.',
  hint: 'Where is their {t7} going? Where is our goal?',
  lesson: "Beaten? Don't chase from behind. Sprint back on the inside, toward our goal, and get goal side again.",
  us:   { 1:[24,71], 3:[11,49], 4:[24,60], 2:[36,58], 6:[23,47], 10:[24,36], 11:[11,38], 9:[26,24], 7:[42,33] },
  them: { 1:[25,4], 2:[8,31], 4:[25,27.5], 3:[38,28], 6:[21,40], 10:[30,46], 9:[25,54], 7:[9,55.5], 11:[40,49] },
  ball: { team: 'them', n: '7' },
  arrows: [{ team: 'them', from: [9.6,51.6], to: [9.2,55] }],
  zones: [
    [15.5, 63, 2.6, 3, 'Pro spot', 'Their {t7} got past you, so you sprinted back on the inside, toward our goal. Now you are between the ball and the goal again.'],
    [9, 52, 2, 0, 'Behind the play', 'Chasing from behind, you never catch up, and their {t7} can cut inside.'],
    [11, 49, 2.2, 1, 'Gave up', 'Their {t7} is past you. Sprint back!']
  ],
  elsewhere: P(1, 'Not quite', 'Sprint back on the inside, toward our goal.'),
  best: { kind: 'move', at: [15.5,63] } },

{ ch: 2, type: 'move', title: 'Block the cross',
  prompt: 'Their {t7} is near our box, about to cross it. Their 9 is waiting in front of goal. Drag the {3}.',
  hint: 'Where is the cross going? Get in its way.',
  lesson: 'Winger about to cross? Get between the ball and our box, close enough to block it.',
  us:   { 1:[24,72], 3:[14,58], 4:[22,63], 2:[33,63], 6:[24,53], 10:[24,42], 11:[10,48], 9:[26,30], 7:[42,40] },
  them: { 1:[25,4], 2:[11,40], 4:[24,33.5], 3:[38,34], 6:[22,47], 10:[28,58], 9:[21,66.5], 7:[7,62], 11:[37,58] },
  ball: { team: 'them', n: '7' },
  zones: [
    [9.8, 63.6, 1.6, 3, 'Pro spot', 'You got right in front of the cross, between the ball and our box. Their {t7} has to beat you before crossing it.'],
    [14, 58, 2.6, 1, 'Too far', 'From there their {t7} can cross it at will.'],
    [5, 59.5, 1.6, 1, 'Wrong side', "On the outside, you can't block a cross into the box."]
  ],
  elsewhere: P(1, 'Not quite', 'Get between the ball and our box, close to the crosser.'),
  best: { kind: 'move', at: [9.8,63.6] } },

/* ---------------- 4. Tuck in and cover ---------------- */
{ ch: 3, type: 'move', title: 'Tuck in',
  prompt: 'Their {t11} has the ball on the far wing, and your {2} is pressing. You are out wide on your side. Drag the {3}.',
  hint: 'How far is the ball from you? Where is the danger?',
  lesson: 'Ball on the far side? Tuck in toward the middle. Keep the back line tight, and get back out if they switch it.',
  us:   { 1:[27,71], 3:[8,55], 4:[28,58], 2:[39,52], 6:[30,45], 10:[28,34], 11:[14,37], 9:[27,24], 7:[41,33] },
  them: { 1:[25,4], 2:[12,28], 4:[25,27.5], 3:[38,27], 6:[24,39], 10:[33,41], 9:[25,52], 7:[7,45], 11:[41,47] },
  ball: { team: 'them', n: '11' },
  zones: [
    [18, 57, 2.8, 3, 'Pro spot', 'The ball is on the far side, so you tucked in. Our back line is tight, and their 9 has no room in the middle.'],
    [8, 55, 2.6, 1, 'Too wide', 'You are guarding empty grass. If they switch it, you have time to get back out.'],
    [8, 48.5, 2.2, 1, 'Too tight', 'Their {t7} is far from the ball. Marking their {t7} leaves a big gap next to your 4.']
  ],
  elsewhere: P(1, 'Not quite', 'Tuck in toward your 4.'),
  best: { kind: 'move', at: [18,57] } },

{ ch: 3, type: 'move', title: 'Cover your 4',
  prompt: 'Their 9 dropped deep, and your 4 stepped up to stop the turn. Drag the {3}.',
  hint: 'Your 4 left that spot. Who covers it?',
  lesson: 'When a teammate steps up, someone covers behind. Tuck in and fill the gap.',
  us:   { 1:[25,71], 3:[12,57], 4:[25,49.5], 2:[37,57], 6:[30,42], 10:[24,32], 11:[8,33], 9:[27,21], 7:[43,32] },
  them: { 1:[25,4], 2:[11,25], 4:[25,24], 3:[38,25], 6:[22,37], 10:[33,38], 9:[25,45.5], 7:[8,47], 11:[41,47] },
  ball: { team: 'them', n: '6' },
  arrows: [{ team: 'us', from: [25,57], to: [25,50.6], dash: 1 }],
  zones: [
    [20, 58.5, 2.8, 3, 'Pro spot', 'Your 4 stepped up to their 9, so you tucked in behind your 4. If their 9 turns or flicks it on, you are there.'],
    [12, 57, 2.6, 1, 'Too wide', 'Your 4 stepped up, and now there is a big gap in the middle of our defense.'],
    [8, 50.5, 2.2, 1, 'Wrong job', 'Their {t7} is far from the ball. The danger is the gap your 4 left.']
  ],
  elsewhere: P(1, 'Not quite', 'Tuck in behind your 4.'),
  best: { kind: 'move', at: [20,58.5] } },

{ ch: 3, type: 'move', title: 'Pick up the 9',
  prompt: 'Their 9 drifted into the gap between you and your 4. Their {t7} is wide but far from goal. Drag the {3}.',
  hint: 'Who is more dangerous right now?',
  lesson: 'Mark the most dangerous player first. A striker between you and your center back is more dangerous than a winger far from goal.',
  us:   { 1:[25,71], 3:[6,55], 4:[25,59], 2:[38,57], 6:[28,46], 10:[24,33], 11:[8,36], 9:[26,22], 7:[42,33] },
  them: { 1:[25,4], 2:[11,26], 4:[24,25.5], 3:[38,27], 6:[22,36], 10:[26,40], 9:[14,51.5], 7:[5,44], 11:[40,47] },
  ball: { team: 'them', n: '10' },
  arrows: [{ team: 'them', from: [20,50], to: [15.4,51.2], dash: 1 }],
  zones: [
    [14.5, 55.2, 2.2, 3, 'Pro spot', 'Their 9 drifted into your side, so you picked up their 9, goal side. Your 4 stays in the middle.'],
    [6, 55, 2.4, 1, 'Too wide', 'Their 9 is free in the gap between you and your 4.'],
    [13.5, 48, 2, 0, 'Wrong side', 'In front of their 9? One pass over you and their 9 is through.']
  ],
  elsewhere: P(1, 'Not quite', 'Pick up their 9, goal side.'),
  best: { kind: 'move', at: [14.5,55.2] } },

{ ch: 3, type: 'move', title: 'Hold the line',
  prompt: 'Their 6 has the ball, facing their own goal, and your 6 is on the ball. Your 4 and {2} are holding the line, but you dropped deep. Drag the {3}.',
  hint: 'Can their 6 hit a long ball right now? Where is the rest of our line?',
  lesson: 'Ball carrier under pressure? Hold the line with your teammates. One defender too deep keeps everyone onside.',
  us:   { 1:[25,71], 3:[11,60], 4:[25,50], 2:[38,50], 6:[24,37], 10:[29,29], 11:[8,30], 9:[26,18], 7:[43,28] },
  them: { 1:[25,4], 2:[11,21], 4:[24,14.5], 3:[38,21], 6:[23.5,33.5], 10:[31,32.5], 9:[26,45.5], 7:[10,45], 11:[39,44.5] },
  ball: { team: 'them', n: '6' },
  arrows: [{ team: 'us', from: [24.6,39.4], to: [24.1,37.3] }],
  zones: [
    [12, 50.5, 2.6, 3, 'Pro spot', 'Their 6 is under pressure and facing their own goal. You stepped up level with your 4, so their {t7} is offside if they try it.'],
    [11, 60, 3, 1, 'Too deep', 'You are the one keeping their {t7} onside.'],
    [11, 41.5, 2.2, 1, 'Too high', 'Past their {t7}? Now there is space behind you.']
  ],
  elsewhere: P(1, 'Not quite', 'Get level with your 4.'),
  best: { kind: 'move', at: [12,50.5] } },

{ ch: 3, type: 'move', title: 'Back post',
  prompt: 'Their {t11} is about to cross from the far wing. Their {t7} is sneaking toward the back post. Drag the {3}.',
  hint: 'Where do crosses that fly past everyone land?',
  lesson: 'Cross from the far side? Get to the back post, goal side of the attacker, where you can see both the attacker and the ball.',
  us:   { 1:[27,72], 3:[11,55], 4:[26,64], 2:[38,64], 6:[29,54], 10:[27,44], 11:[12,40], 9:[27,32], 7:[41,46] },
  them: { 1:[25,4], 2:[12,33], 4:[24,29], 3:[37,36], 6:[23,47], 10:[33,52], 9:[27,60], 7:[12,59.5], 11:[43,61] },
  ball: { team: 'them', n: '11' },
  arrows: [{ team: 'them', from: [12.4,60], to: [15.2,64.2], dash: 1 }],
  zones: [
    [17, 66.5, 2.4, 3, 'Pro spot', 'The cross is coming from the far side, so you got to the back post, goal side of their {t7}. You can see their {t7} and the ball.'],
    [11, 55, 2.4, 1, 'Ball watching', 'Their {t7} ran right past you into the box.']
  ],
  elsewhere: P(1, 'Not quite', 'Get to the back post, goal side of their {t7}.'),
  best: { kind: 'move', at: [17,66.5] } },

/* ---------------- 5. Join the attack ---------------- */
{ ch: 4, type: 'move', title: 'Overlap', run: true,
  prompt: 'Your {11} is dribbling inside, and their {t2} is going along. Your 6 is covering behind you. Drag the {3}.',
  hint: 'Your {11} took their {t2} inside. What is open now?',
  lesson: 'Winger cutting inside with a defender following? Overlap around the outside. Your run offers a pass and makes room.',
  us:   { 1:[25,71], 3:[11,50], 4:[25,56], 2:[38,55], 6:[24,44], 10:[25,31], 11:[13,36], 9:[26,19], 7:[43,28] },
  them: { 1:[25,4], 2:[15.5,32.5], 4:[24,22.5], 3:[38,23], 6:[27,37], 10:[30,46], 9:[28,52], 7:[18,47], 11:[40,45] },
  ball: { team: 'us', n: '11' },
  arrows: [{ team: 'us', from: [11.6,38.6], to: [14.8,34.6], dash: 1 }],
  zones: [
    [6, 32, 3.2, 3, 'Pro spot', 'Your {11} cut inside and took their {t2} along, so you sprinted around the outside. Now the {11} can slip you in down the line.'],
    [11, 50, 2.4, 1, 'Stayed home', 'Your {11} made room for you, and your 6 was covering. Go!'],
    [17, 40, 2.2, 1, 'Crowded', 'That is where your {11} is going. Go around the outside.']
  ],
  elsewhere: P(1, 'Not quite', 'Go around the outside of your {11}.'),
  best: { kind: 'move', at: [6,32] } },

{ ch: 4, type: 'move', title: 'Stay home', noPayoff: true,
  prompt: 'Your {11} has the ball on the wing. Your 6 has run forward too, and their {t7} and 9 are waiting up the field. Drag the {3}.',
  hint: 'If we lose it now, who is left to defend?',
  lesson: 'Before you go forward, check who is covering. If your 6 already went, stay home.',
  us:   { 1:[25,71], 3:[10,45], 4:[25,57], 2:[38,56], 6:[22,30], 10:[27,24], 11:[7,28], 9:[26,15], 7:[43,22] },
  them: { 1:[25,4], 2:[9,23.5], 4:[24,11.5], 3:[38,16], 6:[19,33.5], 10:[29,38], 9:[24,49], 7:[14,50], 11:[40,42] },
  ball: { team: 'us', n: '11' },
  zones: [
    [13, 56, 2.8, 3, 'Pro spot', 'Your 6 went forward, so you stayed home. If we lose it, you are there to stop their {t7} and 9.'],
    [10, 45, 2.2, 1, 'Halfway', 'Not helping the attack, and not guarding our goal either.'],
    [5, 33, 2.6, 0, 'Overlapped', 'Your 6 went forward too. If we lose it, their {t7} and 9 are two against your 4.']
  ],
  elsewhere: P(1, 'Not quite', 'Your 6 went forward. Stay home and guard our goal.'),
  best: { kind: 'move', at: [13,56] } },

{ ch: 4, type: 'move', title: 'Split wide',
  prompt: 'Your keeper has the ball in both hands. Drag the {3}.',
  hint: 'Where can the keeper find you with the most time?',
  lesson: 'When the keeper has the ball, the wide backs split wide. Width gives the keeper an easy pass and gives you time.',
  us:   { 1:[25,71], 3:[15,64], 4:[25,64], 2:[35,64], 6:[25,52], 10:[24,40], 11:[6,38], 9:[26,26], 7:[44,38] },
  them: { 1:[25,4], 2:[11,32], 4:[24,29.5], 3:[39,32], 6:[21,42], 10:[29,46], 9:[25,57], 7:[13,52], 11:[37,52] },
  ball: { team: 'us', n: '1' },
  zones: [
    [5, 61, 3, 3, 'Pro spot', 'Your keeper has the ball, so you split wide by the sideline. Now the keeper has an easy pass, and you have time to look up.'],
    [15, 64, 2.4, 1, 'Too narrow', 'Too close to your 4. One player can press you both.'],
    [12, 55.5, 2.2, 1, 'Too high', 'Their {t7} is right there.']
  ],
  elsewhere: P(1, 'Not quite', 'Split wide, toward the sideline.'),
  best: { kind: 'move', at: [5,61] } },

{ ch: 4, type: 'move', title: 'Help the {11} out',
  prompt: 'Your {11} has the ball by the sideline, facing our goal. Their {t2} is right behind, and their {t7} is closing from the inside. Drag the {3}.',
  hint: "The {11} can't turn. Where can the pass go?",
  lesson: 'Teammate trapped facing back? Get close behind, with a clear line for the pass. Give a way out.',
  us:   { 1:[25,71], 3:[12,57], 4:[25,58], 2:[38,57], 6:[25,45], 10:[25,33], 11:[6,36], 9:[26,20], 7:[43,30] },
  them: { 1:[25,4], 2:[6,32], 4:[24,23.5], 3:[38,23], 6:[24,29], 10:[28,42], 9:[29,52], 7:[15,40], 11:[40,47] },
  ball: { team: 'us', n: '11' },
  arrows: [{ team: 'them', from: [17,39.2], to: [15.4,39.9] }],
  zones: [
    [8, 45, 2.8, 3, 'Pro spot', 'Your {11} was trapped facing our goal, so you got close behind. Now the {11} has an easy pass back.'],
    [12, 57, 2.6, 1, 'Too far', 'The {11} is trapped between two players. Help out.'],
    [13, 43.5, 1.8, 0, 'Into their {t7}', 'Their {t7} is right there. The pass to you gets cut out.']
  ],
  elsewhere: P(1, 'Not quite', 'Get close behind your {11} for an easy pass back.'),
  best: { kind: 'move', at: [8,45] } },

{ ch: 4, type: 'ball', title: 'Early cross', air: true,
  prompt: 'You overlapped and got the ball on the wing. Their defenders are running back, and your 9 is sprinting to the near post.',
  hint: 'Where will your 9 be when the ball gets there?',
  lesson: 'Defenders running back and your 9 attacking the near post? Cross it early, into the space ahead of the 9.',
  us:   { 1:[25,71], 3:[6,24], 4:[25,48], 2:[38,47], 6:[23,36], 10:[28,26], 11:[15,25], 9:[21,17], 7:[42,22] },
  them: { 1:[25,3], 2:[11,30], 4:[25,19], 3:[34,16], 6:[27,30], 10:[19,40], 9:[29,52], 7:[12,44], 11:[40,40] },
  ball: '3',
  arrows: [{ team: 'us', from: [21,16], to: [20.2,11.6], dash: 1 }],
  pass: {
    9:  P(1, 'Behind the run', "The 9 is attacking the near post. Put it in front of the run."),
    10: P(1, 'Marked', 'Their 6 is right on your 10.'),
    11: P(1, 'Not the best', 'Safe, but your 9 was attacking the space in front of goal.')
  },
  lead: [
    [19.5, 10, 3, 3, 'Pro choice', 'Their defenders were running back, so you crossed it early into the space in front of your 9.', '9', null, true],
    [24, 4, 2.5, 1, 'Too close to the keeper', 'Their keeper comes out and catches it.', '9', '1']
  ],
  shoot: P(0, 'Out of range', 'From way out on the wing, that is not a shot. Find your 9.'),
  carry: [[6, 12, 3, 1, 'Too slow', 'Every touch lets their defenders get back.']],
  elsewhere: P(1, 'Not quite', 'Your 9 is attacking the near post. Find that run.'),
  best: { kind: 'pass', to: '9', at: [19.5,10] } },

/* ---------------- 6. Transitions ---------------- */
{ ch: 5, type: 'move', title: 'Win it back', kind: 'Pressing',
  prompt: 'We just lost the ball. Their {t7} picked it up near you, facing away from our goal. Drag the {3}.',
  hint: 'How close are you? Which way is their {t7} facing?',
  lesson: 'Lost it near you, and the new ball carrier is facing away? Press right away, before the turn.',
  us:   { 1:[25,71], 3:[13,53], 4:[25,57], 2:[38,56], 6:[24,44], 10:[24,32], 11:[12,30], 9:[26,20], 7:[42,28] },
  them: { 1:[25,4], 2:[12,24], 4:[25,23.5], 3:[38,24], 6:[22,36], 10:[30,42], 9:[25,51], 7:[8,44.5], 11:[40,47] },
  ball: { team: 'them', n: '7' },
  zones: [
    [9.3, 48, 2, 3, 'Pro spot', "Their {t7} is facing away, so you closed in right away. No time to turn."],
    [13, 53, 2.2, 1, 'Watching', 'You gave their {t7} time to turn and run at you.'],
    [12, 60, 2.6, 1, 'Dropped off', 'Running back gives their {t7} time. You were close, so press.']
  ],
  elsewhere: P(1, 'Not quite', 'Press now, before the turn.'),
  best: { kind: 'move', at: [9.3,48] } },

{ ch: 5, type: 'move', title: 'Get back',
  prompt: 'We lost the ball while you were up the field. Their {t7} is in the space you left. Drag the {3}.',
  hint: 'Where is the danger? Get between it and our goal.',
  lesson: 'Caught up the field when we lose it? Sprint back toward our goal first. Get goal side, then worry about the ball.',
  us:   { 1:[25,71], 3:[6,30], 4:[25,55], 2:[38,54], 6:[24,42], 10:[26,30], 11:[14,26], 9:[26,18], 7:[42,26] },
  them: { 1:[25,4], 2:[9,25], 4:[25,21.5], 3:[38,22], 6:[23,37], 10:[31,40], 9:[25,49], 7:[11,45], 11:[40,45] },
  ball: { team: 'them', n: '6' },
  zones: [
    [13, 55, 3, 3, 'Pro spot', 'We lost it while you were up the field, so you sprinted straight back toward our goal. Now you can stop their {t7}.'],
    [6, 30, 2.6, 1, 'Stayed up', 'Their {t7} is in all that space behind you.'],
    [20, 38.5, 2.2, 0, 'Chasing the ball', 'Your 6 is already there. Their {t7} is free behind you.']
  ],
  elsewhere: P(1, 'Not quite', 'Sprint back toward our goal.'),
  best: { kind: 'move', at: [13,55] } },

{ ch: 5, type: 'ball', title: 'Behind their {t2}',
  prompt: 'You just won the ball. Their {t2} was caught up the field, and your {11} is free on the wing.',
  hint: "Your {11} is free. Is there grass ahead?",
  lesson: 'Won it and their wide defender is caught forward? Play your winger into the space behind that defender.',
  us:   { 1:[25,71], 3:[11,52], 4:[25,57], 2:[38,56], 6:[24,45], 10:[22,36], 11:[8,38], 9:[26,26], 7:[42,30] },
  them: { 1:[25,4], 2:[15,41], 4:[27,22], 3:[38,24], 6:[20,32], 10:[29,42], 9:[24,50], 7:[13,47.5], 11:[40,48] },
  ball: '3',
  pass: {
    11: P(2, 'Good', 'The {11} is free, but there is open grass ahead. Play it into that space.'),
    6:  P(1, 'Slow', 'Your 6 has their 9 close by, and the counter slows down.'),
    4:  TOO_SAFE('Sideways, when their team is caught forward. Look up the field.'),
    1:  TOO_SAFE('Back to the keeper? Their team is caught forward. Go now.')
  },
  lead: [
    [6, 26, 4, 3, 'Pro choice', 'You won it and their {t2} was caught up the field, so you played it into the space behind. Your {11} runs onto it.', '11', null, true]
  ],
  leadNote: 'Your {11} has open grass ahead. Play it into that space.',
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Too slow', 'Carrying it gives them time to get back. One pass gets your {11} away.'),
  best: { kind: 'pass', to: '11', at: [6,26] } },

{ ch: 5, type: 'move', title: 'Two against you',
  prompt: 'Counterattack! Their {t7} is dribbling at you, and their {t2} is overlapping. Your {11} is stuck up the field. Drag the {3}.',
  hint: 'Can you stop both of them? What do you need until help gets back?',
  lesson: "Two against one with no help? Don't dive in. Back off between them, goal side, and buy time.",
  us:   { 1:[25,71], 3:[16,56], 4:[25,58], 2:[38,56], 6:[24,40], 10:[22,30], 11:[10,30], 9:[26,20], 7:[42,28] },
  them: { 1:[25,4], 2:[5,41], 4:[25,23.5], 3:[38,24], 6:[21,35], 10:[30,44], 9:[25,51], 7:[14,45], 11:[40,46] },
  ball: { team: 'them', n: '7' },
  arrows: [{ team: 'them', from: [5,42], to: [5,49], dash: 1 }, { team: 'us', from: [24.2,40.6], to: [22.6,45], dash: 1 }],
  zones: [
    [10.5, 52, 2.2, 3, 'Pro spot', "Two against one and no help yet, so you backed off between them, goal side. Their {t7} can't go past you or pass easily, and help is coming."],
    [14, 47.6, 1.2, 0, 'Dived in', 'You dove in. Their {t7} slips it to their {t2}, and they are through.'],
    [5.5, 48.5, 2, 1, 'Left the ball', 'You went to the runner, and their {t7} dribbles straight at our goal.'],
    [16, 56, 2.2, 1, 'Too far', 'Their {t7} runs at our box with nobody there.']
  ],
  elsewhere: P(1, 'Not quite', 'Back off between them, goal side.'),
  best: { kind: 'move', at: [10.5,52] } },

{ ch: 5, type: 'ball', title: 'Look forward first',
  prompt: 'You just won the ball from their {t7}. Look up.',
  hint: 'Look forward first. Who is free and facing their goal?',
  lesson: 'Just won it? Look forward first. A quick pass to a free teammate catches them before they get back.',
  us:   { 1:[25,71], 3:[12,55], 4:[25,58], 2:[38,56], 6:[24,48], 10:[19,38], 11:[6,36], 9:[25,24], 7:[43,30] },
  them: { 1:[25,4], 2:[9,30], 4:[25,20], 3:[38,22], 6:[27,36], 10:[29,46], 9:[26,53], 7:[10,59.5], 11:[40,46] },
  ball: '3',
  pass: {
    10: P(3, 'Pro choice', 'You looked forward first. Your 10 was free and facing their goal, so you got it there before they could get back.'),
    11: P(2, 'Good', 'Up the line works, but your 10 was free in the middle, facing forward.'),
    6:  P(1, 'Crowded', 'Their 9 and 10 are both close to your 6.'),
    4:  TOO_SAFE('Safe, but your 10 was free and facing forward.'),
    1:  TOO_SAFE('Back to the keeper? Look forward first.')
  },
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Look forward. Who is free?'),
  best: { kind: 'pass', to: '10' } }
];

// ---------------------------------------------------------------------------
// Motion: the written plays (format at the top of riddles-motion.js). Written for the 3 and
// mirrored for the 2, so captions use the same placeholders as the puzzle text.
const back = (head, sub, cam) => say(head, sub, cam, { t: 1.1, them: { 2: [11, 33] }, tag: { 'them:2': 'BACK' } });
const MOTION = {
  /* ---- 1. Build out ---- */
  'Into the run': {
    intro: { start: { ball: 'us:4', us: { 3: [13, 59], 11: [8, 44] }, them: { 2: [15, 31] } },
      cam: { at: [18, 60], zoom: 1.45, tilt: .5 },
      steps: [
        { t: 1.5, pass: 'us:3', pd: .1, us: { 3: [12, 56], 11: [6, 38] }, them: { 2: [18, 26] }, head: 'Your 4 gives you the ball',
          sub: 'Your {11} is wide on the line, and their {t2} is way inside.', cam: { at: [12, 44], zoom: 1.2, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      lead0: [{ t: 1.1, us: { 11: [7, 18] }, tag: { 'us:11': ['AWAY', 'good'] }, hatch: [{ pts: [[0, 10], [14, 10], [14, 34], [0, 34]], c: 'good' }], head: 'Into the run',
        sub: 'Their {t2} was way inside, so you played it into the open grass in front of your {11}.', cam: { at: [12, 24], zoom: 1.2, tilt: .55 }, wait: 1.2 }],
      11: say('To feet', 'Safe, but now their {t2} can get back to your {11}. The space was up the line.', { at: [10, 36], zoom: 1.35, tilt: .55 },
        { t: 1.1, them: { 2: [11, 33] }, tag: { 'them:2': 'PRESS' } }),
      6: steal('6', '10', [23.5, 43.5], 'Marked', 'Their 10 is right on your 6.'),
      4: back('Too safe', 'Sideways, and their {t2} has time to get back to your {11}.', { at: [16, 46], zoom: 1.1, tilt: .55 }),
      1: back('Too safe', 'Back to the keeper, and their {t2} has time to get back to your {11}.', { at: [16, 50], zoom: 1, tilt: .55 })
    } },

  'To feet': {
    intro: { start: { ball: 'us:4', us: { 3: [13, 59], 11: [6, 32] }, them: { 2: [8, 28] } },
      cam: { at: [18, 60], zoom: 1.45, tilt: .5 },
      steps: [
        { t: 1.5, pass: 'us:3', pd: .1, us: { 3: [12, 56], 11: [7, 39] }, them: { 2: [8, 34.4] }, tag: { 'them:2': 'FOLLOW' }, head: 'Your {11} comes short',
          sub: 'But their {t2} follows, right behind.', cam: { at: [10, 44], zoom: 1.3, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      11: [{ t: .9, tag: { 'us:11': ['HOLDS IT', 'good'] }, head: 'To feet', sub: 'Their {t2} was right behind, so you played it to feet…', cam: { at: [9, 42], zoom: 1.45, tilt: .55 } },
        { t: .8, pass: 'us:3', head: 'To feet', sub: '…and your {11} lays it back to you. You keep the ball.', cam: { at: [10, 48], zoom: 1.3, tilt: .55 }, wait: 1.1 }],
      6: steal('6', '10', [23.5, 43.5], 'Marked', 'Their 10 is right on your 6.'),
      4: say('Too safe', 'Sideways, when your {11} had come short for it.', { at: [18, 52], zoom: 1.2, tilt: .55 }),
      1: say('Too safe', 'Back to the keeper, when your {11} had come short for it.', { at: [18, 58], zoom: 1.1, tilt: .55 })
    } },

  'Step in with it': {
    intro: { start: { ball: 'us:4', us: { 3: [11, 61] }, them: { 7: [12, 48] } },
      cam: { at: [18, 60], zoom: 1.45, tilt: .5 },
      steps: [
        { t: 1.5, pass: 'us:3', pd: .1, us: { 3: [12, 57] }, them: { 7: [8, 40] }, tag: { 'them:7': 'MARK' }, head: 'Your 4 gives you the ball',
          sub: 'Their {t7} drops back to mark your {11}, and nobody is pressing you.', cam: { at: [12, 48], zoom: 1.3, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      carry0: [{ t: .9, them: { 10: [17.5, 46.5] }, tag: { 'them:10': 'STEPS IN' }, head: 'Step in with it',
          sub: 'Nobody was in front of you, so you dribbled into the space. Their 10 has to come to you…', cam: { at: [16, 44], zoom: 1.4, tilt: .55 } },
        { t: 1, us: { 10: [23, 36] }, pass: 'us:10', pd: .4, tag: { 'us:10': ['FREE', 'good'] }, head: 'Step in with it', sub: '…and that frees your 10.',
          cam: { at: [20, 40], zoom: 1.25, tilt: .55 }, wait: 1.1 }],
      6: steal('6', '10', [24, 44], 'Marked', 'Their 10 is right on your 6.'),
      4: say('Too safe', 'Sideways, when you had open grass in front of you.', { at: [18, 52], zoom: 1.2, tilt: .55 }),
      1: say('Too safe', 'Back to the keeper, with nobody pressing you?', { at: [18, 58], zoom: 1.1, tilt: .55 })
    } },

  'Move it across': {
    intro: { start: { ball: 'us:4', them: { 7: [9, 45], 9: [20, 50], 11: [34, 47], 10: [25, 40], 6: [30, 34] } },
      cam: { at: [20, 58], zoom: 1.45, tilt: .5 },
      steps: [
        { t: 1.5, pass: 'us:3', pd: .1, them: { 7: [10, 51.5], 9: [16.5, 54], 11: [31, 50], 10: [22, 42], 6: [27, 36.5] }, tag: { 'them:7': 'PRESS', 'them:9': 'PRESS' },
          head: 'Your 4 plays it out to you', sub: 'Their {t7} and 9 jump on you, and their whole team shifts to your side.', cam: { at: [20, 50], zoom: 1.2, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      4: [{ t: 1.1, pass: 'us:2', tag: { 'us:2': ['FREE', 'good'] }, hatch: [{ pts: [[34, 38], [50, 38], [50, 62], [34, 62]], c: 'good' }], head: 'Move it across',
        sub: 'Their team crowded your side, so you played it to your 4, who switches it to your {2}.', cam: { at: [33, 54], zoom: 1.2, tilt: .55 }, wait: 1.2 }],
      1: say('Safe', 'Your keeper can switch it, but your 4 was free and closer.', { at: [24, 64], zoom: 1.2, tilt: .5 }),
      2: say('Across our box', 'A long pass across the front of our goal is risky. Your 4 can switch it more safely.', { at: [28, 60], zoom: 1.15, tilt: .5 })
    } },

  'Look inside': {
    intro: { start: { ball: 'us:4', us: { 6: [24, 43] }, them: { 7: [12, 45] } },
      cam: { at: [18, 60], zoom: 1.45, tilt: .5 },
      steps: [
        { t: 1.5, pass: 'us:3', pd: .1, us: { 6: [20, 47] }, them: { 7: [9, 50] }, head: 'Your 4 plays it out to you',
          sub: 'Their {t7} steps into the line between you and your {11}.', cam: { at: [12, 50], zoom: 1.3, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      6: [{ t: 1, us: { 6: [21, 42] }, tag: { 'us:6': ['FREE', 'good'], 'them:7': 'BYPASSED' }, head: 'Look inside',
        sub: 'Their {t7} blocked the pass up the line, so you played it inside. Your 6 turns and goes.', cam: { at: [18, 44], zoom: 1.3, tilt: .55 }, wait: 1.2 }],
      4: say('Too safe', 'Safe, but your 6 was free and facing forward.', { at: [18, 54], zoom: 1.2, tilt: .55 }),
      1: say('Too safe', 'Back to the keeper, when your 6 was free.', { at: [18, 58], zoom: 1.1, tilt: .55 })
    } },

  /* ---- 2. Long ball or safe ball ---- */
  'Down the line': {
    intro: { start: { ball: 'us:1', us: { 3: [11, 63] }, them: { 7: [18, 51], 9: [24, 54] } },
      cam: { at: [20, 66], zoom: 1.45, tilt: .5 },
      steps: [
        { t: 1.5, pass: 'us:3', pd: .1, us: { 3: [10, 60] }, them: { 7: [14, 56.5], 9: [21, 57.5] }, tag: { 'them:7': 'PRESS' }, head: 'Your keeper rolls it to you',
          sub: 'Their {t7} closes you down from the inside, and their 9 blocks the pass to your 4.', cam: { at: [14, 58], zoom: 1.4, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      lead0: [{ t: 1.1, us: { 11: [6, 20] }, tag: { 'us:11': ['AWAY', 'good'], 'them:7': 'BYPASSED' }, head: 'Down the line',
        sub: 'Their {t7} came from the inside, so you went down the line, into the space ahead of your {11}.', cam: { at: [10, 28], zoom: 1.2, tilt: .55 }, wait: 1.2 }],
      11: say('To feet', 'The {11} is free, but there was open grass ahead. Play it into that space.', { at: [9, 38], zoom: 1.3, tilt: .55 },
        { t: 1, them: { 2: [11, 34] }, tag: { 'them:2': 'PRESS' } }),
      1: say('Risky', 'Back to the keeper, with their {t7} chasing it.', { at: [22, 66], zoom: 1.35, tilt: .5 }, { t: 1, them: { 7: [20, 64.5] }, tag: { 'them:7': 'PRESS' } }),
      4: steal('4', '9', [23, 59], 'Risky', 'Across the front of our box, with their 9 right there.')
    } },

  'The long switch': {
    intro: { start: { ball: 'us:4', them: { 7: [19, 44], 9: [25, 49], 10: [22, 38], 11: [34, 45], 6: [27, 27], 2: [13, 24], 3: [36, 17], 4: [25, 14] } },
      cam: { at: [20, 58], zoom: 1.4, tilt: .5 },
      steps: [
        { t: 1.6, pass: 'us:3', pd: .1, them: { 7: [15, 46], 9: [21, 51], 10: [18, 40], 11: [30, 47], 6: [23, 28.5], 2: [10, 27], 3: [32, 18], 4: [21, 15.5] },
          head: 'Their whole team shifts to your side', sub: 'You have time on the ball, and your {7} is all alone on the far wing.', cam: { at: [26, 42], zoom: 1.05, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      7: [{ t: 1.1, us: { 7: [43, 22] }, tag: { 'us:7': ['FREE', 'good'] }, hatch: [{ pts: [[35, 8], [50, 8], [50, 40], [35, 40]], c: 'good' }], head: 'The long switch',
        sub: 'Their whole team shifted to your side, so you hit the long ball to your {7}, with the whole far wing open.', cam: { at: [38, 28], zoom: 1.15, tilt: .55 }, wait: 1.2 }],
      lead0: [{ t: 1.1, us: { 7: [44, 13] }, tag: { 'us:7': ['FREE', 'good'] }, hatch: [{ pts: [[35, 6], [50, 6], [50, 40], [35, 40]], c: 'good' }], head: 'The long switch',
        sub: 'Their whole team shifted to your side, so you switched it into the space ahead of your {7}.', cam: { at: [38, 24], zoom: 1.15, tilt: .55 }, wait: 1.2 }],
      4: say('Safe', 'Your 4 can move it on, but you had time to hit the long switch yourself.', { at: [24, 54], zoom: 1.15, tilt: .55 }),
      11: say('Crowded', 'Their {t2} and {t7} are on that side. The space is on the other wing.', { at: [12, 36], zoom: 1.25, tilt: .55 }),
      6: say('Crowded', 'Their 9 and 10 are close. The space is on the far side.', { at: [22, 46], zoom: 1.25, tilt: .55 }),
      2: say('Risky', 'A long pass across the front of our box. If it gets cut out, they are in on goal.', { at: [28, 58], zoom: 1.15, tilt: .5 }),
      1: say('Too safe', 'Back to the keeper, when you had time to switch it.', { at: [22, 60], zoom: 1.1, tilt: .5 })
    } },

  'Over their {t2}': {
    intro: { start: { ball: 'us:4', us: { 11: [7, 33], 9: [25, 30] }, them: { 2: [11, 27] } },
      cam: { at: [18, 60], zoom: 1.45, tilt: .5 },
      steps: [
        { t: 1.5, pass: 'us:3', pd: .1, us: { 11: [9, 38], 9: [20, 27] }, them: { 2: [12, 34] }, tag: { 'them:2': 'FOLLOW' }, head: 'Their {t2} pushes up to mark your {11}',
          sub: 'And your 9 is about to sprint into the space behind.', cam: { at: [14, 36], zoom: 1.2, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      lead0: [{ t: 1.1, us: { 9: [13, 10] }, tag: { 'us:9': ['THROUGH', 'good'], 'them:2': 'BYPASSED' }, hatch: [{ pts: [[0, 8], [18, 8], [18, 30], [0, 30]], c: 'good' }],
        head: 'Over their {t2}', sub: 'Their {t2} pushed up, so you played it over the top into the space your 9 is running into.', cam: { at: [14, 20], zoom: 1.25, tilt: .55 }, wait: 1.2 }],
      9: say('To feet?', 'Your 9 was running into the space behind their {t2}. Play it there.', { at: [18, 30], zoom: 1.3, tilt: .55 }),
      11: steal('11', '2', [10, 35.5], 'Marked', 'Their {t2} is right on your {11}. The space is behind their {t2}.'),
      6: steal('6', '10', [22.5, 48.5], 'Marked', 'Their 10 is right on your 6.'),
      4: say('Too safe', 'Safe, but the space behind their {t2} was the way forward.', { at: [18, 52], zoom: 1.2, tilt: .55 }),
      1: say('Too safe', 'Back to the keeper, when your 9 was making the run.', { at: [18, 58], zoom: 1.1, tilt: .55 })
    } },

  'Kick it out': {
    intro: { start: { ball: 'us:3', us: { 3: [8, 58] }, them: { 7: [12, 54], 9: [17, 59] } },
      cam: { at: [12, 58], zoom: 1.45, tilt: .5 },
      steps: [
        { t: 1.5, us: { 3: [4, 64] }, them: { 7: [7, 61], 9: [13, 63] }, tag: { 'them:7': 'PRESS' }, head: 'Their {t7} chases you into the corner',
          sub: 'And their 9 blocks the pass inside.', cam: { at: [9, 62], zoom: 1.5, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      out: [{ t: .9, them: { 7: [-1.5, 60] }, head: 'Kick it out',
        sub: 'No safe pass, so you kicked it out. A throw-in for them beats losing the ball in front of our goal.', cam: { at: [8, 62], zoom: 1.4, tilt: .5 }, wait: 1.2 }],
      1: say('Risky', 'A slow pass across our goal with their 9 right there. One toe on it, and it is a goal.', { at: [20, 67], zoom: 1.45, tilt: .45 },
        { t: 1, them: { 9: [20, 68.5] }, tag: { 'them:9': 'PRESS' } })
    } },

  'Skip their midfield': {
    intro: { start: { ball: 'us:4', us: { 10: [24, 36] }, them: { 6: [27, 35], 10: [22, 47], 7: [11, 46] } },
      cam: { at: [18, 60], zoom: 1.45, tilt: .5 },
      steps: [
        { t: 1.5, pass: 'us:3', pd: .1, us: { 10: [19, 39] }, them: { 6: [27, 40], 10: [25, 51], 7: [11, 50.5] }, head: 'Their midfield pushes up',
          sub: 'Your 10 drifts toward your side, into the space behind them.', cam: { at: [20, 46], zoom: 1.2, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      10: [{ t: 1.1, us: { 10: [18, 32] }, tag: { 'us:10': ['TURNED', 'good'], 'them:6': 'BYPASSED', 'them:10': 'BYPASSED', 'them:7': 'BYPASSED' }, head: 'Skip their midfield',
        sub: 'Their midfield pushed up, so you found your 10 behind them. One pass skipped their whole midfield.', cam: { at: [20, 38], zoom: 1.2, tilt: .55 }, wait: 1.2 }],
      6: steal('6', '10', [25.5, 50.5], 'Marked', 'Their 10 is right on your 6.'),
      4: say('Too safe', 'Safe, but your 10 was free between their lines.', { at: [18, 52], zoom: 1.2, tilt: .55 }),
      1: say('Too safe', 'Back to the keeper, when your 10 was free.', { at: [18, 58], zoom: 1.1, tilt: .55 })
    } },

  /* ---- 3. Defend your side ---- */
  'Show the winger outside': {
    intro: { start: { ball: 'them:6', them: { 7: [8, 40] } },
      cam: { at: [16, 42], zoom: 1.45, tilt: .55 },
      steps: [
        { t: 1.5, pass: 'them:7', pd: .1, them: { 7: [10, 46] }, head: 'Their {t7} gets it and runs at you', sub: 'Your 4 is inside.', cam: { at: [12, 51], zoom: 1.4, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.1, them: { 7: [5, 55] }, us: { 3: [9.5, 58.5] }, tag: { 'us:3': ['GOAL SIDE', 'good'] }, head: 'Show the winger outside',
          sub: 'Goal side and on the inside, a couple of yards off. Their {t7} can only go down the line…', cam: { at: [9, 55], zoom: 1.45, tilt: .55 } },
        { t: .6, pass: 'us:3', tag: { 'us:3': ['WON IT', 'good'] }, head: 'Show the winger outside', sub: '…away from our goal, until you win it.', wait: 1.1 }],
      zone1: [{ t: 1.1, them: { 7: [17, 55] }, tag: { 'them:7': 'INSIDE' }, head: 'Wrong shoulder', sub: 'On the outside, you showed their {t7} inside, toward our goal.',
          cam: { at: [16, 57], zoom: 1.4, tilt: .55 } },
        { t: .7, shot: [22.5, 75.8], wait: 1 }],
      zone2: [{ t: 1, them: { 7: [9, 57] }, tag: { 'them:7': 'PAST {3}' }, head: 'Dived in', sub: 'One touch past you, and their {t7} is gone.',
        cam: { at: [11, 54], zoom: 1.4, tilt: .55 }, wait: 1.1 }],
      zone3: [{ t: 1, them: { 7: [9, 53] }, head: 'Too far', sub: 'Their {t7} has all the time in the world…', cam: { at: [13, 55], zoom: 1.3, tilt: .55 } },
        { t: 1, pass: 'them:9', air: true, head: 'Too far', sub: '…to cross it.', wait: 1 }]
    } },

  'Close down the winger': {
    intro: { start: { ball: 'them:2', them: { 6: [19, 33], 7: [7, 40] } },
      cam: { at: [15, 30], zoom: 1.4, tilt: .55 },
      steps: [
        { t: 1.5, pass: 'them:6', pd: .1, them: { 6: [20, 38], 7: [8, 44] }, head: 'Their 6 gets it in midfield', sub: 'And is about to pass it out to their {t7} on the wing.',
          cam: { at: [14, 44], zoom: 1.3, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1, pass: 'them:7', tag: { 'us:3': ['TIGHT', 'good'] }, head: 'Close down the winger', sub: 'You closed in while the ball was rolling…',
          cam: { at: [9, 46], zoom: 1.5, tilt: .55 } },
        { t: .6, pass: 'us:3', tag: { 'us:3': ['WON IT', 'good'] }, head: 'Close down the winger', sub: '…so their {t7} has to take a first touch with you right there, and you win it.', wait: 1.1 }],
      zone1: [{ t: 1, pass: 'them:7', head: 'Too far', sub: 'You waited. Their {t7} controls it…', cam: { at: [10, 50], zoom: 1.35, tilt: .55 } },
        { t: 1, them: { 7: [11, 53] }, tag: { 'them:7': 'FREE' }, head: 'Too far', sub: '…turns, and runs at you.', wait: 1 }],
      zone2: [{ t: 1, pass: 'them:7', head: 'Wrong side', sub: 'You ran past their {t7}…', cam: { at: [9, 46], zoom: 1.45, tilt: .55 } },
        { t: 1, them: { 7: [10, 52] }, tag: { 'them:7': 'PAST {3}' }, head: 'Wrong side', sub: '…who turns into the space behind you.', wait: 1 }]
    } },

  'Trust your {11}': {
    intro: { start: { ball: 'them:7', us: { 11: [10, 35] }, them: { 7: [15, 40], 2: [8, 30] } },
      cam: { at: [12, 38], zoom: 1.4, tilt: .55 },
      steps: [
        { t: 1.5, us: { 11: [8, 41.5] }, them: { 7: [13, 46], 2: [6, 37.4] }, tag: { 'them:2': 'OVERLAP' }, head: 'Their {t2} overlaps on the outside',
          sub: 'Their {t7} has the ball, and your {11} is chasing back.', cam: { at: [11, 46], zoom: 1.35, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.1, us: { 11: [7.5, 46.5] }, them: { 2: [4.8, 47.5] }, tag: { 'us:11': ['MARK', 'good'], 'us:3': ['GOAL SIDE', 'good'] }, head: 'Trust your {11}',
          sub: 'Your {11} tracks the overlap, so you stay on the ball, goal side and on the inside…', cam: { at: [11, 49], zoom: 1.4, tilt: .55 } },
        { t: .6, pass: 'us:3', tag: { 'us:3': ['WON IT', 'good'] }, head: 'Trust your {11}', sub: '…and their {t7} has nowhere to go.', wait: 1.1 }],
      zone1: [{ t: 1.1, them: { 7: [19, 54] }, tag: { 'them:7': 'FREE' }, head: 'Doubled up', sub: 'Your {11} had the runner. Now their {t7} cuts inside with nobody there.',
          cam: { at: [18, 56], zoom: 1.35, tilt: .55 } },
        { t: .7, shot: [22.5, 75.8], wait: 1 }],
      zone2: [{ t: .9, them: { 7: [14, 50] }, head: 'Too far', sub: 'Their {t7} has time to pick a pass…', cam: { at: [10, 50], zoom: 1.35, tilt: .55 } },
        { t: 1, pass: 'them:2', them: { 2: [3, 50] }, tag: { 'them:2': 'FREE' }, head: 'Too far', sub: '…to their {t2}, overlapping on the outside.', wait: 1 }]
    } },

  'Recovery run': {
    intro: { start: { ball: 'them:7', them: { 7: [10, 44] } },
      cam: { at: [11, 46], zoom: 1.5, tilt: .55 },
      steps: [
        { t: 1.5, them: { 7: [9, 55.5] }, tag: { 'them:7': 'PAST {3}' }, head: 'Their {t7} gets past you', sub: 'And dribbles toward our box.', cam: { at: [12, 55], zoom: 1.4, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: .9, them: { 7: [11, 60] }, tag: { 'us:3': ['GOAL SIDE', 'good'] }, head: 'Recovery run', sub: 'Their {t7} got past you, so you sprinted back on the inside…',
          cam: { at: [13, 61], zoom: 1.45, tilt: .5 } },
        { t: .6, pass: 'us:3', tag: { 'us:3': ['WON IT', 'good'] }, head: 'Recovery run', sub: '…and you are between the ball and the goal again.', wait: 1.1 }],
      zone1: [{ t: 1, them: { 7: [16, 61] }, head: 'Behind the play', sub: 'Chasing from behind, you never catch up, and their {t7} cuts inside.',
          cam: { at: [16, 62], zoom: 1.4, tilt: .5 } },
        { t: .7, shot: [22.5, 75.8], wait: 1 }],
      zone2: [{ t: 1, them: { 7: [13, 62] }, head: 'Gave up', sub: 'Their {t7} is past you and runs at our goal.', cam: { at: [15, 62], zoom: 1.4, tilt: .5 } },
        { t: .7, shot: [22.5, 75.8], wait: 1 }]
    } },

  'Block the cross': {
    intro: { start: { ball: 'them:7', them: { 7: [8, 54], 9: [17, 63] } },
      cam: { at: [10, 54], zoom: 1.45, tilt: .5 },
      steps: [
        { t: 1.5, them: { 7: [7, 62], 9: [21, 66.5] }, head: 'Their {t7} races down the wing', sub: 'About to cross it. Their 9 waits in front of goal.',
          cam: { at: [13, 63], zoom: 1.4, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: .5, pass: 'us:3', tag: { 'us:3': ['BLOCKED', 'good'] }, head: 'Block the cross',
        sub: 'You got right in front of the cross, between the ball and our box, and it hits you.', cam: { at: [10, 63], zoom: 1.5, tilt: .5 }, wait: 1.2 }],
      zone1: [{ t: 1, pass: 'them:9', air: true, tag: { 'them:9': 'FREE' }, head: 'Too far', sub: 'From there their {t7} can cross it at will.', cam: { at: [17, 66], zoom: 1.4, tilt: .5 } },
        { t: .5, shot: [23, 75.8], wait: 1 }],
      zone2: [{ t: 1, pass: 'them:9', air: true, tag: { 'them:9': 'FREE' }, head: 'Wrong side', sub: "On the outside, you can't block a cross into the box.", cam: { at: [17, 66], zoom: 1.4, tilt: .5 } },
        { t: .5, shot: [23, 75.8], wait: 1 }]
    } },

  /* ---- 4. Tuck in and cover ---- */
  'Tuck in': {
    intro: { start: { ball: 'them:6', us: { 2: [37, 56], 4: [25, 59] }, them: { 11: [42, 42] } },
      cam: { at: [30, 44], zoom: 1.35, tilt: .55 },
      steps: [
        { t: 1.5, pass: 'them:11', air: true, pd: .1, us: { 2: [39, 52], 4: [28, 58] }, them: { 11: [41, 47] }, tag: { 'us:2': ['PRESS', 'good'] },
          head: 'Their {t11} gets it on the far wing', sub: 'Your {2} presses, and you are out wide on your side.', cam: { at: [26, 52], zoom: 1.1, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1, pass: 'them:9', chain: [{ ns: ['us:3', 'us:4'], c: 'good' }], head: 'Tuck in', sub: 'The ball is on the far side, so you tucked in. When it comes inside to their 9…',
          cam: { at: [23, 55], zoom: 1.35, tilt: .55 } },
        { t: .7, us: { 3: [21.5, 54.5] }, tag: { 'us:3': ['TIGHT', 'good'] }, head: 'Tuck in', sub: '…you are right there, and there is no room in the middle.', wait: 1.1 }],
      zone1: [{ t: 1, pass: 'them:9', hatch: [{ pts: [[11, 50], [24, 50], [24, 64], [11, 64]], c: 'bad' }], head: 'Too wide',
          sub: 'You were guarding empty grass, and there is a big gap next to your 4…', cam: { at: [20, 56], zoom: 1.3, tilt: .55 } },
        { t: .9, them: { 9: [19, 60] }, tag: { 'them:9': 'FREE' }, head: 'Too wide', sub: '…and their 9 runs into it.' },
        { t: .7, shot: [23, 75.8], wait: 1 }],
      zone2: [{ t: 1, pass: 'them:9', hatch: [{ pts: [[11, 52], [24, 52], [24, 64], [11, 64]], c: 'bad' }], head: 'Too tight',
          sub: 'Their {t7} was far from the ball. Marking their {t7} left a big gap next to your 4…', cam: { at: [20, 56], zoom: 1.3, tilt: .55 } },
        { t: .9, them: { 9: [19, 60] }, tag: { 'them:9': 'FREE' }, head: 'Too tight', sub: '…and their 9 runs into it.' },
        { t: .7, shot: [23, 75.8], wait: 1 }]
    } },

  'Cover your 4': {
    intro: { start: { ball: 'them:10', us: { 4: [25, 57] }, them: { 9: [25, 52] } },
      cam: { at: [27, 46], zoom: 1.35, tilt: .55 },
      steps: [
        { t: 1.5, pass: 'them:6', pd: .1, us: { 4: [25, 49.5] }, them: { 9: [25, 45.5] }, tag: { 'us:4': ['STEPS IN', 'good'] }, head: 'Their 9 drops deep',
          sub: 'Your 4 steps up to stop the turn.', cam: { at: [23, 48], zoom: 1.3, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: .9, pass: 'them:9', head: 'Cover your 4', sub: 'Your 4 stepped up to their 9, so you tucked in behind…', cam: { at: [23, 52], zoom: 1.35, tilt: .55 } },
        { t: .9, pass: 'us:3', air: true, tag: { 'us:3': ['COVER', 'good'] }, head: 'Cover your 4', sub: '…and when their 9 flicks it on, you are there.', wait: 1.1 }],
      zone1: [{ t: .9, pass: 'them:9', head: 'Too wide', sub: 'Your 4 stepped up…', cam: { at: [23, 52], zoom: 1.35, tilt: .55 } },
        { t: 1, them: { 9: [21, 55] }, tag: { 'them:9': 'PAST 4' }, head: 'Too wide', sub: '…and their 9 spins into the big gap in the middle of our defense.' },
        { t: .7, shot: [23, 75.8], wait: 1 }],
      zone2: [{ t: .9, pass: 'them:9', head: 'Wrong job', sub: 'Their {t7} was far from the ball. The danger was the gap your 4 left…', cam: { at: [23, 52], zoom: 1.35, tilt: .55 } },
        { t: 1, them: { 9: [21, 55] }, tag: { 'them:9': 'PAST 4' }, head: 'Wrong job', sub: '…and their 9 spins into it.' },
        { t: .7, shot: [23, 75.8], wait: 1 }]
    } },

  'Pick up the 9': {
    intro: { start: { ball: 'them:10', them: { 9: [20, 50], 10: [27, 36] } },
      cam: { at: [24, 42], zoom: 1.35, tilt: .55 },
      steps: [
        { t: 1.5, them: { 9: [14, 51.5], 10: [26, 40] }, head: 'Their 9 drifts into the gap', sub: 'Between you and your 4. Their {t7} is wide, but far from goal.',
          cam: { at: [16, 50], zoom: 1.25, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1, pass: 'them:9', tag: { 'us:3': ['MARK', 'good'] }, head: 'Pick up the 9', sub: 'Their 9 drifted into your side, so you picked up their 9, goal side…',
          cam: { at: [15, 53], zoom: 1.45, tilt: .55 } },
        { t: .6, pass: 'us:3', tag: { 'us:3': ['WON IT', 'good'] }, head: 'Pick up the 9', sub: '…and your 4 stays in the middle.', wait: 1.1 }],
      zone1: [{ t: 1, pass: 'them:9', tag: { 'them:9': 'FREE' }, head: 'Too wide', sub: 'Their 9 is free in the gap between you and your 4…', cam: { at: [15, 54], zoom: 1.35, tilt: .55 } },
        { t: .9, them: { 9: [16, 60] }, head: 'Too wide', sub: '…turns, and runs at our goal.' },
        { t: .7, shot: [22.5, 75.8], wait: 1 }],
      zone2: [{ t: 1.2, pass: 'them:9', air: true, them: { 9: [15, 58] }, tag: { 'them:9': 'THROUGH' }, head: 'Wrong side',
          sub: 'In front of their 9? One pass over you and their 9 is through.', cam: { at: [16, 57], zoom: 1.35, tilt: .55 } },
        { t: .7, shot: [22.5, 75.8], wait: 1 }]
    } },

  'Hold the line': {
    intro: { start: { ball: 'them:10', us: { 6: [25, 42], 3: [11, 56] }, them: { 6: [24.5, 30] } },
      cam: { at: [27, 34], zoom: 1.45, tilt: .55 },
      steps: [
        { t: 1.5, pass: 'them:6', pd: .1, us: { 6: [24, 37], 3: [11, 60] }, them: { 6: [23.5, 33.5] }, tag: { 'us:6': ['PRESS', 'good'] }, head: 'Your 6 presses their 6',
          sub: 'Their 6 faces their own goal. Your 4 and {2} hold the line, but you dropped deep.', cam: { at: [22, 46], zoom: 1.15, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1, chain: [{ ns: ['us:3', 'us:4', 'us:2'], c: 'good' }], head: 'Hold the line',
          sub: 'Their 6 is under pressure and facing their own goal, so you stepped up level with your 4…', cam: { at: [20, 48], zoom: 1.25, tilt: .55 } },
        { t: .8, tag: { 'them:7': 'OFFSIDE' }, head: 'Hold the line', sub: '…and their {t7} is offside if they try it.', wait: 1.2 }],
      zone1: say('Too deep', 'You are the one keeping their {t7} onside.', { at: [20, 52], zoom: 1.2, tilt: .55 },
        { chain: [{ ns: ['us:3', 'us:4', 'us:2'], c: 'bad' }], tag: { 'them:7': 'ONSIDE' } }),
      zone2: say('Too high', 'Past their {t7}? Now there is space behind you.', { at: [16, 48], zoom: 1.25, tilt: .55 },
        { chain: [{ ns: ['us:3', 'us:4', 'us:2'], c: 'bad' }], hatch: [{ pts: [[0, 47], [18, 47], [18, 60], [0, 60]], c: 'bad' }] })
    } },

  'Back post': {
    intro: { start: { ball: 'them:11', them: { 11: [42, 52], 7: [16, 53] } },
      cam: { at: [38, 52], zoom: 1.4, tilt: .5 },
      steps: [
        { t: 1.5, them: { 11: [43, 61], 7: [12, 59.5] }, head: 'Their {t11} races down the far wing', sub: 'About to cross. Their {t7} sneaks toward the back post.',
          cam: { at: [28, 60], zoom: 1.1, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.2, pass: 'us:3', air: true, them: { 7: [13.5, 62.5] }, tag: { 'us:3': ['BACK POST', 'good'] }, head: 'Back post',
          sub: 'The cross came from the far side, so you got to the back post, goal side of their {t7}…', cam: { at: [18, 64], zoom: 1.35, tilt: .5 } },
        { t: .9, pass: 'us:11', air: true, head: 'Back post', sub: '…and head it away.', cam: { at: [14, 52], zoom: 1.05, tilt: .55 }, wait: 1.1 }],
      zone1: [{ t: 1.2, pass: 'them:7', air: true, pd: .2, them: { 7: [15.2, 64.2] }, tag: { 'them:7': 'FREE' }, head: 'Ball watching',
          sub: 'Their {t7} ran right past you into the box.', cam: { at: [18, 64], zoom: 1.35, tilt: .5 } },
        { t: .5, shot: [22.5, 75.8], wait: 1 }]
    } },

  /* ---- 5. Join the attack ---- */
  'Overlap': {
    intro: { start: { ball: 'us:11', us: { 11: [8, 42] }, them: { 2: [10, 36] } },
      cam: { at: [10, 42], zoom: 1.45, tilt: .55 },
      steps: [
        { t: 1.5, us: { 11: [13, 36] }, them: { 2: [15.5, 32.5] }, tag: { 'them:2': 'FOLLOW' }, head: 'Your {11} dribbles inside',
          sub: 'Their {t2} goes along, and your 6 is covering behind you.', cam: { at: [14, 40], zoom: 1.3, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.1, us: { 3: [6, 20] }, tag: { 'us:3': ['OVERLAP', 'good'], 'them:2': 'BYPASSED' }, hatch: [{ pts: [[0, 10], [12, 10], [12, 34], [0, 34]], c: 'good' }],
        head: 'Overlap', sub: 'Your {11} cut inside and took their {t2} along, so you went around the outside. Now you are away down the line.',
        cam: { at: [10, 24], zoom: 1.25, tilt: .55 }, wait: 1.2 }],
      zone1: say('Stayed home', 'Your {11} made room for you, and your 6 was covering. Go!', { at: [12, 44], zoom: 1.25, tilt: .55 },
        { hatch: [{ pts: [[0, 22], [10, 22], [10, 40], [0, 40]], c: 'gold' }] }),
      zone2: say('Crowded', 'That is where your {11} is going. Go around the outside.', { at: [14, 38], zoom: 1.35, tilt: .55 })
    } },

  'Stay home': {
    intro: { start: { ball: 'us:11', us: { 11: [8, 36], 6: [24, 40], 3: [11, 50] }, them: { 2: [10, 30] } },
      cam: { at: [12, 40], zoom: 1.35, tilt: .55 },
      steps: [
        { t: 1.5, us: { 11: [7, 28], 6: [22, 30], 3: [10, 45] }, them: { 2: [9, 23.5] }, head: 'Your {11} takes it up the wing',
          sub: 'Your 6 has run forward too. Their {t7} and 9 wait up the field.', cam: { at: [15, 38], zoom: 1.05, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: .8, pass: 'them:2', tag: { 'them:2': 'TACKLE' }, head: 'Stay home', sub: 'Your 6 went forward, so you stayed home. If we lose it…',
          cam: { at: [10, 30], zoom: 1.3, tilt: .55 } },
        { t: 1.1, pass: 'them:7', air: true, head: 'Stay home', sub: '…you are there to stop their {t7} and 9.', cam: { at: [15, 52], zoom: 1.3, tilt: .55 } },
        { t: .6, us: { 3: [13.5, 54] }, pass: 'us:3', pd: .5, tag: { 'us:3': ['STEPS IN', 'good'] }, wait: 1.1 }],
      zone1: [{ t: .8, pass: 'them:2', tag: { 'them:2': 'TACKLE' }, head: 'Halfway', sub: 'Not helping the attack, and not guarding our goal either. If we lose it…',
          cam: { at: [10, 30], zoom: 1.3, tilt: .55 } },
        { t: 1.1, pass: 'them:7', air: true, tag: { 'them:7': 'FREE' }, head: 'Halfway', sub: '…their {t7} is already goal side of you.', cam: { at: [15, 50], zoom: 1.3, tilt: .55 }, wait: 1.1 }],
      zone2: [{ t: .8, pass: 'them:2', tag: { 'them:2': 'TACKLE' }, head: 'Overlapped', sub: 'Your 6 went forward too. If we lose it…',
          cam: { at: [10, 30], zoom: 1.3, tilt: .55 } },
        { t: 1.1, pass: 'them:7', air: true, tag: { 'them:7': 'FREE', 'them:9': 'FREE' }, head: 'Overlapped', sub: '…their {t7} and 9 are two against your 4.',
          cam: { at: [20, 52], zoom: 1.25, tilt: .55 }, wait: 1.1 }]
    } },

  'Split wide': {
    intro: { start: { ball: 'them:7', them: { 7: [10, 47] } },
      cam: { at: [14, 52], zoom: 1.4, tilt: .5 },
      steps: [
        { t: 1.4, pass: 'us:1', air: true, pd: .15, them: { 7: [13, 52] }, head: 'Their {t7} crosses it', sub: 'And your keeper catches it.', cam: { at: [20, 64], zoom: 1.3, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.1, us: { 3: [6, 52] }, tag: { 'us:3': ['TIME', 'good'] }, head: 'Split wide',
        sub: 'Your keeper had the ball, so you split wide by the sideline. An easy pass, and time to look up.', cam: { at: [10, 56], zoom: 1.3, tilt: .55 }, wait: 1.2 }],
      zone1: say('Too narrow', 'Too close to your 4. One player can press you both.', { at: [20, 63], zoom: 1.4, tilt: .5 },
        { t: 1, them: { 9: [20, 61] }, tag: { 'them:9': 'PRESS' } }),
      zone2: say('Too high', 'Their {t7} is right there.', { at: [12, 54], zoom: 1.45, tilt: .5 }, { tag: { 'them:7': 'MARK' } })
    } },

  'Help the {11} out': {
    intro: { start: { ball: 'us:3', us: { 11: [6, 30] }, them: { 2: [6, 26], 7: [19, 38] } },
      cam: { at: [10, 46], zoom: 1.35, tilt: .55 },
      steps: [
        { t: 1.5, pass: 'us:11', pd: .1, us: { 11: [6, 36] }, them: { 2: [6, 32], 7: [15, 40] }, face: { 'us:11': 'down' }, tag: { 'them:2': 'FOLLOW', 'them:7': 'PRESS' },
          head: 'You play it up to your {11}', sub: 'Their {t2} is right behind, and their {t7} closes from the inside.', cam: { at: [10, 40], zoom: 1.35, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1, pass: 'us:4', tag: { 'us:4': ['FREE', 'good'] }, head: 'Help the {11} out',
        sub: 'Your {11} was trapped facing our goal, so you got close behind for the easy pass back. Now you can move it on.', cam: { at: [16, 50], zoom: 1.15, tilt: .55 }, wait: 1.1 }],
      zone1: steal('11', '7', [10, 38], 'Too far', 'The {11} is trapped between two players, and nobody helps out.'),
      zone2: [{ t: .7, pass: 'them:7', tag: { 'them:7': 'CUT' }, head: 'Into their {t7}', sub: 'Their {t7} is right there, and the pass to you gets cut out.',
        cam: { at: [12, 41], zoom: 1.45, tilt: .5 }, wait: 1.1 }]
    } },

  'Early cross': {
    intro: { start: { ball: 'us:11', us: { 3: [6, 36], 9: [19, 25] }, them: { 2: [12, 35], 4: [25, 24], 3: [33, 21] } },
      cam: { at: [10, 32], zoom: 1.35, tilt: .55 },
      steps: [
        { t: 1.5, pass: 'us:3', pd: .35, us: { 3: [6, 24], 9: [21, 17] }, them: { 2: [11, 30], 4: [25, 19], 3: [34, 16] }, head: 'You overlap, and your {11} slips you in',
          sub: 'Their defenders are running back, and your 9 sprints to the near post.', cam: { at: [14, 22], zoom: 1.2, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      lead0: [{ t: .8, tag: { 'us:9': ['FIRST', 'good'] }, head: 'Early cross', sub: 'Their defenders were running back, so you crossed it early, in front of your 9…',
          cam: { at: [21, 9], zoom: 1.5, tilt: .5 } },
        { t: .6, shot: [23, -1], head: 'Early cross', sub: '…who gets there first.', wait: 1.1 }],
      9: say('Behind the run', 'The 9 was attacking the near post. Put it in front of the run.', { at: [18, 16], zoom: 1.35, tilt: .5 }),
      10: steal('10', '6', [27, 28.5], 'Marked', 'Their 6 is right on your 10.'),
      11: say('Not the best', 'Safe, but your 9 was attacking the space in front of goal.', { at: [14, 22], zoom: 1.3, tilt: .55 }),
      carry0: say('Too slow', 'Every touch lets their defenders get back.', { at: [10, 16], zoom: 1.35, tilt: .5 },
        { t: 1.1, them: { 2: [10, 17] }, tag: { 'them:2': 'BACK' } })
    } },

  /* ---- 6. Transitions ---- */
  'Win it back': {
    intro: { start: { ball: 'us:6', them: { 7: [7, 49] } },
      cam: { at: [18, 46], zoom: 1.4, tilt: .55 },
      steps: [
        { t: 1.2, pass: 'them:7', pd: .1, them: { 7: [8, 44.5] }, face: { 'them:7': 'up' }, head: 'We lose the ball', sub: 'Their {t7} picks it up near you, facing away from our goal.',
          cam: { at: [11, 47], zoom: 1.45, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: .7, pass: 'us:3', tag: { 'us:3': ['WON IT', 'good'] }, head: 'Win it back', sub: 'Their {t7} was facing away, so you closed in right away. No time to turn.',
        cam: { at: [9, 46], zoom: 1.5, tilt: .5 }, wait: 1.1 }],
      zone1: [{ t: .6, face: { 'them:7': 'down' }, head: 'Watching', sub: 'You gave their {t7} time to turn…', cam: { at: [10, 48], zoom: 1.45, tilt: .55 } },
        { t: 1, them: { 7: [9, 49] }, head: 'Watching', sub: '…and run at you.', wait: 1 }],
      zone2: [{ t: .6, face: { 'them:7': 'down' }, head: 'Dropped off', sub: 'Running back gave their {t7} time to turn…', cam: { at: [10, 50], zoom: 1.4, tilt: .55 } },
        { t: 1, them: { 7: [10, 52] }, head: 'Dropped off', sub: '…and run at you. You were close, so press.', wait: 1 }]
    } },

  'Get back': {
    intro: { start: { ball: 'us:10', us: { 3: [6, 26] }, them: { 6: [25, 33], 7: [9, 40] } },
      cam: { at: [20, 32], zoom: 1.4, tilt: .55 },
      steps: [
        { t: 1.5, pass: 'them:6', pd: .05, us: { 3: [6, 30] }, them: { 6: [23, 37], 7: [11, 45] }, tag: { 'them:7': 'FREE' }, head: 'We lose the ball',
          sub: 'While you were up the field. Their {t7} is in the space you left.', cam: { at: [14, 40], zoom: 1.15, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1, pass: 'them:7', tag: { 'us:3': ['GOAL SIDE', 'good'] }, head: 'Get back', sub: 'We lost it while you were up the field, so you sprinted straight back…',
          cam: { at: [12, 50], zoom: 1.35, tilt: .55 } },
        { t: .7, us: { 3: [11.5, 50] }, tag: { 'us:3': ['STEPS IN', 'good'] }, head: 'Get back', sub: '…and now you can stop their {t7}.', wait: 1.1 }],
      zone1: [{ t: 1, pass: 'them:7', head: 'Stayed up', sub: 'Their {t7} is in all that space behind you…', cam: { at: [12, 48], zoom: 1.3, tilt: .55 } },
        { t: 1, them: { 7: [13, 58] }, tag: { 'them:7': 'FREE' }, head: 'Stayed up', sub: '…and runs at our goal.' },
        { t: .7, shot: [22.5, 75.8], wait: 1 }],
      zone2: [{ t: 1, pass: 'them:7', air: true, head: 'Chasing the ball', sub: 'Your 6 was already there, and their {t7} is free behind you…', cam: { at: [14, 46], zoom: 1.3, tilt: .55 } },
        { t: 1, them: { 7: [13, 58] }, tag: { 'them:7': 'FREE' }, head: 'Chasing the ball', sub: '…and runs at our goal.' },
        { t: .7, shot: [22.5, 75.8], wait: 1 }]
    } },

  'Behind their {t2}': {
    intro: { start: { ball: 'them:7', us: { 11: [10, 33] }, them: { 7: [10, 46], 2: [12, 36] } },
      cam: { at: [12, 48], zoom: 1.45, tilt: .55 },
      steps: [
        { t: 1.3, pass: 'us:3', pd: .4, us: { 11: [8, 38] }, them: { 7: [13, 47.5], 2: [15, 41] }, tag: { 'us:3': ['WON IT', 'good'] }, head: 'You win the ball',
          sub: 'Their {t2} was caught up the field, and your {11} is free on the wing.', cam: { at: [12, 44], zoom: 1.3, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      lead0: [{ t: 1.1, us: { 11: [7, 16] }, tag: { 'us:11': ['AWAY', 'good'], 'them:2': 'BYPASSED' }, hatch: [{ pts: [[0, 8], [14, 8], [14, 34], [0, 34]], c: 'good' }],
        head: 'Behind their {t2}', sub: 'Their {t2} was caught up the field, so you played it into the space behind. Your {11} runs onto it.',
        cam: { at: [11, 24], zoom: 1.2, tilt: .55 }, wait: 1.2 }],
      11: say('To feet', 'The {11} is free, but there was open grass ahead. Play it into that space.', { at: [10, 38], zoom: 1.3, tilt: .55 },
        { t: 1, them: { 2: [12, 34] }, tag: { 'them:2': 'BACK' } }),
      6: say('Slow', 'Your 6 has their 9 close by, and the counter slows down.', { at: [22, 47], zoom: 1.35, tilt: .55 },
        { t: 1, them: { 9: [23, 47.5] }, tag: { 'them:9': 'PRESS' } }),
      4: say('Too safe', 'Sideways, and their {t2} has time to get back.', { at: [16, 46], zoom: 1.1, tilt: .55 },
        { t: 1.1, them: { 2: [12, 34] }, tag: { 'them:2': 'BACK' } }),
      1: say('Too safe', 'Back to the keeper, and their {t2} has time to get back.', { at: [16, 52], zoom: 1, tilt: .55 },
        { t: 1.1, them: { 2: [12, 34] }, tag: { 'them:2': 'BACK' } })
    } },

  'Two against you': {
    intro: { start: { ball: 'them:7', us: { 6: [26, 34] }, them: { 7: [16, 37], 2: [6, 33] } },
      cam: { at: [14, 40], zoom: 1.35, tilt: .55 },
      steps: [
        { t: 1.5, us: { 6: [24, 40] }, them: { 7: [14, 45], 2: [5, 41] }, tag: { 'them:7': 'RUN', 'them:2': 'OVERLAP' }, head: 'Counterattack!',
          sub: 'Their {t7} dribbles at you, and their {t2} overlaps. Your {11} is stuck up the field.', cam: { at: [13, 48], zoom: 1.25, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.2, us: { 3: [10.5, 55], 6: [19, 48] }, them: { 7: [13.5, 49], 2: [5, 48] }, tag: { 'us:3': ['BETWEEN', 'good'] }, head: 'Two against you',
          sub: 'No help yet, so you backed off between them, goal side…', cam: { at: [12, 52], zoom: 1.35, tilt: .55 } },
        { t: .7, us: { 6: [16.5, 49] }, tag: { 'us:6': ['PRESS', 'good'] }, head: 'Two against you', sub: '…and help arrives. Now it is two against two.', wait: 1.1 }],
      zone1: [{ t: .8, pass: 'them:2', them: { 2: [5, 49] }, head: 'Dived in', sub: 'You dove in, so their {t7} slips it to their {t2}…', cam: { at: [10, 50], zoom: 1.35, tilt: .55 } },
        { t: 1, them: { 2: [9, 60] }, tag: { 'them:2': 'THROUGH' }, head: 'Dived in', sub: '…who is through.' },
        { t: .7, shot: [22.5, 75.8], wait: 1 }],
      zone2: [{ t: 1.1, them: { 7: [17, 58] }, tag: { 'them:7': 'FREE' }, head: 'Left the ball', sub: 'You went to the runner, and their {t7} dribbles straight at our goal.',
          cam: { at: [18, 59], zoom: 1.35, tilt: .55 } },
        { t: .7, shot: [22.5, 75.8], wait: 1 }],
      zone3: [{ t: 1, them: { 7: [11, 55] }, head: 'Too far', sub: 'Their {t7} runs at our box with nobody stopping the ball.', cam: { at: [14, 58], zoom: 1.35, tilt: .55 } },
        { t: .7, shot: [22.5, 75.8], wait: 1 }]
    } },

  'Look forward first': {
    intro: { start: { ball: 'them:7', them: { 7: [8, 52] } },
      cam: { at: [10, 52], zoom: 1.5, tilt: .55 },
      steps: [
        { t: 1.4, pass: 'us:3', pd: .65, them: { 7: [10, 59.5] }, tag: { 'us:3': ['WON IT', 'good'] }, head: 'You win the ball from their {t7}', sub: 'Look up.',
          cam: { at: [12, 54], zoom: 1.45, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      10: [{ t: 1.1, us: { 10: [19, 31] }, tag: { 'us:10': ['TURNED', 'good'] }, head: 'Look forward first',
        sub: 'Your 10 was free and facing their goal, so you got it there before they could get back.', cam: { at: [20, 36], zoom: 1.2, tilt: .55 }, wait: 1.2 }],
      11: say('Up the line', 'Up the line works, but your 10 was free in the middle, facing forward.', { at: [9, 38], zoom: 1.3, tilt: .55 }),
      6: steal('6', '9', [25.5, 50.5], 'Crowded', 'Their 9 and 10 are both close to your 6.'),
      4: say('Too safe', 'Safe, but your 10 was free and facing forward.', { at: [20, 54], zoom: 1.2, tilt: .55 }),
      1: say('Too safe', 'Back to the keeper? Look forward first.', { at: [20, 60], zoom: 1.1, tilt: .55 })
    } },
};
window.RIDDLE_LIB.withMotion(RIDDLES, MOTION);
window.RIDDLE_LIB.defineSet({ me: '3', mirrorTo: '2', chapters: CHAPTERS, riddles: RIDDLES });
})();
