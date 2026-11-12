/* Riddles for the 4 (center back). Format notes are at the top of riddles-6.js. */
(function () {
const { P, TOO_SAFE } = window.RIDDLE_LIB;

const CHAPTERS = [
  { name: 'Build from the back', blurb: 'You have the ball. Start the attack.' },
  { name: 'Beat the press', blurb: 'They are pressing. Find the way out.' },
  { name: 'Mark the striker', blurb: 'Their 9 is your job. Stay between their 9 and our goal.' },
  { name: 'Hold the line', blurb: 'Step up, drop off, and stay together.' },
  { name: 'Cover and balance', blurb: 'Help your teammates and guard the middle.' },
  { name: 'Defend the box', blurb: 'Near our goal: block it, clear it, and start the counter.' }
];

const RIDDLES = [
/* ---------------- 1. Build from the back ---------------- */
{ ch: 0, type: 'ball', title: 'Past their 9',
  prompt: 'Your keeper rolled it to you. Their 9 is running at you, and their wingers are on your 3 and 2.',
  hint: 'Who is free behind their 9?',
  lesson: 'When their 9 presses you, look for the free player behind their 9. One pass past the 9 beats their press.',
  us:   { 1:[25,71], 3:[10,58], 4:[25,60], 2:[40,58], 6:[24,47], 10:[26,33], 11:[6,30], 9:[25,18], 7:[44,30] },
  them: { 1:[25,4], 2:[12,24], 4:[25,21.5], 3:[38,24], 6:[21,36.5], 10:[31,40], 9:[29,56.5], 7:[13,52], 11:[38,52] },
  ball: '4',
  arrows: [{ team: 'them', from: [30.6,54.4], to: [29.2,56.3] }],
  pass: {
    6:  P(3, 'Pro choice', 'Their 9 came at you, so you played it past their 9 to your 6, the free player. One pass and their press is beaten.'),
    3:  P(2, 'Good', 'Safe, but your 6 was free in the middle. One pass to the 6 gets you past their 9.'),
    2:  P(1, 'Into the pressure', 'Their 9 is coming from that side. Their 9 can cut that pass out or jump on your 2.'),
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
          [25, 53, 2.2, 0, 'Into their 9', 'You dribbled straight into their 9.']],
  elsewhere: P(1, 'Not quite', 'Carry the ball into the open grass in front of you.'),
  best: { kind: 'carry', at: [32,52] } },

{ ch: 0, type: 'ball', title: 'Lead your 3',
  prompt: 'You have the ball. Their whole team has shifted to your right side. Your 3 is wide open on the left.',
  hint: "Your 3 is open. Is there grass ahead too?",
  lesson: 'Switch it away from the crowd. If your teammate has open grass ahead, play it into that space to run onto.',
  us:   { 1:[25,71], 3:[8,56], 4:[27,60], 2:[41,57], 6:[29,47], 10:[30,34], 11:[5,30], 9:[27,19], 7:[45,31] },
  them: { 1:[25,4], 2:[11,23], 4:[26,22.5], 3:[38,24], 6:[26.5,37.5], 10:[33,43], 9:[31,55.5], 7:[18,44], 11:[40,51] },
  ball: '4',
  arrows: [{ team: 'them', from: [32.6,53.4], to: [31.3,55.2] }],
  pass: {
    3: P(2, 'Good', 'Good switch, away from their crowd. But the 3 had open grass ahead. Play it in front of the 3 to run onto.'),
    6: P(1, 'Crowded', 'Their 9 and 10 are both close. The space was on the left.'),
    2: P(1, 'Into the crowd', 'Their 11 and 9 are on that side. The space is on the left.'),
    1: TOO_SAFE('Back to the keeper when your 3 was wide open.')
  },
  lead: [
    [7, 48, 3, 3, 'Pro choice', 'Their team crowded your right side, so you switched it into the space in front of your 3. The 3 runs onto it with the whole wing open.', '3', null, true]
  ],
  leadNote: 'Your 3 has open grass ahead. Play it into that space.',
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Their team is all on your right. Switch it.'),
  best: { kind: 'pass', to: '3', at: [7,48] } },

{ ch: 0, type: 'ball', title: 'Use your keeper',
  prompt: 'Their 9 and 10 are both pressing you, and everyone in front of you is marked.',
  hint: 'Is there a teammate nobody is marking?',
  lesson: 'The keeper is a teammate too. If everything in front is covered, play it back to the keeper and start again.',
  us:   { 1:[25,71], 3:[11,58], 4:[25,59], 2:[39,58], 6:[25,47], 10:[25,34], 11:[6,30], 9:[25,18], 7:[44,30] },
  them: { 1:[25,4], 2:[12,24], 4:[25,21.5], 3:[38,24], 6:[25,43.5], 10:[29.5,55.5], 9:[22.5,55], 7:[13,53.5], 11:[37,53.5] },
  ball: '4',
  arrows: [{ team: 'them', from: [21.4,53], to: [22.4,54.8] }, { team: 'them', from: [30.8,53.6], to: [29.6,55.3] }],
  pass: {
    1: P(3, 'Pro choice', 'Two of them pressed you and everyone in front was marked, so you went back to your keeper. The keeper has time to switch it.'),
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
  leadNote: 'Your 10 is free right there. Play it to feet.',
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
    9: P(3, 'Pro choice', 'Their defenders dropped deep, so there was no space behind them. Your 9 dropped into the gap, and you played it to feet.'),
    6: P(1, 'Marked', 'Their 10 is right on your 6.'),
    3: P(1, 'Pressed', 'Their 7 jumps on the 3 as soon as it arrives.'),
    2: P(1, 'Pressed', 'Their 11 jumps on the 2 as soon as it arrives.'),
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
  hint: 'Which side is their 9 coming from? Which side is free?',
  lesson: 'Play away from pressure. If pressure comes from your left, look right.',
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
  elsewhere: P(1, 'Not quite', 'Their 9 is closing from your left. Move the ball away from the press.'),
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
    3: P(1, 'Pressed', 'Their 7 jumps on the 3 as soon as it arrives.'),
    2: P(1, 'Pressed', 'Their 11 jumps on the 2 as soon as it arrives.'),
    9: P(1, 'To feet?', 'Their 4 is right behind your 9. The space was behind their defenders.'),
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
  lesson: 'Facing your own goal with a striker on your back? Play it to your keeper, then move so the keeper can give it back.',
  us:   { 1:[25,71], 3:[11,60], 4:[28,63], 2:[39,57], 6:[25,49], 10:[23,37], 11:[6,33], 9:[25,22], 7:[44,32] },
  them: { 1:[25,4], 2:[12,26], 4:[25,25.5], 3:[38,26.5], 6:[26,41], 10:[24,52.5], 9:[27,59], 7:[14,55], 11:[41,50] },
  ball: '4',
  arrows: [{ team: 'them', from: [26.6,56.6], to: [27,58.8] }],
  pass: {
    1: P(3, 'Pro choice', 'You were facing your own goal with their 9 on your back, so you played it to your keeper. Now move so the keeper can give it back.'),
    3: P(1, 'Across the box', "You're facing your own goal. A pass across the front of our box is how goals are given away."),
    2: P(0, "Can't see it", "You're facing your own goal. You'd have to turn into their 9 to make that pass."),
    6: P(0, "Can't see it", "You're facing your own goal. You'd have to turn into their 9 to make that pass.")
  },
  shoot: null,
  carry: [],
  elsewhere: P(0, 'Turned into trouble', 'Their 9 is right behind you. Turning here loses the ball near our goal.'),
  best: { kind: 'pass', to: '1' } },

{ ch: 1, type: 'ball', title: "Where the 6 is going",
  prompt: 'You have the ball. Your 6 is sliding away from their 10 into open space.',
  hint: 'Where will your 6 be when the ball gets there?',
  lesson: 'Teammate getting away from a marker? Pass to where the run is going, not where it started.',
  us:   { 1:[25,71], 3:[11,58], 4:[26,60], 2:[39,58], 6:[27,48], 10:[26,34], 11:[6,31], 9:[26,19], 7:[44,31] },
  them: { 1:[25,4], 2:[12,24], 4:[25,22.5], 3:[38,24], 6:[28,38], 10:[30,45.5], 9:[32,54.5], 7:[14,51], 11:[38,50] },
  ball: '4',
  arrows: [{ team: 'us', from: [26,47.6], to: [21.8,46.9], dash: 1 }],
  pass: {
    6: P(1, 'Behind the run', "The 6 is moving away from their 10. A pass to the old spot arrives with their 10 still right there."),
    3: TOO_SAFE('Safe, but your 6 just got free. Use that.'),
    1: TOO_SAFE('Back to the keeper when your 6 was getting free.')
  },
  lead: [
    [21, 47, 2.8, 3, 'Pro choice', "Your 6 was moving away from their 10, so you passed to where the 6 was going. The 6 gets it in space, facing forward.", '6', null, true]
  ],
  leadNote: "Your 6 is moving into space. Play it to where the 6 is going.",
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Your 6 is getting free. Pass to where the 6 is going.'),
  best: { kind: 'pass', to: '6', at: [21,47] } },

/* ---------------- 3. Mark the striker ---------------- */
{ ch: 2, type: 'move', title: 'Goal side',
  prompt: "Their 6 has the ball in midfield. Their 9 is near our box, and you're too far from their 9. Drag the 4.",
  hint: 'Where should you be: in front of their 9, or between their 9 and our goal?',
  lesson: 'Mark from goal side: between the attacker and our goal, close enough to touch.',
  us:   { 1:[25,71], 3:[13,58], 4:[31,62], 2:[38,57], 6:[25.5,44.5], 10:[21,36], 11:[8,36], 9:[27,31.5], 7:[42,36] },
  them: { 1:[25,4], 2:[11,32], 4:[25,28], 3:[39,32], 6:[25,40], 10:[31,48], 9:[23,55], 7:[12,47], 11:[40,46] },
  ball: { team: 'them', n: '6' },
  zones: [
    [23.5, 58.5, 2.6, 3, 'Pro spot', 'You got between their 9 and our goal, close enough to touch. You can see their 9 and the ball.'],
    [23, 51.5, 2.6, 0, 'Wrong side', 'You are in front of their 9. One pass over your head and their 9 is through on goal.'],
    [24, 66, 3, 1, 'Too deep', 'Too far from their 9, who gets the ball and turns.'],
    [31, 62, 2.6, 1, 'Too far', "Their 9 is free. One pass and their 9 turns at you."]
  ],
  elsewhere: P(1, 'Not quite', 'Get between their 9 and our goal, close up.'),
  best: { kind: 'move', at: [23.5,58.5] } },

{ ch: 2, type: 'move', title: 'Step in tight',
  prompt: 'Their 9 is dropping toward midfield to get the ball, facing away from our goal. Your 3 and 2 have tucked in behind you. Drag the 4.',
  hint: 'Their 9 wants to turn. How do you stop that?',
  lesson: "Their 9 drops facing away from goal and you have cover? Step in tight to stop the turn.",
  us:   { 1:[25,71], 3:[17,58], 4:[25,59], 2:[33,58], 6:[30,44.5], 10:[22,34], 11:[7,33], 9:[27,26], 7:[44,34] },
  them: { 1:[25,4], 2:[11,28], 4:[24,22.5], 3:[39,29], 6:[24,38.5], 10:[33,41], 9:[25,46], 7:[10,47], 11:[41,47] },
  ball: { team: 'them', n: '6' },
  arrows: [{ team: 'them', from: [25,51], to: [25,46.6], dash: 1 }],
  zones: [
    [25, 49.5, 2.4, 3, 'Pro spot', "Their 9 dropped facing away from goal, and your 3 and 2 are covering behind you. You stepped in tight to stop the turn."],
    [25, 59, 3, 1, 'Too far', 'From there their 9 has time to turn and face you.'],
    [25, 43, 2.2, 0, 'Wrong side', 'You went in front of their 9, who spins you and is through.']
  ],
  elsewhere: P(1, 'Not quite', 'Step up tight behind their 9 to stop the turn.'),
  best: { kind: 'move', at: [25,49.5] } },

{ ch: 2, type: 'move', title: 'Let the 9 go',
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
    [26, 50, 2.6, 0, 'Followed the 9', 'You followed their 9 and left the space behind you empty. Their 11 runs into it.'],
    [25, 58.5, 2.4, 1, 'Stood still', 'Their 11 is running in behind your 2. Get across.']
  ],
  elsewhere: P(1, 'Not quite', 'Let their 9 go to your 6. Guard the space their 11 is running into.'),
  best: { kind: 'move', at: [30.5,58.5] } },

{ ch: 2, type: 'move', title: 'Ball side',
  prompt: 'Their 7 has the ball out on our left wing. Their 9 is waiting near our box, and you are on the far side of their 9. Drag the 4.',
  hint: 'Where will the pass from the wing go? Get in its way.',
  lesson: 'Ball out wide? Stand goal side of their 9 and on the ball side, so the pass to their 9 has to go through you.',
  us:   { 1:[23,70], 3:[10,52], 4:[29,60], 2:[37,58], 6:[24,46], 10:[23,36], 11:[9,34], 9:[27,22.5], 7:[42,34] },
  them: { 1:[25,4], 2:[12,28], 4:[25,27], 3:[38,29], 6:[22,40], 10:[28,48.5], 9:[24,56], 7:[8,46], 11:[40,50] },
  ball: { team: 'them', n: '7' },
  zones: [
    [21.5, 58.5, 2.4, 3, 'Pro spot', 'The ball is out wide, so you got goal side of their 9 and on the ball side. A pass to their 9 has to go through you.'],
    [27.5, 56, 2.4, 1, 'Wrong side', 'On the far side, the pass from the wing gets to their 9 before you.'],
    [23.5, 51.5, 2.2, 0, 'In front', 'One ball over your head and their 9 is behind you.']
  ],
  elsewhere: P(1, 'Not quite', 'Get goal side of their 9, on the side of the ball.'),
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
    [24, 52.6, 1.9, 3, 'Pro spot', "You stayed on your feet a few yards off their 9, close enough to block a shot. Your 6 arrives, and now it's two against one."],
    [24, 49.6, 1.2, 0, 'Dived in', 'You dove in. One touch past you and their 9 is through on goal.'],
    [24, 59.5, 2.6, 1, 'Too far', 'So far away that their 9 can shoot or pass at will.']
  ],
  elsewhere: P(1, 'Not quite', 'Stay goal side, a few yards off, and wait for your 6.'),
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
  prompt: 'Their 6 has the ball, facing forward, and nobody is pressing. Their 9 is about to run. Drag the 4.',
  hint: 'Can their 6 see the space behind you?',
  lesson: 'Ball carrier facing forward with time? Drop back. Take away the space behind you before it gets used.',
  us:   { 1:[25,70], 3:[12,47], 4:[25,47.5], 2:[38,47], 6:[30,36], 10:[24,26], 11:[8,24], 9:[27,15], 7:[43,24] },
  them: { 1:[25,3], 2:[11,17], 4:[24,12], 3:[38,17], 6:[22,33], 10:[31,30], 9:[25,42.5], 7:[10,41.5], 11:[40,41.5] },
  ball: { team: 'them', n: '6' },
  arrows: [{ team: 'them', from: [25.4,43.4], to: [26.8,50], dash: 1 }],
  zones: [
    [25, 56, 3, 3, 'Pro spot', 'Their 6 has time and is facing forward, so you dropped back. Now there is no space behind you for a ball over the top.'],
    [25, 47.5, 2.4, 1, 'Too high', 'Their 6 has time to pick a pass over your head.'],
    [24, 38, 2.4, 0, 'Stepped up', 'Their 6 has time, and you stepped up. One ball over the top and their 9 is through.']
  ],
  elsewhere: P(1, 'Not quite', 'Drop back and protect the space behind you.'),
  best: { kind: 'move', at: [25,56] } },

{ ch: 3, type: 'move', title: 'Hold the line',
  prompt: 'Their 6 has the ball, facing their own goal, and your 6 is pressing. Your 3 and 2 are holding the line, but you dropped deep. Drag the 4.',
  hint: 'Can their 6 hit a long ball right now? Where are your 3 and 2?',
  lesson: "Ball carrier under pressure or facing backward? No ball over the top is coming. Hold the line, level with your 3 and 2.",
  us:   { 1:[25,71], 3:[12,50], 4:[25,59], 2:[38,50], 6:[25,37], 10:[29,29], 11:[8,28], 9:[26,18], 7:[43,28] },
  them: { 1:[25,4], 2:[11,21], 4:[24,14.5], 3:[38,21], 6:[24.5,33.5], 10:[31,32.5], 9:[26,46], 7:[11,44.5], 11:[39,44.5] },
  ball: { team: 'them', n: '6' },
  arrows: [{ team: 'us', from: [25.6,39.6], to: [25.1,37.4] }],
  zones: [
    [25, 50.5, 2.6, 3, 'Pro spot', "Their 6 is under pressure and facing their own goal, so no ball over the top is coming. You stepped up level with your 3 and 2."],
    [25, 59, 3, 1, 'Too deep', 'Their 6 is under pressure. Staying deep keeps their 9 onside and leaves a gap in our line.'],
    [26, 41, 2.4, 1, 'Too high', 'Stepping past their 9 leaves the space behind you open.']
  ],
  elsewhere: P(1, 'Not quite', 'Get level with your 3 and 2.'),
  best: { kind: 'move', at: [25,50.5] } },

{ ch: 3, type: 'move', title: 'Recovery run',
  prompt: 'Their 11 got past your 2 and is dribbling toward our box. Your 3 is tucking in to pick up their 9. Drag the 4.',
  hint: 'Where does their 11 want to go? Get there first.',
  lesson: "When they get in behind, don't chase the ball from behind. Sprint back toward our goal and get between the ball and the goal.",
  us:   { 1:[26,71], 3:[14,57], 4:[25,55], 2:[38,49], 6:[24,44], 10:[22,33], 11:[8,32], 9:[26,22], 7:[43,33] },
  them: { 1:[25,4], 2:[11,26], 4:[24,25.5], 3:[38,26], 6:[20,37], 10:[29,41], 9:[24,51], 7:[11,51], 11:[39,57.5] },
  ball: { team: 'them', n: '11' },
  arrows: [{ team: 'them', from: [40.4,53], to: [39.3,57] }, { team: 'us', from: [14.4,57.4], to: [19.4,60.6], dash: 1 }],
  zones: [
    [33.5, 62.5, 2.8, 3, 'Pro spot', 'Their 11 got past your 2, so you sprinted back toward our goal and got between the ball and the goal. Your 3 picks up their 9.'],
    [38, 53, 2.6, 0, 'Behind the ball', 'You chased the ball from behind. Their 11 is already past you.'],
    [25, 55, 2.4, 1, 'Watching', 'Their 11 is running at our goal. Get back.']
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
  prompt: 'Their 7 has the ball on our left wing, and your 3 is going to press. Your 2 is tucking in. Drag the 4.',
  hint: 'What if their 7 beats your 3?',
  lesson: 'When a teammate goes to the ball, slide across to cover. If the press is beaten, you are there.',
  us:   { 1:[23,71], 3:[10,53], 4:[27,59], 2:[36,58], 6:[20,46], 10:[24,35], 11:[8,36], 9:[26,25], 7:[42,34] },
  them: { 1:[25,4], 2:[12,30], 4:[25,29], 3:[38,30], 6:[18,39], 10:[30,45], 9:[27,52.5], 7:[9,48.5], 11:[41,48] },
  ball: { team: 'them', n: '7' },
  arrows: [{ team: 'us', from: [36,58], to: [31.2,57.2], dash: 1 }],
  zones: [
    [17, 58, 2.8, 3, 'Pro spot', 'Your 3 went to the ball, so you slid across to cover. If their 7 beats the 3, you are there. Your 2 tucks in for their 9.'],
    [27, 59, 2.6, 1, 'Too far', 'If their 7 beats your 3, nobody is there.'],
    [13, 49.5, 2.2, 1, 'Too close', 'You both went to the ball. One pass inside and the middle is open.']
  ],
  elsewhere: P(1, 'Not quite', 'Slide across behind your 3.'),
  best: { kind: 'move', at: [17,58] } },

{ ch: 4, type: 'move', title: 'Pass the 9 on',
  prompt: 'Their 9 ran out toward our left wing, and you followed. Your 3 is right there with their 9. Their 10 is arriving in the middle. Drag the 4.',
  hint: 'Your 3 has their 9. Who is guarding the middle?',
  lesson: "Don't follow a striker out wide when a teammate is there. Pass the striker on and guard the middle.",
  us:   { 1:[25,71], 3:[11,57], 4:[16,58], 2:[38,57], 6:[31,44], 10:[24,35], 11:[7,34], 9:[26,24], 7:[43,34] },
  them: { 1:[25,4], 2:[11,27], 4:[24,27.5], 3:[39,28], 6:[21,40], 10:[24.5,47.5], 9:[11,51.5], 7:[7,45], 11:[40,48] },
  ball: { team: 'them', n: '6' },
  arrows: [{ team: 'them', from: [18.5,53.5], to: [12.2,51.8], dash: 1 }, { team: 'them', from: [25,42.6], to: [24.6,47], dash: 1 }],
  zones: [
    [24, 58, 2.8, 3, 'Pro spot', 'Your 3 has their 9 now. You passed their 9 on and got back to the middle, where their 10 is arriving.'],
    [16, 58, 2.4, 1, 'Pulled wide', 'Your 3 has their 9. You left the middle empty for their 10.']
  ],
  elsewhere: P(1, 'Not quite', 'Let your 3 take their 9. Get back to the middle.'),
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
    [22, 49.2, 1.8, 0, 'Dived in', 'You dove in at the ball. Their 9 passes to their 10, who is through on goal.'],
    [32.5, 49.5, 2.2, 1, 'Left the ball', 'You went to their 10 and left their 9 a free run at goal.'],
    [16, 57, 2.4, 1, 'Too far', 'Their 9 runs straight at our goal.']
  ],
  elsewhere: P(1, 'Not quite', 'Get between them, goal side, and back off.'),
  best: { kind: 'move', at: [26,53] } },

{ ch: 4, type: 'move', title: 'Slide across',
  prompt: 'They switched it to their 11 on our right wing. Your 2 is going to press. Drag the 4.',
  hint: 'If their 11 beats your 2, who is there?',
  lesson: 'When the ball goes wide, the back line slides across together. Stay close enough to cover your 2.',
  us:   { 1:[27,71], 3:[16,58], 4:[21,59], 2:[40,53], 6:[30,46], 10:[26,35], 11:[9,34], 9:[24,24], 7:[42,35] },
  them: { 1:[25,4], 2:[12,27], 4:[25,27.5], 3:[38,28], 6:[22,38], 10:[34,43], 9:[27,51.5], 7:[10,48], 11:[41,48.5] },
  ball: { team: 'them', n: '11' },
  zones: [
    [30, 57.5, 2.6, 3, 'Pro spot', 'The ball went wide, so you slid across behind your 2, still goal side of their 9. Your 3 tucks in behind you.'],
    [21, 59, 2.6, 1, 'Too far', 'Your 2 is out there alone. If the 2 gets beaten, there is a huge gap.'],
    [36, 57, 2.2, 1, 'Too close', 'You both went to the ball. Now their 9 is free in the middle.']
  ],
  elsewhere: P(1, 'Not quite', 'Slide across toward your 2, but stay goal side of their 9.'),
  best: { kind: 'move', at: [30,57.5] } },

{ ch: 4, type: 'move', title: 'Win the long ball',
  prompt: 'Their keeper is kicking it long toward their 9. Drag the 4.',
  hint: 'Where will the ball land? Where is their 9?',
  lesson: 'Long ball coming? Get goal side of their 9, under the ball, so you can step in front and win it.',
  us:   { 1:[25,71], 3:[13,57], 4:[30,56], 2:[38,56], 6:[22,40], 10:[24,29], 11:[8,26], 9:[26,16], 7:[42,26] },
  them: { 1:[25,5], 2:[12,19], 4:[25,12], 3:[38,19], 6:[25,33], 10:[31,38], 9:[24,44], 7:[10,44], 11:[40,44] },
  ball: { team: 'them', n: '1' },
  arrows: [{ team: 'them', from: [25,8], to: [24.6,42], dash: 1 }],
  zones: [
    [24.5, 47.5, 2.2, 3, 'Pro spot', 'You got goal side of their 9, right under the ball. Now you can step in front and head it away.'],
    [24.5, 40.5, 2.2, 1, 'In front', 'The ball flies over your head, and their 9 is through.'],
    [30, 56, 2.6, 1, 'Too deep', 'Their 9 wins the header with nobody near.']
  ],
  elsewhere: P(1, 'Not quite', 'Get goal side of their 9, where the ball will land.'),
  best: { kind: 'move', at: [24.5,47.5] } },

/* ---------------- 6. Defend the box ---------------- */
{ ch: 5, type: 'move', title: 'Near post',
  prompt: 'Their 7 is about to cross from deep on our left. Their 9 is running to the near post. Drag the 4.',
  hint: 'Where is their 9 going? Who gets there first?',
  lesson: 'Cross coming? Get to the near post before the attacker, between the attacker and the goal, and attack the ball.',
  us:   { 1:[24.5,72.5], 3:[10,64.5], 4:[27,62], 2:[33,63], 6:[24,54], 10:[25,42], 11:[9,48], 9:[27,33], 7:[42,44] },
  them: { 1:[25,4], 2:[12,40], 4:[25,37], 3:[38,40], 6:[24,47], 10:[27.5,57], 9:[19,64.5], 7:[6.5,67.5], 11:[38,59] },
  ball: { team: 'them', n: '7' },
  arrows: [{ team: 'them', from: [19.2,64.8], to: [20.4,68.6], dash: 1 }],
  zones: [
    [21.5, 69.8, 2.2, 3, 'Pro spot', 'You got to the near post before their 9, between their 9 and the goal. You can attack the cross.'],
    [27, 62, 2.6, 1, 'Ball watching', 'You watched the ball and lost their 9.'],
    [18, 60.5, 2.4, 0, 'Wrong side', 'Their 9 is between you and the goal.']
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
    [29.2, 59.5, 1.7, 3, 'Pro spot', 'You got in the line between the ball and the middle of the goal, close enough to block the shot.'],
    [28, 63.7, 2, 2, 'Good', 'You are in the line, but too far away to block it. Get closer.'],
    [21, 63, 2.6, 1, 'Too far', "From there you can't block anything. Their 10 shoots."]
  ],
  elsewhere: P(1, 'Not quite', 'Get in the line between the ball and the middle of our goal, close to the shooter.'),
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
  hint: "Your 11 is free. Is there grass ahead?",
  lesson: 'Won it with their team caught forward? Look for the long pass into space for your winger first.',
  us:   { 1:[25,71], 3:[12,60], 4:[24,58], 2:[38,60], 6:[27,48], 10:[22,40], 11:[8,38], 9:[26,30], 7:[44,38] },
  them: { 1:[25,4], 2:[18,32], 4:[28,26], 3:[38,32], 6:[20,45], 10:[30,51], 9:[25,54], 7:[13,54], 11:[38,54] },
  ball: '4',
  pass: {
    11: P(2, 'Good', 'The 11 is free, but there is open grass ahead. Play it into that space for a run at full speed.'),
    6:  P(1, 'Slow', 'Your 6 is marked, and the counter slows down.'),
    3:  TOO_SAFE('Sideways, when their team is caught forward. Look up the field.'),
    2:  TOO_SAFE('Sideways, when their team is caught forward. Look up the field.'),
    1:  TOO_SAFE('Back to the keeper? Their team is caught forward. Go now.')
  },
  lead: [
    [6, 28, 4, 3, 'Pro choice', 'Their team was caught forward, so you played it into the open grass in front of your 11. The 11 runs onto it at full speed.', '11', null, true],
    [5, 13, 3, 1, 'Overhit', 'Too far. Their 2 gets there first.', '11', '2']
  ],
  leadNote: 'Your 11 has open grass ahead. Play it into that space.',
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Too slow', 'Carrying it gives their team time to get back. One pass gets your 11 away.'),
  best: { kind: 'pass', to: '11', at: [6,28] } }
];


/* ---------------- Motion: the build-ups and what happens next ----------------
   Matched to the puzzles above by title. Format at the top of riddles-motion.js. */
const { steal, offside, say } = window.RIDDLE_LIB;
const MOTION = {
  /* ---- 1. Build from the back ---- */
  'Past their 9': {
    intro: { start: { ball: 'us:1', us: { 4: [25, 63] }, them: { 9: [33, 50], 7: [13, 48], 11: [38, 48] } },
      cam: { at: [25, 67], zoom: 1.55, tilt: .5 },
      steps: [
        { t: 1.5, pass: 'us:4', pd: .1, us: { 4: [25, 60] }, them: { 9: [29, 56.5], 7: [13, 52], 11: [38, 52] }, tag: { 'them:9': 'PRESS' }, head: 'Your keeper rolls it to you',
          sub: 'Their 9 runs at you, and their wingers mark your 3 and 2.', cam: { at: [26, 57], zoom: 1.45, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      6: [{ t: 1.1, face: { 'us:6': 'up' }, us: { 6: [24, 42] }, tag: { 'us:6': ['FREE', 'good'], 'them:9': 'BYPASSED' }, head: 'Past their 9',
        sub: 'Their 9 came at you, so one pass to the free 6 beats their press.', cam: { at: [25, 48], zoom: 1.3, tilt: .55 }, wait: 1.2 }],
      2: steal('2', '11', [39, 55.5], 'Into the pressure', 'Their 9 is coming from that side, and their 11 jumps on your 2.')
    } },

  'Step in': {
    intro: { start: { ball: 'us:1', us: { 4: [25, 62] }, them: { 9: [29, 49], 7: [11, 45], 11: [39, 45] } },
      cam: { at: [25, 67], zoom: 1.55, tilt: .5 },
      steps: [
        { t: 1.5, pass: 'us:4', pd: .1, us: { 4: [25, 59] }, them: { 9: [25, 51.5], 7: [9, 48], 11: [41, 48] }, head: 'Nobody presses you',
          sub: 'Their 9 stands in front of your 6, and everyone else is marked.', cam: { at: [25, 54], zoom: 1.45, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      carry0: [{ t: .9, them: { 11: [36.5, 51] }, tag: { 'them:11': 'STEPS IN' }, head: 'Step in', sub: 'Nobody pressed you, so you carried it forward. Now someone has to come to you…',
          cam: { at: [34, 51], zoom: 1.4, tilt: .55 } },
        { t: 1, pass: 'us:2', tag: { 'us:2': ['FREE', 'good'] }, head: 'Step in', sub: '…and that frees a teammate.', wait: 1.1 }],
      carry1: [{ t: .9, them: { 7: [13.5, 51] }, tag: { 'them:7': 'STEPS IN' }, head: 'Step in', sub: 'Nobody pressed you, so you carried it forward. Now someone has to come to you…',
          cam: { at: [16, 51], zoom: 1.4, tilt: .55 } },
        { t: 1, pass: 'us:3', tag: { 'us:3': ['FREE', 'good'] }, head: 'Step in', sub: '…and that frees a teammate.', wait: 1.1 }],
      carry2: [{ t: .5, pass: 'them:9', tag: { 'them:9': 'TACKLE' }, head: 'Into their 9', sub: 'You dribbled straight into their 9.', cam: { at: [25, 53], zoom: 1.55, tilt: .45 }, wait: 1.1 }]
    } },

  'Lead your 3': {
    intro: { start: { ball: 'us:2', us: { 4: [29, 62] }, them: { 9: [28, 52], 10: [30, 41], 7: [15, 41], 11: [37, 48], 6: [24, 35] } },
      cam: { at: [36, 58], zoom: 1.5, tilt: .5 },
      steps: [
        { t: 1.6, pass: 'us:4', pd: .15, us: { 4: [27, 60] }, them: { 9: [31, 55.5], 10: [33, 43], 7: [18, 44], 11: [40, 51], 6: [26.5, 37.5] },
          head: 'Their whole team shifts to your right', sub: 'Your 3 is wide open on the left.', cam: { at: [32, 50], zoom: 1.3, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      lead0: [{ t: 1.1, us: { 3: [7, 38] }, hatch: [{ pts: [[0, 30], [14, 30], [14, 56], [0, 56]], c: 'good' }], tag: { 'us:3': ['FREE', 'good'] }, head: 'Switch it',
        sub: 'Their team crowded your right side, so you switched it in front of your 3, with the whole wing open.', cam: { at: [10, 44], zoom: 1.35, tilt: .55 }, wait: 1.2 }]
    } },

  'Use your keeper': {
    intro: { start: { ball: 'us:3', them: { 9: [21, 51], 10: [31, 51] } },
      cam: { at: [16, 58], zoom: 1.5, tilt: .5 },
      steps: [
        { t: 1.5, pass: 'us:4', pd: .1, them: { 9: [22.5, 55], 10: [29.5, 55.5] }, tag: { 'them:9': 'PRESS', 'them:10': 'PRESS' }, head: 'Their 9 and 10 both press you',
          sub: 'And everyone in front of you is marked.', cam: { at: [25, 57], zoom: 1.5, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      1: [{ t: .9, tag: { 'us:1': ['FREE', 'good'] }, head: 'Use your keeper', sub: 'Two of them pressed you and everyone was marked, so you went back to your keeper…',
          cam: { at: [25, 66], zoom: 1.35, tilt: .5 } },
        { t: 1.2, pass: 'us:7', air: true, head: 'Use your keeper', sub: '…who has time to switch it.', cam: { at: [36, 48], zoom: 1.05, tilt: .5 }, wait: 1 }],
      2: steal('2', '11', [38.5, 55.5], 'Pressed', 'Their 11 jumps on your 2 as soon as the ball gets there.'),
      3: steal('3', '7', [12, 55.5], 'Pressed', 'Their 7 jumps on your 3 as soon as the ball gets there.')
    } },

  'Break the line': {
    intro: { start: { ball: 'us:2', us: { 4: [26, 62], 10: [24, 35] }, them: { 6: [32, 33], 10: [30.5, 42] } },
      cam: { at: [33, 60], zoom: 1.5, tilt: .5 },
      steps: [
        { t: 1.6, pass: 'us:4', pd: .15, us: { 4: [24, 60], 10: [23, 38] }, them: { 6: [32, 37], 10: [30.5, 45.5] }, head: 'You have the ball with time',
          sub: 'Their midfield steps up. Look between their lines.', cam: { at: [26, 47], zoom: 1.3, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      10: [{ t: 1.1, face: { 'us:10': 'up' }, us: { 10: [23, 32] }, tag: { 'us:10': ['TURNED', 'good'] }, head: 'Break the line',
        sub: 'Their midfield stepped up, so your 10 was free behind them. One pass skips their whole midfield.', cam: { at: [24, 36], zoom: 1.3, tilt: .55 }, wait: 1.2 }],
      6: steal('6', '10', [29.5, 47], 'Marked', 'Their 10 is right on your 6.'),
      9: steal('9', '4', [25.5, 22], 'Long and marked', 'Their 4 is right behind your 9. Your 10 was free and closer.')
    } },

  /* ---- 2. Beat the press ---- */
  'Into the gap': {
    intro: { start: { ball: 'us:1', us: { 4: [25, 63], 9: [26, 29] }, them: { 9: [20, 51], 7: [13, 49], 11: [37, 49] } },
      cam: { at: [25, 67], zoom: 1.5, tilt: .5 },
      steps: [
        { t: 1.6, pass: 'us:4', pd: .1, us: { 4: [25, 60], 9: [25, 33] }, them: { 9: [22, 55.5], 7: [13, 53], 11: [37, 53] }, tag: { 'them:9': 'PRESS' },
          head: 'They press your back three', sub: 'Their defenders stay deep, and your 9 drops into the gap.', cam: { at: [25, 45], zoom: 1.2, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      9: [{ t: 1, face: { 'us:9': 'up' }, us: { 9: [25, 29] }, tag: { 'us:9': ['IN THE GAP', 'good'] }, head: 'Into the gap',
        sub: 'Their defenders dropped deep, so your 9 dropped into the gap and you played it to feet.', cam: { at: [25, 33], zoom: 1.35, tilt: .55 }, wait: 1.2 }],
      2: steal('2', '11', [38.5, 55.5], 'Pressed', 'Their 11 jumps on the 2 as soon as it arrives.'),
      3: steal('3', '7', [12, 55.5], 'Pressed', 'Their 7 jumps on the 3 as soon as it arrives.'),
      6: steal('6', '10', [28.5, 50.5], 'Marked', 'Their 10 is right on your 6.')
    } },

  'Away from pressure': {
    intro: { start: { ball: 'us:1', us: { 4: [25, 63] }, them: { 9: [17, 52] } },
      cam: { at: [24, 66], zoom: 1.55, tilt: .5 },
      steps: [
        { t: 1.5, pass: 'us:4', pd: .1, us: { 4: [25, 60] }, them: { 9: [21.5, 57.5] }, tag: { 'them:9': 'PRESS' }, head: 'Their 9 closes you down',
          sub: 'From your left side.', cam: { at: [24, 58], zoom: 1.5, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      2: [{ t: 1, us: { 2: [40, 52] }, tag: { 'us:2': ['FREE', 'good'], 'them:9': 'TOO LATE' }, head: 'Away from pressure',
        sub: 'Their 9 came from your left, so you played it the other way.', cam: { at: [34, 55], zoom: 1.35, tilt: .5 }, wait: 1.2 }],
      6: steal('6', '10', [26.5, 45.5], 'Marked', 'Their 10 is right behind your 6.')
    } },

  'Over the top': {
    intro: { start: { ball: 'us:1', us: { 4: [24, 63] }, them: { 2: [10, 36], 4: [29.5, 35], 3: [40, 36], 1: [25, 5], 9: [22, 51], 7: [13, 50], 11: [37, 50] } },
      cam: { at: [25, 66], zoom: 1.5, tilt: .5 },
      steps: [
        { t: 1.7, pass: 'us:4', pd: .1, us: { 4: [24, 60] }, them: { 2: [10, 42.5], 4: [29.5, 41.5], 3: [40, 42.5], 1: [25, 9], 9: [22, 55.5], 7: [13, 54], 11: [37, 54] },
          chain: [{ ns: ['them:2', 'them:4', 'them:3'], c: 'good' }], head: 'Their whole team presses high',
          sub: 'Their defenders push up near halfway, with a lot of space behind them.', cam: { at: [25, 46], zoom: 1.2, tilt: .6 } },
        { t: 1, cam: 'wide', head: '', chain: [] }] },
    after: {
      lead0: [{ t: 1.1, us: { 9: [24, 15] }, chain: [{ ns: ['them:2', 'them:4', 'them:3'], c: 'good' }], hatch: [{ pts: [[4, 12], [46, 12], [46, 41], [4, 41]], c: 'good' }],
        tag: { 'us:9': ['THROUGH', 'good'] }, head: 'Over the top', sub: 'Their defenders pushed up high, so you played it over the top. Only the keeper to beat.',
        cam: { at: [25, 24], zoom: 1.25, tilt: .6 }, wait: 1.2 }],
      lead1: [{ t: 1.1, us: { 11: [9, 16] }, chain: [{ ns: ['them:2', 'them:4', 'them:3'], c: 'good' }], hatch: [{ pts: [[0, 12], [18, 12], [18, 41], [0, 41]], c: 'good' }],
        tag: { 'us:11': ['THROUGH', 'good'] }, head: 'Over the top', sub: 'Down the side for your 11, away from their keeper.', cam: { at: [11, 22], zoom: 1.3, tilt: .6 }, wait: 1.2 }],
      6: steal('6', '10', [28, 52], 'Marked', 'Their 10 is right on your 6. They want you to play there.')
    } },

  'Facing your own goal': {
    intro: { start: { ball: null, ballAt: [30, 50], us: { 4: [27, 57] }, them: { 9: [27, 52] } },
      cam: { at: [28, 56], zoom: 1.55, tilt: .45 },
      steps: [
        { t: 1.5, pass: 'us:4', face: { 'us:4': 'down' }, us: { 4: [28, 63] }, them: { 9: [27, 59] }, tag: { 'them:9': 'PRESS' }, head: 'A long ball goes over you',
          sub: 'You run back toward your own goal to get it, and their 9 chases right behind you.', cam: { at: [28, 61], zoom: 1.55, tilt: .45 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      1: [{ t: 1, us: { 4: [35, 62] }, face: { 'us:4': 'up' }, head: 'Play it to your keeper', sub: 'Facing your own goal with their 9 on your back: back to the keeper…',
          cam: { at: [30, 66], zoom: 1.4, tilt: .5 } },
        { t: .9, pass: 'us:4', tag: { 'us:4': ['OPEN', 'good'] }, head: 'Play it to your keeper', sub: '…then move so the keeper can give it back.', wait: 1.1 }],
      2: { replace: true, steps: [
        { t: .7, face: { 'us:4': 'up' }, them: { 9: [27.5, 61] }, tag: { 'them:9': 'TACKLE' }, head: 'Turned into trouble', sub: 'Their 9 was right behind you.',
          cam: { at: [28, 63], zoom: 1.6, tilt: .45 } },
        { t: .45, pass: 'them:9' },
        { t: .8, shot: [28, 75.8], head: 'Turned into trouble', sub: 'Turning here loses the ball near our goal.', wait: 1 }] },
      6: { replace: true, steps: [
        { t: .7, face: { 'us:4': 'up' }, them: { 9: [27.5, 61] }, tag: { 'them:9': 'TACKLE' }, head: 'Turned into trouble', sub: 'Their 9 was right behind you.',
          cam: { at: [28, 63], zoom: 1.6, tilt: .45 } },
        { t: .45, pass: 'them:9' },
        { t: .8, shot: [28, 75.8], head: 'Turned into trouble', sub: 'Turning here loses the ball near our goal.', wait: 1 }] }
    } },

  'Where the 6 is going': {
    intro: { start: { ball: 'us:2', us: { 4: [27, 63], 6: [29, 49] }, them: { 10: [31, 43] } },
      cam: { at: [33, 60], zoom: 1.5, tilt: .5 },
      steps: [
        { t: 1.5, pass: 'us:4', pd: .15, us: { 4: [26, 60], 6: [27, 48] }, them: { 10: [30, 45.5] }, head: 'Your 6 slides away from their 10',
          sub: 'Into open space. Where does the pass go?', cam: { at: [27, 52], zoom: 1.4, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      lead0: [{ t: 1, face: { 'us:6': 'up' }, us: { 6: [21, 42] }, tag: { 'us:6': ['FACING FORWARD', 'good'], 'them:10': 'LEFT BEHIND' }, head: 'Pass to where the 6 is going',
        sub: 'The 6 gets it in space, facing forward, away from their 10.', cam: { at: [23, 45], zoom: 1.35, tilt: .55 }, wait: 1.2 }],
      6: steal('6', '10', [28.5, 47], 'Behind the run', 'A pass to the old spot arrives with their 10 still right there.')
    } },

  /* ---- 3. Mark the striker ---- */
  'Goal side': {
    intro: { start: { ball: 'them:6', us: { 4: [32, 58] }, them: { 9: [26, 50] } },
      cam: { at: [26, 44], zoom: 1.45, tilt: .55 },
      steps: [
        { t: 1.5, us: { 4: [31, 62] }, them: { 9: [23, 55] }, head: 'Their 6 has the ball in midfield', sub: "Their 9 drifts toward our box, and you're too far from their 9.",
          cam: { at: [26, 52], zoom: 1.3, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1, pass: 'them:9', head: 'Goal side', sub: 'Between their 9 and our goal, close enough to touch…', cam: { at: [24, 56], zoom: 1.45, tilt: .55 } },
        { t: .6, pass: 'us:4', tag: { 'us:4': ['TACKLE', 'good'] }, head: 'Goal side', sub: '…so when the ball arrives, you win it.', wait: 1.1 }],
      zone1: [{ t: 1.2, pass: 'them:9', air: true, them: { 9: [24, 61] }, tag: { 'them:9': 'THROUGH' }, head: 'Wrong side',
        sub: 'You were in front of their 9. One pass over your head and their 9 is through on goal.', cam: { at: [24, 58], zoom: 1.4, tilt: .55 }, wait: 1.1 }],
      zone2: [{ t: 1, pass: 'them:9', head: 'Too deep', sub: 'Too far from their 9…', cam: { at: [24, 58], zoom: 1.35, tilt: .55 } },
        { t: .8, them: { 9: [23, 59] }, head: 'Too deep', sub: '…who gets the ball and turns at you.', wait: 1 }],
      zone3: [{ t: 1, pass: 'them:9', head: 'Too far', sub: 'Their 9 is free…', cam: { at: [26, 58], zoom: 1.35, tilt: .55 } },
        { t: .8, them: { 9: [23, 59] }, head: 'Too far', sub: '…and turns at you.', wait: 1 }]
    } },

  'Step in tight': {
    intro: { start: { ball: 'them:6', us: { 3: [14, 58], 2: [36, 58], 4: [25, 62] }, them: { 9: [25, 51] } },
      cam: { at: [25, 46], zoom: 1.45, tilt: .55 },
      steps: [
        { t: 1.5, us: { 3: [17, 58], 2: [33, 58], 4: [25, 59] }, them: { 9: [25, 46] }, head: 'Their 9 drops toward midfield',
          sub: 'Facing away from our goal. Your 3 and 2 tuck in behind you.', cam: { at: [25, 50], zoom: 1.35, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1, pass: 'them:9', tag: { 'us:4': ['TIGHT', 'good'] }, head: 'Step in tight', sub: 'Their 9 faces away, and your 3 and 2 cover behind you…',
          cam: { at: [25, 48], zoom: 1.5, tilt: .55 } },
        { t: .6, pass: 'us:4', tag: { 'us:4': ['WON IT', 'good'] }, head: 'Step in tight', sub: '…so you stop the turn and win it.', wait: 1.1 }],
      zone1: [{ t: 1, pass: 'them:9', head: 'Too far', sub: 'From there their 9 has time to turn…', cam: { at: [25, 50], zoom: 1.4, tilt: .55 } },
        { t: .9, them: { 9: [25, 51] }, head: 'Too far', sub: '…and run at you.', wait: 1 }],
      zone2: [{ t: 1, pass: 'them:9', head: 'Wrong side', sub: 'You went in front of their 9…', cam: { at: [26, 48], zoom: 1.4, tilt: .55 } },
        { t: 1, them: { 9: [28, 53] }, tag: { 'them:9': 'PAST YOU' }, head: 'Wrong side', sub: '…who spins you and is through.', wait: 1 }]
    } },

  'Let the 9 go': {
    intro: { start: { ball: 'them:6', us: { 2: [44, 36], 4: [25, 62] }, them: { 9: [26, 51], 11: [38, 45] } },
      cam: { at: [30, 46], zoom: 1.4, tilt: .55 },
      steps: [
        { t: 1.5, us: { 2: [43, 41], 4: [25, 58.5] }, them: { 9: [26, 46], 11: [36.5, 49] }, tag: { 'them:11': 'RUN' }, head: 'Their 9 drops toward midfield',
          sub: 'Their 11 sprints in behind, and your 2 is caught up the field.', cam: { at: [30, 50], zoom: 1.3, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.1, them: { 11: [33, 54] }, us: { 6: [23, 45] }, pass: 'us:4', air: true, pd: .3, tag: { 'us:4': ['COVER', 'good'], 'us:6': ['MARK', 'good'] },
        head: 'Let the 9 go', sub: 'Your 6 picks up their 9, and you guard the space their 11 runs into.', cam: { at: [30, 55], zoom: 1.35, tilt: .55 }, wait: 1.1 }],
      zone1: [{ t: 1.2, them: { 11: [32.5, 56] }, pass: 'them:11', air: true, pd: .3, tag: { 'them:11': 'FREE' }, head: 'Followed the 9',
        sub: 'You followed their 9 and left the space behind you empty. Their 11 runs into it.', cam: { at: [30, 55], zoom: 1.35, tilt: .55 }, wait: 1.1 }],
      zone2: [{ t: 1.2, them: { 11: [32.5, 56] }, pass: 'them:11', air: true, pd: .3, tag: { 'them:11': 'FREE' }, head: 'Stood still',
        sub: 'Their 11 runs in behind your 2. You needed to get across.', cam: { at: [30, 56], zoom: 1.35, tilt: .55 }, wait: 1.1 }]
    } },

  'Ball side': {
    intro: { start: { ball: 'them:7', us: { 4: [28, 58], 3: [11, 48] }, them: { 7: [9, 40], 9: [24, 51.5] } },
      cam: { at: [12, 44], zoom: 1.5, tilt: .55 },
      steps: [
        { t: 1.5, us: { 4: [29, 60], 3: [10, 52] }, them: { 7: [8, 46], 9: [24, 56] }, head: 'Their 7 has it on our left wing',
          sub: "Their 9 waits near our box, and you're on the far side of their 9.", cam: { at: [17, 53], zoom: 1.3, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1, pass: 'us:4', air: true, tag: { 'us:4': ['BALL SIDE', 'good'] }, head: 'Ball side',
        sub: 'Goal side of their 9 and on the side of the ball, so the cross has to go through you.', cam: { at: [21, 57], zoom: 1.4, tilt: .55 }, wait: 1.1 }],
      zone1: [{ t: 1, pass: 'them:9', air: true, tag: { 'them:9': 'FREE' }, head: 'Wrong side', sub: 'On the far side, the ball from the wing gets to their 9 before you.',
        cam: { at: [25, 57], zoom: 1.4, tilt: .55 }, wait: 1.1 }],
      zone2: [{ t: 1.1, pass: 'them:9', air: true, them: { 9: [23, 61] }, tag: { 'them:9': 'THROUGH' }, head: 'In front',
        sub: 'One ball over your head and their 9 is behind you.', cam: { at: [23, 57], zoom: 1.4, tilt: .55 }, wait: 1.1 }]
    } },

  "Don't dive in": {
    intro: { start: { ball: 'them:6', us: { 6: [32, 39], 4: [24, 62] }, them: { 9: [24, 43] } },
      cam: { at: [21, 42], zoom: 1.5, tilt: .55 },
      steps: [
        { t: 1.5, pass: 'them:9', pd: .1, us: { 6: [30, 42.5], 4: [24, 59.5] }, them: { 9: [24, 48] }, head: 'Their 9 dribbles at you', sub: 'Your 6 sprints back to help.',
          cam: { at: [25, 51], zoom: 1.4, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1, us: { 6: [27.5, 46.5] }, tag: { 'us:4': ['JOCKEY', 'good'], 'us:6': ['PRESS', 'good'] }, head: "Don't dive in",
          sub: 'On your feet, a few yards off. Your 6 arrives, and now it is two against one…', cam: { at: [25, 50], zoom: 1.5, tilt: .55 } },
        { t: .5, pass: 'us:6', head: "Don't dive in", sub: '…and you win it.', wait: 1.1 }],
      zone1: [{ t: 1.1, them: { 9: [21, 60] }, tag: { 'them:9': 'PAST YOU' }, head: 'Dived in', sub: 'One touch past you, and their 9 is through on goal.',
        cam: { at: [22, 57], zoom: 1.4, tilt: .55 }, wait: 1.1 }],
      zone2: [{ t: .8, them: { 9: [24, 51] }, head: 'Too far', sub: 'So far away that their 9 can shoot at will.', cam: { at: [24, 58], zoom: 1.3, tilt: .55 } },
        { t: .7, shot: [25, 70.5], wait: 1 }]
    } },

  /* ---- 4. Hold the line ---- */
  'Step up': {
    intro: { start: { ball: 'us:3', us: { 10: [25, 35] } },
      cam: { at: [16, 56], zoom: 1.5, tilt: .5 },
      steps: [
        { t: 1.5, pass: 'us:10', air: true, pd: .1, us: { 10: [24, 31] }, head: 'Your 3 clears it', sub: 'And your 10 wins it at midfield.', cam: { at: [24, 40], zoom: 1.2, tilt: .55 } },
        { t: 1, head: 'Your 3 and 2 step up', sub: 'What do you do?', cam: 'wide' }] },
    after: {
      zone0: [{ t: 1.1, us: { 3: [13.5, 54], 2: [36.5, 54] }, chain: [{ ns: ['us:3', 'us:4', 'us:2'], c: 'good' }], tag: { 'them:9': 'OFFSIDE', 'them:7': 'OFFSIDE', 'them:11': 'OFFSIDE' },
        head: 'Step up together', sub: 'The ball went forward, so the line steps up. The team stays compact, and their 9 is left offside.', cam: { at: [25, 53], zoom: 1.3, tilt: .55 }, wait: 1.2 }],
      zone1: [{ t: 1.1, us: { 3: [13.5, 54], 2: [36.5, 54] }, chain: [{ ns: ['us:3', 'us:4', 'us:2'], c: 'bad' }], tag: { 'them:9': 'ONSIDE', 'them:7': 'OFFSIDE', 'them:11': 'OFFSIDE' },
        head: 'Left behind', sub: 'Your 3 and 2 stepped up and you stayed. Now you are keeping their 9 onside.', cam: { at: [25, 56], zoom: 1.3, tilt: .55 }, wait: 1.2 }],
      zone2: say('Too high', 'Too far. If they win it back, one pass gets in behind you.', { at: [25, 45], zoom: 1.3, tilt: .55 })
    } },

  'Drop off': {
    intro: { start: { ball: 'them:2', them: { 6: [22, 29], 9: [24, 39] } },
      cam: { at: [17, 22], zoom: 1.45, tilt: .55 },
      steps: [
        { t: 1.5, pass: 'them:6', pd: .1, them: { 6: [22, 33], 9: [25, 42.5] }, head: 'Their 6 has the ball, facing forward',
          sub: 'Nobody is pressing, and their 9 is about to run.', cam: { at: [24, 40], zoom: 1.3, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.2, them: { 9: [26.5, 51] }, pass: 'us:4', air: true, pd: .25, tag: { 'us:4': ['DROPPED', 'good'] }, head: 'Drop off',
        sub: 'Their 6 had time and was facing forward, so you dropped. No space behind you for the ball over the top.', cam: { at: [25, 53], zoom: 1.35, tilt: .55 }, wait: 1.1 }],
      zone1: [{ t: 1.2, them: { 9: [32, 53] }, pass: 'them:9', air: true, pd: .25, tag: { 'them:9': 'THROUGH' }, head: 'Too high',
        sub: 'Their 6 had time to pick a pass over your head.', cam: { at: [28, 52], zoom: 1.35, tilt: .55 }, wait: 1.1 }],
      zone2: [{ t: 1.2, them: { 9: [31, 53] }, pass: 'them:9', air: true, pd: .25, tag: { 'them:9': 'THROUGH' }, head: 'Stepped up',
        sub: 'Their 6 had time, so one ball over the top and their 9 is through.', cam: { at: [28, 50], zoom: 1.3, tilt: .55 }, wait: 1.1 }]
    } },

  'Hold the line': {
    intro: { start: { ball: 'them:10', us: { 6: [26, 42], 4: [25, 55] }, them: { 6: [24.5, 30] } },
      cam: { at: [27, 34], zoom: 1.45, tilt: .55 },
      steps: [
        { t: 1.5, pass: 'them:6', pd: .1, us: { 6: [25, 37], 4: [25, 59] }, them: { 6: [24.5, 33.5] }, tag: { 'us:6': ['PRESS', 'good'] }, head: 'Your 6 presses their 6',
          sub: 'Their 6 faces their own goal. Your 3 and 2 hold the line, but you dropped deep.', cam: { at: [25, 45], zoom: 1.2, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1, chain: [{ ns: ['us:3', 'us:4', 'us:2'], c: 'good' }], tag: { 'them:9': 'OFFSIDE' }, head: 'Hold the line',
        sub: 'Their 6 is pressed and facing their own goal, so you step up level with your 3 and 2.', cam: { at: [25, 48], zoom: 1.3, tilt: .55 }, wait: 1.2 }],
      zone1: [{ t: .8, chain: [{ ns: ['us:3', 'us:4', 'us:2'], c: 'bad' }], tag: { 'them:9': 'ONSIDE' }, head: 'Too deep',
        sub: 'Staying deep keeps their 9 onside and leaves a gap in our line.', cam: { at: [25, 53], zoom: 1.3, tilt: .55 }, wait: 1.2 }],
      zone2: say('Too high', 'Stepping past their 9 leaves the space behind you open.', { at: [25, 44], zoom: 1.35, tilt: .55 }, { chain: [{ ns: ['us:3', 'us:4', 'us:2'], c: 'bad' }] })
    } },

  'Recovery run': {
    intro: { start: { ball: 'them:11', us: { 2: [43, 43.5], 4: [29, 52], 3: [13, 55] }, them: { 11: [41, 48] } },
      cam: { at: [40, 47], zoom: 1.5, tilt: .55 },
      steps: [
        { t: 1.5, us: { 2: [38, 49], 4: [25, 55], 3: [14, 57] }, them: { 11: [39, 57.5] }, tag: { 'them:11': 'FREE' }, head: 'Their 11 gets past your 2',
          sub: 'And dribbles toward our box. Your 3 tucks in to pick up their 9.', cam: { at: [34, 55], zoom: 1.35, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: .9, them: { 11: [36.5, 60] }, tag: { 'us:4': ['TACKLE', 'good'] }, head: 'Recovery run',
          sub: 'Their 11 got past your 2, so you sprinted back between the ball and the goal…', cam: { at: [34, 61], zoom: 1.45, tilt: .55 } },
        { t: .5, pass: 'us:4', tag: { 'us:4': ['WON IT', 'good'] }, head: 'Recovery run', sub: '…and your 3 picks up their 9.', wait: 1.1 }],
      zone1: [{ t: .8, them: { 11: [36, 62] }, head: 'Behind the ball', sub: 'You chased the ball from behind, and their 11 is already past you.', cam: { at: [33, 64], zoom: 1.4, tilt: .55 } },
        { t: .7, shot: [27.5, 75.8], wait: 1 }],
      zone2: [{ t: .8, them: { 11: [36, 62] }, head: 'Watching', sub: 'Their 11 runs at our goal, and nobody gets back.', cam: { at: [33, 64], zoom: 1.4, tilt: .55 } },
        { t: .7, shot: [27.5, 75.8], wait: 1 }]
    } },

  'Squeeze up': {
    intro: { start: { ball: 'them:9', them: { 6: [25, 43] } },
      cam: { at: [25, 54], zoom: 1.5, tilt: .55 },
      steps: [
        { t: 1.4, pass: 'them:6', air: true, pd: .1, them: { 6: [25, 39.5] }, head: 'Their 9 passes it back to their 6', sub: 'What do you do?',
          cam: { at: [25, 48], zoom: 1.3, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1, us: { 3: [12, 53.5], 2: [38, 53.5] }, chain: [{ ns: ['us:3', 'us:4', 'us:2'], c: 'good' }], tag: { 'them:9': 'OFFSIDE', 'them:7': 'OFFSIDE', 'them:11': 'OFFSIDE' },
        head: 'Squeeze up', sub: 'They passed it backward, so you step up. Their 9 is left offside, and the team is compact again.', cam: { at: [25, 53], zoom: 1.3, tilt: .55 }, wait: 1.2 }],
      zone1: say('Stayed deep', 'They passed backward and you stayed deep. Now their team has all the space it wants.', { at: [25, 52], zoom: 1.2, tilt: .55 },
        { hatch: [{ pts: [[8, 42], [42, 42], [42, 58], [8, 58]], c: 'bad' }] }),
      zone2: say('Too high', 'Too far. Now there is space behind you.', { at: [25, 46], zoom: 1.3, tilt: .55 })
    } },

  /* ---- 5. Cover and balance ---- */
  'Cover your 3': {
    intro: { start: { ball: 'them:6', us: { 3: [13, 51], 4: [25, 57] }, them: { 7: [8, 42], 9: [26, 48] } },
      cam: { at: [16, 42], zoom: 1.45, tilt: .55 },
      steps: [
        { t: 1.5, pass: 'them:7', pd: .1, us: { 3: [10, 53], 4: [27, 59] }, them: { 7: [9, 48.5], 9: [27, 52.5] }, tag: { 'us:3': ['PRESS', 'good'] },
          head: 'Their 7 gets it on our left wing', sub: 'Your 3 goes to press, and your 2 tucks in.', cam: { at: [17, 52], zoom: 1.35, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1, them: { 7: [13, 57] }, tag: { 'them:7': 'PAST 3', 'us:4': ['COVER', 'good'] }, head: 'Cover your 3',
          sub: 'Your 3 went to the ball, so you slid across behind. Their 7 beats your 3…', cam: { at: [15, 55], zoom: 1.45, tilt: .55 } },
        { t: .5, pass: 'us:4', tag: { 'us:4': ['WON IT', 'good'] }, head: 'Cover your 3', sub: '…and you are right there to win it.', wait: 1.1 }],
      zone1: [{ t: 1.1, them: { 7: [14, 61] }, tag: { 'them:7': 'PAST 3' }, head: 'Too far', sub: 'Their 7 beats your 3, and nobody is there to cover.',
          cam: { at: [18, 62], zoom: 1.4, tilt: .55 } },
        { t: .7, shot: [22.5, 75.8], wait: 1 }],
      zone2: [{ t: 1, pass: 'them:9', air: true, tag: { 'them:9': 'FREE' }, hatch: [{ pts: [[18, 50], [34, 50], [34, 64], [18, 64]], c: 'bad' }], head: 'Too close',
          sub: 'You both went to the ball. One pass inside…', cam: { at: [22, 55], zoom: 1.35, tilt: .55 } },
        { t: .9, them: { 9: [25, 60] }, head: 'Too close', sub: '…and the middle is open.', wait: 1 }]
    } },

  'Pass the 9 on': {
    intro: { start: { ball: 'them:6', us: { 4: [21, 59] }, them: { 9: [19, 53.5], 10: [25, 42.6] } },
      cam: { at: [20, 50], zoom: 1.4, tilt: .55 },
      steps: [
        { t: 1.5, us: { 4: [16, 58] }, them: { 9: [11, 51.5], 10: [24.5, 47.5] }, tag: { 'them:10': 'RUN' }, head: 'Their 9 drifts out to our left wing',
          sub: 'You followed, and your 3 is right there too. Their 10 is arriving in the middle.', cam: { at: [18, 53], zoom: 1.3, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1, pass: 'them:10', tag: { 'us:3': ['MARK', 'good'] }, head: 'Pass the 9 on', sub: 'Your 3 has their 9, and you are back in the middle…',
          cam: { at: [23, 53], zoom: 1.4, tilt: .55 } },
        { t: .6, us: { 4: [24.5, 52.6] }, tag: { 'us:4': ['STEPS IN', 'good'] }, head: 'Pass the 9 on', sub: '…right where their 10 wanted the ball.' },
        { t: .5, pass: 'us:4', tag: { 'us:4': ['WON IT', 'good'] }, wait: 1.1 }],
      zone1: [{ t: 1, pass: 'them:10', hatch: [{ pts: [[19, 50], [33, 50], [33, 64], [19, 64]], c: 'bad' }], head: 'Pulled wide',
          sub: 'Two of you on their 9, and the middle is empty for their 10…', cam: { at: [22, 55], zoom: 1.35, tilt: .55 } },
        { t: .8, them: { 10: [24, 58] }, tag: { 'them:10': 'FREE' }, head: 'Pulled wide', sub: '…who runs at our goal.' },
        { t: .7, shot: [27, 75.8], wait: 1 }]
    } },

  'Two against one': {
    intro: { start: { ball: 'them:9', us: { 3: [13, 38], 2: [38, 37], 6: [29, 32], 4: [19, 54] }, them: { 9: [22, 40], 10: [33, 40] } },
      cam: { at: [26, 42], zoom: 1.35, tilt: .55 },
      steps: [
        { t: 1.5, us: { 3: [14, 44], 2: [39, 44], 6: [26, 37], 4: [16, 57] }, them: { 9: [22, 46.5], 10: [33, 46] }, tag: { 'them:9': 'RUN', 'them:10': 'RUN' },
          head: 'Counterattack!', sub: 'Their 9 and 10 come at you, two against one. Your teammates sprint back.', cam: { at: [23, 51], zoom: 1.25, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.2, us: { 4: [26, 56], 3: [16, 51], 2: [37, 51] }, them: { 9: [22.5, 50] }, tag: { 'us:4': ['BETWEEN', 'good'] }, head: 'Two against one',
          sub: 'You got between them and backed off, so their 9 has to slow down…', cam: { at: [26, 52], zoom: 1.3, tilt: .55 } },
        { t: .8, tag: { 'us:3': ['BACK', 'good'], 'us:2': ['BACK', 'good'] }, head: 'Two against one', sub: '…and your teammates are back. Now it is three against two.', wait: 1.1 }],
      zone1: [{ t: .8, pass: 'them:10', head: 'Dived in', sub: 'You dove in, so their 9 just passes to their 10…', cam: { at: [30, 53], zoom: 1.35, tilt: .55 } },
        { t: 1, them: { 10: [32, 59] }, tag: { 'them:10': 'THROUGH' }, head: 'Dived in', sub: '…who is through on goal.' },
        { t: .7, shot: [27, 75.8], wait: 1 }],
      zone2: [{ t: 1.1, them: { 9: [23, 59] }, tag: { 'them:9': 'FREE' }, head: 'Left the ball', sub: 'You went to their 10, and their 9 runs straight at our goal.',
          cam: { at: [24, 60], zoom: 1.35, tilt: .55 } },
        { t: .7, shot: [27, 75.8], wait: 1 }],
      zone3: [{ t: 1.1, them: { 9: [24, 59] }, tag: { 'them:9': 'FREE' }, head: 'Too far', sub: 'Nobody stops their 9, who runs straight at our goal.',
          cam: { at: [24, 60], zoom: 1.35, tilt: .55 } },
        { t: .7, shot: [27, 75.8], wait: 1 }]
    } },

  'Slide across': {
    intro: { start: { ball: 'them:7', us: { 2: [37, 55], 4: [17, 59], 3: [12, 57] }, them: { 11: [42, 44], 9: [24, 51] } },
      cam: { at: [13, 50], zoom: 1.4, tilt: .55 },
      steps: [
        { t: 1.6, pass: 'them:11', air: true, pd: .1, us: { 2: [40, 53], 4: [21, 59], 3: [16, 58] }, them: { 11: [41, 48.5], 9: [27, 51.5] },
          head: 'They switch it to their 11', sub: 'On our right wing. Your 2 goes to press.', cam: { at: [32, 52], zoom: 1.2, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1, them: { 11: [38, 56] }, tag: { 'them:11': 'PAST 2', 'us:4': ['COVER', 'good'] }, head: 'Slide across',
          sub: 'The ball went wide, so you slid across behind your 2. Their 11 beats your 2…', cam: { at: [33, 57], zoom: 1.4, tilt: .55 } },
        { t: .7, us: { 4: [34, 57], 3: [23, 61] }, pass: 'us:4', pd: .5, tag: { 'us:4': ['TACKLE', 'good'] }, head: 'Slide across',
          sub: '…and you are right there. Your 3 tucks in behind you.', wait: 1.1 }],
      zone1: [{ t: 1.1, them: { 11: [36, 59] }, tag: { 'them:11': 'PAST 2' }, hatch: [{ pts: [[27, 52], [44, 52], [44, 66], [27, 66]], c: 'bad' }], head: 'Too far',
          sub: 'Your 2 was out there alone. Their 11 beats your 2, and there is a huge gap.', cam: { at: [32, 61], zoom: 1.35, tilt: .55 } },
        { t: .7, shot: [27.5, 75.8], wait: 1 }],
      zone2: [{ t: .9, pass: 'them:9', tag: { 'them:9': 'FREE' }, head: 'Too close', sub: 'You both went to the ball, so their 11 passes inside…',
          cam: { at: [30, 55], zoom: 1.35, tilt: .55 } },
        { t: .9, them: { 9: [26, 58] }, head: 'Too close', sub: '…to their 9, free in the middle.' },
        { t: .7, shot: [23.5, 75.8], wait: 1 }]
    } },

  'Win the long ball': {
    intro: { start: { ball: 'them:4', them: { 9: [24, 49] }, us: { 4: [29, 52] } },
      cam: { at: [25, 12], zoom: 1.4, tilt: .55 },
      steps: [
        { t: 1.5, pass: 'them:1', pd: .05, them: { 9: [24, 44] }, us: { 4: [30, 56] }, head: 'Their keeper gets it back',
          sub: 'And is about to kick it long toward their 9.', cam: { at: [25, 30], zoom: 1.05, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.4, pass: 'us:4', air: true, tag: { 'us:4': ['HEADER', 'good'] }, head: 'Win the long ball', sub: 'Goal side of their 9, right under the ball…',
          cam: { at: [25, 42], zoom: 1.2, tilt: .55 } },
        { t: .9, pass: 'us:6', air: true, head: 'Win the long ball', sub: '…so you head it away to your 6.', wait: 1.1 }],
      zone1: [{ t: 1.4, pass: 'them:9', air: true, them: { 9: [24.5, 52] }, tag: { 'them:9': 'THROUGH' }, head: 'In front', sub: 'The ball flies over your head…',
          cam: { at: [25, 46], zoom: 1.2, tilt: .55 } },
        { t: .9, them: { 9: [25, 61] }, head: 'In front', sub: '…and their 9 is through on goal.' },
        { t: .7, shot: [27.5, 75.8], wait: 1 }],
      zone2: [{ t: 1.4, pass: 'them:9', air: true, tag: { 'them:9': 'FREE' }, head: 'Too deep', sub: 'Their 9 wins the header with nobody near…',
          cam: { at: [25, 42], zoom: 1.25, tilt: .55 } },
        { t: .9, pass: 'them:10', them: { 10: [30, 49] }, head: 'Too deep', sub: '…and flicks it on for their 10.', wait: 1 }]
    } },

  /* ---- 6. Defend the box ---- */
  'Near post': {
    intro: { start: { ball: 'them:7', us: { 4: [26, 58], 3: [10, 59] }, them: { 7: [7, 58], 9: [21, 58], 10: [27, 52] } },
      cam: { at: [14, 56], zoom: 1.4, tilt: .5 },
      steps: [
        { t: 1.6, us: { 4: [27, 62], 3: [10, 64.5] }, them: { 7: [6.5, 67.5], 9: [19, 64.5], 10: [27.5, 57] }, tag: { 'them:9': 'RUN' },
          head: 'Their 7 races down our left wing', sub: 'Their 9 is running to the near post.', cam: { at: [16, 64], zoom: 1.35, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1, pass: 'us:4', air: true, them: { 9: [17, 66.5] }, tag: { 'us:4': ['NEAR POST', 'good'] }, head: 'Near post',
          sub: 'You beat their 9 to the near post, between their 9 and the goal…', cam: { at: [17, 67], zoom: 1.5, tilt: .5 } },
        { t: 1, pass: 'us:11', air: true, head: 'Near post', sub: '…and head the cross away.', cam: { at: [14, 58], zoom: 1.1, tilt: .55 }, wait: 1.1 }],
      zone1: [{ t: 1.1, pass: 'them:9', air: true, pd: .2, them: { 9: [20.4, 68.6] }, tag: { 'them:9': 'FREE' }, head: 'Ball watching',
          sub: 'You watched the ball and lost their 9, who gets to the near post first.', cam: { at: [19, 67], zoom: 1.45, tilt: .5 } },
        { t: .6, shot: [22.3, 75.8], wait: 1 }],
      zone2: [{ t: 1.1, pass: 'them:9', air: true, pd: .2, them: { 9: [20.4, 68.6] }, tag: { 'them:9': 'FREE' }, head: 'Wrong side',
          sub: 'Their 9 is between you and the goal.', cam: { at: [19, 67], zoom: 1.45, tilt: .5 } },
        { t: .6, shot: [22.3, 75.8], wait: 1 }]
    } },

  'Block the shot': {
    intro: { start: { ball: 'them:10', them: { 10: [25.5, 46], 9: [20, 54] } },
      cam: { at: [26, 49], zoom: 1.5, tilt: .5 },
      steps: [
        { t: 1.5, them: { 10: [30, 56.5], 9: [18, 57.5] }, tag: { 'them:10': 'PAST 6' }, head: 'Their 10 gets past your 6',
          sub: 'And is about to shoot from the edge of our box.', cam: { at: [27, 58], zoom: 1.4, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: .5, pass: 'us:4', tag: { 'us:4': ['BLOCKED', 'good'] }, head: 'Block the shot',
        sub: 'You got in the line between the ball and the goal, close enough to block the shot.', cam: { at: [29, 60], zoom: 1.5, tilt: .5 }, wait: 1.2 }],
      zone1: [{ t: .7, shot: [25.5, 70.5], head: 'Too far off', sub: 'In the line, but too far away to block it. Your keeper has to make the save.',
        cam: { at: [27, 64], zoom: 1.4, tilt: .5 }, wait: 1.2 }],
      zone2: [{ t: .7, shot: [27.5, 75.8], head: 'Too far', sub: "From there you can't block anything, and their 10 shoots.", cam: { at: [27, 66], zoom: 1.35, tilt: .5 }, wait: 1.1 }]
    } },

  'Clear it': {
    intro: { start: { ball: 'them:7', them: { 9: [21, 58], 10: [31, 57] } },
      cam: { at: [16, 62], zoom: 1.45, tilt: .5 },
      steps: [
        { t: 1.4, pass: 'us:4', air: true, pd: .1, them: { 9: [22.5, 62], 10: [29.5, 61.5] }, tag: { 'them:9': 'PRESS', 'them:10': 'PRESS' },
          head: 'A cross drops to you in our box', sub: 'Their players are all around.', cam: { at: [24, 64], zoom: 1.45, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      lead0: [{ t: 1.1, us: { 11: [8, 40] }, tag: { 'us:11': ['FREE', 'good'] }, head: 'Clear it',
        sub: 'Their players crowded our box, so you cleared it high and wide. Away from danger, and your 11 can chase it.', cam: { at: [14, 48], zoom: 1.15, tilt: .55 }, wait: 1.1 }],
      1: [{ t: .5, them: { 9: [19.5, 65.5] }, tag: { 'them:9': 'PRESS' }, head: 'Risky', sub: 'Their 9 chases it…', cam: { at: [23, 68], zoom: 1.5, tilt: .45 } },
        { t: .6, them: { 9: [22, 69.5] }, head: 'Risky', sub: '…and your keeper has no time.', wait: 1.1 }],
      2: steal('2', '11', [38.5, 61.5], 'Across our box', 'A pass across the front of our goal, and their 11 jumps on your 2.'),
      3: steal('3', '7', [12, 63], 'Pressed', 'Their 7 is right on your 3, inside our box.'),
      6: steal('6', '10', [29, 59.5], 'Risky', 'A short pass through the middle of our box, and their 10 jumps on it.')
    } },

  'Not too deep': {
    intro: { start: { ball: 'them:6', us: { 4: [27, 64] }, them: { 9: [21, 58], 10: [30, 52], 11: [40, 52] } },
      cam: { at: [18, 52], zoom: 1.4, tilt: .5 },
      steps: [
        { t: 1.5, pass: 'them:7', pd: .1, us: { 4: [28.5, 70] }, them: { 9: [24.5, 61], 10: [30, 57], 11: [40, 58] }, head: 'Their 7 gets ready to cross',
          sub: 'And you ran all the way back to our goal line.', cam: { at: [22, 62], zoom: 1.3, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.1, pass: 'us:4', air: true, tag: { 'us:4': ['HEADER', 'good'] }, head: 'Not too deep',
        sub: 'You held your ground near the penalty spot, goal side of their 9, and win the cross.', cam: { at: [21, 63], zoom: 1.4, tilt: .5 }, wait: 1.2 }],
      zone1: [{ t: 1.1, pass: 'them:9', air: true, tag: { 'them:9': 'FREE' }, head: 'Too deep',
          sub: "On the goal line you're in your keeper's way, and their 9 has space at the penalty spot.", cam: { at: [22, 65], zoom: 1.4, tilt: .5 } },
        { t: .6, shot: [27, 75.8], wait: 1 }]
    } },

  'Start the counter': {
    intro: { start: { ball: 'them:10', us: { 4: [26, 60] }, them: { 7: [13, 48], 11: [38, 48], 6: [19, 43], 2: [18, 26], 3: [38, 26] } },
      cam: { at: [26, 55], zoom: 1.45, tilt: .5 },
      steps: [
        { t: 1.3, pass: 'us:4', pd: .35, us: { 4: [24, 58] }, them: { 7: [13, 54], 11: [38, 54], 6: [20, 45], 2: [18, 32], 3: [38, 32] }, tag: { 'us:4': ['WON IT', 'good'] },
          head: 'You win the ball', sub: 'Their team was pushing forward…', cam: { at: [24, 52], zoom: 1.3, tilt: .5 } },
        { t: 1.1, tag: { 'us:11': ['FREE', 'good'] }, head: 'You win the ball', sub: '…and your 11 is free on the wing.', cam: { at: [14, 42], zoom: 1.15, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      lead0: [{ t: 1.1, us: { 11: [7, 18] }, tag: { 'us:11': ['AWAY', 'good'] }, hatch: [{ pts: [[0, 8], [16, 8], [16, 30], [0, 30]], c: 'good' }], head: 'Start the counter',
        sub: 'Their team was caught forward, so one pass into the open grass sends your 11 away at full speed.', cam: { at: [12, 24], zoom: 1.2, tilt: .55 }, wait: 1.2 }],
      6: [{ t: 1.1, them: { 6: [23, 47.5], 7: [12, 44], 11: [39, 44] }, tag: { 'them:6': 'PRESS', 'them:7': 'BACK', 'them:11': 'BACK' }, head: 'Slow',
        sub: 'Your 6 is marked, and their team has time to get back.', cam: { at: [25, 46], zoom: 1.2, tilt: .55 }, wait: 1.1 }],
      2: [{ t: 1.2, them: { 7: [12, 44], 11: [39, 44], 10: [31, 44] }, tag: { 'them:7': 'BACK', 'them:11': 'BACK', 'them:10': 'BACK' }, head: 'Too safe',
        sub: 'Sideways, and their team has time to get back.', cam: { at: [28, 50], zoom: 1.1, tilt: .55 }, wait: 1.1 }],
      3: [{ t: 1.2, them: { 7: [12, 44], 11: [39, 44], 10: [31, 44] }, tag: { 'them:7': 'BACK', 'them:11': 'BACK', 'them:10': 'BACK' }, head: 'Too safe',
        sub: 'Sideways, and their team has time to get back.', cam: { at: [22, 50], zoom: 1.1, tilt: .55 }, wait: 1.1 }],
      1: [{ t: 1.2, them: { 7: [12, 44], 11: [39, 44], 10: [31, 44] }, tag: { 'them:7': 'BACK', 'them:11': 'BACK', 'them:10': 'BACK' }, head: 'Too safe',
        sub: 'Back to the keeper, and their team has time to get back.', cam: { at: [25, 55], zoom: 1, tilt: .55 }, wait: 1.1 }]
    } },
};
window.RIDDLE_LIB.withMotion(RIDDLES, MOTION);
window.RIDDLE_LIB.defineSet({ me: '4', chapters: CHAPTERS, riddles: RIDDLES });
})();
