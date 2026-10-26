/* Riddles for the wingers. Written for the 11 on the left; the 7's set is the mirror image.
   Side-specific words use the placeholders described in riddles-core.js. */
(function () {
const { P, FAR } = window.RIDDLE_LIB;

const CHAPTERS = [
  { name: 'Width and position', blurb: 'Where should a winger be when we have the ball?' },
  { name: 'Make the run', blurb: 'Run in behind, come short, or move where they can’t see you.' },
  { name: 'Take on your defender', blurb: 'You have the ball on the wing. Dribble, set it, or play the overlap.' },
  { name: 'Final ball', blurb: 'Cutback, near post, far post, or shoot?' },
  { name: 'Defend your side', blurb: 'They have the ball. Press, track and tuck in.' },
  { name: 'Counter', blurb: 'We just won it. Run, carry, and finish.' }
];

const RIDDLES = [
/* ---------------- 1. Width and position ---------------- */
{ ch: 0, type: 'move', title: 'Stay wide',
  prompt: 'Your {3} has the ball. You drifted inside next to your 10. Drag the {11}.',
  hint: 'Who is using the space by the sideline?',
  lesson: 'When we build from the back, wingers stay wide. Width makes space for everyone.',
  us:   { 1:[25,70], 3:[12,57], 4:[25,58], 2:[38,57], 6:[24,46], 10:[22,33], 11:[16,30], 9:[27.5,19], 7:[45,30] },
  them: { 1:[25,3], 2:[12,19], 4:[25,15], 3:[38,19], 6:[25,29], 10:[19,42], 9:[28,52], 7:[14,42.5], 11:[41,42] },
  ball: { team: 'us', n: '3' },
  zones: [
    [4, 30, 3.5, 3, 'Pro spot', 'Wide on the touchline, you stretch their defense and give your {3} an easy pass up the line.'],
    [16, 30, 3, 1, 'Too narrow', "You're crowding your 10 in the middle."],
    [5, 13, 3.5, 0, 'Offside', "You're past their last defender. Offside!"],
    [20, 42, 3.5, 1, 'Too deep', 'Too deep and too narrow. Get wide and high.']
  ],
  elsewhere: P(1, 'Not quite', 'Get wide, right by the touchline.'),
  best: { kind: 'move', at: [4,30] } },

{ ch: 0, type: 'move', title: 'Attack the back post', run: true, air: true,
  prompt: 'Your {7} is about to cross from the other wing. You are out wide on the far side. Drag the {11}.',
  hint: 'Where do crosses land when they fly past everyone?',
  lesson: 'Ball on the other wing? Come inside and attack the back post.',
  us:   { 1:[25,68], 3:[13,44], 4:[25,46], 2:[37,44], 6:[24,32], 10:[28,22], 11:[5,30], 9:[27,12], 7:[44,18] },
  them: { 1:[25,2.5], 2:[12,12], 4:[26,8.5], 3:[40,13], 6:[31,26], 10:[20,34], 9:[30,48], 7:[10,38], 11:[41,28] },
  ball: { team: 'us', n: '7' },
  zones: [
    [17, 7, 3.5, 3, 'Pro spot', 'The ball is on the far side, so you came inside to attack the back post. Crosses that fly past everyone land there.'],
    [5, 30, 3, 1, 'Too wide', 'Out on the far touchline you are no threat to a cross.'],
    [27.5, 7, 2.6, 1, 'Crowded', 'Your 9 is already there.']
  ],
  elsewhere: P(1, 'Not quite', 'Get into the box at the back post.'),
  best: { kind: 'move', at: [17,7] } },

{ ch: 0, type: 'move', title: 'Give an outlet',
  prompt: 'Your {3} has the ball by the sideline, and their {t7} is closing in. Drag the {11}.',
  hint: 'Your {3} needs an easy pass right now. Where?',
  lesson: 'Teammate under pressure near the sideline? Drop down the line and give an easy outlet.',
  us:   { 1:[25,70], 3:[10,55], 4:[25,60], 2:[39,58], 6:[24,47], 10:[23,34], 11:[6,26], 9:[27.5,19], 7:[44,30] },
  them: { 1:[25,3], 2:[13,22], 4:[25,15], 3:[38,19], 6:[26,29.5], 10:[20,41], 9:[29,53], 7:[14,51], 11:[40,42] },
  ball: { team: 'us', n: '3' },
  arrows: [{ team: 'them', from: [15,49], to: [12.6,52.6] }],
  zones: [
    [6, 43, 3.5, 3, 'Pro spot', 'You dropped down the line toward your {3}. Your {3} has an easy pass away from their {t7}, and you can turn up the wing.'],
    [6, 26, 3, 1, 'Too far', 'Your {3} is under pressure. A long pass up the line from there is hard.'],
    [16, 44, 3, 1, 'Into the crowd', 'Inside is where their {t7} came from.']
  ],
  elsewhere: P(1, 'Not quite', 'Drop down the line toward your {3}.'),
  best: { kind: 'move', at: [6,43] } },

{ ch: 0, type: 'move', title: 'Out of the way', noPayoff: true,
  prompt: 'Your {3} is dribbling up the wing toward you, and their {t2} is marking you. Drag the {11}.',
  hint: 'Your {3} wants that wing. Their {t2} follows you.',
  lesson: 'When a teammate dribbles up your wing, move inside and take your defender with you.',
  us:   { 1:[25,70], 3:[8,42], 4:[25,57], 2:[38,55], 6:[24,46], 10:[26,30], 11:[6,27.5], 9:[27,17], 7:[44,28] },
  them: { 1:[25,3], 2:[9.5,23.5], 4:[26,13], 3:[39,18], 6:[25,36], 10:[19,48], 9:[29,53], 7:[16,40], 11:[41,40] },
  ball: { team: 'us', n: '3' },
  arrows: [{ team: 'us', from: [8,44], to: [7.6,38.5], dash: 1 }],
  follow: [{ n: '2', dy: -3.6 }],
  zones: [
    [17, 25, 3.5, 3, 'Pro spot', 'You moved inside and took their {t2} with you. Now your {3} has the whole wing to run into.'],
    [6, 27.5, 3, 1, 'In the way', 'You are standing right where your {3} wants to dribble, and their {t2} is there too.'],
    [6, 14, 3, 0, 'Offside', "You're past their last defender. Offside!"]
  ],
  elsewhere: P(1, 'Not quite', 'Move inside, out of your {3}’s way, and take their {t2} with you.'),
  best: { kind: 'move', at: [17,25] } },

{ ch: 0, type: 'move', title: 'Out of the shadow',
  prompt: 'Your {3} has the ball with time. Their {t2} is standing right between you and the ball. Drag the {11}.',
  hint: 'Can your {3} see you?',
  lesson: 'If a defender is between you and the ball, move until the passer can see you.',
  us:   { 1:[25,70], 3:[11,57], 4:[25,60], 2:[39,58], 6:[25,47], 10:[24,33], 11:[11,39], 9:[27.5,19], 7:[44,30] },
  them: { 1:[25,3], 2:[11,46], 4:[25,15], 3:[38,19], 6:[26,28.5], 10:[21,41], 9:[29,53], 7:[18,51], 11:[40,42] },
  ball: { team: 'us', n: '3' },
  zones: [
    [4, 42, 3.5, 3, 'Pro spot', 'You stepped out wide of their {t2}, so your {3} can see you and pass up the line.'],
    [11, 39, 3, 0, 'Hidden', 'Their {t2} is standing right between you and the ball.'],
    [19, 37, 3, 1, 'Into the middle', 'Inside, their 10 and 6 are waiting. The space is wide.']
  ],
  elsewhere: P(1, 'Not quite', 'Step out wide of their {t2} so your {3} can see you.'),
  best: { kind: 'move', at: [4,42] } },

/* ---------------- 2. Make the run ---------------- */
{ ch: 1, type: 'move', title: 'Run in behind', run: true, air: true,
  prompt: 'Your 6 has the ball, facing forward with time. Their {t2} has pushed up tight on you. Drag the {11}.',
  hint: 'Where is the space: in front of their {t2}, or behind?',
  lesson: 'Passer has time and is facing forward? Run in behind. Passer under pressure? Come short.',
  us:   { 1:[25,70], 3:[12,57], 4:[25,58], 2:[38,57], 6:[22,44], 10:[25,32], 11:[7,27], 9:[26,20], 7:[44,28] },
  them: { 1:[25,4], 2:[10,23.5], 4:[25,16.5], 3:[38,19], 6:[26,27.5], 10:[15,48], 9:[29,53], 7:[12,40], 11:[41,42] },
  ball: { team: 'us', n: '6' },
  zones: [
    [8, 15, 4, 3, 'Pro spot', 'Your 6 has time and is facing forward, so you spun in behind their {t2}. That is the run your 6 wants.'],
    [8, 37, 3.5, 1, 'Too short', 'Coming short brings their {t2} with you. Your 6 had time to play you in.'],
    [7, 27, 3, 1, 'Standing still', 'Standing still, you are easy to mark.']
  ],
  elsewhere: P(1, 'Not quite', 'Your 6 has time. Run into the space behind their {t2}.'),
  best: { kind: 'move', at: [8,15] } },

{ ch: 1, type: 'move', title: 'Come short',
  prompt: "Your 6 has the ball, but their 10 is all over the 6. No time to look up. Drag the {11}.",
  hint: 'Can the 6 see a run in behind right now?',
  lesson: 'Teammate under pressure? Come short and help. Teammate with time? Run in behind.',
  us:   { 1:[25,70], 3:[12,57], 4:[25,58], 2:[38,57], 6:[22,46], 10:[25,32], 11:[7,27], 9:[26,20], 7:[44,28] },
  them: { 1:[25,4], 2:[10,23.5], 4:[25,16.5], 3:[38,19], 6:[26,27.5], 10:[26.5,48], 9:[30,55], 7:[16,52], 11:[41,42] },
  ball: { team: 'us', n: '6' },
  arrows: [{ team: 'them', from: [27.8,48.4], to: [25.3,47.2] }],
  zones: [
    [8, 37.5, 3.5, 3, 'Pro spot', "Your 6 is under pressure and can't look up, so you came short and gave the 6 an easy pass."],
    [8, 15, 4, 1, 'Too early', "The 6 can't see your run with a defender right there. Help first."],
    [7, 27, 3, 1, 'Standing still', 'The 6 needs help now.']
  ],
  elsewhere: P(1, 'Not quite', 'Come short so your 6 has an easy pass.'),
  best: { kind: 'move', at: [8,37.5] } },

{ ch: 1, type: 'move', title: 'Diagonal run', run: true, air: true,
  prompt: 'Your 10 has the ball. Your 9 just came short and their 4 followed. Drag the {11}.',
  hint: 'Their 4 left the middle. Who can get there?',
  lesson: 'When your 9 pulls their center back out, run diagonally into the space left behind. It goes straight at goal.',
  us:   { 1:[25,70], 3:[12,56], 4:[25,57], 2:[38,56], 6:[24,44], 10:[25,31], 11:[11,25], 9:[26,24], 7:[44,24] },
  them: { 1:[25,4], 2:[7,21], 4:[26,19.5], 3:[38,19], 6:[31,36], 10:[18,44], 9:[29,52], 7:[10,38], 11:[41,36] },
  ball: { team: 'us', n: '10' },
  arrows: [{ team: 'us', from: [26,19.5], to: [26,23], dash: 1 }],
  zones: [
    [17.5, 15, 3.5, 3, 'Pro spot', 'Your 9 pulled their 4 out, so you ran diagonally into the space their 4 left, straight toward goal.'],
    [5, 13, 3.5, 2, 'Good', 'A run down the line works, but the diagonal into the middle goes straight at goal.'],
    [11, 25, 3, 1, 'Standing still', 'Make a run!']
  ],
  elsewhere: P(1, 'Not quite', 'Run diagonally into the space their 4 left.'),
  best: { kind: 'move', at: [17.5,15] } },

{ ch: 1, type: 'move', title: 'Time your run', startsOffside: true,
  prompt: "Your {3} is about to pass up the line. You're standing past their last defender. Drag the {11}.",
  hint: 'Find their last defender. Is any part of you past that line?',
  lesson: 'Stay level with their last defender until the pass is played. Then go.',
  us:   { 1:[25,70], 3:[12,48], 4:[25,55], 2:[38,53], 6:[24,42], 10:[24,30], 11:[8,14], 9:[27.5,23], 7:[44,26] },
  them: { 1:[25,4], 2:[13,20], 4:[25,19], 3:[37,20], 6:[25,34], 10:[18,42], 9:[30,50], 7:[14,40], 11:[40,36] },
  ball: { team: 'us', n: '3' },
  zones: [
    [7, 21.5, 2.6, 3, 'Pro spot', 'Back onside, level with their last defender. Now the pass is legal and you can run onto it.'],
    [8, 14, 3, 0, 'Offside', "You're still past their last defender. If the pass comes to you there, it's offside."],
    [8, 33, 3.5, 1, 'Too deep', 'Onside, but now the space behind them is wasted.']
  ],
  elsewhere: P(1, 'Not quite', 'Get level with their last defender, out wide.'),
  best: { kind: 'move', at: [7,21.5] } },

{ ch: 1, type: 'move', title: 'Blind side', air: true,
  prompt: 'Your {7} has the ball on the far wing. Their {t2} is watching the ball. Drag the {11}.',
  hint: 'Which way is their {t2} looking? What can’t their {t2} see?',
  lesson: "Defenders watch the ball. Move where they can't see you, and stay onside.",
  us:   { 1:[25,70], 3:[13,55], 4:[25,57], 2:[37,55], 6:[25,42], 10:[30,30], 11:[10,26], 9:[26,19], 7:[43,28] },
  them: { 1:[25,3], 2:[14,18], 4:[25,15], 3:[36,18], 6:[31,35], 10:[20,40], 9:[29,50], 7:[10,34], 11:[40,36] },
  ball: { team: 'us', n: '7' },
  zones: [
    [8.5, 18.6, 2.6, 3, 'Pro spot', 'Their {t2} is watching the ball on the other side. You slipped onto the blind side, still onside.'],
    [10, 26, 3, 1, 'In plain sight', 'Their {t2} can see you and the ball at the same time.'],
    [10, 10, 3, 0, 'Offside', "You're past their last defender. Offside!"]
  ],
  elsewhere: P(1, 'Not quite', 'Get behind their {t2}’s back, out of sight, but stay onside.'),
  best: { kind: 'move', at: [8.5,18.6] } },

/* ---------------- 3. Take on your defender ---------------- */
{ ch: 2, type: 'ball', title: 'Take on your defender',
  prompt: "You have the ball on the wing. Their {t2} is alone in front of you, and nobody is covering behind.",
  hint: 'Is anyone helping their {t2}? Where is the space?',
  lesson: '1 v 1 with space behind and no cover? Take the defender on.',
  us:   { 1:[25,70], 3:[12,52], 4:[25,55], 2:[38,53], 6:[24,40], 10:[24,28], 11:[8,26], 9:[26,16], 7:[44,22] },
  them: { 1:[25,3], 2:[10,20.5], 4:[27,12], 3:[39,15], 6:[25,23.5], 10:[18,36], 9:[30,47], 7:[14,33], 11:[41,30] },
  ball: '11',
  pass: {
    3:  P(1, 'Too safe', 'Back to your {3} when you had a 1 v 1 with space behind?'),
    10: P(1, 'Marked', 'Their 6 is right on your 10.')
  },
  shoot: FAR,
  carry: [[5.5, 13, 3.5, 3, 'Pro choice', '1 v 1 with space behind and nobody covering. You took the defender on down the line.'],
          [16, 18, 3, 2, 'Okay', 'Cutting inside works, but their 6 and 4 are waiting there. The space was down the line.'],
          [10, 20.5, 2.4, 0, 'Into their {t2}', 'You ran straight into their {t2}.']],
  elsewhere: P(1, 'Not quite', 'Go at the defender, into the space behind.'),
  best: { kind: 'carry', at: [5.5,13] } },

{ ch: 2, type: 'ball', title: 'Two on you',
  prompt: 'Their {t2} is in front of you and their {t7} is closing from behind. What now?',
  hint: 'Can you beat two? Who is free?',
  lesson: "Two defenders on you? Don't dribble into them. Play it to the free teammate and go again.",
  us:   { 1:[25,70], 3:[12,48], 4:[25,55], 2:[38,53], 6:[22,40], 10:[24,28], 11:[8,30], 9:[26,17], 7:[44,24] },
  them: { 1:[25,3], 2:[9,25.5], 4:[26,13], 3:[38,17], 6:[25,23.5], 10:[18,46], 9:[30,50], 7:[14,34], 11:[42,32] },
  ball: '11',
  arrows: [{ team: 'them', from: [15.5,36], to: [13.4,33.4] }],
  pass: {
    3:  P(3, 'Pro choice', 'Their {t2} is in front and their {t7} is closing. You played it back to your {3}, and you can go again.'),
    6:  P(0, 'Intercepted', 'Their {t7} is coming from that side and cuts it out.', { cut: '7' }),
    10: P(1, 'Marked', 'Their 6 is right on your 10.')
  },
  shoot: FAR,
  carry: [],
  elsewhere: P(0, 'Trapped', 'You dribbled into two defenders.'),
  best: { kind: 'pass', to: '3' } },

{ ch: 2, type: 'ball', title: 'Across the keeper',
  prompt: "You're in the box on the {left}. Their keeper is guarding the near post. Your 9 is marked.",
  hint: 'Which side of the goal is the keeper guarding?',
  lesson: 'From an angle, the keeper guards the near post. Shoot across the keeper to the far post.',
  us:   { 1:[25,70], 3:[13,46], 4:[25,48], 2:[37,46], 6:[25,34], 10:[25,22], 11:[13,11], 9:[29,9.5], 7:[42,18] },
  them: { 1:[21.5,3.2], 2:[14,16], 4:[30,5.5], 3:[38,12], 6:[27.5,27], 10:[20,34], 9:[31,47], 7:[9,26], 11:[41,26] },
  ball: '11',
  pass: {
    9:  P(1, 'Marked', 'Their 4 is right on your 9, and you had the shot.'),
    10: P(2, 'Good', 'A cutback works, but you had a clear shot across the keeper.')
  },
  shoot: P(3, 'Pro choice', 'The keeper was guarding the near post, so you shot across the keeper into the far corner.', { end: [27.6,-1.2] }),
  carry: [],
  elsewhere: P(1, 'Not quite', 'Their {t2} is chasing. Shoot across the keeper.'),
  best: { kind: 'shoot' } },

{ ch: 2, type: 'ball', title: 'The overlap',
  prompt: 'Their {t2} is right in front of you. Your {3} is sprinting past you on the outside. Make the pass.',
  hint: 'Where will your {3} be when the ball gets there?',
  lesson: 'Teammate overlapping outside you? Slip it into the run while your defender is stuck on you.',
  us:   { 1:[25,70], 3:[7,32], 4:[25,55], 2:[38,53], 6:[22,42], 10:[24,28], 11:[11,28], 9:[26,16], 7:[44,22] },
  them: { 1:[25,3], 2:[12.5,23.5], 4:[26,12], 3:[38,16], 6:[25,23], 10:[18,38], 9:[30,50], 7:[13,38], 11:[41,30] },
  ball: '11',
  arrows: [{ team: 'us', from: [7.4,30.4], to: [5.2,24.5], dash: 1 }],
  pass: {
    3:  P(1, 'Behind the run', "Your {3} is sprinting past you. A pass to where the {3} is now arrives behind the run."),
    10: P(1, 'Marked', 'Their 6 is right on your 10.')
  },
  lead: [
    [4.5, 21.5, 3, 3, 'Pro choice', 'Their {t2} was stuck on you, so you slipped it into the space in front of your {3}. The {3} runs onto it down the line.', '3', null, true],
    [4, 10, 3, 1, 'Overhit', 'Too far. Their {t2} turns and gets there first.', '3', '2']
  ],
  shoot: FAR,
  carry: [[12, 22, 2.6, 0, 'Into their {t2}', 'Their {t2} is right there.']],
  elsewhere: P(1, 'Not quite', 'Use the overlap.'),
  best: { kind: 'pass', to: '3', at: [4.5,21.5] } },

{ ch: 2, type: 'ball', title: 'Set it inside', facing: 'back',
  prompt: 'You got the ball by the sideline with your back to goal. Their {t2} is tight behind you.',
  hint: 'Who is facing forward?',
  lesson: 'Back to goal with a defender tight on you? Set it to a teammate who is facing forward.',
  us:   { 1:[25,70], 3:[10,45], 4:[25,55], 2:[38,53], 6:[24,42], 10:[16,32], 11:[6,30], 9:[26,17], 7:[44,24] },
  them: { 1:[25,3], 2:[6,25.5], 4:[26,13], 3:[38,17], 6:[22,25.5], 10:[29,38], 9:[30,50], 7:[13,40.5], 11:[41,32] },
  ball: '11',
  arrows: [{ team: 'them', from: [6,23.3], to: [6,25.6] }],
  pass: {
    10: P(3, 'Pro choice', 'Their {t2} is tight on your back, so you set it inside to your 10, who is facing forward.'),
    3:  P(2, 'Good', 'Safe, but your 10 was facing forward and closer to goal.'),
    9:  P(0, "Can't see it", "You're facing your own goal. To make that pass you'd have to turn into their {t2}.")
  },
  shoot: P(0, 'Facing the wrong way', "You're facing your own goal with a defender on you."),
  carry: [],
  elsewhere: P(0, 'Turned into trouble', 'With their {t2} tight on your back, turning loses the ball.'),
  best: { kind: 'pass', to: '10' } },

/* ---------------- 4. Final ball ---------------- */
{ ch: 3, type: 'ball', title: 'The cutback',
  prompt: 'You got to the end line. Their defenders are running back toward their goal. What do you do?',
  hint: 'Where did their defenders go? Where is the space?',
  lesson: 'At the end line with defenders running back to goal? Cut it back to the edge of the box.',
  us:   { 1:[25,68], 3:[13,42], 4:[25,44], 2:[37,42], 6:[26,30], 10:[23,15], 11:[6,5], 9:[19,6], 7:[36,10] },
  them: { 1:[21,2.5], 2:[10,2.6], 4:[23.5,8.5], 3:[32,7.5], 6:[29,22], 10:[19,28], 9:[29,44], 7:[9,22], 11:[40,22] },
  ball: '11',
  pass: {
    10: P(3, 'Pro choice', 'Their defenders ran back to protect the goal, so you cut it back to your 10 at the edge of the box.'),
    9:  P(1, 'Marked', 'Their 4 and their keeper are right there.')
  },
  shoot: P(0, 'No angle', 'From the end line there is almost no goal to aim at.', { end: [21,3.5] }),
  carry: [],
  elsewhere: P(1, 'Not quite', 'Their defenders are coming. Pick out the pass.'),
  best: { kind: 'pass', to: '10' } },

{ ch: 3, type: 'ball', title: 'Near post', air: true,
  prompt: 'You are wide near their box. Your 9 is sprinting to the near post, ahead of the defender. Make the pass.',
  hint: 'Where will your 9 be when the ball gets there?',
  lesson: 'Teammate attacking the near post? Put it into the space ahead, early and hard.',
  us:   { 1:[25,68], 3:[13,42], 4:[25,44], 2:[37,42], 6:[24,30], 10:[23,21], 11:[8,14], 9:[19,13], 7:[31,8.5] },
  them: { 1:[24,2.5], 2:[12,18.5], 4:[24,11], 3:[32,4.5], 6:[27,25], 10:[19,32], 9:[29,45], 7:[9,26], 11:[41,24] },
  ball: '11',
  arrows: [{ team: 'us', from: [19.2,11.5], to: [20,7], dash: 1 }],
  pass: {
    9:  P(1, 'Behind the run', "The 9 is running to the near post. Put it in front of the run.")
  },
  lead: [
    [20, 5.5, 2.8, 3, 'Pro choice', 'You whipped it into the near post, right in front of your 9. The 9 gets there before the defender.', '9', null, true],
    [31, 3.5, 2.6, 1, 'Covered', 'Their {t3} is guarding the far post.', '7', '3']
  ],
  shoot: P(1, 'Tight angle', 'From that angle the keeper covers it. Your 9 was attacking the near post.'),
  carry: [],
  elsewhere: P(1, 'Not quite', 'Your 9 is making the run. Find that run.'),
  best: { kind: 'pass', to: '9', at: [20,5.5] } },

{ ch: 3, type: 'ball', title: 'Back post cross', air: true,
  prompt: 'You are wide near their box. Their defenders are crowding the near post. Look across.',
  hint: 'Who is free at the far post?',
  lesson: 'If their defenders crowd the near post, cross it over them to the back post.',
  us:   { 1:[25,68], 3:[13,42], 4:[25,44], 2:[37,42], 6:[24,30], 10:[22,20], 11:[7,12], 9:[17,10], 7:[33,8] },
  them: { 1:[21,2.5], 2:[11,16], 4:[19.5,6.5], 3:[24,9.5], 6:[25,24], 10:[19,32], 9:[29,45], 7:[9,26], 11:[41,24] },
  ball: '11',
  pass: {
    7:  P(3, 'Pro choice', 'Their defenders crowded the near post, so you crossed it over them to your {7}, alone at the back post.'),
    9:  P(1, 'Marked', 'Their 4 is right on your 9.'),
    10: P(1, 'Marked', 'Their 6 is right on your 10.')
  },
  shoot: P(1, 'Tight angle', 'From that angle the keeper covers it. Your {7} was free.'),
  carry: [],
  elsewhere: P(1, 'Not quite', 'Find the free player at the back post.'),
  best: { kind: 'pass', to: '7' } },

{ ch: 3, type: 'ball', title: 'Pick out the 9',
  prompt: "You're in the box at a tight angle and their keeper came out to you. Look up.",
  hint: 'Is anyone free in front of goal?',
  lesson: 'Keeper coming out at a tight angle? Look across. A teammate may have an open goal.',
  us:   { 1:[25,68], 3:[13,44], 4:[25,46], 2:[37,44], 6:[24,32], 10:[21.5,21.5], 11:[12,9.5], 9:[24,10.5], 7:[40,16] },
  them: { 1:[18,3.5], 2:[11,15], 4:[29,7], 3:[38,10], 6:[25,26], 10:[18,34], 9:[31,47], 7:[9,26], 11:[41,28] },
  ball: '11',
  arrows: [{ team: 'them', from: [20,2.6], to: [18.4,3.4] }],
  pass: {
    9: P(3, 'Pro choice', 'Their keeper came out to you, so you squared it to your 9 in front of goal.')
  },
  shoot: P(1, 'Tight angle', 'From that angle the keeper covers it. Your 9 was free.', { end: [18,4.5] }),
  carry: [],
  elsewhere: P(1, 'Not quite', 'The keeper is closing you down. Look across.'),
  best: { kind: 'pass', to: '9' } },

{ ch: 3, type: 'ball', title: 'Early cross', air: true,
  prompt: 'Their defenders are running back toward their goal. Your 9 is racing them. You are still far from the box.',
  hint: 'Do you need to get closer, or is the space there now?',
  lesson: 'Defenders running back and your 9 racing them? Cross early, into the space ahead of the 9.',
  us:   { 1:[25,70], 3:[12,52], 4:[25,55], 2:[38,53], 6:[22,42], 10:[28,28], 11:[7,32], 9:[21,20], 7:[43,26] },
  them: { 1:[25,3], 2:[12,26], 4:[25,17], 3:[36,18], 6:[32,32], 10:[20,46.5], 9:[30,52], 7:[14,40], 11:[41,36] },
  ball: '11',
  arrows: [{ team: 'us', from: [21,18.5], to: [20.6,13], dash: 1 }, { team: 'them', from: [25,19.5], to: [25,17.5] }],
  pass: {
    9: P(1, 'Behind the run', "The 9 is racing their defenders. Put it in front of the run.")
  },
  lead: [
    [20, 11, 3.5, 3, 'Pro choice', 'You crossed it early into the space in front of your 9, before their defenders could get back.', '9', null, true]
  ],
  shoot: FAR,
  carry: [[8, 22, 3.5, 1, 'Too slow', 'Every touch lets their defenders get back. The space behind them was there now.']],
  elsewhere: P(1, 'Not quite', 'The space is there now. Use it.'),
  best: { kind: 'pass', to: '9', at: [20,11] } },

/* ---------------- 5. Defend your side ---------------- */
{ ch: 4, type: 'move', title: 'Press from the inside', kind: 'Pressing',
  prompt: 'Their {t2} has the ball on your side. Their 6 is waiting in the middle. Drag the {11} to press.',
  hint: 'Which pass do you want to stop?',
  lesson: 'Press the wide defender from the inside. Show the defender down the line, away from the middle.',
  us:   { 1:[25,72], 3:[12,59], 4:[25,60], 2:[38,59], 6:[24,45], 10:[22,33.5], 11:[8,33], 9:[26,19], 7:[38,28] },
  them: { 1:[25,3], 2:[12,22], 4:[25,15], 3:[38,18], 6:[22,27], 10:[20,41], 9:[28,53], 7:[10,42], 11:[41,44] },
  ball: { team: 'them', n: '2' },
  zones: [
    [15, 25.5, 2.6, 3, 'Pro spot', 'You pressed from the inside, blocking the pass to their 6. Their {t2} can only go down the line.'],
    [12, 27.5, 2.4, 2, 'Good', 'Good pressure, but coming straight at their {t2} leaves the pass inside open.'],
    [8, 33, 3, 1, 'Too far', 'From there their {t2} has all the time in the world.']
  ],
  elsewhere: P(1, 'Not quite', 'Press their {t2} from the inside.'),
  best: { kind: 'move', at: [15,25.5] } },

{ ch: 4, type: 'move', title: 'Track your runner',
  prompt: 'Their 4 has the ball. Their {t2} is bursting forward down your side. Drag the {11}.',
  hint: 'Who is going to stop their {t2}?',
  lesson: "When their wide player runs forward, track the run. Don't leave your teammate two against one.",
  us:   { 1:[25,72], 3:[12,57], 4:[25,60], 2:[38,59], 6:[24,46], 10:[23,32], 11:[13,28], 9:[25,20], 7:[38,28] },
  them: { 1:[25,3], 2:[11,24], 4:[25,15.5], 3:[38,18], 6:[26,26], 10:[18,42], 9:[29,53], 7:[17,47], 11:[41,44] },
  ball: { team: 'them', n: '4' },
  arrows: [{ team: 'them', from: [10.6,26], to: [8.4,39.5], dash: 1 }],
  zones: [
    [8.5, 42, 3.5, 3, 'Pro spot', 'Their {t2} ran forward, so you tracked the run all the way back. Your {3} is not left two against one.'],
    [13, 28, 3, 0, 'Left behind', 'Their {t2} ran right past you. Now your {3} has two players to deal with.'],
    [22, 19.5, 2.6, 1, 'Wrong job', 'Your 9 has their 4. Their {t2} was your job.']
  ],
  elsewhere: P(1, 'Not quite', 'Go with their {t2}.'),
  best: { kind: 'move', at: [8.5,42] } },

{ ch: 4, type: 'move', title: 'Shadow the pass', kind: 'Pressing',
  prompt: 'Their 4 has the ball, and your 9 is pressing from the other side. Their {t2} is free out wide. Drag the {11}.',
  hint: 'Your 9 is on the ball. Which pass is yours to stop?',
  lesson: 'While a teammate presses the ball, stand in the pass to your side. Make them go where your team is waiting.',
  us:   { 1:[25,72], 3:[12,58], 4:[25,60], 2:[38,59], 6:[24,46], 10:[25,32.5], 11:[8,32], 9:[29,19.5], 7:[38,28] },
  them: { 1:[25,3], 2:[12,18], 4:[25,15], 3:[38,18], 6:[25,28], 10:[19,42], 9:[29,53], 7:[10,42], 11:[41,44] },
  ball: { team: 'them', n: '4' },
  arrows: [{ team: 'us', from: [30,21], to: [28.2,18.3] }],
  zones: [
    [18, 17, 2.5, 3, 'Pro spot', 'Your 9 pressed from the other side, and you stood in the pass to their {t2}. Their 4 is stuck.'],
    [12, 22, 2.5, 2, 'Good', 'Marking their {t2} works, but standing in the pass stops it before it gets to their {t2}.'],
    [8, 32, 3, 1, 'Too far', 'From there their 4 passes to their {t2} and they escape.']
  ],
  elsewhere: P(1, 'Not quite', 'Stand in the pass from their 4 to their {t2}.'),
  best: { kind: 'move', at: [18,17] } },

{ ch: 4, type: 'move', title: 'Tuck in',
  prompt: 'Their {t3} has the ball on the far wing, and your {7} is pressing. You are out wide on the other side. Drag the {11}.',
  hint: 'The ball is far away. Where can you help?',
  lesson: 'Ball on the far side? Tuck in. Make the field small and protect the middle.',
  us:   { 1:[25,72], 3:[13,59], 4:[25,60], 2:[37,59], 6:[26,46], 10:[30,37], 11:[6,22], 9:[25,22], 7:[39,26] },
  them: { 1:[25,3], 2:[10,18], 4:[25,15], 3:[38,30], 6:[28,31], 10:[20,38], 9:[28,53], 7:[12,44], 11:[41,44] },
  ball: { team: 'them', n: '3' },
  zones: [
    [17, 34, 3.5, 3, 'Pro spot', "The ball is on the far side, so you tucked in. Now the middle is crowded and they can't play through it."],
    [6, 22, 3, 1, 'Too wide', 'Way out there, you are not helping. The ball is on the other side.'],
    [34, 30, 3, 1, 'Ball chasing', 'Your {7} has their {t3}. You left your whole side empty.']
  ],
  elsewhere: P(1, 'Not quite', 'Tuck in toward the middle.'),
  best: { kind: 'move', at: [17,34] } },

{ ch: 4, type: 'move', title: 'Win it back', kind: 'Pressing',
  prompt: 'You just lost the ball. Their {t2} picked it up by the sideline, facing their own goal. Drag the {11}.',
  hint: 'How close are you? Which way is their {t2} facing?',
  lesson: 'Lost it near you? Press right away, before the turn.',
  us:   { 1:[25,72], 3:[12,50], 4:[25,58], 2:[38,57], 6:[24,45], 10:[22,33], 11:[14,21], 9:[26,19], 7:[40,28] },
  them: { 1:[25,3], 2:[10,30], 4:[25,15], 3:[38,18], 6:[25,27], 10:[18,42], 9:[29,52], 7:[14,40], 11:[41,44] },
  ball: { team: 'them', n: '2' },
  zones: [
    [10.5, 26.8, 2.4, 3, 'Pro spot', "Their {t2} is facing their own goal, so you jumped on the ball right away. No time to turn."],
    [14, 21, 3, 1, 'Watching', 'You gave their {t2} time to turn and pass.'],
    [8, 44, 3.5, 1, 'Dropped off', 'Running back gives their {t2} time. You were close, so press.']
  ],
  elsewhere: P(1, 'Not quite', 'Press now, before the turn.'),
  best: { kind: 'move', at: [10.5,26.8] } },

/* ---------------- 6. Counter ---------------- */
{ ch: 5, type: 'move', title: 'Sprint into space', run: true,
  prompt: 'Your 6 just won the ball. Their defenders were pushed up. Drag the {11}.',
  hint: 'Where is the open grass?',
  lesson: 'When we win the ball, wingers sprint into the space down the wing.',
  us:   { 1:[25,70], 3:[12,58], 4:[25,59], 2:[38,58], 6:[24,46], 10:[20,38], 11:[8,32], 9:[26,31], 7:[44,34] },
  them: { 1:[25,4], 2:[18,30], 4:[25,26], 3:[36,28], 6:[30,48], 10:[19,50], 9:[29,56], 7:[14,46], 11:[41,46] },
  ball: { team: 'us', n: '6' },
  zones: [
    [8, 20, 4, 3, 'Pro spot', 'You sprinted into the open grass down the wing. Your 6 can play you in.'],
    [12, 42, 3, 1, 'Too short', 'Coming back toward your 6 slows the counterattack.'],
    [8, 32, 3, 1, 'Standing still', "It's a counterattack. Run!"]
  ],
  elsewhere: P(1, 'Not quite', 'Sprint into the space down the wing.'),
  best: { kind: 'move', at: [8,20] } },

{ ch: 5, type: 'ball', title: 'Carry it',
  prompt: 'Counterattack! You have the ball on the wing with open grass in front of you. Your teammates are all marked.',
  hint: 'Is anybody free? Where is the space?',
  lesson: 'Open grass in front of you and nobody free? Carry it at speed.',
  us:   { 1:[25,70], 3:[12,56], 4:[25,58], 2:[38,56], 6:[24,46], 10:[22,34], 11:[8,34], 9:[25,22], 7:[42,26] },
  them: { 1:[25,4], 2:[20,26], 4:[25,17.5], 3:[38,21], 6:[25,38.5], 10:[18,48], 9:[29,55], 7:[12,46], 11:[41,44] },
  ball: '11',
  pass: {},
  otherNote: 'Everyone in front of you is marked, and the wing is open.',
  shoot: FAR,
  carry: [[8, 22, 4.5, 3, 'Pro choice', 'Open grass and every teammate marked. You carried it at speed down the wing.'],
          [18, 27, 3, 0, 'Into their {t2}', 'You dribbled into their {t2}. The space was down the line.']],
  elsewhere: P(1, 'Not quite', 'The open space is straight down the wing.'),
  best: { kind: 'carry', at: [8,22] } },

{ ch: 5, type: 'ball', title: 'Two against one',
  prompt: 'Counterattack! Their 4 is stepping up to stop you, and your 9 is sprinting into the middle. Make the pass.',
  hint: 'Their 4 came to you. Who got left?',
  lesson: '2 v 1: when the defender comes to you, pass to the free teammate, into the run.',
  us:   { 1:[25,70], 3:[12,56], 4:[25,57], 2:[38,56], 6:[24,44], 10:[20,38], 11:[12,25], 9:[24,24], 7:[42,28] },
  them: { 1:[25,4], 2:[16,36], 4:[12.5,20.5], 3:[34,30], 6:[28,46], 10:[19,48], 9:[30,55], 7:[9,42], 11:[42,40] },
  ball: '11',
  arrows: [{ team: 'us', from: [24.2,22.5], to: [25.2,16], dash: 1 }, { team: 'them', from: [12.5,18.5], to: [12.5,20.8] }],
  pass: {
    9: P(2, 'Good', 'Right idea, but play it in front of the 9 to run onto.')
  },
  lead: [
    [25.5, 14, 3.5, 3, 'Pro choice', 'Their 4 came to you, so you slipped it into the space in front of your 9. The 9 is through on goal.', '9', null, true],
    [25, 6, 3, 1, 'Overhit', 'Too long. Their keeper gets it.', '9', '1']
  ],
  shoot: FAR,
  carry: [[12.5, 21, 2.4, 0, 'Into their 4', 'Their 4 already stepped up to you.']],
  elsewhere: P(1, 'Not quite', 'Their 4 committed to you. Use your 9.'),
  best: { kind: 'pass', to: '9', at: [25.5,14] } },

{ ch: 5, type: 'ball', title: 'Finish it',
  prompt: "Counterattack! You're through on goal from the {left}. Their keeper stayed in the middle of the goal.",
  hint: 'Your 9 is marked. Can you see the goal?',
  lesson: "Through on goal and the keeper stays home? Place it low into the far corner.",
  us:   { 1:[25,70], 3:[13,48], 4:[25,50], 2:[37,48], 6:[24,36], 10:[22,26], 11:[17,12], 9:[29,13], 7:[42,22] },
  them: { 1:[25,2], 2:[14,17.5], 4:[31,9.5], 3:[38,16], 6:[27,30.5], 10:[19,38], 9:[30,47], 7:[9,30], 11:[41,30] },
  ball: '11',
  arrows: [{ team: 'them', from: [13.5,20], to: [14.2,17.6] }],
  pass: {
    9: P(1, 'Marked', 'Their 4 is right on your 9, and you were through on goal.')
  },
  shoot: P(3, 'Pro choice', 'The keeper stayed in the middle of the goal, so you placed it low into the far corner.', { end: [27.4,-1.2] }),
  carry: [],
  elsewhere: P(1, 'Not quite', "Their {t2} is chasing. You're in range: shoot."),
  best: { kind: 'shoot' } },

{ ch: 5, type: 'move', title: 'Fill the far post', run: true, air: true,
  prompt: 'Counterattack down the other wing. Your {7} is dribbling toward their box. Drag the {11}.',
  hint: 'Who is going to be in the box when the cross comes in?',
  lesson: 'On a counter down the other wing, sprint into the box at the back post.',
  us:   { 1:[25,70], 3:[13,56], 4:[25,57], 2:[37,56], 6:[24,46], 10:[26,34], 11:[8,34], 9:[27,20], 7:[40,24] },
  them: { 1:[25,3], 2:[19,28], 4:[26,15], 3:[36,18], 6:[30,46], 10:[19,48], 9:[30,55], 7:[12,46], 11:[41,40] },
  ball: { team: 'us', n: '7' },
  zones: [
    [15, 9, 4, 3, 'Pro spot', 'You sprinted into the box at the back post. When your {7} crosses, you are there.'],
    [8, 34, 3, 1, 'Watching', 'Out wide on the far side you are no help.'],
    [27, 14, 3, 1, 'Crowded', 'Your 9 is already there.']
  ],
  elsewhere: P(1, 'Not quite', 'Sprint into the box at the back post.'),
  best: { kind: 'move', at: [15,9] } }
];

window.RIDDLE_LIB.defineSet({ me: '11', mirrorTo: '7', chapters: CHAPTERS, riddles: RIDDLES });
})();
