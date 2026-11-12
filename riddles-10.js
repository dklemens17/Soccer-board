/* Riddles for the 10 (attacking midfielder). Format: see riddles-6.js, riddles-core.js and riddles-9.js. */
(function () {
const { P, FAR } = window.RIDDLE_LIB;

const CHAPTERS = [
  { name: 'Find the pocket', blurb: 'Get open between their lines, where you can turn.' },
  { name: 'Receive and decide', blurb: 'You have the ball in midfield. Turn, set, switch or drive.' },
  { name: 'The final pass', blurb: 'To feet or into space? Read the run.' },
  { name: 'Shoot or pass', blurb: 'Near the box: take the shot, or find the better chance.' },
  { name: 'Defend from the front', blurb: 'They have the ball. Mark their 6 and block their passes.' },
  { name: 'Arrive in the box', blurb: 'Get into the right spot when the ball goes forward.' }
];

const RIDDLES = [
/* ---------------- 1. Find the pocket ---------------- */
{ ch: 0, type: 'move', title: 'Between the lines',
  prompt: 'Your 2 has the ball. You are standing next to their 6. Drag the 10 to where you can get the ball and turn.',
  hint: 'Look for the space behind their midfielders and in front of their defenders.',
  lesson: 'Find the pocket: behind their midfielders, in front of their defenders, on the side of the ball.',
  us:   { 1:[25,70], 3:[12,56], 4:[25,58], 2:[38,56], 6:[24,45], 10:[25,35], 11:[6,30], 9:[26,17], 7:[44,30] },
  them: { 1:[25,3], 2:[13,16], 4:[25,13.5], 3:[37,16], 6:[25,30], 10:[20,40], 9:[27,51], 7:[10,40], 11:[40,44] },
  ball: { team: 'us', n: '2' },
  zones: [
    [33, 24, 4, 3, 'Pro spot', 'You found the pocket: behind their midfielders, in front of their defenders, on the side of the ball. Your 2 can find you and you can turn.'],
    [25, 35, 3, 1, 'Marked', 'Standing next to their 6, you are easy to mark.'],
    [17, 24, 4, 1, 'Wrong side', 'Good pocket, but on the far side from the ball. The pass would have to go through their whole team.'],
    [27, 10, 3, 0, 'Offside', "You're past their last defender. Offside!"],
    [38, 46, 4, 1, 'Too deep', "You came back next to your 2. Now you can't help the attack."]
  ],
  elsewhere: P(1, 'Not quite', 'Find the space behind their midfielders and in front of their defenders, near the ball.'),
  best: { kind: 'move', at: [33,24] } },

{ ch: 0, type: 'move', title: 'Out of the shadow',
  prompt: 'Your 6 has the ball and wants to pass to you, but their 6 is standing right between you. Drag the 10.',
  hint: 'Draw a line from the ball to you. Who is on it?',
  lesson: "If a defender is between you and the ball, you're hiding. Move until the passer can see you.",
  us:   { 1:[25,70], 3:[12,56], 4:[25,58], 2:[38,56], 6:[25,46], 10:[25,30], 11:[6,28], 9:[26,16], 7:[44,28] },
  them: { 1:[25,3], 2:[13,15], 4:[25,12.5], 3:[37,15], 6:[25,37], 10:[17,47], 9:[30,54], 7:[9,38], 11:[41,38] },
  ball: { team: 'us', n: '6' },
  zones: [
    [32, 31, 4, 3, 'Pro spot', "You stepped out of their 6's shadow. Now your 6 can pass to you, and you're between their lines."],
    [18, 31, 4, 3, 'Pro spot', "You stepped out of their 6's shadow. Now your 6 can pass to you, and you're between their lines."],
    [25, 30, 3, 0, 'Hidden', "Their 6 is right between you and the ball."],
    [25, 41.5, 2.4, 1, 'Too close', 'You came right up to your 6 and brought their 6 with you.']
  ],
  elsewhere: P(1, 'Not quite', "Step sideways out of their 6's shadow, still between their lines."),
  best: { kind: 'move', at: [32,31] } },

{ ch: 0, type: 'move', title: 'Help your winger',
  prompt: 'Your 7 has the ball on the right. Their 11 is in front of the 7. Drag the 10 to help.',
  hint: 'Inside, wide, or behind?',
  lesson: 'Help your winger: get inside, a little ahead, in the gap between defenders.',
  us:   { 1:[25,70], 3:[12,56], 4:[25,58], 2:[38,56], 6:[24,45], 10:[25,34], 11:[6,28], 9:[25,17], 7:[44,36] },
  them: { 1:[25,3], 2:[13,15], 4:[25,13.5], 3:[38,18], 6:[26,29], 10:[20,42], 9:[28,52], 7:[10,38], 11:[43,30] },
  ball: { team: 'us', n: '7' },
  zones: [
    [35, 31, 3.5, 3, 'Pro spot', 'Inside and a little ahead of your 7, in the gap between their 11 and 6. The 7 can pass to you, and you can turn toward goal.'],
    [41, 31.5, 2.5, 1, 'Crowding the 7', "You're right next to your 7, so one defender can mark you both."],
    [36, 44, 4, 1, 'Too deep', 'Behind the 7 is safe but slow. Help the 7 go forward.'],
    [25, 34, 3, 1, 'Too far', "Your 7 can't reach you from there."]
  ],
  elsewhere: P(1, 'Not quite', 'Get inside your 7, a little ahead, in the gap.'),
  best: { kind: 'move', at: [35,31] } },

{ ch: 0, type: 'move', title: 'Opposite movement', air: true,
  prompt: 'Your 6 has the ball. Your 9 is coming short, and their 4 is following. Drag the 10.',
  hint: 'Their 4 left that spot. Who should fill it?',
  lesson: 'When your 9 comes short, you go long. Opposite movements make space.',
  us:   { 1:[25,70], 3:[12,56], 4:[25,58], 2:[38,56], 6:[25,44], 10:[31,30], 11:[7,28], 9:[25,25], 7:[44,28] },
  them: { 1:[25,3], 2:[14,16], 4:[25,20.5], 3:[36,16], 6:[21,33], 10:[18,44], 9:[30,52], 7:[9,38], 11:[41,38] },
  ball: { team: 'us', n: '6' },
  arrows: [{ team: 'us', from: [25.2,19.5], to: [25,23.6], dash: 1 }, { team: 'them', from: [25,16.5], to: [25,19.2] }],
  zones: [
    [29, 17.5, 3, 3, 'Pro spot', 'Your 9 came short and took their 4 along, so you ran into the space their 4 left. Opposite movements!'],
    [27.5, 28.5, 2.6, 1, 'Crowded', 'Coming short too puts you right next to your 9. One defender can mark you both.'],
    [29, 9, 3.5, 0, 'Offside', "You're past their last defender. Offside!"]
  ],
  elsewhere: P(1, 'Not quite', 'Run into the space their 4 just left.'),
  best: { kind: 'move', at: [29,17.5] } },

{ ch: 0, type: 'move', title: 'Far-side pocket',
  prompt: 'Your 6 has the ball. Their midfielders have shifted to your left, and their 6 is marking you. Drag the 10.',
  hint: 'They moved left. What did they leave empty?',
  lesson: 'When their midfield shifts to one side, the pocket on the other side opens up.',
  us:   { 1:[25,70], 3:[12,56], 4:[25,58], 2:[38,56], 6:[25,46], 10:[20,30], 11:[6,27], 9:[26,16], 7:[44,28] },
  them: { 1:[25,3], 2:[13,15], 4:[25,12.5], 3:[37,16], 6:[19,34.5], 10:[14,40], 9:[30,53], 7:[9,31.5], 11:[36,41] },
  ball: { team: 'us', n: '6' },
  zones: [
    [32, 25, 4, 3, 'Pro spot', 'Their midfielders shifted to the left, so the pocket on the right is empty. Your 6 can find you there.'],
    [20, 30, 3, 1, 'Marked', 'Their 6 is right on you.'],
    [15, 36, 4, 1, 'Into the crowd', "That's where all their midfielders are."]
  ],
  elsewhere: P(1, 'Not quite', 'Find the pocket on the side they left empty.'),
  best: { kind: 'move', at: [32,25] } },

/* ---------------- 2. Receive and decide ---------------- */
{ ch: 1, type: 'ball', title: 'Turn and release',
  prompt: "You turned in the pocket. Their 6 is chasing you, and your 9 is starting a run between their defenders. Make the pass.",
  hint: 'Where will your 9 be in two seconds?',
  lesson: 'Turned in the pocket? Look for the run in behind first.',
  us:   { 1:[25,70], 3:[12,56], 4:[25,58], 2:[38,56], 6:[24,44], 10:[30,27], 11:[7,24], 9:[25,19], 7:[44,24] },
  them: { 1:[25,3], 2:[14,16], 4:[24,15.5], 3:[37,16], 6:[26,35], 10:[19,42], 9:[29,52], 7:[9,34], 11:[42,31] },
  ball: '10',
  arrows: [{ team: 'us', from: [25.6,17.5], to: [29.6,11.5], dash: 1 }, { team: 'them', from: [26,35], to: [27.4,31.7] }],
  pass: {
    9: P(1, 'Behind the run', "The 9 is starting the run. A pass to where the 9 is now arrives behind the run."),
    7: P(2, 'Good', 'Open, but your 9 was making the killer run.'),
    6: P(1, 'Too safe', 'You turned with space. Go forward!')
  },
  lead: [
    [30.5, 11, 3.5, 3, 'Pro choice', 'You slid it into the gap in front of your 9. The 9 runs onto it between their 4 and 3.', '9', null, true],
    [27, 3.5, 2.5, 1, 'Overhit', 'Too long. Their keeper gets it.', '9', '1']
  ],
  shoot: FAR,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Their 6 is chasing you. Release your 9.'),
  best: { kind: 'pass', to: '9', at: [30.5,11] } },

{ ch: 1, type: 'ball', title: 'Set it back', facing: 'back',
  prompt: 'You got the ball with your back to goal, and their 6 is tight behind you. What now?',
  hint: 'Who is facing forward?',
  lesson: 'Marked tight from behind? Set it back to a teammate facing forward. Then move again.',
  us:   { 1:[25,70], 3:[12,54], 4:[25,56], 2:[38,54], 6:[24,42], 10:[25,30], 11:[7,26], 9:[25,16], 7:[43,26] },
  them: { 1:[25,3], 2:[13,15], 4:[25,12], 3:[37,15], 6:[25,25.5], 10:[17,40], 9:[31,50], 7:[9,34], 11:[41,34] },
  ball: '10',
  arrows: [{ team: 'them', from: [25,23.3], to: [25,25.6] }],
  pass: {
    6:  P(3, 'Pro choice', "Their 6 is tight on your back, so you set it back to your 6. The 6 is facing forward with time."),
    9:  P(0, "Can't see it", "You're facing your own goal. To make that pass you'd have to turn into their 6."),
    11: P(0, "Can't see it", "You're facing your own goal. To make that pass you'd have to turn into their 6."),
    7:  P(0, "Can't see it", "You're facing your own goal. To make that pass you'd have to turn into their 6.")
  },
  shoot: P(0, 'Facing the wrong way', "You're facing your own goal with a defender on you."),
  carry: [],
  elsewhere: P(0, 'Turned into trouble', 'With their 6 tight on your back, turning loses the ball.'),
  best: { kind: 'pass', to: '6' } },

{ ch: 1, type: 'ball', title: 'Switch it',
  prompt: 'You have the ball in the middle. Their players are crowding the right side. Make the pass.',
  hint: 'Where is nobody? Is there grass in front of your winger?',
  lesson: 'Facing forward with the play crowded on one side? Switch it, into the space in front of your winger.',
  us:   { 1:[25,70], 3:[12,55], 4:[25,57], 2:[38,55], 6:[27,44], 10:[25,30], 11:[6,26], 9:[28,17], 7:[44,28] },
  them: { 1:[25,3], 2:[18,16], 4:[28,13.5], 3:[38,18], 6:[31,25], 10:[32,38], 9:[30,50], 7:[18,34], 11:[41,24] },
  ball: '10',
  arrows: [{ team: 'them', from: [31,25], to: [28.6,27] }],
  pass: {
    11: P(2, 'Good', "Good switch, but there's open grass in front of the 11. Play it into that space."),
    7:  P(0, 'Crowded', 'Their 11 is right on your 7 and their 3 is close. The right side is jammed.')
  },
  lead: [
    [6.5, 18, 4.5, 3, 'Pro choice', 'You switched it into the open grass in front of your 11. The 11 runs onto it with nobody near.', '11'],
    [8, 8, 3.5, 1, 'Overhit', 'Too far. Their 2 gets there first.', '11', '2']
  ],
  shoot: FAR,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Their 6 is closing you down. Switch it.'),
  best: { kind: 'pass', to: '11', at: [6.5,18] } },

{ ch: 1, type: 'ball', title: 'Drive at them',
  prompt: 'You won the race to the ball. Their midfielders are behind you, and every teammate in front of you is marked. What now?',
  hint: 'Is anybody free? Is there space in front of you?',
  lesson: 'Space in front of you and nobody free? Drive into it and make their defenders choose.',
  us:   { 1:[25,70], 3:[12,56], 4:[25,58], 2:[38,56], 6:[25,45], 10:[25,32], 11:[8,22], 9:[25,17], 7:[42,22] },
  them: { 1:[25,3], 2:[11,17.5], 4:[25,13], 3:[39,17.5], 6:[28,40], 10:[19,45], 9:[30,53], 7:[9,34], 11:[41,36] },
  ball: '10',
  pass: {},
  otherNote: 'Every teammate in front of you is marked, and there is open grass ahead.',
  shoot: FAR,
  carry: [[25, 23, 4.5, 3, 'Pro choice', 'Open grass and every teammate marked. You drove into the space, and now a defender has to stop marking someone to stop you.'],
          [25, 15.5, 2, 0, 'Into their 4', 'You dribbled right into their 4.']],
  elsewhere: P(1, 'Not quite', 'The open space is straight ahead.'),
  best: { kind: 'carry', at: [25,23] } },

{ ch: 1, type: 'ball', title: 'One-two',
  prompt: 'Their 6 is running at you. Your 9 has dropped in right beside their 6. Make the pass.',
  hint: 'Pass, then run past the defender for the return.',
  lesson: 'Defender closing you down and a teammate close by? Play a one-two: pass, then run past the defender.',
  us:   { 1:[25,70], 3:[12,56], 4:[25,58], 2:[38,56], 6:[24,44], 10:[25,30], 11:[7,24], 9:[31,23.5], 7:[44,24] },
  them: { 1:[25,3], 2:[11,19], 4:[26,14], 3:[40,19], 6:[25,25.5], 10:[18,42], 9:[30,52], 7:[9,34], 11:[42,32] },
  ball: '10',
  arrows: [{ team: 'them', from: [25,23.4], to: [25,25.8] }],
  pass: {
    9: P(3, 'Pro choice', 'Their 6 came at you and your 9 was right there. You passed to feet. Now run past their 6 for the return.'),
    6: P(2, 'Good', 'Safe, but the one-two with your 9 gets you past their 6.')
  },
  shoot: FAR,
  carry: [[25, 27, 2, 0, 'Into their 6', "Their 6 is right there."]],
  elsewhere: P(1, 'Not quite', 'Use your 9 to get past their 6.'),
  best: { kind: 'pass', to: '9' } },

/* ---------------- 3. The final pass ---------------- */
{ ch: 2, type: 'ball', title: 'Coming to you',
  prompt: 'Your 9 is coming short toward you, and their 4 is right on the 9’s back. Make the pass.',
  hint: 'Where is the free grass: in front of your 9, or behind?',
  lesson: 'Teammate coming toward you with a defender right behind? Play it firmly to feet, never into the space behind.',
  us:   { 1:[25,70], 3:[12,56], 4:[25,58], 2:[38,56], 6:[24,45], 10:[25,33], 11:[7,26], 9:[26,23], 7:[43,26] },
  them: { 1:[25,3], 2:[12,19.5], 4:[26,18.5], 3:[39,19.5], 6:[31,31], 10:[18,44], 9:[30,53], 7:[9,34], 11:[41,34] },
  ball: '10',
  arrows: [{ team: 'us', from: [26.3,19.8], to: [26.1,22] }],
  pass: {
    9: P(3, 'Pro choice', "The 9 is coming toward you with a defender right behind, so you played it firmly to feet."),
    6: P(1, 'Too safe', 'Your 9 came short to help. Use that pass.')
  },
  lead: [
    [27, 14.5, 3.4, 0, 'Wrong side', "That's the space behind your 9, and their 4 is standing in it.", '9', '4']
  ],
  leadNote: 'Your 9 is coming toward you. Play it to feet.',
  shoot: FAR,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Your 9 came short to help. Use that pass.'),
  best: { kind: 'pass', to: '9' } },

{ ch: 2, type: 'ball', title: 'Running away from you',
  prompt: "Their defenders are high. Your 9 is sprinting in behind them. Make the pass.",
  hint: 'Where will the runner be when the ball gets there?',
  lesson: 'Teammate running in behind? Pass into the space ahead, not to where the runner is now.',
  us:   { 1:[25,70], 3:[12,56], 4:[25,58], 2:[38,56], 6:[24,45], 10:[26,33], 11:[8,28], 9:[23,25.5], 7:[42,28] },
  them: { 1:[25,4], 2:[12,24], 4:[28,23.5], 3:[38,24.5], 6:[30,37], 10:[18,44], 9:[30,53], 7:[9,36], 11:[41,36] },
  ball: '10',
  arrows: [{ team: 'us', from: [22.6,23.5], to: [20.6,16.5], dash: 1 }],
  pass: {
    9: P(1, 'Behind the run', "The 9 is already sprinting. A pass to where the 9 is now arrives behind the run.")
  },
  lead: [
    [20, 15, 4, 3, 'Pro choice', "You put it into the space in front of your 9. The 9 is through on goal.", '9', null, true],
    [19, 6, 3, 1, 'Overhit', 'Too long. Their keeper comes out and collects it.', '9', '1']
  ],
  shoot: FAR,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Your 9 is running. Use that run now.'),
  best: { kind: 'pass', to: '9', at: [20,15] } },

{ ch: 2, type: 'ball', title: 'Away from the defender',
  prompt: "Your 7 is near their box on the right. Their 3 is on the 7's inside. Make the pass.",
  hint: 'Which side of your 7 is the defender on?',
  lesson: "Defender on one side? Pass to your teammate's other side, away from the defender.",
  us:   { 1:[25,70], 3:[12,50], 4:[25,52], 2:[38,50], 6:[24,38], 10:[25,26], 11:[9,17], 9:[24,14], 7:[40,17] },
  them: { 1:[25,3], 2:[12,12.5], 4:[24,10], 3:[36.5,13.5], 6:[27,32], 10:[18,40], 9:[30,46], 7:[9,26], 11:[42,26] },
  ball: '10',
  pass: {
    7: P(2, 'Good', 'Okay, but their 3 can step in front of it. Play it to the outside, away from the defender.')
  },
  lead: [
    [43.5, 13, 2.8, 3, 'Pro choice', "Their 3 is on the inside, so you played it to the outside, away from the defender. Now the 7 can cross or shoot.", '7'],
    [36, 10, 2.6, 0, 'Into their 3', "That's on the defender's side. Their 3 steps in and takes it.", '7', '3']
  ],
  shoot: FAR,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Find your 7, on the side away from the defender.'),
  best: { kind: 'pass', to: '7', at: [43.5,13] } },

{ ch: 2, type: 'ball', title: 'The cutback',
  prompt: "You dribbled into the box on the right. Their defenders ran back toward goal. What do you do?",
  hint: 'Where did their defenders go? Where is the space?',
  lesson: 'At the end line with defenders running back to goal? Cut it back to the edge of the box.',
  us:   { 1:[25,70], 3:[13,46], 4:[25,48], 2:[37,46], 6:[24,17], 10:[38,8], 11:[15,9], 9:[27,8], 7:[43,20] },
  them: { 1:[29,3], 2:[17.5,5], 4:[23.5,5.5], 3:[40,13], 6:[28,24], 10:[19,30], 9:[30,42], 7:[9,22], 11:[40,28] },
  ball: '10',
  pass: {
    6: P(3, 'Pro choice', 'Their defenders ran back toward goal, so the space was at the edge of the box. You cut it back to your 6.'),
    9: P(1, 'Marked', 'Their 4 is right on your 9, and their keeper is close.')
  },
  shoot: P(1, 'Tight angle', 'From there the keeper covers the near post. The cutback was open.', { end: [29,4] }),
  carry: [],
  elsewhere: P(1, 'Not quite', 'Their 3 is chasing you. Look back across the box.'),
  best: { kind: 'pass', to: '6' } },

{ ch: 2, type: 'ball', title: 'Who is onside?',
  prompt: 'You have the ball in midfield. Your 9 and your 11 are both looking for a pass. Check the line first.',
  hint: 'Find their last defender. Who is past that line?',
  lesson: 'Before you pass forward, check who is onside.',
  us:   { 1:[25,70], 3:[12,55], 4:[25,57], 2:[38,55], 6:[24,44], 10:[26,30], 11:[10,21], 9:[28,15], 7:[43,22] },
  them: { 1:[25,4], 2:[14,20], 4:[25,19], 3:[36,20], 6:[31,36], 10:[19,42], 9:[29,52], 7:[9,34], 11:[41,30] },
  ball: '10',
  arrows: [{ team: 'us', from: [10.3,19], to: [11.8,12], dash: 1 }],
  pass: {
    9:  P(0, 'Offside', 'Your 9 is past their last defender. Offside!'),
    11: P(1, 'Behind the run', "The 11 is running in behind. Pass into the space ahead.")
  },
  lead: [
    [12, 11, 4, 3, 'Pro choice', 'Your 9 was offside, but your 11 timed the run. You put it in front of the 11.', '11', null, true],
    [28.5, 11, 3.5, 0, 'Offside', 'Your 9 is past their last defender. Offside!', '9']
  ],
  shoot: FAR,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Find the runner who is onside.'),
  best: { kind: 'pass', to: '11', at: [12,11] } },

/* ---------------- 4. Shoot or pass ---------------- */
{ ch: 3, type: 'ball', title: 'Edge of the box',
  prompt: "You're at the edge of their box with space. Their defenders are a few yards away.",
  hint: 'Can you see the goal?',
  lesson: 'Space at the edge of the box and a clear sight of goal? Shoot.',
  us:   { 1:[25,70], 3:[13,46], 4:[25,48], 2:[37,46], 6:[24,34], 10:[25,18], 11:[8,16], 9:[31,10], 7:[42,16] },
  them: { 1:[25,2], 2:[13,9.5], 4:[32,6.5], 3:[40,10], 6:[28,25], 10:[19,34], 9:[30,44], 7:[9,24], 11:[41,24] },
  ball: '10',
  arrows: [{ team: 'them', from: [28,25], to: [27,22] }],
  pass: {
    9: P(1, 'Marked', 'Their 4 is on your 9, and you had a clear shot.')
  },
  otherNote: 'You were in a great shooting spot.',
  shoot: P(3, 'Pro choice', "Space, a clear sight of goal, 18 yards out. You hit the target."),
  carry: [[25, 13, 2.5, 2, 'Okay', 'Getting closer works, but their 6 is closing. Shoot sooner.']],
  elsewhere: P(1, 'Not quite', 'Their 6 is closing you down. Shoot while you can.'),
  best: { kind: 'shoot' } },

{ ch: 3, type: 'ball', title: 'Their 4 stepped out',
  prompt: 'You line up a shot, and their 4 steps out to block it. Look at your 9.',
  hint: 'Their 4 left your 9 to block you.',
  lesson: 'Defender steps out to block your shot? The player left behind is free.',
  us:   { 1:[25,70], 3:[13,46], 4:[25,48], 2:[37,46], 6:[24,34], 10:[25,20], 11:[8,16], 9:[29,10.5], 7:[42,16] },
  them: { 1:[25,2], 2:[14,9.5], 4:[23,15.5], 3:[37,10], 6:[28,27], 10:[19,36], 9:[30,46], 7:[9,24], 11:[41,24] },
  ball: '10',
  arrows: [{ team: 'them', from: [23.5,12], to: [23.1,15] }],
  pass: {
    9: P(3, 'Pro choice', 'Their 4 stepped out to block your shot, so your 9 is free behind.')
  },
  shoot: P(1, 'Blocked', 'Their 4 stepped right into the way. Your 9 was free.', { end: [23.3,16.3] }),
  carry: [],
  elsewhere: P(1, 'Not quite', 'Their 4 left your 9 to block you.'),
  best: { kind: 'pass', to: '9' } },

{ ch: 3, type: 'ball', title: 'Too far out',
  prompt: "You're nearly 30 yards out. Nobody is pressing you. Shoot, or something better?",
  hint: 'How far is 30 yards for our goals? Who is free?',
  lesson: 'From far out, a pass to a free teammate is usually better than a shot.',
  us:   { 1:[25,70], 3:[12,55], 4:[25,57], 2:[38,55], 6:[24,42], 10:[25,29], 11:[8,22], 9:[24,15], 7:[44,22] },
  them: { 1:[25,3], 2:[12,16], 4:[24,11], 3:[36,14], 6:[29,35], 10:[19,41], 9:[30,50], 7:[9,32], 11:[41,32] },
  ball: '10',
  pass: {
    7: P(3, 'Pro choice', 'From 30 yards a shot rarely beats the keeper. Your 7 is free on the wing.')
  },
  shoot: P(1, 'Too far', "That's nearly 30 yards. Usually the keeper catches it and we lose the ball."),
  carry: [[25, 22, 3, 2, 'Okay', 'Getting closer is okay, but your 7 was free.']],
  elsewhere: P(1, 'Not quite', 'Find the free teammate.'),
  best: { kind: 'pass', to: '7' } },

{ ch: 3, type: 'ball', title: 'Keeper off the line',
  prompt: 'A clearance drops to you. Their keeper came out for a cross and is out of position.',
  hint: 'Where is their keeper?',
  lesson: 'Always check where the keeper is. If the keeper is out of position, shoot.',
  us:   { 1:[25,70], 3:[13,44], 4:[25,46], 2:[37,44], 6:[24,34], 10:[24,22], 11:[10,14], 9:[27.5,11.5], 7:[44,10] },
  them: { 1:[31,7.5], 2:[16,10], 4:[31,15], 3:[41,6], 6:[30,28], 10:[19,30], 9:[29,42], 7:[8,24], 11:[41,24] },
  ball: '10',
  arrows: [{ team: 'them', from: [31,7], to: [28.5,4.2], dash: 1 }],
  pass: {
    9: P(1, 'Slow', 'The goal was open. Every extra pass gives their keeper time to get back.')
  },
  otherNote: 'Their keeper was off the line. That was your chance.',
  shoot: P(3, 'Pro choice', 'Their keeper was off the line. You looked up and hit it at the open net.', { end: [22.6,-1.2] }),
  carry: [],
  elsewhere: P(1, 'Too slow', 'Every touch gives their keeper time to get back. Shoot!'),
  best: { kind: 'shoot' } },

{ ch: 3, type: 'ball', title: 'Lay it off',
  prompt: 'You are just outside the box. Their 4 is in front of you and their 6 is on your back. Your 6 is arriving behind you.',
  hint: 'Who has a better shot than you?',
  lesson: 'Shot blocked? Lay it off to a teammate arriving with a clear shot.',
  us:   { 1:[25,70], 3:[13,48], 4:[25,50], 2:[37,48], 6:[24,26], 10:[26,17], 11:[9,16], 9:[30,9], 7:[43,16] },
  them: { 1:[25,2.5], 2:[13,10], 4:[26,12.5], 3:[36,9], 6:[29,21], 10:[19,32], 9:[30,42], 7:[9,24], 11:[41,24] },
  ball: '10',
  pass: {
    6: P(3, 'Pro choice', 'Their 4 was blocking your shot and their 6 was on your back. You laid it off to your 6, arriving with a clear shot.')
  },
  shoot: P(1, 'Blocked', 'Their 4 was right in the way.', { end: [26,13.6] }),
  carry: [],
  elsewhere: P(1, 'Not quite', 'You are boxed in. Use your 6.'),
  best: { kind: 'pass', to: '6' } },

/* ---------------- 5. Defend from the front ---------------- */
{ ch: 4, type: 'move', title: 'Mark their 6', kind: 'Pressing',
  prompt: 'Their 4 has the ball and your 9 is pressing. Their 6 is free in front of your 9. Drag the 10.',
  hint: 'Your 9 has their 4. Who is yours?',
  lesson: 'When your 9 presses their defender, you take their 6.',
  us:   { 1:[25,70], 3:[12,56], 4:[25,58], 2:[38,56], 6:[24,45], 10:[31,36], 11:[11,28], 9:[25,21], 7:[39,28] },
  them: { 1:[25,3], 2:[12,17], 4:[25,16], 3:[38,17], 6:[24,30], 10:[19,42], 9:[28,52], 7:[9,42], 11:[41,44] },
  ball: { team: 'them', n: '4' },
  zones: [
    [24.5, 34, 2.6, 3, 'Pro spot', "Your 9 is pressing their 4, so you marked their 6 from behind. If the ball goes to their 6, there's no way to turn."],
    [31, 36, 3, 0, 'Their 6 is free', 'From there their 4 can pass to their 6, who turns.'],
    [25, 23.5, 2.2, 1, 'Two on one', 'Your 9 already has their 4. Now their 6 is free.']
  ],
  elsewhere: P(1, 'Not quite', 'Get tight to their 6, between their 6 and our goal.'),
  best: { kind: 'move', at: [24.5,34] } },

{ ch: 4, type: 'move', title: 'Shadow their 6', kind: 'Pressing',
  prompt: 'Their 3 has the ball on the right, and your 7 is pressing. Drag the 10.',
  hint: 'Your 7 has the ball carrier. What pass can you take away?',
  lesson: 'While a teammate presses the ball, stand in the pass to their 6 so it never gets there.',
  us:   { 1:[25,70], 3:[12,56], 4:[25,58], 2:[38,56], 6:[24,45], 10:[22,34], 11:[12,30], 9:[26,20], 7:[40,26] },
  them: { 1:[25,3], 2:[12,17], 4:[25,15], 3:[37,18], 6:[26,28], 10:[19,42], 9:[28,52], 7:[9,42], 11:[42,42] },
  ball: { team: 'them', n: '3' },
  arrows: [{ team: 'us', from: [40,26], to: [38.8,22.6] }],
  zones: [
    [30.5, 24, 2.6, 3, 'Pro spot', 'Your 7 is pressing their 3, and you stand right in the pass to their 6. Their 3 has nowhere to go but backward.'],
    [26, 32, 2.5, 2, 'Good', 'Marking their 6 works, but standing in the passing lane stops the ball before it reaches their 6.'],
    [35, 22, 2.4, 1, 'Two on the ball', 'Your 7 already has their 3. Now their 6 is free.']
  ],
  elsewhere: P(1, 'Not quite', 'Stand in the pass from their 3 to their 6.'),
  best: { kind: 'move', at: [30.5,24] } },

{ ch: 4, type: 'move', title: 'Win it back', kind: 'Pressing',
  prompt: 'You just lost the ball. Their 6 took it right off you. Drag the 10.',
  hint: 'How close are you? The first five seconds matter most.',
  lesson: 'Lost the ball? Hunt it right back. The first five seconds are the best time to win it.',
  us:   { 1:[25,70], 3:[12,56], 4:[25,58], 2:[38,56], 6:[23,42], 10:[31,24], 11:[9,28], 9:[24,17], 7:[41,28] },
  them: { 1:[25,3], 2:[13,15], 4:[25,12.5], 3:[37,15], 6:[26,30], 10:[18,40], 9:[29,50], 7:[9,38], 11:[42,40] },
  ball: { team: 'them', n: '6' },
  zones: [
    [28, 27.5, 2.4, 3, 'Pro spot', "You lost it, so you hunted it right back. With your 6 in front, there's nowhere to go."],
    [31, 24, 2.8, 1, 'Watching', 'You stood and watched. That gives them time to look up and pass.'],
    [25, 48, 4, 1, 'Dropped off', 'Running all the way back gives them time. You were close, so press.']
  ],
  elsewhere: P(1, 'Not quite', 'You are the closest player. Press now.'),
  best: { kind: 'move', at: [28,27.5] } },

{ ch: 4, type: 'move', title: 'Track the run',
  prompt: 'Their 3 has the ball. Their 6 is running past you into our half. Drag the 10.',
  hint: 'Your 7 is on the ball. Who is the danger?',
  lesson: "Their midfielder runs past you? Go too. Don't let the runner get into space behind you.",
  us:   { 1:[25,72], 3:[12,59], 4:[25,60], 2:[38,59], 6:[18,45], 10:[29,27], 11:[10,30], 9:[25,20], 7:[41,27] },
  them: { 1:[25,3], 2:[12,17], 4:[25,15], 3:[40,32], 6:[28,32], 10:[15,40.5], 9:[28,53], 7:[8,46], 11:[42,46] },
  ball: { team: 'them', n: '3' },
  arrows: [{ team: 'them', from: [27.6,34], to: [25.5,44], dash: 1 }],
  zones: [
    [25.5, 45, 3.5, 3, 'Pro spot', "You tracked their 6's run all the way. Now their 6 can't get the ball in the space behind your midfield."],
    [29, 27, 3, 0, 'Left behind', 'Their 6 ran right past you.'],
    [38, 31, 2.6, 1, 'Ball watching', 'Your 7 has their 3. Their 6 was the danger.']
  ],
  elsewhere: P(1, 'Not quite', 'Go with their 6.'),
  best: { kind: 'move', at: [25.5,45] } },

{ ch: 4, type: 'move', title: "Don't get pulled wide", kind: 'Pressing',
  prompt: 'Their 2 has the ball on your left, and your 11 is pressing. You drifted out wide. Drag the 10.',
  hint: 'Your 11 has the ball. What pass would help them escape?',
  lesson: "When a teammate presses wide, don't follow the ball. Stay inside and block the pass into the middle.",
  us:   { 1:[25,72], 3:[12,59], 4:[25,60], 2:[38,59], 6:[25,45], 10:[13,35.5], 11:[13,29.5], 9:[26,19], 7:[38,28] },
  them: { 1:[25,3], 2:[12,24], 4:[25,15], 3:[38,18], 6:[24,28], 10:[20,41], 9:[28,53], 7:[8,44], 11:[42,44] },
  ball: { team: 'them', n: '2' },
  arrows: [{ team: 'us', from: [13,29.5], to: [12.6,26.6] }],
  zones: [
    [19, 26.5, 2.6, 3, 'Pro spot', 'Your 11 is pressing their 2, so you stood in the pass into their 6. Their 2 is trapped against the sideline.'],
    [24, 32, 2.5, 2, 'Good', 'Marking their 6 works, but standing in the pass stops the ball before it reaches their 6.'],
    [13, 35.5, 3, 1, 'Pulled wide', 'Two of you out wide leaves their 6 free in the middle.']
  ],
  elsewhere: P(1, 'Not quite', 'Get inside and block the pass from their 2 into their 6.'),
  best: { kind: 'move', at: [19,26.5] } },

/* ---------------- 6. Arrive in the box ---------------- */
{ ch: 5, type: 'move', title: 'Edge of the box',
  prompt: 'Your 7 is at the end line about to pull it back. Your 9 is at the near post and your 11 at the back post. Drag the 10.',
  hint: 'Everyone else is running at the goal. Where is the space?',
  lesson: "Arrive at the edge of the box for the pullback. Don't run into the crowd.",
  us:   { 1:[25,68], 3:[13,42], 4:[25,44], 2:[37,42], 6:[26,31], 10:[29,25], 11:[15,9], 9:[30,6.5], 7:[44,6] },
  them: { 1:[25,2.2], 2:[17.5,5], 4:[26.5,6], 3:[40,2.5], 6:[33,21], 10:[21,31], 9:[31,45], 7:[10,22], 11:[41,22] },
  ball: { team: 'us', n: '7' },
  zones: [
    [24, 14, 3.5, 3, 'Pro spot', 'Everyone ran at the goal, so you arrived at the edge of the box. The pullback is yours.'],
    [25, 5, 3, 0, 'Too crowded', 'The goal mouth is jammed. The pullback can’t reach you in there.'],
    [29, 25, 3, 1, 'Too far', "You're too far away to finish."]
  ],
  elsewhere: P(1, 'Not quite', 'Find the space at the edge of the box.'),
  best: { kind: 'move', at: [24,14] } },

{ ch: 5, type: 'move', title: 'Back post', run: true, air: true,
  prompt: 'Your 7 is crossing from the right. Your 9 is attacking the near post, and your 11 is out wide. Drag the 10.',
  hint: 'Who is going to the back post?',
  lesson: 'If nobody is at the back post, get there. Crosses that fly past the near post land there.',
  us:   { 1:[25,68], 3:[13,42], 4:[25,44], 2:[37,42], 6:[24,30], 10:[25,20], 11:[8,28], 9:[30,9], 7:[44,12] },
  them: { 1:[26,2.2], 2:[14,13], 4:[28,5.5], 3:[41,16], 6:[23,24.5], 10:[19,32], 9:[28,46], 7:[9,36], 11:[40,26] },
  ball: { team: 'us', n: '7' },
  zones: [
    [17, 6, 3.5, 3, 'Pro spot', 'Nobody was at the back post, so you got there. If the cross flies past the near post, it’s yours.'],
    [30, 5, 3, 1, 'Same spot as the 9', 'Your 9 is already at the near post.'],
    [25, 20, 3, 1, 'Standing still', "You're too far from goal to finish a cross."]
  ],
  elsewhere: P(1, 'Not quite', 'Attack the empty back post.'),
  best: { kind: 'move', at: [17,6] } },

{ ch: 5, type: 'move', title: 'Follow the shot', noPayoff: true,
  prompt: 'Your 9 is about to shoot. Drag the 10.',
  hint: 'What if the keeper can’t hold it?',
  lesson: 'Follow every shot. Keepers spill more than you think.',
  us:   { 1:[25,68], 3:[13,44], 4:[25,46], 2:[37,44], 6:[24,32], 10:[19,19], 11:[8,20], 9:[28,14], 7:[43,20] },
  them: { 1:[25,2.2], 2:[14,10], 4:[25,9.5], 3:[37,10], 6:[30,22], 10:[20,32], 9:[30,44], 7:[9,28], 11:[41,28] },
  ball: { team: 'us', n: '9' },
  arrows: [{ team: 'us', from: [27.8,12.5], to: [25.5,2.5], dash: 1 }],
  zones: [
    [22, 5.5, 3, 3, 'Pro spot', "You followed the shot toward goal. If the keeper spills it, you're first to the rebound."],
    [19, 19, 3, 1, 'Watching', 'You stood and watched. If the keeper spills it, their defenders get there first.']
  ],
  elsewhere: P(1, 'Not quite', 'Follow the shot toward the keeper.'),
  best: { kind: 'move', at: [22,5.5] } },

{ ch: 5, type: 'move', title: 'Out of the way', noPayoff: true,
  prompt: 'Your 6 is about to shoot from distance. You are standing right in front of the 6. Drag the 10.',
  hint: 'Look at the line from the ball to the goal.',
  lesson: "Don't block your own teammate's shot. Get out of the line, then follow it in.",
  us:   { 1:[25,70], 3:[13,48], 4:[25,50], 2:[37,48], 6:[25,30], 10:[25,21], 11:[8,20], 9:[32,11], 7:[42,20] },
  them: { 1:[25,2.2], 2:[14,12], 4:[29,7.5], 3:[38,12], 6:[30,36], 10:[19,38], 9:[30,46], 7:[9,28], 11:[41,28] },
  ball: { team: 'us', n: '6' },
  arrows: [{ team: 'us', from: [25,28.5], to: [25,2], dash: 1 }],
  zones: [
    [19, 19.5, 3, 3, 'Pro spot', 'You stepped out of the line of the shot, and you’re ready to follow it in.'],
    [31, 19.5, 3, 3, 'Pro spot', 'You stepped out of the line of the shot, and you’re ready to follow it in.'],
    [25, 21, 2.5, 0, 'In the way', "You're standing right in the way of your 6's shot."]
  ],
  elsewhere: P(1, 'Not quite', 'Step out of the line between the ball and the goal.'),
  best: { kind: 'move', at: [19,19.5] } },

{ ch: 5, type: 'move', title: 'Run past your 9',
  prompt: 'Your 9 has the ball facing away from goal, and their 4 is tight behind. Drag the 10.',
  hint: 'The 9 can’t turn. Who can take a lay-off, running toward goal?',
  lesson: 'When your 9 holds the ball up, run past. Give the 9 a lay-off option toward goal.',
  us:   { 1:[25,70], 3:[13,50], 4:[25,52], 2:[37,50], 6:[25,40], 10:[26,30], 11:[8,22], 9:[25,20], 7:[43,22] },
  them: { 1:[25,3], 2:[13,15], 4:[25,15.5], 3:[38,15], 6:[30,34], 10:[19,42], 9:[30,50], 7:[9,30], 11:[41,30] },
  ball: { team: 'us', n: '9' },
  zones: [
    [31.5, 15.5, 3, 3, 'Pro spot', 'You ran past your 9 into the gap between their 4 and 3. The 9 lays it off, and you are in on goal.'],
    [25, 26, 3, 2, 'Good', 'Close support for your 9, but a run past is more dangerous.'],
    [26, 30, 2.6, 1, 'Standing still', 'Your 9 needs help now.']
  ],
  elsewhere: P(1, 'Not quite', 'Run past your 9, into the gap between their defenders.'),
  best: { kind: 'move', at: [31.5,15.5] } }
];


/* ---------------- Motion: the build-ups and what happens next ----------------
   Matched to the puzzles above by title. Format at the top of riddles-motion.js. */
const { steal, offside, say } = window.RIDDLE_LIB;
// the 10 turning with their 6 tight on its back
const TURNED = { replace: true, steps: [
        { t: .7, face: { 'us:10': 'up' }, them: { 6: [25.5, 27.4] }, tag: { 'them:6': 'TACKLE' }, head: 'Turned into trouble', sub: 'Their 6 was right on your back.',
          cam: { at: [25, 29], zoom: 1.6, tilt: .45 } },
        { t: .45, pass: 'them:6' },
        { t: 1, them: { 6: [21, 36] }, head: 'Turned into trouble', sub: "And now they're running at us.", cam: { at: [22, 35], zoom: 1.35, tilt: .5 }, wait: .9 }] };
const MOTION = {
  /* ---- 1. Find the pocket ---- */
  'Between the lines': {
    intro: { start: { ball: 'us:4', us: { 2: [37, 59], 10: [24, 38] }, them: { 6: [26, 27] } },
      cam: { at: [30, 58], zoom: 1.55, tilt: .5 },
      steps: [
        { t: 1.6, pass: 'us:2', pd: .2, us: { 2: [38, 56], 10: [25, 35] }, them: { 6: [25, 30] }, head: 'Your 2 has the ball',
          sub: "And you're standing right next to their 6.", cam: { at: [32, 42], zoom: 1.35, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.1, face: { 'us:10': 'up' }, us: { 10: { by: [-1, -4] } }, chain: [{ ns: ['them:2', 'them:4', 'them:3'], c: 'good' }], tag: { 'us:10': ['TURNED', 'good'] },
        head: 'In the pocket', sub: 'Behind their midfielders, in front of their defenders. Now turn and go at them.', cam: { at: 'us:10', zoom: 1.35, tilt: .6 }, wait: 1.2 }],
      zone1: [{ t: .8, them: { 6: [25, 32] }, tag: { 'them:6': 'MARK' }, head: 'Marked', sub: 'Standing next to their 6, you are easy to mark.',
        cam: { at: [25, 34], zoom: 1.5, tilt: .5 }, wait: 1.1 }],
      zone3: offside('10', 13.5)
    } },

  'Out of the shadow': {
    intro: { start: { ball: 'us:4', us: { 6: [26, 50], 10: [25, 27] }, them: { 6: [26, 34] } },
      cam: { at: [25, 54], zoom: 1.55, tilt: .5 },
      steps: [
        { t: 1.5, pass: 'us:6', pd: .2, us: { 6: [25, 46], 10: [25, 30] }, them: { 6: [25, 37] }, head: 'Your 6 wants to pass to you',
          sub: 'But their 6 is standing right between you.', cam: { at: [25, 39], zoom: 1.4, tilt: .55 } },
        { t: 1.1, marks: [{ s: ['them:6', 'us:6'], len: 11 }], cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1, face: { 'us:10': 'up' }, us: { 10: { by: [0, -3] } }, marks: [{ s: ['them:6', 'us:6'], len: 11 }], tag: { 'us:10': ['OPEN', 'good'] },
        head: 'Out of the shadow', sub: "Now your 6 can find you, and you're between their lines.", cam: { at: 'us:10', zoom: 1.35, tilt: .55 }, wait: 1.2 }],
      zone1: [{ t: 1, face: { 'us:10': 'up' }, us: { 10: { by: [0, -3] } }, marks: [{ s: ['them:6', 'us:6'], len: 11 }], tag: { 'us:10': ['OPEN', 'good'] },
        head: 'Out of the shadow', sub: "Now your 6 can find you, and you're between their lines.", cam: { at: 'us:10', zoom: 1.35, tilt: .55 }, wait: 1.2 }],
      zone2: [{ t: .9, pass: 'them:6', marks: [{ s: ['them:6', 'us:6'], len: 11 }], tag: { 'them:6': 'CUT' }, head: 'Hidden',
          sub: 'Their 6 is right between you and the ball, and cuts it out.', cam: { at: [25, 39], zoom: 1.5, tilt: .5 } },
        { t: 1, them: { 6: [21, 42] }, wait: 1 }]
    } },

  'Help your winger': {
    intro: { start: { ball: 'us:2', us: { 7: [43, 40], 10: [26, 37] }, them: { 11: [41, 27] } },
      cam: { at: [40, 47], zoom: 1.55, tilt: .5 },
      steps: [
        { t: 1.5, pass: 'us:7', pd: .2, us: { 7: [44, 36], 10: [25, 34] }, them: { 11: [43, 30] }, tag: { 'them:11': 'PRESS' }, head: 'Your 7 has it on the right',
          sub: 'Their 11 is in front of the 7. Help!', cam: { at: [40, 35], zoom: 1.45, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.1, face: { 'us:10': 'up' }, us: { 10: { by: [-1, -4] }, 7: [48, 25] }, tag: { 'us:10': ['TURNED', 'good'], 'us:7': ['GO', 'good'] },
        head: 'Inside and a little ahead', sub: 'The 7 finds you in the gap, you turn, and the 7 runs past their 11.', cam: { at: [38, 28], zoom: 1.3, tilt: .55 }, wait: 1.2 }],
      zone1: say('Crowding the 7', "You're right next to your 7, so their 11 can mark you both.", { at: [42, 31], zoom: 1.55, tilt: .5 }, { tag: { 'them:11': 'MARKS BOTH' } })
    } },

  'Opposite movement': {
    intro: { start: { ball: 'us:4', us: { 6: [26, 48], 9: [25, 18.5], 10: [30, 33] }, them: { 4: [25, 14] } },
      cam: { at: [25, 50], zoom: 1.5, tilt: .5 },
      steps: [
        { t: 1.6, pass: 'us:6', pd: .2, us: { 6: [25, 44], 9: [25, 25], 10: [31, 30] }, them: { 4: [25, 20.5] }, tag: { 'them:4': 'FOLLOW' },
          head: 'Your 9 comes short', sub: 'And their 4 follows. What did their 4 leave behind?', cam: { at: [26, 26], zoom: 1.45, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1, face: { 'us:10': 'up' }, us: { 10: { by: [0, -4] } }, hatch: [{ pts: [[20, 10], [36, 10], [36, 18], [20, 18]], c: 'good' }],
        tag: { 'us:10': ['IN BEHIND', 'good'], 'them:4': 'FOLLOWED' }, head: 'Opposite movement',
        sub: 'Your 9 came short and took their 4 along, so you ran into the space their 4 left.', cam: { at: [28, 15], zoom: 1.4, tilt: .6 }, wait: 1.2 }],
      zone1: say('Crowded', 'Coming short too puts you right next to your 9. Their 4 can mark you both.', { at: [26, 26], zoom: 1.5, tilt: .5 }, { tag: { 'them:4': 'MARKS BOTH' } }),
      zone2: offside('10', 16)
    } },

  'Far-side pocket': {
    intro: { start: { ball: 'us:3', us: { 6: [24, 49], 10: [23, 31] }, them: { 7: [12, 30], 10: [18, 40], 11: [40, 41], 6: [22, 33] } },
      cam: { at: [15, 52], zoom: 1.5, tilt: .5 },
      steps: [
        { t: 1.6, pass: 'us:6', pd: .2, us: { 6: [25, 46], 10: [20, 30] }, them: { 7: [9, 31.5], 10: [14, 40], 11: [36, 41], 6: [19, 34.5] }, tag: { 'them:6': 'MARK' },
          head: 'Their midfield shifts to your left', sub: 'And their 6 is marking you.', cam: { at: [20, 38], zoom: 1.3, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.1, face: { 'us:10': 'up' }, us: { 10: { by: [0, -3.5] } }, hatch: [{ pts: [[27, 18], [42, 18], [42, 32], [27, 32]], c: 'good' }], tag: { 'us:10': ['FREE', 'good'] },
        head: 'The far-side pocket', sub: 'Their midfield shifted left, so the pocket on the right is empty.', cam: { at: [31, 25], zoom: 1.35, tilt: .55 }, wait: 1.2 }],
      zone2: say('Into the crowd', "That's where all their midfielders are.", { at: [15, 36], zoom: 1.45, tilt: .5 }, { tag: { 'them:7': 'CROWD', 'them:10': 'CROWD', 'them:6': 'CROWD' } })
    } },

  /* ---- 2. Receive and decide ---- */
  'Turn and release': {
    intro: { start: { ball: 'us:6', us: { 10: [29, 30], 9: [24, 21] }, them: { 6: [21, 37] } },
      cam: { at: [26, 38], zoom: 1.5, tilt: .5 },
      steps: [
        { t: 1.5, pass: 'us:10', pd: .15, face: { 'us:10': 'up' }, us: { 10: [30, 27], 9: [25, 19] }, them: { 6: [26, 35] }, tag: { 'them:6': 'PRESS' },
          head: 'You turn in the pocket', sub: 'Their 6 chases you, and your 9 starts a run between their defenders.', cam: { at: [28, 25], zoom: 1.45, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      lead0: [{ t: .9, us: { 9: [28.5, 7.5] }, them: { 4: [25, 12], 3: [33, 11] }, chain: [{ ns: ['them:2', 'them:4', 'them:3'], c: 'good' }], tag: { 'us:9': ['THROUGH', 'good'] },
          head: 'Release the runner', sub: 'Into the gap between their 4 and 3, and your 9 is through.', cam: { at: [28, 10], zoom: 1.45, tilt: .6 } },
        { t: .6, shot: [27.5, -1.2], wait: 1.1 }]
    } },

  'Set it back': {
    intro: { start: { ball: 'us:6', us: { 10: [25, 25] }, them: { 6: [25, 20] } },
      cam: { at: [25, 36], zoom: 1.65, tilt: .45 },
      steps: [
        { t: 1.5, pass: 'us:10', pd: .3, face: { 'us:10': 'down' }, us: { 10: [25, 30] }, them: { 6: [25, 25.5] }, tag: { 'them:6': 'TIGHT' },
          head: 'Your 6 plays it into you', sub: 'Back to goal, and their 6 is tight behind you.', cam: { at: [25, 30], zoom: 1.65, tilt: .45 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      6: [{ t: .9, face: { 'us:10': 'up' }, us: { 10: [30.5, 27.5] }, them: { 6: [25.5, 29] }, head: 'Set it back, then spin', sub: "Their 6 follows the ball. You're free.",
          cam: { at: [27, 33], zoom: 1.45, tilt: .5 } },
        { t: 1, pass: 'us:10', pd: .1, us: { 10: [30.5, 26] }, tag: { 'us:10': ['OPEN', 'good'], 'them:6': 'BEATEN' }, head: "Now you're facing their goal",
          sub: 'One touch back, a quick spin, and their 6 is out of the play.', cam: { at: [28, 30], zoom: 1.4, tilt: .55 }, wait: 1.3 }],
      7: TURNED, 9: TURNED, 11: TURNED
    } },

  'Switch it': {
    intro: { start: { ball: 'us:7', us: { 10: [27, 32] }, them: { 6: [30, 22], 10: [29, 40], 11: [38, 22], 3: [35, 17], 7: [14, 33], 2: [15, 16], 4: [25, 13] } },
      cam: { at: [40, 27], zoom: 1.55, tilt: .5 },
      steps: [
        { t: 1.6, pass: 'us:10', pd: .2, us: { 10: [25, 30] }, them: { 6: [31, 25], 10: [32, 38], 11: [41, 24], 3: [38, 18], 7: [18, 34], 2: [18, 16], 4: [28, 13.5] },
          head: 'Your 7 plays it inside', sub: 'Their players are all crowding the right side.', cam: { at: [32, 28], zoom: 1.35, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      lead0: [{ t: 1.2, us: { 11: [9, 10] }, them: { 2: [13.5, 13] }, hatch: [{ pts: [[0, 6], [14, 6], [14, 36], [0, 36]], c: 'good' }], tag: { 'us:11': ['FREE', 'good'], 'them:2': 'LATE' },
        head: "Switched. They're on the wrong side.", sub: 'Your 11 runs onto it with nobody near.', cam: { at: [11, 15], zoom: 1.45, tilt: .55 }, wait: 1.2 }],
      7: steal('7', '11', [43, 26], 'Crowded', 'Their 11 is right on your 7, and their 3 is close. The right side is jammed.')
    } },

  'Drive at them': {
    intro: { start: { ball: null, ballAt: [22, 42], us: { 10: [23, 38] }, them: { 6: [30, 47], 10: [18, 49] } },
      cam: { at: [24, 40], zoom: 1.55, tilt: .5 },
      steps: [
        { t: 1.4, pass: 'us:10', us: { 10: [25, 32] }, them: { 6: [28, 40], 10: [19, 45] }, head: 'You win the race to the ball',
          sub: 'Their midfielders are behind you, and every teammate in front is marked.', cam: { at: [25, 30], zoom: 1.3, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      carry0: [{ t: .6, us: { 9: [30, 15.5] } },
        { t: .9, them: { 4: [24.5, 18.5] }, tag: { 'them:4': 'STEPS UP' }, head: 'Drive at them', sub: 'Now a defender has to leave someone to stop you…',
          cam: { at: [26, 19], zoom: 1.4, tilt: .55 } },
        { t: 1, pass: 'us:9', us: { 9: [31, 10] }, tag: { 'us:9': ['FREE', 'good'] }, head: 'Drive at them', sub: '…and that player is free.', wait: 1.1 }],
      carry1: [{ t: .5, pass: 'them:4', tag: { 'them:4': 'TACKLE' }, head: 'Into their 4', sub: 'You dribbled right into their 4.',
        cam: { at: [25, 16], zoom: 1.5, tilt: .45 }, wait: 1.1 }]
    } },

  'One-two': {
    intro: { start: { ball: 'us:6', us: { 10: [25, 34], 9: [31, 19] }, them: { 6: [25, 20] } },
      cam: { at: [25, 38], zoom: 1.55, tilt: .5 },
      steps: [
        { t: 1.5, pass: 'us:10', pd: .15, us: { 10: [25, 30], 9: [31, 23.5] }, them: { 6: [25, 25.5] }, tag: { 'them:6': 'PRESS' },
          head: 'Their 6 runs at you', sub: 'And your 9 drops in right beside their 6.', cam: { at: [27, 27], zoom: 1.55, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      9: [{ t: .8, us: { 10: [20.5, 24] }, them: { 6: [26.5, 27] }, head: 'Pass…', sub: "To your 9's feet. Now run past their 6…", cam: { at: [25, 25], zoom: 1.5, tilt: .5 } },
        { t: .9, pass: 'us:10', us: { 10: [21, 19.5] }, tag: { 'us:10': ['ONE-TWO', 'good'], 'them:6': 'BEATEN' }, head: 'Pass and go',
          sub: '…and the 9 gives it straight back. Their 6 is out of the play.', cam: { at: [24, 22], zoom: 1.45, tilt: .55 }, wait: 1.2 }],
      carry0: [{ t: .5, pass: 'them:6', tag: { 'them:6': 'TACKLE' }, head: 'Into their 6', sub: 'Their 6 is right there.', cam: { at: [25, 27], zoom: 1.55, tilt: .45 }, wait: 1.1 }]
    } },

  /* ---- 3. The final pass ---- */
  'Coming to you': {
    intro: { start: { ball: 'us:6', us: { 10: [25, 37], 9: [26.3, 17.5] }, them: { 4: [26, 13] } },
      cam: { at: [25, 40], zoom: 1.55, tilt: .5 },
      steps: [
        { t: 1.5, pass: 'us:10', pd: .15, us: { 10: [25, 33], 9: [26, 23] }, them: { 4: [26, 18.5] }, tag: { 'them:4': 'TIGHT' },
          head: 'Your 9 comes short toward you', sub: "Their 4 is right on the 9's back.", cam: { at: [26, 26], zoom: 1.5, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      9: [{ t: .9, face: { 'us:9': 'down' }, tag: { 'us:9': ['HOLD', 'good'], 'them:4': 'TIGHT' }, head: 'Firm, to feet', sub: 'The 9 holds it up, with their 4 stuck behind.',
          cam: { at: [26, 25], zoom: 1.55, tilt: .5 } },
        { t: 1, pass: 'us:10', us: { 10: [24, 29] }, face: { 'us:10': 'up' }, head: 'Lay it off', sub: 'Back to you, facing forward, and you go again.',
          cam: { at: [25, 27], zoom: 1.45, tilt: .5 }, wait: 1.1 }]
    } },

  'Running away from you': {
    intro: { start: { ball: 'us:6', us: { 10: [26, 37], 9: [24, 29] }, them: { 2: [12, 18], 4: [28, 17.5], 3: [38, 18.5] } },
      cam: { at: [25, 33], zoom: 1.4, tilt: .6 },
      steps: [
        { t: 1.6, pass: 'us:10', pd: .2, us: { 10: [26, 33], 9: [23, 25.5] }, them: { 2: [12, 24], 4: [28, 23.5], 3: [38, 24.5] }, chain: [{ ns: ['them:2', 'them:4', 'them:3'], c: 'good' }],
          head: 'Their defenders push up', sub: 'And your 9 is sprinting in behind them.', cam: { at: [25, 27], zoom: 1.35, tilt: .6 } },
        { t: 1, cam: 'wide', head: '', chain: [] }] },
    after: {
      lead0: [{ t: 1, us: { 9: [20.5, 9] }, them: { 2: [15, 17], 4: [24, 16], 1: [24.5, 5.5] }, chain: [{ ns: ['them:2', 'them:4', 'them:3'], c: 'good' }],
          hatch: [{ pts: [[4, 8], [46, 8], [46, 23], [4, 23]], c: 'good' }], tag: { 'us:9': ['THROUGH', 'good'] }, head: 'In behind',
          sub: 'Into the space in front of your 9. Through on goal!', cam: { at: [22, 13], zoom: 1.45, tilt: .6 } },
        { t: .6, shot: [27, -1.2], air: true, wait: 1.1 }]
    } },

  'Away from the defender': {
    intro: { start: { ball: 'us:6', us: { 10: [25, 30], 7: [41, 21] }, them: { 3: [37, 18] } },
      cam: { at: [26, 32], zoom: 1.5, tilt: .5 },
      steps: [
        { t: 1.5, pass: 'us:10', pd: .15, us: { 10: [25, 26], 7: [40, 17] }, them: { 3: [36.5, 13.5] }, head: 'Your 7 is near their box',
          sub: "Their 3 is on the 7's inside.", cam: { at: [35, 17], zoom: 1.45, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      lead0: [{ t: 1, pass: 'us:9', air: true, pd: .3, us: { 9: [30, 9.5] }, tag: { 'us:7': ['OUTSIDE', 'good'] }, head: 'Away from the defender',
        sub: "Played to the 7's outside, so their 3 can't reach it. Now the 7 can cross.", cam: { at: [34, 11], zoom: 1.4, tilt: .55 }, wait: 1.1 }]
    } },

  'The cutback': {
    intro: { start: { ball: 'us:10', us: { 10: [36, 17], 6: [24, 22], 9: [28, 12.5], 11: [15, 13] }, them: { 3: [40, 21], 4: [23.5, 9], 2: [17.5, 9], 1: [27, 3] } },
      cam: { at: [36, 16], zoom: 1.55, tilt: .55 },
      steps: [
        { t: 1.6, us: { 10: [38, 8], 6: [24, 17], 9: [27, 8], 11: [15, 9] }, them: { 3: [40, 13], 4: [23.5, 5.5], 2: [17.5, 5], 1: [29, 3] },
          head: 'You dribble into their box', sub: 'Their defenders run back toward their goal.', cam: { at: [32, 9], zoom: 1.45, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      6: [{ t: .7, shot: [26, -1.2], air: true, tag: { 'us:6': ['CUTBACK', 'good'] }, head: 'The cutback',
        sub: 'Their defenders ran back toward goal, so the space was at the edge of the box. Goal!', cam: { at: [25, 10], zoom: 1.4, tilt: .55 }, wait: 1.2 }],
      9: steal('9', '4', [25, 6.5], 'Marked', 'Their 4 is right on your 9, and their keeper is close.')
    } },

  'Who is onside?': {
    intro: { start: { ball: 'us:6', us: { 10: [26, 34], 9: [29, 19], 11: [9.5, 24] }, them: { 2: [14, 17], 4: [25, 16], 3: [36, 17] } },
      cam: { at: [25, 36], zoom: 1.45, tilt: .55 },
      steps: [
        { t: 1.6, pass: 'us:10', pd: .15, us: { 10: [26, 30], 9: [28, 15], 11: [10, 21] }, them: { 2: [14, 20], 4: [25, 19], 3: [36, 20] },
          chain: [{ ns: ['them:2', 'them:4', 'them:3'], c: 'good' }], head: 'Your 9 and 11 both want it', sub: 'Check the line first.', cam: { at: [22, 22], zoom: 1.35, tilt: .55 } },
        { t: 1, cam: 'wide', head: '', chain: [] }] },
    after: {
      lead0: [{ t: 1, us: { 11: [14, 6] }, chain: [{ ns: ['them:2', 'them:4', 'them:3'], c: 'good' }], marks: [{ ring: 'us:9', c: 'bad' }],
        tag: { 'us:11': ['ONSIDE', 'good'], 'us:9': 'OFFSIDE' }, head: 'Check the line', sub: 'Your 9 was offside, but your 11 timed the run.',
        cam: { at: [17, 12], zoom: 1.4, tilt: .55 }, wait: 1.2 }],
      9: offside('9', 19, 'Your 9 is past their last defender.'),
      lead1: offside('9', 19, 'Your 9 is past their last defender.')
    } },

  /* ---- 4. Shoot or pass ---- */
  'Edge of the box': [{
    intro: { start: { ball: 'us:6', us: { 10: [24, 22] }, them: { 6: [29, 29] } },
      cam: { at: [25, 28], zoom: 1.55, tilt: .55 },
      steps: [
        { t: 1.4, pass: 'us:10', pd: .15, us: { 10: [25, 18] }, them: { 6: [28, 25] }, head: 'You get it at the edge of their box',
          sub: 'With space, and their defenders a few yards away.', cam: { at: [25, 15], zoom: 1.5, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      shoot: say('Goal!', 'Space at the edge of the box means shoot, before they close you down.', { at: [25, 8], zoom: 1.4, tilt: .55 }, { tag: { 'us:10': ['GOAL', 'good'] }, wait: 1.3 }),
      carry0: [{ t: .8, them: { 6: [27.5, 15.5] }, tag: { 'them:6': 'PRESS' }, head: 'Okay, but shoot sooner', sub: 'Their 6 closes you down while you dribble.',
        cam: { at: [25, 13], zoom: 1.5, tilt: .5 }, wait: 1.1 }],
      9: steal('9', '4', [30.5, 8], 'Marked', 'Their 4 is on your 9, and you had a clear shot.')
    } }, {
    // the second "Edge of the box" (chapter 6): arrive for the pullback
    intro: { start: { ball: 'us:7', us: { 7: [43, 14], 9: [30, 12], 11: [16, 15], 10: [28, 29] }, them: { 4: [24, 11], 2: [17, 9], 3: [39, 7] } },
      cam: { at: [40, 14], zoom: 1.55, tilt: .55 },
      steps: [
        { t: 1.6, us: { 7: [44, 6], 9: [30, 6.5], 11: [15, 9], 10: [29, 25] }, them: { 4: [26.5, 6], 2: [17.5, 5], 3: [40, 2.5] }, head: 'Your 7 reaches the end line',
          sub: 'Your 9 goes near post, your 11 back post. Where do you go?', cam: { at: [36, 10], zoom: 1.4, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: .7, shot: [27, -1.2], air: true, tag: { 'us:10': ['LATE', 'good'] }, head: 'Arrive at the edge',
        sub: 'Everyone ran at the goal, so the pullback is yours. Goal!', cam: { at: [25, 8], zoom: 1.4, tilt: .55 }, wait: 1.2 }],
      zone1: [{ t: 1, pass: 'them:4', air: true, head: 'Too crowded', sub: 'The goal mouth is jammed, and their 4 clears it.', cam: { at: [26, 6], zoom: 1.45, tilt: .5 } },
        { t: 1, pass: 'them:10', air: true, wait: 1 }]
    } }],

  'Their 4 stepped out': {
    intro: { start: { ball: 'us:10', us: { 10: [25, 25] }, them: { 4: [23.5, 11] } },
      cam: { at: [25, 22], zoom: 1.55, tilt: .55 },
      steps: [
        { t: 1.4, us: { 10: [25, 20] }, them: { 4: [23, 15.5] }, tag: { 'them:4': 'BLOCK' }, head: 'You line up a shot',
          sub: 'And their 4 steps out to block it. Look at your 9.', cam: { at: [25, 16], zoom: 1.5, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      9: [{ t: .7, shot: [27.5, -1.2], tag: { 'us:9': ['FREE', 'good'], 'them:4': 'LEFT IT' }, head: 'Their 4 left your 9',
        sub: 'Their 4 stepped out to block you, so your 9 was free behind. Goal!', cam: { at: [26, 9], zoom: 1.45, tilt: .55 }, wait: 1.2 }],
      shoot: { replace: true, steps: [
        { t: .45, pass: 'them:4', tag: { 'them:4': 'BLOCK' }, head: 'Blocked', sub: 'Their 4 stepped out right in front of you. Your 9 was free behind.',
          cam: { at: [24, 17], zoom: 1.55, tilt: .5 } },
        { t: 1, pass: 'them:6', air: true, wait: 1 }] }
    } },

  'Too far out': {
    intro: { start: { ball: 'us:10', us: { 10: [24, 34.5], 7: [43, 26] } },
      cam: { at: [25, 33], zoom: 1.5, tilt: .55 },
      steps: [
        { t: 1.4, us: { 10: [25, 29], 7: [44, 22] }, head: 'Nobody is pressing you', sub: 'Nearly 30 yards out. Shoot, or something better?',
          cam: { at: [28, 26], zoom: 1.4, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      7: [{ t: 1, us: { 7: [44, 14] }, tag: { 'us:7': ['FREE', 'good'] }, head: 'Find the free 7',
        sub: 'From 30 yards a shot rarely beats the keeper. The 7 drives at their box instead.', cam: { at: [40, 17], zoom: 1.4, tilt: .55 }, wait: 1.1 }],
      shoot: say('Too far', 'The keeper has it easily. Your 7 was free on the wing.', { at: [25, 6], zoom: 1.4, tilt: .5 })
    } },

  'Keeper off the line': {
    intro: { start: { ball: 'us:7', us: { 10: [23, 26] }, them: { 1: [27, 4] } },
      cam: { at: [36, 10], zoom: 1.5, tilt: .55 },
      steps: [
        { t: 1, pass: 'them:1', air: true, pd: .1, them: { 1: [31, 7.5] }, tag: { 'them:1': 'OUT' }, head: 'Your 7 crosses', sub: 'Their keeper comes out to punch it…',
          cam: { at: [31, 9], zoom: 1.5, tilt: .55 } },
        { t: 1.1, pass: 'us:10', air: true, us: { 10: [24, 22] }, head: 'It drops to you!', sub: 'And their keeper is out of position.', cam: { at: [27, 15], zoom: 1.35, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      shoot: say('Goal!', "Their keeper was out of position, and you didn't wait.", { at: [26, 8], zoom: 1.4, tilt: .55 }, { tag: { 'us:10': ['GOAL', 'good'] }, wait: 1.3 }),
      9: [{ t: 1, them: { 1: [26, 3] }, tag: { 'them:1': 'BACK' }, head: 'Too slow', sub: 'Every extra pass gives their keeper time to get back.',
        cam: { at: [27, 8], zoom: 1.4, tilt: .5 }, wait: 1.1 }]
    } },

  'Lay it off': {
    intro: { start: { ball: 'us:10', us: { 10: [26, 22], 6: [24, 33] }, them: { 6: [29, 26], 4: [25, 9.5] } },
      cam: { at: [26, 22], zoom: 1.55, tilt: .55 },
      steps: [
        { t: 1.5, us: { 10: [26, 17], 6: [24, 26] }, them: { 6: [29, 21], 4: [26, 12.5] }, tag: { 'them:4': 'BLOCK', 'them:6': 'TIGHT' },
          head: 'Boxed in at the edge', sub: 'Their 4 in front, their 6 on your back. Your 6 is arriving behind you.', cam: { at: [26, 18], zoom: 1.5, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      6: [{ t: .7, shot: [22.5, -1.2], air: true, tag: { 'us:6': ['LATE', 'good'] }, head: 'Lay it off',
        sub: 'Boxed in, so you laid it off to your 6, arriving with a clear shot. Goal!', cam: { at: [24, 12], zoom: 1.4, tilt: .55 }, wait: 1.2 }],
      shoot: { replace: true, steps: [
        { t: .45, pass: 'them:4', tag: { 'them:4': 'BLOCK' }, head: 'Blocked', sub: 'Their 4 was right in front of you. Your 6 was arriving with a clear shot.',
          cam: { at: [26, 15], zoom: 1.55, tilt: .5 } },
        { t: 1, pass: 'them:10', air: true, wait: 1 }] }
    } },

  /* ---- 5. Defend from the front ---- */
  'Mark their 6': {
    intro: { start: { ball: 'them:1', us: { 9: [25, 26], 10: [30, 39] }, them: { 4: [26, 12], 6: [27, 33] } },
      cam: { at: [25, 12], zoom: 1.5, tilt: .5 },
      steps: [
        { t: 1.6, pass: 'them:4', pd: .1, us: { 9: [25, 21], 10: [31, 36] }, them: { 4: [25, 16], 6: [24, 30] }, tag: { 'us:9': ['PRESS', 'good'] },
          head: 'Their 4 has it, and your 9 presses', sub: 'Their 6 is free in front of your 9.', cam: { at: [25, 22], zoom: 1.45, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: .9, marks: [{ l: ['them:4', 'them:6'], c: 'bad', x: true }], tag: { 'us:10': ['MARK', 'good'], 'us:9': ['PRESS', 'good'] }, head: 'Their 6 is marked',
          sub: 'Your 9 presses their 4, and you are right behind their 6. No way to turn.', cam: { at: [25, 25], zoom: 1.4, tilt: .5 } },
        { t: 1, pass: 'them:1', head: 'Nowhere to go', sub: 'They have to go all the way back to their keeper.', wait: 1 }],
      zone1: [{ t: 1, pass: 'them:6', air: true, tag: { 'them:6': 'FREE' }, head: 'Their 6 is free', sub: 'Their 4 plays it over your 9 to their 6…', cam: { at: [25, 30], zoom: 1.4, tilt: .5 } },
        { t: 1, them: { 6: [23, 37] }, head: 'Their 6 is free', sub: '…who turns and runs at our midfield.', wait: 1 }],
      zone2: [{ t: 1, pass: 'them:6', air: true, tag: { 'them:6': 'FREE' }, head: 'Two on one', sub: 'Your 9 already had their 4, so their 6 is free…', cam: { at: [25, 30], zoom: 1.4, tilt: .5 } },
        { t: 1, them: { 6: [23, 37] }, head: 'Two on one', sub: '…and turns to run at our midfield.', wait: 1 }]
    } },

  'Shadow their 6': {
    intro: { start: { ball: 'them:4', us: { 7: [41, 30], 10: [24, 37] }, them: { 3: [36, 15], 6: [27, 31] } },
      cam: { at: [30, 16], zoom: 1.5, tilt: .5 },
      steps: [
        { t: 1.6, pass: 'them:3', pd: .1, us: { 7: [40, 26], 10: [22, 34] }, them: { 3: [37, 18], 6: [26, 28] }, tag: { 'us:7': ['PRESS', 'good'] },
          head: 'Their 3 has it on the right', sub: 'And your 7 is pressing.', cam: { at: [32, 23], zoom: 1.45, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: .9, marks: [{ l: ['them:3', 'them:6'], c: 'bad', x: true }], tag: { 'us:10': ['BLOCKING', 'good'], 'us:7': ['PRESS', 'good'] }, head: 'In the lane',
          sub: 'Your 7 presses their 3, and you stand right in the pass to their 6.', cam: { at: [31, 23], zoom: 1.45, tilt: .5 } },
        { t: 1, pass: 'them:4', head: 'Nowhere to go', sub: 'Their 3 has to go backward.', wait: 1 }],
      zone1: [{ t: 1, pass: 'them:6', head: 'Marking works', sub: 'But the ball still reaches their 6. Standing in the lane stops it sooner.',
        cam: { at: [28, 27], zoom: 1.4, tilt: .5 }, wait: 1.1 }],
      zone2: [{ t: 1, pass: 'them:6', air: true, tag: { 'them:6': 'FREE' }, head: 'Two on the ball', sub: 'Your 7 already had their 3. Now their 6 is free.',
        cam: { at: [28, 27], zoom: 1.4, tilt: .5 }, wait: 1.1 }]
    } },

  'Win it back': {
    intro: { start: { ball: 'us:10', us: { 10: [30, 26] }, them: { 6: [25, 31] } },
      cam: { at: [28, 27], zoom: 1.65, tilt: .5 },
      steps: [
        { t: .8, us: { 10: [28.5, 27.5] }, them: { 6: [26.5, 29.5] }, tag: { 'them:6': 'TACKLE' }, head: 'You run into their 6', sub: '' },
        { t: .6, pass: 'them:6', us: { 10: [31, 24] }, them: { 6: [26, 30] }, head: 'You lose it', sub: 'Their 6 takes it right off you.' },
        { t: 1, untag: true, cam: 'wide' }] },
    after: {
      zone0: [{ t: .8, us: { 6: [24, 36] }, tag: { 'us:10': ['PRESS', 'good'], 'us:6': ['PRESS', 'good'] }, head: 'Win it right back',
          sub: 'You lost it, so you hunt it back, with your 6 closing in front.', cam: { at: [26, 31], zoom: 1.55, tilt: .5 } },
        { t: .5, pass: 'us:10', tag: { 'us:10': ['WON IT', 'good'] }, wait: 1.1 }],
      zone1: [{ t: 1, pass: 'them:10', head: 'Watching', sub: 'You stood and watched, so they had time to look up and pass.', cam: { at: [23, 35], zoom: 1.35, tilt: .5 }, wait: 1.1 }],
      zone2: [{ t: 1, pass: 'them:10', head: 'Dropped off', sub: 'Running all the way back gave them time to look up and pass.', cam: { at: [23, 35], zoom: 1.35, tilt: .5 }, wait: 1.1 }]
    } },

  'Track the run': {
    intro: { start: { ball: 'them:4', us: { 10: [31, 30.5] }, them: { 3: [36, 30], 6: [26, 28.5] } },
      cam: { at: [33, 22], zoom: 1.45, tilt: .5 },
      steps: [
        { t: 1.6, pass: 'them:3', pd: .1, us: { 10: [29, 27] }, them: { 3: [40, 32], 6: [28, 32] }, head: 'Their 3 has it',
          sub: 'Watch their 6. A run is coming past you.', cam: { at: [33, 29], zoom: 1.4, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: .6, them: { 6: [27, 40] }, head: 'Run tracked', sub: 'You went with their 6 all the way…', cam: { at: [27, 43], zoom: 1.4, tilt: .5 } },
        { t: .8, pass: 'us:10', air: true, tag: { 'us:10': ['WON IT', 'good'] }, head: 'Run tracked', sub: '…so the pass into the run is yours.', wait: 1.1 }],
      zone1: [{ t: 1.1, them: { 6: [25.5, 44] }, pass: 'them:6', pd: .3, tag: { 'them:6': 'FREE' }, head: 'Left behind',
        sub: 'Their 6 ran right past you, into the space behind our midfield.', cam: { at: [27, 41], zoom: 1.35, tilt: .5 }, wait: 1.1 }],
      zone2: [{ t: 1.1, them: { 6: [25.5, 44] }, pass: 'them:6', pd: .3, tag: { 'them:6': 'FREE' }, head: 'Ball watching',
        sub: 'Your 7 had their 3. Their 6 was the danger, running into the space behind our midfield.', cam: { at: [28, 40], zoom: 1.3, tilt: .5 }, wait: 1.1 }]
    } },

  "Don't get pulled wide": {
    intro: { start: { ball: 'them:4', us: { 11: [14, 33], 10: [17, 37] }, them: { 2: [12, 20], 6: [25, 31] } },
      cam: { at: [18, 18], zoom: 1.5, tilt: .5 },
      steps: [
        { t: 1.6, pass: 'them:2', pd: .1, us: { 11: [13, 29.5], 10: [13, 35.5] }, them: { 2: [12, 24], 6: [24, 28] }, tag: { 'us:11': ['PRESS', 'good'] },
          head: 'Their 2 has it on your left', sub: 'Your 11 presses. And you drifted out wide.', cam: { at: [16, 28], zoom: 1.45, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: .9, us: { 11: [12.6, 27] }, marks: [{ l: ['them:2', 'them:6'], c: 'bad', x: true }], tag: { 'us:10': ['BLOCKING', 'good'], 'us:11': ['PRESS', 'good'] },
          head: 'Trapped on the sideline', sub: 'Your 11 presses their 2, and you block the pass into their 6.', cam: { at: [16, 26], zoom: 1.45, tilt: .5 } },
        { t: .5, pass: 'us:11', tag: { 'us:11': ['WON IT', 'good'] }, wait: 1.1 }],
      zone2: [{ t: 1, pass: 'them:6', tag: { 'them:6': 'FREE' }, head: 'Pulled wide', sub: 'Two of you out wide leaves their 6 free in the middle…',
          cam: { at: [20, 28], zoom: 1.4, tilt: .5 } },
        { t: 1, them: { 6: [24, 34] }, head: 'Pulled wide', sub: '…and their 6 turns and goes.', wait: 1 }]
    } },

  /* ---- 6. Arrive in the box ---- */
  'Back post': {
    intro: { start: { ball: 'us:7', us: { 7: [44.5, 21], 9: [28, 16], 10: [28, 24] }, them: { 4: [27, 9] } },
      cam: { at: [42, 20], zoom: 1.5, tilt: .55 },
      steps: [
        { t: 1.5, us: { 7: [44, 12], 9: [30, 9], 10: [25, 20] }, them: { 4: [28, 5.5] }, head: 'Your 7 is about to cross',
          sub: 'Your 9 attacks the near post. Where do you go?', cam: { at: [35, 12], zoom: 1.45, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: { replace: true, steps: [
        { t: 1.1, pass: 'us:10', air: true, pd: .1, head: 'Attack the back post', sub: 'Nobody was there, so you got there. The cross flies past the near post…',
          cam: { at: [24, 7], zoom: 1.35, tilt: .55 } },
        { t: .6, shot: [24, -1.2], tag: { 'us:10': ['BACK POST', 'good'] }, sub: '…and it is yours. Goal!', head: 'Attack the back post', wait: 1.2 }] },
      zone1: [{ t: 1, pass: 'them:1', air: true, head: 'Same spot as the 9', sub: 'Two of you at the near post and nobody at the back. Their keeper takes it.',
        cam: { at: [29, 6], zoom: 1.45, tilt: .55 }, wait: 1.1 }]
    } },

  'Follow the shot': {
    intro: { start: { ball: 'us:6', us: { 9: [27, 18], 10: [21, 23] } },
      cam: { at: [25, 26], zoom: 1.5, tilt: .55 },
      steps: [
        { t: 1.4, pass: 'us:9', pd: .15, us: { 9: [28, 14], 10: [19, 19] }, head: 'Your 9 is about to shoot', sub: 'Where do you go?', cam: { at: [25, 14], zoom: 1.45, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: .6, shot: [25.5, 3], head: 'Follow the shot', sub: 'The keeper can only push it out…', cam: { at: [24, 6], zoom: 1.5, tilt: .55 } },
        { t: .45, pass: 'us:10' },
        { t: .45, shot: [23, -1.2], tag: { 'us:10': ['REBOUND', 'good'] }, head: 'Follow the shot', sub: '…and you are first to the rebound. Goal!', wait: 1.2 }],
      zone1: [{ t: .6, shot: [25.5, 3], head: 'Watching', sub: 'The keeper pushes it out…', cam: { at: [24, 8], zoom: 1.45, tilt: .55 } },
        { t: .5, pass: 'them:4', head: 'Watching', sub: '…and their defenders get there first.', wait: 1.1 }]
    } },

  'Out of the way': {
    intro: { start: { ball: 'us:6', us: { 6: [25, 36], 10: [24, 24] } },
      cam: { at: [25, 32], zoom: 1.5, tilt: .55 },
      steps: [
        { t: 1.4, us: { 6: [25, 30], 10: [25, 21] }, head: 'Your 6 is about to shoot', sub: "And you're standing right in front of the 6.", cam: { at: [25, 24], zoom: 1.45, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: .7, shot: [22.5, -1.2], tag: { 'us:10': ['FOLLOW', 'good'] }, head: 'Out of the way',
        sub: 'You stepped out of the line of the shot, ready to follow it in. Goal!', cam: { at: [24, 12], zoom: 1.35, tilt: .55 }, wait: 1.2 }],
      zone1: [{ t: .7, shot: [22.5, -1.2], tag: { 'us:10': ['FOLLOW', 'good'] }, head: 'Out of the way',
        sub: 'You stepped out of the line of the shot, ready to follow it in. Goal!', cam: { at: [26, 12], zoom: 1.35, tilt: .55 }, wait: 1.2 }],
      zone2: [{ t: .45, pass: 'us:10', head: 'In the way', sub: "You're standing right in the way of your 6's shot.", cam: { at: [25, 24], zoom: 1.55, tilt: .5 }, wait: 1.2 }]
    } },

  'Run past your 9': {
    intro: { start: { ball: 'us:7', us: { 9: [25, 16.5], 10: [26, 34] }, them: { 4: [25, 11.5] } },
      cam: { at: [38, 22], zoom: 1.5, tilt: .55 },
      steps: [
        { t: 1.5, pass: 'us:9', pd: .2, us: { 9: [25, 20], 10: [26, 30] }, them: { 4: [25, 15.5] }, tag: { 'them:4': 'TIGHT' }, head: 'Your 9 holds it up',
          sub: 'Facing away from goal, with their 4 tight behind.', cam: { at: [25, 22], zoom: 1.5, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: .7, shot: [27.5, -1.2], tag: { 'us:10': ['IN ON GOAL', 'good'] }, head: 'Run past your 9',
        sub: 'Into the gap between their 4 and 3. The 9 lays it off, and you are in on goal. Goal!', cam: { at: [28, 10], zoom: 1.45, tilt: .55 }, wait: 1.2 }],
      zone2: steal('9', '4', [25, 17.5], 'Standing still', 'Your 9 needs help now, and their 4 nicks it.')
    } },
};
window.RIDDLE_LIB.withMotion(RIDDLES, MOTION);
window.RIDDLE_LIB.defineSet({ me: '10', chapters: CHAPTERS, riddles: RIDDLES });
})();
