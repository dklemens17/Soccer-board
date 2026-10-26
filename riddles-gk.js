/* Riddles for the keeper. Format notes are at the top of riddles-6.js.
   Our goal is at y = 75, posts at x = 21.75 and 28.25. */
(function () {
const { P, TOO_SAFE } = window.RIDDLE_LIB;
const LONG = w => P(1, 'Long ball', w);

const CHAPTERS = [
  { name: 'Set your angle', blurb: 'Stand where you cover the most goal.' },
  { name: 'Sweep and support', blurb: 'Come off your line at the right time.' },
  { name: 'Crosses and set pieces', blurb: 'Crosses, corners, and free kicks.' },
  { name: 'Start the attack', blurb: 'You have the ball. Find the best pass.' },
  { name: 'Ball at your feet', blurb: 'Back passes and build-up. Keep it simple and safe.' },
  { name: 'Read the game', blurb: 'Know when to come, when to stay, and when to switch.' }
];

const RIDDLES = [
/* ---------------- 1. Set your angle ---------------- */
{ ch: 0, type: 'move', title: 'Get set',
  prompt: 'Their 10 got past your 6 and is about to shoot from straight in front of our goal. Drag the keeper.',
  hint: 'Draw a line from the ball to the middle of the goal.',
  lesson: 'Stand on the line between the ball and the middle of the goal, a couple of yards off your line. That covers both corners.',
  us:   { 1:[21.5,73.2], 3:[16,62], 4:[28,61], 2:[36,62], 6:[25,51.5], 10:[22,40], 11:[10,42], 9:[26,30], 7:[40,42] },
  them: { 1:[25,4], 2:[12,34], 4:[25,25], 3:[38,32], 6:[24,45], 10:[25,55.5], 9:[20,60], 7:[10,56], 11:[40,56] },
  ball: { team: 'them', n: '10' },
  zones: [
    [25, 72.2, 2.1, 3, 'Pro spot', 'You got on the line between the ball and the middle of the goal, a couple of yards off your line. Both corners are covered.'],
    [25, 74.4, 0.9, 2, 'On your line', 'Centered, but standing on your line gives the shooter more goal to aim at. Step off it a little.'],
    [25, 72.4, 3, 2, 'Close', 'Almost. Get right on the line between the ball and the middle of the goal.'],
    [21.5, 73.2, 1.5, 1, 'Off center', 'You left the far corner wide open.'],
    [25, 65, 2.5, 0, 'Too far out', 'So far out, the shooter can chip it over your head.']
  ],
  elsewhere: P(1, 'Not quite', 'Get on the line between the ball and the middle of the goal.'),
  best: { kind: 'move', at: [25,72.2] } },

{ ch: 0, type: 'move', title: 'From an angle',
  prompt: 'Their 7 cut inside from our left and is about to shoot. Drag the keeper.',
  hint: 'Draw a line from the ball to the middle of the goal. Which post is closer to the ball?',
  lesson: 'Shot from an angle? Stay on the line between the ball and the middle of the goal. That puts you closer to the near post.',
  us:   { 1:[26.5,73.5], 3:[11,63.5], 4:[25,63], 2:[35,63], 6:[22,52], 10:[24,40], 11:[8,44], 9:[26,30], 7:[40,42] },
  them: { 1:[25,4], 2:[12,36], 4:[25,26], 3:[38,33], 6:[22,45], 10:[30,55], 9:[26,59], 7:[14,60], 11:[40,55] },
  ball: { team: 'them', n: '7' },
  zones: [
    [22.9, 72.5, 2.1, 3, 'Pro spot', 'You got on the line between the ball and the middle of the goal. From that angle, that puts you closer to the near post, and both corners are covered.'],
    [22.9, 72.5, 3.2, 2, 'Close', 'Almost. Get right on the line between the ball and the middle of the goal.'],
    [26.5, 73.5, 1.4, 1, 'Near post open', 'You are too far across. The shot goes inside your near post.']
  ],
  elsewhere: P(1, 'Not quite', 'Get on the line between the ball and the middle of the goal.'),
  best: { kind: 'move', at: [22.9,72.5] } },

{ ch: 0, type: 'move', title: 'Tight angle',
  prompt: 'Their 7 dribbled almost to the end line on our left. Drag the keeper.',
  hint: 'From there, how much of the goal can the shooter see?',
  lesson: 'Tight angle? Guard your near post. The only shot is into that small gap, so close it, and watch for the cross.',
  us:   { 1:[25.5,73.2], 3:[12,66.5], 4:[24,69.5], 2:[33,67], 6:[25,58], 10:[23,44], 11:[9,50], 9:[26,32], 7:[40,46] },
  them: { 1:[25,4], 2:[12,40], 4:[25,28], 3:[37,36], 6:[22,48], 10:[29,60], 9:[26,65.5], 7:[11,70.5], 11:[40,58] },
  ball: { team: 'them', n: '7' },
  zones: [
    [22.5, 73.9, 1.9, 3, 'Pro spot', 'From that tight angle, you closed the gap at your near post. The only option is a cross, and you can see it coming.'],
    [22.5, 73.9, 2.6, 2, 'Close', 'Almost. Get right up against your near post.'],
    [25.5, 73.2, 1.2, 1, 'Near post open', 'You left a gap at the near post. From that angle, that is the only place to shoot.']
  ],
  elsewhere: P(1, 'Not quite', 'Guard your near post.'),
  best: { kind: 'move', at: [22.5,73.9] } },

{ ch: 0, type: 'move', title: 'Move with the ball',
  prompt: 'They just switched it to their 11 on our right, who is about to shoot. You were set for the other side. Drag the keeper.',
  hint: 'The ball moved. Where is the new line to the middle of the goal?',
  lesson: 'When the ball moves, you move. Every time, get back on the line between the ball and the middle of the goal.',
  us:   { 1:[23,72.6], 3:[16,62], 4:[27,62], 2:[36,63], 6:[24,52], 10:[21,40], 11:[9,46], 9:[26,30], 7:[41,44] },
  them: { 1:[25,4], 2:[12,36], 4:[25,26], 3:[37,35], 6:[22,44], 10:[30,50], 9:[24,58], 7:[12,55], 11:[37,58] },
  ball: { team: 'them', n: '11' },
  arrows: [{ team: 'them', from: [14,55.4], to: [35,57.6], dash: 1 }],
  zones: [
    [27, 72.5, 2.2, 3, 'Pro spot', 'The ball moved to the other side, so you moved too. You are back on the line between the ball and the middle of the goal.'],
    [27, 72.5, 3.2, 2, 'Close', 'Almost. Get right on the line between the ball and the middle of the goal.'],
    [23, 72.6, 1.4, 1, 'Still on the old side', 'The ball moved and you didn’t. The shot goes inside your near post.']
  ],
  elsewhere: P(1, 'Not quite', 'Get on the line between the ball and the middle of the goal.'),
  best: { kind: 'move', at: [27,72.5] } },

{ ch: 0, type: 'move', title: 'Get back',
  prompt: 'You came out to the edge of your box. Now their 6 has the ball with time, in shooting range. Drag the keeper.',
  hint: 'Can the shooter chip you from there?',
  lesson: 'Ball in shooting range? Get back toward your goal and get set before the shot.',
  us:   { 1:[25,62.5], 3:[15,58], 4:[25,58], 2:[35,58], 6:[24,53], 10:[23,42], 11:[9,40], 9:[26,30], 7:[41,40] },
  them: { 1:[25,4], 2:[12,33], 4:[25,25], 3:[38,33], 6:[25,49], 10:[31,54], 9:[21,55.5], 7:[9,52], 11:[41,52] },
  ball: { team: 'them', n: '6' },
  zones: [
    [25, 71, 2.4, 3, 'Pro spot', 'The ball was in shooting range, so you got back and got set a few yards off your line. Nothing goes over your head.'],
    [25, 70.5, 3.4, 2, 'Close', 'Almost. Get back to a few yards off your line, in the middle.'],
    [25, 62.5, 2.5, 0, 'Too far out', 'The shooter chips it over your head.']
  ],
  elsewhere: P(1, 'Not quite', 'Get back toward your goal.'),
  best: { kind: 'move', at: [25,71] } },

/* ---------------- 2. Sweep and support ---------------- */
{ ch: 1, type: 'move', title: 'Win the race',
  prompt: 'Their 6 just played a long ball over your defenders. Their 9 is chasing it. Drag the keeper.',
  hint: 'Who is closer to where the ball lands?',
  lesson: 'Ball over your defenders and you can get there first? Come out and win it. If you can’t, stay home and get set.',
  us:   { 1:[25,71], 3:[15,51], 4:[30,52.5], 2:[37,51], 6:[26,41.5], 10:[20,30], 11:[8,33], 9:[26,22], 7:[42,32] },
  them: { 1:[25,4], 2:[12,28], 4:[25,18], 3:[37,27], 6:[22,38], 10:[31,44], 9:[27,49], 7:[11,46], 11:[40,46] },
  ball: { team: 'them', n: '6' },
  arrows: [{ team: 'them', from: [22.2,40], to: [23.5,60.5], dash: 1 }, { team: 'them', from: [26.8,50.6], to: [25,55.6], dash: 1 }],
  zones: [
    [23.5, 62, 3, 3, 'Pro spot', 'The ball went over your defenders, and you were closer to it than their 9. You came out and won it before their 9 got there.'],
    [25, 71, 2.2, 1, 'Stayed home', 'You were closer than their 9, but you stayed home. Now their 9 gets it and goes one against one with you.'],
    [24, 54, 2.2, 0, 'Too far', 'You ran past where the ball lands, and now you are out of your box.']
  ],
  elsewhere: P(1, 'Not quite', 'Come out to where the ball lands.'),
  best: { kind: 'move', at: [23.5,62] } },

{ ch: 1, type: 'move', title: 'One against one',
  prompt: "Their 9 is through on goal with the ball. Your 4 is chasing but can't catch up. Drag the keeper.",
  hint: 'How do you make the goal look smaller?',
  lesson: "One against one? Come out to make the goal look smaller, then get set before the shot. Don't dive in too early.",
  us:   { 1:[25,73.8], 3:[13,55], 4:[26,52], 2:[37,55], 6:[25,46], 10:[24,36], 11:[9,38], 9:[26,24], 7:[41,36] },
  them: { 1:[25,4], 2:[12,32], 4:[25,20], 3:[37,30], 6:[22,40], 10:[30,48], 9:[24,57], 7:[10,50], 11:[40,50] },
  ball: { team: 'them', n: '9' },
  arrows: [{ team: 'them', from: [24,53], to: [24,56.4] }, { team: 'us', from: [26,50], to: [25.6,54], dash: 1 }],
  zones: [
    [24.3, 63.2, 2.5, 3, 'Pro spot', 'You came out along the line to the middle of the goal and got set before the shot. Now the goal looks tiny to their 9.'],
    [24.3, 64, 3.6, 2, 'Close', 'Good idea. Get right on the line between the ball and the middle of the goal, a few steps from the ball.'],
    [25, 73.8, 1.6, 1, 'On your line', 'On your line, the shooter has the whole goal to aim at.'],
    [24.1, 58.8, 1, 0, 'Dived in', 'You rushed right at their 9, who dribbles around you.']
  ],
  elsewhere: P(1, 'Not quite', 'Come out toward the ball, on the line to the middle of the goal.'),
  best: { kind: 'move', at: [24.3,63.2] } },

{ ch: 1, type: 'move', title: 'Support your defenders',
  prompt: 'Their 6 has the ball near the halfway line. Your defenders are holding a high line. Drag the keeper.',
  hint: 'What if they play it over your defenders?',
  lesson: 'Ball far away and our line is high? Step up toward the edge of your box. You can sweep up any ball played behind your defenders.',
  us:   { 1:[25,73.5], 3:[13,50], 4:[25,51], 2:[37,50], 6:[24,42], 10:[22,32], 11:[8,30], 9:[26,20], 7:[42,30] },
  them: { 1:[25,4], 2:[12,24], 4:[25,16], 3:[37,25], 6:[25,38], 10:[31,40], 9:[26,47], 7:[11,45], 11:[39,45] },
  ball: { team: 'them', n: '6' },
  zones: [
    [25, 63, 3, 3, 'Pro spot', 'The ball is far away and our line is high, so you stepped up. Any ball over your defenders is yours.'],
    [25, 64.5, 4.4, 2, 'Close', 'Good. Step up a little more, toward the edge of your box.'],
    [25, 73.5, 1.8, 1, 'On your line', 'There is a huge gap behind your defenders. A ball over them is a race you lose from there.'],
    [25, 55, 2.4, 0, 'Too far', 'Too far. A long shot goes over your head.']
  ],
  elsewhere: P(1, 'Not quite', 'Step up toward the edge of your box, in the middle.'),
  best: { kind: 'move', at: [25,63] } },

{ ch: 1, type: 'move', title: 'Give your 4 an angle',
  prompt: 'Your 4 is under pressure, facing our goal. The 4 wants to pass back to you. Drag the keeper.',
  hint: 'If the pass bobbles past you, where does it go?',
  lesson: 'Back pass coming? Move to the side of the goal, so a bad pass rolls wide instead of in.',
  us:   { 1:[25,74.3], 3:[12,57], 4:[25,58], 2:[38,57], 6:[25,47], 10:[23,34], 11:[7,34], 9:[26,22], 7:[43,34] },
  them: { 1:[25,4], 2:[12,28], 4:[25,18], 3:[38,28], 6:[21,38], 10:[25,43.5], 9:[25,54.5], 7:[13,52], 11:[37,52] },
  ball: { team: 'us', n: '4' },
  arrows: [{ team: 'them', from: [25.4,51.6], to: [25.1,54.2] }],
  zones: [
    [19.5, 70, 2.7, 3, 'Pro spot', 'You moved to the side of the goal. Your 4 has an easy pass, and if it goes wrong, it rolls wide of the goal, not into it.'],
    [30.5, 70, 2.7, 3, 'Pro spot', 'You moved to the side of the goal. Your 4 has an easy pass, and if it goes wrong, it rolls wide of the goal, not into it.'],
    [25, 74.3, 1.6, 1, 'In line with the goal', 'If the pass bobbles past you, it rolls straight into our goal.'],
    [25, 65, 2, 1, 'Too close to the 4', 'Too close. Their 9 can close you both down.']
  ],
  elsewhere: P(1, 'Not quite', 'Move to the side of the goal, for a safe pass.'),
  best: { kind: 'move', at: [19.5,70] } },

{ ch: 1, type: 'move', title: 'Breakaway from the side',
  prompt: 'Their 11 got past your 2 and is through on goal from our right. Drag the keeper.',
  hint: 'Draw a line from the ball to the middle of the goal, then come out along it.',
  lesson: 'Breakaway from an angle? Come out along the line between the ball and the middle of the goal. Close the gap, then get set.',
  us:   { 1:[25,74], 3:[13,57], 4:[24,58], 2:[37,56], 6:[27,48], 10:[24,34], 11:[8,36], 9:[26,24], 7:[42,40] },
  them: { 1:[25,4], 2:[12,30], 4:[25,20], 3:[37,34], 6:[22,38], 10:[30,44.5], 9:[21,54.5], 7:[10,52], 11:[34,60] },
  ball: { team: 'them', n: '11' },
  arrows: [{ team: 'them', from: [35.5,56.6], to: [34.3,59.6] }],
  zones: [
    [31.2, 64.8, 2.4, 3, 'Pro spot', 'You came out along the line between the ball and the middle of the goal and got set. The shooter has almost nothing to aim at.'],
    [31.2, 64.8, 3.4, 2, 'Close', 'Good idea. Get right on the line between the ball and the middle of the goal.'],
    [25, 74, 1.6, 1, 'On your line', 'On your line, the shooter has the whole goal to aim at.'],
    [26, 69, 1.5, 1, 'Off the angle', 'You came out, but not toward the ball. The shot goes inside your near post.']
  ],
  elsewhere: P(1, 'Not quite', 'Come out toward the ball, on the line to the middle of the goal.'),
  best: { kind: 'move', at: [31.2,64.8] } },

/* ---------------- 3. Crosses and set pieces ---------------- */
{ ch: 2, type: 'move', title: 'Cross from deep',
  prompt: 'Their 7 is about to cross from far out on our left. You are hugging the near post. Drag the keeper.',
  hint: 'Where can you get to both the near post and a cross into the middle?',
  lesson: 'Cross from far out? Stand in the middle of the goal, a few yards off your line, so you can come for it or get back.',
  us:   { 1:[22.2,73.6], 3:[11,52], 4:[25,64.5], 2:[35,62], 6:[26,55], 10:[23,42], 11:[8,42], 9:[26,30], 7:[41,40] },
  them: { 1:[25,4], 2:[11,35], 4:[25,26], 3:[37,34], 6:[22,46], 10:[30,58], 9:[24,61], 7:[5,46], 11:[38,55] },
  ball: { team: 'them', n: '7' },
  zones: [
    [25, 71.3, 2.3, 3, 'Pro spot', 'The cross is coming from far out, so you stood in the middle of the goal, a few yards off your line. You can come for it or get back.'],
    [25, 71.3, 3.4, 2, 'Close', 'Almost. Get to the middle of the goal, a few yards off your line.'],
    [22.2, 73.6, 1.2, 1, 'Near post', 'Hugging the near post leaves the middle and the back post open.']
  ],
  elsewhere: P(1, 'Not quite', 'Get to the middle of the goal, a few yards off your line.'),
  best: { kind: 'move', at: [25,71.3] } },

{ ch: 2, type: 'move', title: 'Free kick',
  prompt: 'Free kick to them. Your 3 and 6 made a wall to block the near side of the goal. Drag the keeper.',
  hint: 'The wall covers one side. Who covers the other?',
  lesson: 'Free kick? The wall covers the near side of the goal. You cover the rest, where you can see the ball.',
  us:   { 1:[22.5,73.8], 3:[16.5,63.2], 6:[19.9,62.2], 4:[26,66.5], 2:[33,64], 10:[25,44], 11:[10,52], 9:[26,32], 7:[41,48] },
  them: { 1:[25,4], 2:[12,40], 4:[25,28], 3:[37,40], 6:[25,48], 10:[16,55], 9:[22,66], 7:[10,62], 11:[36,60] },
  ball: { team: 'them', n: '10' },
  zones: [
    [26, 73.4, 1.9, 3, 'Pro spot', 'Your wall covers the near side, so you covered the rest of the goal, where you can see the ball.'],
    [26, 73.4, 2.8, 2, 'Close', 'Almost. The wall has the near side. Cover the rest.'],
    [22.5, 73.8, 1.2, 1, 'Behind the wall', "Behind your wall, you can't see the ball, and the far side is wide open."]
  ],
  elsewhere: P(1, 'Not quite', 'The wall covers the near side. Cover the rest of the goal.'),
  best: { kind: 'move', at: [26,73.4] } },

{ ch: 2, type: 'move', title: 'Corner kick',
  prompt: 'Corner kick to them from our left. You are squeezed against the near post. Drag the keeper.',
  hint: 'Where can you see the ball and still get to the back post?',
  lesson: 'On a corner, stand in the middle of your goal, a step toward the back post. You can see the ball and come for anything in your area.',
  us:   { 1:[22.4,74.2], 3:[21,70], 4:[27,65.5], 2:[33,70], 6:[24,62], 10:[21,52], 11:[10,56], 9:[25,40], 7:[40,52] },
  them: { 1:[25,6], 2:[12,46], 4:[25,30], 3:[38,40], 6:[24,58], 10:[30,68], 9:[24,68], 7:[0.5,74.5], 11:[36,64] },
  ball: { team: 'them', n: '7' },
  zones: [
    [26, 74, 1.9, 3, 'Pro spot', 'You stood in the middle of the goal, a step toward the back post. You can see the ball and reach anything in your area.'],
    [26, 74, 2.8, 2, 'Close', 'Almost. Get to the middle of the goal, a step toward the back post.'],
    [22.4, 74.2, 1.2, 1, 'Near post', 'Squeezed against the near post, you can’t get to a ball at the back post.']
  ],
  elsewhere: P(1, 'Not quite', 'Stand in the middle of your goal, a step toward the back post.'),
  best: { kind: 'move', at: [26,74] } },

{ ch: 2, type: 'move', title: 'The cutback',
  prompt: 'Their 7 is at the end line, cutting it back to their 10 near the penalty spot. You are at the near post. Drag the keeper.',
  hint: 'Who will shoot? Where should you be when the shot comes?',
  lesson: 'When the ball moves, you move. Get set in line with the new shooter before the shot.',
  us:   { 1:[22.3,74.1], 3:[11,69.5], 4:[19.5,65.5], 2:[32,67], 6:[27,60], 10:[24,48], 11:[12,54], 9:[26,36], 7:[40,50] },
  them: { 1:[25,4], 2:[12,45], 4:[25,32], 3:[37,42], 6:[25,52], 10:[23,64.5], 9:[19,69.5], 7:[9,73], 11:[37,63] },
  ball: { team: 'them', n: '7' },
  arrows: [{ team: 'them', from: [9.8,72.4], to: [21.6,65.2], dash: 1 }],
  zones: [
    [24.5, 72.4, 1.75, 3, 'Pro spot', 'The ball moved, so you moved. You got set in line with their 10 before the shot.'],
    [24.5, 72.4, 2.6, 2, 'Close', 'Almost. Get right in line between their 10 and the middle of the goal.'],
    [22.3, 74.1, 1, 1, 'Still at the near post', "The ball moved and you didn't. The shot goes into the far side."]
  ],
  elsewhere: P(1, 'Not quite', 'Get in line between the new shooter and the middle of the goal.'),
  best: { kind: 'move', at: [24.5,72.4] } },

{ ch: 2, type: 'move', title: 'Come for it',
  prompt: 'Their 11 floated a cross from our right. It is dropping about six yards out, and their 9 is running in. Drag the keeper.',
  hint: 'Where will it land? Who can get there first?',
  lesson: "Cross dropping in your area? Come and catch it at its highest point. Shout 'Keeper!' so your teammates know.",
  us:   { 1:[27,74], 3:[16,64], 4:[29,63], 2:[38,61], 6:[26,55], 10:[25,42], 11:[10,46], 9:[26,32], 7:[40,46] },
  them: { 1:[25,4], 2:[12,38], 4:[25,28], 3:[37,38], 6:[23,46], 10:[30,58], 9:[20,63], 7:[10,58], 11:[44,56] },
  ball: { team: 'them', n: '11' },
  arrows: [{ team: 'them', from: [42.5,57], to: [26.2,68.8], dash: 1 }, { team: 'them', from: [20.4,63.6], to: [22.6,66.6], dash: 1 }],
  zones: [
    [25, 69.4, 2.4, 3, 'Pro spot', 'The cross was dropping in your area, so you came and caught it before their 9 could get there.'],
    [25, 69.6, 3.4, 2, 'Close', 'Good. Come right to where it lands.'],
    [27, 74, 1.6, 1, 'Stayed home', 'It dropped six yards out, in your area, and their 9 got there first.']
  ],
  elsewhere: P(1, 'Not quite', 'Come for it where it lands.'),
  best: { kind: 'move', at: [25,69.4] } },

/* ---------------- 4. Start the attack ---------------- */
{ ch: 3, type: 'ball', title: 'Find the free back',
  prompt: 'You made a save and have the ball. Their 9 is on your 4, and their 11 is on your 2.',
  hint: 'Who is free close to you?',
  lesson: 'After a save, look for the free defender close to you first. A short pass keeps the ball.',
  us:   { 1:[25,69.5], 3:[6,62], 4:[25,62], 2:[42,61], 6:[22,52], 10:[24,40], 11:[7,40], 9:[26,26], 7:[43,40] },
  them: { 1:[25,4], 2:[11,34], 4:[25,22], 3:[38,34], 6:[27,44], 10:[23,48.5], 9:[26,58], 7:[15,54], 11:[40,57] },
  ball: '1',
  pass: {
    3:  P(3, 'Pro choice', 'Your 3 split wide and nobody was near, so you gave it to the 3. Short, simple, and we keep the ball.'),
    4:  P(1, 'Pressed', 'Their 9 is right on your 4.'),
    2:  P(1, 'Marked', 'Their 11 is ready to jump on your 2.'),
    6:  P(1, 'Marked', 'Their 10 is right on your 6.'),
    10: LONG('A long kick into a crowd. Your 3 was free and closer.'),
    11: LONG('A long kick up the line is a 50-50. Your 3 was free and closer.'),
    7:  LONG('A long kick up the line is a 50-50. Your 3 was free and closer.'),
    9:  LONG('A long kick to your 9 with their 4 right there is a 50-50. Your 3 was free.')
  },
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Look for the free teammate close to you.'),
  best: { kind: 'pass', to: '3' } },

{ ch: 3, type: 'ball', title: 'Into the 6',
  prompt: 'You have the ball. Their 9 is on your 4, and their wingers are on your 3 and 2.',
  hint: 'Who dropped into the space in front of you?',
  lesson: 'Wide backs marked? Look for your 6. A pass into the middle beats their press.',
  us:   { 1:[25,70], 3:[11,61], 4:[25,62.5], 2:[39,61], 6:[29,54], 10:[24,40], 11:[7,40], 9:[26,26], 7:[43,40] },
  them: { 1:[25,4], 2:[11,33], 4:[25,22], 3:[38,33], 6:[27,43.5], 10:[20,46], 9:[24,59], 7:[13,56.5], 11:[37,56.5] },
  ball: '1',
  pass: {
    6:  P(3, 'Pro choice', 'Your defenders were all marked, so you found your 6 in the space in front of you. One pass and their press is beaten.'),
    4:  P(1, 'Pressed', 'Their 9 is right on your 4.'),
    3:  P(1, 'Marked', 'Their 7 is ready to jump on your 3.'),
    2:  P(1, 'Marked', 'Their 11 is ready to jump on your 2.'),
    10: LONG('A long kick into a crowd. Your 6 was free and closer.'),
    11: LONG('A long kick up the line is a 50-50. Your 6 was free and closer.'),
    7:  LONG('A long kick up the line is a 50-50. Your 6 was free and closer.'),
    9:  LONG('A long kick to your 9 with their 4 right there is a 50-50. Your 6 was free.')
  },
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Look for the free teammate close to you.'),
  best: { kind: 'pass', to: '6' } },

{ ch: 3, type: 'ball', title: 'Roll it in front',
  prompt: 'You have the ball. Your 2 is free on the right, and their 11 is way inside.',
  hint: 'Is there grass in front of your 2?',
  lesson: 'Free teammate with grass ahead? Roll it into the space in front, to run onto facing forward.',
  us:   { 1:[25,70], 3:[11,61], 4:[25,62.5], 2:[41,62], 6:[24,52], 10:[25,40], 11:[7,40], 9:[26,26], 7:[43,38] },
  them: { 1:[25,4], 2:[11,33], 4:[25,22], 3:[37,30], 6:[27,44], 10:[21,48], 9:[24.5,58.5], 7:[13,56.5], 11:[31,55] },
  ball: '1',
  pass: {
    2:  P(2, 'Good', 'The 2 is free, but there is open grass ahead. Roll it into that space to run onto.'),
    3:  P(1, 'Marked', 'Their 7 is ready to jump on your 3.'),
    4:  P(1, 'Pressed', 'Their 9 is right on your 4.'),
    6:  P(0, 'Intercepted', 'Their 9 is standing in that lane.', { cut: '9' }),
    10: LONG('A long kick into a crowd. Your 2 was free and closer.'),
    11: LONG('A long kick up the line is a 50-50. Your 2 was free and closer.'),
    7:  LONG('A long kick up the line is a 50-50. Your 2 was free and closer.'),
    9:  LONG('A long kick to your 9 with their 4 right there is a 50-50. Your 2 was free.')
  },
  lead: [
    [42, 52, 3.5, 3, 'Pro choice', 'Your 2 was free with open grass ahead, so you rolled it into the space ahead. The 2 runs onto it facing forward.', '2', null, true]
  ],
  leadNote: 'Your 2 has open grass ahead. Play it into that space.',
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Your 2 is free. Use that.'),
  best: { kind: 'pass', to: '2', at: [42,52] } },

{ ch: 3, type: 'ball', title: 'Over the press', air: true,
  prompt: 'Their whole team is pressing. Their defenders pushed up near the halfway line.',
  hint: 'Where is the space?',
  lesson: 'Everyone marked and their defenders pushed up? Kick it long into the space behind them for your 9.',
  us:   { 1:[25,70], 3:[11,61], 4:[25,62.5], 2:[39,61], 6:[27,53], 10:[20,45], 11:[7,40], 9:[25,38.5], 7:[43,40] },
  them: { 1:[25,10], 2:[10,43.5], 4:[29,41], 3:[40,43.5], 6:[21,49.5], 10:[28,49], 9:[24.5,58.5], 7:[13,56.5], 11:[37,56.5] },
  ball: '1',
  pass: {
    4:  P(1, 'Pressed', 'Their 9 is right on your 4.'),
    3:  P(1, 'Marked', 'Their 7 is ready to jump on your 3.'),
    2:  P(1, 'Marked', 'Their 11 is ready to jump on your 2.'),
    6:  P(1, 'Marked', 'Their 10 is right on your 6.'),
    9:  P(1, 'To feet?', 'Their 4 is right behind your 9. The space is behind their defenders.'),
    10: P(1, 'Marked', 'Their 6 is right on your 10.'),
    11: P(1, 'Marked', 'Their 2 is right on your 11.'),
    7:  P(1, 'Marked', 'Their 3 is right on your 7.')
  },
  lead: [
    [24, 25, 5, 3, 'Pro choice', 'Everyone was marked and their defenders pushed up, so you kicked it long into the space behind them. Your 9 runs onto it.', '9', null, true],
    [25, 14, 3, 1, 'Overhit', 'Too long. Their keeper comes out and grabs it.', '9', '1']
  ],
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Everyone is marked. Where is the space?'),
  best: { kind: 'pass', to: '9', at: [24,25] } },

{ ch: 3, type: 'ball', title: 'Start the counter', air: true,
  prompt: 'You caught a cross. Their players are still in our box, and your 11 is already sprinting up the wing.',
  hint: 'Their team is in our box. Where is the space?',
  lesson: 'Caught it and their team is caught forward? Start the counter fast. Throw it into the space in front of your runner.',
  us:   { 1:[23,70], 3:[13,64], 4:[25,63], 2:[35,64], 6:[22,55], 10:[26,46], 11:[8,46], 9:[27,34], 7:[42,44] },
  them: { 1:[25,4], 2:[14,50], 4:[26,30], 3:[38,36], 6:[26,50], 10:[28,58.5], 9:[21,66], 7:[10,58.5], 11:[38,59] },
  ball: '1',
  arrows: [{ team: 'us', from: [8,44.5], to: [7.4,39], dash: 1 }],
  pass: {
    11: P(2, 'Good', 'Quick thinking, but the 11 is sprinting into space. Throw it in front of the run.'),
    6:  P(1, 'Too slow', 'Safe, but their players get back. Your 11 was already away.'),
    3:  P(1, 'Too slow', 'Safe, but their whole team is still in our box. Start the counter.'),
    4:  P(1, 'Too slow', 'Safe, but their whole team is still in our box. Start the counter.'),
    2:  P(1, 'Too slow', 'Safe, but their whole team is still in our box. Start the counter.'),
    10: P(1, 'Marked', 'Their 6 is right on your 10.'),
    9:  P(1, 'Long and marked', 'Their 4 is on your 9. Your 11 is the one running into space.')
  },
  lead: [
    [7, 33, 4, 3, 'Pro choice', 'Their team was still in our box, so you threw it straight into the space in front of your 11. The counter is on.', '11', null, true]
  ],
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Start the counter. Find your 11.'),
  best: { kind: 'pass', to: '11', at: [7,33] } },

/* ---------------- 5. Ball at your feet ---------------- */
{ ch: 4, type: 'ball', title: 'Clear it',
  prompt: 'Your 4 passed it back to you. Their 9 is sprinting at you, and everyone near you is marked.',
  hint: 'Is there a safe pass? If not, where is safe?',
  lesson: 'Under pressure with no safe pass? Clear it high and wide, away from our goal. Never across the middle.',
  us:   { 1:[23,71], 3:[12,64], 4:[30,63], 2:[38,60], 6:[26,55], 10:[22,45], 11:[7,44], 9:[26,34], 7:[43,44] },
  them: { 1:[25,4], 2:[13,32], 4:[25,30], 3:[38,36], 6:[23,50], 10:[31,59], 9:[23.5,66.4], 7:[12,59.5], 11:[39,55.5] },
  ball: '1',
  arrows: [{ team: 'them', from: [23.9,63.6], to: [23.6,66] }],
  pass: {
    3:  P(0, 'Pressed', 'Their 7 is right on your 3.'),
    4:  P(1, 'Risky', 'Their 9 and 10 are right there. One bad touch and it is a goal.'),
    6:  P(0, 'Intercepted', 'Their 9 is right in that lane.', { cut: '9' }),
    2:  P(1, 'Across our goal', 'A pass across the front of our goal with their 9 and 10 close? Too risky.')
  },
  lead: [
    [8, 40, 4.5, 3, 'Pro choice', 'Their 9 was closing you down and nobody was free, so you cleared it high and wide toward your 11. Away from danger.', '11', null, true],
    [42, 40, 4.5, 2, 'Good', 'Cleared, but it flies across the front of our goal, past their 10.', '7', null, true],
    [25, 42, 4, 1, 'Up the middle', 'Straight up the middle, their 6 wins it and they attack again.', '10', '6']
  ],
  shoot: null,
  carry: [],
  elsewhere: P(0, 'Too risky', 'Dribbling past their 9 in front of our goal? If you lose it, it is a goal.'),
  best: { kind: 'pass', to: '11', at: [8,40] } },

{ ch: 4, type: 'ball', title: 'Take your time',
  prompt: 'Your 4 passed it back to you. Nobody is pressing you.',
  hint: 'You have time. Who is free?',
  lesson: "No pressure? Don't just kick it away. Take your time and pass to a free teammate.",
  us:   { 1:[25,71], 3:[8,62], 4:[25,62], 2:[41,61], 6:[24,51], 10:[25,40], 11:[7,40], 9:[26,26], 7:[43,40] },
  them: { 1:[25,4], 2:[11,34], 4:[25,22], 3:[38,34], 6:[27,36.5], 10:[24,47.5], 9:[25,58.5], 7:[15,52], 11:[38,56.5] },
  ball: '1',
  pass: {
    3:  P(3, 'Pro choice', 'Nobody was pressing you, so you took your time and passed to your 3. The 3 is free, and we keep the ball.'),
    4:  P(1, 'Marked', 'Their 9 is right on your 4.'),
    2:  P(1, 'Marked', 'Their 11 is close to your 2.'),
    6:  P(0, 'Intercepted', 'Their 9 is standing in that lane.', { cut: '9' }),
    9:  LONG('A long kick to your marked 9 is a 50-50. You had time and a free teammate.'),
    10: LONG('A long kick into a crowd. You had time and a free teammate.'),
    11: LONG('A long kick up the line is a 50-50. You had time and a free teammate.'),
    7:  LONG('A long kick up the line is a 50-50. You had time and a free teammate.')
  },
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'You have time. Find the free teammate.'),
  best: { kind: 'pass', to: '3' } },

{ ch: 4, type: 'ball', title: 'Away from pressure',
  prompt: 'You have the ball at your feet. Their 9 is running at you from your right.',
  hint: 'Which side is their 9 coming from?',
  lesson: 'Play away from pressure. If pressure comes from your right, look left.',
  us:   { 1:[25,71], 3:[9,62], 4:[25,62], 2:[41,61], 6:[25,51], 10:[25,40], 11:[7,40], 9:[26,26], 7:[43,40] },
  them: { 1:[25,4], 2:[11,34], 4:[25,22], 3:[38,34], 6:[27,36.5], 10:[24,47.5], 9:[29.5,66.5], 7:[16,53], 11:[38,56] },
  ball: '1',
  arrows: [{ team: 'them', from: [31.4,63.8], to: [29.8,66.2] }],
  pass: {
    3:  P(3, 'Pro choice', 'Their 9 came from your right, so you played it left to your 3. Away from pressure.'),
    2:  P(0, 'Intercepted', 'Their 9 is coming from that side and steps into the pass.', { cut: '9' }),
    4:  P(1, 'Into the pressure', 'Their 9 is coming from that side and can jump on your 4.'),
    6:  P(1, 'Marked', 'Their 10 is right behind your 6.'),
    9:  LONG('A long kick is a 50-50. Your 3 was free and closer.'),
    10: LONG('A long kick into a crowd. Your 3 was free and closer.'),
    11: LONG('A long kick up the line is a 50-50. Your 3 was free and closer.'),
    7:  LONG('A long kick up the line is a 50-50. Your 3 was free and closer.')
  },
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Their 9 is coming. Move the ball away from the press.'),
  best: { kind: 'pass', to: '3' } },

{ ch: 4, type: 'ball', title: 'Not across your goal',
  prompt: 'Your 2 passed it back to you. Their 9 is chasing from the other side of the box.',
  hint: 'Which pass goes across our goal?',
  lesson: "Never pass across your own goal. Play it to the side you're on, away from their striker.",
  us:   { 1:[31.5,71], 3:[9,61], 4:[22,62], 2:[45,63], 6:[26,52], 10:[26,40], 11:[7,40], 9:[24,26], 7:[43,42] },
  them: { 1:[25,4], 2:[12,34], 4:[25,22], 3:[38,34], 6:[28,36.5], 10:[23,48.5], 9:[25,66.5], 7:[12,56], 11:[38,53] },
  ball: '1',
  arrows: [{ team: 'them', from: [23,64], to: [24.7,66.2] }],
  pass: {
    2:  P(3, 'Pro choice', 'Their 9 was coming from the other side, so you played it to your 2 on your side. Never across your goal.'),
    3:  P(0, 'Across our goal', 'A pass across the front of our goal, right past their 9. If their 9 cuts it out, it is a goal.', { cut: '9' }),
    4:  P(0, 'Intercepted', 'Their 9 is right in that lane.', { cut: '9' }),
    6:  P(1, 'Risky', 'Through the middle, with their 9 and 10 close by.'),
    9:  LONG('A long kick is a 50-50. Your 2 was free and closer.'),
    10: LONG('A long kick into a crowd. Your 2 was free and closer.'),
    11: LONG('A long kick is a 50-50. Your 2 was free and closer.'),
    7:  LONG('A long kick up the line is a 50-50. Your 2 was free and closer.')
  },
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Find the free teammate on your side.'),
  best: { kind: 'pass', to: '2' } },

{ ch: 4, type: 'ball', title: "Where the 6 is going",
  prompt: 'You have the ball. Your 6 is spinning away from their 10 into open space.',
  hint: 'Where will your 6 be when the ball gets there?',
  lesson: 'Teammate getting away from a marker? Pass to where the run is going, not where it started.',
  us:   { 1:[25,70], 3:[11,61], 4:[25,62.5], 2:[39,61], 6:[25,51], 10:[25,38], 11:[7,38], 9:[26,24], 7:[43,38] },
  them: { 1:[25,4], 2:[11,31], 4:[25,20.5], 3:[38,31], 6:[27,34.5], 10:[28,48.5], 9:[29,59], 7:[13,56.5], 11:[37,56.5] },
  ball: '1',
  arrows: [{ team: 'us', from: [24.6,50.6], to: [20.8,50.6], dash: 1 }],
  pass: {
    6:  P(1, 'Behind the run', "The 6 is moving away from their 10. A pass to the old spot arrives with their 10 still right there."),
    3:  P(1, 'Marked', 'Their 7 is ready to jump on your 3.'),
    2:  P(1, 'Marked', 'Their 11 is ready to jump on your 2.'),
    4:  P(1, 'Pressed', 'Their 9 is close to your 4.'),
    9:  LONG('A long kick is a 50-50. Your 6 just got free.'),
    10: LONG('A long kick into a crowd. Your 6 just got free.'),
    11: LONG('A long kick up the line is a 50-50. Your 6 just got free.'),
    7:  LONG('A long kick up the line is a 50-50. Your 6 just got free.')
  },
  lead: [
    [20, 50.5, 2.8, 3, 'Pro choice', 'Your 6 was moving away from their 10, so you passed to where the 6 was going. The 6 gets it in space, facing forward.', '6', null, true]
  ],
  leadNote: "Your 6 is moving into space. Play it to where the 6 is going.",
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Your 6 is getting free. Pass to where the 6 is going.'),
  best: { kind: 'pass', to: '6', at: [20,50.5] } },

/* ---------------- 6. Read the game ---------------- */
{ ch: 5, type: 'move', title: 'Stay home',
  prompt: 'Their 7 crossed it from deep. It is dropping near the penalty spot, in a crowd of players. Drag the keeper.',
  hint: 'Can you get there first? If not, where should you be?',
  lesson: 'Only come for a cross you can win. If it is far away and crowded, stay home and get set in the middle of your goal.',
  us:   { 1:[22.2,74.2], 3:[9,64], 4:[26,61.5], 2:[31,68], 6:[22,57], 10:[25,44], 11:[8,50], 9:[26,32], 7:[41,46] },
  them: { 1:[25,4], 2:[12,40], 4:[25,28], 3:[37,38], 6:[25,48], 10:[28,65.5], 9:[22,63], 7:[6,60], 11:[38,58] },
  ball: { team: 'them', n: '7' },
  arrows: [{ team: 'them', from: [7.6,60.6], to: [23.4,64.4], dash: 1 }],
  zones: [
    [25, 72.8, 2, 3, 'Pro spot', 'It was dropping far out, in a crowd. You stayed home and got set in the middle of the goal, ready for the header.'],
    [25, 72.8, 2.6, 2, 'Close', 'Almost. Get set right in the middle of the goal.'],
    [24.5, 65, 2.5, 0, 'Came for it', "Too far and too crowded. You won't get there, and the goal is empty."],
    [22.2, 74.2, 1, 1, 'Near post', 'The cross is going to the middle. You are stuck at the near post.']
  ],
  elsewhere: P(1, 'Not quite', 'Stay home and get set in the middle of the goal.'),
  best: { kind: 'move', at: [25,72.8] } },

{ ch: 5, type: 'move', title: 'Reset',
  prompt: 'We headed the corner away, but their 6 got the ball at the edge of our box. You are still at the near post. Drag the keeper.',
  hint: 'Where is the ball now? Get in line with it.',
  lesson: 'After every clearance, reset fast. Get on the line between the ball and the middle of the goal before the shot.',
  us:   { 1:[22,74], 3:[18,66], 4:[25,63.5], 2:[34,66], 6:[29,58], 10:[22,52], 11:[8,48], 9:[26,40], 7:[42,50] },
  them: { 1:[25,4], 2:[12,40], 4:[25,36], 3:[37,42], 6:[32,55], 10:[27,67], 9:[21,69.5], 7:[12,60], 11:[37.5,62] },
  ball: { team: 'them', n: '6' },
  zones: [
    [26.2, 72, 2.1, 3, 'Pro spot', 'The ball moved, so you reset fast. You are on the line between the ball and the middle of the goal before the shot.'],
    [26.2, 72, 3, 2, 'Close', 'Almost. Get right on the line between the ball and the middle of the goal.'],
    [22, 74, 1.2, 1, 'Still at the near post', 'The ball moved and you didn’t. The shooter has the far side of the goal to aim at.']
  ],
  elsewhere: P(1, 'Not quite', 'Get on the line between the ball and the middle of the goal.'),
  best: { kind: 'move', at: [26.2,72] } },

{ ch: 5, type: 'ball', title: 'Switch it',
  prompt: 'You caught a cross from our left. Their players are all on that side.',
  hint: 'Where are their players? Where are they not?',
  lesson: "Caught it on one side? Look to the other side. That's where the space is.",
  us:   { 1:[22,70], 3:[12,63], 4:[25,62], 2:[41,60], 6:[22,54], 10:[26,44], 11:[8,48], 9:[27,34], 7:[42,44] },
  them: { 1:[25,4], 2:[12,40], 4:[25,30], 3:[37,38], 6:[24,49], 10:[21,59], 9:[18,64], 7:[9,58], 11:[30,56] },
  ball: '1',
  pass: {
    2:  P(3, 'Pro choice', 'Their players were all on the side of the cross, so you switched it to your 2. The 2 is free, with space to run into.'),
    3:  P(0, 'Intercepted', 'Their 9 is right there.', { cut: '9' }),
    4:  P(1, 'Crowded', 'Their 10 and 9 are close to your 4. The space is on the other side.'),
    6:  P(1, 'Crowded', 'Their 10 and 6 are around your 6.'),
    9:  LONG('A long kick is a 50-50. Your 2 was free.'),
    10: LONG('A long kick into a crowd. Your 2 was free.'),
    11: LONG('A long kick up the line is a 50-50. Your 2 was free.'),
    7:  LONG('A long kick up the line is a 50-50. Your 2 was free.')
  },
  shoot: null,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Look to the other side.'),
  best: { kind: 'pass', to: '2' } },

{ ch: 5, type: 'move', title: 'Meet the ball',
  prompt: 'Your 4 played a slow back pass to you, and their 9 is sprinting to get it. Drag the keeper.',
  hint: 'Who gets to the ball first if you wait?',
  lesson: "Slow back pass with a striker chasing? Come to meet the ball. Don't wait for it.",
  us:   { 1:[25,74], 3:[12,60], 4:[24,57], 2:[38,60], 6:[25,46], 10:[24,34], 11:[7,34], 9:[26,22], 7:[42,34] },
  them: { 1:[25,4], 2:[12,28], 4:[25,18], 3:[37,28], 6:[21,37], 10:[28,43], 9:[31,60], 7:[10,55], 11:[40,55] },
  ball: { team: 'us', n: '4' },
  arrows: [{ team: 'us', from: [24.2,59], to: [24.5,66.4], dash: 1 }, { team: 'them', from: [30.4,61], to: [27,65.4], dash: 1 }],
  zones: [
    [24.6, 67.5, 2.5, 3, 'Pro spot', 'The back pass was slow and their 9 was chasing it, so you came to meet the ball. You get there first.'],
    [24.6, 68.5, 3.4, 2, 'Close', 'Good. Come all the way to the ball.'],
    [25, 74, 1.8, 1, 'Waited', 'You waited on your line, and their 9 got to the ball first.']
  ],
  elsewhere: P(1, 'Not quite', 'Come to meet the ball.'),
  best: { kind: 'move', at: [24.6,67.5] } },

{ ch: 5, type: 'move', title: 'Let your 3 have it',
  prompt: 'Their 6 played a long ball toward our left corner. Their 7 is chasing it, but your 3 is ahead. Drag the keeper.',
  hint: 'Who will get there first? Do you need to leave the goal?',
  lesson: "Don't leave your goal for a ball your defender can handle. Get set by your near post in case it goes wrong.",
  us:   { 1:[25,69.5], 3:[12,58], 4:[24,60], 2:[36,60], 6:[24,48], 10:[22,35], 11:[9,40], 9:[26,24], 7:[42,38] },
  them: { 1:[25,4], 2:[12,32], 4:[25,20], 3:[37,32], 6:[20,40], 10:[28,45], 9:[27,56], 7:[9,53], 11:[39,54] },
  ball: { team: 'them', n: '6' },
  arrows: [{ team: 'them', from: [19,42], to: [10.4,63], dash: 1 }, { team: 'them', from: [9,54], to: [9.6,58.4], dash: 1 }],
  zones: [
    [22.6, 73, 2, 3, 'Pro spot', 'Your 3 was ahead of their 7, so you stayed home and got set near your near post, in case their 7 gets past.'],
    [22.6, 73, 3, 2, 'Close', 'Almost. Get set close to your near post.'],
    [11.5, 64.5, 3, 0, 'Rushed out', 'You left the goal for a ball your 3 can handle. If their 7 gets there first, the goal is empty.'],
    [25, 69.5, 1.4, 1, 'Off your angle', 'The ball is going toward your near post side. Get over there and get set.']
  ],
  elsewhere: P(1, 'Not quite', 'Stay home. Get set near your near post.'),
  best: { kind: 'move', at: [22.6,73] } }
];

window.RIDDLE_LIB.defineSet({ me: '1', chapters: CHAPTERS, riddles: RIDDLES });
})();
