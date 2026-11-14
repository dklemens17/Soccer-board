/* Futsal puzzles (5v5): one mixed set about attacking strategy. Each puzzle says which player you are.

   The court is 20 x 40 m, drawn in units of 0.4 m: x 0-50 (our left touchline to our right),
   y 0-100 (their goal line at the top to ours at the bottom). Their posts are at x 21.25 and 28.75,
   their penalty area reaches 15 units (6 m) out, the 10 m mark is 25 units out. No offside.
   Our players are numbered like the 9v9 players who do the same job: 1 keeper, 4 the fixo (the last
   player, who starts the attack), 11 and 7 the alas (left and right wingers), 9 the pivot (the
   target striker). Their players use the same numbers; their 7 plays on our left side, their 11 on
   our right. We attack in a 3-1 (the fixo, two alas, the pivot) against their 1-2-1 or 2-2.

   Answer format: see the top of riddles-6.js. Plays (motion) are at the bottom, matched by title. */
(function () {
const { P, TOO_SAFE, steal, say } = window.RIDDLE_LIB;
const CORNER_L = [0.4, 0.4];

const CHAPTERS = [
  { name: 'Beat the press', blurb: 'Angles, the far side and the third man get the ball out.' },
  { name: 'Rotations', blurb: 'Keep moving so their defenders have to choose.' },
  { name: 'Switches', blurb: 'Move the ball faster than they can shift.' },
  { name: 'The pivot', blurb: 'Play into the 9 and combine around it.' },
  { name: 'Create the shot', blurb: 'Make the space, then hit it early.' },
  { name: 'Counters and routines', blurb: 'Outnumber them, and plays that are planned.' }
];

const RIDDLES = [
/* ---------------- 1. Beat the press ---------------- */
{ ch: 0, type: 'ball', me: '1', title: 'Throw to the free side', noCarry: true, restart: 'clearance',
  prompt: 'You caught their shot. Their press has shifted to our left side, and your 7 is alone on the right.',
  hint: 'Where are they not?',
  lesson: 'When they all press one side, the space is on the other side. Get it there before they shift.',
  us:   { 1:[25,93], 4:[21,81], 11:[6,72], 9:[26,50], 7:[44,70] },
  them: { 1:[25,3], 9:[20.5,75.5], 7:[9.5,67.5], 11:[31,66], 4:[26,44.5] },
  ball: '1',
  pass: {
    7:  P(3, 'Pro choice', 'Their press shifted to our left, so you threw it to the 7 on the free side. Now the 7 faces forward with space to run into.'),
    4:  P(1, 'Risky', 'Their 9 is right on your 4. That throw invites the steal right in front of our goal.'),
    11: P(1, 'Marked', 'Their 7 is tight on your 11, on the crowded side.'),
    9:  P(1, 'Risky', 'A long throw to the 9 with their 4 right behind. The 7 was free and closer.')
  },
  lead: [[44, 61, 5.6, 3, 'Pro choice', 'Their press shifted to our left, so you threw it into the space ahead of your 7. The 7 runs onto it facing forward.', '7']],
  shoot: null,
  elsewhere: P(1, 'Not quite', 'Their press is all on the left. Look right.'),
  best: { kind: 'pass', to: '7' } },

{ ch: 0, type: 'ball', me: '4', title: 'Fix the defender',
  prompt: 'Nobody is pressing you. Their front two sit in the lanes to your alas, ready to slide across.',
  hint: 'Make one of them come to you first.',
  lesson: 'Nobody pressing you? Carry it at them until one has to step up. Then pass to the player they left.',
  us:   { 1:[25,93], 4:[25,63], 11:[6,52], 9:[25,28], 7:[44,52] },
  them: { 1:[25,3], 9:[17,46], 11:[33,46], 7:[14,30], 4:[25,23] },
  ball: '4',
  pass: {
    11: P(1, 'They slide across', 'Their 9 is right there to slide over while the ball travels. Pull their 9 in first.'),
    7:  P(1, 'They slide across', 'Their 11 is right there to slide over while the ball travels. Pull their 11 in first.'),
    9:  P(1, 'Marked', 'Their 4 is tight behind your pivot, and both of their front two can drop onto the 9.'),
    1:  TOO_SAFE('Back to the keeper, when nobody was pressing you?')
  },
  carry: [
    [25, 52, 5.6, 3, 'Pro choice', 'Nobody pressed you, so you carried it into the gap between their front two. One of them has to step up to you, and the ala behind them is free.'],
    [12, 58, 3.5, 1, 'Wrong way', 'You carried it toward your 11, so their 9 can mark you both.'],
    [38, 58, 3.5, 1, 'Wrong way', 'You carried it toward your 7, so their 11 can mark you both.']
  ],
  shoot: null,
  elsewhere: P(1, 'Not quite', 'Carry it straight at the gap between their front two.'),
  best: { kind: 'carry', at: [25, 52] } },

{ ch: 0, type: 'ball', me: '4', title: 'The third man',
  prompt: 'Their 11 blocks the pass to your 7, and your 11 is marked. Your pivot, the 9, has dropped short.',
  hint: "If you can't reach the 7, who can?",
  lesson: "Can't reach the free player? Play to the one who can. The third man arrives facing forward.",
  us:   { 1:[25,93], 4:[22,62], 11:[6,48], 9:[23,41], 7:[45,46] },
  them: { 1:[25,3], 9:[26,57], 7:[9,43], 11:[35,53], 4:[23,35] },
  ball: '4',
  pass: {
    9:  P(3, 'Pro choice', "Their 11 blocked the pass to your 7, so you played it into the pivot. The 9 lays it out to the 7 on the first touch: the third man."),
    7:  P(0, 'Intercepted', 'Their 11 is standing right in that lane.', { cut: '11' }),
    11: P(1, 'Marked', 'Their 7 is tight on your 11.'),
    1:  TOO_SAFE('Back to the keeper, when the pivot had come short for it.')
  },
  shoot: null,
  elsewhere: P(1, 'Not quite', 'The pivot dropped short for a reason. Use it.'),
  best: { kind: 'pass', to: '9' } },

{ ch: 0, type: 'ball', me: '11', title: 'Down the line',
  prompt: 'Their 7 presses you from the inside, and their 9 sits in the pass back to your 4. Your pivot is sprinting down the line.',
  hint: 'Their 7 came from the inside. Which way is open?',
  lesson: 'Pressed from the inside? Go down the line. A pass parallel to the sideline, into the run, beats the press.',
  us:   { 1:[25,93], 4:[25,62], 11:[5,50], 9:[13,30], 7:[44,40] },
  them: { 1:[25,3], 9:[15,56], 7:[10.5,46], 11:[40,35], 4:[21,24] },
  ball: '11',
  arrows: [{ team: 'us', from: [12, 28.5], to: [7, 22] }],
  pass: {
    4:  P(0, 'Intercepted', 'Their 9 is sitting right in that lane.', { cut: '9' }),
    9:  P(1, 'Behind the run', 'The pivot is running down the line. A pass to where the 9 was is behind the run.'),
    7:  P(0, 'Intercepted', 'A long pass across their whole team. Their 7 or 9 gets there first.', { cut: '7' })
  },
  lead: [[6, 22, 5.6, 3, 'Pro choice', 'Their 7 pressed from the inside, so you went down the line, into the space ahead of your pivot. One pass and the press is beaten.', '9']],
  shoot: null,
  carry: [[6, 42, 3, 0, 'Trapped', 'Their 7 is right there, and the sideline is behind you. That ball is lost.']],
  elsewhere: P(1, 'Not quite', 'Your pivot is running down the line. Find that run.'),
  best: { kind: 'pass', to: '9', at: [6, 22] } },

{ ch: 0, type: 'move', me: '4', title: 'Get an angle',
  prompt: 'Your keeper has the ball. Their 9 is standing right between you and the keeper. Drag the 4.',
  hint: 'Can your keeper see you?',
  lesson: "If a defender is between you and the ball, you're hidden. Step sideways until there's a clear line.",
  us:   { 1:[25,93], 4:[25,69], 11:[6,70], 9:[25,48], 7:[44,70] },
  them: { 1:[25,3], 9:[25,77], 7:[10,64], 11:[40,64], 4:[25,42.5] },
  ball: { team: 'us', n: '1' },
  zones: [
    [15, 80, 4.2, 3, 'Pro spot', 'You stepped out of their 9’s shadow, to the side. Your keeper has a clear line to you, and their 9 can’t cover you and the keeper at once.'],
    [35, 80, 4.2, 3, 'Pro spot', 'You stepped out of their 9’s shadow, to the side. Your keeper has a clear line to you, and their 9 can’t cover you and the keeper at once.'],
    [25, 69, 3, 1, 'Hidden', 'Their 9 is standing right in the line between you and your keeper.'],
    [25, 86, 2.6, 1, 'Too close', 'Right next to your keeper, their 9 can press you both.']
  ],
  elsewhere: P(1, 'Not quite', 'Step sideways, out from behind their 9.'),
  best: { kind: 'move', at: [15, 80] } },

/* ---------------- 2. Rotations ---------------- */
{ ch: 1, type: 'move', me: '4', title: 'Pass and follow',
  prompt: 'You just passed to your 11. Their 7 is on your 11, and their 9 is still close to you. Drag the 4.',
  hint: 'Two of you against one of them. Where?',
  lesson: "Passed it? Don't stand and watch. Follow your pass around the outside and make it two against one.",
  us:   { 1:[25,93], 4:[22,51], 11:[6,37], 9:[24,15], 7:[44,36] },
  them: { 1:[25,3], 9:[26,44], 7:[10,31], 11:[39,30], 4:[24,10] },
  ball: { team: 'us', n: '11' },
  zones: [
    [4, 24, 4.5, 3, 'Pro spot', 'You followed your pass around the outside. Now their 7 has two of you to stop: go with you, and your 11 cuts inside; stay, and you get the ball down the line.'],
    [22, 51, 3, 1, 'Stood still', "You passed and watched. Their 7 only has your 11 to worry about."],
    [17, 30, 3, 0, 'Into the crowd', 'Their 7, their 9 and their 4 are all in the middle. That run takes you into traffic.']
  ],
  elsewhere: P(1, 'Not quite', 'Follow your pass, around the outside of your 11.'),
  best: { kind: 'move', at: [4, 24] } },

{ ch: 1, type: 'move', me: '7', title: 'Fill the spot',
  prompt: 'Your 4 just overlapped down the left. Nobody is in the fixo spot now, and their 9 is waiting for a counter. Drag the 7.',
  hint: 'Who is guarding our goal if we lose it?',
  lesson: 'When a teammate leaves a spot, fill it. Someone always stays back to stop the counter.',
  us:   { 1:[25,93], 4:[4,25], 11:[9,36], 9:[24,14], 7:[44,32] },
  them: { 1:[25,3], 9:[30,46], 7:[12,30], 11:[38,27], 4:[24,9] },
  ball: { team: 'us', n: '11' },
  noPayoff: true,
  zones: [
    [25, 54, 5.6, 3, 'Pro spot', 'Your 4 left the fixo spot, so you rotated into it. If we lose the ball, you are between their 9 and our goal. That is a rotation.'],
    [44, 32, 3, 1, 'Stayed up', 'Four of us are up the field, and their 9 is alone in the middle. One bad pass and they are through.'],
    [34, 18, 3, 0, 'Even higher', 'Now nobody is back at all.']
  ],
  elsewhere: P(1, 'Not quite', 'Rotate back into the empty fixo spot.'),
  best: { kind: 'move', at: [25, 54] } },

{ ch: 1, type: 'move', me: '4', title: 'Ala inside, fixo wide',
  prompt: 'Your 11 is dribbling inside, and their 7 is going with the 11. The whole left side is empty. Drag the 4.',
  hint: 'Who keeps us wide on the left now?',
  lesson: "When your ala cuts inside, open up wide on that side. Keep the court big so they can't squeeze it.",
  us:   { 1:[25,93], 4:[25,52], 11:[15,35], 9:[25,14], 7:[44,34] },
  them: { 1:[25,3], 9:[27,44], 7:[17,30], 11:[38,28], 4:[25,9] },
  ball: { team: 'us', n: '11' },
  arrows: [{ team: 'us', from: [9, 37], to: [14, 35.4] }],
  zones: [
    [5, 40, 4.9, 3, 'Pro spot', 'Your 11 went inside, so you opened up wide where the 11 had been. The court stays big, and your 11 has an easy pass out to you.'],
    [25, 52, 3, 1, 'Stayed in the middle', "Now we have nobody wide on the left, and their team can squeeze the middle."],
    [20, 40, 2.6, 0, 'Too close', 'Right next to your 11, one defender can mark you both.']
  ],
  elsewhere: P(1, 'Not quite', 'Open up wide on the left, where your 11 was.'),
  best: { kind: 'move', at: [5, 40] } },

{ ch: 1, type: 'move', me: '7', title: 'Swap with the pivot',
  prompt: 'Your pivot dropped out wide on the right to get the ball, and their 4 went with the 9. The middle in front of their goal is empty. Drag the 7.',
  hint: 'Your pivot left a space. Who fills it?',
  lesson: 'When your pivot drops out, attack the space the pivot left. Swapping spots drags defenders where they don’t want to go.',
  us:   { 1:[25,93], 4:[28,52], 11:[6,36], 9:[39,24], 7:[45,40] },
  them: { 1:[25,3], 9:[20,43], 7:[10,31], 11:[40,34], 4:[36,19] },
  ball: { team: 'us', n: '4' },
  arrows: [{ team: 'us', from: [28, 15], to: [37, 22.5] }, { team: 'them', from: [27, 12], to: [34.5, 18] }],
  zones: [
    [24, 15, 4.9, 3, 'Pro spot', 'Your pivot pulled their 4 out wide, so you ran into the space the 9 left, right in front of their goal.'],
    [45, 40, 3, 1, 'Stayed wide', 'Now two of us are on the right sideline, and the middle is still empty.'],
    [40, 32, 2.6, 0, 'Into the crowd', 'Your 9, their 4 and their 11 are already there.']
  ],
  elsewhere: P(1, 'Not quite', 'Run into the space your pivot left.'),
  best: { kind: 'move', at: [24, 15] } },

{ ch: 1, type: 'move', me: '9', title: 'Clear the space',
  prompt: 'Your 11 is dribbling in from the left to shoot. You are standing in front of the 11, and their 4 is right next to you. Drag the 9.',
  hint: 'Who is blocking your 11’s shot?',
  lesson: 'Sometimes the best run takes you away from the ball. Clear out, and your defender goes with you.',
  us:   { 1:[25,93], 4:[25,48], 11:[16,24], 9:[21,15], 7:[44,30] },
  them: { 1:[25,3], 9:[24,38], 7:[13,30], 11:[38,26], 4:[22.5,10] },
  ball: { team: 'us', n: '11' },
  noPayoff: true,
  follow: [{ n: '4', dy: -4 }],
  zones: [
    [36, 10, 4.9, 3, 'Pro spot', "You cleared out to the far post, and their 4 went with you. Now your 11 has a clear look at goal, and you're ready for the rebound."],
    [21, 15, 3, 1, 'In the way', "You and their 4 are standing in your 11's shooting lane."],
    [15, 17, 2.6, 0, 'Too close', 'You came toward the ball and brought their 4 with you, right into your 11’s path.']
  ],
  elsewhere: P(1, 'Not quite', 'Clear out of the shooting lane, to the far post.'),
  best: { kind: 'move', at: [36, 10] } },

/* ---------------- 3. Switches ---------------- */
{ ch: 2, type: 'ball', me: '4', title: 'Switch it',
  prompt: 'Your 11 just played it back to you. Their whole team has shifted to our left, and your 7 is alone on the right.',
  hint: 'Before they shift back...',
  lesson: 'The ball moves faster than defenders. When they all shift to one side, switch it before they get back.',
  us:   { 1:[25,93], 4:[22,51], 11:[5,38], 9:[21,18], 7:[45,33] },
  them: { 1:[25,3], 9:[15,44], 7:[9,33], 11:[27,30], 4:[21,13] },
  ball: '4',
  pass: {
    7:  P(3, 'Pro choice', 'Their team shifted to our left, so you switched it straight to your 7. The 7 has the whole right side to attack.'),
    11: P(1, 'Back into the crowd', 'Their 7 and 9 are right there.'),
    9:  P(1, 'Marked', 'Their 4 is tight on your pivot, and their 11 can drop on the 9 too.'),
    1:  TOO_SAFE('Back to the keeper, when your 7 was alone on the right?')
  },
  lead: [[46, 25, 5.6, 3, 'Pro choice', 'Their team shifted to our left, so you switched it into the space ahead of your 7.', '7']],
  carry: [[28, 44, 3.5, 1, 'Too slow', 'Every touch gives their team time to shift back across.']],
  shoot: null,
  elsewhere: P(1, 'Not quite', 'They are all on the left. Switch it.'),
  best: { kind: 'pass', to: '7' } },

{ ch: 2, type: 'ball', me: '11', title: 'Into the pivot',
  prompt: 'You have the ball on the left. Your pivot has got in front of their 4, on your side. Your 4 is behind you.',
  hint: 'Which pass skips the most defenders?',
  lesson: 'The diagonal into the pivot skips their whole midfield. Play it when the pivot is on your side of the defender.',
  us:   { 1:[25,93], 4:[24,49], 11:[6,33], 9:[19,16], 7:[45,28] },
  them: { 1:[25,3], 9:[25,40], 7:[10.5,37], 11:[39,24], 4:[22.5,11.5] },
  ball: '11',
  pass: {
    9:  P(3, 'Pro choice', 'Your pivot was on your side of their 4, so you played the diagonal into the 9. One pass skipped their 7 and their 9, and now the pivot can lay it off or turn.'),
    4:  TOO_SAFE('Safe, but the diagonal into the pivot was on.'),
    7:  P(0, 'Intercepted', 'A long ball across the whole court. Their 4 or their 11 cuts it out.', { cut: '4' })
  },
  carry: [[7, 22, 3, 1, 'Into the corner', 'Down the line toward the corner, their 4 can slide across, and the pass to the pivot is gone.']],
  shoot: P(0, 'No angle', 'From out wide, their keeper covers that easily.'),
  elsewhere: P(1, 'Not quite', 'Look inside for your pivot.'),
  best: { kind: 'pass', to: '9' } },

{ ch: 2, type: 'ball', me: '7', title: 'Switch and shoot',
  prompt: 'The ball was switched to you on the right. Their 11 is still sliding across, and you can see the goal.',
  hint: 'How long until their 11 gets to you?',
  lesson: 'After a fast switch, the shot is on for one touch. Hit it before the defender arrives.',
  us:   { 1:[25,93], 4:[25,47], 11:[6,29], 9:[20,13], 7:[40,21] },
  them: { 1:[25,3], 9:[18,40], 7:[10,24], 11:[31,27], 4:[21,8] },
  ball: '7',
  arrows: [{ team: 'them', from: [26, 29], to: [30.5, 27] }],
  pass: {
    9:  P(1, 'Marked', 'Their 4 is right on your pivot. You had the shot.'),
    4:  TOO_SAFE('Back to the 4, after the switch had opened the shot?'),
    11: P(0, 'Intercepted', 'Back across their whole team.', { cut: '9' })
  },
  carry: [[34, 18, 3, 1, 'One touch too many', 'You took it inside, and their 11 arrived to block the shot.']],
  shoot: P(3, 'Pro choice', 'The switch left their 11 a step behind, so you shot first time, before the block could come.'),
  elsewhere: P(1, 'Not quite', 'The shot is on right now.'),
  best: { kind: 'shoot' } },

{ ch: 2, type: 'move', me: '7', title: 'Wait on the far side',
  prompt: 'Your 11, 4 and 9 are combining on the left, and their whole team went with them. You drifted inside. Drag the 7.',
  hint: 'Where will the switch go?',
  lesson: "Ball on the other side? Stay wide and wait. If you come over, there's nobody to switch to.",
  us:   { 1:[25,93], 4:[18,48], 11:[6,34], 9:[16,18], 7:[30,30] },
  them: { 1:[25,3], 9:[20,40], 7:[10,29], 11:[33,22], 4:[17,13] },
  ball: { team: 'us', n: '11' },
  zones: [
    [45, 28, 4.9, 3, 'Pro spot', 'The ball was on the left and their team went with it, so you stayed wide on the right. Now the switch to you is wide open.'],
    [30, 30, 3, 1, 'Too narrow', 'Their 11 can watch you and the middle at the same time.'],
    [20, 30, 2.6, 0, 'Into the crowd', 'Now everyone is on the left, including you.']
  ],
  elsewhere: P(1, 'Not quite', 'Stay wide on the far side.'),
  best: { kind: 'move', at: [45, 28] } },

{ ch: 2, type: 'move', me: '7', title: 'Far post run',
  prompt: 'Your 11 is at the end line on the left. Your pivot is at the near post with their 4. Drag the 7.',
  hint: 'Where does a low ball across the goal end up?',
  lesson: 'Ball on the far wing? Attack the far post. In futsal, the far post run scores more than any other.',
  us:   { 1:[25,93], 4:[25,42], 11:[9,7], 9:[22.5,12.5], 7:[42,24] },
  them: { 1:[24,3], 9:[27,34], 7:[12,14], 11:[36,18], 4:[18.5,9.5] },
  ball: { team: 'us', n: '11' },
  zones: [
    [31, 6, 3, 3, 'Pro spot', 'The ball was on the far wing, so you attacked the far post. The low ball across the goal goes past everyone and finds you.'],
    [42, 24, 3, 1, 'Watching', 'From out there you can’t reach anything across the goal.'],
    [23, 13, 2.6, 0, 'Too crowded', 'Your pivot, their 4 and their keeper are all there.']
  ],
  elsewhere: P(1, 'Not quite', 'Get to the far post.'),
  best: { kind: 'move', at: [31, 6] } },

/* ---------------- 4. The pivot ---------------- */
{ ch: 3, type: 'ball', me: '9', title: 'Lay it off', facing: 'back',
  prompt: 'You got the ball with your back to goal. Their 4 is right behind you, and your 11 is running in from the left.',
  hint: 'Who can face the goal?',
  lesson: 'Back to goal and a defender behind you? Lay it off to the teammate who can face the goal.',
  us:   { 1:[25,93], 4:[25,48], 11:[11,33], 9:[25,21], 7:[44,30] },
  them: { 1:[25,3], 9:[27,40], 7:[12,40], 11:[39,26], 4:[25,16] },
  ball: '9',
  arrows: [{ team: 'us', from: [10, 35], to: [15.5, 27.5] }],
  pass: {
    11: P(3, 'Pro choice', 'Their 4 was tight behind you, so you laid it off to your 11, who was running in facing the goal.'),
    4:  P(2, 'Good', 'Safe, but your 11 was arriving facing the goal.'),
    7:  P(1, 'Marked', 'Their 11 is right on your 7.')
  },
  lead: [[16, 26.5, 4.2, 3, 'Pro choice', 'Their 4 was tight behind you, so you laid it into the path of your 11, who runs onto it facing the goal.', '11']],
  carry: [[25, 16, 3.5, 0, 'Into their 4', 'You turned straight into their 4, who takes it.'], [20, 20, 3, 0, 'Into their 4', 'Their 4 is too close to turn on.'], [30, 20, 3, 0, 'Into their 4', 'Their 4 is too close to turn on.']],
  shoot: P(0, 'Back to goal', "You can't shoot with your back to the goal and their 4 behind you."),
  elsewhere: P(1, 'Not quite', 'Lay it off to someone who can face the goal.'),
  best: { kind: 'pass', to: '11' } },

{ ch: 3, type: 'move', me: '11', title: 'The one-two',
  prompt: 'You just played it into your pivot, who came short. Their 7 is still between you and their goal. Drag the 11.',
  hint: 'Your pivot can give it straight back. Where?',
  lesson: 'Pass into the pivot and go. The one-two gets you behind your defender in two touches.',
  us:   { 1:[25,93], 4:[26,52], 11:[6,42], 9:[18,37], 7:[44,32] },
  them: { 1:[25,3], 9:[29,44], 7:[9.5,36], 11:[38,27], 4:[19,31] },
  ball: { team: 'us', n: '9' },
  zones: [
    [6, 24, 4.5, 3, 'Pro spot', 'You passed into the pivot and ran past their 7, down the line. The 9 gives it straight back, and you are in behind.'],
    [6, 42, 3, 1, 'Stood still', 'You passed and watched. Their 7 is still in front of you.'],
    [13, 33, 2.6, 0, 'Into the crowd', 'You ran toward the pivot, right into their 7 and their 4.']
  ],
  elsewhere: P(1, 'Not quite', 'Go past their 7, into the space behind.'),
  best: { kind: 'move', at: [6, 24] } },

{ ch: 3, type: 'ball', me: '9', title: 'Turn when you can', facing: 'back',
  prompt: 'You got the ball with your back to goal, but their 4 stayed off you, out to your right.',
  hint: 'How close is your defender?',
  lesson: "Read your defender. Tight behind you? Lay it off. Standing off you? Turn and go at goal.",
  us:   { 1:[25,93], 4:[25,50], 11:[6,34], 9:[23,27], 7:[44,32] },
  them: { 1:[25,3], 9:[26,42], 7:[10,30], 11:[39,28], 4:[30,20] },
  ball: '9',
  pass: {
    4:  TOO_SAFE('Back to the 4, when their 4 had given you room to turn?'),
    11: P(1, 'Not the best', 'Safe, but you had room to turn yourself.'),
    7:  P(1, 'Marked', 'Their 11 is on your 7.')
  },
  carry: [
    [17, 21, 4.9, 3, 'Pro choice', 'Their 4 stood off you on the right, so you turned the other way and got your shot away.'],
    [29, 22, 3, 0, 'Into their 4', 'You turned right into their 4.']
  ],
  shoot: P(1, 'Back to goal', 'Turn first. You can’t aim with your back to the goal.'),
  elsewhere: P(1, 'Not quite', 'You have room. Turn away from their 4.'),
  best: { kind: 'carry', at: [17, 21] } },

{ ch: 3, type: 'ball', me: '9', title: 'Set up the fixo', facing: 'back',
  prompt: 'You have it with your back to goal. Their defenders all closed in on you and the alas. Your 4 is running up behind you, unmarked.',
  hint: 'Who is free, and facing the goal?',
  lesson: 'When they collapse on the pivot, the fixo arriving from behind is free. Lay it back for the first-time shot.',
  us:   { 1:[25,93], 4:[31,35], 11:[7,24], 9:[25,18], 7:[43,24] },
  them: { 1:[25,3], 9:[25,45], 7:[11,21], 11:[39,21], 4:[25,13.5] },
  ball: '9',
  arrows: [{ team: 'us', from: [31, 43], to: [31, 37] }],
  pass: {
    4:  P(3, 'Pro choice', 'They all closed in on you and the alas, so you laid it back to your 4, arriving facing the goal for a first-time shot.'),
    11: P(1, 'Marked', 'Their 7 is right on your 11.'),
    7:  P(1, 'Marked', 'Their 11 is right on your 7.')
  },
  lead: [[30, 29, 4.2, 3, 'Pro choice', 'They all closed in on you and the alas, so you laid it into the path of your 4 for a first-time shot.', '4']],
  carry: [[25, 14, 3.5, 0, 'Into their 4', 'You turned straight into their 4.']],
  shoot: P(0, 'Back to goal', "You can't shoot with your back to goal and their 4 behind you."),
  elsewhere: P(1, 'Not quite', 'Lay it back to the player arriving behind you.'),
  best: { kind: 'pass', to: '4' } },

{ ch: 3, type: 'move', me: '9', title: 'Show for it',
  prompt: 'Your 4 has the ball and wants to play it into you. Their 9 is standing right between you and your 4. Drag the 9.',
  hint: 'Can your 4 see you?',
  lesson: "A pivot nobody can pass to is no use. Get out from behind their midfielder so there's a clear line.",
  us:   { 1:[25,93], 4:[25,57], 11:[6,40], 9:[25,27], 7:[44,40] },
  them: { 1:[25,3], 9:[25,43], 7:[12,33], 11:[38,33], 4:[25,21] },
  ball: { team: 'us', n: '4' },
  zones: [
    [17.5, 26, 3, 3, 'Pro spot', 'You slid out from behind their 9. Your 4 has a clear line into you, and their 4 has to decide whether to follow.'],
    [32.5, 26, 3, 3, 'Pro spot', 'You slid out from behind their 9. Your 4 has a clear line into you, and their 4 has to decide whether to follow.'],
    [25, 27, 3, 1, 'Hidden', 'Their 9 is right in the line between you and your 4.'],
    [25, 49, 2.6, 0, 'Too deep', 'You came all the way back, right next to their 9. Now nobody is up front.']
  ],
  elsewhere: P(1, 'Not quite', 'Step sideways, out from behind their 9.'),
  best: { kind: 'move', at: [17.5, 26] } },

/* ---------------- 5. Create the shot ---------------- */
{ ch: 4, type: 'ball', me: '9', title: 'Shoot early',
  prompt: 'You turned at the edge of their area and can see the goal. Their 4 is coming across to block.',
  hint: 'In futsal the goal is small, and blocks come fast.',
  lesson: 'In futsal, take the shot early. A quick toe-poke beats the block and catches the keeper before they are set.',
  us:   { 1:[25,93], 4:[25,47], 11:[6,30], 9:[19,20], 7:[43,26] },
  them: { 1:[25,3], 9:[25,38], 7:[10,26], 11:[37,23], 4:[26,14] },
  ball: '9',
  arrows: [{ team: 'them', from: [29, 12], to: [26.5, 13.6] }],
  pass: {
    11: P(1, 'Not the best', 'Your 11 is further from goal than you. You had the shot.'),
    4:  TOO_SAFE('Back to the 4, with a clear look at goal?'),
    7:  P(0, 'Intercepted', 'Across the front of their goal, past their 4.', { cut: '4' })
  },
  carry: [[21, 15, 3, 1, 'One touch too many', 'You took another touch, and their 4 got there to block it.']],
  shoot: P(3, 'Pro choice', 'You could see the goal, so you hit it early, before their 4 could block it.'),
  elsewhere: P(1, 'Not quite', 'Shoot now, before the block.'),
  best: { kind: 'shoot' } },

{ ch: 4, type: 'ball', me: '11', title: 'The cut-back',
  prompt: "You got to their end line. Their keeper and their 4 are guarding the near post. Your 4 is running in toward the penalty mark.",
  hint: 'Where is nobody looking?',
  lesson: 'At the end line, pull it back. Defenders run toward their own goal, so the space opens up behind them.',
  us:   { 1:[25,93], 4:[27,30], 11:[9,5], 9:[24,11], 7:[38,9] },
  them: { 1:[22,3], 9:[30,36], 7:[12.5,13], 11:[39,14], 4:[21.5,8.5] },
  ball: '11',
  arrows: [{ team: 'us', from: [27, 32], to: [26, 26] }],
  pass: {
    9:  P(1, 'Marked', 'Their 4 is right on your pivot at the near post.'),
    7:  P(0, 'Intercepted', 'Across the goal, right past their keeper and their 4.', { cut: '4' }),
    4:  P(2, 'Good', "Right player, but your 4 is running in. Put it into the space the 4 is running into.")
  },
  lead: [[25, 17, 3.5, 3, 'Pro choice', 'Their keeper and their 4 were at the near post, so you pulled it back into the space your 4 was running into. First-time shot.', '4']],
  shoot: P(0, 'No angle', 'From the end line, their keeper covers the whole near post.'),
  elsewhere: P(1, 'Not quite', 'Pull it back to the runner.'),
  best: { kind: 'pass', to: '4', at: [25, 17] } },

{ ch: 4, type: 'ball', me: '11', title: 'Make it two against one',
  prompt: 'Your 4 is overlapping on the outside. Their 7 just stepped toward you.',
  hint: 'Their 7 chose you. So who is free?',
  lesson: 'Two against one: watch the defender. If they come to you, pass. If they go with the runner, go yourself.',
  us:   { 1:[25,93], 4:[5,36], 11:[11,31], 9:[23,13], 7:[44,28] },
  them: { 1:[25,3], 9:[26,40], 7:[13,26], 11:[38,22], 4:[22,8] },
  ball: '11',
  arrows: [{ team: 'us', from: [6, 42], to: [4.5, 37] }, { team: 'them', from: [14, 22], to: [13.3, 24.8] }],
  pass: {
    4:  P(2, 'Good', 'Right idea, but your 4 is running. Put it in front of the 4, down the line.'),
    9:  P(1, 'Marked', 'Their 4 is right on your pivot.'),
    7:  P(0, 'Intercepted', 'A long ball across the whole court.', { cut: '9' })
  },
  lead: [[5, 20, 4, 3, 'Pro choice', 'Their 7 stepped to you, so you slipped it down the line for your 4. Two against one, and the 4 is in behind.', '4']],
  carry: [[13, 24, 3, 0, 'Into their 7', 'Their 7 was waiting for exactly that.']],
  shoot: P(0, 'Too far', 'Way too far, with their 7 right in front of you.'),
  elsewhere: P(1, 'Not quite', 'Their 7 came to you. Find the runner.'),
  best: { kind: 'pass', to: '4', at: [5, 20] } },

{ ch: 4, type: 'move', me: '4', title: 'Arrive late',
  prompt: 'Your 11 is at the end line on the left. Your pivot is at the near post and your 7 at the far post. Drag the 4.',
  hint: 'Where is the space nobody is in?',
  lesson: 'When everyone runs at the goal, arrive late at the top of the area. The cut-back finds you with time to shoot.',
  us:   { 1:[25,93], 4:[25,46], 11:[9,6], 9:[22.5,10], 7:[33,7] },
  them: { 1:[23,3], 9:[27,38], 7:[12.5,14], 11:[36,12], 4:[19,7.5] },
  ball: { team: 'us', n: '11' },
  zones: [
    [25.7, 20.3, 4.4, 3, 'Pro spot', 'Everyone ran at the goal, so you arrived late at the top of the area. The cut-back comes to you with time to shoot.'],
    [25, 11, 2.6, 0, 'Too early', 'Now you are in the crowd too, and the space behind is empty.'],
    [25, 46, 3, 1, 'Too far', 'The cut-back can’t reach you from there.']
  ],
  elsewhere: P(1, 'Not quite', 'Arrive at the top of the area.'),
  best: { kind: 'move', at: [25.7, 20.3] } },

{ ch: 4, type: 'ball', me: '7', title: 'Square it',
  prompt: 'You are through on goal. Their keeper is rushing out at you, and your pivot is running alongside you.',
  hint: 'Who has the easier finish?',
  lesson: 'Two against the keeper: make the keeper commit, then square it for the tap-in.',
  us:   { 1:[25,93], 4:[25,55], 11:[8,40], 9:[18,15], 7:[31,15] },
  them: { 1:[28,8], 9:[24,32], 7:[12,34], 11:[37,30], 4:[30,28] },
  ball: '7',
  arrows: [{ team: 'them', from: [26, 4], to: [27.5, 7] }],
  pass: {
    9:  P(3, 'Pro choice', 'Their keeper came out at you, so you squared it to your pivot. Open goal.'),
    4:  TOO_SAFE('Back, when you were through on goal?')
  },
  lead: [[18.6, 9.4, 4.2, 3, 'Pro choice', "Their keeper came out at you, so you rolled it across in front of your pivot. Open goal.", '9']],
  carry: [[30, 10, 3, 1, 'Into the keeper', 'Their keeper smothers it.']],
  shoot: P(1, 'Risky', 'The keeper is rushing out and covers most of the goal. Your 9 had an open net.'),
  elsewhere: P(1, 'Not quite', 'Your pivot is free. Use it.'),
  best: { kind: 'pass', to: '9' } },

/* ---------------- 6. Counters and routines ---------------- */
{ ch: 5, type: 'ball', me: '11', title: 'Two against one',
  prompt: 'Counterattack! Only their 4 is back, and your pivot is with you. Their 4 just stepped toward you.',
  hint: 'Their 4 chose you.',
  lesson: 'On a two-against-one, draw the defender, then pass. The defender can only stop one of you.',
  us:   { 1:[25,93], 4:[24,64], 11:[16,40], 9:[33,38], 7:[42,58] },
  them: { 1:[25,3], 9:[24,58], 7:[12,56], 11:[38,64], 4:[21,32] },
  ball: '11',
  arrows: [{ team: 'them', from: [23, 26], to: [21.5, 30.5] }],
  pass: {
    9:  P(2, 'Good', 'Right player, but the 9 is running. Put it in front of the 9.'),
    4:  P(0, 'Intercepted', 'Back toward your 4, right into their 9 chasing back.', { cut: '9' }),
    7:  TOO_SAFE('Back to the 7, with two of you against one?')
  },
  lead: [[33, 26, 4, 3, 'Pro choice', 'Their 4 stepped to you, so you slipped it into the space ahead of your pivot. The 9 is through.', '9']],
  carry: [[20, 31, 3, 0, 'Into their 4', 'You ran straight into the only defender.'], [10, 28, 3, 1, 'Too wide', 'Their 4 shows you wide, away from goal.']],
  shoot: P(0, 'Too far', 'Way too far, with two of you against one.'),
  elsewhere: P(1, 'Not quite', 'Their 4 came to you. Find your 9.'),
  best: { kind: 'pass', to: '9', at: [33, 26] } },

{ ch: 5, type: 'move', me: '7', title: 'Three against two',
  prompt: 'Counterattack! Your 11 is dribbling up the middle, your pivot is on the left, and two of theirs are back. Drag the 7.',
  hint: 'How do three beat two?',
  lesson: 'On a three-against-two, stay wide. Stretch their last two defenders until one of us is free.',
  us:   { 1:[25,93], 4:[25,70], 11:[25,42], 9:[10,36], 7:[33,48] },
  them: { 1:[25,3], 9:[22,62], 7:[12,66], 11:[33,32], 4:[21,28] },
  ball: { team: 'us', n: '11' },
  zones: [
    [44.7, 30.7, 4.7, 3, 'Pro spot', 'You ran wide and forward. Now their two defenders have three of you to cover, and one of us is free.'],
    [30, 40, 2.6, 1, 'Too close', 'Right next to your 11, one defender can cover you both.'],
    [33, 48, 3, 1, 'Too deep', 'Behind the ball you are no help to the counter.']
  ],
  elsewhere: P(1, 'Not quite', 'Stay wide, and get forward.'),
  best: { kind: 'move', at: [44.7, 30.7] } },

{ ch: 5, type: 'ball', me: '7', title: 'Kick-in for the fixo', noCarry: true, restart: 'kickin',
  prompt: 'Kick-in to us on the right, near their area. Their players mark your 9 and 11. Your 4 is running up from behind.',
  hint: 'Who is free, and arriving facing the goal?',
  lesson: 'On a kick-in, the late runner from behind is usually free. Play it into the run for a first-time shot.',
  us:   { 1:[25,93], 4:[34,40], 11:[8,18], 9:[26,13], 7:[51.8,24.5] },
  them: { 1:[25,3], 9:[20,32], 7:[11,14], 11:[42,15], 4:[25,8] },
  ball: '7', ballAt: [50, 22],
  arrows: [{ team: 'us', from: [34, 42], to: [32.5, 36] }],
  pass: {
    9:  P(1, 'Marked', 'Their 4 is right on your pivot.'),
    11: P(0, 'Intercepted', 'A kick-in across the whole area. Their 4 or keeper gets it.', { cut: '4' }),
    4:  P(2, 'Good', 'Right player, but your 4 is running in. Put it into the run.')
  },
  lead: [[30, 28, 3.5, 3, 'Pro choice', 'Their players marked the 9 and the 11, so you played it into your 4, arriving from behind for a first-time shot.', '4']],
  shoot: null,
  elsewhere: P(1, 'Not quite', 'Find the runner arriving from behind.'),
  best: { kind: 'pass', to: '4', at: [30, 28] } },

{ ch: 5, type: 'ball', me: '11', title: 'Corner to the far post', noCarry: true, restart: 'corner', air: true,
  prompt: 'Corner kick to us from the left. Their keeper and their 4 crowd the near post. Your 7 is sneaking to the far post.',
  hint: 'Where is nobody looking?',
  lesson: 'Defenders crowd the near post on a corner. A ball across to the far post finds the runner nobody followed.',
  us:   { 1:[25,93], 4:[24,26], 11:[-1.8,-1.6], 9:[19,9], 7:[38,12] },
  them: { 1:[23,3.5], 9:[25,20], 7:[12,8], 11:[37,20], 4:[20,13] },
  ball: '11', ballAt: CORNER_L,
  arrows: [{ team: 'us', from: [39, 15], to: [35, 8] }],
  pass: {
    9:  P(1, 'Marked', 'Their 4 and keeper are right on your pivot at the near post.'),
    4:  P(1, 'Marked', 'Their 9 is right on your 4 at the top of the area.'),
    7:  P(2, 'Good', 'Right player, but the 7 is moving. Put it at the far post, in front of the run.')
  },
  lead: [[31, 5, 3, 3, 'Pro choice', 'Their defenders crowded the near post, so you whipped it across to the far post, right into your 7’s run.', '7']],
  shoot: null,
  elsewhere: P(1, 'Not quite', 'Find the far post run.'),
  best: { kind: 'pass', to: '7', at: [31, 5] } },

{ ch: 5, type: 'ball', me: '4', title: 'Power play',
  prompt: 'Your keeper came up to be the fifth attacker: five of us against four. Their 9 and their 7 are on you and your 11.',
  hint: 'Five against four means one of us is always free.',
  lesson: 'In a power play, move the ball fast across the top. The free player is always on the far side.',
  us:   { 1:[33,38], 4:[14,36], 11:[5,20], 9:[25,13], 7:[45,20] },
  them: { 1:[25,3], 9:[20,32], 7:[11,24], 11:[37,25], 4:[25,8.5] },
  ball: '4',
  pass: {
    1:  P(3, 'Pro choice', 'Their 9 and 7 were on you and your 11, so you moved it across to your keeper at the top. Now their 11 has to choose between the keeper and your 7.'),
    11: P(1, 'Marked', 'Their 7 is right on your 11.'),
    9:  P(0, 'Intercepted', 'Through the middle of their diamond.', { cut: '9' }),
    7:  P(0, 'Intercepted', 'A long ball right across their 9.', { cut: '9' })
  },
  carry: [[18, 30, 3, 0, 'Into their 9', 'Their 9 is right there.']],
  shoot: P(0, 'Blocked', 'Through their whole diamond? It hits a defender.'),
  elsewhere: P(1, 'Not quite', 'Move it across the top, to the free player.'),
  best: { kind: 'pass', to: '1' } }
];

/* ---------------- plays (format: riddles-motion.js) ---------------- */
const W_ = 'wide', C = (at, zoom, tilt) => ({ at, zoom: zoom || 1.45, tilt: tilt == null ? .5 : tilt });
const GOOD = t => [t, 'good'];
const MOTION = {
  /* ---- 1. Beat the press ---- */
  'Throw to the free side': {
    intro: { start: { ball: 'them:9', us: { 4: [23, 86], 11: [8, 78], 7: [40, 72], 9: [26, 55] }, them: { 9: [18, 84], 7: [10, 74], 11: [27, 72], 4: [26, 50] } },
      cam: C([20, 80], 1.5),
      steps: [
        { t: 1.4, pass: 'us:1', pd: .05, us: { 4: [21, 81], 11: [6, 72], 7: [44, 70], 9: [26, 50] }, them: { 9: [20.5, 75.5], 7: [9.5, 67.5], 11: [31, 66], 4: [26, 44.5] },
          tag: { 'us:7': GOOD('FREE') }, head: 'You catch their shot', sub: 'Their press is all on our left side. Your 7 is alone on the right.', cam: C([25, 74], 1.3) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      lead0: [{ t: 1.2, us: { 7: [42, 48] }, them: { 11: [35, 60] }, tag: { 'us:7': GOOD('FACING FORWARD') }, head: 'Throw to the free side',
        sub: 'Their press was all on our left, so you threw it into the space ahead of your 7, who runs at them with the whole right side open.', cam: C([38, 56], 1.3), wait: 1.2 }],
      7: [{ t: 1.1, us: { 7: [43, 59] }, face: { 'us:7': 'up' }, tag: { 'us:7': GOOD('FACING FORWARD') }, head: 'Throw to the free side',
        sub: 'Their press was all on our left, so you threw it to the 7 on the free side. The 7 turns and runs.', cam: C([40, 62], 1.35), wait: 1.2 }],
      4: steal('4', '9', [21.5, 78.5], 'Pressed', 'Their 9 jumps on your 4, right in front of our goal.'),
      11: steal('11', '7', [7, 69.5], 'Marked', 'Their 7 is tight on your 11, on the crowded side.'),
      9: steal('9', '4', [26, 47.5], 'Risky', 'A long throw to the 9 with their 4 right behind. The 7 was free and closer.')
    } },

  'Fix the defender': {
    intro: { start: { ball: 'us:1', us: { 4: [25, 74], 11: [8, 58], 7: [42, 58], 9: [25, 33] }, them: { 9: [19, 51], 11: [31, 51], 4: [25, 27], 7: [15, 34] } },
      cam: C([25, 70], 1.45),
      steps: [
        { t: 1.6, pass: 'us:4', pd: .1, us: { 4: [25, 63], 11: [6, 52], 7: [44, 52], 9: [25, 28] }, them: { 9: [17, 46], 11: [33, 46], 4: [25, 23], 7: [14, 30] },
          head: 'Nobody presses you', sub: 'Their front two sit in the lanes to your alas, ready to slide across.', cam: C([25, 54], 1.3) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      carry0: [{ t: .9, them: { 9: [21.5, 49] }, tag: { 'them:9': 'STEPS IN' }, head: 'Fix the defender', sub: 'You carried it at the gap, so one of them has to step up to you…',
          cam: C([20, 50], 1.4) },
        { t: 1, pass: 'us:11', us: { 11: [6, 47] }, tag: { 'us:11': GOOD('FREE') }, head: 'Fix the defender', sub: '…and the ala they left is free.', wait: 1.2 }],
      carry1: [{ t: .9, them: { 9: [12.5, 53] }, tag: { 'them:9': 'MARKS BOTH' }, head: 'Wrong way', sub: 'You carried it toward your 11, so their 9 can mark you both.', cam: C([11, 54], 1.55), wait: 1.2 }],
      carry2: [{ t: .9, them: { 11: [37.5, 53] }, tag: { 'them:11': 'MARKS BOTH' }, head: 'Wrong way', sub: 'You carried it toward your 7, so their 11 can mark you both.', cam: C([39, 54], 1.55), wait: 1.2 }],
      11: [{ t: .9, them: { 9: [9.5, 49] }, tag: { 'them:9': 'PRESS' }, head: 'They slide across', sub: 'Their 9 slid over while the ball travelled. Pull their 9 in first.', cam: C([9, 50], 1.55), wait: 1.2 }],
      7: [{ t: .9, them: { 11: [40.5, 49] }, tag: { 'them:11': 'PRESS' }, head: 'They slide across', sub: 'Their 11 slid over while the ball travelled. Pull their 11 in first.', cam: C([41, 50], 1.55), wait: 1.2 }],
      9: steal('9', '4', [25, 25.5], 'Marked', 'Their 4 is tight behind your pivot.'),
      1: say('Too safe', 'Back to the keeper, when nobody was pressing you?', C([25, 80], 1.35))
    } },

  'The third man': {
    intro: { start: { ball: 'us:1', us: { 4: [22, 70], 9: [23, 30], 11: [7, 52], 7: [44, 50] }, them: { 4: [23, 25], 11: [38, 58], 9: [26, 62], 7: [10, 47] } },
      cam: C([24, 66], 1.4),
      steps: [
        { t: 1.6, pass: 'us:4', pd: .1, us: { 4: [22, 62], 9: [23, 41], 11: [6, 48], 7: [45, 46] }, them: { 4: [23, 35], 11: [35, 53], 9: [26, 57], 7: [9, 43] },
          tag: { 'them:11': 'IN THE LANE' }, head: 'Your pivot drops short', sub: 'Their 11 blocks the pass to your 7, and your 11 is marked.', cam: C([28, 52], 1.3) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      9: [{ t: 1.1, pass: 'us:7', pd: .15, us: { 7: [44, 39] }, face: { 'us:7': 'up' }, tag: { 'us:7': GOOD('THE THIRD MAN'), 'them:11': 'BYPASSED' }, head: 'The third man',
        sub: 'Their 11 blocked the pass to your 7, so you played it into the pivot, who laid it out first time. The 7 arrives facing forward.', cam: C([38, 44], 1.35), wait: 1.2 }],
      11: steal('11', '7', [8, 45.5], 'Marked', 'Their 7 is tight on your 11.'),
      1: say('Too safe', 'Back to the keeper, when the pivot had come short for it.', C([25, 80], 1.35))
    } },

  'Down the line': {
    intro: { start: { ball: 'us:11', us: { 11: [6, 55], 9: [17, 36] }, them: { 7: [14, 40], 9: [20, 52], 4: [23, 29] } },
      cam: C([12, 48], 1.45),
      steps: [
        { t: 1.5, us: { 11: [5, 50], 9: [13, 30] }, them: { 7: [10.5, 46], 9: [15, 56], 4: [21, 24] }, tag: { 'them:7': 'PRESS' },
          head: 'Their 7 presses you from the inside', sub: 'Their 9 sits in the pass back to your 4, and your pivot is running down the line.', cam: C([12, 44], 1.4) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      lead0: [{ t: 1.1, us: { 9: [12, 13] }, them: { 4: [17, 17] }, tag: { 'us:9': GOOD('IN BEHIND') }, head: 'Down the line',
          sub: 'Their 7 pressed from the inside, so you went down the line. One pass, and the press is beaten…', cam: C([13, 20], 1.45) },
        { t: .5, shot: [27.5, -1], head: 'Down the line', sub: '…and your pivot is in on goal.', wait: 1.1 }],
      9: steal('9', '4', [15.5, 27.5], 'Behind the run', 'The pivot had to stop for it, and their 4 got there. Put it into the space ahead of the run.'),
      carry0: steal('11', '7', [8.5, 44.5], 'Trapped', 'Their 7 is right there, and the sideline is behind you.')
    } },

  'Get an angle': {
    intro: { start: { ball: 'us:1', us: { 4: [24, 72], 11: [8, 66], 7: [42, 66] }, them: { 9: [30, 72], 7: [12, 60], 11: [38, 60] } },
      cam: C([25, 76], 1.5),
      steps: [
        { t: 1.5, us: { 4: [25, 69], 11: [6, 70], 7: [44, 70] }, them: { 9: [25, 77], 7: [10, 64], 11: [40, 64] }, marks: [{ s: ['them:9', 'us:1'], len: 12 }],
          head: 'Your keeper has the ball', sub: 'Their 9 steps right into the line between you and the keeper.', cam: C([25, 78], 1.45), wait: .4 },
        { t: 1, cam: W_, head: '', marks: [] }] },
    after: {
      zone0: [{ t: 1, us: { 4: [15, 73] }, tag: { 'us:4': GOOD('OPEN') }, head: 'Get an angle', sub: "You stepped out of their 9's shadow, so your keeper found you. Now you face forward with the ball.",
        cam: C([18, 76], 1.45), wait: 1.2 }],
      zone1: [{ t: 1, us: { 4: [35, 73] }, tag: { 'us:4': GOOD('OPEN') }, head: 'Get an angle', sub: "You stepped out of their 9's shadow, so your keeper found you. Now you face forward with the ball.",
        cam: C([32, 76], 1.45), wait: 1.2 }],
      zone2: say('Hidden', 'Their 9 is standing right in the line between you and your keeper.', C([25, 80], 1.5), { marks: [{ s: ['them:9', 'us:1'], len: 12 }], wait: 1.4 }),
      zone3: [{ t: .8, them: { 9: [25, 81.5] }, tag: { 'them:9': 'PRESS' }, head: 'Too close', sub: 'Right next to your keeper, their 9 can press you both.', cam: C([25, 87], 1.6, .45), wait: 1.2 }]
    } },

  /* ---- 2. Rotations ---- */
  'Pass and follow': {
    intro: { start: { ball: 'us:4', us: { 4: [21, 54], 11: [7, 42] }, them: { 7: [13, 27], 9: [28, 40] } },
      cam: C([16, 44], 1.45),
      steps: [
        { t: 1.4, pass: 'us:11', pd: .1, us: { 4: [22, 51], 11: [6, 37] }, them: { 7: [10, 31], 9: [26, 44] }, tag: { 'them:7': 'STEPS UP' },
          head: 'You pass to your 11', sub: 'Their 7 steps up to your 11. Their 9 is still close to you.', cam: C([14, 40], 1.45) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      zone0: [{ t: 1.1, us: { 4: [8, 15] }, them: { 4: [19, 10], 1: [23, 3.5] }, tag: { 'us:4': GOOD('IN BEHIND'), 'them:7': 'BEATEN' }, head: 'Pass and follow',
          sub: 'Their 7 stayed with your 11, so the ball came down the line to you. Two against one, and you are in behind…', cam: C([13, 20], 1.45) },
        { t: .8, pass: 'us:9', head: 'Pass and follow', sub: '…so you square it for your pivot.', cam: C([20, 12], 1.5) },
        { t: .5, shot: [27.5, -1], wait: 1.1 }],
      zone1: steal('11', '7', [8.5, 34], 'Stood still', 'You passed and watched. Their 7 only has your 11 to worry about.'),
      zone2: [{ t: .8, them: { 9: [21, 37] }, tag: { 'them:7': 'CROWD', 'them:9': 'CROWD', 'them:4': 'CROWD' }, head: 'Into the crowd',
        sub: 'Their 7, their 9 and their 4 are all in the middle. That run takes you into traffic.', cam: C([18, 28], 1.4), wait: 1.2 }]
    } },

  'Fill the spot': {
    intro: { start: { ball: 'us:11', us: { 4: [8, 46], 11: [12, 40], 7: [44, 36] }, them: { 7: [14, 34], 9: [28, 50] } },
      cam: C([16, 40], 1.35),
      steps: [
        { t: 1.6, us: { 4: [4, 25], 11: [9, 36], 7: [44, 32] }, them: { 7: [12, 30], 9: [30, 46] }, marks: [{ ring: [25, 54], c: 'gold' }],
          head: 'Your 4 overlaps down the left', sub: 'Nobody is in the fixo spot now, and their 9 is waiting for a counter.', cam: C([22, 42], 1.2), wait: .4 },
        { t: 1, cam: W_, head: '', marks: [] }] },
    after: {
      zone0: [{ t: .6, pass: 'them:7', them: { 7: [11, 32.5] }, tag: { 'them:7': 'TACKLE' }, head: 'Fill the spot', sub: 'If we lose the ball…', cam: C([18, 42], 1.25) },
        { t: 1, pass: 'us:7', pd: .15, us: { 7: [26, 51] }, them: { 9: [31, 47] }, tag: { 'us:7': GOOD('CUT OUT') }, head: 'Fill the spot',
          sub: "…you're between their 9 and our goal, and you cut out the counter. That is a rotation.", wait: 1.2 }],
      zone1: [{ t: .6, pass: 'them:7', them: { 7: [11, 32.5] }, tag: { 'them:7': 'TACKLE' }, head: 'Stayed up', sub: 'We lose the ball…', cam: C([18, 42], 1.25) },
        { t: 1.1, pass: 'them:9', pd: .1, them: { 9: [28, 62] }, tag: { 'them:9': 'THROUGH' }, head: 'Stayed up', sub: '…and four of us were up the field, so their 9 is through on our goal.',
          cam: C([27, 64], 1.3), wait: 1.2 }],
      zone2: [{ t: .6, pass: 'them:7', them: { 7: [11, 32.5] }, tag: { 'them:7': 'TACKLE' }, head: 'Even higher', sub: 'We lose the ball…', cam: C([18, 42], 1.25) },
        { t: 1.1, pass: 'them:9', pd: .1, them: { 9: [28, 62] }, tag: { 'them:9': 'THROUGH' }, head: 'Even higher', sub: '…and nobody was back at all. Their 9 is through on our goal.',
          cam: C([27, 64], 1.3), wait: 1.2 }]
    } },

  'Ala inside, fixo wide': {
    intro: { start: { ball: 'us:11', us: { 11: [7, 38], 4: [25, 56] }, them: { 7: [10, 33], 9: [27, 48] } },
      cam: C([14, 40], 1.4),
      steps: [
        { t: 1.5, us: { 11: [15, 35], 4: [25, 52] }, them: { 7: [17, 30], 9: [27, 44] }, hatch: [{ pts: [[0, 26], [10, 26], [10, 50], [0, 50]], c: 'gold' }],
          head: 'Your 11 dribbles inside', sub: 'Their 7 goes with the 11, and the whole left side is empty.', cam: C([16, 40], 1.35), wait: .4 },
        { t: 1, cam: W_, head: '', hatch: [] }] },
    after: {
      zone0: [{ t: 1.1, us: { 4: [6, 28] }, tag: { 'us:4': GOOD('WIDE OPEN') }, head: 'Ala inside, fixo wide',
        sub: 'Your 11 went inside, so you opened up wide where the 11 had been. The court stays big, and the pass out to you is easy.', cam: C([10, 32], 1.4), wait: 1.2 }],
      zone1: [{ t: .9, them: { 9: [19, 39] }, tag: { 'them:9': 'PRESS' }, head: 'Stayed in the middle', sub: 'Nobody is wide on the left, so their 9 can squeeze in on your 11 too.',
        cam: C([18, 40], 1.4), wait: 1.2 }],
      zone2: [{ t: .8, them: { 7: [17.5, 35.5] }, tag: { 'them:7': 'MARKS BOTH' }, head: 'Too close', sub: 'Right next to your 11, one defender can mark you both.', cam: C([18, 37], 1.6), wait: 1.2 }]
    } },

  'Swap with the pivot': {
    intro: { start: { ball: 'us:4', us: { 9: [28, 13], 4: [27, 57], 7: [45, 44] }, them: { 4: [26, 9], 9: [21, 47], 11: [40, 38] } },
      cam: C([30, 22], 1.45),
      steps: [
        { t: 1.6, us: { 9: [39, 24], 4: [28, 52], 7: [45, 40] }, them: { 4: [36, 19], 9: [20, 43], 11: [40, 34] }, tag: { 'them:4': 'FOLLOWS' },
          hatch: [{ pts: [[19, 8], [31, 8], [31, 20], [19, 20]], c: 'gold' }], head: 'Your pivot drops out wide',
          sub: 'Their 4 goes with the 9. The middle in front of their goal is empty.', cam: C([32, 22], 1.35), wait: .4 },
        { t: 1, cam: W_, head: '', hatch: [] }] },
    after: {
      zone0: [{ t: .6, them: { 1: [26.5, 3.5] }, tag: { 'us:7': GOOD('FREE') }, head: 'Swap with the pivot',
          sub: 'Your pivot pulled their 4 out wide, so you ran into the space the 9 left, right in front of their goal…', cam: C([25, 12], 1.55, .45) },
        { t: .5, shot: [22.3, -1], head: 'Swap with the pivot', sub: '…and finish.', wait: 1.1 }],
      zone1: say('Stayed wide', 'Now two of us are on the right sideline, and the middle is still empty.', C([33, 26], 1.3),
        { hatch: [{ pts: [[19, 8], [31, 8], [31, 20], [19, 20]], c: 'gold' }], wait: 1.4 }),
      zone2: say('Into the crowd', 'Your 9, their 4 and their 11 are already there.', C([38, 27], 1.5), { tag: { 'them:4': 'CROWD', 'them:11': 'CROWD' } })
    } },

  'Clear the space': {
    intro: { start: { ball: 'us:11', us: { 11: [9, 32], 9: [24, 19], 4: [25, 52] }, them: { 7: [7, 35], 4: [25, 14], 9: [26, 42] } },
      cam: C([16, 24], 1.45),
      steps: [
        { t: 1.5, us: { 11: [16, 24], 9: [21, 15], 4: [25, 48] }, them: { 7: [13, 30], 4: [22.5, 10], 9: [24, 38] }, marks: [{ l: ['us:11', [25, 1]], c: 'bad' }],
          head: 'Your 11 dribbles in to shoot', sub: 'You and their 4 are standing in the way.', cam: C([19, 17], 1.5), wait: .4 },
        { t: 1, cam: W_, head: '', marks: [] }] },
    after: {
      zone0: [{ t: .7, marks: [{ l: ['us:11', [25, 1]], c: 'good' }], tag: { 'us:11': GOOD('CLEAR LOOK') }, head: 'Clear the space',
          sub: 'You cleared out to the far post, and their 4 went with you. Your 11 has a clear look at goal…', cam: C([24, 14], 1.45), wait: .5 },
        { t: .5, shot: [22.3, -1], marks: [], head: 'Clear the space', sub: "…and you're there for the rebound.", wait: 1.1 }],
      zone1: [{ t: .7, marks: [{ l: ['us:11', [25, 1]], c: 'bad' }], head: 'In the way', sub: "You and their 4 are standing in your 11's shooting lane.", cam: C([20, 14], 1.5), wait: .6 },
        { t: .5, pass: 'them:4', marks: [], tag: { 'them:4': 'BLOCK' }, wait: 1.1 }],
      zone2: [{ t: .8, them: { 4: [19, 17] }, tag: { 'them:4': 'BLOCK' }, head: 'Too close', sub: "You came toward the ball and brought their 4 with you, right into your 11's path.",
          cam: C([17, 19], 1.55), wait: .5 },
        { t: .5, pass: 'them:4', wait: 1.1 }]
    } },

  /* ---- 3. Switches ---- */
  'Switch it': {
    intro: { start: { ball: 'us:4', us: { 4: [24, 54], 11: [8, 36], 9: [23, 19] }, them: { 9: [21, 42], 11: [32, 27], 7: [12, 30], 4: [24, 12] } },
      cam: C([22, 40], 1.25),
      steps: [
        { t: 1.6, us: { 4: [22, 51], 11: [5, 38], 9: [21, 18] }, them: { 9: [15, 44], 11: [27, 30], 7: [9, 33], 4: [21, 13] }, tag: { 'us:7': GOOD('ALONE') },
          head: 'Their whole team shifts to our left', sub: 'Your 11 just played it back to you. Your 7 is alone on the right.', cam: C([26, 38], 1.15) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      7: [{ t: 1.2, us: { 7: [42, 20] }, them: { 11: [34, 24] }, tag: { 'us:7': GOOD('WHOLE SIDE') }, head: 'Switch it',
          sub: 'Their team shifted to our left, so you switched it. The 7 has the whole right side to attack…', cam: C([38, 24], 1.35) },
        { t: .5, shot: [22.3, -1], head: 'Switch it', sub: '…and gets the shot away before they get back.', wait: 1.1 }],
      lead0: [{ t: 1.1, us: { 7: [42, 18] }, them: { 11: [34, 24] }, tag: { 'us:7': GOOD('WHOLE SIDE') }, head: 'Switch it',
          sub: 'Their team shifted to our left, so you switched it ahead of your 7, with the whole right side to attack…', cam: C([38, 22], 1.35) },
        { t: .5, shot: [22.3, -1], head: 'Switch it', sub: '…and the 7 gets the shot away before they get back.', wait: 1.1 }],
      carry0: [{ t: 1, them: { 11: [39, 30], 9: [23, 41] }, tag: { 'them:11': 'BACK IN TIME' }, head: 'Too slow', sub: 'Every touch gives their team time to shift back across.',
        cam: C([34, 36], 1.3), wait: 1.2 }],
      11: steal('11', '7', [7.5, 35.5], 'Back into the crowd', 'Their 7 and 9 are right there.'),
      9: steal('9', '4', [21, 15.5], 'Marked', 'Their 4 is tight on your pivot.'),
      1: say('Too safe', 'Back to the keeper, when your 7 was alone on the right?', C([25, 72], 1.25))
    } },

  'Into the pivot': {
    intro: { start: { ball: 'us:11', us: { 11: [7, 40], 9: [22, 21], 4: [24, 54], 7: [44, 33] }, them: { 7: [12, 42], 4: [24, 15], 9: [26, 44], 11: [38, 28] } },
      cam: C([14, 30], 1.4),
      steps: [
        { t: 1.5, us: { 11: [6, 33], 9: [19, 16], 4: [24, 49], 7: [45, 28] }, them: { 7: [10.5, 37], 4: [22.5, 11.5], 9: [25, 40], 11: [39, 24] }, tag: { 'us:9': GOOD('ON YOUR SIDE') },
          head: 'Your pivot gets in front of their 4', sub: 'The 9 is on your side of the defender. Look at the diagonal.', cam: C([15, 24], 1.4) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      9: [{ t: 1.1, us: { 11: [13, 24] }, pass: 'us:11', pd: .45, tag: { 'us:9': GOOD('SKIPPED THEM') }, head: 'Into the pivot',
          sub: 'One pass skipped their 7 and their 9. The pivot lays it back to you, facing the goal…', cam: C([16, 20], 1.45) },
        { t: .5, shot: [22.3, -1], head: 'Into the pivot', sub: '…and you shoot.', wait: 1.1 }],
      4: say('Too safe', 'Safe, but the diagonal into the pivot was on.', C([16, 40], 1.3)),
      carry0: [{ t: .9, them: { 4: [11, 16] }, tag: { 'them:4': 'SLIDES ACROSS' }, head: 'Into the corner', sub: 'Their 4 slides across, and the pass to the pivot is gone.',
        cam: C([12, 20], 1.55), wait: 1.2 }],
      shoot: say('No angle', 'From out wide, their keeper covers that easily.', C([16, 14], 1.4))
    } },

  'Switch and shoot': {
    intro: { start: { ball: 'us:11', us: { 11: [7, 32], 7: [43, 25], 9: [19, 17], 4: [25, 50] }, them: { 11: [21, 31.5], 4: [20, 11], 7: [13, 26], 9: [20, 42] } },
      cam: C([18, 28], 1.25),
      steps: [
        { t: 1.6, pass: 'us:7', pd: .1, us: { 11: [6, 29], 7: [40, 21], 9: [20, 13], 4: [25, 47] }, them: { 11: [31, 27], 4: [21, 8], 7: [10, 24], 9: [18, 40] }, tag: { 'them:11': 'SLIDING' },
          head: 'Your 11 switches it to you', sub: 'Their 11 is still sliding across, and you can see the goal.', cam: C([34, 20], 1.4) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      shoot: say('Switch and shoot', 'The switch left their 11 a step behind, so you shot first time, before the block could come.', C([30, 14], 1.4), { tag: { 'them:11': 'TOO LATE' } }),
      carry0: [{ t: .7, them: { 11: [32, 21.5] }, tag: { 'them:11': 'BLOCK' }, head: 'One touch too many', sub: 'You took it inside, and their 11 arrived to block the shot.',
        cam: C([33, 19], 1.6, .45), wait: 1.2 }],
      9: steal('9', '4', [20.5, 10.5], 'Marked', 'Their 4 is right on your pivot. You had the shot.'),
      4: say('Too safe', 'Back to the 4, after the switch had opened the shot?', C([32, 30], 1.25))
    } },

  'Wait on the far side': {
    intro: { start: { ball: 'us:4', us: { 11: [7, 40], 9: [19, 22], 7: [40, 30] }, them: { 4: [20, 16], 11: [37, 24], 7: [12, 33], 9: [22, 44] } },
      cam: C([22, 34], 1.2),
      steps: [
        { t: 1.6, pass: 'us:11', pd: .15, us: { 11: [6, 34], 9: [16, 18], 7: [30, 30] }, them: { 4: [17, 13], 11: [33, 22], 7: [10, 29], 9: [20, 40] }, tag: { 'us:7': 'DRIFTING IN' },
          head: 'Your teammates combine on the left', sub: 'Their whole team goes with them, and you drift inside.', cam: C([20, 30], 1.2) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      zone0: [{ t: 1.1, us: { 7: [42, 15] }, them: { 11: [36, 18.5] }, tag: { 'us:7': GOOD('WIDE OPEN') }, head: 'Wait on the far side',
          sub: 'The ball was on the left and their team went with it, so you stayed wide. The switch comes to you with space to attack…', cam: C([38, 20], 1.4) },
        { t: .5, shot: [22.3, -1], head: 'Wait on the far side', sub: '…and you shoot before they shift back.', wait: 1.1 }],
      zone1: say('Too narrow', 'Their 11 can watch you and the middle at the same time.', C([30, 26], 1.45), { tag: { 'them:11': 'WATCHING BOTH' } }),
      zone2: say('Into the crowd', 'Now everyone is on the left, including you. Look at all the space on the right.', C([28, 28], 1.2),
        { hatch: [{ pts: [[34, 10], [50, 10], [50, 40], [34, 40]], c: 'gold' }], wait: 1.4 })
    } },

  'Far post run': {
    intro: { start: { ball: 'us:11', us: { 11: [6, 18], 9: [24, 20], 7: [44, 30], 4: [25, 46] }, them: { 7: [9, 22], 4: [21, 15], 11: [38, 23], 1: [25, 3], 9: [28, 38] } },
      cam: C([20, 16], 1.4),
      steps: [
        { t: 1.6, us: { 11: [9, 7], 9: [22.5, 12.5], 7: [42, 24], 4: [25, 42] }, them: { 7: [12, 14], 4: [18.5, 9.5], 11: [36, 18], 1: [24, 3], 9: [27, 34] },
          head: 'Your 11 gets to the end line', sub: 'Your pivot attacks the near post, and their 4 goes with it.', cam: C([22, 12], 1.4) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      zone0: [{ t: .5, tag: { 'us:7': GOOD('FAR POST') }, head: 'Far post run', sub: 'The ball was on the far wing, so you attacked the far post. The low ball across the goal went past everyone…',
          cam: C([28, 6], 1.6, .45) },
        { t: .4, shot: [27.5, -1], head: 'Far post run', sub: '…and found you for the tap-in.', wait: 1.1 }],
      zone1: [{ t: 1, pass: [42, 3], head: 'Watching', sub: 'The ball across the goal rolls past everyone, and nobody is at the far post.', cam: C([30, 8], 1.35), wait: 1.2 }],
      zone2: say('Too crowded', 'Your pivot, their 4 and their keeper are all there.', C([22, 9], 1.6, .45), { tag: { 'them:4': 'CROWD', 'them:1': 'CROWD' } })
    } },

  /* ---- 4. The pivot ---- */
  'Lay it off': {
    intro: { start: { ball: 'us:4', us: { 9: [25, 17], 11: [8, 40], 7: [43, 35] }, them: { 4: [25, 12], 9: [31, 44], 7: [12, 44], 11: [38, 30] } },
      cam: C([25, 32], 1.3),
      steps: [
        { t: 1.5, pass: 'us:9', pd: .05, face: { 'us:9': 'down' }, us: { 9: [25, 21], 11: [11, 33], 7: [44, 30] }, them: { 4: [25, 16], 9: [27, 40], 7: [12, 40], 11: [39, 26] },
          tag: { 'them:4': 'TIGHT' }, head: 'Your 4 plays it into you', sub: 'Your back is to goal, and their 4 is right behind you. Your 11 is running in.', cam: C([21, 26], 1.45) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      lead0: [{ t: .6, tag: { 'us:11': GOOD('FACING GOAL') }, head: 'Lay it off', sub: 'Their 4 was tight behind you, so you laid it into the path of your 11, who runs onto it facing the goal…',
          cam: C([18, 20], 1.4) },
        { t: .5, shot: [22.3, -1], head: 'Lay it off', sub: '…and shoots first time.', wait: 1.1 }],
      11: [{ t: .8, us: { 11: [14, 27] }, tag: { 'us:11': GOOD('FACING GOAL') }, head: 'Lay it off', sub: 'Their 4 was tight behind you, so you laid it off to your 11, who can face the goal…',
          cam: C([18, 22], 1.4) },
        { t: .5, shot: [22.3, -1], head: 'Lay it off', sub: '…and shoot.', wait: 1.1 }],
      4: say('Good', 'Safe, but your 11 was arriving facing the goal.', C([22, 34], 1.3)),
      7: steal('7', '11', [41.5, 28], 'Marked', 'Their 11 is right on your 7.'),
      carry0: steal('9', '4', [25, 13.5], 'Into their 4', 'You turned straight into their 4, who takes it.'),
      carry1: steal('9', '4', [22, 18], 'Into their 4', 'Their 4 is too close to turn on.'),
      carry2: steal('9', '4', [28, 18], 'Into their 4', 'Their 4 is too close to turn on.'),
      shoot: { replace: true, steps: [{ t: .5, pass: 'them:4', tag: { 'them:4': 'BLOCK' }, head: 'Back to goal',
        sub: "You can't shoot with your back to the goal and their 4 right behind you.", cam: C([25, 18], 1.6, .45), wait: 1.2 }] }
    } },

  'The one-two': {
    intro: { start: { ball: 'us:11', us: { 9: [19, 30], 4: [25, 56], 7: [43, 36] }, them: { 4: [20, 25], 7: [12, 38], 9: [30, 48], 11: [37, 31] } },
      cam: C([14, 36], 1.45),
      steps: [
        { t: 1.5, pass: 'us:9', pd: .35, face: { 'us:9': 'left' }, us: { 9: [18, 37], 4: [26, 52], 7: [44, 32] }, them: { 4: [19, 31], 7: [9.5, 36], 9: [29, 44], 11: [38, 27] },
          head: 'You play it into your pivot', sub: 'The 9 came short. Their 7 is still between you and their goal.', cam: C([13, 36], 1.45) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      zone0: [{ t: 1, us: { 11: [11, 14] }, them: { 4: [16, 20] }, tag: { 'us:11': GOOD('IN BEHIND') }, head: 'The one-two',
          sub: 'You passed into the pivot and ran past their 7. The 9 gave it straight back, and you are in behind…', cam: C([12, 20], 1.45) },
        { t: .5, shot: [22.3, -1], head: 'The one-two', sub: '…two touches, and you are through.', wait: 1.1 }],
      zone1: [{ t: .8, them: { 7: [8.5, 38] }, tag: { 'them:7': 'MARK' }, head: 'Stood still', sub: 'You passed and watched. Their 7 is still in front of you.', cam: C([10, 38], 1.55), wait: 1.2 }],
      zone2: say('Into the crowd', 'You ran toward the pivot, right into their 7 and their 4.', C([14, 33], 1.55), { tag: { 'them:7': 'CROWD', 'them:4': 'CROWD' } })
    } },

  'Turn when you can': {
    intro: { start: { ball: 'us:4', us: { 9: [23, 23], 11: [7, 38], 7: [43, 36] }, them: { 4: [29, 16], 9: [30, 46], 7: [11, 34], 11: [38, 32] } },
      cam: C([24, 34], 1.3),
      steps: [
        { t: 1.4, pass: 'us:9', pd: .05, face: { 'us:9': 'down' }, us: { 9: [23, 27], 11: [6, 34], 7: [44, 32] }, them: { 4: [30, 20], 9: [26, 42], 7: [10, 30], 11: [39, 28] },
          tag: { 'them:4': 'STANDS OFF' }, head: 'Your 4 plays it into you', sub: 'Your back is to goal, but their 4 stays off you, out to your right.', cam: C([25, 25], 1.45) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      carry0: [{ t: .6, tag: { 'us:9': GOOD('TURNED') }, head: 'Turn when you can', sub: 'Their 4 stood off you on the right, so you turned the other way…', cam: C([20, 15], 1.45) },
        { t: .5, shot: [22.3, -1], head: 'Turn when you can', sub: '…and got your shot away.', wait: 1.1 }],
      carry1: [{ t: .5, pass: 'them:4', tag: { 'them:4': 'TACKLE' }, head: 'Into their 4', sub: 'You turned right into their 4.', cam: C([29, 21], 1.6, .45), wait: 1.2 }],
      4: say('Too safe', 'Back to the 4, when their 4 had given you room to turn?', C([24, 36], 1.3)),
      11: say('Not the best', 'Safe, but you had room to turn yourself.', C([15, 30], 1.3)),
      7: steal('7', '11', [41.5, 30], 'Marked', 'Their 11 is on your 7.'),
      shoot: say('Back to goal', "Turn first. You can't aim with your back to the goal.", C([24, 16], 1.4))
    } },

  'Set up the fixo': {
    intro: { start: { ball: 'us:4', us: { 4: [30, 44], 9: [25, 14], 11: [6, 28], 7: [42, 28] }, them: { 4: [25, 9.5], 9: [27, 48], 7: [13, 26], 11: [37, 26] } },
      cam: C([27, 30], 1.3),
      steps: [
        { t: 1.6, pass: 'us:9', pd: .05, face: { 'us:9': 'down' }, us: { 4: [31, 35], 9: [25, 18], 11: [7, 24], 7: [43, 24] }, them: { 4: [25, 13.5], 9: [25, 45], 7: [11, 21], 11: [39, 21] },
          tag: { 'them:4': 'TIGHT', 'them:7': 'MARK', 'them:11': 'MARK' }, head: 'You get it with your back to goal',
          sub: 'Their defenders all close in on you and the alas. Your 4 is running up behind you.', cam: C([27, 24], 1.3) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      lead0: [{ t: .6, tag: { 'us:4': GOOD('FIRST TIME') }, head: 'Set up the fixo', sub: 'They all closed in on you and the alas, so you laid it into the path of your 4…',
          cam: C([28, 22], 1.35) },
        { t: .5, shot: [27.5, -1], head: 'Set up the fixo', sub: '…for a first-time shot.', wait: 1.1 }],
      4: [{ t: .6, tag: { 'us:4': GOOD('FREE') }, head: 'Set up the fixo', sub: 'They all closed in on you and the alas, so you laid it back to your 4…', cam: C([28, 24], 1.3) },
        { t: .5, shot: [27.5, -1], head: 'Set up the fixo', sub: '…who shoots facing the goal.', wait: 1.1 }],
      11: steal('11', '7', [9.5, 21.5], 'Marked', 'Their 7 is right on your 11.'),
      7: steal('7', '11', [40.5, 21.5], 'Marked', 'Their 11 is right on your 7.'),
      carry0: steal('9', '4', [25, 11.5], 'Into their 4', 'You turned straight into their 4.'),
      shoot: { replace: true, steps: [{ t: .5, pass: 'them:4', tag: { 'them:4': 'BLOCK' }, head: 'Back to goal',
        sub: "You can't shoot with your back to goal and their 4 behind you.", cam: C([25, 16], 1.6, .45), wait: 1.2 }] }
    } },

  'Show for it': {
    intro: { start: { ball: 'us:4', us: { 4: [25, 62], 9: [25, 24], 11: [7, 44], 7: [43, 44] }, them: { 9: [27, 47], 4: [25, 18], 7: [13, 37], 11: [37, 37] } },
      cam: C([25, 42], 1.25),
      steps: [
        { t: 1.5, us: { 4: [25, 57], 9: [25, 27], 11: [6, 40], 7: [44, 40] }, them: { 9: [25, 43], 4: [25, 21], 7: [12, 33], 11: [38, 33] }, marks: [{ s: ['them:9', 'us:4'], len: 18 }],
          head: 'Your 4 wants to play it into you', sub: 'Their 9 is standing right between you and your 4.', cam: C([25, 40], 1.25), wait: .4 },
        { t: 1, cam: W_, head: '', marks: [] }] },
    after: {
      zone0: [{ t: .9, them: { 4: [20.5, 21.5] }, tag: { 'them:4': 'FOLLOWS', 'us:9': GOOD('FOUND') }, head: 'Show for it',
          sub: 'You slid out from behind their 9, so your 4 found you. Their 4 has to follow…', cam: C([22, 26], 1.4) },
        { t: 1.1, pass: 'us:7', pd: .5, us: { 7: [34, 16] }, tag: { 'us:7': GOOD('IN BEHIND') }, head: 'Show for it', sub: '…which opens the space behind it for your 7.', cam: C([28, 16], 1.4) },
        { t: .5, shot: [28, -1], wait: 1.1 }],
      zone1: [{ t: .9, them: { 4: [29.5, 21.5] }, tag: { 'them:4': 'FOLLOWS', 'us:9': GOOD('FOUND') }, head: 'Show for it',
          sub: 'You slid out from behind their 9, so your 4 found you. Their 4 has to follow…', cam: C([28, 26], 1.4) },
        { t: 1.1, pass: 'us:11', pd: .5, us: { 11: [16, 16] }, tag: { 'us:11': GOOD('IN BEHIND') }, head: 'Show for it', sub: '…which opens the space behind it for your 11.', cam: C([22, 16], 1.4) },
        { t: .5, shot: [22.3, -1], wait: 1.1 }],
      zone2: say('Hidden', 'Their 9 is right in the line between you and your 4.', C([25, 38], 1.3), { marks: [{ s: ['them:9', 'us:4'], len: 18 }], wait: 1.4 }),
      zone3: say('Too deep', 'You came all the way back, right next to their 9. Now nobody is up front.', C([25, 32], 1.2),
        { hatch: [{ pts: [[15, 8], [35, 8], [35, 30], [15, 30]], c: 'bad' }], wait: 1.4 })
    } },

  /* ---- 5. Create the shot ---- */
  'Shoot early': {
    intro: { start: { ball: 'us:9', us: { 9: [21, 25], 4: [25, 51], 11: [7, 34], 7: [42, 30] }, them: { 4: [30, 11], 9: [27, 42], 7: [11, 30], 11: [36, 27] } },
      cam: C([22, 22], 1.45),
      steps: [
        { t: 1.3, face: { 'us:9': 'up' }, us: { 9: [19, 20], 4: [25, 47], 11: [6, 30], 7: [43, 26] }, them: { 4: [26, 14], 9: [25, 38], 7: [10, 26], 11: [37, 23] },
          tag: { 'them:4': 'COMING ACROSS' }, head: 'You turn at the edge of their area', sub: 'You can see the goal. Their 4 is coming across to block.', cam: C([22, 15], 1.5) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      shoot: say('Shoot early', 'You could see the goal, so you hit it early, before their 4 could block it.', C([22, 10], 1.5, .45), { tag: { 'them:4': 'TOO LATE' } }),
      carry0: [{ t: .6, them: { 4: [23, 12] }, tag: { 'them:4': 'BLOCK' }, head: 'One touch too many', sub: 'You took another touch, and their 4 got there to block it.', cam: C([22, 13], 1.6, .45), wait: .5 },
        { t: .4, pass: 'them:4', wait: 1.1 }],
      11: say('Not the best', 'Your 11 is further from goal than you. You had the shot.', C([14, 24], 1.35)),
      4: say('Too safe', 'Back to the 4, with a clear look at goal?', C([22, 32], 1.25))
    } },

  'The cut-back': {
    intro: { start: { ball: 'us:11', us: { 11: [6, 16], 9: [26, 16], 7: [40, 16], 4: [28, 40] }, them: { 7: [9, 20], 1: [25, 3], 4: [24, 12], 11: [40, 20], 9: [32, 42] } },
      cam: C([18, 16], 1.35),
      steps: [
        { t: 1.6, us: { 11: [9, 5], 9: [24, 11], 7: [38, 9], 4: [27, 30] }, them: { 7: [12.5, 13], 1: [22, 3], 4: [21.5, 8.5], 11: [39, 14], 9: [30, 36] },
          head: 'You get to their end line', sub: 'Their keeper and their 4 guard the near post. Your 4 is running in.', cam: C([18, 14], 1.35) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      lead0: [{ t: .6, us: { 9: [20.5, 12.5] }, tag: { 'us:4': GOOD('FREE') }, head: 'The cut-back',
          sub: 'Their keeper and their 4 were at the near post, so you pulled it back into the space your 4 ran into…', cam: C([24, 14], 1.5, .45) },
        { t: .5, shot: [27.5, -1], head: 'The cut-back', sub: '…first-time shot.', wait: 1.1 }],
      4: say('Good', 'Right player, but your 4 is running in. Put it into the space the 4 is running into.', C([22, 22], 1.35)),
      9: steal('9', '4', [22.5, 9], 'Marked', 'Their 4 is right on your pivot at the near post.'),
      shoot: say('No angle', 'From the end line, their keeper covers the whole near post.', C([17, 6], 1.6, .45))
    } },

  'Make it two against one': {
    intro: { start: { ball: 'us:11', us: { 11: [12, 38], 4: [9, 46], 9: [24, 17], 7: [43, 32] }, them: { 7: [14, 20], 4: [23, 11], 9: [27, 44], 11: [37, 26] } },
      cam: C([12, 34], 1.4),
      steps: [
        { t: 1.5, us: { 11: [11, 31], 4: [5, 36], 9: [23, 13], 7: [44, 28] }, them: { 7: [13, 26], 4: [22, 8], 9: [26, 40], 11: [38, 22] }, tag: { 'them:7': 'STEPS UP' },
          head: 'Your 4 overlaps on the outside', sub: 'Their 7 steps toward you.', cam: C([11, 30], 1.45) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      lead0: [{ t: 1, us: { 4: [8, 12] }, them: { 4: [16, 8], 1: [22, 3] }, tag: { 'us:4': GOOD('IN BEHIND') }, head: 'Make it two against one',
          sub: 'Their 7 stepped to you, so you slipped it down the line. The 4 is in behind…', cam: C([12, 15], 1.45) },
        { t: .8, pass: 'us:9', head: 'Make it two against one', sub: '…and squares it for your pivot.', cam: C([20, 10], 1.5, .45) },
        { t: .5, shot: [27.5, -1], wait: 1.1 }],
      4: say('Good', 'Right idea, but your 4 is running. Put it in front of the 4, down the line.', C([8, 30], 1.4)),
      9: steal('9', '4', [22.5, 10.5], 'Marked', 'Their 4 is right on your pivot.'),
      carry0: [{ t: .5, pass: 'them:7', tag: { 'them:7': 'TACKLE' }, head: 'Into their 7', sub: 'Their 7 was waiting for exactly that.', cam: C([13, 25], 1.6, .45), wait: 1.2 }],
      shoot: say('Too far', 'Way too far, with their 7 right in front of you.', C([14, 22], 1.25))
    } },

  'Arrive late': {
    intro: { start: { ball: 'us:11', us: { 11: [6, 16], 9: [24, 18], 7: [38, 16], 4: [25, 52] }, them: { 7: [9, 21], 4: [22, 13], 11: [40, 18], 1: [25, 3], 9: [28, 43] } },
      cam: C([20, 16], 1.3),
      steps: [
        { t: 1.6, us: { 11: [9, 6], 9: [22.5, 10], 7: [33, 7], 4: [25, 46] }, them: { 7: [12.5, 14], 4: [19, 7.5], 11: [36, 12], 1: [23, 3], 9: [27, 38] },
          head: 'Your 11 gets to the end line', sub: 'Your pivot attacks the near post and your 7 the far post.', cam: C([22, 14], 1.3) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      zone0: [{ t: .6, tag: { 'us:4': GOOD('TIME TO SHOOT') }, head: 'Arrive late', sub: 'Everyone ran at the goal, so you arrived late at the top of the area…', cam: C([24, 14], 1.5, .45) },
        { t: .5, shot: [27.5, -1], head: 'Arrive late', sub: '…and the cut-back finds you with time to shoot.', wait: 1.1 }],
      zone1: say('Too early', 'Now you are in the crowd too, and the space behind is empty.', C([23, 14], 1.5, .45),
        { hatch: [{ pts: [[19, 17], [31, 17], [31, 26], [19, 26]], c: 'gold' }], wait: 1.4 }),
      zone2: say('Too far', "The cut-back can't reach you from there.", C([22, 26], 1.2), { hatch: [{ pts: [[19, 17], [31, 17], [31, 26], [19, 26]], c: 'gold' }], wait: 1.4 })
    } },

  'Square it': {
    intro: { start: { ball: 'us:7', us: { 7: [34, 30], 9: [20, 30], 11: [9, 46], 4: [25, 60] }, them: { 4: [33, 35], 9: [22, 38], 1: [25, 4], 7: [13, 40], 11: [37, 36] } },
      cam: C([28, 24], 1.35),
      steps: [
        { t: 1.6, us: { 7: [31, 15], 9: [18, 15], 11: [8, 40], 4: [25, 55] }, them: { 4: [30, 28], 9: [24, 32], 1: [28, 8], 7: [12, 34], 11: [37, 30] },
          tag: { 'them:1': 'RUSHES OUT' }, head: "You're through on goal", sub: 'Their keeper rushes out at you, and your pivot runs alongside.', cam: C([25, 14], 1.4) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      9: [{ t: .5, shot: [23, -1], tag: { 'us:9': GOOD('OPEN GOAL') }, head: 'Square it', sub: 'Their keeper came out at you, so you squared it to your pivot. Open goal.',
        cam: C([22, 9], 1.5, .45), wait: 1.2 }],
      lead0: [{ t: .5, shot: [24, -1], tag: { 'us:9': GOOD('OPEN GOAL') }, head: 'Square it', sub: 'Their keeper came out at you, so you rolled it across in front of your pivot. Open goal.',
        cam: C([22, 8], 1.5, .45), wait: 1.2 }],
      carry0: [{ t: .5, pass: 'them:1', tag: { 'them:1': 'SMOTHERS' }, head: 'Into the keeper', sub: 'Their keeper smothers it.', cam: C([29, 9], 1.6, .45), wait: 1.2 }],
      shoot: say('Risky', 'The keeper rushed out and covered most of the goal. Your 9 had an open net.', C([25, 12], 1.5, .45), { tag: { 'them:1': 'SAVED' } }),
      4: say('Too safe', 'Back, when you were through on goal?', C([27, 34], 1.2))
    } },

  /* ---- 6. Counters and routines ---- */
  'Two against one': {
    intro: { start: { ball: 'us:11', us: { 11: [18, 54], 9: [34, 52], 4: [24, 72], 7: [44, 66] }, them: { 4: [23, 24], 7: [10, 64], 9: [24, 66], 11: [38, 72] } },
      cam: C([24, 46], 1.15),
      steps: [
        { t: 1.6, us: { 11: [16, 40], 9: [33, 38], 4: [24, 64], 7: [42, 58] }, them: { 4: [21, 32], 7: [12, 56], 9: [24, 58], 11: [38, 64] }, tag: { 'them:4': 'STEPS UP' },
          head: 'Counterattack!', sub: 'Only their 4 is back, and your pivot is with you. Their 4 steps toward you.', cam: C([24, 38], 1.25) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      lead0: [{ t: 1, us: { 9: [30, 14] }, them: { 1: [24, 4] }, tag: { 'us:9': GOOD('THROUGH') }, head: 'Two against one',
          sub: 'Their 4 stepped to you, so you slipped it into the space ahead of your pivot. The 9 is through…', cam: C([28, 16], 1.4) },
        { t: .5, shot: [28, -1], head: 'Two against one', sub: '…and scores.', wait: 1.1 }],
      9: say('Good', 'Right player, but the 9 is running. Put it in front of the 9.', C([30, 34], 1.35)),
      7: say('Too safe', 'Back to the 7, with two of you against one?', C([34, 50], 1.2)),
      carry0: [{ t: .5, pass: 'them:4', tag: { 'them:4': 'TACKLE' }, head: 'Into their 4', sub: 'You ran straight into the only defender.', cam: C([20, 31], 1.6, .45), wait: 1.2 }],
      carry1: [{ t: .8, them: { 4: [15, 26] }, tag: { 'them:4': 'SHOWS YOU WIDE' }, head: 'Too wide', sub: 'Their 4 shows you wide, away from goal, and your 9 is out of the play.',
        cam: C([14, 27], 1.5), wait: 1.2 }],
      shoot: say('Too far', 'Way too far, with two of you against one.', C([20, 24], 1.2))
    } },

  'Three against two': {
    intro: { start: { ball: 'us:11', us: { 11: [25, 56], 9: [12, 50], 7: [34, 60], 4: [25, 78] }, them: { 4: [21, 34], 11: [33, 38], 7: [12, 74], 9: [22, 72] } },
      cam: C([25, 48], 1.15),
      steps: [
        { t: 1.6, us: { 11: [25, 42], 9: [10, 36], 7: [33, 48], 4: [25, 70] }, them: { 4: [21, 28], 11: [33, 32], 7: [12, 66], 9: [22, 62] },
          head: 'Counterattack!', sub: 'Your 11 dribbles up the middle, and only two of theirs are back.', cam: C([25, 40], 1.2) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      zone0: [{ t: .9, us: { 11: [27, 24] }, them: { 11: [44, 25], 1: [23.5, 4] }, tag: { 'them:11': 'PRESS' }, head: 'Three against two',
          sub: 'You ran wide and forward, so their 11 has to come out to you…', cam: C([34, 26], 1.3) },
        { t: .8, pass: 'us:11', pd: .1, tag: { 'us:11': GOOD('FREE') }, head: 'Three against two', sub: '…and that leaves your 11 free.' },
        { t: .5, shot: [28, -1], wait: 1.1 }],
      zone1: [{ t: .8, them: { 11: [29, 35] }, tag: { 'them:11': 'MARKS BOTH' }, head: 'Too close', sub: 'Right next to your 11, one defender can cover you both.', cam: C([27, 38], 1.45), wait: 1.2 }],
      zone2: say('Too deep', 'Behind the ball you are no help to the counter. Their two defenders only have two of us to stop.', C([25, 40], 1.2))
    } },

  'Kick-in for the fixo': {
    intro: { start: { us: { 4: [33, 50], 9: [28, 18], 11: [10, 24] }, them: { 9: [23, 38], 4: [27, 12], 7: [13, 19], 11: [40, 20] } },
      cam: C([36, 26], 1.3),
      steps: [
        { t: 1.6, us: { 4: [34, 40], 9: [26, 13], 11: [8, 18] }, them: { 9: [20, 32], 4: [25, 8], 7: [11, 14], 11: [42, 15] }, tag: { 'them:4': 'MARK', 'them:7': 'MARK' },
          head: 'Kick-in to us near their area', sub: 'Their players mark your 9 and 11. Your 4 is running up from behind.', cam: C([34, 24], 1.3) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      lead0: [{ t: .6, us: { 9: [23, 12] }, them: { 1: [23.5, 3.5] }, tag: { 'us:4': GOOD('FIRST TIME'), 'them:4': 'MARK' }, head: 'Kick-in for the fixo',
          sub: 'Their players marked the 9 and the 11, so you played it into your 4, arriving from behind…', cam: C([28, 20], 1.4) },
        { t: .5, shot: [27, -1], head: 'Kick-in for the fixo', sub: '…for a first-time shot.', wait: 1.1 }],
      4: say('Good', 'Right player, but your 4 is running in. Put it into the run.', C([36, 34], 1.35)),
      9: steal('9', '4', [25.5, 10.5], 'Marked', 'Their 4 is right on your pivot.')
    } },

  'Corner to the far post': {
    intro: { start: { us: { 9: [22, 16], 7: [42, 20], 4: [25, 34] }, them: { 4: [23, 19], 11: [40, 26], 9: [26, 28], 7: [10, 12], 1: [25, 3] } },
      cam: C([20, 12], 1.35),
      steps: [
        { t: 1.6, us: { 9: [19, 9], 7: [38, 12], 4: [24, 26] }, them: { 4: [20, 13], 11: [37, 20], 9: [25, 20], 7: [12, 8], 1: [23, 3.5] },
          head: 'Corner kick to us from the left', sub: 'Their keeper and their 4 crowd the near post. Your 7 sneaks toward the far post.', cam: C([22, 10], 1.35) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      lead0: [{ t: .5, tag: { 'us:7': GOOD('FAR POST') }, head: 'Corner to the far post',
          sub: 'Their defenders crowded the near post, so you whipped it across, right into your 7’s run…', cam: C([30, 6], 1.6, .45) },
        { t: .4, shot: [27, -1], head: 'Corner to the far post', sub: '…at the far post, where nobody followed.', wait: 1.1 }],
      7: say('Good', 'Right player, but the 7 is moving. Put it at the far post, in front of the run.', C([34, 10], 1.45)),
      9: steal('9', '1', [20.5, 6.5], 'Marked', 'Their keeper comes and claims it at the near post.'),
      4: steal('4', '9', [24.5, 23.5], 'Marked', 'Their 9 is right on your 4 at the top of the area.')
    } },

  'Power play': {
    intro: { start: { ball: 'us:4', us: { 1: [28, 60], 4: [17, 42], 11: [6, 25], 7: [44, 26], 9: [25, 18] }, them: { 9: [23, 28], 7: [14, 20], 11: [36, 30], 4: [25, 12] } },
      cam: C([25, 40], 1.1),
      steps: [
        { t: 1.8, us: { 1: [33, 38], 4: [14, 36], 11: [5, 20], 7: [45, 20], 9: [25, 13] }, them: { 9: [20, 32], 7: [11, 24], 11: [37, 25], 4: [25, 8.5] },
          tag: { 'us:1': GOOD('FIFTH ATTACKER') }, head: 'Power play', sub: 'Your keeper comes up to make it five against four. Their 9 and 7 are on you and your 11.', cam: C([25, 30], 1.2) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      1: [{ t: .9, them: { 11: [38, 36] }, tag: { 'them:11': 'PRESS' }, head: 'Power play', sub: 'You moved it across the top, so their 11 has to choose: your keeper or your 7…',
          cam: C([38, 30], 1.3) },
        { t: 1, pass: 'us:7', pd: .1, us: { 7: [44, 16] }, tag: { 'us:7': GOOD('FREE') }, head: 'Power play', sub: '…their 11 went to the keeper, so the 7 on the far side is free.', cam: C([38, 16], 1.4) },
        { t: .5, shot: [28, -1], wait: 1.1 }],
      11: steal('11', '7', [8, 22.5], 'Marked', 'Their 7 is right on your 11.'),
      carry0: [{ t: .5, pass: 'them:9', tag: { 'them:9': 'TACKLE' }, head: 'Into their 9', sub: 'Their 9 is right there…', cam: C([19, 31], 1.6, .45), wait: .6 },
        { t: 1.3, shot: [25, 101], head: 'Into their 9', sub: '…and with our keeper up the court, our goal is empty.', cam: W_, wait: 1 }],
      shoot: { replace: true, steps: [{ t: .5, pass: 'them:9', tag: { 'them:9': 'BLOCK' }, head: 'Blocked', sub: 'Through their whole diamond? It hits a defender.',
        cam: C([17, 34], 1.5, .45), wait: 1.2 }] }
    } }
};
window.RIDDLE_LIB.withMotion(RIDDLES, MOTION);

window.RIDDLE_LIB.defineSet({ key: 'fs', chapters: CHAPTERS, riddles: RIDDLES });
})();
