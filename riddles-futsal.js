/* Futsal puzzles (5v5): one mixed set about attacking strategy. Each puzzle says which player you are.

   The court is 20 x 40 m, drawn in units of 0.4 m: x 0-50 (our left touchline to our right),
   y 0-100 (their goal line at the top to ours at the bottom). Their posts are at x 21.25 and 28.75,
   their penalty area reaches 15 units (6 m) out, the 10 m mark is 25 units out. No offside.
   In the data, players are numbered like the 9v9 players who do the same job: 1 keeper, 4 the fixo
   (the last player, who starts the attack), 11 and 7 the alas (left and right wingers), 9 the pivo
   (the target striker). Their players use the same numbers; their 7 plays on our left side, their 11
   on our right. On the court they're labeled GK, FIXO, ALA and PIVO, and the text names them by role. Left and
   right are as you see the court: our 11 and their 7 are the left alas, our 7 and their 11 the
   right alas. We attack in a 3-1 (the fixo, two alas, the pivo) against their 1-2-1 or 2-2.

   Answer format: see the top of riddles-6.js. Plays (motion) are at the bottom, matched by title. */
(function () {
const { P, TOO_SAFE, steal, say } = window.RIDDLE_LIB;
const CORNER_L = [0.4, 0.4];

const CHAPTERS = [
  { name: 'Beat the press', blurb: 'Angles, the far side and the third man get the ball out.' },
  { name: 'Rotations', blurb: 'Keep moving so their defenders have to choose.' },
  { name: 'Switches', blurb: 'Move the ball faster than they can shift.' },
  { name: 'The pivo', blurb: 'Play into the pivo and combine around it.' },
  { name: 'Create the shot', blurb: 'Make the space, then hit it early.' },
  { name: 'Counters and routines', blurb: 'Outnumber them, and plays that are planned.' },
  { name: 'Kick-ins', blurb: 'Their players stand 5 m back. Use it.' },
  { name: 'Free kicks', blurb: 'Change the angle, find the far post, and take it quick.' }
];

const RIDDLES = [
/* ---------------- 1. Beat the press ---------------- */
{ ch: 0, type: 'ball', me: '1', title: 'Throw to the free side', noCarry: true, restart: 'clearance',
  prompt: 'You caught their shot. Their press has shifted to our left side, and your right ala is alone on the right.',
  hint: 'Where are they not?',
  lesson: 'When they all press one side, the space is on the other side. Get it there before they shift.',
  us:   { 1:[25,93], 4:[21,81], 11:[6,72], 9:[26,50], 7:[44,70] },
  them: { 1:[25,3], 9:[20.5,75.5], 7:[9.5,67.5], 11:[31,66], 4:[26,44.5] },
  ball: '1',
  pass: {
    7:  P(3, 'Pro choice', 'Their press shifted to our left, so you threw it to the right ala on the free side. Now the right ala faces forward with space to run into.'),
    4:  P(1, 'Risky', 'Their pivo is right on your fixo. That throw invites the steal right in front of our goal.'),
    11: P(1, 'Marked', 'Their left ala is tight on your left ala, on the crowded side.'),
    9:  P(1, 'Risky', 'A long throw to the pivo with their fixo right behind. The right ala was free and closer.')
  },
  lead: [[44, 61, 5.6, 3, 'Pro choice', 'Their press shifted to our left, so you threw it into the space ahead of your right ala. The right ala runs onto it facing forward.', '7']],
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
    11: P(1, 'They slide across', 'Their pivo is right there to slide over while the ball travels. Pull their pivo in first.'),
    7:  P(1, 'They slide across', 'Their right ala is right there to slide over while the ball travels. Pull their right ala in first.'),
    9:  P(1, 'Marked', 'Their fixo is tight behind your pivo, and both of their front two can drop onto the pivo.'),
    1:  TOO_SAFE('Back to the keeper, when nobody was pressing you?')
  },
  carry: [
    [25, 52, 5.6, 3, 'Pro choice', 'Nobody pressed you, so you carried it into the gap between their front two. One of them has to step up to you, and the ala behind them is free.'],
    [12, 58, 3.5, 1, 'Wrong way', 'You carried it toward your left ala, so their pivo can mark you both.'],
    [38, 58, 3.5, 1, 'Wrong way', 'You carried it toward your right ala, so their right ala can mark you both.']
  ],
  shoot: null,
  elsewhere: P(1, 'Not quite', 'Carry it straight at the gap between their front two.'),
  best: { kind: 'carry', at: [25, 52] } },

{ ch: 0, type: 'ball', me: '4', title: 'The third man',
  prompt: 'Their right ala blocks the pass to your right ala, and your left ala is marked. Your pivo has dropped short.',
  hint: "If you can't reach the right ala, who can?",
  lesson: "Can't reach the free player? Play to the one who can. The third man arrives facing forward.",
  us:   { 1:[25,93], 4:[22,62], 11:[6,48], 9:[23,41], 7:[45,46] },
  them: { 1:[25,3], 9:[26,57], 7:[9,43], 11:[35,53], 4:[23,35] },
  ball: '4',
  pass: {
    9:  P(3, 'Pro choice', "Their right ala blocked the pass to your right ala, so you played it into the pivo. The pivo lays it out to the right ala on the first touch: the third man."),
    7:  P(0, 'Intercepted', 'Their right ala is standing right in that lane.', { cut: '11' }),
    11: P(1, 'Marked', 'Their left ala is tight on your left ala.'),
    1:  TOO_SAFE('Back to the keeper, when the pivo had come short for it.')
  },
  shoot: null,
  elsewhere: P(1, 'Not quite', 'The pivo dropped short for a reason. Use it.'),
  best: { kind: 'pass', to: '9' } },

{ ch: 0, type: 'ball', me: '11', title: 'Down the line',
  prompt: 'Their left ala presses you from the inside, and their pivo sits in the pass back to your fixo. Your pivo is sprinting down the line.',
  hint: 'Their left ala came from the inside. Which way is open?',
  lesson: 'Pressed from the inside? Go down the line. A pass parallel to the sideline, into the run, beats the press.',
  us:   { 1:[25,93], 4:[25,62], 11:[5,50], 9:[13,30], 7:[44,40] },
  them: { 1:[25,3], 9:[15,56], 7:[10.5,46], 11:[40,35], 4:[21,24] },
  ball: '11',
  arrows: [{ team: 'us', from: [12, 28.5], to: [7, 22] }],
  pass: {
    4:  P(0, 'Intercepted', 'Their pivo is sitting right in that lane.', { cut: '9' }),
    9:  P(1, 'Behind the run', 'The pivo is running down the line. A pass to where the pivo was is behind the run.'),
    7:  P(0, 'Intercepted', 'A long pass across their whole team. Their left ala or pivo gets there first.', { cut: '7' })
  },
  lead: [[6, 22, 5.6, 3, 'Pro choice', 'Their left ala pressed from the inside, so you went down the line, into the space ahead of your pivo. One pass and the press is beaten.', '9']],
  shoot: null,
  carry: [[6, 42, 3, 0, 'Trapped', 'Their left ala is right there, and the sideline is behind you. That ball is lost.']],
  elsewhere: P(1, 'Not quite', 'Your pivo is running down the line. Find that run.'),
  best: { kind: 'pass', to: '9', at: [6, 22] } },

{ ch: 0, type: 'move', me: '4', title: 'Get an angle',
  prompt: 'Your keeper has the ball. Their pivo is standing right between you and the keeper. Drag the fixo.',
  hint: 'Can your keeper see you?',
  lesson: "If a defender is between you and the ball, you're hidden. Step sideways until there's a clear line.",
  us:   { 1:[25,93], 4:[25,69], 11:[6,70], 9:[25,48], 7:[44,70] },
  them: { 1:[25,3], 9:[25,77], 7:[10,64], 11:[40,64], 4:[25,42.5] },
  ball: { team: 'us', n: '1' },
  zones: [
    [15, 80, 4.2, 3, 'Pro spot', 'You stepped out of their pivo’s shadow, to the side. Your keeper has a clear line to you, and their pivo can’t cover you and the keeper at once.'],
    [35, 80, 4.2, 3, 'Pro spot', 'You stepped out of their pivo’s shadow, to the side. Your keeper has a clear line to you, and their pivo can’t cover you and the keeper at once.'],
    [25, 69, 3, 1, 'Hidden', 'Their pivo is standing right in the line between you and your keeper.'],
    [25, 86, 2.6, 1, 'Too close', 'Right next to your keeper, their pivo can press you both.']
  ],
  elsewhere: P(1, 'Not quite', 'Step sideways, out from behind their pivo.'),
  best: { kind: 'move', at: [15, 80] } },

/* ---------------- 2. Rotations ---------------- */
{ ch: 1, type: 'move', me: '4', title: 'Pass and follow',
  prompt: 'You just passed to your left ala. Their left ala is on your left ala, and their pivo is still close to you. Drag the fixo.',
  hint: 'Two of you against one of them. Where?',
  lesson: "Passed it? Don't stand and watch. Follow your pass around the outside and make it two against one.",
  us:   { 1:[25,93], 4:[22,51], 11:[6,37], 9:[24,15], 7:[44,36] },
  them: { 1:[25,3], 9:[26,44], 7:[10,31], 11:[39,30], 4:[24,10] },
  ball: { team: 'us', n: '11' },
  zones: [
    [4, 24, 4.5, 3, 'Pro spot', 'You followed your pass around the outside. Now their left ala has two of you to stop: go with you, and your left ala cuts inside; stay, and you get the ball down the line.'],
    [22, 51, 3, 1, 'Stood still', "You passed and watched. Their left ala only has your left ala to worry about."],
    [17, 30, 3, 0, 'Into the crowd', 'Their left ala, their pivo and their fixo are all in the middle. That run takes you into traffic.']
  ],
  elsewhere: P(1, 'Not quite', 'Follow your pass, around the outside of your left ala.'),
  best: { kind: 'move', at: [4, 24] } },

{ ch: 1, type: 'move', me: '7', title: 'Fill the spot',
  prompt: 'Your fixo just overlapped down the left. Nobody is in the fixo spot now, and their pivo is waiting for a counter. Drag the right ala.',
  hint: 'Who is guarding our goal if we lose it?',
  lesson: 'When a teammate leaves a spot, fill it. Someone always stays back to stop the counter.',
  us:   { 1:[25,93], 4:[4,25], 11:[9,36], 9:[24,14], 7:[44,32] },
  them: { 1:[25,3], 9:[30,46], 7:[12,30], 11:[38,27], 4:[24,9] },
  ball: { team: 'us', n: '11' },
  noPayoff: true,
  zones: [
    [25, 54, 5.6, 3, 'Pro spot', 'Your fixo left the fixo spot, so you rotated into it. If we lose the ball, you are between their pivo and our goal. That is a rotation.'],
    [44, 32, 3, 1, 'Stayed up', 'Four of us are up the field, and their pivo is alone in the middle. One bad pass and they are through.'],
    [34, 18, 3, 0, 'Even higher', 'Now nobody is back at all.']
  ],
  elsewhere: P(1, 'Not quite', 'Rotate back into the empty fixo spot.'),
  best: { kind: 'move', at: [25, 54] } },

{ ch: 1, type: 'move', me: '4', title: 'Ala inside, fixo wide',
  prompt: 'Your left ala is dribbling inside, and their left ala is going with the left ala. The whole left side is empty. Drag the fixo.',
  hint: 'Who keeps us wide on the left now?',
  lesson: "When your ala cuts inside, open up wide on that side. Keep the court big so they can't squeeze it.",
  us:   { 1:[25,93], 4:[25,52], 11:[15,35], 9:[25,14], 7:[44,34] },
  them: { 1:[25,3], 9:[27,44], 7:[17,30], 11:[38,28], 4:[25,9] },
  ball: { team: 'us', n: '11' },
  arrows: [{ team: 'us', from: [9, 37], to: [14, 35.4] }],
  zones: [
    [5, 40, 4.9, 3, 'Pro spot', 'Your left ala went inside, so you opened up wide where the left ala had been. The court stays big, and your left ala has an easy pass out to you.'],
    [25, 52, 3, 1, 'Stayed in the middle', "Now we have nobody wide on the left, and their team can squeeze the middle."],
    [20, 40, 2.6, 0, 'Too close', 'Right next to your left ala, one defender can mark you both.']
  ],
  elsewhere: P(1, 'Not quite', 'Open up wide on the left, where your left ala was.'),
  best: { kind: 'move', at: [5, 40] } },

{ ch: 1, type: 'move', me: '7', title: 'Swap with the pivo',
  prompt: 'Your pivo dropped out wide on the right to get the ball, and their fixo went with the pivo. The middle in front of their goal is empty. Drag the right ala.',
  hint: 'Your pivo left a space. Who fills it?',
  lesson: 'When your pivo drops out, attack the space the pivo left. Swapping spots drags defenders where they don’t want to go.',
  us:   { 1:[25,93], 4:[28,52], 11:[6,36], 9:[39,24], 7:[45,40] },
  them: { 1:[25,3], 9:[20,43], 7:[10,31], 11:[40,34], 4:[36,19] },
  ball: { team: 'us', n: '4' },
  arrows: [{ team: 'us', from: [28, 15], to: [37, 22.5] }, { team: 'them', from: [27, 12], to: [34.5, 18] }],
  zones: [
    [24, 15, 4.9, 3, 'Pro spot', 'Your pivo pulled their fixo out wide, so you ran into the space the pivo left, right in front of their goal.'],
    [45, 40, 3, 1, 'Stayed wide', 'Now two of us are on the right sideline, and the middle is still empty.'],
    [40, 32, 2.6, 0, 'Into the crowd', 'Your pivo, their fixo and their right ala are already there.']
  ],
  elsewhere: P(1, 'Not quite', 'Run into the space your pivo left.'),
  best: { kind: 'move', at: [24, 15] } },

{ ch: 1, type: 'move', me: '9', title: 'Clear the space',
  prompt: 'Your left ala is dribbling in from the left to shoot. You are standing in front of the left ala, and their fixo is right next to you. Drag the pivo.',
  hint: 'Who is blocking your left ala’s shot?',
  lesson: 'Sometimes the best run takes you away from the ball. Clear out, and your defender goes with you.',
  us:   { 1:[25,93], 4:[25,48], 11:[16,24], 9:[21,15], 7:[44,30] },
  them: { 1:[25,3], 9:[24,38], 7:[13,30], 11:[38,26], 4:[22.5,10] },
  ball: { team: 'us', n: '11' },
  noPayoff: true,
  follow: [{ n: '4', dy: -4 }],
  zones: [
    [36, 10, 4.9, 3, 'Pro spot', "You cleared out to the far post, and their fixo went with you. Now your left ala has a clear look at goal, and you're ready for the rebound."],
    [21, 15, 3, 1, 'In the way', "You and their fixo are standing in your left ala's shooting lane."],
    [15, 17, 2.6, 0, 'Too close', 'You came toward the ball and brought their fixo with you, right into your left ala’s path.']
  ],
  elsewhere: P(1, 'Not quite', 'Clear out of the shooting lane, to the far post.'),
  best: { kind: 'move', at: [36, 10] } },

/* ---------------- 3. Switches ---------------- */
{ ch: 2, type: 'ball', me: '4', title: 'Switch it',
  prompt: 'Your left ala just played it back to you. Their whole team has shifted to our left, and your right ala is alone on the right.',
  hint: 'Before they shift back...',
  lesson: 'The ball moves faster than defenders. When they all shift to one side, switch it before they get back.',
  us:   { 1:[25,93], 4:[22,51], 11:[5,38], 9:[21,18], 7:[45,33] },
  them: { 1:[25,3], 9:[15,44], 7:[9,33], 11:[27,30], 4:[21,13] },
  ball: '4',
  pass: {
    7:  P(3, 'Pro choice', 'Their team shifted to our left, so you switched it straight to your right ala. The right ala has the whole right side to attack.'),
    11: P(1, 'Back into the crowd', 'Their left ala and pivo are right there.'),
    9:  P(1, 'Marked', 'Their fixo is tight on your pivo, and their right ala can drop on the pivo too.'),
    1:  TOO_SAFE('Back to the keeper, when your right ala was alone on the right?')
  },
  lead: [[46, 25, 5.6, 3, 'Pro choice', 'Their team shifted to our left, so you switched it into the space ahead of your right ala.', '7']],
  carry: [[28, 44, 3.5, 1, 'Too slow', 'Every touch gives their team time to shift back across.']],
  shoot: null,
  elsewhere: P(1, 'Not quite', 'They are all on the left. Switch it.'),
  best: { kind: 'pass', to: '7' } },

{ ch: 2, type: 'ball', me: '11', title: 'Into the pivo',
  prompt: 'You have the ball on the left. Your pivo has got in front of their fixo, on your side. Your fixo is behind you.',
  hint: 'Which pass skips the most defenders?',
  lesson: 'The diagonal into the pivo skips their whole midfield. Play it when the pivo is on your side of the defender.',
  us:   { 1:[25,93], 4:[24,49], 11:[6,33], 9:[19,16], 7:[45,28] },
  them: { 1:[25,3], 9:[25,40], 7:[10.5,37], 11:[39,24], 4:[22.5,11.5] },
  ball: '11',
  pass: {
    9:  P(3, 'Pro choice', 'Your pivo was on your side of their fixo, so you played the diagonal into the pivo. One pass skipped their left ala and their pivo, and now the pivo can lay it off or turn.'),
    4:  TOO_SAFE('Safe, but the diagonal into the pivo was on.'),
    7:  P(0, 'Intercepted', 'A long ball across the whole court. Their fixo or their right ala cuts it out.', { cut: '4' })
  },
  carry: [[7, 22, 3, 1, 'Into the corner', 'Down the line toward the corner, their fixo can slide across, and the pass to the pivo is gone.']],
  shoot: P(0, 'No angle', 'From out wide, their keeper covers that easily.'),
  elsewhere: P(1, 'Not quite', 'Look inside for your pivo.'),
  best: { kind: 'pass', to: '9' } },

{ ch: 2, type: 'ball', me: '7', title: 'Switch and shoot',
  prompt: 'The ball was switched to you on the right. Their right ala is still sliding across, and you can see the goal.',
  hint: 'How long until their right ala gets to you?',
  lesson: 'After a fast switch, the shot is on for one touch. Hit it before the defender arrives.',
  us:   { 1:[25,93], 4:[25,47], 11:[6,29], 9:[20,13], 7:[40,21] },
  them: { 1:[25,3], 9:[18,40], 7:[10,24], 11:[31,27], 4:[21,8] },
  ball: '7',
  arrows: [{ team: 'them', from: [26, 29], to: [30.5, 27] }],
  pass: {
    9:  P(1, 'Marked', 'Their fixo is right on your pivo. You had the shot.'),
    4:  TOO_SAFE('Back to the fixo, after the switch had opened the shot?'),
    11: P(0, 'Intercepted', 'Back across their whole team.', { cut: '9' })
  },
  carry: [[34, 18, 3, 1, 'One touch too many', 'You took it inside, and their right ala arrived to block the shot.']],
  shoot: P(3, 'Pro choice', 'The switch left their right ala a step behind, so you shot first time, before the block could come.'),
  elsewhere: P(1, 'Not quite', 'The shot is on right now.'),
  best: { kind: 'shoot' } },

{ ch: 2, type: 'move', me: '7', title: 'Wait on the far side',
  prompt: 'Your left ala, fixo and pivo are combining on the left, and their whole team went with them. You drifted inside. Drag the right ala.',
  hint: 'Where will the switch go?',
  lesson: "Ball on the other side? Stay wide and wait. If you come over, there's nobody to switch to.",
  us:   { 1:[25,93], 4:[18,48], 11:[6,34], 9:[16,18], 7:[30,30] },
  them: { 1:[25,3], 9:[20,40], 7:[10,29], 11:[33,22], 4:[17,13] },
  ball: { team: 'us', n: '11' },
  zones: [
    [45, 28, 4.9, 3, 'Pro spot', 'The ball was on the left and their team went with it, so you stayed wide on the right. Now the switch to you is wide open.'],
    [30, 30, 3, 1, 'Too narrow', 'Their right ala can watch you and the middle at the same time.'],
    [20, 30, 2.6, 0, 'Into the crowd', 'Now everyone is on the left, including you.']
  ],
  elsewhere: P(1, 'Not quite', 'Stay wide on the far side.'),
  best: { kind: 'move', at: [45, 28] } },

{ ch: 2, type: 'move', me: '7', title: 'Far post run',
  prompt: 'Your left ala is at the end line on the left. Your pivo is at the near post with their fixo. Drag the right ala.',
  hint: 'Where does a low ball across the goal end up?',
  lesson: 'Ball on the far wing? Attack the far post. In futsal, the far post run scores more than any other.',
  us:   { 1:[25,93], 4:[25,42], 11:[9,7], 9:[22.5,12.5], 7:[42,24] },
  them: { 1:[24,3], 9:[27,34], 7:[12,14], 11:[36,18], 4:[18.5,9.5] },
  ball: { team: 'us', n: '11' },
  zones: [
    [31, 6, 3, 3, 'Pro spot', 'The ball was on the far wing, so you attacked the far post. The low ball across the goal goes past everyone and finds you.'],
    [42, 24, 3, 1, 'Watching', 'From out there you can’t reach anything across the goal.'],
    [23, 13, 2.6, 0, 'Too crowded', 'Your pivo, their fixo and their keeper are all there.']
  ],
  elsewhere: P(1, 'Not quite', 'Get to the far post.'),
  best: { kind: 'move', at: [31, 6] } },

/* ---------------- 4. The pivo ---------------- */
{ ch: 3, type: 'ball', me: '9', title: 'Lay it off', facing: 'back',
  prompt: 'You got the ball with your back to goal. Their fixo is right behind you, and your left ala is running in from the left.',
  hint: 'Who can face the goal?',
  lesson: 'Back to goal and a defender behind you? Lay it off to the teammate who can face the goal.',
  us:   { 1:[25,93], 4:[25,48], 11:[11,33], 9:[25,21], 7:[44,30] },
  them: { 1:[25,3], 9:[27,40], 7:[12,40], 11:[39,26], 4:[25,16] },
  ball: '9',
  arrows: [{ team: 'us', from: [10, 35], to: [15.5, 27.5] }],
  pass: {
    11: P(3, 'Pro choice', 'Their fixo was tight behind you, so you laid it off to your left ala, who was running in facing the goal.'),
    4:  P(2, 'Good', 'Safe, but your left ala was arriving facing the goal.'),
    7:  P(1, 'Marked', 'Their right ala is right on your right ala.')
  },
  lead: [[16, 26.5, 4.2, 3, 'Pro choice', 'Their fixo was tight behind you, so you laid it into the path of your left ala, who runs onto it facing the goal.', '11']],
  carry: [[25, 16, 3.5, 0, 'Into their fixo', 'You turned straight into their fixo, who takes it.'], [20, 20, 3, 0, 'Into their fixo', 'Their fixo is too close to turn on.'], [30, 20, 3, 0, 'Into their fixo', 'Their fixo is too close to turn on.']],
  shoot: P(0, 'Back to goal', "You can't shoot with your back to the goal and their fixo behind you."),
  elsewhere: P(1, 'Not quite', 'Lay it off to someone who can face the goal.'),
  best: { kind: 'pass', to: '11' } },

{ ch: 3, type: 'move', me: '11', title: 'The one-two',
  prompt: 'You just played it into your pivo, who came short. Their left ala is still between you and their goal. Drag the left ala.',
  hint: 'Your pivo can give it straight back. Where?',
  lesson: 'Pass into the pivo and go. The one-two gets you behind your defender in two touches.',
  us:   { 1:[25,93], 4:[26,52], 11:[6,42], 9:[18,37], 7:[44,32] },
  them: { 1:[25,3], 9:[29,44], 7:[9.5,36], 11:[38,27], 4:[19,31] },
  ball: { team: 'us', n: '9' },
  zones: [
    [6, 24, 4.5, 3, 'Pro spot', 'You passed into the pivo and ran past their left ala, down the line. The pivo gives it straight back, and you are in behind.'],
    [6, 42, 3, 1, 'Stood still', 'You passed and watched. Their left ala is still in front of you.'],
    [13, 33, 2.6, 0, 'Into the crowd', 'You ran toward the pivo, right into their left ala and their fixo.']
  ],
  elsewhere: P(1, 'Not quite', 'Go past their left ala, into the space behind.'),
  best: { kind: 'move', at: [6, 24] } },

{ ch: 3, type: 'ball', me: '9', title: 'Turn when you can', facing: 'back',
  prompt: 'You got the ball with your back to goal, but their fixo stayed off you, out to your right.',
  hint: 'How close is your defender?',
  lesson: "Read your defender. Tight behind you? Lay it off. Standing off you? Turn and go at goal.",
  us:   { 1:[25,93], 4:[25,50], 11:[6,34], 9:[23,27], 7:[44,32] },
  them: { 1:[25,3], 9:[26,42], 7:[10,30], 11:[39,28], 4:[30,20] },
  ball: '9',
  pass: {
    4:  TOO_SAFE('Back to the fixo, when their fixo had given you room to turn?'),
    11: P(1, 'Not the best', 'Safe, but you had room to turn yourself.'),
    7:  P(1, 'Marked', 'Their right ala is on your right ala.')
  },
  carry: [
    [17, 21, 4.9, 3, 'Pro choice', 'Their fixo stood off you on the right, so you turned the other way and got your shot away.'],
    [29, 22, 3, 0, 'Into their fixo', 'You turned right into their fixo.']
  ],
  shoot: P(1, 'Back to goal', 'Turn first. You can’t aim with your back to the goal.'),
  elsewhere: P(1, 'Not quite', 'You have room. Turn away from their fixo.'),
  best: { kind: 'carry', at: [17, 21] } },

{ ch: 3, type: 'ball', me: '9', title: 'Set up the fixo', facing: 'back',
  prompt: 'You have it with your back to goal. Their defenders all closed in on you and the alas. Your fixo is running up behind you, unmarked.',
  hint: 'Who is free, and facing the goal?',
  lesson: 'When they collapse on the pivo, the fixo arriving from behind is free. Lay it back for the first-time shot.',
  us:   { 1:[25,93], 4:[31,35], 11:[7,24], 9:[25,18], 7:[43,24] },
  them: { 1:[25,3], 9:[25,45], 7:[11,21], 11:[39,21], 4:[25,13.5] },
  ball: '9',
  arrows: [{ team: 'us', from: [31, 43], to: [31, 37] }],
  pass: {
    4:  P(3, 'Pro choice', 'They all closed in on you and the alas, so you laid it back to your fixo, arriving facing the goal for a first-time shot.'),
    11: P(1, 'Marked', 'Their left ala is right on your left ala.'),
    7:  P(1, 'Marked', 'Their right ala is right on your right ala.')
  },
  lead: [[30, 29, 4.2, 3, 'Pro choice', 'They all closed in on you and the alas, so you laid it into the path of your fixo for a first-time shot.', '4']],
  carry: [[25, 14, 3.5, 0, 'Into their fixo', 'You turned straight into their fixo.']],
  shoot: P(0, 'Back to goal', "You can't shoot with your back to goal and their fixo behind you."),
  elsewhere: P(1, 'Not quite', 'Lay it back to the player arriving behind you.'),
  best: { kind: 'pass', to: '4' } },

{ ch: 3, type: 'move', me: '9', title: 'Show for it',
  prompt: 'Your fixo has the ball and wants to play it into you. Their pivo is standing right between you and your fixo. Drag the pivo.',
  hint: 'Can your fixo see you?',
  lesson: "A pivo nobody can pass to is no use. Get out from behind their midfielder so there's a clear line.",
  us:   { 1:[25,93], 4:[25,57], 11:[6,40], 9:[25,27], 7:[44,40] },
  them: { 1:[25,3], 9:[25,43], 7:[12,33], 11:[38,33], 4:[25,21] },
  ball: { team: 'us', n: '4' },
  zones: [
    [17.5, 26, 3, 3, 'Pro spot', 'You slid out from behind their pivo. Your fixo has a clear line into you, and their fixo has to decide whether to follow.'],
    [32.5, 26, 3, 3, 'Pro spot', 'You slid out from behind their pivo. Your fixo has a clear line into you, and their fixo has to decide whether to follow.'],
    [25, 27, 3, 1, 'Hidden', 'Their pivo is right in the line between you and your fixo.'],
    [25, 49, 2.6, 0, 'Too deep', 'You came all the way back, right next to their pivo. Now nobody is up front.']
  ],
  elsewhere: P(1, 'Not quite', 'Step sideways, out from behind their pivo.'),
  best: { kind: 'move', at: [17.5, 26] } },

/* ---------------- 5. Create the shot ---------------- */
{ ch: 4, type: 'ball', me: '9', title: 'Shoot early',
  prompt: 'You turned at the edge of their area and can see the goal. Their fixo is coming across to block.',
  hint: 'In futsal the goal is small, and blocks come fast.',
  lesson: 'In futsal, take the shot early. A quick toe-poke beats the block and catches the keeper before they are set.',
  us:   { 1:[25,93], 4:[25,47], 11:[6,30], 9:[19,20], 7:[43,26] },
  them: { 1:[25,3], 9:[25,38], 7:[10,26], 11:[37,23], 4:[26,14] },
  ball: '9',
  arrows: [{ team: 'them', from: [29, 12], to: [26.5, 13.6] }],
  pass: {
    11: P(1, 'Not the best', 'Your left ala is further from goal than you. You had the shot.'),
    4:  TOO_SAFE('Back to the fixo, with a clear look at goal?'),
    7:  P(0, 'Intercepted', 'Across the front of their goal, past their fixo.', { cut: '4' })
  },
  carry: [[21, 15, 3, 1, 'One touch too many', 'You took another touch, and their fixo got there to block it.']],
  shoot: P(3, 'Pro choice', 'You could see the goal, so you hit it early, before their fixo could block it.'),
  elsewhere: P(1, 'Not quite', 'Shoot now, before the block.'),
  best: { kind: 'shoot' } },

{ ch: 4, type: 'ball', me: '11', title: 'The cut-back',
  prompt: "You got to their end line. Their keeper and their fixo are guarding the near post. Your fixo is running in toward the penalty mark.",
  hint: 'Where is nobody looking?',
  lesson: 'At the end line, pull it back. Defenders run toward their own goal, so the space opens up behind them.',
  us:   { 1:[25,93], 4:[27,30], 11:[9,5], 9:[24,11], 7:[38,9] },
  them: { 1:[22,3], 9:[30,36], 7:[12.5,13], 11:[39,14], 4:[21.5,8.5] },
  ball: '11',
  arrows: [{ team: 'us', from: [27, 32], to: [26, 26] }],
  pass: {
    9:  P(1, 'Marked', 'Their fixo is right on your pivo at the near post.'),
    7:  P(0, 'Intercepted', 'Across the goal, right past their keeper and their fixo.', { cut: '4' }),
    4:  P(2, 'Good', "Right player, but your fixo is running in. Put it into the space the fixo is running into.")
  },
  lead: [[25, 17, 3.5, 3, 'Pro choice', 'Their keeper and their fixo were at the near post, so you pulled it back into the space your fixo was running into. First-time shot.', '4']],
  shoot: P(0, 'No angle', 'From the end line, their keeper covers the whole near post.'),
  elsewhere: P(1, 'Not quite', 'Pull it back to the runner.'),
  best: { kind: 'pass', to: '4', at: [25, 17] } },

{ ch: 4, type: 'ball', me: '11', title: 'Make it two against one',
  prompt: 'Your fixo is overlapping on the outside. Their left ala just stepped toward you.',
  hint: 'Their left ala chose you. So who is free?',
  lesson: 'Two against one: watch the defender. If they come to you, pass. If they go with the runner, go yourself.',
  us:   { 1:[25,93], 4:[5,36], 11:[11,31], 9:[23,13], 7:[44,28] },
  them: { 1:[25,3], 9:[26,40], 7:[13,26], 11:[38,22], 4:[22,8] },
  ball: '11',
  arrows: [{ team: 'us', from: [6, 42], to: [4.5, 37] }, { team: 'them', from: [14, 22], to: [13.3, 24.8] }],
  pass: {
    4:  P(2, 'Good', 'Right idea, but your fixo is running. Put it in front of the fixo, down the line.'),
    9:  P(1, 'Marked', 'Their fixo is right on your pivo.'),
    7:  P(0, 'Intercepted', 'A long ball across the whole court.', { cut: '9' })
  },
  lead: [[5, 20, 4, 3, 'Pro choice', 'Their left ala stepped to you, so you slipped it down the line for your fixo. Two against one, and the fixo is in behind.', '4']],
  carry: [[13, 24, 3, 0, 'Into their left ala', 'Their left ala was waiting for exactly that.']],
  shoot: P(0, 'Too far', 'Way too far, with their left ala right in front of you.'),
  elsewhere: P(1, 'Not quite', 'Their left ala came to you. Find the runner.'),
  best: { kind: 'pass', to: '4', at: [5, 20] } },

{ ch: 4, type: 'move', me: '4', title: 'Arrive late',
  prompt: 'Your left ala is at the end line on the left. Your pivo is at the near post and your right ala at the far post. Drag the fixo.',
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
  prompt: 'You are through on goal. Their keeper is rushing out at you, and your pivo is running alongside you.',
  hint: 'Who has the easier finish?',
  lesson: 'Two against the keeper: make the keeper commit, then square it for the tap-in.',
  us:   { 1:[25,93], 4:[25,55], 11:[8,40], 9:[18,15], 7:[31,15] },
  them: { 1:[28,8], 9:[24,32], 7:[12,34], 11:[37,30], 4:[30,28] },
  ball: '7',
  arrows: [{ team: 'them', from: [26, 4], to: [27.5, 7] }],
  pass: {
    9:  P(3, 'Pro choice', 'Their keeper came out at you, so you squared it to your pivo. Open goal.'),
    4:  TOO_SAFE('Back, when you were through on goal?')
  },
  lead: [[18.6, 9.4, 4.2, 3, 'Pro choice', "Their keeper came out at you, so you rolled it across in front of your pivo. Open goal.", '9']],
  carry: [[30, 10, 3, 1, 'Into the keeper', 'Their keeper smothers it.']],
  shoot: P(1, 'Risky', 'The keeper is rushing out and covers most of the goal. Your pivo had an open net.'),
  elsewhere: P(1, 'Not quite', 'Your pivo is free. Use it.'),
  best: { kind: 'pass', to: '9' } },

/* ---------------- 6. Counters and routines ---------------- */
{ ch: 5, type: 'ball', me: '11', title: 'Two against one',
  prompt: 'Counterattack! Only their fixo is back, and your pivo is with you. Their fixo just stepped toward you.',
  hint: 'Their fixo chose you.',
  lesson: 'On a two-against-one, draw the defender, then pass. The defender can only stop one of you.',
  us:   { 1:[25,93], 4:[24,64], 11:[16,40], 9:[33,38], 7:[42,58] },
  them: { 1:[25,3], 9:[24,58], 7:[12,56], 11:[38,64], 4:[21,32] },
  ball: '11',
  arrows: [{ team: 'them', from: [23, 26], to: [21.5, 30.5] }],
  pass: {
    9:  P(2, 'Good', 'Right player, but the pivo is running. Put it in front of the pivo.'),
    4:  P(0, 'Intercepted', 'Back toward your fixo, right into their pivo chasing back.', { cut: '9' }),
    7:  TOO_SAFE('Back to the right ala, with two of you against one?')
  },
  lead: [[33, 26, 4, 3, 'Pro choice', 'Their fixo stepped to you, so you slipped it into the space ahead of your pivo. The pivo is through.', '9']],
  carry: [[20, 31, 3, 0, 'Into their fixo', 'You ran straight into the only defender.'], [10, 28, 3, 1, 'Too wide', 'Their fixo shows you wide, away from goal.']],
  shoot: P(0, 'Too far', 'Way too far, with two of you against one.'),
  elsewhere: P(1, 'Not quite', 'Their fixo came to you. Find your pivo.'),
  best: { kind: 'pass', to: '9', at: [33, 26] } },

{ ch: 5, type: 'move', me: '7', title: 'Three against two',
  prompt: 'Counterattack! Your left ala is dribbling up the middle, your pivo is on the left, and two of theirs are back. Drag the right ala.',
  hint: 'How do three beat two?',
  lesson: 'On a three-against-two, stay wide. Stretch their last two defenders until one of us is free.',
  us:   { 1:[25,93], 4:[25,70], 11:[25,42], 9:[10,36], 7:[33,48] },
  them: { 1:[25,3], 9:[22,62], 7:[12,66], 11:[33,32], 4:[21,28] },
  ball: { team: 'us', n: '11' },
  zones: [
    [44.7, 30.7, 4.7, 3, 'Pro spot', 'You ran wide and forward. Now their two defenders have three of you to cover, and one of us is free.'],
    [30, 40, 2.6, 1, 'Too close', 'Right next to your left ala, one defender can cover you both.'],
    [33, 48, 3, 1, 'Too deep', 'Behind the ball you are no help to the counter.']
  ],
  elsewhere: P(1, 'Not quite', 'Stay wide, and get forward.'),
  best: { kind: 'move', at: [44.7, 30.7] } },

{ ch: 5, type: 'ball', me: '7', kind: 'Kick-in', title: 'Kick-in for the fixo', noCarry: true, restart: 'kickin',
  prompt: 'Kick-in to us on the right, near their area. Their players mark your pivo and left ala. Your fixo is running up from behind.',
  hint: 'Who is free, and arriving facing the goal?',
  lesson: 'On a kick-in, the late runner from behind is usually free. Play it into the run for a first-time shot.',
  us:   { 1:[25,93], 4:[34,40], 11:[8,18], 9:[26,13], 7:[51.8,24.5] },
  them: { 1:[25,3], 9:[20,32], 7:[11,14], 11:[40,13], 4:[25,8] },
  ball: '7', ballAt: [50, 22],
  arrows: [{ team: 'us', from: [34, 42], to: [32.5, 36] }],
  pass: {
    9:  P(1, 'Marked', 'Their fixo is right on your pivo.'),
    11: P(0, 'Intercepted', 'A kick-in across the whole area. Their fixo or keeper gets it.', { cut: '4' }),
    4:  P(2, 'Good', 'Right player, but your fixo is running in. Put it into the run.')
  },
  lead: [[30, 28, 3.5, 3, 'Pro choice', 'Their players marked the pivo and the left ala, so you played it into your fixo, arriving from behind for a first-time shot.', '4']],
  shoot: null,
  elsewhere: P(1, 'Not quite', 'Find the runner arriving from behind.'),
  best: { kind: 'pass', to: '4', at: [30, 28] } },

{ ch: 5, type: 'ball', me: '11', kind: 'Corner kick', title: 'Corner to the far post', noCarry: true, restart: 'corner', air: true,
  prompt: 'Corner kick to us from the left. Their keeper and their fixo crowd the near post. Your right ala is sneaking to the far post.',
  hint: 'Where is nobody looking?',
  lesson: 'Defenders crowd the near post on a corner. A ball across to the far post finds the runner nobody followed.',
  us:   { 1:[25,93], 4:[24,26], 11:[-1.8,-1.6], 9:[19,9], 7:[38,12] },
  them: { 1:[23,3.5], 9:[25,20], 7:[12,8], 11:[37,20], 4:[20,13] },
  ball: '11', ballAt: CORNER_L,
  arrows: [{ team: 'us', from: [39, 15], to: [35, 8] }],
  pass: {
    9:  P(1, 'Marked', 'Their fixo and keeper are right on your pivo at the near post.'),
    4:  P(1, 'Marked', 'Their pivo is right on your fixo at the top of the area.'),
    7:  P(2, 'Good', 'Right player, but the right ala is moving. Put it at the far post, in front of the run.')
  },
  lead: [[31, 5, 3, 3, 'Pro choice', 'Their defenders crowded the near post, so you whipped it across to the far post, right into your right ala’s run.', '7']],
  shoot: null,
  elsewhere: P(1, 'Not quite', 'Find the far post run.'),
  best: { kind: 'pass', to: '7', at: [31, 5] } },

{ ch: 5, type: 'ball', me: '4', title: 'Power play',
  prompt: 'Your keeper came up to be the fifth attacker: five of us against four. Their pivo and their left ala are on you and your left ala.',
  hint: 'Five against four means one of us is always free.',
  lesson: 'In a power play, move the ball fast across the top. The free player is always on the far side.',
  us:   { 1:[33,38], 4:[14,36], 11:[5,20], 9:[25,13], 7:[45,20] },
  them: { 1:[25,3], 9:[20,32], 7:[11,24], 11:[37,25], 4:[25,8.5] },
  ball: '4',
  pass: {
    1:  P(3, 'Pro choice', 'Their pivo and left ala were on you and your left ala, so you moved it across to your keeper at the top. Now their right ala has to choose between the keeper and your right ala.'),
    11: P(1, 'Marked', 'Their left ala is right on your left ala.'),
    9:  P(0, 'Intercepted', 'Through the middle of their diamond.', { cut: '9' }),
    7:  P(0, 'Intercepted', 'A long ball right across their pivo.', { cut: '9' })
  },
  carry: [[18, 30, 3, 0, 'Into their pivo', 'Their pivo is right there.']],
  shoot: P(0, 'Blocked', 'Through their whole diamond? It hits a defender.'),
  elsewhere: P(1, 'Not quite', 'Move it across the top, to the free player.'),
  best: { kind: 'pass', to: '1' } },
/* ---------------- 7. Kick-ins ---------------- */
{ ch: 6, type: 'ball', me: '7', kind: 'Kick-in', title: 'Short for the fixo', noCarry: true, restart: 'kickin',
  prompt: 'Kick-in to us on the right, next to their area. Their players have to stand 5 m away. Your pivo and left ala are marked, and your fixo is open just inside you.',
  hint: 'How far away do their players have to stand?',
  lesson: "On a kick-in, their players stand 5 m back. Roll it very short into your fixo's stride, and the fixo shoots before anyone can close.",
  us:   { 1:[25,93], 4:[36,31], 11:[14,16], 9:[29,10], 7:[51.8,26.5] },
  them: { 1:[25,2.5], 9:[27,42], 7:[17,12], 11:[40,13], 4:[29,6.3] },
  ball: '7', ballAt: [50, 24],
  pass: {
    4:  P(2, 'Good', "Right player, but roll it in front of your fixo, into the stride. Then the shot is first time, before their right ala closes."),
    9:  P(1, 'Marked', 'Their fixo is right on your pivo, and their keeper is close.'),
    11: P(1, 'Marked', 'A long kick-in across their whole area, and their left ala is right on your left ala.')
  },
  lead: [[43.5, 27, 3.5, 3, 'Pro choice', "Their players had to stand 5 m away, so you rolled it very short into your fixo's stride. The fixo steps onto it and shoots first time, before anyone can close.", '4']],
  shoot: null,
  elsewhere: P(1, 'Not quite', 'Their players are 5 m away. Who is open close to you?'),
  best: { kind: 'pass', to: '4', at: [43.5, 27] } },

{ ch: 6, type: 'move', me: '4', kind: 'Kick-in', title: 'Open for the short one', restart: 'kickin',
  prompt: 'Kick-in to us on the left, next to their area. Your left ala will take it, and their players have to stand 5 m away. Drag the fixo.',
  hint: 'Where can you shoot from after one short pass?',
  lesson: 'On a kick-in near their goal, the fixo steps up: a few steps from the taker, inside, facing goal. One short pass, one shot.',
  us:   { 1:[25,93], 4:[24,48], 11:[-1.8,26.5], 9:[24,10], 7:[38,16] },
  them: { 1:[25,2.5], 9:[26,38], 7:[10,14], 11:[35,12.5], 4:[22.5,6.5] },
  ball: { team: 'us', n: '11' }, ballAt: [0, 24],
  zones: [
    [9, 30, 4, 3, 'Pro spot', 'You stepped up a few steps from the taker, inside and facing goal, with nobody near you. One short pass, and you shoot.'],
    [24, 48, 3, 1, 'Too deep', 'From there the pass is long, and their pivo closes you before you can shoot.'],
    [4, 21, 2.6, 1, 'Too close', 'Right next to the taker on the line, you have no angle to shoot.'],
    [16, 16, 2.6, 0, 'Into the crowd', 'Toward the goal you run into their left ala and fixo, and the shot is gone.']
  ],
  elsewhere: P(1, 'Not quite', 'Step up close to the taker, inside, where you can shoot.'),
  best: { kind: 'move', at: [9, 30] } },

{ ch: 6, type: 'move', me: '9', kind: 'Kick-in', title: 'Set a screen', restart: 'kickin', noPayoff: true,
  prompt: 'Kick-in to us on the right. Your left ala wants to run across toward the ball, but their left ala is tight on the ala. Drag the pivo.',
  hint: "Can you get in their left ala's way?",
  lesson: 'Set a screen: stand still right next to the defender, on the side your teammate runs past. The defender runs into you, and your teammate is free.',
  us:   { 1:[25,93], 4:[32,42], 11:[15,25], 9:[27,10], 7:[51.8,24.5] },
  them: { 1:[25,2.5], 9:[31,37], 7:[18.5,21.5], 11:[38,14], 4:[27.5,6] },
  ball: { team: 'us', n: '7' }, ballAt: [50, 22],
  zones: [
    [21, 25, 3, 3, 'Pro spot', 'You stood right next to their left ala, on the side your left ala runs past. Their left ala runs into you, and your left ala is free for the kick-in. That is a screen.'],
    [27, 10, 3, 1, 'Stayed at the post', "Nobody got in their left ala's way, so the ala follows your left ala everywhere."],
    [12, 28, 2.6, 1, 'Wrong side', "You got in your own left ala's way, not their left ala's."]
  ],
  elsewhere: P(1, 'Not quite', 'Stand right next to their left ala, in the way of the chase.'),
  best: { kind: 'move', at: [21, 25] } },

{ ch: 6, type: 'ball', me: '11', kind: 'Kick-in', title: 'Over the press', noCarry: true, restart: 'kickin', air: true,
  prompt: 'Kick-in to us in our half. They press man to man, so everyone is marked, and the space behind them is empty. Your pivo is about to spin.',
  hint: 'Where is the space when everyone is marked?',
  lesson: 'When they press everyone man to man, the space is behind them. Lift it over the press into the run.',
  us:   { 1:[25,93], 4:[13,72], 11:[-1.8,64.5], 9:[12,51], 7:[32,58] },
  them: { 1:[25,3], 9:[15.5,67], 7:[12.5,57], 11:[30,53.5], 4:[14.5,47] },
  ball: '11', ballAt: [0, 62],
  arrows: [{ team: 'us', from: [12, 49], to: [9.5, 43] }],
  pass: {
    4:  P(1, 'Risky', 'Their pivo is right on your fixo, in front of our goal. Lose it there and they score.'),
    9:  P(1, 'Marked', 'Their fixo is tight on your pivo, who would have to turn with the ball.'),
    7:  P(1, 'Marked', 'Their right ala is on your right ala, and the pass goes right across our half.'),
    1:  TOO_SAFE('Back to the keeper. Safe, but their press comes again, and the space is behind them.')
  },
  lead: [[8, 38, 5, 3, 'Pro choice', 'They pressed everyone man to man, so you lifted the kick-in over the press for your pivo to spin onto. Their whole press is beaten.', '9']],
  shoot: null,
  elsewhere: P(1, 'Not quite', 'Everyone is marked. The space is behind them.'),
  best: { kind: 'pass', to: '9', at: [8, 38] } },

{ ch: 6, type: 'move', me: '7', kind: 'Kick-in', title: 'Step back in',
  prompt: 'You took the kick-in short to your fixo, and their right ala is closing the fixo down. Nobody is watching you. Drag the right ala.',
  hint: 'Who forgets about the kick-in taker?',
  lesson: "After a short kick-in, step straight back on and go. Defenders forget the taker, and one pass puts you in behind.",
  us:   { 1:[25,93], 4:[42,27], 11:[15,17], 9:[29,10], 7:[51.8,24.5] },
  them: { 1:[25,2.5], 9:[33,40], 7:[18,13], 11:[40,21.5], 4:[28,6.3] },
  ball: { team: 'us', n: '4' },
  zones: [
    [45, 14, 4, 3, 'Pro spot', "Their right ala went to your fixo and forgot about you, so you stepped straight back in behind. Your fixo gives it back, and you're in behind."],
    [51.8, 24.5, 3, 1, 'Stayed off', 'You stayed off the court, so your fixo has nobody close to play with.'],
    [44, 31, 2.6, 1, 'Too close', 'Right next to your fixo, their right ala closes you both down.']
  ],
  elsewhere: P(1, 'Not quite', 'Step back on, in behind their right ala.'),
  best: { kind: 'move', at: [45, 14] } },

/* ---------------- 8. Free kicks ---------------- */
{ ch: 7, type: 'ball', me: '11', kind: 'Free kick', title: 'Roll it to the side', noCarry: true, restart: 'freekick',
  prompt: 'Free kick to us at the edge of their area, on the left. Their wall of two blocks the shot from here. Your fixo is behind the ball, ready to run in.',
  hint: 'Can you change the angle?',
  lesson: "A wall only blocks one angle. Roll the free kick square, and the shot comes from where the wall isn't.",
  us:   { 1:[25,93], 4:[31,33], 11:[10,24.8], 9:[33,10], 7:[41,20] },
  them: { 1:[26,3], 9:[16.2,9.9], 7:[20.6,12.5], 11:[37.5,16.5], 4:[31.5,6.5] },
  ball: '11', ballAt: [12, 22],
  pass: {
    4:  P(2, 'Good', "Right player, but roll it into the fixo's run, so the shot is first time."),
    9:  P(1, 'Marked', 'Their fixo is right on your pivo, behind the wall.'),
    7:  P(1, 'Marked', 'Their right ala is on your right ala, and the pass goes across the whole area.')
  },
  lead: [[25, 25, 4, 3, 'Pro choice', "Their wall blocked the shot from where the ball was, so you rolled it square into your fixo's run. From there the wall isn't in the way.", '4']],
  shoot: P(0, 'Into the wall', 'From here their wall is right in the way. The shot hits the wall.'),
  elsewhere: P(1, 'Not quite', 'Change the angle, so the wall is not in the way.'),
  best: { kind: 'pass', to: '4', at: [25, 25] } },

{ ch: 7, type: 'ball', me: '4', kind: 'Free kick', title: 'Take it quick', noCarry: true, restart: 'freekick', quick: true,
  prompt: 'Free kick to us in our half. Three of theirs are still jogging back, and your right ala is free up the right.',
  hint: 'Are they ready yet?',
  lesson: "A free kick when they aren't set is a chance. Take it quickly, before they get organized.",
  us:   { 1:[25,93], 4:[30,64.8], 11:[12,48], 9:[25,24], 7:[44,44] },
  them: { 1:[25,3], 9:[23,55], 7:[15,52], 11:[38,57], 4:[24,29] },
  ball: '4', ballAt: [30, 62],
  pass: {
    7:  P(2, 'Good', 'Right player, but put it ahead of your right ala, who is facing forward with space.'),
    11: P(0, 'Intercepted', 'Their left ala is right in that lane.', { cut: '7' }),
    9:  P(1, 'Marked', "Their fixo is tight on your pivo, and it's a long way."),
    1:  TOO_SAFE('Back to the keeper gives them time to get back and set up.')
  },
  lead: [[45, 35, 5, 3, 'Pro choice', "They were still getting back, so you took it quickly into the space ahead of your right ala, who runs at their goal before they're set.", '7']],
  shoot: null,
  elsewhere: P(1, 'Not quite', "They aren't set yet. Find the free player, quickly."),
  best: { kind: 'pass', to: '7', at: [45, 35] } },

{ ch: 7, type: 'ball', me: '7', kind: 'Free kick', title: 'Across the face', noCarry: true, restart: 'freekick',
  prompt: 'Free kick to us on the right, close to their goal. Their wall of two and the keeper cover the near post. Your left ala is sneaking in at the far post.',
  hint: 'Where is nobody looking?',
  lesson: 'On a free kick from the side, the wall and keeper guard the near post. A low ball across the face of the goal finds the far post.',
  us:   { 1:[25,93], 4:[30,36], 11:[13,19], 9:[27,19], 7:[42,18.2] },
  them: { 1:[27,2.5], 9:[30.7,7.3], 7:[10,14], 11:[34.9,4.3], 4:[27,15] },
  ball: '7', ballAt: [40, 16],
  arrows: [{ team: 'us', from: [13.5, 18], to: [17, 12] }],
  pass: {
    11: P(2, 'Good', 'Right player, but the left ala is running to the far post. Put it in front of the run.'),
    9:  P(1, 'Marked', 'Their fixo is right on your pivo.'),
    4:  TOO_SAFE('Back to the fixo. Safe, but the far post was wide open.')
  },
  lead: [[21, 5, 3.5, 3, 'Pro choice', 'Their wall and keeper covered the near post, so you rolled it across the face of the goal. Your left ala slides in at the far post.', '11']],
  shoot: P(1, 'Blocked', 'Their wall and keeper cover the near post. That shot hits the wall.'),
  elsewhere: P(1, 'Not quite', 'Find the runner at the far post.'),
  best: { kind: 'pass', to: '11', at: [21, 5] } },

{ ch: 7, type: 'move', me: '4', kind: 'Free kick', title: 'Find the shooting lane', restart: 'freekick',
  prompt: 'Free kick to us on the right of their area. Your right ala will roll it to you, and their wall of two blocks the straight shot. Drag the fixo.',
  hint: 'Where is the wall not in the way?',
  lesson: "On a free kick, find the spot the wall doesn't cover: square of the ball, at the top of the area. That's where the shot is.",
  us:   { 1:[25,93], 4:[30,45], 11:[10,24], 9:[16,12], 7:[38,26.2] },
  them: { 1:[26,3], 9:[28.4,13.7], 7:[13,20.5], 11:[33.2,11.5], 4:[17.5,8.5] },
  ball: { team: 'us', n: '7' }, ballAt: [36, 24],
  zones: [
    [24, 28, 4, 3, 'Pro spot', "You stood square of the ball, at the top of the area, where the wall doesn't cover. The pass comes to you, and the shot is clear."],
    [30, 45, 3, 1, 'Too deep', 'From back there the shot is long, and the wall has time to shift across.'],
    [33, 30, 2.6, 1, 'Same angle', 'Right behind the ball, the wall is still between you and the goal.'],
    [27, 19, 2.6, 0, 'Too close to the wall', "Right next to the wall, there's no room to shoot."]
  ],
  elsewhere: P(1, 'Not quite', "Find the spot the wall doesn't cover."),
  best: { kind: 'move', at: [24, 28] } },

{ ch: 7, type: 'move', me: '9', kind: 'Free kick', title: 'Spin behind your marker', restart: 'freekick',
  prompt: 'Free kick to us out on the right. Their fixo is behind your pivo, but watching the ball, not you. Drag the pivo.',
  hint: 'What is their fixo looking at?',
  lesson: 'When your marker watches the ball, spin in behind. The free kick goes into the space, and you are through on goal.',
  us:   { 1:[25,93], 4:[28,40], 11:[12,22], 9:[28,18], 7:[47.5,32.5] },
  them: { 1:[26,2.5], 9:[29,35.5], 7:[15,18.5], 11:[40,16], 4:[28.5,14] },
  ball: { team: 'us', n: '7' }, ballAt: [46, 30],
  zones: [
    [30.5, 7.5, 3.5, 3, 'Pro spot', 'Their fixo was watching the ball, so you spun in behind. The free kick goes into the space, and you are through on goal.'],
    [28, 18, 3, 1, 'Stayed in front', 'You stayed in front of their fixo, who steps in and wins it.'],
    [36, 26, 2.6, 1, 'Came short', 'Coming short brings their fixo with you, and the space behind is gone.']
  ],
  elsewhere: P(1, 'Not quite', 'Spin in behind their fixo, into the space by the goal.'),
  best: { kind: 'move', at: [30.5, 7.5] } }

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
          tag: { 'us:7': GOOD('FREE') }, head: 'You catch their shot', sub: 'Their press is all on our left side. Your right ala is alone on the right.', cam: C([25, 74], 1.3) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      lead0: [{ t: 1.2, us: { 7: [42, 48] }, them: { 11: [35, 60] }, tag: { 'us:7': GOOD('FACING FORWARD') }, head: 'Throw to the free side',
        sub: 'Their press was all on our left, so you threw it into the space ahead of your right ala, who runs at them with the whole right side open.', cam: C([38, 56], 1.3), wait: 1.2 }],
      7: [{ t: 1.1, us: { 7: [43, 59] }, face: { 'us:7': 'up' }, tag: { 'us:7': GOOD('FACING FORWARD') }, head: 'Throw to the free side',
        sub: 'Their press was all on our left, so you threw it to the right ala on the free side. The right ala turns and runs.', cam: C([40, 62], 1.35), wait: 1.2 }],
      4: steal('4', '9', [21.5, 78.5], 'Pressed', 'Their pivo jumps on your fixo, right in front of our goal.'),
      11: steal('11', '7', [7, 69.5], 'Marked', 'Their left ala is tight on your left ala, on the crowded side.'),
      9: steal('9', '4', [26, 47.5], 'Risky', 'A long throw to the pivo with their fixo right behind. The right ala was free and closer.')
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
      carry1: [{ t: .9, them: { 9: [12.5, 53] }, tag: { 'them:9': 'MARKS BOTH' }, head: 'Wrong way', sub: 'You carried it toward your left ala, so their pivo can mark you both.', cam: C([11, 54], 1.55), wait: 1.2 }],
      carry2: [{ t: .9, them: { 11: [37.5, 53] }, tag: { 'them:11': 'MARKS BOTH' }, head: 'Wrong way', sub: 'You carried it toward your right ala, so their right ala can mark you both.', cam: C([39, 54], 1.55), wait: 1.2 }],
      11: [{ t: .9, them: { 9: [9.5, 49] }, tag: { 'them:9': 'PRESS' }, head: 'They slide across', sub: 'Their pivo slid over while the ball travelled. Pull their pivo in first.', cam: C([9, 50], 1.55), wait: 1.2 }],
      7: [{ t: .9, them: { 11: [40.5, 49] }, tag: { 'them:11': 'PRESS' }, head: 'They slide across', sub: 'Their right ala slid over while the ball travelled. Pull their right ala in first.', cam: C([41, 50], 1.55), wait: 1.2 }],
      9: steal('9', '4', [25, 25.5], 'Marked', 'Their fixo is tight behind your pivo.'),
      1: say('Too safe', 'Back to the keeper, when nobody was pressing you?', C([25, 80], 1.35))
    } },

  'The third man': {
    intro: { start: { ball: 'us:1', us: { 4: [22, 70], 9: [23, 30], 11: [7, 52], 7: [44, 50] }, them: { 4: [23, 25], 11: [38, 58], 9: [26, 62], 7: [10, 47] } },
      cam: C([24, 66], 1.4),
      steps: [
        { t: 1.6, pass: 'us:4', pd: .1, us: { 4: [22, 62], 9: [23, 41], 11: [6, 48], 7: [45, 46] }, them: { 4: [23, 35], 11: [35, 53], 9: [26, 57], 7: [9, 43] },
          tag: { 'them:11': 'IN THE LANE' }, head: 'Your pivo drops short', sub: 'Their right ala blocks the pass to your right ala, and your left ala is marked.', cam: C([28, 52], 1.3) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      9: [{ t: 1.1, pass: 'us:7', pd: .15, us: { 7: [44, 39] }, face: { 'us:7': 'up' }, tag: { 'us:7': GOOD('THE THIRD MAN'), 'them:11': 'BYPASSED' }, head: 'The third man',
        sub: 'Their right ala blocked the pass to your right ala, so you played it into the pivo, who laid it out first time. The right ala arrives facing forward.', cam: C([38, 44], 1.35), wait: 1.2 }],
      11: steal('11', '7', [8, 45.5], 'Marked', 'Their left ala is tight on your left ala.'),
      1: say('Too safe', 'Back to the keeper, when the pivo had come short for it.', C([25, 80], 1.35))
    } },

  'Down the line': {
    intro: { start: { ball: 'us:11', us: { 11: [6, 55], 9: [17, 36] }, them: { 7: [14, 40], 9: [20, 52], 4: [23, 29] } },
      cam: C([12, 48], 1.45),
      steps: [
        { t: 1.5, us: { 11: [5, 50], 9: [13, 30] }, them: { 7: [10.5, 46], 9: [15, 56], 4: [21, 24] }, tag: { 'them:7': 'PRESS' },
          head: 'Their left ala presses you from the inside', sub: 'Their pivo sits in the pass back to your fixo, and your pivo is running down the line.', cam: C([12, 44], 1.4) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      lead0: [{ t: 1.1, us: { 9: [12, 13] }, them: { 4: [17, 17] }, tag: { 'us:9': GOOD('IN BEHIND') }, head: 'Down the line',
          sub: 'Their left ala pressed from the inside, so you went down the line. One pass, and the press is beaten…', cam: C([13, 20], 1.45) },
        { t: .5, shot: [27.5, -1], head: 'Down the line', sub: '…and your pivo is in on goal.', wait: 1.1 }],
      9: steal('9', '4', [15.5, 27.5], 'Behind the run', 'The pivo had to stop for it, and their fixo got there. Put it into the space ahead of the run.'),
      carry0: steal('11', '7', [8.5, 44.5], 'Trapped', 'Their left ala is right there, and the sideline is behind you.')
    } },

  'Get an angle': {
    intro: { start: { ball: 'us:1', us: { 4: [24, 72], 11: [8, 66], 7: [42, 66] }, them: { 9: [30, 72], 7: [12, 60], 11: [38, 60] } },
      cam: C([25, 76], 1.5),
      steps: [
        { t: 1.5, us: { 4: [25, 69], 11: [6, 70], 7: [44, 70] }, them: { 9: [25, 77], 7: [10, 64], 11: [40, 64] }, marks: [{ s: ['them:9', 'us:1'], len: 12 }],
          head: 'Your keeper has the ball', sub: 'Their pivo steps right into the line between you and the keeper.', cam: C([25, 78], 1.45), wait: .4 },
        { t: 1, cam: W_, head: '', marks: [] }] },
    after: {
      zone0: [{ t: 1, us: { 4: [15, 73] }, tag: { 'us:4': GOOD('OPEN') }, head: 'Get an angle', sub: "You stepped out of their pivo's shadow, so your keeper found you. Now you face forward with the ball.",
        cam: C([18, 76], 1.45), wait: 1.2 }],
      zone1: [{ t: 1, us: { 4: [35, 73] }, tag: { 'us:4': GOOD('OPEN') }, head: 'Get an angle', sub: "You stepped out of their pivo's shadow, so your keeper found you. Now you face forward with the ball.",
        cam: C([32, 76], 1.45), wait: 1.2 }],
      zone2: say('Hidden', 'Their pivo is standing right in the line between you and your keeper.', C([25, 80], 1.5), { marks: [{ s: ['them:9', 'us:1'], len: 12 }], wait: 1.4 }),
      zone3: [{ t: .8, them: { 9: [25, 81.5] }, tag: { 'them:9': 'PRESS' }, head: 'Too close', sub: 'Right next to your keeper, their pivo can press you both.', cam: C([25, 87], 1.6, .45), wait: 1.2 }]
    } },

  /* ---- 2. Rotations ---- */
  'Pass and follow': {
    intro: { start: { ball: 'us:4', us: { 4: [21, 54], 11: [7, 42] }, them: { 7: [13, 27], 9: [28, 40] } },
      cam: C([16, 44], 1.45),
      steps: [
        { t: 1.4, pass: 'us:11', pd: .1, us: { 4: [22, 51], 11: [6, 37] }, them: { 7: [10, 31], 9: [26, 44] }, tag: { 'them:7': 'STEPS UP' },
          head: 'You pass to your left ala', sub: 'Their left ala steps up to your left ala. Their pivo is still close to you.', cam: C([14, 40], 1.45) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      zone0: [{ t: 1.1, us: { 4: [8, 15] }, them: { 4: [19, 10], 1: [23, 3.5] }, tag: { 'us:4': GOOD('IN BEHIND'), 'them:7': 'BEATEN' }, head: 'Pass and follow',
          sub: 'Their left ala stayed with your left ala, so the ball came down the line to you. Two against one, and you are in behind…', cam: C([13, 20], 1.45) },
        { t: .8, pass: 'us:9', head: 'Pass and follow', sub: '…so you square it for your pivo.', cam: C([20, 12], 1.5) },
        { t: .5, shot: [27.5, -1], wait: 1.1 }],
      zone1: steal('11', '7', [8.5, 34], 'Stood still', 'You passed and watched. Their left ala only has your left ala to worry about.'),
      zone2: [{ t: .8, them: { 9: [21, 37] }, tag: { 'them:7': 'CROWD', 'them:9': 'CROWD', 'them:4': 'CROWD' }, head: 'Into the crowd',
        sub: 'Their left ala, their pivo and their fixo are all in the middle. That run takes you into traffic.', cam: C([18, 28], 1.4), wait: 1.2 }]
    } },

  'Fill the spot': {
    intro: { start: { ball: 'us:11', us: { 4: [8, 46], 11: [12, 40], 7: [44, 36] }, them: { 7: [14, 34], 9: [28, 50] } },
      cam: C([16, 40], 1.35),
      steps: [
        { t: 1.6, us: { 4: [4, 25], 11: [9, 36], 7: [44, 32] }, them: { 7: [12, 30], 9: [30, 46] }, marks: [{ ring: [25, 54], c: 'gold' }],
          head: 'Your fixo overlaps down the left', sub: 'Nobody is in the fixo spot now, and their pivo is waiting for a counter.', cam: C([22, 42], 1.2), wait: .4 },
        { t: 1, cam: W_, head: '', marks: [] }] },
    after: {
      zone0: [{ t: .6, pass: 'them:7', them: { 7: [11, 32.5] }, tag: { 'them:7': 'TACKLE' }, head: 'Fill the spot', sub: 'If we lose the ball…', cam: C([18, 42], 1.25) },
        { t: 1, pass: 'us:7', pd: .15, us: { 7: [26, 51] }, them: { 9: [31, 47] }, tag: { 'us:7': GOOD('CUT OUT') }, head: 'Fill the spot',
          sub: "…you're between their pivo and our goal, and you cut out the counter. That is a rotation.", wait: 1.2 }],
      zone1: [{ t: .6, pass: 'them:7', them: { 7: [11, 32.5] }, tag: { 'them:7': 'TACKLE' }, head: 'Stayed up', sub: 'We lose the ball…', cam: C([18, 42], 1.25) },
        { t: 1.1, pass: 'them:9', pd: .1, them: { 9: [28, 62] }, tag: { 'them:9': 'THROUGH' }, head: 'Stayed up', sub: '…and four of us were up the field, so their pivo is through on our goal.',
          cam: C([27, 64], 1.3), wait: 1.2 }],
      zone2: [{ t: .6, pass: 'them:7', them: { 7: [11, 32.5] }, tag: { 'them:7': 'TACKLE' }, head: 'Even higher', sub: 'We lose the ball…', cam: C([18, 42], 1.25) },
        { t: 1.1, pass: 'them:9', pd: .1, them: { 9: [28, 62] }, tag: { 'them:9': 'THROUGH' }, head: 'Even higher', sub: '…and nobody was back at all. Their pivo is through on our goal.',
          cam: C([27, 64], 1.3), wait: 1.2 }]
    } },

  'Ala inside, fixo wide': {
    intro: { start: { ball: 'us:11', us: { 11: [7, 38], 4: [25, 56] }, them: { 7: [10, 33], 9: [27, 48] } },
      cam: C([14, 40], 1.4),
      steps: [
        { t: 1.5, us: { 11: [15, 35], 4: [25, 52] }, them: { 7: [17, 30], 9: [27, 44] }, hatch: [{ pts: [[0, 26], [10, 26], [10, 50], [0, 50]], c: 'gold' }],
          head: 'Your left ala dribbles inside', sub: 'Their left ala goes with your left ala, and the whole left side is empty.', cam: C([16, 40], 1.35), wait: .4 },
        { t: 1, cam: W_, head: '', hatch: [] }] },
    after: {
      zone0: [{ t: 1.1, us: { 4: [6, 28] }, tag: { 'us:4': GOOD('WIDE OPEN') }, head: 'Ala inside, fixo wide',
        sub: 'Your left ala went inside, so you opened up wide where the left ala had been. The court stays big, and the pass out to you is easy.', cam: C([10, 32], 1.4), wait: 1.2 }],
      zone1: [{ t: .9, them: { 9: [19, 39] }, tag: { 'them:9': 'PRESS' }, head: 'Stayed in the middle', sub: 'Nobody is wide on the left, so their pivo can squeeze in on your left ala too.',
        cam: C([18, 40], 1.4), wait: 1.2 }],
      zone2: [{ t: .8, them: { 7: [17.5, 35.5] }, tag: { 'them:7': 'MARKS BOTH' }, head: 'Too close', sub: 'Right next to your left ala, one defender can mark you both.', cam: C([18, 37], 1.6), wait: 1.2 }]
    } },

  'Swap with the pivo': {
    intro: { start: { ball: 'us:4', us: { 9: [28, 13], 4: [27, 57], 7: [45, 44] }, them: { 4: [26, 9], 9: [21, 47], 11: [40, 38] } },
      cam: C([30, 22], 1.45),
      steps: [
        { t: 1.6, us: { 9: [39, 24], 4: [28, 52], 7: [45, 40] }, them: { 4: [36, 19], 9: [20, 43], 11: [40, 34] }, tag: { 'them:4': 'FOLLOWS' },
          hatch: [{ pts: [[19, 8], [31, 8], [31, 20], [19, 20]], c: 'gold' }], head: 'Your pivo drops out wide',
          sub: 'Their fixo goes with the pivo. The middle in front of their goal is empty.', cam: C([32, 22], 1.35), wait: .4 },
        { t: 1, cam: W_, head: '', hatch: [] }] },
    after: {
      zone0: [{ t: .6, them: { 1: [26.5, 3.5] }, tag: { 'us:7': GOOD('FREE') }, head: 'Swap with the pivo',
          sub: 'Your pivo pulled their fixo out wide, so you ran into the space the pivo left, right in front of their goal…', cam: C([25, 12], 1.55, .45) },
        { t: .5, shot: [22.3, -1], head: 'Swap with the pivo', sub: '…and finish.', wait: 1.1 }],
      zone1: say('Stayed wide', 'Now two of us are on the right sideline, and the middle is still empty.', C([33, 26], 1.3),
        { hatch: [{ pts: [[19, 8], [31, 8], [31, 20], [19, 20]], c: 'gold' }], wait: 1.4 }),
      zone2: say('Into the crowd', 'Your pivo, their fixo and their right ala are already there.', C([38, 27], 1.5), { tag: { 'them:4': 'CROWD', 'them:11': 'CROWD' } })
    } },

  'Clear the space': {
    intro: { start: { ball: 'us:11', us: { 11: [9, 32], 9: [24, 19], 4: [25, 52] }, them: { 7: [7, 35], 4: [25, 14], 9: [26, 42] } },
      cam: C([16, 24], 1.45),
      steps: [
        { t: 1.5, us: { 11: [16, 24], 9: [21, 15], 4: [25, 48] }, them: { 7: [13, 30], 4: [22.5, 10], 9: [24, 38] }, marks: [{ l: ['us:11', [25, 1]], c: 'bad' }],
          head: 'Your left ala dribbles in to shoot', sub: 'You and their fixo are standing in the way.', cam: C([19, 17], 1.5), wait: .4 },
        { t: 1, cam: W_, head: '', marks: [] }] },
    after: {
      zone0: [{ t: .7, marks: [{ l: ['us:11', [25, 1]], c: 'good' }], tag: { 'us:11': GOOD('CLEAR LOOK') }, head: 'Clear the space',
          sub: 'You cleared out to the far post, and their fixo went with you. Your left ala has a clear look at goal…', cam: C([24, 14], 1.45), wait: .5 },
        { t: .5, shot: [22.3, -1], marks: [], head: 'Clear the space', sub: "…and you're there for the rebound.", wait: 1.1 }],
      zone1: [{ t: .7, marks: [{ l: ['us:11', [25, 1]], c: 'bad' }], head: 'In the way', sub: "You and their fixo are standing in your left ala's shooting lane.", cam: C([20, 14], 1.5), wait: .6 },
        { t: .5, pass: 'them:4', marks: [], tag: { 'them:4': 'BLOCK' }, wait: 1.1 }],
      zone2: [{ t: .8, them: { 4: [19, 17] }, tag: { 'them:4': 'BLOCK' }, head: 'Too close', sub: "You came toward the ball and brought their fixo with you, right into your left ala's path.",
          cam: C([17, 19], 1.55), wait: .5 },
        { t: .5, pass: 'them:4', wait: 1.1 }]
    } },

  /* ---- 3. Switches ---- */
  'Switch it': {
    intro: { start: { ball: 'us:4', us: { 4: [24, 54], 11: [8, 36], 9: [23, 19] }, them: { 9: [21, 42], 11: [32, 27], 7: [12, 30], 4: [24, 12] } },
      cam: C([22, 40], 1.25),
      steps: [
        { t: 1.6, us: { 4: [22, 51], 11: [5, 38], 9: [21, 18] }, them: { 9: [15, 44], 11: [27, 30], 7: [9, 33], 4: [21, 13] }, tag: { 'us:7': GOOD('ALONE') },
          head: 'Their whole team shifts to our left', sub: 'Your left ala just played it back to you. Your right ala is alone on the right.', cam: C([26, 38], 1.15) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      7: [{ t: 1.2, us: { 7: [42, 20] }, them: { 11: [34, 24] }, tag: { 'us:7': GOOD('WHOLE SIDE') }, head: 'Switch it',
          sub: 'Their team shifted to our left, so you switched it. The right ala has the whole right side to attack…', cam: C([38, 24], 1.35) },
        { t: .5, shot: [22.3, -1], head: 'Switch it', sub: '…and gets the shot away before they get back.', wait: 1.1 }],
      lead0: [{ t: 1.1, us: { 7: [42, 18] }, them: { 11: [34, 24] }, tag: { 'us:7': GOOD('WHOLE SIDE') }, head: 'Switch it',
          sub: 'Their team shifted to our left, so you switched it ahead of your right ala, with the whole right side to attack…', cam: C([38, 22], 1.35) },
        { t: .5, shot: [22.3, -1], head: 'Switch it', sub: '…and the right ala gets the shot away before they get back.', wait: 1.1 }],
      carry0: [{ t: 1, them: { 11: [39, 30], 9: [23, 41] }, tag: { 'them:11': 'BACK IN TIME' }, head: 'Too slow', sub: 'Every touch gives their team time to shift back across.',
        cam: C([34, 36], 1.3), wait: 1.2 }],
      11: steal('11', '7', [7.5, 35.5], 'Back into the crowd', 'Their left ala and pivo are right there.'),
      9: steal('9', '4', [21, 15.5], 'Marked', 'Their fixo is tight on your pivo.'),
      1: say('Too safe', 'Back to the keeper, when your right ala was alone on the right?', C([25, 72], 1.25))
    } },

  'Into the pivo': {
    intro: { start: { ball: 'us:11', us: { 11: [7, 40], 9: [22, 21], 4: [24, 54], 7: [44, 33] }, them: { 7: [12, 42], 4: [24, 15], 9: [26, 44], 11: [38, 28] } },
      cam: C([14, 30], 1.4),
      steps: [
        { t: 1.5, us: { 11: [6, 33], 9: [19, 16], 4: [24, 49], 7: [45, 28] }, them: { 7: [10.5, 37], 4: [22.5, 11.5], 9: [25, 40], 11: [39, 24] }, tag: { 'us:9': GOOD('ON YOUR SIDE') },
          head: 'Your pivo gets in front of their fixo', sub: 'The pivo is on your side of the defender. Look at the diagonal.', cam: C([15, 24], 1.4) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      9: [{ t: 1.1, us: { 11: [13, 24] }, pass: 'us:11', pd: .45, tag: { 'us:9': GOOD('SKIPPED THEM') }, head: 'Into the pivo',
          sub: 'One pass skipped their left ala and their pivo. The pivo lays it back to you, facing the goal…', cam: C([16, 20], 1.45) },
        { t: .5, shot: [22.3, -1], head: 'Into the pivo', sub: '…and you shoot.', wait: 1.1 }],
      4: say('Too safe', 'Safe, but the diagonal into the pivo was on.', C([16, 40], 1.3)),
      carry0: [{ t: .9, them: { 4: [11, 16] }, tag: { 'them:4': 'SLIDES ACROSS' }, head: 'Into the corner', sub: 'Their fixo slides across, and the pass to the pivo is gone.',
        cam: C([12, 20], 1.55), wait: 1.2 }],
      shoot: say('No angle', 'From out wide, their keeper covers that easily.', C([16, 14], 1.4))
    } },

  'Switch and shoot': {
    intro: { start: { ball: 'us:11', us: { 11: [7, 32], 7: [43, 25], 9: [19, 17], 4: [25, 50] }, them: { 11: [21, 31.5], 4: [20, 11], 7: [13, 26], 9: [20, 42] } },
      cam: C([18, 28], 1.25),
      steps: [
        { t: 1.6, pass: 'us:7', pd: .1, us: { 11: [6, 29], 7: [40, 21], 9: [20, 13], 4: [25, 47] }, them: { 11: [31, 27], 4: [21, 8], 7: [10, 24], 9: [18, 40] }, tag: { 'them:11': 'SLIDING' },
          head: 'Your left ala switches it to you', sub: 'Their right ala is still sliding across, and you can see the goal.', cam: C([34, 20], 1.4) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      shoot: say('Switch and shoot', 'The switch left their right ala a step behind, so you shot first time, before the block could come.', C([30, 14], 1.4), { tag: { 'them:11': 'TOO LATE' } }),
      carry0: [{ t: .7, them: { 11: [32, 21.5] }, tag: { 'them:11': 'BLOCK' }, head: 'One touch too many', sub: 'You took it inside, and their right ala arrived to block the shot.',
        cam: C([33, 19], 1.6, .45), wait: 1.2 }],
      9: steal('9', '4', [20.5, 10.5], 'Marked', 'Their fixo is right on your pivo. You had the shot.'),
      4: say('Too safe', 'Back to the fixo, after the switch had opened the shot?', C([32, 30], 1.25))
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
      zone1: say('Too narrow', 'Their right ala can watch you and the middle at the same time.', C([30, 26], 1.45), { tag: { 'them:11': 'WATCHING BOTH' } }),
      zone2: say('Into the crowd', 'Now everyone is on the left, including you. Look at all the space on the right.', C([28, 28], 1.2),
        { hatch: [{ pts: [[34, 10], [50, 10], [50, 40], [34, 40]], c: 'gold' }], wait: 1.4 })
    } },

  'Far post run': {
    intro: { start: { ball: 'us:11', us: { 11: [6, 18], 9: [24, 20], 7: [44, 30], 4: [25, 46] }, them: { 7: [9, 22], 4: [21, 15], 11: [38, 23], 1: [25, 3], 9: [28, 38] } },
      cam: C([20, 16], 1.4),
      steps: [
        { t: 1.6, us: { 11: [9, 7], 9: [22.5, 12.5], 7: [42, 24], 4: [25, 42] }, them: { 7: [12, 14], 4: [18.5, 9.5], 11: [36, 18], 1: [24, 3], 9: [27, 34] },
          head: 'Your left ala gets to the end line', sub: 'Your pivo attacks the near post, and their fixo goes with it.', cam: C([22, 12], 1.4) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      zone0: [{ t: .5, tag: { 'us:7': GOOD('FAR POST') }, head: 'Far post run', sub: 'The ball was on the far wing, so you attacked the far post. The low ball across the goal went past everyone…',
          cam: C([28, 6], 1.6, .45) },
        { t: .4, shot: [27.5, -1], head: 'Far post run', sub: '…and found you for the tap-in.', wait: 1.1 }],
      zone1: [{ t: 1, pass: [42, 3], head: 'Watching', sub: 'The ball across the goal rolls past everyone, and nobody is at the far post.', cam: C([30, 8], 1.35), wait: 1.2 }],
      zone2: say('Too crowded', 'Your pivo, their fixo and their keeper are all there.', C([22, 9], 1.6, .45), { tag: { 'them:4': 'CROWD', 'them:1': 'CROWD' } })
    } },

  /* ---- 4. The pivo ---- */
  'Lay it off': {
    intro: { start: { ball: 'us:4', us: { 9: [25, 17], 11: [8, 40], 7: [43, 35] }, them: { 4: [25, 12], 9: [31, 44], 7: [12, 44], 11: [38, 30] } },
      cam: C([25, 32], 1.3),
      steps: [
        { t: 1.5, pass: 'us:9', pd: .05, face: { 'us:9': 'down' }, us: { 9: [25, 21], 11: [11, 33], 7: [44, 30] }, them: { 4: [25, 16], 9: [27, 40], 7: [12, 40], 11: [39, 26] },
          tag: { 'them:4': 'TIGHT' }, head: 'Your fixo plays it into you', sub: 'Your back is to goal, and their fixo is right behind you. Your left ala is running in.', cam: C([21, 26], 1.45) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      lead0: [{ t: .6, tag: { 'us:11': GOOD('FACING GOAL') }, head: 'Lay it off', sub: 'Their fixo was tight behind you, so you laid it into the path of your left ala, who runs onto it facing the goal…',
          cam: C([18, 20], 1.4) },
        { t: .5, shot: [22.3, -1], head: 'Lay it off', sub: '…and shoots first time.', wait: 1.1 }],
      11: [{ t: .8, us: { 11: [14, 27] }, tag: { 'us:11': GOOD('FACING GOAL') }, head: 'Lay it off', sub: 'Their fixo was tight behind you, so you laid it off to your left ala, who can face the goal…',
          cam: C([18, 22], 1.4) },
        { t: .5, shot: [22.3, -1], head: 'Lay it off', sub: '…and shoot.', wait: 1.1 }],
      4: say('Good', 'Safe, but your left ala was arriving facing the goal.', C([22, 34], 1.3)),
      7: steal('7', '11', [41.5, 28], 'Marked', 'Their right ala is right on your right ala.'),
      carry0: steal('9', '4', [25, 13.5], 'Into their fixo', 'You turned straight into their fixo, who takes it.'),
      carry1: steal('9', '4', [22, 18], 'Into their fixo', 'Their fixo is too close to turn on.'),
      carry2: steal('9', '4', [28, 18], 'Into their fixo', 'Their fixo is too close to turn on.'),
      shoot: { replace: true, steps: [{ t: .5, pass: 'them:4', tag: { 'them:4': 'BLOCK' }, head: 'Back to goal',
        sub: "You can't shoot with your back to the goal and their fixo right behind you.", cam: C([25, 18], 1.6, .45), wait: 1.2 }] }
    } },

  'The one-two': {
    intro: { start: { ball: 'us:11', us: { 9: [19, 30], 4: [25, 56], 7: [43, 36] }, them: { 4: [20, 25], 7: [12, 38], 9: [30, 48], 11: [37, 31] } },
      cam: C([14, 36], 1.45),
      steps: [
        { t: 1.5, pass: 'us:9', pd: .35, face: { 'us:9': 'left' }, us: { 9: [18, 37], 4: [26, 52], 7: [44, 32] }, them: { 4: [19, 31], 7: [9.5, 36], 9: [29, 44], 11: [38, 27] },
          head: 'You play it into your pivo', sub: 'The pivo came short. Their left ala is still between you and their goal.', cam: C([13, 36], 1.45) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      zone0: [{ t: 1, us: { 11: [11, 14] }, them: { 4: [16, 20] }, tag: { 'us:11': GOOD('IN BEHIND') }, head: 'The one-two',
          sub: 'You passed into the pivo and ran past their left ala. The pivo gave it straight back, and you are in behind…', cam: C([12, 20], 1.45) },
        { t: .5, shot: [22.3, -1], head: 'The one-two', sub: '…two touches, and you are through.', wait: 1.1 }],
      zone1: [{ t: .8, them: { 7: [8.5, 38] }, tag: { 'them:7': 'MARK' }, head: 'Stood still', sub: 'You passed and watched. Their left ala is still in front of you.', cam: C([10, 38], 1.55), wait: 1.2 }],
      zone2: say('Into the crowd', 'You ran toward the pivo, right into their left ala and their fixo.', C([14, 33], 1.55), { tag: { 'them:7': 'CROWD', 'them:4': 'CROWD' } })
    } },

  'Turn when you can': {
    intro: { start: { ball: 'us:4', us: { 9: [23, 23], 11: [7, 38], 7: [43, 36] }, them: { 4: [29, 16], 9: [30, 46], 7: [11, 34], 11: [38, 32] } },
      cam: C([24, 34], 1.3),
      steps: [
        { t: 1.4, pass: 'us:9', pd: .05, face: { 'us:9': 'down' }, us: { 9: [23, 27], 11: [6, 34], 7: [44, 32] }, them: { 4: [30, 20], 9: [26, 42], 7: [10, 30], 11: [39, 28] },
          tag: { 'them:4': 'STANDS OFF' }, head: 'Your fixo plays it into you', sub: 'Your back is to goal, but their fixo stays off you, out to your right.', cam: C([25, 25], 1.45) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      carry0: [{ t: .6, tag: { 'us:9': GOOD('TURNED') }, head: 'Turn when you can', sub: 'Their fixo stood off you on the right, so you turned the other way…', cam: C([20, 15], 1.45) },
        { t: .5, shot: [22.3, -1], head: 'Turn when you can', sub: '…and got your shot away.', wait: 1.1 }],
      carry1: [{ t: .5, pass: 'them:4', tag: { 'them:4': 'TACKLE' }, head: 'Into their fixo', sub: 'You turned right into their fixo.', cam: C([29, 21], 1.6, .45), wait: 1.2 }],
      4: say('Too safe', 'Back to the fixo, when their fixo had given you room to turn?', C([24, 36], 1.3)),
      11: say('Not the best', 'Safe, but you had room to turn yourself.', C([15, 30], 1.3)),
      7: steal('7', '11', [41.5, 30], 'Marked', 'Their right ala is on your right ala.'),
      shoot: say('Back to goal', "Turn first. You can't aim with your back to the goal.", C([24, 16], 1.4))
    } },

  'Set up the fixo': {
    intro: { start: { ball: 'us:4', us: { 4: [30, 44], 9: [25, 14], 11: [6, 28], 7: [42, 28] }, them: { 4: [25, 9.5], 9: [27, 48], 7: [13, 26], 11: [37, 26] } },
      cam: C([27, 30], 1.3),
      steps: [
        { t: 1.6, pass: 'us:9', pd: .05, face: { 'us:9': 'down' }, us: { 4: [31, 35], 9: [25, 18], 11: [7, 24], 7: [43, 24] }, them: { 4: [25, 13.5], 9: [25, 45], 7: [11, 21], 11: [39, 21] },
          tag: { 'them:4': 'TIGHT', 'them:7': 'MARK', 'them:11': 'MARK' }, head: 'You get it with your back to goal',
          sub: 'Their defenders all close in on you and the alas. Your fixo is running up behind you.', cam: C([27, 24], 1.3) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      lead0: [{ t: .6, tag: { 'us:4': GOOD('FIRST TIME') }, head: 'Set up the fixo', sub: 'They all closed in on you and the alas, so you laid it into the path of your fixo…',
          cam: C([28, 22], 1.35) },
        { t: .5, shot: [27.5, -1], head: 'Set up the fixo', sub: '…for a first-time shot.', wait: 1.1 }],
      4: [{ t: .6, tag: { 'us:4': GOOD('FREE') }, head: 'Set up the fixo', sub: 'They all closed in on you and the alas, so you laid it back to your fixo…', cam: C([28, 24], 1.3) },
        { t: .5, shot: [27.5, -1], head: 'Set up the fixo', sub: '…who shoots facing the goal.', wait: 1.1 }],
      11: steal('11', '7', [9.5, 21.5], 'Marked', 'Their left ala is right on your left ala.'),
      7: steal('7', '11', [40.5, 21.5], 'Marked', 'Their right ala is right on your right ala.'),
      carry0: steal('9', '4', [25, 11.5], 'Into their fixo', 'You turned straight into their fixo.'),
      shoot: { replace: true, steps: [{ t: .5, pass: 'them:4', tag: { 'them:4': 'BLOCK' }, head: 'Back to goal',
        sub: "You can't shoot with your back to goal and their fixo behind you.", cam: C([25, 16], 1.6, .45), wait: 1.2 }] }
    } },

  'Show for it': {
    intro: { start: { ball: 'us:4', us: { 4: [25, 62], 9: [25, 24], 11: [7, 44], 7: [43, 44] }, them: { 9: [27, 47], 4: [25, 18], 7: [13, 37], 11: [37, 37] } },
      cam: C([25, 42], 1.25),
      steps: [
        { t: 1.5, us: { 4: [25, 57], 9: [25, 27], 11: [6, 40], 7: [44, 40] }, them: { 9: [25, 43], 4: [25, 21], 7: [12, 33], 11: [38, 33] }, marks: [{ s: ['them:9', 'us:4'], len: 18 }],
          head: 'Your fixo wants to play it into you', sub: 'Their pivo is standing right between you and your fixo.', cam: C([25, 40], 1.25), wait: .4 },
        { t: 1, cam: W_, head: '', marks: [] }] },
    after: {
      zone0: [{ t: .9, them: { 4: [20.5, 21.5] }, tag: { 'them:4': 'FOLLOWS', 'us:9': GOOD('FOUND') }, head: 'Show for it',
          sub: 'You slid out from behind their pivo, so your fixo found you. Their fixo has to follow…', cam: C([22, 26], 1.4) },
        { t: 1.1, pass: 'us:7', pd: .5, us: { 7: [34, 16] }, tag: { 'us:7': GOOD('IN BEHIND') }, head: 'Show for it', sub: '…which opens the space behind it for your right ala.', cam: C([28, 16], 1.4) },
        { t: .5, shot: [28, -1], wait: 1.1 }],
      zone1: [{ t: .9, them: { 4: [29.5, 21.5] }, tag: { 'them:4': 'FOLLOWS', 'us:9': GOOD('FOUND') }, head: 'Show for it',
          sub: 'You slid out from behind their pivo, so your fixo found you. Their fixo has to follow…', cam: C([28, 26], 1.4) },
        { t: 1.1, pass: 'us:11', pd: .5, us: { 11: [16, 16] }, tag: { 'us:11': GOOD('IN BEHIND') }, head: 'Show for it', sub: '…which opens the space behind it for your left ala.', cam: C([22, 16], 1.4) },
        { t: .5, shot: [22.3, -1], wait: 1.1 }],
      zone2: say('Hidden', 'Their pivo is right in the line between you and your fixo.', C([25, 38], 1.3), { marks: [{ s: ['them:9', 'us:4'], len: 18 }], wait: 1.4 }),
      zone3: say('Too deep', 'You came all the way back, right next to their pivo. Now nobody is up front.', C([25, 32], 1.2),
        { hatch: [{ pts: [[15, 8], [35, 8], [35, 30], [15, 30]], c: 'bad' }], wait: 1.4 })
    } },

  /* ---- 5. Create the shot ---- */
  'Shoot early': {
    intro: { start: { ball: 'us:9', us: { 9: [21, 25], 4: [25, 51], 11: [7, 34], 7: [42, 30] }, them: { 4: [30, 11], 9: [27, 42], 7: [11, 30], 11: [36, 27] } },
      cam: C([22, 22], 1.45),
      steps: [
        { t: 1.3, face: { 'us:9': 'up' }, us: { 9: [19, 20], 4: [25, 47], 11: [6, 30], 7: [43, 26] }, them: { 4: [26, 14], 9: [25, 38], 7: [10, 26], 11: [37, 23] },
          tag: { 'them:4': 'COMING ACROSS' }, head: 'You turn at the edge of their area', sub: 'You can see the goal. Their fixo is coming across to block.', cam: C([22, 15], 1.5) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      shoot: say('Shoot early', 'You could see the goal, so you hit it early, before their fixo could block it.', C([22, 10], 1.5, .45), { tag: { 'them:4': 'TOO LATE' } }),
      carry0: [{ t: .6, them: { 4: [23, 12] }, tag: { 'them:4': 'BLOCK' }, head: 'One touch too many', sub: 'You took another touch, and their fixo got there to block it.', cam: C([22, 13], 1.6, .45), wait: .5 },
        { t: .4, pass: 'them:4', wait: 1.1 }],
      11: say('Not the best', 'Your left ala is further from goal than you. You had the shot.', C([14, 24], 1.35)),
      4: say('Too safe', 'Back to the fixo, with a clear look at goal?', C([22, 32], 1.25))
    } },

  'The cut-back': {
    intro: { start: { ball: 'us:11', us: { 11: [6, 16], 9: [26, 16], 7: [40, 16], 4: [28, 40] }, them: { 7: [9, 20], 1: [25, 3], 4: [24, 12], 11: [40, 20], 9: [32, 42] } },
      cam: C([18, 16], 1.35),
      steps: [
        { t: 1.6, us: { 11: [9, 5], 9: [24, 11], 7: [38, 9], 4: [27, 30] }, them: { 7: [12.5, 13], 1: [22, 3], 4: [21.5, 8.5], 11: [39, 14], 9: [30, 36] },
          head: 'You get to their end line', sub: 'Their keeper and their fixo guard the near post. Your fixo is running in.', cam: C([18, 14], 1.35) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      lead0: [{ t: .6, us: { 9: [20.5, 12.5] }, tag: { 'us:4': GOOD('FREE') }, head: 'The cut-back',
          sub: 'Their keeper and their fixo were at the near post, so you pulled it back into the space your fixo ran into…', cam: C([24, 14], 1.5, .45) },
        { t: .5, shot: [27.5, -1], head: 'The cut-back', sub: '…first-time shot.', wait: 1.1 }],
      4: say('Good', 'Right player, but your fixo is running in. Put it into the space the fixo is running into.', C([22, 22], 1.35)),
      9: steal('9', '4', [22.5, 9], 'Marked', 'Their fixo is right on your pivo at the near post.'),
      shoot: say('No angle', 'From the end line, their keeper covers the whole near post.', C([17, 6], 1.6, .45))
    } },

  'Make it two against one': {
    intro: { start: { ball: 'us:11', us: { 11: [12, 38], 4: [9, 46], 9: [24, 17], 7: [43, 32] }, them: { 7: [14, 20], 4: [23, 11], 9: [27, 44], 11: [37, 26] } },
      cam: C([12, 34], 1.4),
      steps: [
        { t: 1.5, us: { 11: [11, 31], 4: [5, 36], 9: [23, 13], 7: [44, 28] }, them: { 7: [13, 26], 4: [22, 8], 9: [26, 40], 11: [38, 22] }, tag: { 'them:7': 'STEPS UP' },
          head: 'Your fixo overlaps on the outside', sub: 'Their left ala steps toward you.', cam: C([11, 30], 1.45) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      lead0: [{ t: 1, us: { 4: [8, 12] }, them: { 4: [16, 8], 1: [22, 3] }, tag: { 'us:4': GOOD('IN BEHIND') }, head: 'Make it two against one',
          sub: 'Their left ala stepped to you, so you slipped it down the line. The fixo is in behind…', cam: C([12, 15], 1.45) },
        { t: .8, pass: 'us:9', head: 'Make it two against one', sub: '…and squares it for your pivo.', cam: C([20, 10], 1.5, .45) },
        { t: .5, shot: [27.5, -1], wait: 1.1 }],
      4: say('Good', 'Right idea, but your fixo is running. Put it in front of the fixo, down the line.', C([8, 30], 1.4)),
      9: steal('9', '4', [22.5, 10.5], 'Marked', 'Their fixo is right on your pivo.'),
      carry0: [{ t: .5, pass: 'them:7', tag: { 'them:7': 'TACKLE' }, head: 'Into their left ala', sub: 'Their left ala was waiting for exactly that.', cam: C([13, 25], 1.6, .45), wait: 1.2 }],
      shoot: say('Too far', 'Way too far, with their left ala right in front of you.', C([14, 22], 1.25))
    } },

  'Arrive late': {
    intro: { start: { ball: 'us:11', us: { 11: [6, 16], 9: [24, 18], 7: [38, 16], 4: [25, 52] }, them: { 7: [9, 21], 4: [22, 13], 11: [40, 18], 1: [25, 3], 9: [28, 43] } },
      cam: C([20, 16], 1.3),
      steps: [
        { t: 1.6, us: { 11: [9, 6], 9: [22.5, 10], 7: [33, 7], 4: [25, 46] }, them: { 7: [12.5, 14], 4: [19, 7.5], 11: [36, 12], 1: [23, 3], 9: [27, 38] },
          head: 'Your left ala gets to the end line', sub: 'Your pivo attacks the near post and your right ala the far post.', cam: C([22, 14], 1.3) },
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
          tag: { 'them:1': 'RUSHES OUT' }, head: "You're through on goal", sub: 'Their keeper rushes out at you, and your pivo runs alongside.', cam: C([25, 14], 1.4) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      9: [{ t: .5, shot: [23, -1], tag: { 'us:9': GOOD('OPEN GOAL') }, head: 'Square it', sub: 'Their keeper came out at you, so you squared it to your pivo. Open goal.',
        cam: C([22, 9], 1.5, .45), wait: 1.2 }],
      lead0: [{ t: .5, shot: [24, -1], tag: { 'us:9': GOOD('OPEN GOAL') }, head: 'Square it', sub: 'Their keeper came out at you, so you rolled it across in front of your pivo. Open goal.',
        cam: C([22, 8], 1.5, .45), wait: 1.2 }],
      carry0: [{ t: .5, pass: 'them:1', tag: { 'them:1': 'SMOTHERS' }, head: 'Into the keeper', sub: 'Their keeper smothers it.', cam: C([29, 9], 1.6, .45), wait: 1.2 }],
      shoot: say('Risky', 'The keeper rushed out and covered most of the goal. Your pivo had an open net.', C([25, 12], 1.5, .45), { tag: { 'them:1': 'SAVED' } }),
      4: say('Too safe', 'Back, when you were through on goal?', C([27, 34], 1.2))
    } },

  /* ---- 6. Counters and routines ---- */
  'Two against one': {
    intro: { start: { ball: 'us:11', us: { 11: [18, 54], 9: [34, 52], 4: [24, 72], 7: [44, 66] }, them: { 4: [23, 24], 7: [10, 64], 9: [24, 66], 11: [38, 72] } },
      cam: C([24, 46], 1.15),
      steps: [
        { t: 1.6, us: { 11: [16, 40], 9: [33, 38], 4: [24, 64], 7: [42, 58] }, them: { 4: [21, 32], 7: [12, 56], 9: [24, 58], 11: [38, 64] }, tag: { 'them:4': 'STEPS UP' },
          head: 'Counterattack!', sub: 'Only their fixo is back, and your pivo is with you. Their fixo steps toward you.', cam: C([24, 38], 1.25) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      lead0: [{ t: 1, us: { 9: [30, 14] }, them: { 1: [24, 4] }, tag: { 'us:9': GOOD('THROUGH') }, head: 'Two against one',
          sub: 'Their fixo stepped to you, so you slipped it into the space ahead of your pivo. The pivo is through…', cam: C([28, 16], 1.4) },
        { t: .5, shot: [28, -1], head: 'Two against one', sub: '…and scores.', wait: 1.1 }],
      9: say('Good', 'Right player, but the pivo is running. Put it in front of the pivo.', C([30, 34], 1.35)),
      7: say('Too safe', 'Back to the right ala, with two of you against one?', C([34, 50], 1.2)),
      carry0: [{ t: .5, pass: 'them:4', tag: { 'them:4': 'TACKLE' }, head: 'Into their fixo', sub: 'You ran straight into the only defender.', cam: C([20, 31], 1.6, .45), wait: 1.2 }],
      carry1: [{ t: .8, them: { 4: [15, 26] }, tag: { 'them:4': 'SHOWS YOU WIDE' }, head: 'Too wide', sub: 'Their fixo shows you wide, away from goal, and your pivo is out of the play.',
        cam: C([14, 27], 1.5), wait: 1.2 }],
      shoot: say('Too far', 'Way too far, with two of you against one.', C([20, 24], 1.2))
    } },

  'Three against two': {
    intro: { start: { ball: 'us:11', us: { 11: [25, 56], 9: [12, 50], 7: [34, 60], 4: [25, 78] }, them: { 4: [21, 34], 11: [33, 38], 7: [12, 74], 9: [22, 72] } },
      cam: C([25, 48], 1.15),
      steps: [
        { t: 1.6, us: { 11: [25, 42], 9: [10, 36], 7: [33, 48], 4: [25, 70] }, them: { 4: [21, 28], 11: [33, 32], 7: [12, 66], 9: [22, 62] },
          head: 'Counterattack!', sub: 'Your left ala dribbles up the middle, and only two of theirs are back.', cam: C([25, 40], 1.2) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      zone0: [{ t: .9, us: { 11: [27, 24] }, them: { 11: [44, 25], 1: [23.5, 4] }, tag: { 'them:11': 'PRESS' }, head: 'Three against two',
          sub: 'You ran wide and forward, so their right ala has to come out to you…', cam: C([34, 26], 1.3) },
        { t: .8, pass: 'us:11', pd: .1, tag: { 'us:11': GOOD('FREE') }, head: 'Three against two', sub: '…and that leaves your left ala free.' },
        { t: .5, shot: [28, -1], wait: 1.1 }],
      zone1: [{ t: .8, them: { 11: [29, 35] }, tag: { 'them:11': 'MARKS BOTH' }, head: 'Too close', sub: 'Right next to your left ala, one defender can cover you both.', cam: C([27, 38], 1.45), wait: 1.2 }],
      zone2: say('Too deep', 'Behind the ball you are no help to the counter. Their two defenders only have two of us to stop.', C([25, 40], 1.2))
    } },

  'Kick-in for the fixo': {
    intro: { start: { us: { 4: [33, 50], 9: [28, 18], 11: [10, 24] }, them: { 9: [23, 38], 4: [27, 12], 7: [13, 19], 11: [39, 18] } },
      cam: C([36, 26], 1.3),
      steps: [
        { t: 1.6, us: { 4: [34, 40], 9: [26, 13], 11: [8, 18] }, them: { 9: [20, 32], 4: [25, 8], 7: [11, 14], 11: [40, 13] }, tag: { 'them:4': 'MARK', 'them:7': 'MARK' },
          head: 'Kick-in to us near their area', sub: 'Their players mark your pivo and left ala. Your fixo is running up from behind.', cam: C([34, 24], 1.3) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      lead0: [{ t: .6, us: { 9: [23, 12] }, them: { 1: [23.5, 3.5] }, tag: { 'us:4': GOOD('FIRST TIME'), 'them:4': 'MARK' }, head: 'Kick-in for the fixo',
          sub: 'Their players marked the pivo and the left ala, so you played it into your fixo, arriving from behind…', cam: C([28, 20], 1.4) },
        { t: .5, shot: [27, -1], head: 'Kick-in for the fixo', sub: '…for a first-time shot.', wait: 1.1 }],
      4: say('Good', 'Right player, but your fixo is running in. Put it into the run.', C([36, 34], 1.35)),
      9: steal('9', '4', [25.5, 10.5], 'Marked', 'Their fixo is right on your pivo.')
    } },

  'Corner to the far post': {
    intro: { start: { us: { 9: [22, 16], 7: [42, 20], 4: [25, 34] }, them: { 4: [23, 19], 11: [40, 26], 9: [26, 28], 7: [10, 12], 1: [25, 3] } },
      cam: C([20, 12], 1.35),
      steps: [
        { t: 1.6, us: { 9: [19, 9], 7: [38, 12], 4: [24, 26] }, them: { 4: [20, 13], 11: [37, 20], 9: [25, 20], 7: [12, 8], 1: [23, 3.5] },
          head: 'Corner kick to us from the left', sub: 'Their keeper and their fixo crowd the near post. Your right ala sneaks toward the far post.', cam: C([22, 10], 1.35) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      lead0: [{ t: .5, tag: { 'us:7': GOOD('FAR POST') }, head: 'Corner to the far post',
          sub: 'Their defenders crowded the near post, so you whipped it across, right into your right ala’s run…', cam: C([30, 6], 1.6, .45) },
        { t: .4, shot: [27, -1], head: 'Corner to the far post', sub: '…at the far post, where nobody followed.', wait: 1.1 }],
      7: say('Good', 'Right player, but the right ala is moving. Put it at the far post, in front of the run.', C([34, 10], 1.45)),
      9: steal('9', '1', [20.5, 6.5], 'Marked', 'Their keeper comes and claims it at the near post.'),
      4: steal('4', '9', [24.5, 23.5], 'Marked', 'Their pivo is right on your fixo at the top of the area.')
    } },

  'Power play': {
    intro: { start: { ball: 'us:4', us: { 1: [28, 60], 4: [17, 42], 11: [6, 25], 7: [44, 26], 9: [25, 18] }, them: { 9: [23, 28], 7: [14, 20], 11: [36, 30], 4: [25, 12] } },
      cam: C([25, 40], 1.1),
      steps: [
        { t: 1.8, us: { 1: [33, 38], 4: [14, 36], 11: [5, 20], 7: [45, 20], 9: [25, 13] }, them: { 9: [20, 32], 7: [11, 24], 11: [37, 25], 4: [25, 8.5] },
          tag: { 'us:1': GOOD('FIFTH ATTACKER') }, head: 'Power play', sub: 'Your keeper comes up to make it five against four. Their pivo and left ala are on you and your left ala.', cam: C([25, 30], 1.2) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      1: [{ t: .9, them: { 11: [38, 36] }, tag: { 'them:11': 'PRESS' }, head: 'Power play', sub: 'You moved it across the top, so their right ala has to choose: your keeper or your right ala…',
          cam: C([38, 30], 1.3) },
        { t: 1, pass: 'us:7', pd: .1, us: { 7: [44, 16] }, tag: { 'us:7': GOOD('FREE') }, head: 'Power play', sub: '…their right ala went to the keeper, so the right ala on the far side is free.', cam: C([38, 16], 1.4) },
        { t: .5, shot: [28, -1], wait: 1.1 }],
      11: steal('11', '7', [8, 22.5], 'Marked', 'Their left ala is right on your left ala.'),
      carry0: [{ t: .5, pass: 'them:9', tag: { 'them:9': 'TACKLE' }, head: 'Into their pivo', sub: 'Their pivo is right there…', cam: C([19, 31], 1.6, .45), wait: .6 },
        { t: 1.3, shot: [25, 101], head: 'Into their pivo', sub: '…and with our keeper up the court, our goal is empty.', cam: W_, wait: 1 }],
      shoot: { replace: true, steps: [{ t: .5, pass: 'them:9', tag: { 'them:9': 'BLOCK' }, head: 'Blocked', sub: 'Through their whole diamond? It hits a defender.',
        cam: C([17, 34], 1.5, .45), wait: 1.2 }] }
    } },
  /* ---- 7. Kick-ins ---- */
  'Short for the fixo': {
    intro: { start: { us: { 4: [33, 38], 9: [30, 15], 11: [16, 20] }, them: { 4: [29, 10], 7: [18, 16], 11: [42, 18], 9: [27, 46] } },
      cam: C([40, 22], 1.35),
      steps: [
        { t: 1.6, us: { 4: [36, 31], 9: [29, 10], 11: [14, 16] }, them: { 4: [29, 6.3], 7: [17, 12], 11: [40, 13], 9: [27, 42] },
          tag: { 'them:11': 'BACK 5 M', 'us:4': GOOD('OPEN') }, head: 'Kick-in to us', sub: 'Their players have to stand 5 m back. Your fixo is open just inside you.', cam: C([38, 22], 1.3) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      lead0: [{ t: .6, us: { 9: [24, 13] }, them: { 4: [24, 9.3], 11: [41, 19] }, tag: { 'us:4': GOOD('FIRST TIME'), 'them:11': 'TOO LATE' }, head: 'Short for the fixo',
          sub: "Their players had to stand 5 m back, so you rolled it very short into your fixo's stride…", cam: C([36, 18], 1.35) },
        { t: .5, shot: [27.5, -1], head: 'Short for the fixo', sub: '…and the fixo shoots before anyone can close.', wait: 1.1 }],
      4: say('Good', 'Right player, but roll it in front of your fixo, into the stride. Then the shot is first time.', C([40, 28], 1.4)),
      9: steal('9', '4', [28.5, 7.6], 'Marked', 'Their fixo is right on your pivo, and their keeper is close.'),
      11: steal('11', '7', [16, 13.5], 'Marked', 'A long kick-in across their whole area, and their left ala is right on your left ala.')
    } },

  'Open for the short one': {
    intro: { start: { us: { 4: [24, 52], 9: [26, 16], 7: [40, 22] }, them: { 4: [24, 11], 11: [37, 18], 7: [8, 18], 9: [26, 42] } },
      cam: C([14, 26], 1.3),
      steps: [
        { t: 1.6, us: { 4: [24, 48], 9: [24, 10], 7: [38, 16] }, them: { 4: [22.5, 6.5], 11: [35, 12.5], 7: [10, 14], 9: [26, 38] }, tag: { 'them:7': 'BACK 5 M' },
          head: 'Kick-in to us', sub: 'Your left ala will take it. Their players have to stand 5 m back.', cam: C([16, 26], 1.25) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      zone0: [{ t: .5, tag: { 'us:4': GOOD('FREE SHOT') }, head: 'Open for the short one', sub: 'You stepped up a few steps from the taker, inside and facing goal…', cam: C([14, 20], 1.4) },
        { t: .5, shot: [22, -1], head: 'Open for the short one', sub: '…one short pass, one shot.', wait: 1.1 }],
      zone1: [{ t: .9, them: { 9: [25, 43] }, tag: { 'them:9': 'PRESS' }, head: 'Too deep', sub: 'From there the pass is long, and their pivo closes you before you can shoot.', cam: C([22, 44], 1.4), wait: 1.2 }],
      zone2: say('Too close', 'Right next to the taker on the line, you have no angle to shoot.', C([6, 22], 1.5)),
      zone3: [{ t: .8, them: { 7: [13, 15] }, tag: { 'them:7': 'MARK' }, head: 'Into the crowd', sub: 'Toward the goal you run into their left ala and fixo, and the shot is gone.', cam: C([16, 14], 1.5), wait: 1.2 }]
    } },

  'Set a screen': {
    intro: { start: { us: { 11: [13, 30], 9: [27, 14], 4: [32, 46] }, them: { 7: [17, 26], 4: [27.5, 10], 9: [31, 41], 11: [41, 17] } },
      cam: C([24, 22], 1.3),
      steps: [
        { t: 1.6, us: { 11: [15, 25], 9: [27, 10], 4: [32, 42] }, them: { 7: [18.5, 21.5], 4: [27.5, 6], 9: [31, 37], 11: [38, 14] }, tag: { 'them:7': 'TIGHT' },
          head: 'Kick-in to us', sub: 'Your left ala wants to run across to the ball, but their left ala is tight on the ala.', cam: C([22, 20], 1.3) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      zone0: [{ t: 1.1, us: { 11: [23, 29.5] }, them: { 7: [19, 23], 4: [24, 18] }, tag: { 'us:9': GOOD('SCREEN'), 'them:7': 'BLOCKED', 'them:4': 'FOLLOWS' }, head: 'Set a screen',
          sub: 'You stood still right next to their left ala. Your left ala runs past you, and their left ala runs into you…', cam: C([21, 25], 1.5) },
        { t: 1, us: { 11: [31, 26] }, pass: 'us:11', pd: .35, tag: { 'us:11': GOOD('FREE') }, head: 'Set a screen', sub: '…so your left ala is free for the kick-in.', cam: C([32, 20], 1.35) },
        { t: .5, shot: [28, -1], them: { 1: [23.5, 3] }, wait: 1.1 }],
      zone1: [{ t: 1.1, us: { 11: [25, 27] }, them: { 7: [23, 23.5] }, tag: { 'them:7': 'MARK' }, head: 'Stayed at the post',
        sub: "Nobody got in their left ala's way, so the ala follows your left ala across.", cam: C([22, 24], 1.45), wait: 1.2 }],
      zone2: [{ t: 1.1, us: { 11: [20, 30] }, them: { 7: [19, 25.5] }, tag: { 'them:7': 'MARK' }, head: 'Wrong side',
        sub: "You got in your own left ala's way, not their left ala's.", cam: C([17, 27], 1.45), wait: 1.2 }]
    } },

  'Over the press': {
    intro: { start: { us: { 9: [12, 46], 4: [14, 78], 7: [33, 64] }, them: { 4: [14, 42], 9: [17, 72], 11: [31, 59], 7: [14, 52] } },
      cam: C([14, 58], 1.25),
      steps: [
        { t: 1.6, us: { 9: [12, 51], 4: [13, 72], 7: [32, 58] }, them: { 4: [14.5, 47], 9: [15.5, 67], 11: [30, 53.5], 7: [12.5, 57] },
          tag: { 'them:4': 'MARK', 'them:9': 'MARK', 'them:11': 'MARK' }, hatch: [{ pts: [[2, 32], [17, 32], [17, 45], [2, 45]], c: 'gold' }],
          head: 'Kick-in to us in our half', sub: 'They press man to man. Everyone is marked, and the space behind them is empty.', cam: C([16, 54], 1.15), wait: .4 },
        { t: 1, cam: W_, head: '', hatch: [] }] },
    after: {
      lead0: [{ t: 1.1, us: { 9: [10, 28] }, them: { 4: [16, 40] }, tag: { 'us:9': GOOD('IN BEHIND') }, head: 'Over the press',
        sub: 'They pressed everyone man to man, so you lifted it over the top. Your pivo spun in behind, and their whole press is beaten.', cam: C([12, 34], 1.3), wait: 1.2 }],
      9: steal('9', '4', [13.5, 48.5], 'Marked', 'Their fixo is tight on your pivo, who has to turn with the ball.'),
      4: steal('4', '9', [14, 69.5], 'Risky', 'Their pivo jumps on your fixo, right in front of our goal.'),
      7: steal('7', '11', [31, 55.5], 'Marked', 'Their right ala is on your right ala.'),
      1: say('Too safe', 'Back to the keeper. Safe, but their press comes again, and the space is behind them.', C([18, 80], 1.25))
    } },

  'Step back in': {
    intro: { start: { ball: 'us:7', us: { 4: [38, 31], 11: [16, 21] }, them: { 11: [38, 15], 7: [19, 17] } },
      cam: C([42, 24], 1.4),
      steps: [
        { t: 1.5, pass: 'us:4', pd: .1, us: { 4: [42, 27], 11: [15, 17] }, them: { 11: [40, 21.5], 7: [18, 13] }, tag: { 'them:11': 'CLOSES' },
          head: 'You play the kick-in short to your fixo', sub: 'Their right ala closes the fixo down. Nobody is watching you.', cam: C([42, 22], 1.4) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      zone0: [{ t: 1, us: { 7: [43, 9] }, them: { 1: [27, 3] }, tag: { 'us:7': GOOD('IN BEHIND') }, head: 'Step back in',
          sub: "Defenders forget the kick-in taker. You stepped straight back in behind their right ala, and you're in on goal…", cam: C([38, 10], 1.5) },
        { t: .5, shot: [28, -1], head: 'Step back in', sub: '…one pass, one shot.', wait: 1.1 }],
      zone1: [{ t: .8, them: { 11: [41, 23.5] }, tag: { 'them:11': 'PRESS' }, head: 'Stayed off', sub: 'You stayed off the court, so your fixo has nobody close to play with.',
        cam: C([44, 25], 1.5), wait: 1.2 }],
      zone2: [{ t: .8, them: { 11: [41, 23] }, tag: { 'them:11': 'MARKS BOTH' }, head: 'Too close', sub: 'Right next to your fixo, their right ala closes you both down.',
        cam: C([43, 27], 1.55), wait: 1.2 }]
    } },

  /* ---- 8. Free kicks ---- */
  'Roll it to the side': {
    intro: { start: { us: { 4: [33, 38], 9: [34, 14], 7: [42, 24] }, them: { 9: [18, 14], 7: [22, 16], 4: [32, 10], 11: [38, 19] } },
      cam: C([18, 18], 1.35),
      steps: [
        { t: 1.6, us: { 4: [31, 33], 9: [33, 10], 7: [41, 20] }, them: { 9: [16.2, 9.9], 7: [20.6, 12.5], 4: [31.5, 6.5], 11: [37.5, 16.5] },
          tag: { 'them:9': 'WALL', 'them:7': 'WALL' }, head: 'Free kick to us', sub: 'Their wall of two blocks the shot from here. Your fixo waits behind the ball.', cam: C([20, 18], 1.3) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      lead0: [{ t: .6, them: { 1: [27, 3] }, tag: { 'us:4': GOOD('NO WALL') }, head: 'Roll it to the side',
          sub: "The wall blocked the shot from where the ball was, so you rolled it square. From your fixo, the wall isn't in the way…", cam: C([25, 18], 1.35) },
        { t: .5, shot: [22.5, -1], head: 'Roll it to the side', sub: '…first-time shot.', wait: 1.1 }],
      4: say('Good', "Right player, but roll it into the fixo's run, so the shot is first time.", C([28, 30], 1.35)),
      9: steal('9', '4', [32, 7.6], 'Marked', 'Their fixo is right on your pivo, behind the wall.'),
      7: steal('7', '11', [39, 18], 'Marked', 'Their right ala is on your right ala.'),
      shoot: { replace: true, steps: [{ t: .5, pass: 'them:7', tag: { 'them:7': 'BLOCK' }, head: 'Into the wall', sub: 'From here their wall is right in the way.',
        cam: C([17, 15], 1.5, .45), wait: 1.2 }] }
    } },

  'Take it quick': {
    intro: { start: { us: { 7: [44, 52], 11: [12, 54], 9: [25, 30] }, them: { 11: [42, 64], 9: [27, 62], 7: [17, 58], 4: [24, 34] } },
      cam: C([32, 56], 1.2),
      steps: [
        { t: 1.5, us: { 7: [44, 44], 11: [12, 48], 9: [25, 24] }, them: { 11: [38, 57], 9: [23, 55], 7: [15, 52], 4: [24, 29] },
          tag: { 'them:11': 'NOT BACK', 'them:9': 'NOT BACK', 'us:7': GOOD('FREE') }, head: 'Free kick to us',
          sub: "They're still jogging back, and your right ala is free up the right.", cam: C([32, 50], 1.15) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      lead0: [{ t: 1.2, us: { 7: [42, 22] }, them: { 4: [30, 27], 11: [38, 48] }, tag: { 'us:7': GOOD('BEFORE THEY SET') }, head: 'Take it quick',
        sub: "They were still getting back, so you took it quickly into the space ahead of your right ala, who runs at their goal before they're set.", cam: C([38, 32], 1.2), wait: 1.2 }],
      7: say('Good', 'Right player, but put it ahead of your right ala, who is facing forward with space.', C([40, 46], 1.3)),
      9: steal('9', '4', [24.5, 26.5], 'Marked', "Their fixo is tight on your pivo, and it's a long way."),
      1: say('Too safe', 'Back to the keeper gives them time to get back and set up.', C([28, 76], 1.2))
    } },

  'Across the face': {
    intro: { start: { us: { 11: [10, 24], 9: [27, 23], 4: [30, 40] }, them: { 7: [8, 20], 9: [33, 10], 11: [36, 8], 4: [27, 19], 1: [26, 3] } },
      cam: C([28, 12], 1.35),
      steps: [
        { t: 1.6, us: { 11: [13, 19], 9: [27, 19], 4: [30, 36] }, them: { 7: [10, 14], 9: [30.7, 7.3], 11: [34.9, 4.3], 4: [27, 15], 1: [27, 2.5] },
          tag: { 'them:9': 'WALL', 'them:11': 'WALL' }, head: 'Free kick to us on the right',
          sub: 'Their wall and keeper cover the near post. Your left ala is sneaking in at the far post.', cam: C([26, 12], 1.3) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      lead0: [{ t: .5, tag: { 'us:11': GOOD('FAR POST') }, head: 'Across the face', sub: 'The wall and keeper covered the near post, so you rolled it across the face of the goal…',
          cam: C([22, 6], 1.6, .45) },
        { t: .4, shot: [23.5, -1], head: 'Across the face', sub: '…and your left ala slides it in at the far post.', wait: 1.1 }],
      11: say('Good', 'Right player, but the left ala is running to the far post. Put it in front of the run.', C([18, 14], 1.4)),
      9: steal('9', '4', [27, 16.5], 'Marked', 'Their fixo is right on your pivo.'),
      4: say('Too safe', 'Back to the fixo. Safe, but the far post was wide open.', C([32, 26], 1.25)),
      shoot: { replace: true, steps: [{ t: .5, pass: 'them:9', tag: { 'them:9': 'BLOCK' }, head: 'Blocked', sub: 'Their wall and keeper cover the near post. That shot hits the wall.',
        cam: C([33, 9], 1.5, .45), wait: 1.2 }] }
    } },

  'Find the shooting lane': {
    intro: { start: { us: { 4: [30, 52], 9: [18, 16], 11: [11, 28] }, them: { 11: [35, 14], 9: [30, 16], 4: [19, 12], 7: [14, 24] } },
      cam: C([30, 24], 1.3),
      steps: [
        { t: 1.6, us: { 4: [30, 45], 9: [16, 12], 11: [10, 24] }, them: { 11: [33.2, 11.5], 9: [28.4, 13.7], 4: [17.5, 8.5], 7: [13, 20.5] },
          tag: { 'them:9': 'WALL', 'them:11': 'WALL' }, head: 'Free kick to us', sub: 'Your right ala will roll it to you. Their wall of two blocks the straight shot.', cam: C([28, 24], 1.25) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      zone0: [{ t: .5, them: { 1: [27, 3] }, tag: { 'us:4': GOOD('CLEAR SHOT') }, head: 'Find the shooting lane',
          sub: "You stood square of the ball, at the top of the area, where the wall doesn't cover…", cam: C([24, 16], 1.35) },
        { t: .5, shot: [22.5, -1], head: 'Find the shooting lane', sub: '…and shoot first time.', wait: 1.1 }],
      zone1: say('Too deep', 'From back there the shot is long, and the wall has time to shift across.', C([28, 36], 1.2)),
      zone2: say('Same angle', 'Right behind the ball, the wall is still between you and the goal.', C([31, 20], 1.3), { marks: [{ l: [[33, 30], [25, 0]], c: 'bad' }], wait: 1.4 }),
      zone3: say('Too close to the wall', "Right next to the wall, there's no room to shoot.", C([27, 16], 1.55, .45))
    } },

  'Spin behind your marker': {
    intro: { start: { us: { 4: [28, 45], 11: [11, 26] }, them: { 4: [27, 11], 11: [41, 22], 9: [29, 40], 7: [14, 22.5] } },
      cam: C([32, 20], 1.35),
      steps: [
        { t: 1.5, us: { 4: [28, 40], 11: [12, 22] }, them: { 4: [28.5, 14], 11: [40, 16], 9: [29, 35.5], 7: [15, 18.5] }, tag: { 'them:4': 'WATCHING THE BALL' },
          head: 'Free kick to us on the right', sub: 'Their fixo is behind your pivo, but watching the ball, not you.', cam: C([32, 18], 1.35) },
        { t: 1, cam: W_, head: '' }] },
    after: {
      zone0: [{ t: .5, them: { 1: [25, 3] }, tag: { 'us:9': GOOD('IN BEHIND'), 'them:4': 'BEATEN' }, head: 'Spin behind your marker',
          sub: 'Their fixo was watching the ball, so you spun in behind…', cam: C([29, 9], 1.6, .45) },
        { t: .4, shot: [28, -1], head: 'Spin behind your marker', sub: '…and you are through on goal.', wait: 1.1 }],
      zone1: [{ t: .9, pass: 'them:4', them: { 4: [30, 16] }, tag: { 'them:4': 'STEPS IN' }, head: 'Stayed in front', sub: 'You stayed in front of their fixo, who steps in and wins it.',
        cam: C([30, 18], 1.5), wait: 1.2 }],
      zone2: [{ t: .9, them: { 4: [33, 22] }, tag: { 'them:4': 'FOLLOWS' }, head: 'Came short', sub: 'Coming short brings their fixo with you, and the space behind is gone.',
        cam: C([33, 22], 1.4), wait: 1.2 }]
    } }

};
window.RIDDLE_LIB.withMotion(RIDDLES, MOTION);

window.RIDDLE_LIB.defineSet({ key: 'fs', chapters: CHAPTERS, riddles: RIDDLES });
})();
