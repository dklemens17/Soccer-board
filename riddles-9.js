/* Riddles for the 9 (striker). Format: see riddles-6.js and riddles-core.js.
   Extra flags used here:
     run       — the 3-star spot is a run made as the ball is played (offside is judged at the start)
     air       — the payoff ball is lofted (a cross or a ball over the top)
     noPayoff  — after a good move nobody passes to you (a decoy run)
*/
(function () {
const { P, FAR } = window.RIDDLE_LIB;

const CHAPTERS = [
  { name: 'Get on the ball', blurb: 'Move so your team can find you: come short, spin in behind, or make space.' },
  { name: 'Link the play', blurb: 'You have the ball up front. Lay it off, turn, or release a runner.' },
  { name: 'Finish it', blurb: 'In front of goal: shoot, square it, or go around the keeper.' },
  { name: 'Box runs', blurb: 'A cross is coming. Where should you be?' },
  { name: 'Press from the front', blurb: 'They have the ball at the back. Press smart, not just hard.' },
  { name: 'Counter', blurb: 'We just won it. Run, link, and finish fast.' }
];

const RIDDLES = [
/* ---------------- 1. Get on the ball ---------------- */
{ ch: 0, type: 'move', title: 'Come short',
  prompt: "Your 4 has the ball with time. Their defenders are sitting deep near their box. Drag the 9 to where you'll get the ball.",
  hint: 'Is the space behind their defenders, or in front of them?',
  lesson: 'Defenders sitting deep? Come short into the space in front of them. Defenders high? Run in behind.',
  us:   { 1:[25,72], 3:[11,59], 4:[25,58], 2:[39,59], 6:[21,47], 10:[16,35], 11:[6,33], 9:[26,17], 7:[44,33] },
  them: { 1:[25,3], 2:[13,12], 4:[25,11], 3:[37,12], 6:[25,30], 10:[20,41], 9:[29,50], 7:[10,40], 11:[41,40] },
  ball: { team: 'us', n: '4' },
  zones: [
    [31, 24, 4.5, 3, 'Pro spot', "Their defenders are sitting deep, so the space is in front of them. You came short into the gap where your 4 can find you, and you can turn."],
    [20, 24, 4, 3, 'Pro spot', "Their defenders are sitting deep, so the space is in front of them. You came short into the gap where your 4 can find you, and you can turn."],
    [28, 6, 4, 0, 'Offside', "You're behind their last defender. Offside! And there's no space back there anyway."],
    [26, 17, 3, 1, 'Hidden', "Standing next to their 4, the pass can't reach you."],
    [25, 40, 4.5, 1, 'Too deep', "You came so far back that you're in your own midfielders' space."]
  ],
  elsewhere: P(1, 'Not quite', "Their defenders are deep. Find the space in front of them, where your 4 can pass to you."),
  best: { kind: 'move', at: [31,24] } },

{ ch: 0, type: 'move', title: 'Spin in behind', run: true,
  prompt: 'Your 6 has the ball and is facing forward. Their defenders have pushed all the way up to halfway. Drag the 9.',
  hint: 'Where is all the open grass?',
  lesson: 'Defenders high? Run in behind them. Defenders deep? Come short.',
  us:   { 1:[25,70], 3:[12,56], 4:[25,57], 2:[38,56], 6:[24,48], 10:[19,40], 11:[6,36], 9:[27,36.5], 7:[44,36] },
  them: { 1:[25,8], 2:[12,33], 4:[24,32.5], 3:[37,33], 6:[31,42], 10:[18,48], 9:[30,54], 7:[9,44], 11:[41,44] },
  ball: { team: 'us', n: '6' }, air: true,
  zones: [
    [29, 22, 5, 3, 'Pro spot', "Their defenders pushed up, so there's 25 yards of grass behind them. You started onside and spun in behind. Your 6 can play you through."],
    [26, 43, 4, 1, 'Crowded', 'Coming short brings you right into their midfielders. The space was behind their defenders.'],
    [27, 36.5, 3, 1, 'Standing still', 'Standing still on their line is easy to mark. Make a run.']
  ],
  elsewhere: P(1, 'Not quite', 'Their defenders are high. The space is behind them, in the middle.'),
  best: { kind: 'move', at: [29,22] } },

{ ch: 0, type: 'move', title: 'Blind side',
  prompt: 'Your 11 has the ball on the left wing. Their defenders are all watching him. Drag the 9 to get free.',
  hint: 'Which way are their defenders looking? Where can’t they see?',
  lesson: "Defenders watch the ball. Move where they can't see you: behind them, on the far side.",
  us:   { 1:[25,70], 3:[13,50], 4:[25,54], 2:[37,50], 6:[24,40], 10:[18,31], 11:[8,30], 9:[22,22.5], 7:[43,26] },
  them: { 1:[25,3], 2:[13,19], 4:[24,17], 3:[36,19], 6:[25,34], 10:[28,44], 9:[30,52], 7:[11,36], 11:[40,36] },
  ball: { team: 'us', n: '11' },
  zones: [
    [32, 20.5, 3.5, 3, 'Pro spot', "Their defenders are looking at the ball on the left. You slipped behind their eyes, between their 4 and 3, and you're free."],
    [16, 23, 3, 1, 'In plain sight', "That's right where their 2 and 4 are looking. Easy to mark."],
    [30, 12, 4, 0, 'Offside', "You're behind their last defender. Offside!"],
    [22, 22.5, 2.5, 1, 'Standing still', 'Their 4 can see you and the ball at the same time.']
  ],
  elsewhere: P(1, 'Not quite', 'Find the space their defenders can’t see: on the far side of them, still onside.'),
  best: { kind: 'move', at: [32,20.5] } },

{ ch: 0, type: 'move', title: 'Stay onside', startsOffside: true,
  prompt: "Your 6 is about to play a pass forward. You're standing past their last defender. Drag the 9 to the right spot.",
  hint: 'Find their last defender. Is any part of you past him?',
  lesson: 'Stay level with their last defender until the pass is played. Then go.',
  us:   { 1:[25,70], 3:[12,56], 4:[25,57], 2:[38,56], 6:[24,44], 10:[34,34], 11:[6,30], 9:[29,20], 7:[44,30] },
  them: { 1:[25,4], 2:[13,26], 4:[25,25], 3:[37,26], 6:[19,34], 10:[28,49], 9:[31,56], 7:[9,40], 11:[41,40] },
  ball: { team: 'us', n: '6' },
  zones: [
    [29, 27.5, 2.6, 3, 'Pro spot', "Back onside, right on the shoulder of their last defender. Now the pass is legal and you can run onto it."],
    [29, 20, 3.5, 0, 'Offside', "You're still past their last defender. If the pass comes to you there, it's offside."],
    [27, 37, 4, 1, 'Too deep', 'Onside, but now you’re far from goal and the space behind them is wasted.']
  ],
  elsewhere: P(1, 'Not quite', 'Get level with their last defender: onside, but as close to goal as you can.'),
  best: { kind: 'move', at: [29,27.5] } },

{ ch: 0, type: 'move', title: 'Drag him away', noPayoff: true,
  prompt: 'Your 10 has the ball just outside their box. Their 4 is marking you tight and blocking the middle. Drag the 9.',
  hint: 'Their 4 follows you everywhere. What happens to the middle if you leave it?',
  lesson: 'Sometimes your best run is for a teammate. Drag a defender away and open space.',
  us:   { 1:[25,70], 3:[13,50], 4:[25,52], 2:[37,50], 6:[24,38], 10:[25,23], 11:[8,22], 9:[25,15.5], 7:[42,22] },
  them: { 1:[25,3], 2:[14,12], 4:[25,11.5], 3:[39,13], 6:[29,30], 10:[20,36], 9:[30,46], 7:[9,30], 11:[40,30] },
  ball: { team: 'us', n: '10' },
  follow: [{ n: '4', dy: -3.6 }],
  zones: [
    [32, 15.5, 4, 3, 'Pro spot', 'Their 4 followed you out to the side, and now the middle is open. Your 10 can drive at goal or shoot.'],
    [18, 15.5, 4, 3, 'Pro spot', 'Their 4 followed you out to the side, and now the middle is open. Your 10 can drive at goal or shoot.'],
    [25, 19.5, 2.5, 0, 'In the way', 'You came toward your 10 and brought their 4 with you. Now you’re both blocking his path.'],
    [25, 7, 3, 0, 'Offside', "You're behind their last defender. Offside!"]
  ],
  elsewhere: P(1, 'Not quite', 'Pull their 4 out of the middle so your 10 has a clear path.'),
  best: { kind: 'move', at: [32,15.5] } },

/* ---------------- 2. Link the play ---------------- */
{ ch: 1, type: 'ball', title: 'Lay it off', facing: 'back',
  prompt: "You got the ball with your back to goal. Their 4 is tight behind you. Make the pass.",
  hint: 'Who is facing their goal?',
  lesson: 'Back to goal with a defender tight on you? Lay it off to a teammate who is facing forward.',
  us:   { 1:[25,70], 3:[13,52], 4:[25,54], 2:[37,52], 6:[25,42], 10:[22,30], 11:[7,26], 9:[25,22], 7:[43,26] },
  them: { 1:[25,3], 2:[14,15], 4:[25,17.5], 3:[36,15], 6:[30,35], 10:[18,45], 9:[31,52], 7:[9,32.5], 11:[41,32.5] },
  ball: '9',
  arrows: [{ team: 'them', from: [25,15.2], to: [25,17.6] }],
  pass: {
    10: P(3, 'Pro choice', "Their 4 is tight on your back, so you don't turn. One touch to your 10, who is facing their goal."),
    6:  P(2, 'Good', 'Safe lay-off, but your 10 was closer and facing their goal.'),
    11: P(1, 'Tough pass', 'With your back to goal and a defender on you, a long pass out wide is hard to make.'),
    7:  P(1, 'Tough pass', 'With your back to goal and a defender on you, a long pass out wide is hard to make.')
  },
  otherNote: 'Lay it off short to the player facing forward.',
  shoot: P(0, 'Facing the wrong way', "You're facing your own goal with a defender on you."),
  carry: [],
  elsewhere: P(0, 'Turned into him', 'With their 4 tight on your back, turning loses the ball.'),
  best: { kind: 'pass', to: '10' } },

{ ch: 1, type: 'ball', title: 'He gave you room', facing: 'back',
  prompt: 'You got the ball with your back to goal, but their 4 stayed back. Look over your shoulder. What now?',
  hint: 'How close is their 4?',
  lesson: 'Defender standing off you? Turn and face him. Defender tight? Lay it off.',
  us:   { 1:[25,70], 3:[13,52], 4:[25,54], 2:[37,52], 6:[26,45], 10:[20,36], 11:[7,28], 9:[24,27], 7:[43,28] },
  them: { 1:[25,3], 2:[13,14], 4:[24,15], 3:[36,14], 6:[31,38], 10:[17,48], 9:[31,54], 7:[9,36], 11:[41,36] },
  ball: '9',
  pass: {
    10: P(2, 'Good', 'Safe lay-off, but their 4 gave you time to turn and face goal yourself.'),
    6:  P(2, 'Good', 'Safe, but their 4 gave you time to turn and face goal yourself.')
  },
  otherNote: 'Their 4 stayed back. You had time to turn.',
  shoot: P(0, 'Facing the wrong way', 'Turn first. You can’t shoot facing your own goal.'),
  carry: [[25, 20.5, 4.5, 3, 'Pro choice', 'Their 4 gave you room, so you turned and faced him. Now you can run at him, pass, or shoot.'],
          [24, 16.5, 2.4, 0, 'Into him', 'You dribbled straight into their 4.']],
  elsewhere: P(1, 'Not quite', 'Turn toward their goal. You had time.'),
  best: { kind: 'carry', at: [25,20.5] } },

{ ch: 1, type: 'ball', title: 'Into his path', facing: 'back',
  prompt: "Your back is to goal and their 4 is tight. Your 10 is sprinting past you on the right. Make the pass.",
  hint: 'Where will your 10 be when the ball gets there?',
  lesson: 'Teammate running past you? Lay it into the space in front of him, not to where he was.',
  us:   { 1:[25,70], 3:[13,52], 4:[25,54], 2:[37,52], 6:[25,40], 10:[29,28], 11:[7,24], 9:[25,22], 7:[44,26] },
  them: { 1:[25,3], 2:[14,14], 4:[25,17.5], 3:[39,14], 6:[19,34], 10:[17,45], 9:[31,52], 7:[9,31], 11:[42,32] },
  ball: '9',
  arrows: [{ team: 'us', from: [29.5,27], to: [32.5,21.5], dash: 1 }],
  pass: {
    10: P(1, 'Behind him', "He's sprinting past you. A pass to where he is now arrives behind him."),
    6:  P(2, 'Good', 'Safe, but your 10 was running into space in front of you.')
  },
  lead: [
    [32.5, 22.5, 3.2, 3, 'Pro choice', 'You laid it into the space in front of your 10. He runs onto it facing goal, past their 4.', '10'],
    [33, 13, 3, 1, 'Overhit', 'Too far. Their 3 cuts across and gets it.', '10', '3']
  ],
  otherNote: 'Your 10 is running past you. Use him.',
  shoot: P(0, 'Facing the wrong way', "You're facing your own goal with a defender on you."),
  carry: [],
  elsewhere: P(0, 'Turned into him', 'With their 4 tight on your back, turning loses the ball.'),
  best: { kind: 'pass', to: '10', at: [32.5,22.5] } },

{ ch: 1, type: 'ball', title: 'Spread it wide',
  prompt: 'You dropped into midfield and turned with the ball. Who do you find?',
  hint: 'Look wide. Who has open grass in front of him?',
  lesson: 'Facing forward in the middle? Look wide. If your winger has grass in front of him, play it into his path.',
  us:   { 1:[25,70], 3:[13,55], 4:[25,57], 2:[37,55], 6:[24,46], 10:[30,26], 11:[6,25], 9:[24,34], 7:[44,25] },
  them: { 1:[25,3], 2:[15,17], 4:[25,16], 3:[36,17], 6:[29,21.5], 10:[20,41], 9:[29,50], 7:[10,36], 11:[42,30] },
  ball: '9',
  arrows: [{ team: 'them', from: [20,41], to: [22,38.5] }],
  pass: {
    11: P(2, 'Good', "Good idea, but there's open grass in front of him. Play it into that space so he can run onto it."),
    10: P(1, 'Marked', 'Their 6 is right on your 10.'),
    7:  P(1, 'Marked', 'Their 11 is close to your 7. The left side is wide open.')
  },
  lead: [
    [5.5, 18, 4, 3, 'Pro choice', "You played it into the open grass in front of your 11. He runs onto it at full speed.", '11'],
    [8, 8, 3.5, 1, 'Overhit', 'Too far. Their 2 or their keeper gets there first.', '11', '2']
  ],
  shoot: FAR,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Their 10 is chasing you. Move it on with a pass.'),
  best: { kind: 'pass', to: '11', at: [5.5,18] } },

{ ch: 1, type: 'ball', title: 'Release the runner',
  prompt: "You turned in midfield. Their defenders are high, and your 11 is already sprinting in behind them. Make the pass.",
  hint: 'Pass to where he will be, not where he is.',
  lesson: 'When a teammate is already sprinting in behind, pass into the space in front of him.',
  us:   { 1:[25,70], 3:[13,55], 4:[25,57], 2:[37,55], 6:[25,44], 10:[31,27], 11:[9,24], 9:[25,31], 7:[43,27] },
  them: { 1:[25,4], 2:[14,22.5], 4:[25,22], 3:[36,22.5], 6:[28,36.5], 10:[18,44], 9:[31,51], 7:[8,34], 11:[42,33] },
  ball: '9',
  arrows: [{ team: 'us', from: [9.3,22], to: [11,13], dash: 1 }, { team: 'them', from: [28,36.5], to: [26.6,34] }],
  pass: {
    11: P(1, 'Behind him', "He's already sprinting. A pass to where he is now arrives behind him."),
    7:  P(2, 'Good', 'Open, but your 11 was running in behind them. That was the killer pass.'),
    10: P(1, 'Marked', 'Their 3 and 4 are close to your 10.')
  },
  lead: [
    [11, 12.5, 4.5, 3, 'Pro choice', "You put it into the space in front of your 11. He's in behind their defenders with a run at goal.", '11', null, true],
    [15, 4, 3, 1, 'Overhit', 'Too long. Their keeper comes out and collects it.', '11', '1']
  ],
  shoot: FAR,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Their 6 is chasing you. Use the run in behind.'),
  best: { kind: 'pass', to: '11', at: [11,12.5] } },

/* ---------------- 3. Finish it ---------------- */
{ ch: 2, type: 'ball', title: 'Hit the target',
  prompt: "You're 14 yards out, in the middle, and their 4 is chasing you. What do you do?",
  hint: 'Can you see the goal?',
  lesson: 'In the middle, in range, with a clear path? Shoot, and hit the target.',
  us:   { 1:[25,70], 3:[13,45], 4:[25,47], 2:[37,45], 6:[25,36], 10:[30,24], 11:[8,18], 9:[24,14], 7:[42,18] },
  them: { 1:[25,2], 2:[14,9], 4:[26,19.5], 3:[37,10], 6:[31,29], 10:[19,38], 9:[30,47], 7:[8,26], 11:[42,26] },
  ball: '9',
  arrows: [{ team: 'them', from: [26.5,21.5], to: [25.5,18.4] }],
  pass: {
    10: P(1, 'Backwards', "You were in the best shooting spot on the field. Passing back wastes it."),
    11: P(1, 'Too late', 'You were in the best shooting spot. Passing wide wastes it.'),
    7:  P(1, 'Too late', 'You were in the best shooting spot. Passing wide wastes it.')
  },
  shoot: P(3, 'Pro choice', 'Central, 14 yards out, nobody in the way. You hit the target, low and hard.'),
  carry: [[24, 9, 3, 2, 'Okay', 'Getting closer works, but their 4 is chasing you. Shoot early.']],
  elsewhere: P(1, 'Not quite', 'Their 4 is catching up. Every touch gives him time. Shoot!'),
  best: { kind: 'shoot' } },

{ ch: 2, type: 'ball', title: 'Keeper came out',
  prompt: "You're in the box at a tight angle and their keeper is rushing out at you. Look across.",
  hint: 'Is anyone free on the far side?',
  lesson: 'Keeper coming out at a tight angle? Look across. A teammate may have an open goal.',
  us:   { 1:[25,70], 3:[13,45], 4:[25,47], 2:[37,45], 6:[24,32], 10:[18,21], 11:[6,22], 9:[15,9], 7:[32,9.5] },
  them: { 1:[19,4], 2:[10,14], 4:[23,14], 3:[38,12], 6:[23,26], 10:[20,34], 9:[30,46], 7:[8,29], 11:[40,24] },
  ball: '9',
  arrows: [{ team: 'them', from: [21.5,2.6], to: [19.6,3.7] }],
  pass: {
    7:  P(3, 'Pro choice', 'Their keeper came out to you, so you squared it to your 7 for an easy finish.'),
    10: P(2, 'Good', 'A cutback works, but your 7 had a tap-in.')
  },
  shoot: P(1, 'Tight angle', 'From that angle the keeper covers the near post. Your 7 had an open goal.', { end: [19,4.6] }),
  carry: [],
  elsewhere: P(1, 'Not quite', 'The keeper is closing you down. Look across the box.'),
  best: { kind: 'pass', to: '7' } },

{ ch: 2, type: 'ball', title: 'Go around him',
  prompt: "You're through on goal and their keeper is rushing straight at you. What do you do?",
  hint: 'How close is he? What happens if you shoot right now?',
  lesson: 'Keeper rushing at you? Go around him. Keeper staying home? Pick a corner and place it.',
  us:   { 1:[25,70], 3:[13,48], 4:[25,50], 2:[37,48], 6:[24,38], 10:[20,28], 11:[8,24], 9:[24,17], 7:[42,24] },
  them: { 1:[24.5,10.5], 2:[12,20], 4:[26,22.5], 3:[38,20], 6:[30,32], 10:[17,40], 9:[30,48], 7:[8,31], 11:[42,32] },
  ball: '9',
  arrows: [{ team: 'them', from: [25,5], to: [24.7,9.3] }],
  pass: {},
  otherNote: "You're through on goal. Finish it yourself.",
  shoot: P(1, 'Saved', "He's right on top of you, so the shot hits him. When the keeper rushes out, go around him.", { end: [24.5,11.5] }),
  carry: [[31, 12, 3, 3, 'Pro choice', 'He rushed out and committed himself, so you went around him. Open goal!'],
          [18, 12, 3, 3, 'Pro choice', 'He rushed out and committed himself, so you went around him. Open goal!'],
          [24.5, 12.5, 2.2, 0, 'Into the keeper', 'You dribbled straight into him.']],
  elsewhere: P(1, 'Not quite', 'Their 4 is chasing. Go around the keeper, to one side.'),
  best: { kind: 'carry', at: [31,12] } },

{ ch: 2, type: 'ball', title: 'Place it',
  prompt: "You're through on goal. Their keeper stayed on his line. What do you do?",
  hint: 'He stayed home. Where is the goal open?',
  lesson: 'Keeper staying on his line? Pick a corner and place it. Keeper rushing out? Go around him.',
  us:   { 1:[25,70], 3:[13,48], 4:[25,50], 2:[37,48], 6:[24,36], 10:[19,27], 11:[8,22], 9:[25,13], 7:[42,22] },
  them: { 1:[25,1.6], 2:[13,19], 4:[27,18], 3:[38,18], 6:[30,30], 10:[17,38], 9:[30,47], 7:[8,30], 11:[42,30] },
  ball: '9',
  arrows: [{ team: 'them', from: [28,21], to: [27.3,18.6] }],
  pass: {},
  otherNote: "You're through on goal. Finish it yourself.",
  shoot: P(3, 'Pro choice', 'He stayed on his line, so you picked a corner and placed it low, past his reach.', { end: [22.6,-1.2] }),
  carry: [[25, 8, 3, 2, 'Okay', 'Getting closer works, but their 4 is chasing. Place it before he catches you.']],
  elsewhere: P(1, 'Not quite', "Every touch lets their 4 catch up. You're in range: place it."),
  best: { kind: 'shoot' } },

{ ch: 2, type: 'ball', title: "Don't be greedy",
  prompt: "You're in the box, but their 4 is right between you and the goal. Look up before you shoot.",
  hint: 'Can your shot get past him? Who is free?',
  lesson: 'Shot blocked and a teammate wide open? Pass it in.',
  us:   { 1:[25,70], 3:[13,45], 4:[25,47], 2:[37,45], 6:[24,32], 10:[27,21], 11:[17,10.5], 9:[31,10], 7:[44,18] },
  them: { 1:[26,2], 2:[11,15], 4:[29,6.5], 3:[37,8], 6:[31,25], 10:[20,34], 9:[31,47.5], 7:[8,24], 11:[40,26] },
  ball: '9',
  pass: {
    11: P(3, 'Pro choice', "Their 4 is blocking your shot, and your 11 is alone at the back post. You squared it for a tap-in."),
    10: P(2, 'Good', 'A safe cutback, but your 11 had an easier chance.')
  },
  shoot: P(1, 'Blocked', 'Their 4 was right in the way. Your 11 was wide open.', { end: [29,7.6] }),
  carry: [],
  elsewhere: P(1, 'Not quite', 'Dribbling into their 4 when your 11 is free?'),
  best: { kind: 'pass', to: '11' } },

/* ---------------- 4. Box runs ---------------- */
{ ch: 3, type: 'move', title: 'Near post', run: true,
  prompt: 'Your 7 is about to cross from the right. Your 11 is at the back post. Drag the 9 to attack the cross.',
  hint: 'Your 11 has the back post covered. Where should you go?',
  lesson: 'On a cross, the 9 attacks the near post. Get in front of your defender.',
  us:   { 1:[25,68], 3:[13,42], 4:[25,44], 2:[37,42], 6:[26,28], 10:[30,20], 11:[14,10], 9:[23,16], 7:[44,12] },
  them: { 1:[25,2.2], 2:[16,6], 4:[25,10], 3:[41,16], 6:[33,24], 10:[22,30], 9:[31,45], 7:[10,24], 11:[40,28] },
  ball: { team: 'us', n: '7' }, air: true,
  zones: [
    [30, 6, 3, 3, 'Pro spot', 'You attacked the near post, in front of their 4. If the cross comes in low and hard, you get there first.'],
    [14, 6.5, 3, 1, 'Same spot as the 11', 'Your 11 is already at the back post. Two of you there means nobody at the near post.'],
    [24, 11, 2.5, 1, 'Standing still', 'Waiting on the penalty spot makes it easy for their 4 to mark you.'],
    [24, 19, 3, 1, 'Too far out', 'That’s too far from goal for the 9. Get into the box.']
  ],
  elsewhere: P(1, 'Not quite', 'Attack the near post, in front of your defender.'),
  best: { kind: 'move', at: [30,6] } },

{ ch: 3, type: 'move', title: 'Back post', run: true,
  prompt: 'Your 11 is crossing from the left. Their defenders are all crowding the near post. Drag the 9.',
  hint: 'Where are their defenders? Where are they NOT?',
  lesson: 'If the defenders all crowd the near post, the back post is open.',
  us:   { 1:[25,68], 3:[13,42], 4:[25,44], 2:[37,42], 6:[24,28], 10:[20,21], 11:[6,12], 9:[24,13], 7:[42,22] },
  them: { 1:[22,2.5], 2:[10,17], 4:[20,7.5], 3:[40,15], 6:[20,25], 10:[28,32], 9:[31,45], 7:[10,26], 11:[40,28] },
  ball: { team: 'us', n: '11' }, air: true,
  zones: [
    [32, 7, 3.5, 3, 'Pro spot', "Their defenders are all on the near side, watching the ball. You drifted to the back post where nobody is."],
    [19.5, 4, 3, 1, 'Into the crowd', "That's where all their defenders are. The cross won't reach you."],
    [24, 13, 2.5, 1, 'Standing still', 'Standing still makes you easy to mark.']
  ],
  elsewhere: P(1, 'Not quite', 'Find the space at the back post.'),
  best: { kind: 'move', at: [32,7] } },

{ ch: 3, type: 'move', title: 'Onside for the cross', startsOffside: true,
  prompt: "Your 7 is about to cross. You're standing past their last defender. Drag the 9.",
  hint: 'Is any part of you past their last defender?',
  lesson: 'Before the cross, get back level with their last defender. Then attack the ball.',
  us:   { 1:[25,68], 3:[13,42], 4:[25,44], 2:[37,42], 6:[24,30], 10:[18,22], 11:[12,14], 9:[29,4], 7:[44,14] },
  them: { 1:[25,1.8], 2:[16,9], 4:[23,9], 3:[35,9.5], 6:[21,26], 10:[29,32], 9:[31,47], 7:[10,24], 11:[40,22] },
  ball: { team: 'us', n: '7' }, air: true,
  zones: [
    [29, 11.5, 2.6, 3, 'Pro spot', "Back onside, level with their last defender. Now attack the ball when it's crossed."],
    [29, 4, 3, 0, 'Offside', "You're past their last defender. If the cross comes to you, it's offside."],
    [27, 20, 3, 1, 'Too far out', "Onside, but too far from goal to finish."]
  ],
  elsewhere: P(1, 'Not quite', 'Get back level with their last defender, close to goal.'),
  best: { kind: 'move', at: [29,11.5] } },

{ ch: 3, type: 'move', title: 'Follow the shot', noPayoff: true,
  prompt: 'Your 10 is about to shoot from the edge of the box. Drag the 9.',
  hint: 'What if the keeper can’t hold it?',
  lesson: "Follow every shot. Keepers spill more than you think.",
  us:   { 1:[25,68], 3:[13,44], 4:[25,46], 2:[37,44], 6:[24,32], 10:[24,20], 11:[8,16], 9:[31,12], 7:[43,18] },
  them: { 1:[25,2.2], 2:[15,9], 4:[23,10], 3:[36,9], 6:[27,25.5], 10:[20,34], 9:[30,46], 7:[9,26], 11:[41,26] },
  ball: { team: 'us', n: '10' },
  arrows: [{ team: 'us', from: [24.2,18.5], to: [24.9,2.5], dash: 1 }],
  zones: [
    [28, 5.5, 3, 3, 'Pro spot', "You followed the shot toward goal. If the keeper spills it, you're first to the rebound."],
    [31, 12, 3, 1, 'Watching', "You stood and watched. If he spills it, their defenders get there first."],
    [24, 13, 2.5, 1, 'In the way', "You ran into the path of your 10's shot."]
  ],
  elsewhere: P(1, 'Not quite', 'Follow the shot toward the keeper, ready for a rebound.'),
  best: { kind: 'move', at: [28,5.5] } },

{ ch: 3, type: 'move', title: 'Take him with you', run: true,
  prompt: 'Your 7 is at the end line about to pull it back. Your 10 is waiting at the edge of the box. Their 4 is marking you in the middle. Drag the 9.',
  hint: 'Their 4 follows you. Who gets free if you take him away?',
  lesson: 'Your run can make space for someone else. Drag your defender away from the danger zone.',
  us:   { 1:[25,68], 3:[13,42], 4:[25,44], 2:[37,42], 6:[24,28], 10:[26,20], 11:[14,12], 9:[25,13], 7:[44,5] },
  them: { 1:[25,2.2], 2:[15,7], 4:[25,9], 3:[40,13], 6:[31,25], 10:[20,32], 9:[31,45], 7:[8,24], 11:[41,22] },
  ball: { team: 'us', n: '7' },
  follow: [{ n: '4', dy: -2.8 }], payoff: { to: '10' },
  zones: [
    [30.5, 6, 3, 3, 'Pro spot', 'Your run dragged their 4 to the near post, so the pullback to your 10 is wide open.'],
    [25, 13, 2.5, 1, 'Standing still', 'You stayed in the middle, so their 4 stays there too and blocks the pullback.'],
    [16, 6, 3, 1, 'Crowded', 'Your 11 is already at the back post.']
  ],
  elsewhere: P(1, 'Not quite', 'Take their 4 away from the middle so the pullback to your 10 is open.'),
  best: { kind: 'move', at: [30.5,6] } },

/* ---------------- 5. Press from the front ---------------- */
{ ch: 4, type: 'move', title: 'Curve your run', kind: 'Pressing',
  prompt: 'Their 4 has the ball. Their 2 is free out wide on your left, and your 7 is ready on the other side. Drag the 9 to press.',
  hint: 'Which pass can you block while you press?',
  lesson: 'Press with a curve: block the pass to one side and make them play where your team is waiting.',
  us:   { 1:[25,70], 3:[12,56], 4:[25,58], 2:[38,56], 6:[24,44], 10:[25,33], 11:[10,29], 9:[31,25], 7:[40,28] },
  them: { 1:[25,3], 2:[12,16], 4:[25,14], 3:[38,16], 6:[25,28.5], 10:[19,40], 9:[27,52], 7:[10,40], 11:[40,40] },
  ball: { team: 'them', n: '4' },
  zones: [
    [20, 16.8, 3, 3, 'Pro spot', "You pressed with a curve and blocked the pass to their 2. Now he has to go the other way, where your 7 is waiting."],
    [25, 19, 2.5, 2, 'Good', 'Good pressure, but straight at him leaves their 2 free for an easy pass.'],
    [14, 18.5, 3, 1, 'Wrong player', 'Their 4 has the ball. Now he just passes to their 3.'],
    [31, 25, 3, 1, 'Too far', 'From there you’re not pressing anyone.']
  ],
  elsewhere: P(1, 'Not quite', 'Press their 4, but come from the side that blocks the pass to their 2.'),
  best: { kind: 'move', at: [20,16.8] } },

{ ch: 4, type: 'move', title: 'Pounce', kind: 'Pressing',
  prompt: 'Their 4 got the ball with his back to you, facing his own goal. Drag the 9.',
  hint: 'He can’t see you. How fast can you get there?',
  lesson: "A defender with his back to you is in trouble. Close him down fast before he turns.",
  us:   { 1:[25,70], 3:[12,56], 4:[25,58], 2:[38,56], 6:[24,44], 10:[23,32], 11:[10,30], 9:[30,22], 7:[40,30] },
  them: { 1:[25,3], 2:[12,17], 4:[24,13], 3:[37,17], 6:[25,27], 10:[19,40], 9:[27,52], 7:[10,40], 11:[40,40] },
  ball: { team: 'them', n: '4' },
  zones: [
    [25.5, 16.8, 2.4, 3, 'Pro spot', "His back is to you, so you closed him down fast. He can't turn, and he might give it away."],
    [30, 22, 3, 1, 'Watching', 'You gave him time to turn around and pass.'],
    [25, 26, 3, 1, 'Too far', 'From there you’re not putting him under any pressure.']
  ],
  elsewhere: P(1, 'Not quite', 'Get right up behind him before he turns.'),
  best: { kind: 'move', at: [25.5,16.8] } },

{ ch: 4, type: 'move', title: "Don't press alone", kind: 'Pressing',
  prompt: 'Their 4 has the ball. Your 10 and wingers have dropped back into midfield. Drag the 9.',
  hint: 'Is your team pressing with you? If not, what can you block?',
  lesson: "If your team isn't pressing with you, don't press alone. Block the pass into the middle.",
  us:   { 1:[25,70], 3:[12,56], 4:[25,58], 2:[38,56], 6:[24,45], 10:[24,34], 11:[12,35], 9:[34,22], 7:[38,35] },
  them: { 1:[25,3], 2:[12,17], 4:[25,14], 3:[38,17], 6:[25,27], 10:[19,42], 9:[28,52], 7:[9,44], 11:[41,44] },
  ball: { team: 'them', n: '4' },
  zones: [
    [25, 21.5, 3, 3, 'Pro spot', "Your team is waiting in midfield, so you didn't press alone. You stood in front of their 6 so their 4 can't pass into the middle."],
    [25, 17.5, 2.4, 1, 'Pressing alone', 'Pressing alone just tires you out. He passes around you to their 2 or 3.'],
    [34, 22, 3, 1, 'Out of the play', 'From there their 4 can pass straight into their 6.']
  ],
  elsewhere: P(1, 'Not quite', 'Block the pass from their 4 into their 6.'),
  best: { kind: 'move', at: [25,21.5] } },

{ ch: 4, type: 'move', title: 'Lock them on one side', kind: 'Pressing',
  prompt: 'Their 2 has the ball on your left. Your 11 is pressing him. Drag the 9.',
  hint: 'Your 11 is on the ball. What pass would let them escape?',
  lesson: 'When your team presses on one side, block the pass back across. Keep them trapped.',
  us:   { 1:[25,70], 3:[12,56], 4:[25,58], 2:[38,56], 6:[22,44], 10:[23,35], 11:[13,28], 9:[32,24], 7:[39,30] },
  them: { 1:[25,3], 2:[12,22], 4:[25,16], 3:[38,18], 6:[22,30], 10:[18,42], 9:[28,52], 7:[9,40], 11:[41,42] },
  ball: { team: 'them', n: '2' },
  arrows: [{ team: 'us', from: [13,29], to: [12.6,26] }],
  zones: [
    [19, 19.3, 2.8, 3, 'Pro spot', "You blocked the pass back across to their 4. Their 2 is trapped by the sideline and your 11."],
    [25, 20, 2.4, 2, 'Good', 'Close to their 4, but their 2 can still pass across to him.'],
    [32, 24, 3, 1, 'Too far', 'Their 2 switches it to their 4 and they escape the press.']
  ],
  elsewhere: P(1, 'Not quite', 'Stand in the pass from their 2 to their 4.'),
  best: { kind: 'move', at: [19,19.3] } },

{ ch: 4, type: 'move', title: 'Press the keeper', kind: 'Pressing',
  prompt: 'They passed back to their keeper. Their 4 and 3 split wide. Your 7 is near their 3. Drag the 9.',
  hint: 'Your 7 has one defender. Which one is yours?',
  lesson: 'Press the keeper with a curve. Cut off one defender and let your teammate take the other.',
  us:   { 1:[25,70], 3:[12,56], 4:[25,58], 2:[38,56], 6:[24,44], 10:[25,32], 11:[12,27], 9:[27,21], 7:[37,22] },
  them: { 1:[25,5.5], 2:[8,22], 4:[16,10], 3:[34,10], 6:[25,25], 10:[19,40], 9:[28,52], 7:[9,40], 11:[41,40] },
  ball: { team: 'them', n: '1' },
  zones: [
    [20.5, 8.7, 2.4, 3, 'Pro spot', "You curved your run to cut off their 4. The keeper can only go to their 3, and your 7 is waiting."],
    [25, 10.5, 2.4, 2, 'Good', 'Good pressure, but straight at him lets him pass to either defender.'],
    [27, 21, 3, 1, 'Too far', 'From there the keeper has all the time he wants.']
  ],
  elsewhere: P(1, 'Not quite', 'Press the keeper, curving to block the pass to their 4.'),
  best: { kind: 'move', at: [20.5,8.7] } },

/* ---------------- 6. Counter ---------------- */
{ ch: 5, type: 'move', title: 'Run the channel', run: true,
  prompt: 'Your 6 just won the ball. Their defenders are running back. Drag the 9.',
  hint: 'Run at a defender, or between two of them?',
  lesson: 'On the counter, run between two defenders, in the channel. Not straight at one.',
  us:   { 1:[25,70], 3:[12,58], 4:[25,59], 2:[38,58], 6:[25,46], 10:[19,40], 11:[7,34], 9:[25,32], 7:[43,34] },
  them: { 1:[25,4], 2:[14,25], 4:[25,24], 3:[35,26], 6:[30,48], 10:[21,52], 9:[29,56], 7:[10,44], 11:[41,46] },
  ball: { team: 'us', n: '6' },
  zones: [
    [30, 18, 3.5, 3, 'Pro spot', 'You ran into the channel between their 4 and 3. Neither one knows who should take you.'],
    [19.5, 18, 3.5, 3, 'Pro spot', 'You ran into the channel between their 2 and 4. Neither one knows who should take you.'],
    [25, 22, 2.4, 1, 'Into him', 'Running straight at their 4 makes him easy to pick you up.'],
    [25, 32, 3, 1, 'Standing still', "It's a counterattack. Run!"]
  ],
  elsewhere: P(1, 'Not quite', 'Run between two of their defenders.'),
  best: { kind: 'move', at: [30,18] } },

{ ch: 5, type: 'move', title: 'Help him first',
  prompt: "Your 6 has the ball, but their 10 is all over him. He can't look up. Drag the 9.",
  hint: 'Can he see a run in behind right now?',
  lesson: 'Teammate under pressure? Come short and help. Teammate with time? Run in behind.',
  us:   { 1:[25,70], 3:[12,58], 4:[25,59], 2:[38,58], 6:[25,46], 10:[33,31], 11:[7,32], 9:[26,26], 7:[44,32] },
  them: { 1:[25,4], 2:[13,20], 4:[25,20], 3:[37,20], 6:[30,36], 10:[21,48.5], 9:[29,55], 7:[10,42], 11:[41,44] },
  ball: { team: 'us', n: '6' },
  arrows: [{ team: 'them', from: [19.5,49.3], to: [22.2,47.6] }],
  zones: [
    [24, 33.5, 3.5, 3, 'Pro spot', "Your 6 is under pressure and can't look up, so you came short and gave him an easy pass."],
    [27, 14, 4, 1, 'Too early', "He can't see your run with a defender on him. Help him first."],
    [26, 26, 2.5, 1, 'Standing still', 'He needs help right now.']
  ],
  elsewhere: P(1, 'Not quite', 'Come short so your 6 has an easy pass.'),
  best: { kind: 'move', at: [24,33.5] } },

{ ch: 5, type: 'ball', title: 'Two against one',
  prompt: "Counterattack! Their 4 has stepped up to stop you, and your 7 is sprinting down the right. What now?",
  hint: 'Their 4 came to you. Who did he leave?',
  lesson: '2 v 1: when the defender comes to you, pass to the free teammate, into his path.',
  us:   { 1:[25,70], 3:[13,56], 4:[25,57], 2:[37,56], 6:[25,44], 10:[20,36], 11:[10,28], 9:[24,26], 7:[36,26] },
  them: { 1:[25,4], 2:[13,22], 4:[24,21], 3:[40,32], 6:[28,46], 10:[18,48], 9:[30,55], 7:[9,40], 11:[42,42] },
  ball: '9',
  arrows: [{ team: 'us', from: [36.3,24.5], to: [36.7,16.5], dash: 1 }, { team: 'them', from: [24,19.3], to: [24,21.6] }],
  pass: {
    7:  P(2, 'Good', 'Right idea, but play it in front of him so he runs onto it without slowing down.'),
    11: P(1, 'Marked', 'Their 2 is near your 11, and your 7 was free.')
  },
  lead: [
    [36, 15, 4, 3, 'Pro choice', 'Their 4 came to you, so you slipped it into the space in front of your 7. He is through on goal.', '7', null, true],
    [37, 6, 3, 1, 'Overhit', 'Too long. Their keeper comes out and gets it.', '7', '1']
  ],
  shoot: P(0, 'Out of range', 'Still 26 yards out, with their 4 right in front of you.'),
  carry: [[24, 18.5, 2.6, 0, 'Into him', 'He already stepped up to you. Dribbling into him loses it.']],
  elsewhere: P(1, 'Not quite', 'Their 4 committed to you. Use your 7.'),
  best: { kind: 'pass', to: '7', at: [36,15] } },

{ ch: 5, type: 'ball', title: 'Find the trailer',
  prompt: "Counterattack! You're at the edge of the box, but their 4 is blocking your shot. Your 10 is running up behind you.",
  hint: 'Look back. Is anyone free?',
  lesson: 'Shot blocked? Look back. A teammate arriving behind you is often free.',
  us:   { 1:[25,70], 3:[13,50], 4:[25,52], 2:[37,50], 6:[25,38], 10:[23,22], 11:[9,22], 9:[30,14], 7:[44,22] },
  them: { 1:[25,2.5], 2:[14,16], 4:[27.5,10], 3:[37,13], 6:[26,31], 10:[19,40], 9:[30,50], 7:[9,30], 11:[41,30] },
  ball: '9',
  pass: {
    10: P(3, 'Pro choice', "Their 4 blocked your shot, so you laid it back to your 10. He's arriving unmarked with a clear shot."),
    7:  P(1, 'Wide', 'Out wide gives their defenders time to get back. Your 10 was free in the middle.')
  },
  shoot: P(1, 'Blocked', 'Their 4 was right in the way. Your 10 was free behind you.', { end: [27.5,11] }),
  carry: [],
  elsewhere: P(1, 'Not quite', 'Dribbling into their 4 when your 10 is free?'),
  best: { kind: 'pass', to: '10' } },

{ ch: 5, type: 'ball', title: 'Across the keeper',
  prompt: "You're through on goal from the right side. Their keeper is guarding the near post. Your 11 is marked.",
  hint: 'Which side of the goal is he guarding?',
  lesson: 'From an angle, the keeper guards the near post. Shoot across him to the far post.',
  us:   { 1:[25,70], 3:[13,48], 4:[25,50], 2:[37,48], 6:[25,34], 10:[24,22], 11:[17,9], 9:[34,10], 7:[44,22] },
  them: { 1:[27.5,3.2], 2:[15,4.5], 4:[36,15.5], 3:[40,9], 6:[28,26], 10:[19,36], 9:[30,47], 7:[9,30], 11:[41,30] },
  ball: '9',
  pass: {
    11: P(1, 'Marked', 'Their 2 is on your 11, and you had the shot.'),
    10: P(1, 'Backwards', 'Back to the edge of the box when you were through on goal?')
  },
  shoot: P(3, 'Pro choice', 'The keeper was guarding the near post, so you shot across him into the far corner.', { end: [22.6,-1.2] }),
  carry: [],
  elsewhere: P(1, 'Not quite', "Their 4 is chasing. You're in range: shoot across the keeper."),
  best: { kind: 'shoot' } }
];

window.RIDDLE_LIB.defineSet({ me: '9', chapters: CHAPTERS, riddles: RIDDLES });
})();
