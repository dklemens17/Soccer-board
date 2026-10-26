/* Riddles for the 4 (center back). Format notes are at the top of riddles-6.js. */
(function () {
const { P, TOO_SAFE } = window.RIDDLE_LIB;

const CHAPTERS = [
  { name: 'Build from the back', blurb: 'You have the ball. Start the attack.' },
  { name: 'Beat the press', blurb: 'They are pressing. Find the way out.' },
  { name: 'Mark the striker', blurb: 'Their 9 is your job. Stay between him and our goal.' },
  { name: 'Hold the line', blurb: 'Step up, drop off, and stay together.' },
  { name: 'Cover and balance', blurb: 'Help your teammates and guard the middle.' },
  { name: 'Defend the box', blurb: 'Near our goal: block it, clear it, and start the counter.' }
];

const RIDDLES = [
/* ---------------- 1. Build from the back ---------------- */
{ ch: 0, type: 'ball', title: 'Past their 9',
  prompt: 'Your keeper rolled it to you. Their 9 is running at you, and their wingers are on your 3 and 2.',
  hint: 'Who is free behind their 9?',
  lesson: 'When their 9 presses you, look for the free player behind him. One pass past the 9 beats their press.',
  us:   { 1:[25,71], 3:[10,58], 4:[25,60], 2:[40,58], 6:[24,47], 10:[26,33], 11:[6,30], 9:[25,18], 7:[44,30] },
  them: { 1:[25,4], 2:[12,24], 4:[25,21.5], 3:[38,24], 6:[21,36.5], 10:[31,40], 9:[29,56.5], 7:[13,52], 11:[38,52] },
  ball: '4',
  arrows: [{ team: 'them', from: [30.6,54.4], to: [29.2,56.3] }],
  pass: {
    6:  P(3, 'Pro choice', 'Their 9 came at you, so you played it past him to your 6, the free player. One pass and their press is beaten.'),
    3:  P(2, 'Good', 'Safe, but your 6 was free in the middle. One pass to him gets you past their 9.'),
    2:  P(1, 'Into the pressure', 'Their 9 is coming from that side. He can cut that pass out or jump on your 2.'),
    10: P(1, 'Risky', 'A long pass through their midfield. Your 6 was free and closer.'),
    1:  TOO_SAFE('Back to the keeper when your 6 was free in front of you.')
  },
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Their 9 is closing you down. Find the free teammate.'),
  best: { kind: 'pass', to: '6' } },

{ ch: 0, type: 'ball', title: 'Step in',
  prompt: 'Nobody is pressing you. Their 9 is standing in front of your 6, and everyone else is marked.',
  hint: 'If nobody comes to you, what can you do with all that grass?',
  lesson: 'Nobody pressing you and no pass on? Carry it forward. Someone has to come to you, and that frees a teammate.',
  us:   { 1:[25,71], 3:[10,57], 4:[25,59], 2:[40,57], 6:[25,46], 10:[28,32], 11:[6,30], 9:[25,18], 7:[44,30] },
  them: { 1:[25,4], 2:[12,22], 4:[24,21.5], 3:[38,22], 6:[29.5,35.5], 10:[20,40], 9:[25,51.5], 7:[9,48], 11:[41,48] },
  ball: '4',
  pass: {
    6:  P(0, 'Blocked', 'Their 9 is standing right in that lane.', { cut: '9' }),
    10: P(0, 'Blocked', 'Their 9 is standing right in that lane.', { cut: '9' }),
    3:  P(1, 'Too safe', 'Sideways, when you had open grass in front of you.'),
    2:  P(1, 'Too safe', 'Sideways, when you had open grass in front of you.'),
    1:  TOO_SAFE('Back to the keeper with nobody pressing you?')
  },
  shoot: null,
  carry: [[32, 52, 3.5, 3, 'Pro choice', 'Nobody pressed you, so you carried it forward past their 9. Now someone has to come to you, and that frees a teammate.'],
          [18, 52, 3.5, 3, 'Pro choice', 'Nobody pressed you, so you carried it forward past their 9. Now someone has to come to you, and that frees a teammate.'],
          [25, 53, 2.2, 0, 'Into him', 'You dribbled straight into their 9.']],
  elsewhere: P(1, 'Not quite', 'Carry the ball into the open grass in front of you.'),
  best: { kind: 'carry', at: [32,52] } },

{ ch: 0, type: 'ball', title: 'Lead your 3',
  prompt: 'You have the ball. Their whole team has shifted to your right side. Your 3 is wide open on the left.',
  hint: "He's open. Is there grass in front of him too?",
  lesson: 'Switch it away from the crowd. If your teammate has open grass ahead, play it into that space so he runs onto it.',
  us:   { 1:[25,71], 3:[8,56], 4:[27,60], 2:[41,57], 6:[29,47], 10:[30,34], 11:[5,30], 9:[27,19], 7:[45,31] },
  them: { 1:[25,4], 2:[11,23], 4:[26,22.5], 3:[38,24], 6:[26.5,37.5], 10:[33,43], 9:[31,55.5], 7:[18,44], 11:[40,51] },
  ball: '4',
  arrows: [{ team: 'them', from: [32.6,53.4], to: [31.3,55.2] }],
  pass: {
    3: P(2, 'Good', 'Good switch, away from their crowd. But he had open grass ahead. Play it in front of him so he can run onto it.'),
    6: P(1, 'Crowded', 'Their 9 and 10 are both close. The space was on the left.'),
    2: P(1, 'Into the crowd', 'Their 11 and 9 are on that side. The space is on the left.'),
    1: TOO_SAFE('Back to the keeper when your 3 was wide open.')
  },
  lead: [
    [7, 48, 3, 3, 'Pro choice', 'Their team crowded your right side, so you switched it into the space in front of your 3. He runs onto it with the whole wing to himself.', '3', null, true]
  ],
  leadNote: 'Your 3 has open grass in front of him. Play it into that space.',
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Their team is all on your right. Switch it.'),
  best: { kind: 'pass', to: '3', at: [7,48] } },

{ ch: 0, type: 'ball', title: 'Use your keeper',
  prompt: 'Their 9 and 10 are both pressing you, and everyone in front of you is marked.',
  hint: 'Is there a teammate nobody is marking?',
  lesson: 'The keeper is a teammate too. If everything in front is covered, play it back to him and start again.',
  us:   { 1:[25,71], 3:[11,58], 4:[25,59], 2:[39,58], 6:[25,47], 10:[25,34], 11:[6,30], 9:[25,18], 7:[44,30] },
  them: { 1:[25,4], 2:[12,24], 4:[25,21.5], 3:[38,24], 6:[25,43.5], 10:[29.5,55.5], 9:[22.5,55], 7:[13,53.5], 11:[37,53.5] },
  ball: '4',
  arrows: [{ team: 'them', from: [21.4,53], to: [22.4,54.8] }, { team: 'them', from: [30.8,53.6], to: [29.6,55.3] }],
  pass: {
    1: P(3, 'Pro choice', 'Two of them pressed you and everyone in front was marked, so you went back to your keeper. He has time to switch it.'),
    3: P(1, 'Pressed', 'Their 7 is ready to jump on your 3 as soon as the ball gets there.'),
    2: P(1, 'Pressed', 'Their 11 is ready to jump on your 2 as soon as the ball gets there.'),
    6: P(0, 'Intercepted', 'Their 9 is right next to that lane, and their 6 is behind your 6.', { cut: '9' })
  },
  shoot: null,
  carry: [],
  elsewhere: P(0, 'Trapped', 'Two players are on you. Dribbling here loses the ball near our goal.'),
  best: { kind: 'pass', to: '1' } },

{ ch: 0, type: 'ball', title: 'Break the line',
  prompt: 'You have the ball with time. Their 9 is in front of you, and their 10 is on your 6.',
  hint: 'Look past their midfield. Who is free behind it?',
  lesson: 'A pass that skips their midfield is worth more than three sideways passes. Look for the free player between their lines.',
  us:   { 1:[25,71], 3:[11,57], 4:[24,60], 2:[39,57], 6:[28,48.5], 10:[23,38], 11:[6,31], 9:[26,20], 7:[44,31] },
  them: { 1:[25,4], 2:[12,25], 4:[25,24], 3:[38,25], 6:[32,37], 10:[30.5,45.5], 9:[29,55], 7:[14,50], 11:[37,50] },
  ball: '4',
  pass: {
    10: P(3, 'Pro choice', 'Their midfield stepped up, so your 10 was free behind them. One pass skipped their whole midfield.'),
    6:  P(1, 'Marked', 'Their 10 is right on your 6.'),
    3:  P(1, 'Too safe', 'Sideways. Your 10 was free between their lines.'),
    2:  P(1, 'Too safe', 'Sideways. Your 10 was free between their lines.'),
    9:  P(1, 'Long and marked', 'Their 4 is right behind your 9. Your 10 was free and closer.'),
    1:  TOO_SAFE('Back to the keeper when your 10 was free.')
  },
  leadNote: 'Your 10 is free where he stands. Play it to his feet.',
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Look for the free player between their lines.'),
  best: { kind: 'pass', to: '10' } },

/* ---------------- 2. Beat the press ---------------- */
{ ch: 1, type: 'ball', title: 'Into the gap',
  prompt: 'Their 9 and wingers are pressing your back three. Their defenders stayed deep, and your 9 dropped into the gap.',
  hint: 'Is there space behind their defenders, or in front of them?',
  lesson: "Their defenders deep? There's no space behind them. Play into the feet of the player in the gap in front of them.",
  us:   { 1:[25,71], 3:[11,58], 4:[25,60], 2:[39,58], 6:[27,49], 10:[18,41], 11:[6,40], 9:[25,33], 7:[44,40] },
  them: { 1:[25,4], 2:[11,24], 4:[26,24], 3:[39,24], 6:[19,44.5], 10:[29.5,52], 9:[22,55.5], 7:[13,53], 11:[37,53] },
  ball: '4',
  arrows: [{ team: 'them', from: [20.8,53.4], to: [21.9,55.3] }],
  pass: {
    9: P(3, 'Pro choice', 'Their defenders dropped deep, so there was no space behind them. Your 9 dropped into the gap, and you played it into his feet.'),
    6: P(1, 'Marked', 'Their 10 is right on your 6.'),
    3: P(1, 'Pressed', 'Their 7 jumps on him as soon as it arrives.'),
    2: P(1, 'Pressed', 'Their 11 jumps on him as soon as it arrives.'),
    1: TOO_SAFE('Back to the keeper and they keep pressing. Your 9 was free.')
  },
  lead: [
    [25, 17, 4, 1, 'No space', 'Their defenders dropped deep, so there is no space behind them. Their 4 gets it.', '9', '4']
  ],
  shoot: null,
  carry: [],
  elsewhere: P(0, 'Trapped', 'Their 9 is on you. Dribbling into their press loses the ball.'),
  best: { kind: 'pass', to: '9' } },

{ ch: 1, type: 'ball', title: 'Away from pressure',
  prompt: 'Their 9 is closing you down from your left side.',
  hint: 'Which side is he coming from? Which side is free?',
  lesson: 'Play away from pressure. If he comes from your left, look right.',
  us:   { 1:[25,71], 3:[11,58], 4:[25,60], 2:[39,57], 6:[25,47.5], 10:[23,34], 11:[6,30], 9:[26,19], 7:[44,30] },
  them: { 1:[25,4], 2:[12,23], 4:[25,22.5], 3:[38,24], 6:[24,38], 10:[28.5,44.5], 9:[21.5,57.5], 7:[14,53], 11:[41,47] },
  ball: '4',
  arrows: [{ team: 'them', from: [19.6,55.2], to: [21.4,57.4] }],
  pass: {
    2: P(3, 'Pro choice', 'Their 9 came from your left, so you played it the other way, to your 2. Away from pressure.'),
    3: P(0, 'Intercepted', 'Their 9 is coming from that side and steps into the pass.', { cut: '9' }),
    6: P(1, 'Marked', 'Their 10 is right behind your 6.'),
    1: TOO_SAFE('Back to the keeper is fine, but your 2 was free right now.')
  },
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Their 9 is closing from your left. Move the ball away from him.'),
  best: { kind: 'pass', to: '2' } },

{ ch: 1, type: 'ball', title: 'Over the top', air: true,
  prompt: 'Their whole team is pressing high. Their defenders are up near the halfway line, with a lot of space behind them.',
  hint: 'Where is the space: in front of their defenders, or behind them?',
  lesson: 'Their defenders pushed up high? The space is behind them. Play it over the top for your 9 to run onto.',
  us:   { 1:[25,71], 3:[10,58], 4:[24,60], 2:[40,58], 6:[27,50], 10:[19,42.5], 11:[6,39], 9:[25,39], 7:[44,39] },
  them: { 1:[25,9], 2:[10,42.5], 4:[29.5,41.5], 3:[40,42.5], 6:[20.5,46.5], 10:[29,53.5], 9:[22,55.5], 7:[13,54], 11:[37,54] },
  ball: '4',
  pass: {
    6: P(1, 'Marked', 'Their 10 is right on your 6. They want you to play there.'),
    3: P(1, 'Pressed', 'Their 7 jumps on him as soon as it arrives.'),
    2: P(1, 'Pressed', 'Their 11 jumps on him as soon as it arrives.'),
    9: P(1, 'To his feet?', 'Their 4 is right behind your 9. The space was behind their defenders.'),
    1: TOO_SAFE('Back to the keeper and they keep pressing. The space was behind them.')
  },
  lead: [
    [24, 26, 5, 3, 'Pro choice', 'Their defenders pushed up high, so you played it over the top. Your 9 runs onto it with only the keeper to beat.', '9', null, true],
    [8, 27, 4.5, 3, 'Pro choice', 'Their defenders pushed up high, so you played it over the top, down the side for your 11. Away from their keeper, too.', '11', null, true],
    [25, 13, 3.5, 1, 'Overhit', 'Too long. Their keeper comes out and grabs it.', '9', '1']
  ],
  shoot: null,
  carry: [],
  elsewhere: P(0, 'Trapped', 'Their 9 is on you. Dribbling into their press loses the ball.'),
  best: { kind: 'pass', to: '9', at: [24,26] } },

{ ch: 1, type: 'ball', title: 'Facing your own goal', facing: 'back',
  prompt: "You're running back toward your own goal to get the ball. Their 9 is chasing right behind you.",
  hint: 'Which teammate can you see?',
  lesson: 'Facing your own goal with a striker on your back? Play it to your keeper, then move so he can give it back.',
  us:   { 1:[25,71], 3:[11,60], 4:[28,63], 2:[39,57], 6:[25,49], 10:[23,37], 11:[6,33], 9:[25,22], 7:[44,32] },
  them: { 1:[25,4], 2:[12,26], 4:[25,25.5], 3:[38,26.5], 6:[26,41], 10:[24,52.5], 9:[27,59], 7:[14,55], 11:[41,50] },
  ball: '4',
  arrows: [{ team: 'them', from: [26.6,56.6], to: [27,58.8] }],
  pass: {
    1: P(3, 'Pro choice', 'You were facing your own goal with their 9 on your back, so you played it to your keeper. Now move so he can give it back.'),
    3: P(1, 'Across the box', "You're facing your own goal. A pass across the front of our box is how goals are given away."),
    2: P(0, "Can't see it", "You're facing your own goal. You'd have to turn into their 9 to make that pass."),
    6: P(0, "Can't see it", "You're facing your own goal. You'd have to turn into their 9 to make that pass.")
  },
  shoot: null,
  carry: [],
  elsewhere: P(0, 'Turned into him', 'Their 9 is right behind you. Turning here loses the ball near our goal.'),
  best: { kind: 'pass', to: '1' } },

{ ch: 1, type: 'ball', title: "Where he's going",
  prompt: 'You have the ball. Your 6 is sliding away from their 10 into open space.',
  hint: 'Where will your 6 be when the ball gets there?',
  lesson: 'Teammate moving away from his marker? Pass to where he is going, not where he is.',
  us:   { 1:[25,71], 3:[11,58], 4:[26,60], 2:[39,58], 6:[27,48], 10:[26,34], 11:[6,31], 9:[26,19], 7:[44,31] },
  them: { 1:[25,4], 2:[12,24], 4:[25,22.5], 3:[38,24], 6:[28,38], 10:[30,45.5], 9:[32,54.5], 7:[14,51], 11:[38,50] },
  ball: '4',
  arrows: [{ team: 'us', from: [26,47.6], to: [21.8,46.9], dash: 1 }],
  pass: {
    6: P(1, 'Behind him', "He's moving away from their 10. A pass to where he was arrives with their 10 still on him."),
    3: TOO_SAFE('Safe, but your 6 just got free. Use him.'),
    1: TOO_SAFE('Back to the keeper when your 6 was getting free.')
  },
  lead: [
    [21, 47, 2.8, 3, 'Pro choice', "Your 6 was moving away from their 10, so you passed to where he was going. He gets it in space, facing forward.", '6', null, true]
  ],
  leadNote: "Your 6 is moving into space. Play it to where he's going.",
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Your 6 is getting free. Pass to where he is going.'),
  best: { kind: 'pass', to: '6', at: [21,47] } },

/* ---------------- 3. Mark the striker ---------------- */
{ ch: 2, type: 'move', title: 'Goal side',
  prompt: "Their 6 has the ball in midfield. Their 9 is near our box, and you're too far from him. Drag the 4.",
  hint: 'Where should you be: in front of him, or between him and our goal?',
  lesson: 'Mark from goal side: between your man and our goal, close enough to touch him.',
  us:   { 1:[25,71], 3:[13,58], 4:[31,62], 2:[38,57], 6:[25.5,44.5], 10:[21,36], 11:[8,36], 9:[27,31.5], 7:[42,36] },
  them: { 1:[25,4], 2:[11,32], 4:[25,28], 3:[39,32], 6:[25,40], 10:[31,48], 9:[23,55], 7:[12,47], 11:[40,46] },
  ball: { team: 'them', n: '6' },
  zones: [
    [23.5, 58.5, 2.6, 3, 'Pro spot', 'You got between their 9 and our goal, close enough to touch him. You can see him and the ball.'],
    [23, 51.5, 2.6, 0, 'Wrong side', 'You are in front of him. One pass over your head and he is through on goal.'],
    [24, 66, 3, 1, 'Too deep', 'Too far from him. He gets the ball and turns.'],
    [31, 62, 2.6, 1, 'Too far', "He's free. One pass and he turns at you."]
  ],
  elsewhere: P(1, 'Not quite', 'Get between their 9 and our goal, close to him.'),
  best: { kind: 'move', at: [23.5,58.5] } },

{ ch: 2, type: 'move', title: 'Step in tight',
  prompt: 'Their 9 is dropping toward midfield to get the ball, with his back to our goal. Your 3 and 2 have tucked in behind you. Drag the 4.',
  hint: 'He wants to turn. How do you stop him?',
  lesson: "Their 9 drops with his back to goal and you have cover? Step in tight so he can't turn.",
  us:   { 1:[25,71], 3:[17,58], 4:[25,59], 2:[33,58], 6:[30,44.5], 10:[22,34], 11:[7,33], 9:[27,26], 7:[44,34] },
  them: { 1:[25,4], 2:[11,28], 4:[24,22.5], 3:[39,29], 6:[24,38.5], 10:[33,41], 9:[25,46], 7:[10,47], 11:[41,47] },
  ball: { team: 'them', n: '6' },
  arrows: [{ team: 'them', from: [25,51], to: [25,46.6], dash: 1 }],
  zones: [
    [25, 49.5, 2.4, 3, 'Pro spot', "Their 9 dropped with his back to goal, and your 3 and 2 are covering behind you. You stepped in tight so he can't turn."],
    [25, 59, 3, 1, 'Too far', 'From there he has time to turn and face you.'],
    [25, 43, 2.2, 0, 'Wrong side', 'You went in front of him. He spins you and he is through.']
  ],
  elsewhere: P(1, 'Not quite', 'Step up tight behind him so he can’t turn.'),
  best: { kind: 'move', at: [25,49.5] } },

{ ch: 2, type: 'move', title: 'Let him go',
  prompt: 'Their 9 is dropping toward midfield. Their 11 is sprinting in behind, and your 2 is caught up the field. Drag the 4.',
  hint: 'Your 6 is near their 9. Who is guarding the space behind?',
  lesson: 'If their 9 drops and a runner goes in behind, let your 6 take the 9 and guard the space behind.',
  us:   { 1:[25,71], 3:[13,58], 4:[25,58.5], 2:[43,41], 6:[20,44], 10:[24,33], 11:[7,34], 9:[27,22], 7:[44,30] },
  them: { 1:[25,4], 2:[11,30], 4:[24,27.5], 3:[39,30], 6:[22,39], 10:[31,40], 9:[26,46], 7:[12,49], 11:[36.5,49] },
  ball: { team: 'them', n: '6' },
  arrows: [{ team: 'them', from: [26,50.5], to: [26,46.8], dash: 1 }, { team: 'them', from: [36.5,49.5], to: [32.5,56], dash: 1 },
           { team: 'us', from: [43,41.5], to: [41.6,47], dash: 1 }],
  zones: [
    [30.5, 58.5, 2.8, 3, 'Pro spot', 'Your 6 can pick up their 9. You stayed back and moved across to guard the space their 11 is running into.'],
    [26, 50, 2.6, 0, 'Followed him', 'You followed their 9 and left the space behind you empty. Their 11 runs into it.'],
    [25, 58.5, 2.4, 1, 'Stood still', 'Their 11 is running in behind your 2. Get across.']
  ],
  elsewhere: P(1, 'Not quite', 'Let their 9 go to your 6. Guard the space their 11 is running into.'),
  best: { kind: 'move', at: [30.5,58.5] } },

{ ch: 2, type: 'move', title: 'Ball side',
  prompt: 'Their 7 has the ball out on our left wing. Their 9 is waiting near our box, and you are on his far side. Drag the 4.',
  hint: 'Where will the pass from the wing go? Get in its way.',
  lesson: 'Ball out wide? Stand goal side of their 9 and on the ball side, so the pass to him has to go through you.',
  us:   { 1:[23,70], 3:[10,52], 4:[29,60], 2:[37,58], 6:[24,46], 10:[23,36], 11:[9,34], 9:[27,22.5], 7:[42,34] },
  them: { 1:[25,4], 2:[12,28], 4:[25,27], 3:[38,29], 6:[22,40], 10:[28,48.5], 9:[24,56], 7:[8,46], 11:[40,50] },
  ball: { team: 'them', n: '7' },
  zones: [
    [21.5, 58.5, 2.4, 3, 'Pro spot', 'The ball is out wide, so you got goal side of their 9 and on the ball side. A pass to him has to go through you.'],
    [27.5, 56, 2.4, 1, 'Wrong side', 'On his far side, the pass from the wing gets to him before you.'],
    [23.5, 51.5, 2.2, 0, 'In front', 'One ball over your head and he is behind you.']
  ],
  elsewhere: P(1, 'Not quite', 'Get goal side of him, on the side of the ball.'),
  best: { kind: 'move', at: [21.5,58.5] } },

{ ch: 2, type: 'move', title: "Don't dive in",
  prompt: 'Their 9 is dribbling at you. Your 6 is sprinting back to help. Drag the 4.',
  hint: "Is help coming? Then what's your job until it gets there?",
  lesson: "Help on the way? Don't dive in. Stay on your feet, close enough to block a shot, and wait for your teammate.",
  us:   { 1:[25,71], 3:[12,57], 4:[24,59.5], 2:[38,57], 6:[30,42.5], 10:[21,36], 11:[7,33], 9:[26,26], 7:[43,33] },
  them: { 1:[25,4], 2:[11,29], 4:[25,29.5], 3:[39,30], 6:[18,40], 10:[34,45.5], 9:[24,48], 7:[9,49], 11:[41,49] },
  ball: { team: 'them', n: '9' },
  arrows: [{ team: 'them', from: [24,44], to: [24,47.4] }, { team: 'us', from: [30,42.8], to: [27.6,46.2], dash: 1 }],
  zones: [
    [24, 52.6, 1.9, 3, 'Pro spot', "You stayed on your feet a few yards from him, close enough to block a shot. Your 6 arrives, and now it's two against one."],
    [24, 49.6, 1.2, 0, 'Dived in', 'You dove in. One touch past you and he is through on goal.'],
    [24, 59.5, 2.6, 1, 'Too far', 'So far away he can shoot or pass whenever he wants.']
  ],
  elsewhere: P(1, 'Not quite', 'Stay goal side, a few yards off him, and wait for your 6.'),
  best: { kind: 'move', at: [24,52.6] } },

/* ---------------- 4. Hold the line ---------------- */
{ ch: 3, type: 'move', title: 'Step up', noPayoff: true,
  prompt: 'Your 3 cleared it, and your 10 won it at midfield. Your 3 and 2 are stepping up. Drag the 4.',
  hint: 'Where are your 3 and 2 going?',
  lesson: 'When the ball goes forward, the back line steps up together. The team stays compact, and their forwards are left offside.',
  us:   { 1:[25,72], 3:[12,61], 4:[25,62], 2:[38,61], 6:[25,44], 10:[24,31], 11:[7,28], 9:[27,18], 7:[44,27] },
  them: { 1:[25,4], 2:[11,22], 4:[25,21.5], 3:[39,22], 6:[19,36], 10:[30,40], 9:[26,55], 7:[11,52], 11:[39,52] },
  ball: { team: 'us', n: '10' },
  arrows: [{ team: 'us', from: [12,60.5], to: [12,53.5], dash: 1 }, { team: 'us', from: [38,60.5], to: [38,53.5], dash: 1 }],
  zones: [
    [25, 50, 3.5, 3, 'Pro spot', 'The ball went forward, so you stepped up with your 3 and 2. The team stays compact, and their 9 is left offside.'],
    [25, 62, 3, 1, 'Left behind', 'Your 3 and 2 stepped up and you stayed. Now you are keeping their 9 onside.'],
    [25, 39.5, 3, 1, 'Too high', 'Too far. If they win it back, one pass gets in behind you.']
  ],
  elsewhere: P(1, 'Not quite', 'Step up with your 3 and 2 and stay level with them.'),
  best: { kind: 'move', at: [25,50] } },

{ ch: 3, type: 'move', title: 'Drop off',
  prompt: 'Their 6 has the ball, facing forward, and nobody is pressing him. Their 9 is about to run. Drag the 4.',
  hint: 'Can he see the space behind you?',
  lesson: 'Ball carrier facing forward with time? Drop back. Take away the space behind you before he can use it.',
  us:   { 1:[25,70], 3:[12,47], 4:[25,47.5], 2:[38,47], 6:[30,36], 10:[24,26], 11:[8,24], 9:[27,15], 7:[43,24] },
  them: { 1:[25,3], 2:[11,17], 4:[24,12], 3:[38,17], 6:[22,33], 10:[31,30], 9:[25,42.5], 7:[10,41.5], 11:[40,41.5] },
  ball: { team: 'them', n: '6' },
  arrows: [{ team: 'them', from: [25.4,43.4], to: [26.8,50], dash: 1 }],
  zones: [
    [25, 56, 3, 3, 'Pro spot', 'Their 6 has time and is facing forward, so you dropped back. Now there is no space behind you for a ball over the top.'],
    [25, 47.5, 2.4, 1, 'Too high', 'He has time to pick a pass over your head.'],
    [24, 38, 2.4, 0, 'Stepped up', 'He has time, and you stepped up. One ball over the top and their 9 is through.']
  ],
  elsewhere: P(1, 'Not quite', 'Drop back and protect the space behind you.'),
  best: { kind: 'move', at: [25,56] } },

{ ch: 3, type: 'move', title: 'Hold the line',
  prompt: 'Their 6 has the ball, facing his own goal, and your 6 is pressing him. Your 3 and 2 are holding the line, but you dropped deep. Drag the 4.',
  hint: 'Can their 6 hit a long ball right now? Where are your 3 and 2?',
  lesson: "Ball carrier under pressure or facing backward? He can't hit it over you. Hold the line, level with your 3 and 2.",
  us:   { 1:[25,71], 3:[12,50], 4:[25,59], 2:[38,50], 6:[25,37], 10:[29,29], 11:[8,28], 9:[26,18], 7:[43,28] },
  them: { 1:[25,4], 2:[11,21], 4:[24,14.5], 3:[38,21], 6:[24.5,33.5], 10:[31,32.5], 9:[26,46], 7:[11,44.5], 11:[39,44.5] },
  ball: { team: 'them', n: '6' },
  arrows: [{ team: 'us', from: [25.6,39.6], to: [25.1,37.4] }],
  zones: [
    [25, 50.5, 2.6, 3, 'Pro spot', "Their 6 is under pressure and facing his own goal, so he can't hit it over you. You stepped up level with your 3 and 2."],
    [25, 59, 3, 1, 'Too deep', 'Their 6 is under pressure. Staying deep keeps their 9 onside and leaves a gap in our line.'],
    [26, 41, 2.4, 1, 'Too high', 'Stepping past their 9 leaves the space behind you open.']
  ],
  elsewhere: P(1, 'Not quite', 'Get level with your 3 and 2.'),
  best: { kind: 'move', at: [25,50.5] } },

{ ch: 3, type: 'move', title: 'Recovery run',
  prompt: 'Their 11 got past your 2 and is dribbling toward our box. Your 3 is tucking in to pick up their 9. Drag the 4.',
  hint: 'Where does he want to go? Get there first.',
  lesson: "When they get in behind, don't chase the ball from behind. Sprint back toward our goal and get between the ball and the goal.",
  us:   { 1:[26,71], 3:[14,57], 4:[25,55], 2:[38,49], 6:[24,44], 10:[22,33], 11:[8,32], 9:[26,22], 7:[43,33] },
  them: { 1:[25,4], 2:[11,26], 4:[24,25.5], 3:[38,26], 6:[20,37], 10:[29,41], 9:[24,51], 7:[11,51], 11:[39,57.5] },
  ball: { team: 'them', n: '11' },
  arrows: [{ team: 'them', from: [40.4,53], to: [39.3,57] }, { team: 'us', from: [14.4,57.4], to: [19.4,60.6], dash: 1 }],
  zones: [
    [33.5, 62.5, 2.8, 3, 'Pro spot', 'He got past your 2, so you sprinted back toward our goal and got between him and the goal. Your 3 picks up their 9.'],
    [38, 53, 2.6, 0, 'Behind the ball', 'You chased the ball from behind. He is already past you.'],
    [25, 55, 2.4, 1, 'Watching', 'He is running at our goal. Get back.']
  ],
  elsewhere: P(1, 'Not quite', 'Sprint back and get between the ball and our goal.'),
  best: { kind: 'move', at: [33.5,62.5] } },

{ ch: 3, type: 'move', title: 'Squeeze up',
  prompt: 'Their 9 just passed it back to their 6. Drag the 4.',
  hint: 'The ball went backward. What does the back line do?',
  lesson: 'When they pass backward, the whole back line steps up. Every yard up keeps the team compact.',
  us:   { 1:[25,71], 3:[12,60], 4:[25,61], 2:[38,60], 6:[24,47], 10:[22,36], 11:[8,34], 9:[27,24], 7:[43,34] },
  them: { 1:[25,4], 2:[11,26], 4:[25,27.5], 3:[39,27], 6:[25,39.5], 10:[31,45], 9:[26,56], 7:[12,51], 11:[40,51] },
  ball: { team: 'them', n: '6' },
  zones: [
    [25, 52, 2.6, 3, 'Pro spot', 'They passed it backward, so you stepped up. Their 9 is left offside, and the team is compact again.'],
    [25, 61, 3, 1, 'Stayed deep', 'They passed backward and you stayed deep. Now their team has all the space it wants.'],
    [25, 43.5, 2.4, 1, 'Too high', 'Too far. Now there is space behind you.']
  ],
  elsewhere: P(1, 'Not quite', 'The ball went backward. Step up.'),
  best: { kind: 'move', at: [25,52] } },

/* ---------------- 5. Cover and balance ---------------- */
{ ch: 4, type: 'move', title: 'Cover your 3',
  prompt: 'Their 7 has the ball on our left wing, and your 3 is going to him. Your 2 is tucking in. Drag the 4.',
  hint: 'What if their 7 beats your 3?',
  lesson: 'When a teammate goes to the ball, slide across behind him. If he gets beaten, you are there.',
  us:   { 1:[23,71], 3:[10,53], 4:[27,59], 2:[36,58], 6:[20,46], 10:[24,35], 11:[8,36], 9:[26,25], 7:[42,34] },
  them: { 1:[25,4], 2:[12,30], 4:[25,29], 3:[38,30], 6:[18,39], 10:[30,45], 9:[27,52.5], 7:[9,48.5], 11:[41,48] },
  ball: { team: 'them', n: '7' },
  arrows: [{ team: 'us', from: [36,58], to: [31.2,57.2], dash: 1 }],
  zones: [
    [17, 58, 2.8, 3, 'Pro spot', 'Your 3 went to the ball, so you slid across behind him. If their 7 beats him, you are there. Your 2 tucks in for their 9.'],
    [27, 59, 2.6, 1, 'Too far', 'If their 7 beats your 3, nobody is there.'],
    [13, 49.5, 2.2, 1, 'Too close', 'You both went to the ball. One pass inside and the middle is open.']
  ],
  elsewhere: P(1, 'Not quite', 'Slide across behind your 3.'),
  best: { kind: 'move', at: [17,58] } },

{ ch: 4, type: 'move', title: 'Pass him on',
  prompt: 'Their 9 ran out toward our left wing, and you followed him. Your 3 is right there with him. Their 10 is arriving in the middle. Drag the 4.',
  hint: 'Your 3 has him. Who is guarding the middle?',
  lesson: "Don't follow a striker out wide when a teammate is there. Pass him on and guard the middle.",
  us:   { 1:[25,71], 3:[11,57], 4:[16,58], 2:[38,57], 6:[31,44], 10:[24,35], 11:[7,34], 9:[26,24], 7:[43,34] },
  them: { 1:[25,4], 2:[11,27], 4:[24,27.5], 3:[39,28], 6:[21,40], 10:[24.5,47.5], 9:[11,51.5], 7:[7,45], 11:[40,48] },
  ball: { team: 'them', n: '6' },
  arrows: [{ team: 'them', from: [18.5,53.5], to: [12.2,51.8], dash: 1 }, { team: 'them', from: [25,42.6], to: [24.6,47], dash: 1 }],
  zones: [
    [24, 58, 2.8, 3, 'Pro spot', 'Your 3 has their 9 now. You passed him on and got back to the middle, where their 10 is arriving.'],
    [16, 58, 2.4, 1, 'Pulled wide', 'Your 3 has their 9. You left the middle empty for their 10.']
  ],
  elsewhere: P(1, 'Not quite', 'Let your 3 take him. Get back to the middle.'),
  best: { kind: 'move', at: [24,58] } },

{ ch: 4, type: 'move', title: 'Two against one',
  prompt: 'Counterattack! Their 9 and 10 are coming at you, two against one. Your teammates are sprinting back. Drag the 4.',
  hint: 'Can you stop both? What do you need until help arrives?',
  lesson: "Two against one? Don't dive in. Back off between them, stay goal side, and buy time for your teammates.",
  us:   { 1:[25,71], 3:[14,44], 4:[16,57], 2:[39,44], 6:[26,37], 10:[23,27], 11:[8,25], 9:[27,17], 7:[43,23] },
  them: { 1:[25,4], 2:[12,20], 4:[25,13], 3:[38,18], 6:[23,32], 10:[33,46], 9:[22,46.5], 7:[8,40], 11:[44,38] },
  ball: { team: 'them', n: '9' },
  arrows: [{ team: 'them', from: [22,42.4], to: [22,45.9] }, { team: 'them', from: [33,41.6], to: [33,45.4], dash: 1 },
           { team: 'us', from: [14.2,44.6], to: [15.4,50], dash: 1 }],
  zones: [
    [26, 53, 2.6, 3, 'Pro spot', "You got between them and backed off toward our goal. Their 9 can't pass or shoot easily, and your teammates are sprinting back."],
    [22, 49.2, 1.8, 0, 'Dived in', 'You dove in at the ball. He passes to their 10, who is through on goal.'],
    [32.5, 49.5, 2.2, 1, 'Left the ball', 'You went to their 10 and left their 9 a free run at goal.'],
    [16, 57, 2.4, 1, 'Too far', 'He runs straight at our goal.']
  ],
  elsewhere: P(1, 'Not quite', 'Get between them, goal side, and back off.'),
  best: { kind: 'move', at: [26,53] } },

{ ch: 4, type: 'move', title: 'Slide across',
  prompt: 'They switched it to their 11 on our right wing. Your 2 is going to him. Drag the 4.',
  hint: 'If their 11 beats your 2, who is there?',
  lesson: 'When the ball goes wide, the back line slides across together. Stay close enough to cover your 2.',
  us:   { 1:[27,71], 3:[16,58], 4:[21,59], 2:[40,53], 6:[30,46], 10:[26,35], 11:[9,34], 9:[24,24], 7:[42,35] },
  them: { 1:[25,4], 2:[12,27], 4:[25,27.5], 3:[38,28], 6:[22,38], 10:[34,43], 9:[27,51.5], 7:[10,48], 11:[41,48.5] },
  ball: { team: 'them', n: '11' },
  zones: [
    [30, 57.5, 2.6, 3, 'Pro spot', 'The ball went wide, so you slid across behind your 2, still goal side of their 9. Your 3 tucks in behind you.'],
    [21, 59, 2.6, 1, 'Too far', 'Your 2 is out there alone. If he gets beaten, there is a huge gap.'],
    [36, 57, 2.2, 1, 'Too close', 'You both went to the ball. Now their 9 is free in the middle.']
  ],
  elsewhere: P(1, 'Not quite', 'Slide across toward your 2, but stay goal side of their 9.'),
  best: { kind: 'move', at: [30,57.5] } },

{ ch: 4, type: 'move', title: 'Win the long ball',
  prompt: 'Their keeper is kicking it long toward their 9. Drag the 4.',
  hint: 'Where will the ball land? Where is he?',
  lesson: 'Long ball coming? Get goal side of their 9, under the ball, so you can step in front and win it.',
  us:   { 1:[25,71], 3:[13,57], 4:[30,56], 2:[38,56], 6:[22,40], 10:[24,29], 11:[8,26], 9:[26,16], 7:[42,26] },
  them: { 1:[25,5], 2:[12,19], 4:[25,12], 3:[38,19], 6:[25,33], 10:[31,38], 9:[24,44], 7:[10,44], 11:[40,44] },
  ball: { team: 'them', n: '1' },
  arrows: [{ team: 'them', from: [25,8], to: [24.6,42], dash: 1 }],
  zones: [
    [24.5, 47.5, 2.2, 3, 'Pro spot', 'You got goal side of their 9, right under the ball. Now you can step in front and head it away.'],
    [24.5, 40.5, 2.2, 1, 'In front', 'The ball flies over your head, and he is through.'],
    [30, 56, 2.6, 1, 'Too deep', 'He wins the header with nobody near him.']
  ],
  elsewhere: P(1, 'Not quite', 'Get goal side of their 9, where the ball will land.'),
  best: { kind: 'move', at: [24.5,47.5] } },

/* ---------------- 6. Defend the box ---------------- */
{ ch: 5, type: 'move', title: 'Near post',
  prompt: 'Their 7 is about to cross from deep on our left. Their 9 is running to the near post. Drag the 4.',
  hint: 'Where is their 9 going? Who gets there first?',
  lesson: 'Cross coming? Get to the near post before your man, between him and the goal, and attack the ball.',
  us:   { 1:[24.5,72.5], 3:[10,64.5], 4:[27,62], 2:[33,63], 6:[24,54], 10:[25,42], 11:[9,48], 9:[27,33], 7:[42,44] },
  them: { 1:[25,4], 2:[12,40], 4:[25,37], 3:[38,40], 6:[24,47], 10:[27.5,57], 9:[19,64.5], 7:[6.5,67.5], 11:[38,59] },
  ball: { team: 'them', n: '7' },
  arrows: [{ team: 'them', from: [19.2,64.8], to: [20.4,68.6], dash: 1 }],
  zones: [
    [21.5, 69.8, 2.2, 3, 'Pro spot', 'You got to the near post before their 9, between him and the goal. You can attack the cross.'],
    [27, 62, 2.6, 1, 'Ball watching', 'You watched the ball and lost their 9.'],
    [18, 60.5, 2.4, 0, 'Wrong side', 'He is between you and the goal.']
  ],
  elsewhere: P(1, 'Not quite', 'Beat their 9 to the near post.'),
  best: { kind: 'move', at: [21.5,69.8] } },

{ ch: 5, type: 'move', title: 'Block the shot',
  prompt: 'Their 10 got past your 6 and is about to shoot from the edge of our box. Drag the 4.',
  hint: 'Draw a line from the ball to the middle of the goal.',
  lesson: 'Someone about to shoot? Get in the line between the ball and the middle of the goal, close enough to block it.',
  us:   { 1:[25,72], 3:[15,61], 4:[21,63], 2:[37,62], 6:[26,50], 10:[22,42], 11:[8,40], 9:[27,30], 7:[43,40] },
  them: { 1:[25,4], 2:[12,34], 4:[24,33.5], 3:[38,34], 6:[25,44], 10:[30,56.5], 9:[18,57.5], 7:[8,52], 11:[42,54] },
  ball: { team: 'them', n: '10' },
  arrows: [{ team: 'them', from: [28.6,52.6], to: [29.8,56] }, { team: 'us', from: [26.2,50.6], to: [27.8,53.6], dash: 1 }],
  zones: [
    [29.2, 59.5, 1.7, 3, 'Pro spot', 'You got in the line between the ball and the middle of the goal, close enough to block his shot.'],
    [28, 63.7, 2, 2, 'Good', 'You are in the line, but too far away to block it. Get closer.'],
    [21, 63, 2.6, 1, 'Too far', "From there you can't block anything. He shoots."]
  ],
  elsewhere: P(1, 'Not quite', 'Get in the line between the ball and the middle of our goal, close to him.'),
  best: { kind: 'move', at: [29.2,59.5] } },

{ ch: 5, type: 'ball', title: 'Clear it',
  prompt: 'A cross dropped to you in our box. Their players are all around.',
  hint: 'Where is the danger? Where is it safe?',
  lesson: 'In trouble in your own box? No risks. Clear it high and wide, never across the middle.',
  us:   { 1:[25,72], 3:[14,66], 4:[24,66], 2:[36,65], 6:[27,56], 10:[22,47], 11:[7,44], 9:[26,36], 7:[43,44] },
  them: { 1:[25,4], 2:[11,35], 4:[25,31], 3:[39,36], 6:[26,51], 10:[29.5,61.5], 9:[22.5,62], 7:[11,61.5], 11:[39,60.5] },
  ball: '4',
  pass: {
    3: P(0, 'Pressed', 'Their 7 is right on your 3, inside our box.'),
    6: P(1, 'Risky', 'A short pass through the middle of our box, with their 9 and 10 right there.'),
    2: P(1, 'Across our box', 'A pass across the front of our goal is how goals are given away.'),
    1: P(1, 'Risky', 'Their 9 is right there to chase it, and your keeper has no time.')
  },
  lead: [
    [9, 47, 4.5, 3, 'Pro choice', 'Their players crowded our box, so you cleared it high and wide toward your 11. Away from danger, and your 11 can chase it.', '11', null, true],
    [41, 47, 4.5, 2, 'Good', 'Cleared, but it flies across the front of our goal, right past their 10.', '7', null, true],
    [25, 43, 4, 1, 'Up the middle', 'Straight up the middle, it lands near their 6, and they attack again.', '10', '6']
  ],
  shoot: null,
  carry: [],
  elsewhere: P(0, 'Too risky', 'Dribbling in our box with their players around you? Get it out of there.'),
  best: { kind: 'pass', to: '11', at: [9,47] } },

{ ch: 5, type: 'move', title: 'Not too deep',
  prompt: 'Their 7 is about to cross from far out on the wing. You ran all the way back to our goal line. Drag the 4.',
  hint: 'Who needs the space near the goal? Where is their 9?',
  lesson: "Cross from far out? Don't run onto the goal line. Hold your ground near the penalty spot, goal side of their 9, and leave the space behind for your keeper.",
  us:   { 1:[25,72.5], 3:[14,66], 4:[28.5,70], 2:[36,66], 6:[25,56], 10:[23,45], 11:[8,46], 9:[27,34], 7:[43,42] },
  them: { 1:[25,4], 2:[11,38], 4:[25,30], 3:[39,36], 6:[20.5,48.5], 10:[30,57], 9:[24.5,61], 7:[8,51], 11:[40,58] },
  ball: { team: 'them', n: '7' },
  zones: [
    [24.5, 64.6, 2.2, 3, 'Pro spot', 'You held your ground near the penalty spot, goal side of their 9. Your keeper has room to come for the cross.'],
    [28.5, 70, 2.4, 1, 'Too deep', "On the goal line you're in your keeper's way, and their 9 has space at the penalty spot."]
  ],
  elsewhere: P(1, 'Not quite', 'Step up to the penalty spot, goal side of their 9.'),
  best: { kind: 'move', at: [24.5,64.6] } },

{ ch: 5, type: 'ball', title: 'Start the counter',
  prompt: 'You just won the ball. Their team was caught pushing forward, and your 11 is free on the wing.',
  hint: "He's free. Is there grass in front of him?",
  lesson: 'Won it with their team caught forward? Look for the long pass into space for your winger first.',
  us:   { 1:[25,71], 3:[12,60], 4:[24,58], 2:[38,60], 6:[27,48], 10:[22,40], 11:[8,38], 9:[26,30], 7:[44,38] },
  them: { 1:[25,4], 2:[18,32], 4:[28,26], 3:[38,32], 6:[20,45], 10:[30,51], 9:[25,54], 7:[13,54], 11:[38,54] },
  ball: '4',
  pass: {
    11: P(2, 'Good', 'He is free, but there is open grass in front of him. Play it into that space so he can run at full speed.'),
    6:  P(1, 'Slow', 'Your 6 is marked, and the counter slows down.'),
    3:  TOO_SAFE('Sideways, when their team is caught forward. Look up the field.'),
    2:  TOO_SAFE('Sideways, when their team is caught forward. Look up the field.'),
    1:  TOO_SAFE('Back to the keeper? Their team is caught forward. Go now.')
  },
  lead: [
    [6, 28, 4, 3, 'Pro choice', 'Their team was caught forward, so you played it into the open grass in front of your 11. He runs onto it at full speed.', '11', null, true],
    [5, 13, 3, 1, 'Overhit', 'Too far. Their 2 gets there first.', '11', '2']
  ],
  leadNote: 'Your 11 has open grass ahead. Play it into the space in front of him.',
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Too slow', 'Carrying it gives their team time to get back. One pass gets your 11 away.'),
  best: { kind: 'pass', to: '11', at: [6,28] } }
];

window.RIDDLE_LIB.defineSet({ me: '4', chapters: CHAPTERS, riddles: RIDDLES });
})();
