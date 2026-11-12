/* Set pieces: corner kicks, free kicks, throw-ins and goal kicks.
   Each riddle says which player you are (`me`). `ballAt` puts the ball on its spot,
   `restart` names the set piece (no offside on corners, throw-ins and goal kicks),
   `noCarry` means you can't dribble from a dead ball, and `range` is how far a throw-in can go. */
(function () {
const { P, TOO_SAFE, FAR, steal, say, offside } = window.RIDDLE_LIB;
const CORNER_R = [49.6, 0.4], CORNER_L = [0.4, 0.4], THEIR_CORNER = [0.4, 74.6];
const LONG = w => P(1, 'Long ball', w);

const CHAPTERS = [
  { name: 'Our corners', blurb: 'Deliver it, take it short, or find the space.' },
  { name: 'Their corners', blurb: 'Mark goal side, guard the near post, and stay ready to counter.' },
  { name: 'Our free kicks', blurb: 'Shoot, take it quickly, or put it in the box.' },
  { name: 'Their free kicks', blurb: 'Walls, lines and runners.' },
  { name: 'Throw-ins', blurb: 'Throw it forward, to feet or into space, and get free for it.' },
  { name: 'Goal kicks', blurb: 'Build out, split wide, or press theirs.' }
];

const RIDDLES = [
/* ---------------- 1. Our corners ---------------- */
{ ch: 0, type: 'ball', me: '7', kind: 'Corner kick', restart: 'corner', noCarry: true, air: true, title: 'Near post',
  prompt: 'Corner kick from the right. Your 9 is sprinting to the near post.',
  hint: 'Where will your 9 be when the ball gets there?',
  lesson: 'Teammate attacking the near post? Whip it into the space ahead, before their keeper can come.',
  us:   { 1:[25,70], 3:[13,40], 4:[25,42], 2:[38,38], 6:[26,22], 10:[18,13], 11:[14,7], 9:[31,11], 7:[51.8,-1.6] },
  them: { 1:[25,1.6], 2:[16,3.5], 4:[24,6], 3:[34.5,7.5], 6:[22.5,14.5], 10:[33,19], 9:[25,46], 7:[12,44], 11:[38,44] },
  ball: '7', ballAt: CORNER_R,
  arrows: [{ team: 'us', from: [30.6,10], to: [29.6,5.8], dash: 1 }],
  pass: {
    9:  P(1, 'Behind the run', "The 9 is running to the near post. Put it in front of the run."),
    10: P(1, 'Crowded', 'Their 6 is on your 10, and their 4 is right there.'),
    11: P(1, 'Marked', 'Their 2 is right on your 11 at the back post.'),
    6:  P(1, 'Too safe', 'Back to the edge of the box wastes the corner. Your 9 was attacking the near post.')
  },
  lead: [
    [29.5, 4, 2.6, 3, 'Pro choice', 'Your 9 attacked the near post, so you whipped it into the space ahead. The 9 gets there before their keeper.', '9', null, true],
    [24, 10, 2.5, 0, 'Into the crowd', 'Their 4 and 6 are waiting there. They head it away.', '10', '4']
  ],
  shoot: null,
  elsewhere: P(1, 'Not quite', 'Your 9 is attacking the near post. Find that run.'),
  best: { kind: 'pass', to: '9', at: [29.5,4] } },

{ ch: 0, type: 'ball', me: '7', kind: 'Corner kick', restart: 'corner', noCarry: true, title: 'Take it short',
  prompt: 'Corner kick from the right. Their box is packed, and your 10 came short to you.',
  hint: 'How many of their players are near your 10?',
  lesson: 'Box packed and a teammate free near the corner? Take it short. It pulls their defenders out and gives a better angle to cross.',
  us:   { 1:[25,70], 3:[13,40], 4:[25,42], 2:[38,38], 6:[27,20], 10:[43,6], 11:[19,8], 9:[28,8], 7:[51.8,-1.6] },
  them: { 1:[25,1.6], 2:[18.5,4.4], 4:[28,4.4], 3:[33,6], 6:[23,13], 10:[33,14], 11:[38,10], 9:[25,46], 7:[12,44] },
  ball: '7', ballAt: CORNER_R,
  pass: {
    10: P(3, 'Pro choice', 'Their box was packed and your 10 was free, so you took it short. Now their defenders have to come out to the 10.'),
    9:  P(0, 'Marked', 'Their 4 is right on your 9, and their keeper is close.'),
    11: P(0, 'Marked', 'Their 2 is right on your 11.'),
    6:  P(1, 'Not the best', 'A long pass back to the edge of the box. Your 10 was free right next to you.')
  },
  lead: [
    [25, 7.5, 3, 0, 'Into the crowd', 'Their defenders and keeper are waiting there. They clear it.', '9', '1']
  ],
  shoot: null,
  elsewhere: P(1, 'Not quite', 'Look for the free teammate close to you.'),
  best: { kind: 'pass', to: '10' } },

{ ch: 0, type: 'move', me: '6', kind: 'Corner kick', restart: 'corner', noPayoff: true, title: 'Edge of the box',
  prompt: 'Your 7 is about to take a corner. You ran into the box with everyone else. Drag the 6.',
  hint: 'Who catches the clearance, and who stops their counter?',
  lesson: 'On our corner, someone has to stay at the edge of the box. The clearance comes there, and so does their counterattack.',
  us:   { 1:[25,70], 3:[14,40], 4:[25,42], 2:[37,40], 6:[25,7.5], 10:[19,10], 11:[14,6], 9:[30,9], 7:[51.8,-1.6] },
  them: { 1:[25,1.6], 2:[16,2.4], 4:[28,5.5], 3:[33,5], 6:[22.5,12], 10:[31,14], 11:[38,12], 9:[26,46], 7:[12,44] },
  ball: { team: 'us', n: '7' }, ballAt: CORNER_R,
  zones: [
    [25, 17.5, 3, 3, 'Pro spot', 'Everyone else attacks the goal, so you held the edge of the box. Any clearance comes to you, and you can stop their counter.'],
    [25, 7.5, 2.4, 1, 'Too crowded', 'One more player in the crowd, and nobody is guarding the edge of the box.'],
    [25, 30, 3, 1, 'Too deep', 'Too far back to win the clearance.']
  ],
  elsewhere: P(1, 'Not quite', 'Hold the edge of the box.'),
  best: { kind: 'move', at: [25,17.5] } },

{ ch: 0, type: 'move', me: '11', kind: 'Corner kick', restart: 'corner', air: true, title: 'Back post',
  prompt: "Your 7 is about to take a corner. You're stuck in the crowd at the near post. Drag the 11.",
  hint: 'Everyone went to the near post. Where is the space?',
  lesson: 'When everyone crowds the near post, go to the back post. A cross that flies over the crowd drops right to you.',
  us:   { 1:[25,70], 3:[13,40], 4:[25,42], 2:[37,40], 6:[26,19], 10:[32,11], 11:[30,6], 9:[26,9.5], 7:[51.8,-1.6] },
  them: { 1:[24,1.4], 2:[22,6], 4:[28,2.8], 3:[33.5,6], 6:[29,13.5], 10:[22,15], 11:[38,15], 9:[26,46], 7:[12,44] },
  ball: { team: 'us', n: '7' }, ballAt: CORNER_R,
  zones: [
    [16.5, 5.5, 2.8, 3, 'Pro spot', 'Everyone crowded the near post, so you went to the back post. A cross over the crowd drops to you.'],
    [30, 6, 2.4, 1, 'Crowded', 'Their 4, their 3 and your teammates are all there already.'],
    [22, 10.5, 2, 1, 'Into the crowd', 'Their 2 and 10 are waiting there.']
  ],
  elsewhere: P(1, 'Not quite', 'Find the space away from the crowd.'),
  best: { kind: 'move', at: [16.5,5.5] } },

{ ch: 0, type: 'ball', me: '11', kind: 'Corner kick', restart: 'corner', noCarry: true, air: true, title: 'Find the free player',
  prompt: 'Corner kick from the left. Your 4 came up for it, and nobody picked up the 4.',
  hint: 'Who is free, running at the ball?',
  lesson: 'Find the free player attacking the ball. Big defenders who come up for corners often get forgotten.',
  us:   { 1:[25,70], 3:[13,40], 2:[37,40], 6:[25,22], 4:[22,15], 9:[31,8.5], 10:[15,7], 7:[38,10], 11:[-1.8,-1.6] },
  them: { 1:[25,1.6], 2:[14,3.5], 4:[32,5], 3:[40,7], 6:[29,16], 10:[17,20], 9:[26,46], 7:[12,44], 11:[36,44] },
  ball: '11', ballAt: CORNER_L,
  arrows: [{ team: 'us', from: [22.2,14], to: [23,10.6], dash: 1 }],
  pass: {
    4:  P(2, 'Good', 'Right player, but the 4 is running in. Put it in front of the run.'),
    9:  P(1, 'Marked', 'Their 4 is right on your 9.'),
    10: P(1, 'Marked', 'Their 2 is right on your 10.'),
    7:  P(1, 'Marked', 'Their 3 is right on your 7.'),
    6:  P(1, 'Too safe', 'Your 4 was free, attacking the middle of the box.')
  },
  lead: [
    [23.5, 9, 2.8, 3, 'Pro choice', 'Nobody picked up your 4, so you put it into the space ahead. The 4 attacks it at full speed.', '4', null, true]
  ],
  shoot: null,
  elsewhere: P(1, 'Not quite', 'Find the free player attacking the ball.'),
  best: { kind: 'pass', to: '4', at: [23.5,9] } },

/* ---------------- 2. Their corners ---------------- */
{ ch: 1, type: 'move', me: '4', kind: 'Corner kick', restart: 'corner', title: 'Goal side',
  prompt: "Corner kick to them from our left. Their 9 is at the penalty spot, and you're in front of their 9. Drag the 4.",
  hint: 'Where should you be: in front of their 9, or between their 9 and our goal?',
  lesson: 'On their corner, mark goal side and ball side. The attacker has to go through you to reach the ball.',
  us:   { 1:[25.5,73.5], 3:[21.2,72.3], 4:[24,58.8], 2:[33,68], 6:[29,57], 10:[17,58], 11:[10,50], 9:[25,44], 7:[40,52] },
  them: { 1:[25,4], 7:[-1.8,76.6], 9:[25,65], 4:[33,63.5], 3:[17,62], 10:[30,53], 6:[24,50], 2:[8,62], 11:[40,60] },
  ball: { team: 'them', n: '7' }, ballAt: THEIR_CORNER,
  zones: [
    [23.6, 68.2, 2.3, 3, 'Pro spot', 'You got goal side of their 9, on the ball side. Their 9 has to go through you to reach the cross.'],
    [24.5, 60.5, 2.6, 0, 'Wrong side', 'In front of their 9? The cross goes over you to their 9.'],
    [27.5, 67.5, 1.4, 1, 'Far side', 'Goal side, but on the far side. A cross from our left reaches their 9 first.']
  ],
  elsewhere: P(1, 'Not quite', 'Get between their 9 and our goal, on the side of the ball.'),
  best: { kind: 'move', at: [23.6,68.2] } },

{ ch: 1, type: 'move', me: '3', kind: 'Corner kick', restart: 'corner', title: 'Near post guard',
  prompt: 'Corner kick to them from our left. Nobody is guarding the near post. Drag the 3.',
  hint: 'Where does a low, hard corner go in?',
  lesson: 'Someone guards the near post on every corner. Stand just in front of it, facing the ball.',
  us:   { 1:[25.5,73.5], 3:[13,66], 4:[24.2,68], 2:[33,68], 6:[29,57], 10:[17,58], 11:[10,50], 9:[25,44], 7:[40,52] },
  them: { 1:[25,4], 7:[-1.8,76.6], 9:[25.5,64.6], 4:[33,63.5], 3:[17,62], 10:[30,53], 6:[24,50], 2:[8,62], 11:[40,60] },
  ball: { team: 'them', n: '7' }, ballAt: THEIR_CORNER,
  zones: [
    [21.5, 72, 3, 3, 'Pro spot', 'You guarded the near post, facing the ball. A low corner there hits you, not the net.'],
    [21.5, 72, 4.2, 2, 'Close', 'Almost. Get right up to the near post.'],
    [13, 66, 2.4, 1, 'Wandering', 'Nobody is guarding the near post. A low cross there goes right in.']
  ],
  elsewhere: P(1, 'Not quite', 'Stand just in front of the near post.'),
  best: { kind: 'move', at: [21.5,72] } },

{ ch: 1, type: 'move', me: '9', kind: 'Corner kick', restart: 'corner', title: 'Stay up',
  prompt: 'Corner kick to them. You came all the way back into our box. Drag the 9.',
  hint: 'When we win the ball, who do we pass to?',
  lesson: "On their corner, one forward stays up. That forward is the outlet for the clearance, and keeps their defenders busy.",
  us:   { 1:[25.5,73.5], 3:[21.2,72.3], 4:[24.2,68], 2:[33,68], 6:[29,57], 10:[17,58], 11:[10,50], 7:[40,52], 9:[22,61] },
  them: { 1:[25,4], 7:[-1.8,76.6], 9:[25.5,64.6], 4:[33,63.5], 3:[17,62], 10:[30,53], 6:[24,50], 2:[8,62], 11:[40,60] },
  ball: { team: 'them', n: '7' }, ballAt: THEIR_CORNER,
  zones: [
    [25, 40, 4, 3, 'Pro spot', 'You stayed up near the halfway line. When we win it, you are the outlet, and two of theirs have to stay back to watch you.'],
    [22, 61, 2.4, 1, 'Everyone back', 'With you back here too, there is nobody to pass to when we win it.']
  ],
  elsewhere: P(1, 'Not quite', 'Stay up, near the halfway line.'),
  best: { kind: 'move', at: [25,40] } },

{ ch: 1, type: 'ball', me: '6', kind: 'Corner kick', air: true, title: 'Counter',
  prompt: 'We headed their corner away, and it dropped to you. Their players are still in our box.',
  hint: 'How many of their players are back?',
  lesson: 'After you defend a corner, look forward right away. Their players are still in our box.',
  us:   { 1:[25.5,73.5], 3:[19,70], 4:[24,67], 2:[31,69], 6:[24,57], 10:[30,61], 7:[40,55], 11:[12,52], 9:[25,40] },
  them: { 1:[25,4], 9:[26,63.5], 4:[31,65.5], 3:[18,63], 2:[15,67.5], 10:[28,53], 7:[4,71], 6:[24,47], 11:[38,49] },
  ball: '6',
  arrows: [{ team: 'us', from: [11.6,50.5], to: [10.2,45], dash: 1 }],
  pass: {
    9:  P(2, 'Good', 'Right idea: look forward. But the 9 has open grass behind their 6. Play it into that space.'),
    10: P(1, 'Slow', 'Sideways, and their players get back.'),
    7:  P(1, 'Slow', 'Sideways, and their players get back.'),
    4:  TOO_SAFE('Their players are still in our box. Look forward.'),
    3:  TOO_SAFE('Their players are still in our box. Look forward.'),
    2:  TOO_SAFE('Their players are still in our box. Look forward.'),
    1:  TOO_SAFE('Their players are still in our box. Look forward.')
  },
  lead: [
    [24, 30, 4.5, 3, 'Pro choice', 'Their players were still in our box, so you played it into the space behind their 6. Your 9 is through.', '9', null, true],
    [9, 40, 4, 3, 'Pro choice', 'Their players were still in our box, so you sent your 11 away down the wing.', '11', null, true]
  ],
  shoot: FAR,
  carry: [],
  elsewhere: P(1, 'Too slow', 'Dribbling gives them time to get back. Look forward and pass.'),
  best: { kind: 'pass', to: '9', at: [24,30] } },

{ ch: 1, type: 'move', me: '10', kind: 'Corner kick', restart: 'corner', title: 'Edge of our box',
  prompt: 'Corner kick to them. Their 6 is waiting at the edge of our box, and nobody is on their 6. Drag the 10.',
  hint: 'Where does a cleared corner usually land?',
  lesson: 'On their corner, someone marks the player at the edge of the box. The clearance and the cutback go there.',
  us:   { 1:[25.5,73.5], 3:[21.2,72.3], 4:[24.2,68], 2:[33,68], 6:[33,57.5], 10:[18.5,65], 11:[10,50], 9:[25,44], 7:[40,52] },
  them: { 1:[25,4], 7:[-1.8,76.6], 9:[25.5,64.6], 4:[33,63.5], 3:[15,61.5], 6:[25,56.5], 10:[34,53.5], 2:[8,62], 11:[41,61] },
  ball: { team: 'them', n: '7' }, ballAt: THEIR_CORNER,
  zones: [
    [25, 59.8, 2.4, 3, 'Pro spot', "Their 6 was waiting at the edge of the box. You picked up their 6, goal side, so the cutback or the clearance can't find their 6 free."],
    [18.5, 65, 2, 1, 'Crowded', 'Your teammates have the players in the box. Their 6 is free at the edge of it.']
  ],
  elsewhere: P(1, 'Not quite', 'Pick up their 6, goal side.'),
  best: { kind: 'move', at: [25,59.8] } },

/* ---------------- 3. Our free kicks ---------------- */
{ ch: 2, type: 'ball', me: '10', kind: 'Free kick', restart: 'freekick', noCarry: true, air: true, title: 'Over the wall',
  prompt: 'Free kick to us, about 20 yards out. Their wall is covering the near side of the goal.',
  hint: 'Can you score from here?',
  lesson: 'Free kick in range with a clear look? Shoot. Over the wall on the near side, or around it.',
  us:   { 1:[25,70], 3:[13,45], 4:[25,47], 2:[37,45], 6:[25,30], 10:[20.2,23], 11:[12,11.5], 9:[26,9.5], 7:[36,12] },
  them: { 1:[26,1.8], 4:[19.5,12], 6:[23.1,12], 2:[14,8], 3:[30,8], 10:[29,14], 9:[26,40], 7:[12,40], 11:[38,40] },
  ball: '10', ballAt: [21,20],
  pass: {
    9:  P(1, 'Marked', 'Their 3 and 6 are right next to your 9. You were in range to shoot.'),
    11: P(1, 'Marked', 'Their 2 is right on your 11. You were in range to shoot.'),
    7:  P(1, 'Too wide', 'Passing it out wide wastes a free kick in shooting range.'),
    6:  TOO_SAFE('Backwards, from a free kick in shooting range?')
  },
  shoot: P(3, 'Pro choice', 'Close enough, with a clear look at goal. You curled it over the wall into the near corner.', { end: [22.6,-1.2] }),
  elsewhere: P(1, 'Not quite', 'You are in range.'),
  best: { kind: 'shoot' } },

{ ch: 2, type: 'ball', me: '6', kind: 'Free kick', restart: 'freekick', noCarry: true, title: 'Quick free kick',
  prompt: 'We just won a free kick at midfield. Their players are still jogging back, and your 10 is free right now.',
  hint: 'Do you need to wait for them to get set?',
  lesson: "Free kick and they're not set? Take it quickly, before they organize.",
  us:   { 1:[25,71], 3:[12,55], 4:[25,57], 2:[38,55], 6:[24.5,47.2], 10:[28,33], 11:[8,30], 9:[25,20], 7:[42,30] },
  them: { 1:[25,4], 2:[12,24], 4:[25,23.5], 3:[37,24], 6:[18,40], 10:[32,49], 9:[27,52], 7:[14,50], 11:[38,47] },
  ball: '6', ballAt: [25,44],
  arrows: [{ team: 'them', from: [20.4,43], to: [18.3,40.4] }, { team: 'them', from: [32.4,52], to: [32.1,49.4] }],
  pass: {
    10: P(3, 'Pro choice', 'Their players were still jogging back, so you took it quickly. Your 10 gets it free, facing their goal.'),
    9:  P(1, 'Marked', 'Their 4 is right behind your 9.'),
    11: P(1, 'Not the best', 'Your 10 was free in the middle, right now.'),
    7:  P(1, 'Not the best', 'Your 10 was free in the middle, right now.'),
    4:  TOO_SAFE('Backwards, while they are still getting organized? Your 10 was free.'),
    3:  TOO_SAFE('Backwards, while they are still getting organized? Your 10 was free.'),
    2:  TOO_SAFE('Backwards, while they are still getting organized? Your 10 was free.')
  },
  shoot: FAR,
  elsewhere: P(1, 'Not quite', 'Take it quickly.'),
  best: { kind: 'pass', to: '10' } },

{ ch: 2, type: 'ball', me: '7', kind: 'Free kick', restart: 'freekick', noCarry: true, air: true, title: 'Whip it in',
  prompt: 'Free kick on the right wing. Their defenders are lined up near the penalty spot, and your 9 and 4 are ready to run.',
  hint: 'Where is the space: in front of their defenders, or behind them?',
  lesson: 'Free kick out wide? Whip it into the space between their defenders and their keeper. Your runners attack it; their defenders have to turn.',
  us:   { 1:[25,70], 3:[13,45], 2:[37,45], 6:[26,25], 10:[34,16], 11:[13,13.5], 4:[20.5,13.5], 9:[27,13.5], 7:[46.5,15.8] },
  them: { 1:[25,2], 2:[17,11], 4:[23.5,11], 3:[30,11], 6:[37.3,9.3], 10:[31,18.5], 9:[26,40], 7:[11,41.5], 11:[39,41] },
  ball: '7', ballAt: [44,14],
  arrows: [{ team: 'us', from: [27,12.6], to: [26,8.6], dash: 1 }, { team: 'us', from: [20.8,12.6], to: [22.4,9], dash: 1 }],
  pass: {
    9:  P(1, 'To feet?', 'The 9 is about to run in behind. Put it in the space ahead.'),
    4:  P(1, 'To feet?', 'The 4 is about to run in behind. Put it in the space ahead.'),
    11: P(1, 'Marked', 'Their 2 is right on your 11.'),
    10: P(1, 'Marked', 'Their 10 is right on your 10.'),
    6:  TOO_SAFE('Backwards, from a free kick near their box?')
  },
  lead: [
    [25, 6.5, 3, 3, 'Pro choice', 'You whipped it into the space between their defenders and their keeper. Your 9 runs onto it; their defenders have to turn.', '9', null, true],
    [25, 1.8, 1.4, 1, 'Too close to the keeper', 'Their keeper comes and catches it.', '9', '1']
  ],
  shoot: P(0, 'No angle', 'From out wide, that is not a shot. Put it in the box for your runners.'),
  elsewhere: P(1, 'Not quite', 'Your runners are ready. Put it in the box.'),
  best: { kind: 'pass', to: '9', at: [25,6.5] } },

{ ch: 2, type: 'move', me: '9', kind: 'Free kick', restart: 'freekick', air: true, startsOffside: true, title: 'Stay onside',
  prompt: "Free kick to us on the right wing. You're standing behind their defenders. Drag the 9.",
  hint: 'Find their last defender. Are you past that line?',
  lesson: 'Offside counts on free kicks. Stay level with their last defender until the ball is kicked, then attack it.',
  us:   { 1:[25,70], 3:[13,45], 2:[37,45], 6:[26,25], 10:[34,16], 11:[13,13.5], 4:[20.5,13.5], 9:[26,6], 7:[46.5,15.8] },
  them: { 1:[25,2], 2:[17,11], 4:[23.5,11], 3:[30,11], 6:[37.3,9.3], 10:[31,18.5], 9:[26,40], 7:[11,41.5], 11:[39,41] },
  ball: { team: 'us', n: '7' }, ballAt: [44,14],
  zones: [
    [26.5, 13.5, 2.4, 3, 'Pro spot', 'You got back level with their defenders. When the ball is kicked, you can attack it without being offside.'],
    [26, 6, 2.2, 0, 'Offside', 'You are behind their last defender. If the ball comes to you, it is offside.'],
    [26, 21, 2.4, 1, 'Too deep', 'Onside, but too far from goal to attack the ball.']
  ],
  elsewhere: P(1, 'Not quite', 'Get level with their last defender.'),
  best: { kind: 'move', at: [26.5,13.5] } },

{ ch: 2, type: 'ball', me: '10', kind: 'Free kick', restart: 'freekick', noCarry: true, title: 'Too far to shoot',
  prompt: 'Free kick to us, about 32 yards out. Their wall is set, and your 11 is free on the left.',
  hint: 'Can you really score from here?',
  lesson: "Too far to score from? Don't waste the free kick on a long shot. Find the free teammate and attack from there.",
  us:   { 1:[25,71], 3:[12,52], 4:[25,54], 2:[38,52], 6:[22,42], 10:[25.5,35.1], 11:[7,26], 9:[25,18], 7:[42,24] },
  them: { 1:[25,3], 6:[23.2,24], 10:[26.8,24], 4:[25,13], 2:[15,17], 3:[40,20], 9:[25,46], 7:[12,48], 11:[38,47] },
  ball: '10', ballAt: [25,32],
  pass: {
    11: P(2, 'Good', 'Good idea, but the 11 has grass ahead. Play it into the space.'),
    9:  P(1, 'Marked', 'Their 4 is right behind your 9, and the wall is in the way.'),
    7:  P(1, 'Marked', 'Their 3 is right on your 7.'),
    6:  TOO_SAFE('Backwards? Your 11 was free in space.'),
    4:  TOO_SAFE('Backwards? Your 11 was free in space.')
  },
  lead: [
    [6, 18, 3.5, 3, 'Pro choice', 'Too far to score from, so you found your 11 in space. The 11 can attack their defense from there.', '11', null, true]
  ],
  shoot: P(1, 'Too far', 'From 32 yards, that shot almost never beats the keeper. Keep the ball.'),
  elsewhere: P(1, 'Not quite', 'Find the free teammate.'),
  best: { kind: 'pass', to: '11', at: [6,18] } },

/* ---------------- 4. Their free kicks ---------------- */
{ ch: 3, type: 'move', me: '4', kind: 'Free kick', restart: 'freekick', title: 'Hold the line',
  prompt: 'Free kick to them, out on our left. Your 3 and 2 are holding a line, but you dropped deep. Drag the 4.',
  hint: 'Where are your 3 and 2?',
  lesson: "On their wide free kick, hold your line level with your teammates. Don't drop onto the goal line: their runners get a free header and your keeper has no room.",
  us:   { 1:[25,72.5], 4:[27,69.5], 3:[16,63.5], 2:[33,63.5], 6:[22,57], 10:[13.5,58], 11:[32,50], 9:[25,42], 7:[40,50] },
  them: { 1:[25,4], 7:[3.6,56.2], 9:[25,60.5], 4:[30,60], 3:[19,60.5], 10:[28,54], 2:[12,50], 6:[25,47], 11:[40,46] },
  ball: { team: 'them', n: '7' }, ballAt: [6,58],
  zones: [
    [25, 63.5, 2.2, 3, 'Pro spot', 'You stepped up level with your 3 and 2. Their runners have to start from out there, and your keeper has room to come for the ball.'],
    [27, 69.5, 2.2, 1, 'Too deep', 'Back there you keep everyone onside, and their runners get a free header in front of goal.'],
    [25, 57.5, 1.8, 1, 'Too high', 'Stepping past their runners leaves all the space behind you.']
  ],
  elsewhere: P(1, 'Not quite', 'Get level with your 3 and 2.'),
  best: { kind: 'move', at: [25,63.5] } },

{ ch: 3, type: 'move', me: '6', kind: 'Free kick', restart: 'freekick', title: 'Get behind the ball',
  prompt: 'We fouled them at midfield, and their 6 is taking it quickly. You are standing next to the ball. Drag the 6.',
  hint: 'Which side of the ball should you be on?',
  lesson: "When they take a free kick quickly, don't complain. Sprint back behind the ball and protect the middle.",
  us:   { 1:[25,71], 3:[13,58], 4:[25,59], 2:[37,58], 6:[20,41], 10:[30,30], 9:[25,22], 11:[10,30], 7:[40,30] },
  them: { 1:[25,4], 2:[12,26], 4:[25,25.5], 3:[37,27], 6:[23.5,39], 10:[29,49], 9:[24,55], 7:[12,50], 11:[38,50] },
  ball: { team: 'them', n: '6' }, ballAt: [24,42],
  arrows: [{ team: 'them', from: [29,46.5], to: [28,51.8], dash: 1 }],
  zones: [
    [25.5, 51.5, 2.6, 3, 'Pro spot', 'They took it quickly, so you sprinted back behind the ball, into the middle in front of your defenders.'],
    [20, 41, 2.2, 0, 'Wrong side', 'Standing next to the ball does nothing. Their pass goes right past you.'],
    [22.5, 45.5, 1.6, 1, 'Ball watching', 'Still on the wrong side of the ball.']
  ],
  elsewhere: P(1, 'Not quite', 'Sprint back behind the ball, into the middle.'),
  best: { kind: 'move', at: [25.5,51.5] } },

{ ch: 3, type: 'move', me: '3', kind: 'Free kick', restart: 'freekick', title: 'Back post runner',
  prompt: 'Free kick to them on our right wing. Their 7 is sneaking toward the back post. Drag the 3.',
  hint: 'Where is their 7 going? Get there first.',
  lesson: 'Wide free kick against us? Watch the runner on the far side. Get to the back post first, goal side of the runner.',
  us:   { 1:[26,72.5], 3:[11,58], 4:[25,64], 2:[31,63.5], 6:[21,60], 10:[37,61.5], 11:[14,50], 9:[25,42], 7:[40,48] },
  them: { 1:[25,4], 11:[46.6,56.4], 9:[25,60.5], 4:[31,60], 7:[13.5,62.5], 3:[19,56], 10:[30,52], 2:[12,46], 6:[25,48] },
  ball: { team: 'them', n: '11' }, ballAt: [44,58],
  arrows: [{ team: 'them', from: [13.8,63], to: [16.6,66.8], dash: 1 }],
  zones: [
    [17.5, 69, 2, 3, 'Pro spot', 'Their 7 was sneaking to the back post, so you got there first, goal side of their 7.'],
    [11, 58, 2.2, 1, 'Ball watching', 'Their 7 ran right past you to the back post.']
  ],
  elsewhere: P(1, 'Not quite', 'Beat their 7 to the back post.'),
  best: { kind: 'move', at: [17.5,69] } },

{ ch: 3, type: 'move', me: '9', kind: 'Free kick', restart: 'freekick', title: 'Block the easy pass',
  prompt: 'Free kick to them, deep in their half. Their 3 is taking it, and their 4 is free in the middle. Drag the 9.',
  hint: 'Which pass do they want? How close can you stand?',
  lesson: 'On their free kick, stand in the passing lane to their free player, eight yards from the ball. Make them go long.',
  us:   { 1:[25,71], 3:[13,50], 4:[25,52], 2:[37,50], 6:[24,40], 10:[25,28], 9:[31,24], 11:[9,17], 7:[44,21] },
  them: { 1:[25,3], 3:[38.5,10.3], 4:[25,10], 2:[6,13], 6:[25,22], 10:[34,28], 11:[44,30], 7:[8,26], 9:[27,46] },
  ball: { team: 'them', n: '3' }, ballAt: [37,13],
  zones: [
    [28.9, 11, 2.2, 3, 'Pro spot', 'You stood in the pass to their 4, eight yards from the ball. Their 3 has to go long or wide, where our team is waiting.'],
    [31, 24, 2.4, 1, 'Too far', 'From there their 4 gets an easy pass and starts the attack.'],
    [33, 12.5, 1.6, 0, 'Too close', 'Inside eight yards of the ball. The referee makes you move back.']
  ],
  elsewhere: P(1, 'Not quite', 'Stand in the pass to their 4, eight yards from the ball.'),
  best: { kind: 'move', at: [28.9,11] } },

{ ch: 3, type: 'move', me: '2', kind: 'Free kick', restart: 'freekick', title: 'End of the wall',
  prompt: "Free kick to them, 20 yards out on our right. Your 6 is in the wall, and you're the end of it. Drag the 2.",
  hint: 'Draw a line from the ball to the nearest post.',
  lesson: 'The end of the wall lines up on the line from the ball to the near post, eight yards away. The wall takes the near side; the keeper takes the rest.',
  us:   { 1:[24.8,72.6], 2:[38,64], 6:[28.2,63.4], 4:[22,64], 3:[15,64], 10:[20,58], 11:[12,50], 9:[25,42], 7:[40,48] },
  them: { 1:[25,4], 10:[35.2,54.2], 9:[23,60.5], 4:[28,58], 3:[17,60.5], 7:[8,58], 11:[42,60], 2:[15,47], 6:[28,47] },
  ball: { team: 'them', n: '10' }, ballAt: [34,57],
  zones: [
    [31.6, 64.6, 2, 3, 'Pro spot', 'You lined up between the ball and the near post, eight yards away. The near side is covered, and your keeper takes the rest.'],
    [31.6, 64.6, 3, 2, 'Close', 'Almost. Line up exactly between the ball and the near post.'],
    [38, 64, 2, 1, 'Too wide', 'The wall has a gap at the near post.'],
    [33, 59.5, 1.6, 0, 'Too close', 'Inside eight yards. The referee moves you back.']
  ],
  elsewhere: P(1, 'Not quite', 'Line up between the ball and the near post.'),
  best: { kind: 'move', at: [31.6,64.6] } },

/* ---------------- 5. Throw-ins ---------------- */
{ ch: 4, type: 'ball', me: '3', kind: 'Throw-in', restart: 'throw', range: 20, noCarry: true, air: true, title: 'Down the line',
  prompt: 'Throw-in to us on the left, near halfway. Your 11 is sprinting down the line.',
  hint: 'Where will your 11 be when the ball gets there?',
  lesson: 'Teammate running down the line? Throw it into the space ahead, to run onto.',
  us:   { 1:[25,70], 4:[25,52], 2:[38,50], 3:[-1.6,42.7], 6:[12,44], 10:[20,32], 11:[6,36], 9:[25,20], 7:[42,28] },
  them: { 1:[25,4], 2:[13,31], 4:[25,24], 3:[38,24], 6:[17,40], 10:[24,45], 9:[27,48.5], 7:[8,46.5], 11:[38,40] },
  ball: '3', ballAt: [-0.3,40],
  arrows: [{ team: 'us', from: [6,34.6], to: [4.6,30.6], dash: 1 }],
  pass: {
    11: P(2, 'Good', 'The 11 is free and running down the line. Throw it into the space ahead.'),
    6:  P(1, 'Marked', 'Their 7 is right on your 6.')
  },
  lead: [
    [4, 29, 3, 3, 'Pro choice', 'Your 11 was sprinting down the line, so you threw it into the space ahead. The 11 runs onto it.', '11', null, true]
  ],
  shoot: null,
  elsewhere: P(1, 'Not quite', 'Your 11 is running down the line. Use that run.'),
  best: { kind: 'pass', to: '11', at: [4,29] } },

{ ch: 4, type: 'ball', me: '2', kind: 'Throw-in', restart: 'throw', range: 20, noCarry: true, air: true, title: 'To feet',
  prompt: 'Throw-in to us on the right. Your 7 came short, but their 3 is right behind.',
  hint: 'Where is their 3? What happens to a throw over your 7’s head?',
  lesson: 'Defender right behind your teammate? Throw it to feet, for an easy lay-back. A throw over the top goes straight to the defender.',
  us:   { 1:[25,70], 3:[12,48], 4:[25,50], 6:[30,38], 2:[51.6,32.7], 7:[44,33], 10:[38,26], 9:[25,15], 11:[8,22] },
  them: { 1:[25,3], 3:[44.5,28.5], 6:[37,22], 11:[40,38.5], 10:[31,30], 4:[25,19], 2:[12,18], 9:[25,44], 7:[12,40] },
  ball: '2', ballAt: [50.3,30],
  arrows: [{ team: 'us', from: [44,28.6], to: [44,32], dash: 1 }],
  pass: {
    7:  P(3, 'Pro choice', 'The 7 came short with their 3 right behind, so you threw it to feet. The 7 can lay it back to you.'),
    10: P(1, 'Marked', 'Their 6 is right on your 10.')
  },
  lead: [
    [46.5, 24, 3, 0, 'Into the run', 'Their 3 is right behind your 7. A throw down the line goes straight to their 3.', '7', '3']
  ],
  shoot: null,
  elsewhere: P(1, 'Not quite', 'Your 7 came short for it.'),
  best: { kind: 'pass', to: '7' } },

{ ch: 4, type: 'ball', me: '3', kind: 'Throw-in', restart: 'throw', range: 20, noCarry: true, air: true, title: 'Forward, not across',
  prompt: 'Throw-in to us on the left, near our own box. Their 9 is close to your 4.',
  hint: 'Which throw goes toward danger?',
  lesson: 'Throw-in near your own goal? Throw it forward, down the line, away from danger. Never across the front of your box.',
  us:   { 1:[25,71], 4:[12,66], 2:[37,60], 3:[-1.6,64.7], 6:[13,58], 11:[7,52], 10:[22,44], 9:[25,32], 7:[42,40] },
  them: { 1:[25,4], 9:[14,62.5], 7:[13,54], 10:[20,52], 2:[10,44], 11:[38,55], 6:[26,46], 4:[25,28], 3:[38,32] },
  ball: '3', ballAt: [-0.3,62],
  pass: {
    11: P(3, 'Pro choice', 'You threw it forward, down the line to your 11. Away from our goal, and the 11 is free.'),
    6:  P(1, 'Marked', 'Their 7 is right on your 6.'),
    4:  P(0, 'Across our box', 'A throw across the front of our goal with their 9 right there. Steal it there, and their 9 scores.')
  },
  shoot: null,
  elsewhere: P(1, 'Not quite', 'Throw it forward.'),
  best: { kind: 'pass', to: '11' } },

{ ch: 4, type: 'move', me: '10', kind: 'Throw-in', restart: 'throw', range: 20, air: true, title: 'Get free for it',
  prompt: 'Your 3 has a throw-in. Their 6 is right on your back. Drag the 10.',
  hint: 'Where is there open grass close to your 3?',
  lesson: 'Teammate taking a throw? Move into open space, close enough for a short throw, where nobody is near you.',
  us:   { 1:[25,70], 4:[25,52], 2:[38,50], 3:[-1.6,42.7], 6:[16,46], 10:[14,34], 11:[5,32], 9:[25,20], 7:[42,28] },
  them: { 1:[25,4], 2:[6,28.4], 4:[25,24], 3:[38,24], 6:[15,30.5], 10:[24,38], 9:[26,46], 7:[16,42], 11:[38,40] },
  ball: { team: 'us', n: '3' }, ballAt: [-0.3,40],
  zones: [
    [8.5, 45.5, 2.5, 3, 'Pro spot', 'Their 6 was tight on you, so you moved into the open space near the line. Your 3 has an easy throw, and you can face forward.'],
    [14, 34, 2.4, 1, 'Marked', "Their 6 is right behind you. Your 3 can't throw it to you there."],
    [19, 35, 2.6, 2, 'Good', "You're open, but that's a long throw past their 6 and 10. The space near the line is a shorter, safer throw."],
    [23, 31, 2.6, 1, 'Too far', 'Out of throwing range.']
  ],
  elsewhere: P(1, 'Not quite', 'Find open space close to your 3.'),
  best: { kind: 'move', at: [8.5,45.5] } },

{ ch: 4, type: 'move', me: '7', kind: 'Throw-in', restart: 'throw', title: 'Their throw-in',
  prompt: 'Throw-in to them on our right. Their 11 is waiting near the line, and nobody is on their 11. Drag the 7.',
  hint: 'Who is the easy throw going to?',
  lesson: 'On their throw-in, mark the closest player tight, goal side. Make the easy throw a hard one.',
  us:   { 1:[25,71], 3:[13,57], 4:[25,59], 2:[37,58], 6:[28,48], 10:[24,38], 11:[10,38], 9:[25,25], 7:[38,40] },
  them: { 1:[25,4], 3:[51.6,47.3], 11:[44,46], 10:[36,50], 9:[27,53], 6:[30,40], 7:[12,48], 2:[12,30], 4:[25,21] },
  ball: { team: 'them', n: '3' }, ballAt: [50.3,50],
  zones: [
    [45.4, 49.3, 2.3, 3, 'Pro spot', 'You marked their 11 tight, goal side. A throw to feet has you right behind.'],
    [38, 40, 2.4, 1, 'Too far', 'Their 11 is free for an easy throw.'],
    [43, 42.5, 1.6, 0, 'Wrong side', 'In front of their 11? One spin and their 11 is away down the line.']
  ],
  elsewhere: P(1, 'Not quite', 'Mark their 11 tight, goal side.'),
  best: { kind: 'move', at: [45.4,49.3] } },

/* ---------------- 6. Goal kicks ---------------- */
{ ch: 5, type: 'ball', me: '1', kind: 'Goal kick', restart: 'goalkick', noCarry: true, title: 'Short to the free back',
  prompt: 'Goal kick to us. Your 3 split wide, and their 9 is on your 4.',
  hint: 'Who is free close to you?',
  lesson: 'On a goal kick, look for the free defender first. A short pass keeps the ball.',
  us:   { 1:[21.8,74], 3:[6,63], 4:[24,63], 2:[42,63], 6:[23,53], 10:[25,42], 11:[7,42], 9:[26,28], 7:[43,42] },
  them: { 1:[25,4], 9:[25.5,59.5], 7:[15,58], 11:[38,59], 10:[21,50], 6:[28,40], 2:[11,36], 4:[25,24], 3:[38,36] },
  ball: '1', ballAt: [20,71.5],
  pass: {
    3:  P(3, 'Pro choice', 'Your 3 split wide and nobody was near, so you passed it to the 3. Short, simple, and we keep the ball.'),
    4:  P(1, 'Pressed', 'Their 9 is right on your 4.'),
    2:  P(1, 'Marked', 'Their 11 is ready to jump on your 2.'),
    6:  P(1, 'Marked', 'Their 10 is right on your 6.'),
    9:  LONG('A long goal kick is a 50-50. Your 3 was free and close.'),
    10: LONG('A long goal kick is a 50-50. Your 3 was free and close.'),
    11: LONG('A long goal kick is a 50-50. Your 3 was free and close.'),
    7:  LONG('A long goal kick is a 50-50. Your 3 was free and close.')
  },
  shoot: null,
  elsewhere: P(1, 'Not quite', 'Find the free teammate close to you.'),
  best: { kind: 'pass', to: '3' } },

{ ch: 5, type: 'move', me: '2', kind: 'Goal kick', restart: 'goalkick', title: 'Split wide',
  prompt: "Goal kick to us. You're standing right next to your 4. Drag the 2.",
  hint: 'Where can the keeper pass to you with the most time?',
  lesson: 'On our goal kick, the wide backs split wide toward the sideline. Width gives the keeper an easy pass and gives you time.',
  us:   { 1:[28.8,74], 2:[32,66], 4:[25,64], 3:[7,63], 6:[24,53], 10:[25,42], 11:[7,42], 9:[26,28], 7:[43,42] },
  them: { 1:[25,4], 9:[24,59.5], 11:[37,55], 7:[13,55], 10:[28,49], 6:[22,40], 2:[11,36], 4:[25,24], 3:[38,36] },
  ball: { team: 'us', n: '1' }, ballAt: [27,71.5],
  zones: [
    [45, 62, 3, 3, 'Pro spot', 'Goal kick, so you split wide by the sideline. Your keeper has an easy pass, and you have time to look up.'],
    [32, 66, 2.4, 1, 'Too narrow', 'Too close to your 4. One player can press you both.'],
    [38, 56, 2.2, 1, 'Too high', 'Their 11 is right there.']
  ],
  elsewhere: P(1, 'Not quite', 'Split wide, toward the sideline.'),
  best: { kind: 'move', at: [45,62] } },

{ ch: 5, type: 'move', me: '6', kind: 'Goal kick', restart: 'goalkick', title: 'Show for it',
  prompt: 'Goal kick to us. Their 10 is marking you, and their 9 is near your 4. Drag the 6.',
  hint: 'Where is there space in front of our box?',
  lesson: 'On our goal kick, show for the ball in the space their forwards leave. Get into a clear passing lane.',
  us:   { 1:[26.8,74], 4:[25,64], 3:[6,63], 2:[44,63], 6:[30,46], 10:[25,38], 11:[7,40], 9:[26,26], 7:[43,40] },
  them: { 1:[25,4], 9:[25,59.5], 10:[31,49.5], 7:[12,57], 11:[38,57], 6:[23,35], 2:[11,34], 4:[25,22], 3:[38,34] },
  ball: { team: 'us', n: '1' }, ballAt: [25,71.5],
  zones: [
    [19.5, 58, 2.4, 3, 'Pro spot', 'Their 10 was on you, so you dropped into the space next to their 9. Your keeper has a clear pass, and you can turn.'],
    [30, 46, 2.4, 1, 'Marked', "Their 10 is right on you. The keeper can't find you there."],
    [25, 55.5, 1.8, 0, 'Behind their 9', 'Their 9 is standing in the passing lane.']
  ],
  elsewhere: P(1, 'Not quite', 'Find a clear passing lane from the keeper.'),
  best: { kind: 'move', at: [19.5,58] } },

{ ch: 5, type: 'move', me: '9', kind: 'Goal kick', restart: 'goalkick', title: 'Their goal kick',
  prompt: 'Goal kick to them. Their 2 and 3 split wide, and your wingers went with them. Drag the 9.',
  hint: 'Which short pass is left? Where are you allowed to stand?',
  lesson: 'On their goal kick, stand just outside the box in the pass to their center back. Make them kick it long or go wide into your trap.',
  us:   { 1:[25,71], 3:[13,50], 4:[25,52], 2:[37,50], 6:[24,40], 10:[25,28], 9:[31,24], 11:[9,17], 7:[41,17] },
  them: { 1:[25.8,0.6], 4:[25,9.5], 2:[6,13], 3:[44,13], 6:[25,24], 10:[30,30], 9:[25,44], 7:[12,42], 11:[38,42] },
  ball: { team: 'them', n: '1' }, ballAt: [25,3.5],
  zones: [
    [25, 16.2, 2.2, 3, 'Pro spot', 'You stood at the edge of their box, right in the pass to their 4. Their keeper has to go wide or long, where your wingers are waiting.'],
    [25, 10.5, 2, 0, 'Inside the box', 'On a goal kick you have to stay outside the box until the ball is kicked. The kick is taken again.'],
    [31, 24, 2.4, 1, 'Too far', 'Their keeper rolls it to their 4, and they are away.']
  ],
  elsewhere: P(1, 'Not quite', 'Stand just outside the box, in the pass to their 4.'),
  best: { kind: 'move', at: [25,16.2] } },

{ ch: 5, type: 'ball', me: '1', kind: 'Goal kick', restart: 'goalkick', noCarry: true, air: true, title: 'Over the press',
  prompt: 'Goal kick to us. They are pressing everyone, and their defenders pushed up to halfway.',
  hint: 'Everyone close is marked. Where is the space?',
  lesson: 'They press your goal kick with everyone? Go long into the channel behind their wide defender, away from their keeper.',
  us:   { 1:[21.8,74], 3:[6,63], 4:[24,63], 2:[42,63], 6:[24,53], 10:[22,44], 11:[7,42], 9:[25,40], 7:[43,42] },
  them: { 1:[25,12], 9:[24,59.5], 7:[10,59.5], 11:[38,59.5], 10:[27,50], 6:[19,48], 2:[11,46], 4:[27,43.5], 3:[40,46] },
  ball: '1', ballAt: [20,71.5],
  pass: {
    4:  P(1, 'Pressed', 'Their 9 is right on your 4.'),
    3:  P(1, 'Pressed', 'Their 7 is right on your 3.'),
    2:  P(1, 'Pressed', 'Their 11 is right on your 2.'),
    6:  P(1, 'Marked', 'Their 10 is right on your 6.'),
    9:  P(1, 'To feet?', 'Their 4 is right behind your 9. The space is behind their defenders.'),
    10: P(1, 'Marked', 'Their 6 and 4 are close to your 10.'),
    11: P(1, 'To feet?', 'Their 2 is right on your 11. The space is behind their 2.'),
    7:  P(1, 'Marked', 'Their 3 is right on your 7.')
  },
  lead: [
    [8, 32, 4, 3, 'Pro choice', 'They pressed with everyone, so you kicked it long into the channel behind their 2. Your 11 runs onto it, away from their keeper.', '11', null, true],
    [25, 27, 4, 2, 'Good', 'Over the press works, but their keeper can come out for that one. The channel is safer.', '9', null, true]
  ],
  shoot: null,
  elsewhere: P(1, 'Not quite', 'Everyone close is marked. Find the space.'),
  best: { kind: 'pass', to: '11', at: [8,32] } }
];

// ---------------------------------------------------------------------------
// Motion: the written plays (format at the top of riddles-motion.js). The ball stays on its spot
// during the build-up; only the players move.
const MOTION = {
  /* ---- 1. Our corners ---- */
  'Near post': {
    intro: { start: { us: { 9: [36, 15], 10: [16, 19], 11: [17, 14] } },
      cam: { at: [40, 8], zoom: 1.4, tilt: .5 },
      steps: [
        { t: 1.5, us: { 9: [31, 11], 10: [18, 13], 11: [14, 7] }, head: 'Corner kick to us from the right', sub: 'Your 9 is about to sprint to the near post.',
          cam: { at: [30, 9], zoom: 1.3, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      lead0: [{ t: .5, tag: { 'us:9': ['FIRST', 'good'] }, head: 'Near post', sub: 'Your 9 attacked the near post, so you whipped it into the space ahead…',
          cam: { at: [28, 5], zoom: 1.55, tilt: .45 } },
        { t: .5, shot: [26.5, -1], head: 'Near post', sub: '…and the 9 gets there before their keeper.', wait: 1.1 }],
      9: say('Behind the run', 'The 9 was running to the near post. Put it in front of the run.', { at: [30, 10], zoom: 1.4, tilt: .5 }),
      10: steal('10', '6', [20.5, 14], 'Crowded', 'Their 6 is on your 10, and their 4 is right there.'),
      11: steal('11', '2', [16, 5], 'Marked', 'Their 2 is right on your 11 at the back post.'),
      6: say('Too safe', 'Back to the edge of the box wastes the corner. Your 9 was attacking the near post.', { at: [28, 20], zoom: 1.3, tilt: .5 })
    } },

  'Take it short': {
    intro: { start: { us: { 10: [42, 13] }, them: { 3: [34, 11], 10: [32, 19] } },
      cam: { at: [40, 8], zoom: 1.4, tilt: .5 },
      steps: [
        { t: 1.5, us: { 10: [43, 6] }, them: { 3: [33, 6], 10: [33, 14] }, tag: { 'us:10': ['FREE', 'good'] }, head: 'Corner kick to us from the right',
          sub: 'Their box is packed, and your 10 comes short to you.', cam: { at: [36, 8], zoom: 1.3, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      10: [{ t: 1, them: { 11: [40.5, 8.5], 3: [37, 6.5] }, tag: { 'them:11': 'PRESS', 'them:3': 'PRESS' }, head: 'Take it short',
        sub: 'Their box was packed and your 10 was free, so you took it short. Now their defenders have to come out to the 10.', cam: { at: [38, 7], zoom: 1.45, tilt: .5 }, wait: 1.2 }],
      9: steal('9', '4', [27, 5.5], 'Marked', 'Their 4 is right on your 9, and their keeper is close.'),
      11: steal('11', '2', [18.5, 5.5], 'Marked', 'Their 2 is right on your 11.'),
      6: say('Not the best', 'A long pass back to the edge of the box. Your 10 was free right next to you.', { at: [30, 16], zoom: 1.25, tilt: .5 })
    } },

  'Edge of the box': {
    intro: { start: { us: { 6: [26.5, 15], 9: [34, 13], 10: [16, 16] } },
      cam: { at: [28, 14], zoom: 1.35, tilt: .5 },
      steps: [
        { t: 1.5, us: { 6: [25, 7.5], 9: [30, 9], 10: [19, 10] }, head: 'Corner kick to us', sub: 'Everyone runs into the box, and you go with them.',
          cam: { at: [26, 10], zoom: 1.3, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.2, pass: 'them:6', air: true, head: 'Edge of the box', sub: 'Everyone else attacks the goal, so you held the edge of the box…', cam: { at: [25, 12], zoom: 1.3, tilt: .5 } },
        { t: .8, pass: 'us:6', air: true, tag: { 'us:6': ['YOURS', 'good'] }, head: 'Edge of the box', sub: '…so the clearance comes to you, and their counter is over.', wait: 1.1 }],
      zone1: [{ t: 1.2, pass: 'them:6', air: true, head: 'Too crowded', sub: 'One more player in the crowd, and nobody guarding the edge of the box…', cam: { at: [25, 12], zoom: 1.3, tilt: .5 } },
        { t: .8, pass: 'them:10', air: true, tag: { 'them:10': 'FREE' }, head: 'Too crowded', sub: '…so the clearance goes to their 10, who starts the counter.', cam: { at: [29, 18], zoom: 1.3, tilt: .5 }, wait: 1.1 }],
      zone2: [{ t: 1.2, pass: 'them:6', air: true, head: 'Too deep', sub: 'Too far back to win the clearance…', cam: { at: [25, 14], zoom: 1.2, tilt: .5 } },
        { t: .8, pass: 'them:10', air: true, tag: { 'them:10': 'FREE' }, head: 'Too deep', sub: '…so their 10 gets it and starts the counter.', cam: { at: [29, 20], zoom: 1.25, tilt: .5 }, wait: 1.1 }]
    } },

  'Back post': {
    intro: { start: { us: { 10: [36, 14], 11: [33, 12] } },
      cam: { at: [38, 8], zoom: 1.4, tilt: .5 },
      steps: [
        { t: 1.5, us: { 10: [32, 11], 11: [30, 6] }, head: 'Corner kick to us from the right', sub: "Everyone crowds the near post, and you're stuck in there too.",
          cam: { at: [29, 8], zoom: 1.4, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: .5, tag: { 'us:11': ['FREE', 'good'] }, head: 'Back post', sub: 'Everyone crowded the near post, so you went to the back post. The cross drops to you…',
          cam: { at: [19, 5], zoom: 1.5, tilt: .45 } },
        { t: .5, shot: [23, -1], head: 'Back post', sub: '…and you finish it.', wait: 1.1 }],
      zone1: say('Crowded', 'Their 4, their 3 and your teammates are all there already.', { at: [30, 7], zoom: 1.45, tilt: .5 }),
      zone2: say('Into the crowd', 'Their 2 and 10 are waiting there.', { at: [22, 10], zoom: 1.45, tilt: .5 })
    } },

  'Find the free player': {
    intro: { start: { us: { 4: [20, 28] } },
      cam: { at: [10, 8], zoom: 1.4, tilt: .5 },
      steps: [
        { t: 1.5, us: { 4: [22, 15] }, tag: { 'us:4': ['FREE', 'good'] }, head: 'Corner kick to us from the left', sub: 'Your 4 comes up for it, and nobody picks up the 4.',
          cam: { at: [18, 12], zoom: 1.3, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      lead0: [{ t: .5, head: 'Find the free player', sub: 'Nobody picked up your 4, so you put it into the space ahead…', cam: { at: [23, 8], zoom: 1.5, tilt: .45 } },
        { t: .5, shot: [22.5, -1], them: { 1: [27.5, 2.2] }, head: 'Find the free player', sub: '…and the 4 heads it in.', wait: 1.1 }],
      4: say('To feet', 'Right player, but the 4 was running in. Put it in front of the run.', { at: [22, 12], zoom: 1.4, tilt: .5 }),
      6: say('Too safe', 'Your 4 was free, attacking the middle of the box.', { at: [24, 18], zoom: 1.3, tilt: .5 }),
      7: steal('7', '3', [40, 8], 'Marked', 'Their 3 is right on your 7.'),
      9: steal('9', '4', [32, 6], 'Marked', 'Their 4 is right on your 9.'),
      10: steal('10', '2', [14.5, 4.5], 'Marked', 'Their 2 is right on your 10.')
    } },

  /* ---- 2. Their corners ---- */
  'Goal side': {
    intro: { start: { them: { 9: [27, 60], 4: [35, 58] } },
      cam: { at: [10, 70], zoom: 1.4, tilt: .45 },
      steps: [
        { t: 1.5, them: { 9: [25, 65], 4: [33, 63.5] }, head: 'Corner kick to them from our left', sub: "Their 9 goes to the penalty spot, and you're in front of their 9.",
          cam: { at: [22, 64], zoom: 1.25, tilt: .45 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.3, pass: 'us:4', air: true, tag: { 'us:4': ['HEADER', 'good'] }, head: 'Goal side',
          sub: 'You got goal side of their 9, on the ball side. Their 9 has to go through you…', cam: { at: [20, 69], zoom: 1.4, tilt: .45 } },
        { t: 1, pass: 'us:11', air: true, head: 'Goal side', sub: '…and you head it away.', cam: { at: [16, 58], zoom: 1.1, tilt: .5 }, wait: 1.1 }],
      zone1: [{ t: 1.3, pass: 'them:9', air: true, tag: { 'them:9': 'FREE' }, head: 'Wrong side', sub: 'In front of their 9? The cross goes over you to their 9.',
          cam: { at: [22, 68], zoom: 1.4, tilt: .45 } },
        { t: .5, shot: [23.5, 75.8], wait: 1 }],
      zone2: [{ t: 1.3, pass: 'them:9', air: true, tag: { 'them:9': 'FREE' }, head: 'Far side', sub: 'Goal side, but on the far side. A cross from our left reaches their 9 first.',
          cam: { at: [22, 68], zoom: 1.4, tilt: .45 } },
        { t: .5, shot: [23.5, 75.8], wait: 1 }]
    } },

  'Near post guard': {
    intro: { start: { them: { 9: [27, 60], 4: [35, 58] } },
      cam: { at: [10, 70], zoom: 1.4, tilt: .45 },
      steps: [
        { t: 1.5, them: { 9: [25.5, 64.6], 4: [33, 63.5] }, head: 'Corner kick to them from our left', sub: 'Their players crowd the box, and nobody is guarding the near post.',
          cam: { at: [17, 68], zoom: 1.3, tilt: .45 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: .8, pass: 'us:3', tag: { 'us:3': ['BLOCKED', 'good'] }, head: 'Near post guard',
        sub: 'You guarded the near post, facing the ball. A low corner there hits you, not the net.', cam: { at: [16, 72], zoom: 1.5, tilt: .45 }, wait: 1.2 }],
      zone1: [{ t: .8, pass: 'us:3', tag: { 'us:3': ['BLOCKED', 'good'] }, head: 'Close',
        sub: 'It hits you. Next time get right up to the near post.', cam: { at: [16, 72], zoom: 1.5, tilt: .45 }, wait: 1.2 }],
      zone2: [{ t: .9, shot: [22.3, 75.8], head: 'Wandering', sub: 'Nobody was guarding the near post. A low cross there goes right in.',
        cam: { at: [16, 72], zoom: 1.45, tilt: .45 }, wait: 1.1 }]
    } },

  'Stay up': {
    intro: { start: { us: { 9: [20, 50] } },
      cam: { at: [20, 52], zoom: 1.4, tilt: .5 },
      steps: [
        { t: 1.5, us: { 9: [22, 61] }, head: 'Corner kick to them', sub: 'You came all the way back into our box.', cam: { at: [20, 63], zoom: 1.25, tilt: .45 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.2, pass: 'us:4', air: true, tag: { 'us:4': ['HEADER', 'good'] }, head: 'Stay up', sub: 'We win the corner…', cam: { at: [22, 64], zoom: 1.3, tilt: .45 } },
        { t: 1.1, pass: 'us:9', air: true, tag: { 'us:9': ['OUTLET', 'good'] }, head: 'Stay up',
          sub: '…and you are the outlet near the halfway line. Two of theirs had to stay back to watch you.', cam: { at: [25, 46], zoom: 1.15, tilt: .5 }, wait: 1.2 }],
      zone1: [{ t: 1.2, pass: 'us:4', air: true, head: 'Everyone back', sub: 'We win the corner…', cam: { at: [22, 64], zoom: 1.3, tilt: .45 } },
        { t: 1.1, pass: 'them:6', air: true, tag: { 'them:6': 'THEIR BALL' }, head: 'Everyone back',
          sub: '…but with you back here too, there is nobody to pass to, and they get it back.', cam: { at: [24, 54], zoom: 1.3, tilt: .5 }, wait: 1.1 }]
    } },

  'Counter': {
    intro: { start: { ball: 'us:4' },
      cam: { at: [22, 66], zoom: 1.4, tilt: .45 },
      steps: [
        { t: 1.3, pass: 'us:6', air: true, pd: .1, tag: { 'us:6': ['YOURS', 'good'] }, head: 'We head their corner away', sub: 'It drops to you, and their players are still in our box.',
          cam: { at: [24, 58], zoom: 1.2, tilt: .45 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      lead0: [{ t: 1.1, us: { 9: [24, 20] }, tag: { 'us:9': ['THROUGH', 'good'], 'them:6': 'BYPASSED' }, hatch: [{ pts: [[12, 12], [38, 12], [38, 40], [12, 40]], c: 'good' }],
        head: 'Counter', sub: 'Their players were still in our box, so you played it into the space behind their 6. Your 9 is through.', cam: { at: [25, 28], zoom: 1.15, tilt: .55 }, wait: 1.2 }],
      lead1: [{ t: 1.1, us: { 11: [8, 28] }, tag: { 'us:11': ['AWAY', 'good'] }, head: 'Counter',
        sub: 'Their players were still in our box, so you sent your 11 away down the wing.', cam: { at: [12, 36], zoom: 1.15, tilt: .55 }, wait: 1.2 }],
      9: say('To feet', 'Right idea: look forward. But the 9 had open grass behind their 6. Play it into that space.', { at: [25, 42], zoom: 1.3, tilt: .5 }),
      7: say('Slow', 'Sideways, and their players get back.', { at: [32, 56], zoom: 1.2, tilt: .5 }),
      10: say('Slow', 'Sideways, and their players get back.', { at: [27, 60], zoom: 1.25, tilt: .5 }),
      1: say('Too safe', 'Their players are still in our box. Look forward.', { at: [25, 64], zoom: 1.2, tilt: .45 }),
      2: say('Too safe', 'Their players are still in our box. Look forward.', { at: [28, 64], zoom: 1.2, tilt: .45 }),
      3: say('Too safe', 'Their players are still in our box. Look forward.', { at: [21, 64], zoom: 1.2, tilt: .45 }),
      4: say('Too safe', 'Their players are still in our box. Look forward.', { at: [24, 62], zoom: 1.2, tilt: .45 })
    } },

  'Edge of our box': {
    intro: { start: { us: { 10: [21, 60] }, them: { 6: [24, 50] } },
      cam: { at: [22, 56], zoom: 1.4, tilt: .45 },
      steps: [
        { t: 1.5, us: { 10: [18.5, 65] }, them: { 6: [25, 56.5] }, tag: { 'them:6': 'FREE' }, head: 'Corner kick to them',
          sub: 'Their 6 waits at the edge of our box, and nobody is on their 6.', cam: { at: [22, 62], zoom: 1.3, tilt: .45 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.3, pass: 'us:4', air: true, head: 'Edge of our box', sub: 'You picked up their 6, goal side…', cam: { at: [24, 64], zoom: 1.35, tilt: .45 } },
        { t: .8, pass: 'us:10', air: true, tag: { 'us:10': ['YOURS', 'good'] }, head: 'Edge of our box', sub: "…so the clearance can't find their 6 free.", wait: 1.1 }],
      zone1: [{ t: 1.3, pass: 'us:4', air: true, head: 'Crowded', sub: 'Your teammates had the players in the box…', cam: { at: [24, 64], zoom: 1.35, tilt: .45 } },
        { t: .8, pass: 'them:6', air: true, tag: { 'them:6': 'FREE' }, head: 'Crowded', sub: '…and the clearance falls to their 6, free at the edge of it.' },
        { t: .6, shot: [26.5, 75.8], wait: 1 }]
    } },

  /* ---- 3. Our free kicks ---- */
  'Over the wall': {
    intro: { start: { them: { 4: [17, 16], 6: [26, 16] } },
      cam: { at: [21, 22], zoom: 1.45, tilt: .5 },
      steps: [
        { t: 1.4, them: { 4: [19.5, 12], 6: [23.1, 12] }, tag: { 'them:6': 'WALL' }, head: 'Free kick to us, about 20 yards out',
          sub: 'Their wall covers the near side of the goal.', cam: { at: [22, 14], zoom: 1.4, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      shoot: { replace: true, steps: [{ t: 1, shot: [22.5, -1], air: true, them: { 1: [27, 2] }, tag: { 'us:10': ['GOAL', 'good'] }, head: 'Over the wall',
        sub: 'In range, so you went for goal: up over the wall and down into the near side.', cam: { at: [23, 10], zoom: 1.35, tilt: .5 }, wait: 1.2 }] },
      6: say('Too safe', 'Backwards, from a free kick in shooting range?', { at: [24, 26], zoom: 1.3, tilt: .5 }),
      7: say('Too wide', 'Passing it out wide wastes a free kick in shooting range.', { at: [30, 16], zoom: 1.3, tilt: .5 }),
      9: steal('9', '3', [28.5, 8.5], 'Marked', 'Their 3 and 6 are right next to your 9. You were in range to shoot.'),
      11: steal('11', '2', [13.5, 9.5], 'Marked', 'Their 2 is right on your 11. You were in range to shoot.')
    } },

  'Quick free kick': {
    intro: { start: { us: { 10: [30, 37] }, them: { 6: [21, 46], 10: [32, 53] } },
      cam: { at: [25, 46], zoom: 1.4, tilt: .5 },
      steps: [
        { t: 1.5, us: { 10: [28, 33] }, them: { 6: [18, 40], 10: [32, 49] }, tag: { 'us:10': ['FREE', 'good'] }, head: 'We win a free kick at midfield',
          sub: 'Their players are still jogging back, and your 10 is free right now.', cam: { at: [26, 42], zoom: 1.25, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      10: [{ t: 1.1, us: { 10: [30, 27] }, tag: { 'us:10': ['TURNED', 'good'] }, head: 'Quick free kick',
        sub: 'Their players were still jogging back, so you took it quickly. Your 10 gets it free, facing their goal.', cam: { at: [27, 30], zoom: 1.25, tilt: .55 }, wait: 1.2 }],
      9: steal('9', '4', [25.5, 22.5], 'Marked', 'Their 4 is right behind your 9.'),
      7: say('Not the best', 'Your 10 was free in the middle, right now.', { at: [36, 36], zoom: 1.2, tilt: .5 }),
      11: say('Not the best', 'Your 10 was free in the middle, right now.', { at: [14, 36], zoom: 1.2, tilt: .5 }),
      2: say('Too safe', 'Backwards, while they are still getting organized? Your 10 was free.', { at: [32, 52], zoom: 1.2, tilt: .5 }),
      3: say('Too safe', 'Backwards, while they are still getting organized? Your 10 was free.', { at: [18, 52], zoom: 1.2, tilt: .5 }),
      4: say('Too safe', 'Backwards, while they are still getting organized? Your 10 was free.', { at: [25, 52], zoom: 1.2, tilt: .5 })
    } },

  'Whip it in': {
    intro: { start: { us: { 9: [27, 21], 4: [22, 22] }, them: { 2: [17, 15], 4: [23.5, 16], 3: [30, 16] } },
      cam: { at: [36, 16], zoom: 1.4, tilt: .5 },
      steps: [
        { t: 1.5, us: { 9: [27, 13.5], 4: [20.5, 13.5] }, them: { 2: [17, 11], 4: [23.5, 11], 3: [30, 11] }, head: 'Free kick to us on the right wing',
          sub: 'Their defenders line up near the penalty spot, and your 9 and 4 get ready to run.', cam: { at: [30, 12], zoom: 1.3, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      lead0: [{ t: .5, tag: { 'us:9': ['FIRST', 'good'] }, head: 'Whip it in', sub: 'You whipped it into the space between their defenders and their keeper…',
          cam: { at: [25, 7], zoom: 1.5, tilt: .45 } },
        { t: .5, shot: [22.5, -1], them: { 1: [27.5, 2.5] }, head: 'Whip it in', sub: '…and your 9 gets there first, while their defenders have to turn.', wait: 1.1 }],
      9: say('To feet?', 'The 9 was about to run in behind. Put it in the space ahead.', { at: [27, 12], zoom: 1.4, tilt: .5 }),
      4: say('To feet?', 'The 4 was about to run in behind. Put it in the space ahead.', { at: [21, 12], zoom: 1.4, tilt: .5 }),
      10: steal('10', '10', [32, 17.8], 'Marked', 'Their 10 is right on your 10.'),
      11: steal('11', '2', [15, 12], 'Marked', 'Their 2 is right on your 11.'),
      6: say('Too safe', 'Backwards, from a free kick near their box?', { at: [28, 22], zoom: 1.3, tilt: .5 })
    } },

  'Stay onside': {
    intro: { start: { us: { 9: [27, 14] } },
      cam: { at: [36, 14], zoom: 1.4, tilt: .5 },
      steps: [
        { t: 1.5, us: { 9: [26, 6] }, head: 'Free kick to us on the right wing', sub: 'You drift in behind their defenders.', cam: { at: [28, 10], zoom: 1.35, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: .9, chain: [{ ns: ['them:2', 'them:4', 'them:3'], c: 'good' }], tag: { 'us:9': ['ONSIDE', 'good'] }, head: 'Stay onside',
        sub: 'You got back level with their defenders. When the ball is kicked, you can attack it without being offside.', cam: { at: [26, 12], zoom: 1.4, tilt: .5 }, wait: 1.2 }],
      zone1: offside('9', 11, 'You are behind their last defender. If the ball comes to you, it is offside.'),
      zone2: say('Too deep', 'Onside, but too far from goal to attack the ball.', { at: [26, 16], zoom: 1.3, tilt: .5 })
    } },

  'Too far to shoot': {
    intro: { start: { us: { 11: [9, 32] }, them: { 6: [21, 28], 10: [29, 28] } },
      cam: { at: [25, 32], zoom: 1.4, tilt: .5 },
      steps: [
        { t: 1.4, us: { 11: [7, 26] }, them: { 6: [23.2, 24], 10: [26.8, 24] }, tag: { 'them:6': 'WALL' }, head: 'Free kick to us, about 32 yards out',
          sub: 'Their wall is set, and your 11 is free on the left.', cam: { at: [19, 27], zoom: 1.2, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      lead0: [{ t: 1.1, us: { 11: [8, 10] }, tag: { 'us:11': ['AWAY', 'good'] }, head: 'Too far to shoot',
        sub: 'Too far to score from, so you found your 11 in space. The 11 can attack their defense from there.', cam: { at: [12, 16], zoom: 1.25, tilt: .55 }, wait: 1.2 }],
      11: say('To feet', 'Good idea, but the 11 had grass ahead. Play it into the space.', { at: [9, 26], zoom: 1.3, tilt: .5 }),
      shoot: say('Too far', 'From 32 yards, their keeper sees it coming all the way.', { at: [25, 10], zoom: 1.3, tilt: .5 }),
      7: steal('7', '3', [40.5, 21.5], 'Marked', 'Their 3 is right on your 7.'),
      9: steal('9', '4', [25, 15.5], 'Marked', 'Their 4 is right behind your 9, and the wall is in the way.'),
      4: say('Too safe', 'Backwards? Your 11 was free in space.', { at: [25, 44], zoom: 1.2, tilt: .5 }),
      6: say('Too safe', 'Backwards? Your 11 was free in space.', { at: [23, 38], zoom: 1.2, tilt: .5 })
    } },

  /* ---- 4. Their free kicks ---- */
  'Hold the line': {
    intro: { start: { us: { 4: [26, 65] }, them: { 3: [17, 55], 9: [25, 55], 4: [32, 55] } },
      cam: { at: [12, 58], zoom: 1.4, tilt: .45 },
      steps: [
        { t: 1.5, us: { 4: [27, 69.5] }, them: { 3: [19, 60.5], 9: [25, 60.5], 4: [30, 60] }, head: 'Free kick to them, out on our left',
          sub: 'Your 3 and 2 hold a line, but you drop deep.', cam: { at: [21, 63], zoom: 1.2, tilt: .45 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: .8, chain: [{ ns: ['us:3', 'us:4', 'us:2'], c: 'good' }], head: 'Hold the line',
          sub: 'You stepped up level with your 3 and 2, so their runners have to start from out there…', cam: { at: [22, 65], zoom: 1.25, tilt: .45 } },
        { t: 1.2, pass: 'us:1', air: true, tag: { 'us:1': ['CAUGHT', 'good'] }, head: 'Hold the line', sub: '…and your keeper has room to come for the ball.', wait: 1.2 }],
      zone1: [{ t: 1.2, pass: 'them:9', air: true, them: { 9: [23.5, 65.5] }, chain: [{ ns: ['us:3', 'us:4', 'us:2'], c: 'bad' }], tag: { 'them:9': 'FREE' }, head: 'Too deep',
          sub: 'Back there you kept everyone onside, and their runners get a free header in front of goal.', cam: { at: [23, 67], zoom: 1.35, tilt: .45 } },
        { t: .5, shot: [23.5, 75.8], wait: 1 }],
      zone2: [{ t: 1.2, pass: 'them:9', air: true, them: { 9: [24, 66] }, tag: { 'them:9': 'FREE' }, head: 'Too high',
          sub: 'Stepping past their runners left all the space behind you.', cam: { at: [23, 66], zoom: 1.35, tilt: .45 } },
        { t: .5, shot: [23.5, 75.8], wait: 1 }]
    } },

  'Get behind the ball': {
    intro: { start: { us: { 6: [18, 38] }, them: { 10: [29, 45] } },
      cam: { at: [23, 40], zoom: 1.45, tilt: .5 },
      steps: [
        { t: 1.3, us: { 6: [20, 41] }, them: { 10: [29, 49] }, head: 'We foul them at midfield', sub: 'Their 6 takes it quickly, and you are standing next to the ball.',
          cam: { at: [24, 45], zoom: 1.3, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1, pass: 'them:10', them: { 10: [28, 51.8] }, tag: { 'us:6': ['TIGHT', 'good'] }, head: 'Get behind the ball',
          sub: 'They took it quickly, so you sprinted back behind the ball, into the middle…', cam: { at: [26, 50], zoom: 1.4, tilt: .5 } },
        { t: .5, pass: 'us:6', tag: { 'us:6': ['WON IT', 'good'] }, head: 'Get behind the ball', sub: '…in front of your defenders, and you win it.', wait: 1.1 }],
      zone1: [{ t: 1, pass: 'them:10', them: { 10: [28, 51.8] }, head: 'Wrong side', sub: 'Standing next to the ball does nothing. Their pass goes right past you…',
          cam: { at: [25, 48], zoom: 1.3, tilt: .5 } },
        { t: 1, them: { 10: [31, 58] }, tag: { 'them:10': 'FREE' }, head: 'Wrong side', sub: '…and their 10 runs at our defense.', wait: 1 }],
      zone2: [{ t: 1, pass: 'them:10', them: { 10: [28, 51.8] }, head: 'Ball watching', sub: 'Still on the wrong side of the ball. Their pass goes past you…',
          cam: { at: [25, 48], zoom: 1.3, tilt: .5 } },
        { t: 1, them: { 10: [31, 58] }, tag: { 'them:10': 'FREE' }, head: 'Ball watching', sub: '…and their 10 runs at our defense.', wait: 1 }]
    } },

  'Back post runner': {
    intro: { start: { them: { 9: [25, 55], 4: [32, 55], 7: [15, 56] } },
      cam: { at: [38, 56], zoom: 1.4, tilt: .45 },
      steps: [
        { t: 1.5, them: { 9: [25, 60.5], 4: [31, 60], 7: [13.5, 62.5] }, head: 'Free kick to them on our right wing', sub: 'Their 7 sneaks toward the back post.',
          cam: { at: [24, 62], zoom: 1.15, tilt: .45 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.3, pass: 'us:3', air: true, them: { 7: [14.5, 64.5] }, tag: { 'us:3': ['BACK POST', 'good'] }, head: 'Back post runner',
          sub: 'Their 7 was sneaking to the back post, so you got there first, goal side…', cam: { at: [18, 66], zoom: 1.4, tilt: .45 } },
        { t: .9, pass: 'us:11', air: true, head: 'Back post runner', sub: '…and head it away.', cam: { at: [16, 58], zoom: 1.1, tilt: .5 }, wait: 1.1 }],
      zone1: [{ t: 1.3, pass: 'them:7', air: true, pd: .2, them: { 7: [16.6, 66.8] }, tag: { 'them:7': 'FREE' }, head: 'Ball watching',
          sub: 'Their 7 ran right past you to the back post.', cam: { at: [18, 67], zoom: 1.4, tilt: .45 } },
        { t: .5, shot: [22.5, 75.8], wait: 1 }]
    } },

  'Block the easy pass': {
    intro: { start: { us: { 9: [30, 30] }, them: { 4: [25, 16], 3: [36, 16] } },
      cam: { at: [32, 20], zoom: 1.4, tilt: .5 },
      steps: [
        { t: 1.5, us: { 9: [31, 24] }, them: { 4: [25, 10], 3: [38.5, 10.3] }, tag: { 'them:4': 'FREE' }, head: 'Free kick to them, deep in their half',
          sub: 'Their 3 takes it, and their 4 is free in the middle.', cam: { at: [31, 15], zoom: 1.3, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.3, pass: 'us:6', air: true, tag: { 'us:9': ['BLOCKS IT', 'good'] }, head: 'Block the easy pass',
          sub: 'You stood in the pass to their 4, eight yards from the ball, so their 3 has to go long…', cam: { at: [30, 24], zoom: 1.05, tilt: .5 } },
        { t: .6, tag: { 'us:6': ['OURS', 'good'] }, head: 'Block the easy pass', sub: '…where our team is waiting.', cam: { at: [24, 38], zoom: 1.25, tilt: .5 }, wait: 1.1 }],
      zone1: [{ t: .9, pass: 'them:4', tag: { 'them:4': 'FREE' }, head: 'Too far', sub: 'From there their 4 gets an easy pass…', cam: { at: [28, 13], zoom: 1.35, tilt: .5 } },
        { t: 1, them: { 4: [23, 17] }, head: 'Too far', sub: '…and starts the attack.', wait: 1 }],
      zone2: say('Too close', 'Inside eight yards of the ball. The referee makes you move back.', { at: [35, 12], zoom: 1.5, tilt: .5 })
    } },

  'End of the wall': {
    intro: { start: { us: { 6: [26, 61], 2: [38, 58] } },
      cam: { at: [33, 58], zoom: 1.45, tilt: .45 },
      steps: [
        { t: 1.4, us: { 6: [28.2, 63.4], 2: [38, 64] }, tag: { 'us:6': ['WALL', 'good'] }, head: 'Free kick to them, 20 yards out on our right',
          sub: 'Your 6 is in the wall, and you are the end of it.', cam: { at: [32, 63], zoom: 1.4, tilt: .45 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: .6, pass: 'us:2', tag: { 'us:2': ['BLOCKED', 'good'] }, head: 'End of the wall',
        sub: 'You lined up between the ball and the near post, eight yards away. The near side is covered, and your keeper takes the rest.', cam: { at: [31, 63], zoom: 1.5, tilt: .45 }, wait: 1.2 }],
      zone1: [{ t: .6, pass: 'us:2', tag: { 'us:2': ['BLOCKED', 'good'] }, head: 'Close',
        sub: 'It hits you. Next time line up exactly between the ball and the near post.', cam: { at: [31, 63], zoom: 1.5, tilt: .45 }, wait: 1.2 }],
      zone2: [{ t: .7, shot: [27.6, 75.8], head: 'Too wide', sub: 'The wall had a gap at the near post.', cam: { at: [30, 68], zoom: 1.4, tilt: .45 }, wait: 1.1 }],
      zone3: say('Too close', 'Inside eight yards. The referee moves you back.', { at: [33, 60], zoom: 1.5, tilt: .45 })
    } },

  /* ---- 5. Throw-ins ---- */
  'Down the line': {
    intro: { start: { us: { 11: [8, 42] } },
      cam: { at: [6, 42], zoom: 1.45, tilt: .5 },
      steps: [
        { t: 1.4, us: { 11: [6, 36] }, tag: { 'us:11': ['RUN', 'good'] }, head: 'Throw-in to us on the left', sub: 'Near halfway. Your 11 sprints down the line.',
          cam: { at: [8, 38], zoom: 1.4, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      lead0: [{ t: 1.1, us: { 11: [5, 20] }, tag: { 'us:11': ['AWAY', 'good'] }, head: 'Down the line',
        sub: 'Your 11 was sprinting down the line, so you threw it into the space ahead. The 11 runs onto it.', cam: { at: [9, 26], zoom: 1.3, tilt: .55 }, wait: 1.2 }],
      11: say('To feet', 'The 11 was free and running down the line. Throw it into the space ahead.', { at: [8, 38], zoom: 1.4, tilt: .5 }),
      6: steal('6', '7', [10, 46], 'Marked', 'Their 7 is right on your 6.')
    } },

  'To feet': {
    intro: { start: { us: { 7: [44, 26] }, them: { 3: [44.5, 22] } },
      cam: { at: [46, 28], zoom: 1.45, tilt: .5 },
      steps: [
        { t: 1.4, us: { 7: [44, 33] }, them: { 3: [44.5, 28.5] }, tag: { 'them:3': 'FOLLOW' }, head: 'Throw-in to us on the right',
          sub: 'Your 7 comes short, but their 3 follows right behind.', cam: { at: [45, 31], zoom: 1.45, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      7: [{ t: .8, tag: { 'us:7': ['HOLDS IT', 'good'] }, head: 'To feet', sub: 'The 7 came short with their 3 right behind, so you threw it to feet…',
          cam: { at: [46, 32], zoom: 1.5, tilt: .5 } },
        { t: .8, us: { 2: [48.5, 36] }, pass: 'us:2', pd: .3, head: 'To feet', sub: '…and the 7 lays it back to you.', wait: 1.1 }],
      10: steal('10', '6', [37.5, 23.5], 'Marked', 'Their 6 is right on your 10.')
    } },

  'Forward, not across': {
    intro: { start: { us: { 11: [9, 58] }, them: { 9: [18, 58] } },
      cam: { at: [8, 60], zoom: 1.45, tilt: .5 },
      steps: [
        { t: 1.4, us: { 11: [7, 52] }, them: { 9: [14, 62.5] }, tag: { 'them:9': 'PRESS' }, head: 'Throw-in to us on the left',
          sub: 'Near our own box. Their 9 closes in on your 4.', cam: { at: [9, 60], zoom: 1.4, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      11: [{ t: 1, us: { 11: [6.5, 49] }, tag: { 'us:11': ['FREE', 'good'] }, head: 'Forward, not across',
        sub: 'You threw it forward, down the line to your 11. Away from our goal, and the 11 is free.', cam: { at: [9, 52], zoom: 1.35, tilt: .5 }, wait: 1.2 }],
      4: steal('4', '9', [13.5, 63.5], 'Across our box', 'A throw across the front of our goal with their 9 right there. Steal it there, and their 9 scores.'),
      6: steal('6', '7', [13, 55.5], 'Marked', 'Their 7 is right on your 6.')
    } },

  'Get free for it': {
    intro: { start: { us: { 10: [16, 30] }, them: { 6: [17, 26] } },
      cam: { at: [8, 40], zoom: 1.4, tilt: .5 },
      steps: [
        { t: 1.4, us: { 10: [14, 34] }, them: { 6: [15, 30.5] }, tag: { 'them:6': 'MARK' }, head: 'Your 3 has a throw-in', sub: 'Their 6 is right on your back.',
          cam: { at: [11, 36], zoom: 1.4, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1, face: { 'us:10': 'up' }, tag: { 'us:10': ['FREE', 'good'] }, head: 'Get free for it',
        sub: 'Their 6 was tight on you, so you moved into the open space near the line. An easy throw, and you can face forward.', cam: { at: [10, 44], zoom: 1.4, tilt: .5 }, wait: 1.2 }],
      zone1: say('Marked', "Their 6 is right behind you. Your 3 can't throw it to you there.", { at: [13, 33], zoom: 1.45, tilt: .5 }),
      zone2: say('Good', "You're open, but that was a long throw past their 6 and 10. The space near the line is shorter and safer.", { at: [14, 38], zoom: 1.3, tilt: .5 }),
      zone3: say('Too far', 'Out of throwing range.', { at: [14, 36], zoom: 1.1, tilt: .5 })
    } },

  'Their throw-in': {
    intro: { start: { them: { 11: [40, 42] } },
      cam: { at: [46, 46], zoom: 1.45, tilt: .5 },
      steps: [
        { t: 1.4, them: { 11: [44, 46] }, tag: { 'them:11': 'FREE' }, head: 'Throw-in to them on our right', sub: 'Their 11 waits near the line, and nobody is on their 11.',
          cam: { at: [43, 46], zoom: 1.35, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: .8, pass: 'them:11', air: true, tag: { 'us:7': ['TIGHT', 'good'] }, head: 'Their throw-in', sub: 'You marked their 11 tight, goal side…', cam: { at: [46, 48], zoom: 1.5, tilt: .5 } },
        { t: .5, pass: 'us:7', tag: { 'us:7': ['WON IT', 'good'] }, head: 'Their throw-in', sub: '…so a throw to feet has you right behind, and you win it.', wait: 1.1 }],
      zone1: [{ t: .8, pass: 'them:11', air: true, tag: { 'them:11': 'FREE' }, head: 'Too far', sub: 'Their 11 is free for an easy throw…', cam: { at: [44, 48], zoom: 1.4, tilt: .5 } },
        { t: 1, them: { 11: [44, 56] }, head: 'Too far', sub: '…and runs at our defense.', wait: 1 }],
      zone2: [{ t: .8, pass: 'them:11', air: true, head: 'Wrong side', sub: 'In front of their 11…', cam: { at: [44, 48], zoom: 1.4, tilt: .5 } },
        { t: 1, them: { 11: [46, 56] }, tag: { 'them:11': 'PAST YOU' }, head: 'Wrong side', sub: '…so one spin and their 11 is away down the line.', wait: 1 }]
    } },

  /* ---- 6. Goal kicks ---- */
  'Short to the free back': {
    intro: { start: { us: { 3: [12, 64], 2: [36, 64] }, them: { 9: [27, 56], 11: [35, 55], 7: [17, 54] } },
      cam: { at: [22, 68], zoom: 1.4, tilt: .45 },
      steps: [
        { t: 1.5, us: { 3: [6, 63], 2: [42, 63] }, them: { 9: [25.5, 59.5], 11: [38, 59], 7: [15, 58] }, tag: { 'them:9': 'MARK' }, head: 'Goal kick to us',
          sub: 'Your 3 and 2 split wide, and their 9 marks your 4.', cam: { at: [24, 62], zoom: 1.1, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      3: [{ t: 1.1, us: { 3: [6, 54] }, tag: { 'us:3': ['FREE', 'good'] }, head: 'Short to the free back',
        sub: 'Your 3 split wide and nobody was near, so you passed it to the 3. Short, simple, and we keep the ball.', cam: { at: [11, 58], zoom: 1.3, tilt: .5 }, wait: 1.2 }],
      2: steal('2', '11', [39.5, 60.5], 'Marked', 'Their 11 is ready to jump on your 2.'),
      4: steal('4', '9', [25.5, 61], 'Pressed', 'Their 9 is right on your 4.'),
      6: steal('6', '10', [21.5, 51], 'Marked', 'Their 10 is right on your 6.'),
      7: say('Long ball', 'A long goal kick is a 50-50. Your 3 was free and close.', { at: [25, 36], zoom: 1.1, tilt: .5 }),
      9: say('Long ball', 'A long goal kick is a 50-50. Your 3 was free and close.', { at: [25, 36], zoom: 1.1, tilt: .5 }),
      10: say('Long ball', 'A long goal kick is a 50-50. Your 3 was free and close.', { at: [25, 36], zoom: 1.1, tilt: .5 }),
      11: say('Long ball', 'A long goal kick is a 50-50. Your 3 was free and close.', { at: [25, 36], zoom: 1.1, tilt: .5 }),
    } },

  'Split wide': {
    intro: { start: { us: { 2: [30, 60], 3: [12, 64] } },
      cam: { at: [28, 66], zoom: 1.4, tilt: .45 },
      steps: [
        { t: 1.4, us: { 2: [32, 66], 3: [7, 63] }, head: 'Goal kick to us', sub: "You're standing right next to your 4.", cam: { at: [28, 66], zoom: 1.35, tilt: .45 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.1, us: { 2: [45, 54] }, tag: { 'us:2': ['TIME', 'good'] }, head: 'Split wide',
        sub: 'Goal kick, so you split wide by the sideline. An easy pass, and time to look up.', cam: { at: [40, 58], zoom: 1.3, tilt: .5 }, wait: 1.2 }],
      zone1: say('Too narrow', 'Too close to your 4. One player can press you both.', { at: [28, 64], zoom: 1.4, tilt: .45 },
        { t: 1, them: { 9: [28, 62] }, tag: { 'them:9': 'PRESS' } }),
      zone2: say('Too high', 'Their 11 is right there.', { at: [38, 56], zoom: 1.45, tilt: .5 }, { tag: { 'them:11': 'MARK' } })
    } },

  'Show for it': {
    intro: { start: { us: { 6: [32, 41] }, them: { 10: [33, 44] } },
      cam: { at: [30, 46], zoom: 1.4, tilt: .5 },
      steps: [
        { t: 1.4, us: { 6: [30, 46] }, them: { 10: [31, 49.5] }, tag: { 'them:10': 'MARK' }, head: 'Goal kick to us', sub: 'Their 10 marks you, and their 9 is near your 4.',
          cam: { at: [28, 54], zoom: 1.25, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.1, us: { 6: [19, 52] }, tag: { 'us:6': ['TURNED', 'good'], 'them:10': 'BYPASSED' }, head: 'Show for it',
        sub: 'Their 10 was on you, so you dropped into the space next to their 9. A clear pass, and you can turn.', cam: { at: [20, 56], zoom: 1.3, tilt: .5 }, wait: 1.2 }],
      zone1: say('Marked', "Their 10 is right on you. The keeper can't find you there.", { at: [30, 48], zoom: 1.45, tilt: .5 }),
      zone2: say('Behind their 9', 'Their 9 is standing in the passing lane.', { at: [25, 62], zoom: 1.45, tilt: .45 })
    } },

  'Their goal kick': {
    intro: { start: { us: { 11: [13, 20], 7: [37, 20] }, them: { 2: [12, 14], 3: [38, 14], 4: [25, 14] } },
      cam: { at: [25, 12], zoom: 1.3, tilt: .5 },
      steps: [
        { t: 1.5, us: { 11: [9, 17], 7: [41, 17] }, them: { 2: [6, 13], 3: [44, 13], 4: [25, 9.5] }, head: 'Goal kick to them',
          sub: 'Their 2 and 3 split wide, and your wingers go with them.', cam: { at: [25, 16], zoom: 1.1, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.2, pass: 'us:11', air: true, tag: { 'us:9': ['BLOCKS IT', 'good'], 'us:11': ['WON IT', 'good'] }, head: 'Their goal kick',
        sub: 'You stood in the pass to their 4, so their keeper had to go wide, where your 11 was waiting.', cam: { at: [16, 14], zoom: 1.2, tilt: .5 }, wait: 1.2 }],
      zone1: say('Inside the box', 'On a goal kick you have to stay outside the box until the ball is kicked. The kick is taken again.', { at: [25, 10], zoom: 1.45, tilt: .5 }),
      zone2: [{ t: .8, pass: 'them:4', tag: { 'them:4': 'FREE' }, head: 'Too far', sub: 'Their keeper rolls it to their 4…', cam: { at: [25, 10], zoom: 1.4, tilt: .5 } },
        { t: 1, them: { 4: [23, 18] }, head: 'Too far', sub: '…and they are away.', wait: 1 }]
    } },

  'Over the press': {
    intro: { start: { them: { 9: [27, 55], 7: [12, 54], 11: [36, 54], 10: [27, 45], 6: [19, 43], 2: [11, 40], 3: [40, 40], 4: [29, 38], 1: [25, 6] } },
      cam: { at: [22, 66], zoom: 1.35, tilt: .45 },
      steps: [
        { t: 1.6, them: { 9: [24, 59.5], 7: [10, 59.5], 11: [38, 59.5], 10: [27, 50], 6: [19, 48], 2: [11, 46], 3: [40, 46], 4: [27, 43.5], 1: [25, 12] },
          tag: { 'them:9': 'PRESS' }, head: 'Goal kick to us', sub: 'They press everyone, and their defenders push up to halfway.', cam: { at: [25, 52], zoom: 1, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      lead0: [{ t: 1.1, us: { 11: [9, 22] }, tag: { 'us:11': ['AWAY', 'good'], 'them:2': 'BYPASSED' }, hatch: [{ pts: [[0, 16], [18, 16], [18, 40], [0, 40]], c: 'good' }],
        head: 'Over the press', sub: 'They pressed with everyone, so you kicked it long into the channel behind their 2. Your 11 runs onto it, away from their keeper.',
        cam: { at: [12, 30], zoom: 1.15, tilt: .55 }, wait: 1.2 }],
      lead1: [{ t: 1, them: { 1: [25, 19] }, tag: { 'them:1': 'COMES OUT' }, head: 'Over the press',
        sub: 'Over the press works, but their keeper can come out for that one. The channel was safer.', cam: { at: [25, 24], zoom: 1.3, tilt: .55 }, wait: 1.1 }],
      9: steal('9', '4', [26.5, 42.3], 'To feet?', 'Their 4 is right behind your 9. The space is behind their defenders.'),
      11: steal('11', '2', [9, 44], 'To feet?', 'Their 2 is right on your 11. The space is behind their 2.'),
      2: steal('2', '11', [40, 61], 'Pressed', 'Their 11 is right on your 2.'),
      3: steal('3', '7', [8, 61], 'Pressed', 'Their 7 is right on your 3.'),
      4: steal('4', '9', [24.5, 60.6], 'Pressed', 'Their 9 is right on your 4.'),
      6: steal('6', '10', [26, 51], 'Marked', 'Their 10 is right on your 6.'),
      7: steal('7', '3', [41.5, 44], 'Marked', 'Their 3 is right on your 7.'),
      10: steal('10', '6', [20.5, 46], 'Marked', 'Their 6 and 4 are close to your 10.')
    } },
};
window.RIDDLE_LIB.withMotion(RIDDLES, MOTION);
window.RIDDLE_LIB.defineSet({ key: 'sp', chapters: CHAPTERS, riddles: RIDDLES });
})();
