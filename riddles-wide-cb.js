/* Riddles for the wide center backs. Written for the 3 on the left; the 2's set is the mirror image.
   Side-specific words use the placeholders described in riddles-core.js. */
(function () {
const { P, TOO_SAFE } = window.RIDDLE_LIB;

const CHAPTERS = [
  { name: 'Build out', blurb: 'You have the ball. Start the attack from the back.' },
  { name: 'Long ball or safe ball', blurb: 'Over them, through them, or out of trouble.' },
  { name: 'Defend your side', blurb: '1 v 1 on the wing. Show him outside and stay on your feet.' },
  { name: 'Tuck in and cover', blurb: 'Ball far away? Help in the middle.' },
  { name: 'Join the attack', blurb: 'When to go forward, and when to stay home.' },
  { name: 'Transitions', blurb: 'The ball just changed teams. React first.' }
];

const RIDDLES = [
/* ---------------- 1. Build out ---------------- */
{ ch: 0, type: 'ball', title: 'Into his path',
  prompt: 'You have the ball with time. Your {11} is wide on the line, and their {t2} is way inside.',
  hint: 'Is there grass in front of your {11}?',
  lesson: 'Teammate free with open grass ahead? Play it into the space in front of him, so he runs onto it.',
  us:   { 1:[25,71], 3:[12,56], 4:[25,59], 2:[38,57], 6:[24,46], 10:[26,33], 11:[6,38], 9:[25,19], 7:[44,30] },
  them: { 1:[25,4], 2:[18,26], 4:[24,23], 3:[38,23], 6:[27,37], 10:[22,42], 9:[29,52], 7:[17,49], 11:[40,49] },
  ball: '3',
  pass: {
    11: P(2, 'Good', 'He is free, but he had open grass ahead. Play it in front of him so he can run onto it.'),
    6:  P(1, 'Marked', 'Their 10 is right on your 6.'),
    4:  TOO_SAFE('Sideways, when your {11} was free up the line.'),
    1:  TOO_SAFE('Back to the keeper when your {11} was free.')
  },
  lead: [
    [6, 28, 3.5, 3, 'Pro choice', 'Their {t2} was way inside, so you played it into the open grass in front of your {11}. He runs onto it at full speed.', '11', null, true]
  ],
  leadNote: 'Your {11} has open grass ahead. Play it into the space in front of him.',
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Your {11} is free. Use him.'),
  best: { kind: 'pass', to: '11', at: [6,28] } },

{ ch: 0, type: 'ball', title: 'To his feet',
  prompt: 'You have the ball with time. Your {11} came short, but their {t2} is right behind him.',
  hint: 'Where is their {t2}? What happens to a pass in front of your {11}?',
  lesson: 'Defender right behind your teammate? Play it to his feet. A pass in front of him runs straight to the defender.',
  us:   { 1:[25,71], 3:[12,56], 4:[25,59], 2:[38,57], 6:[24,46], 10:[26,33], 11:[7,39], 9:[25,19], 7:[44,30] },
  them: { 1:[25,4], 2:[8,34.4], 4:[24,23], 3:[38,23], 6:[27,37], 10:[22,42], 9:[29,52], 7:[17,49], 11:[40,49] },
  ball: '3',
  pass: {
    11: P(3, 'Pro choice', 'Their {t2} was right behind him, so you played it to his feet. He can hold it, set it back, or turn if their {t2} gets too close.'),
    6:  P(1, 'Marked', 'Their 10 is right on your 6.'),
    4:  TOO_SAFE('Sideways, when your {11} had come short for it.'),
    1:  TOO_SAFE('Back to the keeper when your {11} had come short for it.')
  },
  lead: [
    [7, 30, 3.5, 0, 'Into his path', 'Their {t2} is right behind your {11}. A pass in front of him goes straight to their {t2}.', '11', '2']
  ],
  leadNote: 'Their {t2} is right behind him. Play it to his feet.',
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Your {11} came short for it. Use him.'),
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
    4:  P(3, 'Pro choice', 'Their team crowded your side, so you played it to your 4. He can switch it to your {2}, who is free.'),
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
    6:  P(3, 'Pro choice', 'Their {t7} blocked the pass up the line, so you played it inside to your 6. He is free and facing forward.'),
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
  hint: 'Which way is he coming from? Where is the free space?',
  lesson: 'Pressed from the inside? Go down the line. Put it into the space ahead of your winger.',
  us:   { 1:[25,71], 3:[10,60], 4:[25,61], 2:[38,59], 6:[24,49], 10:[24,36], 11:[6,38], 9:[25,22], 7:[43,34] },
  them: { 1:[25,4], 2:[16,31], 4:[26,25.5], 3:[38,26], 6:[22,40], 10:[26,45], 9:[21,57.5], 7:[14,56.5], 11:[37,52] },
  ball: '3',
  arrows: [{ team: 'them', from: [16,54], to: [14.2,56.3] }],
  pass: {
    11: P(2, 'Good', 'He is free, but there is open grass in front of him. Play it into that space.'),
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
    7:  P(3, 'Pro choice', 'Their whole team shifted to your side, so you hit the long ball to your {7}. He has the whole far wing to himself.'),
    4:  P(2, 'Good', 'Safe, and your 4 can move it on. But you had time to hit the long switch yourself.'),
    2:  P(1, 'Risky', 'A long pass across the front of our box. If it gets cut out, they are in on goal.'),
    11: P(1, 'Crowded', 'Their {t2} and {t7} are on that side. The space is on the other wing.'),
    6:  P(1, 'Crowded', 'Their 9 and 10 are close. The space is on the far side.'),
    1:  TOO_SAFE('Back to the keeper when you had time to switch it.')
  },
  lead: [
    [45, 23, 3.5, 3, 'Pro choice', 'Their whole team shifted to your side, so you switched it into the space ahead of your {7}. He runs onto it with nobody near him.', '7', null, true]
  ],
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Their team is all on your side. Switch it.'),
  best: { kind: 'pass', to: '7' } },

{ ch: 1, type: 'ball', title: 'Over their {t2}', air: true,
  prompt: 'Their {t2} pushed up to mark your {11}. Your 9 is sprinting into the space behind him.',
  hint: 'Where is the space? Who is running into it?',
  lesson: 'When their wide defender pushes up, the space is behind him. Play it over him for a runner.',
  us:   { 1:[25,71], 3:[12,56], 4:[25,59], 2:[38,57], 6:[24,46], 10:[25,34], 11:[9,38], 9:[20,27], 7:[44,30] },
  them: { 1:[25,4], 2:[12,34], 4:[25,25], 3:[38,25], 6:[27,39], 10:[22,50], 9:[29,54], 7:[15,50.5], 11:[40,50] },
  ball: '3',
  arrows: [{ team: 'us', from: [19.4,25.4], to: [13.4,18], dash: 1 }],
  pass: {
    11: P(1, 'Marked', 'Their {t2} is right on your {11}. The space is behind him.'),
    9:  P(1, 'To his feet?', 'Your 9 is running into the space behind their {t2}. Play it there.'),
    6:  P(1, 'Marked', 'Their 10 is right on your 6.'),
    4:  TOO_SAFE('Safe, but the space behind their {t2} was the way forward.'),
    1:  TOO_SAFE('Back to the keeper when your 9 was making the run.')
  },
  lead: [
    [10, 18, 4, 3, 'Pro choice', 'Their {t2} pushed up, so you played it over him into the space your 9 is running into.', '9', null, true],
    [9, 28, 3, 1, 'Their {t2} gets it', 'Their {t2} is closer to that spot than your {11}.', '11', '2']
  ],
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Your 9 is running into the space behind their {t2}. Find him.'),
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
    1:  P(1, 'Risky', "A slow pass across our goal with their 9 right there. If he gets a toe on it, it's a goal.")
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
  leadNote: 'Your 10 is free where he stands. Play it to his feet.',
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Look for the free player between their lines.'),
  best: { kind: 'pass', to: '10' } },

/* ---------------- 3. Defend your side ---------------- */
{ ch: 2, type: 'move', title: 'Show him outside',
  prompt: 'Their {t7} has the ball and is running at you. Your 4 is inside. Drag the {3}.',
  hint: 'Which way do you want him to go: toward our goal, or toward the sideline?',
  lesson: '1 v 1 on the wing? Get goal side, on his inside shoulder, and show him down the line, away from our goal.',
  us:   { 1:[25,71], 3:[13,58], 4:[24,59], 2:[37,57], 6:[22,46], 10:[24,35], 11:[9,35], 9:[25,23], 7:[42,34] },
  them: { 1:[25,4], 2:[11,29], 4:[25,27], 3:[38,29], 6:[22,40], 10:[30,45], 9:[26,53], 7:[10,46], 11:[40,48] },
  ball: { team: 'them', n: '7' },
  zones: [
    [12.2, 49.8, 1.8, 3, 'Pro spot', 'You got goal side, on his inside, a couple of yards off him. He can only go down the line, away from our goal.'],
    [7.5, 49.5, 1.8, 1, 'Wrong shoulder', 'On his outside, you are showing him inside, toward our goal.'],
    [10, 47.6, 1, 0, 'Dived in', 'You dove in. One touch past you and he is gone.'],
    [13, 58, 2.6, 1, 'Too far', 'He has all the time he wants to cross or cut inside.']
  ],
  elsewhere: P(1, 'Not quite', 'Get goal side, on his inside shoulder.'),
  best: { kind: 'move', at: [12.2,49.8] } },

{ ch: 2, type: 'move', title: 'Close him down',
  prompt: 'Their 6 is passing it out to their {t7} on the wing. Drag the {3}.',
  hint: 'When is the best time to get close: before or after he controls it?',
  lesson: 'Close him down while the ball is traveling. Get there as he receives, goal side, so his first touch is under pressure.',
  us:   { 1:[25,71], 3:[14,58], 4:[25,60], 2:[37,57], 6:[24,45], 10:[24,34], 11:[11,33], 9:[26,22], 7:[42,32] },
  them: { 1:[25,4], 2:[12,26], 4:[24,25.5], 3:[38,28], 6:[20,38], 10:[31,44], 9:[27,52], 7:[8,44], 11:[40,47] },
  ball: { team: 'them', n: '6' },
  arrows: [{ team: 'them', from: [18.6,38.8], to: [9.8,43.3], dash: 1 }],
  zones: [
    [10, 48, 2, 3, 'Pro spot', 'You closed him down while the ball was rolling. He has to take his first touch with you right on him.'],
    [14, 58, 2.6, 1, 'Too far', 'You waited. Now he controls it, turns, and runs at you.'],
    [8, 40.5, 1.8, 0, 'Wrong side', 'You ran past him. Now he is goal side of you.']
  ],
  elsewhere: P(1, 'Not quite', 'Get to him as the ball arrives, goal side.'),
  best: { kind: 'move', at: [10,48] } },

{ ch: 2, type: 'move', title: 'Trust your {11}',
  prompt: 'Their {t7} has the ball. Their {t2} is overlapping on the outside, and your {11} is chasing him back. Drag the {3}.',
  hint: 'Your {11} has the runner. Who is yours?',
  lesson: 'Trust your teammates. If your winger tracks the overlap, you stay on the ball.',
  us:   { 1:[25,71], 3:[8,53], 4:[24,59], 2:[37,57], 6:[23,46], 10:[24,35], 11:[8,41.5], 9:[26,23], 7:[42,33] },
  them: { 1:[25,4], 2:[6,37.4], 4:[25,26.5], 3:[38,28], 6:[21,39], 10:[30,44], 9:[27,53], 7:[13,46], 11:[40,48] },
  ball: { team: 'them', n: '7' },
  arrows: [{ team: 'them', from: [6,38.8], to: [4.8,47.5], dash: 1 }, { team: 'us', from: [8.2,43.6], to: [6.6,47], dash: 1 }],
  zones: [
    [15, 49.8, 1.9, 3, 'Pro spot', 'Your {11} is tracking the overlap, so you stayed on the ball, goal side and on his inside. Now he has nowhere to go.'],
    [5.5, 50.5, 2.2, 1, 'Doubled up', 'Your {11} has the runner. Now their {t7} cuts inside with nobody on him.'],
    [8, 53, 2.2, 1, 'Too far', 'He has time to pick his pass.']
  ],
  elsewhere: P(1, 'Not quite', 'Your {11} has the runner. You take the ball.'),
  best: { kind: 'move', at: [15,49.8] } },

{ ch: 2, type: 'move', title: 'Recovery run',
  prompt: 'Their {t7} got past you and is dribbling toward our box. Drag the {3}.',
  hint: 'Where is he going? Where is our goal?',
  lesson: "Beaten? Don't chase him from behind. Sprint back on the inside, toward our goal, and get goal side again.",
  us:   { 1:[24,71], 3:[11,49], 4:[24,60], 2:[36,58], 6:[23,47], 10:[24,36], 11:[11,38], 9:[26,24], 7:[42,33] },
  them: { 1:[25,4], 2:[8,31], 4:[25,27.5], 3:[38,28], 6:[21,40], 10:[30,46], 9:[25,54], 7:[9,55.5], 11:[40,49] },
  ball: { team: 'them', n: '7' },
  arrows: [{ team: 'them', from: [9.6,51.6], to: [9.2,55] }],
  zones: [
    [15.5, 63, 2.6, 3, 'Pro spot', 'He got past you, so you sprinted back on the inside, toward our goal. Now you are between him and the goal again.'],
    [9, 52, 2, 0, 'Behind him', 'Chasing him from behind, you never catch up, and he can cut inside.'],
    [11, 49, 2.2, 1, 'Gave up', 'He is past you. Sprint back!']
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
    [9.8, 63.6, 1.6, 3, 'Pro spot', 'You got right in front of the cross, between the ball and our box. He has to beat you before he can cross it.'],
    [14, 58, 2.6, 1, 'Too far', 'From there he can cross it whenever he wants.'],
    [5, 59.5, 1.6, 1, 'Wrong side', "On his outside, you can't block a cross into the box."]
  ],
  elsewhere: P(1, 'Not quite', 'Get between the ball and our box, close to him.'),
  best: { kind: 'move', at: [9.8,63.6] } },

/* ---------------- 4. Tuck in and cover ---------------- */
{ ch: 3, type: 'move', title: 'Tuck in',
  prompt: 'Their {t11} has the ball on the far wing, and your {2} is pressing him. You are out wide on your side. Drag the {3}.',
  hint: 'How far is the ball from you? Where is the danger?',
  lesson: 'Ball on the far side? Tuck in toward the middle. Keep the back line tight, and get back out if they switch it.',
  us:   { 1:[27,71], 3:[8,55], 4:[28,58], 2:[39,52], 6:[30,45], 10:[28,34], 11:[14,37], 9:[27,24], 7:[41,33] },
  them: { 1:[25,4], 2:[12,28], 4:[25,27.5], 3:[38,27], 6:[24,39], 10:[33,41], 9:[25,52], 7:[7,45], 11:[41,47] },
  ball: { team: 'them', n: '11' },
  zones: [
    [18, 57, 2.8, 3, 'Pro spot', 'The ball is on the far side, so you tucked in. Our back line is tight, and their 9 has no room in the middle.'],
    [8, 55, 2.6, 1, 'Too wide', 'You are guarding empty grass. If they switch it, you have time to get back out.'],
    [8, 48.5, 2.2, 1, 'Too tight', 'Their {t7} is far from the ball. Marking him leaves a big gap next to your 4.']
  ],
  elsewhere: P(1, 'Not quite', 'Tuck in toward your 4.'),
  best: { kind: 'move', at: [18,57] } },

{ ch: 3, type: 'move', title: 'Cover your 4',
  prompt: 'Their 9 dropped deep, and your 4 stepped up to stop him turning. Drag the {3}.',
  hint: 'Your 4 left his spot. Who covers it?',
  lesson: 'When a teammate steps up, someone covers behind him. Tuck in and fill the gap.',
  us:   { 1:[25,71], 3:[12,57], 4:[25,49.5], 2:[37,57], 6:[30,42], 10:[24,32], 11:[8,33], 9:[27,21], 7:[43,32] },
  them: { 1:[25,4], 2:[11,25], 4:[25,24], 3:[38,25], 6:[22,37], 10:[33,38], 9:[25,45.5], 7:[8,47], 11:[41,47] },
  ball: { team: 'them', n: '6' },
  arrows: [{ team: 'us', from: [25,57], to: [25,50.6], dash: 1 }],
  zones: [
    [20, 58.5, 2.8, 3, 'Pro spot', 'Your 4 stepped up to their 9, so you tucked in behind him. If their 9 turns or flicks it on, you are there.'],
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
    [14.5, 55.2, 2.2, 3, 'Pro spot', 'Their 9 drifted into your side, so you picked him up, goal side. Your 4 stays in the middle.'],
    [6, 55, 2.4, 1, 'Too wide', 'Their 9 is free in the gap between you and your 4.'],
    [13.5, 48, 2, 0, 'Wrong side', 'In front of him? One pass over you and he is through.']
  ],
  elsewhere: P(1, 'Not quite', 'Pick up their 9, goal side of him.'),
  best: { kind: 'move', at: [14.5,55.2] } },

{ ch: 3, type: 'move', title: 'Hold the line',
  prompt: 'Their 6 has the ball, facing his own goal, and your 6 is on him. Your 4 and {2} are holding the line, but you dropped deep. Drag the {3}.',
  hint: 'Can their 6 hit a long ball right now? Where is the rest of our line?',
  lesson: 'Ball carrier under pressure? Hold the line with your teammates. One defender too deep keeps everyone onside.',
  us:   { 1:[25,71], 3:[11,60], 4:[25,50], 2:[38,50], 6:[24,37], 10:[29,29], 11:[8,30], 9:[26,18], 7:[43,28] },
  them: { 1:[25,4], 2:[11,21], 4:[24,14.5], 3:[38,21], 6:[23.5,33.5], 10:[31,32.5], 9:[26,45.5], 7:[10,45], 11:[39,44.5] },
  ball: { team: 'them', n: '6' },
  arrows: [{ team: 'us', from: [24.6,39.4], to: [24.1,37.3] }],
  zones: [
    [12, 50.5, 2.6, 3, 'Pro spot', 'Their 6 is under pressure and facing his own goal. You stepped up level with your 4, so their {t7} is offside if they try it.'],
    [11, 60, 3, 1, 'Too deep', 'You are the one keeping their {t7} onside.'],
    [11, 41.5, 2.2, 1, 'Too high', 'Past their {t7}? Now there is space behind you.']
  ],
  elsewhere: P(1, 'Not quite', 'Get level with your 4.'),
  best: { kind: 'move', at: [12,50.5] } },

{ ch: 3, type: 'move', title: 'Back post',
  prompt: 'Their {t11} is about to cross from the far wing. Their {t7} is sneaking toward the back post. Drag the {3}.',
  hint: 'Where do crosses that fly past everyone land?',
  lesson: 'Cross from the far side? Get to the back post, goal side of your man, where you can see him and the ball.',
  us:   { 1:[27,72], 3:[11,55], 4:[26,64], 2:[38,64], 6:[29,54], 10:[27,44], 11:[12,40], 9:[27,32], 7:[41,46] },
  them: { 1:[25,4], 2:[12,33], 4:[24,29], 3:[37,36], 6:[23,47], 10:[33,52], 9:[27,60], 7:[12,59.5], 11:[43,61] },
  ball: { team: 'them', n: '11' },
  arrows: [{ team: 'them', from: [12.4,60], to: [15.2,64.2], dash: 1 }],
  zones: [
    [17, 66.5, 2.4, 3, 'Pro spot', 'The cross is coming from the far side, so you got to the back post, goal side of their {t7}. You can see him and the ball.'],
    [11, 55, 2.4, 1, 'Ball watching', 'Their {t7} ran right past you into the box.']
  ],
  elsewhere: P(1, 'Not quite', 'Get to the back post, goal side of their {t7}.'),
  best: { kind: 'move', at: [17,66.5] } },

/* ---------------- 5. Join the attack ---------------- */
{ ch: 4, type: 'move', title: 'Overlap', run: true,
  prompt: 'Your {11} is dribbling inside, and their {t2} is going with him. Your 6 is covering behind you. Drag the {3}.',
  hint: 'Your {11} took their {t2} inside. What is open now?',
  lesson: 'Winger cutting inside with his defender? Overlap around the outside. Your run gives him a pass and makes room.',
  us:   { 1:[25,71], 3:[11,50], 4:[25,56], 2:[38,55], 6:[24,44], 10:[25,31], 11:[13,36], 9:[26,19], 7:[43,28] },
  them: { 1:[25,4], 2:[15.5,32.5], 4:[24,22.5], 3:[38,23], 6:[27,37], 10:[30,46], 9:[28,52], 7:[18,47], 11:[40,45] },
  ball: { team: 'us', n: '11' },
  arrows: [{ team: 'us', from: [11.6,38.6], to: [14.8,34.6], dash: 1 }],
  zones: [
    [6, 32, 3.2, 3, 'Pro spot', 'Your {11} cut inside and took their {t2} with him, so you sprinted around the outside. Now he can slip you in down the line.'],
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
  prompt: 'Your keeper has the ball in his hands. Drag the {3}.',
  hint: 'Where can he pass to you so you have the most time?',
  lesson: 'When the keeper has the ball, the wide backs split wide. Width gives him an easy pass and gives you time.',
  us:   { 1:[25,71], 3:[15,64], 4:[25,64], 2:[35,64], 6:[25,52], 10:[24,40], 11:[6,38], 9:[26,26], 7:[44,38] },
  them: { 1:[25,4], 2:[11,32], 4:[24,29.5], 3:[39,32], 6:[21,42], 10:[29,46], 9:[25,57], 7:[13,52], 11:[37,52] },
  ball: { team: 'us', n: '1' },
  zones: [
    [5, 61, 3, 3, 'Pro spot', 'Your keeper has the ball, so you split wide by the sideline. Now he has an easy pass, and you have time to look up.'],
    [15, 64, 2.4, 1, 'Too narrow', 'Too close to your 4. One player can press you both.'],
    [12, 55.5, 2.2, 1, 'Too high', 'Their {t7} is right there.']
  ],
  elsewhere: P(1, 'Not quite', 'Split wide, toward the sideline.'),
  best: { kind: 'move', at: [5,61] } },

{ ch: 4, type: 'move', title: 'Help him out',
  prompt: 'Your {11} has the ball by the sideline, facing our goal. Their {t2} is behind him, and their {t7} is closing from the inside. Drag the {3}.',
  hint: "He can't turn. Where can he pass?",
  lesson: 'Teammate trapped facing back? Get close behind him, with a clear line for the pass. Give him a way out.',
  us:   { 1:[25,71], 3:[12,57], 4:[25,58], 2:[38,57], 6:[25,45], 10:[25,33], 11:[6,36], 9:[26,20], 7:[43,30] },
  them: { 1:[25,4], 2:[6,32], 4:[24,23.5], 3:[38,23], 6:[24,29], 10:[28,42], 9:[29,52], 7:[15,40], 11:[40,47] },
  ball: { team: 'us', n: '11' },
  arrows: [{ team: 'them', from: [17,39.2], to: [15.4,39.9] }],
  zones: [
    [8, 45, 2.8, 3, 'Pro spot', 'Your {11} was trapped facing our goal, so you got close behind him. Now he has an easy pass back.'],
    [12, 57, 2.6, 1, 'Too far', 'He is trapped with two players on him. Help him.'],
    [13, 43.5, 1.8, 0, 'Into their {t7}', 'Their {t7} is right there. The pass to you gets cut out.']
  ],
  elsewhere: P(1, 'Not quite', 'Get close behind your {11} so he can pass back.'),
  best: { kind: 'move', at: [8,45] } },

{ ch: 4, type: 'ball', title: 'Early cross', air: true,
  prompt: 'You overlapped and got the ball on the wing. Their defenders are running back, and your 9 is sprinting to the near post.',
  hint: 'Where will your 9 be when the ball gets there?',
  lesson: 'Defenders running back and your 9 attacking the near post? Cross it early, into the space in front of him.',
  us:   { 1:[25,71], 3:[6,24], 4:[25,48], 2:[38,47], 6:[23,36], 10:[28,26], 11:[15,25], 9:[21,17], 7:[42,22] },
  them: { 1:[25,3], 2:[11,30], 4:[25,19], 3:[34,16], 6:[27,30], 10:[19,40], 9:[29,52], 7:[12,44], 11:[40,40] },
  ball: '3',
  arrows: [{ team: 'us', from: [21,16], to: [20.2,11.6], dash: 1 }],
  pass: {
    9:  P(1, 'Behind him', "He's attacking the near post. Put it in front of him."),
    10: P(1, 'Marked', 'Their 6 is right on your 10.'),
    11: P(1, 'Not the best', 'Safe, but your 9 was attacking the space in front of goal.')
  },
  lead: [
    [19.5, 10, 3, 3, 'Pro choice', 'Their defenders were running back, so you crossed it early into the space in front of your 9.', '9', null, true],
    [24, 4, 2.5, 1, 'Too close to the keeper', 'Their keeper comes out and catches it.', '9', '1']
  ],
  shoot: P(0, 'Out of range', 'From way out on the wing, that is not a shot. Find your 9.'),
  carry: [[6, 12, 3, 1, 'Too slow', 'Every touch lets their defenders get back.']],
  elsewhere: P(1, 'Not quite', 'Your 9 is attacking the near post. Find him.'),
  best: { kind: 'pass', to: '9', at: [19.5,10] } },

/* ---------------- 6. Transitions ---------------- */
{ ch: 5, type: 'move', title: 'Win it back', kind: 'Pressing',
  prompt: 'We just lost the ball. Their {t7} picked it up near you, with his back to our goal. Drag the {3}.',
  hint: 'How close are you? Which way is he facing?',
  lesson: 'Lost it near you, and he has his back to you? Press right away, before he turns.',
  us:   { 1:[25,71], 3:[13,53], 4:[25,57], 2:[38,56], 6:[24,44], 10:[24,32], 11:[12,30], 9:[26,20], 7:[42,28] },
  them: { 1:[25,4], 2:[12,24], 4:[25,23.5], 3:[38,24], 6:[22,36], 10:[30,42], 9:[25,51], 7:[8,44.5], 11:[40,47] },
  ball: { team: 'them', n: '7' },
  zones: [
    [9.3, 48, 2, 3, 'Pro spot', "He has his back to you, so you closed him down right away. He can't turn."],
    [13, 53, 2.2, 1, 'Watching', 'You gave him time to turn and run at you.'],
    [12, 60, 2.6, 1, 'Dropped off', 'Running back gives him time. You were close, so press.']
  ],
  elsewhere: P(1, 'Not quite', 'Press him now, before he turns.'),
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
  hint: "He's free. Is there grass in front of him?",
  lesson: 'Won it and their wide defender is caught forward? Play your winger into the space behind him.',
  us:   { 1:[25,71], 3:[11,52], 4:[25,57], 2:[38,56], 6:[24,45], 10:[22,36], 11:[8,38], 9:[26,26], 7:[42,30] },
  them: { 1:[25,4], 2:[15,41], 4:[27,22], 3:[38,24], 6:[20,32], 10:[29,42], 9:[24,50], 7:[13,47.5], 11:[40,48] },
  ball: '3',
  pass: {
    11: P(2, 'Good', 'He is free, but there is open grass in front of him. Play it into that space.'),
    6:  P(1, 'Slow', 'Your 6 has their 9 close by, and the counter slows down.'),
    4:  TOO_SAFE('Sideways, when their team is caught forward. Look up the field.'),
    1:  TOO_SAFE('Back to the keeper? Their team is caught forward. Go now.')
  },
  lead: [
    [6, 26, 4, 3, 'Pro choice', 'You won it and their {t2} was caught up the field, so you played it into the space behind him. Your {11} runs onto it.', '11', null, true]
  ],
  leadNote: 'Your {11} has open grass ahead. Play it into the space in front of him.',
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
    [10.5, 52, 2.2, 3, 'Pro spot', "Two against one and no help yet, so you backed off between them, goal side. He can't go past you or pass easily, and help is coming."],
    [14, 47.6, 1.2, 0, 'Dived in', 'You dove in. He slips it to their {t2}, and they are through.'],
    [5.5, 48.5, 2, 1, 'Left the ball', 'You went to the runner, and their {t7} dribbles straight at our goal.'],
    [16, 56, 2.2, 1, 'Too far', 'He runs at our box with nobody on him.']
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
    10: P(3, 'Pro choice', 'You looked forward first. Your 10 was free and facing their goal, so you got it to him before they could get back.'),
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

window.RIDDLE_LIB.defineSet({ me: '3', mirrorTo: '2', chapters: CHAPTERS, riddles: RIDDLES });
})();
