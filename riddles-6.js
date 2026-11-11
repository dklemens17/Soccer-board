/* Riddles for the 6 (defensive midfielder) — scenario data.

   Field coordinates are in yards on a 50 x 75 yard 9v9 field.
   x: 0 = our left touchline, 50 = our right touchline.
   y: 0 = their goal line (top of the screen), 75 = our goal line.
   We attack up the screen. Our numbers: 1 GK, 3-4-2 back three, 6, 10, 11-9-7.

   type 'ball'  — the 6 has the ball: tap a teammate (pass), drag the 6 (dribble) or shoot.
   type 'move'  — the 6 does not have the ball: drag the 6 to the best spot.

   Passing is done by dragging the ball. Releasing it on a teammate is a pass to feet;
   releasing it in open grass is a pass into space.
   Every answer is { g: stars 0-3, t: short verdict, w: why }.
   pass[n]       — verdict for a pass to that teammate's feet. pass[n].cut — their player who intercepts it.
   lead          — passes into space: [x, y, radius, stars, verdict, why, receiver, (their player who wins it)].
                   A space pass outside every lead zone is judged by the page: is a defender in the lane,
                   does one of theirs get there first, and does making the runner go there help?
   leadNote      — optional coaching line used when a space pass to an unlisted spot doesn't help.
   zones / carry — [x, y, radius, stars, verdict, why]; the best zone containing the drop wins.
                   Pro (3 stars) needs the player inside its circle. A drop outside every zone but within
                   2 yards of a 3- or 2-star zone counts as Good (2 stars), as long as it doesn't step
                   offside or into a blocked passing lane when the zone's center doesn't. Name a nearby
                   mistake (offside, hidden, too close) as its own 0- or 1-star zone and it keeps its grade.
   elsewhere     — verdict for a drop outside every zone.
   follow        — their players who stay with the 6 when the 6 moves (shown after the answer).
   payoff        — after a good off-ball move, who the ball is played to (default: the 6).
   motion        — optional: the build-up before the puzzle and what happens after each answer,
                   played like a tactics video. Format at the top of riddles-motion.js. The motions for
                   this file are at the bottom, matched to puzzles by title.
*/
(function () {
const P = (g, t, w, extra) => Object.assign({ g, t, w }, extra || {});
const TOO_SAFE = w => P(1, 'Too safe', w);
const FAR = P(0, 'Out of range', 'Way too far from goal. Keep the ball and build the attack.');

const CHAPTERS = [
  { name: 'Find the free player', blurb: 'You have the ball. Pick the best pass.' },
  { name: 'Get open', blurb: 'A teammate has the ball. Move so the pass can reach you.' },
  { name: 'Guard the middle', blurb: 'They have the ball. Protect the space in front of our defenders.' },
  { name: 'Ball won, ball lost', blurb: 'The ball just changed teams. React fast.' },
  { name: 'Beat the press', blurb: 'They are pressing hard. Stay calm and find the way out.' },
  { name: 'Final third', blurb: 'Near their goal: pass, arrive, or shoot.' }
];

const RIDDLES = [
/* ---------------- 1. Find the free player ---------------- */
{ ch: 0, type: 'ball', title: 'Play forward',
  prompt: "You're the 6 and you have the ball. Nobody is pressing you. Who gets your pass?",
  hint: 'Look forward first. Who is free in the middle of the field?',
  lesson: 'Forward if you can. Sideways if you should. Backward if you must.',
  us:   { 1:[25,72], 3:[12,60], 4:[25,61], 2:[38,60], 6:[25,47], 10:[25,31], 11:[6,34], 9:[26,20], 7:[44,34] },
  them: { 1:[25,3], 2:[13,17], 4:[25,15], 3:[37,17], 6:[35,27], 10:[18,41], 9:[21,57], 7:[10,44], 11:[40,45] },
  ball: '6',
  pass: {
    10: P(3, 'Pro choice', "Your 10 is free and standing still between their lines, so play it firmly to feet. The 10 turns and faces their goal."),
    7:  P(2, 'Good', 'The 7 is open, but going wide is slower. The pass to the 10 cuts through their midfield in one go.'),
    9:  P(1, 'Risky', 'A long pass to a player with a defender right behind. The 10 was free and closer.'),
    11: P(0, 'Intercepted', 'Their 10 is standing in that passing lane. That ball gets cut out.', { cut: '10' }),
    4:  TOO_SAFE('Safe, but you had time and a free teammate in front of you.'),
    3:  TOO_SAFE('Sideways and backwards when your 10 was free in front of you.'),
    2:  TOO_SAFE('Sideways and backwards when your 10 was free in front of you.'),
    1:  TOO_SAFE('Back to the keeper with nobody pressing you? Your 10 was free.')
  },
  lead: [
    [25, 24, 3.5, 1, 'Too far ahead', 'Your 10 was free right there. Play it ahead and their 4 steps up to win it.', '10', '4'],
    [44, 25, 4.5, 2, 'Good', 'Leading your 7 down the line works: the 7 is free with space in front. But the pass to the 10 cuts through their midfield.', '7']
  ],
  leadNote: 'Your 10 is free and standing still. Play it to feet.',
  shoot: P(0, 'Out of range', "That's nearly 50 yards. Keep the ball and build the attack."),
  carry: [[25, 40, 6, 2, 'Okay', 'Dribbling into space is fine when nobody presses you, but the pass to the 10 gets there faster.']],
  elsewhere: P(1, 'Not quite', 'You have time, so use it to find the free teammate.'),
  best: { kind: 'pass', to: '10' } },

{ ch: 0, type: 'ball', title: 'Switch it',
  prompt: 'You got the ball from your 2. Their players have all moved to the right side. Where does it go?',
  hint: 'Where are their players? Where are they NOT? And is there grass in front of your teammate?',
  lesson: 'When they all crowd one side, switch it. If your teammate has open grass ahead, play it into that space.',
  us:   { 1:[25,72], 3:[10,58], 4:[24,62], 2:[39,57], 6:[24,48], 10:[30,33], 11:[5,30], 9:[28,19], 7:[45,32] },
  them: { 1:[25,3], 2:[17,17], 4:[27,15], 3:[37,17], 6:[31,29], 10:[30,45], 9:[33,54], 7:[19,33], 11:[42,28] },
  ball: '6',
  arrows: [{ team: 'them', from: [30,45], to: [27.2,46.4] }],
  pass: {
    11: P(2, 'Good', "Great switch! But there's open grass in front of the 11. Play it into that space for a run onto it at full speed."),
    3:  P(2, 'Good', 'Smart switch, away from the crowd. But your 11 was free higher up the field, which saves a pass.'),
    4:  TOO_SAFE('Safe, but the open space is on the left. Look for the switch.'),
    2:  P(0, 'Intercepted', 'That goes straight back toward their 9. Their 9 steps in and takes it.', { cut: '9' }),
    10: P(0, 'Crowded', "Their 6 is right on your 10 and their 10 is close to the lane. That's passing into the crowd."),
    7:  P(0, 'Crowded', 'Their 11 is right on your 7, and their 3 and 6 are close. The right side is jammed.'),
    9:  P(0, 'Marked', 'A long pass through the middle to a marked 9. It won’t stick.'),
    1:  TOO_SAFE('Back to the keeper when your 11 is wide open? Switch it instead.')
  },
  lead: [
    [6.5, 23.5, 5, 3, 'Pro choice', 'You switched it into the open grass in front of your 11. The 11 runs onto it at full speed with nobody near.', '11'],
    [9, 12.5, 4, 1, 'Overhit', 'Too far. Their 2 gets there before your 11.', '11', '2']
  ],
  shoot: FAR,
  carry: [[14, 44, 7, 2, 'Okay', 'Dribbling toward the space works, but the ball travels faster than you. Switch it with a pass.']],
  elsewhere: P(1, 'Not quite', 'Dribbling into their side of the field takes you toward the crowd. The space is on the left.'),
  best: { kind: 'pass', to: '11', at: [6.5,23] } },

{ ch: 0, type: 'ball', title: 'Away from pressure',
  prompt: 'Their 10 is running at you from your left. You can pass now, first time. Who gets it?',
  hint: 'Pressure is coming from the left. Which way should the ball go? Who is guarding the space down the wing?',
  lesson: 'Pressure from one side? Play out the other side. If a defender guards the space in front of your teammate, play it to feet.',
  us:   { 1:[25,72], 3:[11,59], 4:[25,62], 2:[39,58], 6:[25,47], 10:[22,32], 11:[6,33], 9:[27,20], 7:[45,36] },
  them: { 1:[25,3], 2:[14,17], 4:[26,15], 3:[42,25], 6:[22,27.5], 10:[19,44], 9:[14,52], 7:[10,40], 11:[40,48] },
  ball: '6',
  arrows: [{ team: 'them', from: [19,44], to: [22.4,45.6] }],
  pass: {
    7:  P(3, 'Pro choice', "Their 10 is pressing from the left, so you play out to the right. Their 3 is guarding the space down the line, so it goes to the 7's feet."),
    2:  P(2, 'Good', 'Away from the pressure, nice. But your 7 was open further up the field.'),
    4:  TOO_SAFE('Safe, but their 10 will keep pressing. You had a forward pass away from the press.'),
    3:  P(0, 'Into pressure', "That's right where their 9 and 10 are. Easy steal for them.", { cut: '9' }),
    11: P(0, 'Intercepted', 'Their 10 and 7 are both in that lane.', { cut: '7' }),
    10: P(1, 'Tight', 'Their 6 is right behind your 10, and their 10 is closing. Tough spot to receive in.'),
    9:  P(1, 'Marked', 'Long pass to a 9 with a defender right there. The 7 was free.'),
    1:  TOO_SAFE('All the way back to the keeper? You had a free 7 away from the pressure.')
  },
  lead: [
    [45, 28, 4, 0, 'Into their 3', "Their 3 is guarding the space down the line, so their 3 wins that. Play it to the 7's feet instead.", '7', '3']
  ],
  shoot: FAR,
  carry: [[33, 44, 6, 2, 'Okay', 'Dribbling away from the pressure is fine, but a pass gets you out faster.'],
          [18, 46, 6, 0, 'Into pressure', 'You dribbled right into their 10.']],
  elsewhere: P(1, 'Not quite', 'Dribbling with their 10 closing in is risky. Move the ball with a pass.'),
  best: { kind: 'pass', to: '7' } },

{ ch: 0, type: 'ball', title: 'Set it back',
  prompt: 'Your 4 just passed to you. You are facing your own goal and their 10 is right on your back. What now?',
  hint: 'You can’t see the field behind you. Who can you see?',
  lesson: "Defender tight on your back? Don't turn. Set it back to the player who passed it.",
  us:   { 1:[25,72], 3:[11,60], 4:[25,60], 2:[39,60], 6:[25,48], 10:[23,31], 11:[6,34], 9:[28,20], 7:[44,33] },
  them: { 1:[25,3], 2:[14,18], 4:[26,15], 3:[36,18], 6:[24,26], 10:[25,43.4], 9:[14,55], 7:[10,42], 11:[40,46] },
  ball: '6', facing: 'back',
  arrows: [{ team: 'them', from: [25,41.6], to: [25,43.9] }],
  pass: {
    4:  P(3, 'Pro choice', "Their 10 is tight on your back, so don't turn. One touch back to the 4. The 4 is facing forward and can see everything."),
    2:  P(2, 'Good', "Open, but you'd have to turn your body with their 10 on your back. The 4 is the simple pass."),
    3:  P(0, 'Intercepted', 'Their 9 is right next to your 3. That pass gets picked off near our goal.', { cut: '9' }),
    1:  P(1, 'Too far back', 'Safe, but your 4 was right there and facing forward.'),
    10: P(0, "Can't see it", "You're facing your own goal. To make that pass you'd have to turn into their 10."),
    9:  P(0, "Can't see it", "You're facing your own goal. To make that pass you'd have to turn into their 10."),
    7:  P(0, "Can't see it", "You're facing your own goal. To make that pass you'd have to turn into their 10."),
    11: P(0, "Can't see it", "You're facing your own goal. To make that pass you'd have to turn into their 10.")
  },
  leadNote: 'Your 4 is facing the play. The 4 wants it to feet.',
  shoot: P(0, 'No way', "You're facing your own goal, 48 yards from theirs."),
  carry: [],
  elsewhere: P(0, 'Turned into pressure', 'Turning with a defender tight on your back is how you lose the ball in the middle of the field.'),
  best: { kind: 'pass', to: '4' } },

{ ch: 0, type: 'ball', title: 'Over the top',
  prompt: 'Their defenders have pushed all the way up to halfway. Your 9 is already sprinting. What’s the pass?',
  hint: 'Look at the space behind their last defenders. Where will your 9 be in two seconds?',
  lesson: 'When their defenders push high, the space is behind them. Pass into your runner’s path, not to where the runner is now.',
  us:   { 1:[25,72], 3:[12,58], 4:[25,59], 2:[38,58], 6:[24,50], 10:[24,42], 11:[6,38], 9:[29,34.5], 7:[44,38] },
  them: { 1:[25,7], 2:[10,34], 4:[25,33.5], 3:[40,34], 6:[23,38], 10:[17,46], 9:[31,52], 7:[12,52], 11:[38,49] },
  ball: '6',
  arrows: [{ team: 'us', from: [29.6,32.5], to: [31,22.5], dash: 1 }],
  pass: {
    9:  P(1, 'Behind the run', 'Your 9 is already sprinting. A pass to where the 9 is now arrives behind the run, and their 4 steps in.'),
    10: P(1, 'Marked', "Their 6 is tight on your 10. The 10 would have to play it back to you."),
    7:  P(1, 'Marked', "Their defender is right on your 7. The space behind them is the prize."),
    11: P(0, 'Intercepted', 'Their 10 is standing in that lane.', { cut: '10' }),
    4:  TOO_SAFE('You had no pressure and a run in behind. Go for it!'),
    3:  TOO_SAFE('You had no pressure and a run in behind. Go for it!'),
    2:  P(0, 'Intercepted', 'Their 9 is standing in that lane, and your 9 was running in behind.', { cut: '9' }),
    1:  TOO_SAFE('Back to the keeper when your 9 is through on goal?')
  },
  lead: [
    [31, 23.5, 5, 3, 'Pro choice', "Into the space behind their defenders, right in your 9's path. The 9 runs onto it with a clear run at goal.", '9'],
    [29, 9, 3.5, 1, 'Overhit', 'Too long. Their keeper comes out and collects it.', '9', '1']
  ],
  shoot: P(0, 'Out of range', '50 yards out. No chance.'),
  carry: [],
  elsewhere: P(1, 'Too slow', "Dribbling into their midfield takes time. The 9's run won't wait for you."),
  best: { kind: 'pass', to: '9', at: [31,23.5] } },

/* ---------------- 2. Get open ---------------- */
{ ch: 1, type: 'move', title: 'Out of the shadow',
  prompt: 'Your 4 has the ball and wants to pass to you, but their 9 is in the way. Drag the 6 to a better spot.',
  hint: 'Can the 4 see you? Draw a line from the ball to you.',
  lesson: "If a defender is between you and the ball, you're hiding. Move until the passer can see you.",
  us:   { 1:[25,72], 3:[11,60], 4:[25,62], 2:[39,60], 6:[25,46], 10:[24,30], 11:[6,33], 9:[26,18], 7:[44,33] },
  them: { 1:[25,3], 2:[13,16], 4:[25,14], 3:[37,16], 6:[25,26], 10:[14,45], 9:[25,54], 7:[10,40], 11:[40,41] },
  ball: { team: 'us', n: '4' },
  zones: [
    [33, 50, 4.5, 3, 'Pro spot', 'Now the 4 can see you and pass around their 9. From here you can turn and play forward.'],
    [17, 50, 4.5, 2, 'Good', "You're out of the shadow, but closer to their 10. The right side has more room."],
    [25, 47, 4.5, 0, 'Hidden', "You're still hiding behind their 9. The 4 can't pass through their 9."],
    [31, 61, 4, 1, 'Too deep', "Now you're just another defender, and their 9 can press you both."],
    [19, 61, 4, 1, 'Too deep', "Now you're just another defender, and their 9 can press you both."]
  ],
  elsewhere: P(1, 'Not quite', 'The 4 needs a clear passing lane to you, close enough to reach. Get out from behind their 9.'),
  best: { kind: 'move', at: [33,50] } },

{ ch: 1, type: 'move', title: 'Help the 3',
  prompt: 'Your 3 has the ball by the sideline and their 7 is closing in. Drag the 6 to give the 3 a pass.',
  hint: 'Not too close, not hidden, not flat across our box.',
  lesson: 'Help the player on the ball: find an angle for an easy pass, inside and a little ahead of the ball.',
  us:   { 1:[25,72], 3:[10,57], 4:[26,63], 2:[40,60], 6:[32,48], 10:[28,32], 11:[6,36], 9:[26,19], 7:[45,34] },
  them: { 1:[25,3], 2:[12,18], 4:[25,15], 3:[38,18], 6:[29,27], 10:[25,44], 9:[20,62], 7:[9,49], 11:[41,44] },
  ball: { team: 'us', n: '3' },
  arrows: [{ team: 'them', from: [9,49], to: [9.6,52.7] }],
  zones: [
    [18, 51, 4.5, 3, 'Pro spot', 'Perfect angle. You’re inside and a bit ahead of the 3, so the pass goes around their 7 and you can play forward or switch.'],
    [13, 53, 2.6, 1, 'Too close', "You're so close that their 7 can press you both. Give the 3 a few more yards."],
    [17, 62, 3.5, 0, 'Dangerous', "Their 9 is waiting right there, in front of our goal. A pass there gets stolen."],
    [32, 48, 5, 1, 'Too far', "That's a 24-yard pass across our half while the 3 is under pressure. Come closer to help."]
  ],
  elsewhere: P(1, 'Not quite', 'The 3 needs a short, safe pass. Get inside the 3, a little ahead, where you can be seen.'),
  best: { kind: 'move', at: [18,51] } },

{ ch: 1, type: 'move', title: 'Goal kick pocket',
  prompt: 'Goal kick for us. Their players are marking our defenders and their 10 is guarding the middle. Drag the 6 to where the keeper can pass to you.',
  hint: 'Find a gap between two of their players.',
  lesson: 'On a goal kick, find a pocket: a space between two of their players where the keeper can see you.',
  us:   { 1:[25,70], 3:[9,63], 4:[25,61], 2:[41,63], 6:[25,46], 10:[25,33], 11:[5,38], 9:[26,22], 7:[45,38] },
  them: { 1:[25,3], 2:[12,24], 4:[25,18], 3:[38,24], 6:[25,38], 10:[25,51], 9:[25,57], 7:[13,59], 11:[37,59] },
  ball: { team: 'us', n: '1' },
  zones: [
    [16, 53, 4.5, 3, 'Pro spot', "You found the pocket between their 10 and their 7. The keeper can reach you and you can turn."],
    [34, 53, 4.5, 3, 'Pro spot', "You found the pocket between their 10 and their 11. The keeper can reach you and you can turn."],
    [25, 47, 4.5, 0, 'Hidden', 'Their 9 and 10 are both between you and the keeper. The keeper can’t find you there.'],
    [25, 65, 4, 1, 'Too deep', 'Their 9 is right there. Now their 9 can press you and the 4 together.']
  ],
  elsewhere: P(1, 'Not quite', 'Find a gap between two of their players that the keeper can pass through.'),
  best: { kind: 'move', at: [16,53] } },

{ ch: 1, type: 'move', title: 'Escape route',
  prompt: 'Your 11 has the ball near the sideline and two of their players are trapping the 11. Drag the 6 to help the 11 escape.',
  hint: 'The 11 can’t go forward. Where can the 11 pass?',
  lesson: 'When a teammate is trapped, offer an escape route: behind and inside.',
  us:   { 1:[25,70], 3:[11,54], 4:[25,57], 2:[39,54], 6:[27,49], 10:[22,28], 11:[6,38], 9:[27,18], 7:[44,26] },
  them: { 1:[25,3], 2:[8,32], 4:[25,14], 3:[37,18], 6:[24,23.5], 10:[29,41], 9:[31,53], 7:[12,35], 11:[40,41] },
  ball: { team: 'us', n: '11' },
  arrows: [{ team: 'them', from: [12,35], to: [9.6,36.4] }, { team: 'them', from: [8,32], to: [7.3,34.4] }],
  zones: [
    [17, 46, 4.5, 3, 'Pro spot', 'Inside and behind the 11. The 11 can turn and pass to you, and you can switch it to the right where we have space.'],
    [10, 41, 3, 1, 'Too close', 'You came so close that their 7 can press you too.'],
    [27, 49, 4.5, 1, 'Too far', 'The 11 is trapped and has no time. That pass is too long and goes near their 10.'],
    [13, 29, 5, 0, 'No help', 'Running past doesn’t help. The 11 is trapped and can’t pass forward through two players.']
  ],
  elsewhere: P(1, 'Not quite', 'Give the 11 a short pass to make right now: behind and toward the middle.'),
  best: { kind: 'move', at: [17,46] } },

{ ch: 1, type: 'move', title: 'Stay home',
  prompt: 'We are attacking down the right. Your 7 has the ball near their box. Drag the 6 to where you should be.',
  hint: 'What happens if we lose the ball right now?',
  lesson: 'When we attack, the 6 stays home: in the middle, behind the ball.',
  us:   { 1:[25,64], 3:[13,50], 4:[25,52], 2:[38,48], 6:[37,31], 10:[31,17], 11:[13,12], 9:[25,10], 7:[44,22] },
  them: { 1:[25,3], 2:[17,8], 4:[28,6], 3:[37,12], 6:[32,23], 10:[24,37], 9:[26,44], 7:[9,22], 11:[43,29] },
  ball: { team: 'us', n: '7' },
  zones: [
    [26, 31, 5, 3, 'Pro spot', "In the middle, behind the ball. You can get a pass back from the 7 or the 10, and if we lose it you're right in front of their 10."],
    [37, 31, 4.5, 1, 'Ball watching', 'Close to the 7, but if we lose the ball now, nobody is guarding the middle.'],
    [25, 12, 9, 0, 'Too many in the box', 'Now nobody is home. If their keeper catches the cross, their 9 and 10 run at our defenders.'],
    [25, 45, 4, 1, 'Too deep', "That's so deep you can't help the attack. Stay connected to the play."]
  ],
  elsewhere: P(1, 'Not quite', 'The 6 stays in the middle, behind the ball, ready for a pass back and ready to stop a counterattack.'),
  best: { kind: 'move', at: [26,31] } },

/* ---------------- 3. Guard the middle ---------------- */
{ ch: 2, type: 'move', title: 'Block the lane',
  prompt: 'Their 6 has the ball. Their 10 is sneaking into the space behind you. Drag the 6 to stop it.',
  hint: 'Who does their 6 want to pass to? Get in the way.',
  lesson: 'Stand in the passing lane between the ball and their most dangerous player.',
  us:   { 1:[25,72], 3:[13,58], 4:[24,59], 2:[37,58], 6:[16,42], 10:[21,29], 11:[8,34], 9:[25,22], 7:[42,34] },
  them: { 1:[25,3], 2:[12,18], 4:[25,16], 3:[38,18], 6:[25,32], 10:[28,50], 9:[31,62], 7:[8,46], 11:[42,46] },
  ball: { team: 'them', n: '6' },
  arrows: [{ team: 'us', from: [21,29], to: [23.2,30.4] }],
  zones: [
    [26.8, 43, 4, 3, 'Pro spot', "You're standing in the passing lane. Their 6 can't find the 10, and you're still close enough to tackle."],
    [28, 54, 3, 2, 'Good', "You're marking the 10, but if the ball reaches the 10, it can still be held up. Better to stop the pass."],
    [25, 36, 3.5, 1, 'Wrong job', 'Pressing their 6 leaves their 10 free behind you. Let your 10 press, and you guard the middle.'],
    [16, 42, 5, 0, 'Their 10 is free', 'Their 10 is all alone behind you. One pass and their 10 runs at our defenders.']
  ],
  elsewhere: P(0, 'Their 10 is free', 'From there you can’t stop the pass into their 10. Get between the ball and their 10.'),
  best: { kind: 'move', at: [26.8,43] } },

{ ch: 2, type: 'move', title: 'Fill the gap',
  prompt: 'Their 11 has the ball. Our 2 stepped out to press, and their 9 is running into the space the 2 left. Drag the 6.',
  hint: 'Someone has to cover the space the 2 left behind.',
  lesson: 'When a defender steps out, someone covers the space left behind. The 6 is closest.',
  us:   { 1:[25,72], 3:[13,59], 4:[25,59], 2:[42,51], 6:[26,45], 10:[28,33], 11:[8,35], 9:[24,26], 7:[42,33] },
  them: { 1:[25,3], 2:[12,20], 4:[25,18], 3:[38,20], 6:[30,38], 10:[24,54], 9:[34,52], 7:[8,47], 11:[45,47] },
  ball: { team: 'them', n: '11' },
  arrows: [{ team: 'us', from: [40.6,53.2], to: [42,51] }, { team: 'them', from: [34.5,54], to: [36,62], dash: 1 }],
  zones: [
    [35, 60, 4.5, 3, 'Pro spot', "The 2 went out to press, so you filled that spot. Now their 9's run goes nowhere."],
    [33, 55, 2.8, 2, 'Good', "You're tracking the 9. Now get goal-side: between their 9 and our goal."],
    [41, 46, 4.5, 0, 'Double team', 'Two of us on the winger means their 9 is free in the gap. One presses, one covers.'],
    [26, 45, 4.5, 0, 'Gap left open', 'The space behind the 2 is wide open and their 9 is running into it.']
  ],
  elsewhere: P(1, 'Not quite', 'Find the space our 2 left behind and get there before their 9 does.'),
  best: { kind: 'move', at: [35,60] } },

{ ch: 2, type: 'move', title: "Don't dive in",
  prompt: 'Their 10 is dribbling straight at you in the middle. Our defenders are busy. Drag the 6 to where you should defend.',
  hint: 'If you lunge and miss, who is left to stop their 10?',
  lesson: "Don't dive in. Stay on your feet, slow the dribbler down, wait for help.",
  us:   { 1:[25,72], 3:[12,60], 4:[25,60], 2:[38,60], 6:[31,51], 10:[30,33], 11:[9,32], 9:[25,24], 7:[41,32] },
  them: { 1:[25,3], 2:[12,16], 4:[25,14], 3:[38,16], 6:[30,28], 10:[24,40], 9:[28,56], 7:[10,52], 11:[40,52] },
  ball: { team: 'them', n: '10' },
  arrows: [{ team: 'them', from: [24,40], to: [24,44], dash: 1 }],
  zones: [
    [24.5, 45.8, 2.6, 3, 'Pro spot', 'Close enough to bother the dribbler, far enough that the ball can’t just be knocked past you. Now slow things down until help arrives.'],
    [24, 41.5, 2.2, 0, 'Dived in', "Right on top of the ball. One touch past you, and their 10 is through on our defenders."],
    [25, 55, 3.5, 1, 'Too far off', "So far away that their 10 can pass or shoot freely. Get close enough to bother the dribbler."]
  ],
  elsewhere: P(1, 'Not quite', 'Get between their 10 and our goal, a few steps away, and stay on your feet.'),
  best: { kind: 'move', at: [24.5,45.8] } },

{ ch: 2, type: 'move', title: 'Track the runner',
  prompt: 'Their 7 has the ball out wide. Their 6 is making a late run toward our box. Drag the 6.',
  hint: 'Whose job is the player running from midfield?',
  lesson: 'Runners from midfield are the 6’s job. Go with them, between them and our goal.',
  us:   { 1:[25,72], 3:[12,61], 4:[25,62], 2:[38,60], 6:[25,44], 10:[27,32], 11:[10,40], 9:[24,24], 7:[40,36] },
  them: { 1:[25,3], 2:[10,30], 4:[25,16], 3:[38,20], 6:[28,38], 10:[33,57], 9:[19,65], 7:[6,48], 11:[42,46] },
  ball: { team: 'them', n: '7' },
  arrows: [{ team: 'them', from: [28,40], to: [25.5,57], dash: 1 }],
  zones: [
    [24, 56, 4, 3, 'Pro spot', 'You tracked the runner. Stay between the runner and our goal, and there’s no clean shot.'],
    [26, 50, 3, 2, 'Good', 'Keep going! Get all the way between the runner and our goal.'],
    [11, 49, 5, 0, 'Ball watching', 'You went to the ball, and their 6 ran right past you into our box.'],
    [25, 44, 4, 0, 'Left behind', "Their runner went past you. Runners from midfield are the 6's job."]
  ],
  elsewhere: P(1, 'Not quite', 'Find their runner and get between the runner and our goal.'),
  best: { kind: 'move', at: [24,56] } },

{ ch: 2, type: 'move', title: 'Stay central',
  prompt: 'Their 7 has the ball by our left sideline. Our 3 and 11 are on their 7. Drag the 6 to where you’re needed.',
  hint: 'Two of ours are already on the ball. Who is free?',
  lesson: "Don't get pulled to the ball when teammates have it covered. Guard the middle.",
  us:   { 1:[25,72], 3:[9,57], 4:[25,61], 2:[38,60], 6:[13,48], 10:[26,36], 11:[9,45], 9:[25,28], 7:[41,36] },
  them: { 1:[25,3], 2:[12,30], 4:[25,18], 3:[38,22], 6:[28,42], 10:[25,52], 9:[28,65], 7:[5,52], 11:[40,54] },
  ball: { team: 'them', n: '7' },
  zones: [
    [18.5, 53, 3.2, 3, 'Pro spot', "You're between the ball and their 10. Our 3 and 11 handle the winger, and you shut down the pass into the middle."],
    [24, 57, 2.8, 2, 'Good', 'Marking their 10 works, but standing in the passing lane stops the ball even reaching the 10.'],
    [8, 51, 3.5, 0, 'Three on one', 'Three of us on one winger, and their 10 is free in front of our goal.'],
    [13, 48, 3, 1, 'Stuck halfway', "You're not helping the 3 and you're not guarding the middle."]
  ],
  elsewhere: P(1, 'Not quite', "Their 10 is the danger. Get between the ball and their 10."),
  best: { kind: 'move', at: [18.5,53] } },

/* ---------------- 4. Ball won, ball lost ---------------- */
{ ch: 3, type: 'ball', title: 'Win it, go!',
  prompt: 'You just stole the ball in the middle. Most of their team is in our half. What’s your first pass?',
  hint: 'Who is already running, and where will that runner be when the ball gets there?',
  lesson: 'Win it while they are out of shape? Go forward fast, into the space in front of your runner.',
  us:   { 1:[25,72], 3:[12,61], 4:[24,63], 2:[37,61], 6:[24,46], 10:[16,44], 11:[7,36], 9:[25,30], 7:[42,31] },
  them: { 1:[25,3], 2:[14,24], 4:[28,23], 3:[36,42], 6:[31,45], 10:[20,52], 9:[27,57], 7:[7,54], 11:[41,52] },
  ball: '6',
  arrows: [{ team: 'us', from: [42.4,29], to: [43,19], dash: 1 }, { team: 'them', from: [31,45], to: [28.3,45.4] }],
  pass: {
    7:  P(1, 'Behind the run', "The 7 is already sprinting down the wing. Pass into the space ahead, not to where the 7 is now."),
    9:  P(2, 'Good', 'Forward and quick. But their 4 is near the 9, and the 7 had the whole wing.'),
    11: P(1, 'Slow', 'Their 2 is ready for that. The space is on the other side.'),
    10: P(1, 'Slow', 'Sideways gives their players time to run back.'),
    4:  P(1, 'Too slow', 'When you win it and they’re out of shape, go forward fast.'),
    3:  P(0, 'Intercepted', 'Their 10 is standing in that lane, and going back gives them time to recover.', { cut: '10' }),
    2:  P(1, 'Too slow', 'When you win it and they’re out of shape, go forward fast.'),
    1:  P(1, 'Too slow', 'When you win it and they’re out of shape, go forward fast.')
  },
  lead: [
    [43, 20, 4.5, 3, 'Pro choice', 'Their defender on that side pushed up, so the right wing is empty. You put it in front of your 7, who runs onto it. Counterattack!', '7']
  ],
  shoot: FAR,
  carry: [[24, 38, 6, 2, 'Okay', 'Driving forward is good, but their 6 is chasing you. A pass is faster.']],
  elsewhere: P(1, 'Not quite', 'Their 6 is chasing you. Move the ball forward with a pass.'),
  best: { kind: 'pass', to: '7', at: [43,20] } },

{ ch: 3, type: 'move', title: 'Win it back',
  prompt: 'Our 10 just lost the ball. Their 6 picked it up facing their own goal, right next to you. Drag the 6.',
  hint: 'How close are you? Which way is their 6 facing?',
  lesson: 'Lose it close to you? Press right away. The first five seconds are the best time to win it back.',
  us:   { 1:[25,72], 3:[12,60], 4:[25,61], 2:[38,60], 6:[24,49], 10:[23,36], 11:[8,32], 9:[26,22], 7:[42,31] },
  them: { 1:[25,3], 2:[12,18], 4:[25,15], 3:[38,18], 6:[26,41], 10:[16,51], 9:[31,56], 7:[8,44], 11:[41,45] },
  ball: { team: 'them', n: '6' },
  arrows: [{ team: 'us', from: [23,36], to: [24.4,38.4] }],
  zones: [
    [26, 45.2, 2.6, 3, 'Pro spot', "Their 6 is facing their own goal and you're right there. You and the 10 close in together. Win it back!"],
    [25, 56, 4, 1, 'Backed off', 'Backing off gives their 6 time to turn and pass. You were close, so go win it.']
  ],
  elsewhere: P(1, 'Not quite', 'You were close enough to press. Get right on their 6 before the turn.'),
  best: { kind: 'move', at: [26,45.2] } },

{ ch: 3, type: 'move', title: 'Get home',
  prompt: 'We lost the ball deep in their half. Their players are breaking forward. You are 30 yards from the ball. Drag the 6.',
  hint: 'Can you win the ball from here? If not, what should you protect?',
  lesson: "Too far to press? Sprint back to the middle, in front of our defenders.",
  us:   { 1:[25,72], 3:[13,52], 4:[25,54], 2:[37,52], 6:[20,24], 10:[30,14], 11:[10,19], 9:[24,8], 7:[42,16] },
  them: { 1:[25,3], 2:[11,13], 4:[31,9], 3:[40,9], 6:[15,22], 10:[22,32], 9:[28,42], 7:[6,34], 11:[42,32] },
  ball: { team: 'them', n: '2' },
  arrows: [{ team: 'them', from: [28,42], to: [28,49], dash: 1 }, { team: 'them', from: [22,32], to: [23,40], dash: 1 }],
  zones: [
    [25, 47, 5, 3, 'Pro spot', "You can't win it from 30 yards away, so you got back in front of our defenders to protect the middle."],
    [24, 38, 4, 2, 'Good', 'Getting back, good. Keep going until you are in front of our defenders.'],
    [12, 18, 6, 0, 'Chasing', "You'll never catch it, and now the middle is empty."]
  ],
  elsewhere: P(1, 'Not quite', 'Sprint back to the middle of the field, in front of our defenders.'),
  best: { kind: 'move', at: [25,47] } },

{ ch: 3, type: 'ball', title: 'Win it, keep it',
  prompt: 'You won the ball, but their team is organized and all our forwards are marked. Their 9 and 10 are closing on you.',
  hint: 'Is there a counterattack on? If not, keep it.',
  lesson: 'Win it, then keep it. Not every steal is a counterattack.',
  us:   { 1:[25,72], 3:[12,59], 4:[25,61], 2:[39,58], 6:[26,47], 10:[24,34], 11:[7,36], 9:[26,24], 7:[44,36] },
  them: { 1:[25,3], 2:[13,22], 4:[26,20], 3:[38,22], 6:[24,30], 10:[21,42], 9:[30,43], 7:[10,32], 11:[41,32] },
  ball: '6',
  arrows: [{ team: 'them', from: [21,42], to: [23.4,44.4] }, { team: 'them', from: [30,43], to: [28.5,44.8] }],
  pass: {
    2:  P(3, 'Pro choice', 'Win it, then keep it. Their team is set and your forwards are marked, so give it to the open 2 and build again.'),
    3:  P(3, 'Pro choice', 'Win it, then keep it. Their team is set and your forwards are marked, so give it to the open 3 and build again.'),
    4:  P(2, 'Good', 'Safe, but straight back keeps it close to their 9 and 10. The 2 or the 3 are wider and freer.'),
    1:  P(1, 'Too far back', 'Safe, but your 2 and 3 were open closer to you.'),
    10: P(0, 'Marked', 'Their 6 is right on your 10. Forcing it forward hands it straight back.'),
    9:  P(0, 'Marked', 'Their 4 is right on your 9. Forcing it forward hands it straight back.'),
    7:  P(0, 'Marked', 'Their 11 is on your 7. Forcing it forward hands it straight back.'),
    11: P(0, 'Marked', 'Their 7 is on your 11. Forcing it forward hands it straight back.')
  },
  shoot: FAR,
  carry: [],
  elsewhere: P(0, 'Lost it', "Two of them are closing in. Don't dribble into them."),
  best: { kind: 'pass', to: '2' } },

{ ch: 3, type: 'ball', title: 'Drive into space',
  prompt: 'You won the ball. Their midfielders are stuck behind you and there is open grass in front of you. What do you do?',
  hint: 'Every forward is marked. Nobody is in front of you.',
  lesson: 'Open space in front of you and nobody pressing? Drive into it.',
  us:   { 1:[25,72], 3:[12,61], 4:[25,63], 2:[38,61], 6:[25,48], 10:[17,31], 11:[6,31], 9:[27,22], 7:[44,30] },
  them: { 1:[25,3], 2:[10,26], 4:[26,18], 3:[40,25], 6:[28,54], 10:[20,56], 9:[31,59], 7:[8,52], 11:[42,53] },
  ball: '6',
  pass: {
    10: P(2, 'Good', 'Forward and open. But you could drive at them first and pass later, when their defenders have to come to you.'),
    9:  P(1, 'Marked', 'Their 4 is on your 9.'),
    7:  P(1, 'Marked', 'Their 3 is on your 7.'),
    11: P(1, 'Marked', 'Their 2 is on your 11.'),
    4:  P(1, 'Too slow', "We're counterattacking! Going back lets them all get home."),
    3:  P(0, 'Intercepted', 'Their 10 is right in that lane. And we were counterattacking!', { cut: '10' }),
    2:  P(0, 'Intercepted', 'Their 6 is right in that lane. And we were counterattacking!', { cut: '6' }),
    1:  P(1, 'Too slow', "We're counterattacking! Going back lets them all get home.")
  },
  shoot: P(0, 'Out of range', 'Still 48 yards out. Drive closer first.'),
  carry: [[25, 37, 6.5, 3, 'Pro choice', 'There was a highway in front of you. Drive into it, make a defender come to you, then pass to the player that defender left free.']],
  elsewhere: P(1, 'Not quite', 'The open space is straight ahead, up the middle.'),
  best: { kind: 'carry', at: [25,37] } },

/* ---------------- 5. Beat the press ---------------- */
{ ch: 4, type: 'ball', title: 'Marked from behind',
  prompt: 'Your 10 is coming short toward you, and their 6 is right on the 10’s back. Your wingers and 9 are marked. Make the pass.',
  hint: 'Where is the free grass: in front of your 10, or behind?',
  lesson: 'Teammate coming toward you with a defender right behind? Play it firmly to feet, never into the space behind.',
  us:   { 1:[25,72], 3:[11,59], 4:[25,61], 2:[39,59], 6:[25,50], 10:[26,37], 11:[7,33], 9:[26,21], 7:[44,33] },
  them: { 1:[25,3], 2:[10,28.5], 4:[25,17], 3:[40,28.5], 6:[26,32.5], 10:[16,47], 9:[33,56], 7:[10,44], 11:[41,45] },
  ball: '6',
  arrows: [{ team: 'us', from: [26.4,31], to: [26.1,34.2], dash: 1 }],
  pass: {
    10: P(3, 'Pro choice', "The 10 is coming toward you with a defender right behind, so play it firmly to feet. The 10 can lay it off or spin, and the space behind stays their 6's problem."),
    7:  P(1, 'Marked', 'Their 3 is right on your 7.'),
    11: P(1, 'Marked', 'Their 2 is right on your 11.'),
    9:  P(0, 'Intercepted', 'Their 6 is standing right in that lane.', { cut: '6' }),
    4:  TOO_SAFE('Safe, but your 10 came to help and was open to feet.'),
    3:  TOO_SAFE('Sideways when your 10 was open to feet.'),
    2:  TOO_SAFE('Sideways when your 10 was open to feet.'),
    1:  TOO_SAFE('Back to the keeper when your 10 was open to feet?')
  },
  lead: [
    [26, 28, 3.8, 0, 'Wrong side', "That's the space behind your 10, and their 6 is standing in it. When your 10 is coming to you, play it to feet.", '10', '6'],
    [32, 40, 3, 1, 'Makes the 10 turn', 'The 10 was coming toward you. Now the 10 has to stop and chase it sideways, and their 6 catches up. To feet was better.', '10']
  ],
  leadNote: 'Your 10 is coming toward you with a defender right behind. Play it to feet.',
  shoot: FAR,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Your 10 came short to help. Use that pass.'),
  best: { kind: 'pass', to: '10' } },

{ ch: 4, type: 'ball', title: 'Who got left?',
  prompt: 'Their 6 has run up to press you. Who is free now?',
  hint: 'Who was their 6 guarding before coming to you?',
  lesson: 'When one of their players leaves a spot to press you, someone is free. Find that player.',
  us:   { 1:[25,72], 3:[11,59], 4:[25,61], 2:[39,59], 6:[25,48], 10:[31,36], 11:[6,33], 9:[26,21], 7:[45,34] },
  them: { 1:[25,3], 2:[12,18], 4:[25,17], 3:[38,20], 6:[23,42], 10:[15,46], 9:[25,55], 7:[9,38], 11:[41,45] },
  ball: '6',
  arrows: [{ team: 'them', from: [22.3,39.5], to: [23,42.3] }],
  pass: {
    10: P(3, 'Pro choice', 'Their 6 left the middle to press you, so your 10 is free. Play it right past their 6.'),
    7:  P(2, 'Good', 'Open and forward. But the 10 is closer to goal and in the middle.'),
    9:  P(1, 'Marked', 'Their 4 is on your 9.'),
    11: P(1, 'Marked', 'Their 7 is near your 11 and their 10 is close to the lane.'),
    4:  P(0, 'Intercepted', 'Their 9 is standing right behind you, in that lane.', { cut: '9' }),
    1:  P(0, 'Intercepted', 'Their 9 is standing right behind you, in that lane.', { cut: '9' }),
    3:  TOO_SAFE('Sideways when your 10 was free in front of you.'),
    2:  TOO_SAFE('Sideways when your 10 was free in front of you.')
  },
  shoot: FAR,
  carry: [],
  leadNote: 'Your 10 is free and close. Play it to feet.',
  elsewhere: P(1, 'Not quite', 'Dribbling into their 6 when your 10 is free behind?'),
  best: { kind: 'pass', to: '10' } },

{ ch: 4, type: 'ball', title: "It's a trap",
  prompt: 'Your 7 looks wide open by the sideline. Before you pass, check who is waiting nearby.',
  hint: 'Count their players near the 7. Now look at the other side.',
  lesson: "If a teammate looks too open by the sideline, check who's waiting to pounce. Play where they can't trap you.",
  us:   { 1:[25,72], 3:[10,58], 4:[25,62], 2:[39,60], 6:[26,49], 10:[26,33], 11:[6,37], 9:[26,21], 7:[45,45] },
  them: { 1:[25,3], 2:[12,19], 4:[26,17], 3:[38,32], 6:[25,29], 10:[33,42], 9:[25,55], 7:[16,44], 11:[40,50] },
  ball: '6',
  pass: {
    3:  P(3, 'Pro choice', 'The 7 looked open, but it was a trap. You played away from it, and your 3 has space to bring the ball forward.'),
    7:  P(1, "It's a trap", 'They left the 7 open on purpose. When the ball arrives, three of them jump on the 7, with the sideline right behind.'),
    2:  P(1, 'Toward the trap', "You're still playing toward the side where they set the trap."),
    4:  P(0, 'Intercepted', 'Their 9 is standing in that lane.', { cut: '9' }),
    1:  P(0, 'Intercepted', 'Their 9 is standing in that lane.', { cut: '9' }),
    11: P(0, 'Intercepted', 'Their 7 is standing right in that lane.', { cut: '7' }),
    10: P(1, 'Marked', 'Their 6 is right on your 10.'),
    9:  P(0, 'Intercepted', 'Their 6 is standing in that lane.', { cut: '6' })
  },
  shoot: FAR,
  carry: [],
  elsewhere: P(1, 'Not quite', 'Find the free player on the safe side.'),
  best: { kind: 'pass', to: '3' } },

{ ch: 4, type: 'move', title: 'Take your marker for a walk',
  prompt: 'Your 4 has the ball. Their 10 is following you everywhere, and you two are blocking the pass to your 10. Drag the 6.',
  hint: 'Your marker goes wherever you go. Use that.',
  lesson: 'If someone is marking you everywhere, take that marker with you to open space for a teammate.',
  us:   { 1:[25,72], 3:[11,59], 4:[25,61], 2:[39,59], 6:[25,47], 10:[25,33], 11:[6,34], 9:[26,20], 7:[44,34] },
  them: { 1:[25,3], 2:[13,17], 4:[25,16], 3:[37,17], 6:[33,27], 10:[25,43], 9:[16,55], 7:[9,40], 11:[41,41] },
  ball: { team: 'us', n: '4' },
  follow: [{ n: '10', dy: -3.8 }],
  payoff: { to: '10' },
  zones: [
    [35, 49, 5, 3, 'Pro spot', 'Their 10 followed you, and now the middle is open. The 4 can pass straight to your 10.'],
    [15, 49, 5, 3, 'Pro spot', 'Their 10 followed you, and now the middle is open. The 4 can pass straight to your 10.'],
    [25, 47, 4, 0, 'Blocking', 'You and their 10 are still clogging the lane to your 10.'],
    [25, 55, 4, 1, 'Too deep', 'Dropping just brings their 10 closer to our 4.']
  ],
  elsewhere: P(1, 'Not quite', 'Move out of the middle and take their 10 with you.'),
  best: { kind: 'move', at: [35,49] } },

{ ch: 4, type: 'ball', title: 'Use your keeper',
  prompt: 'Everyone near you is marked and their 10 is pressing you. Is anyone free?',
  hint: 'Count everyone on your team. Everyone.',
  lesson: "Our keeper counts as a player. When everyone is marked, the keeper is the free one.",
  us:   { 1:[25,71], 3:[9,63], 4:[23,64], 2:[42,62], 6:[31,56], 10:[25,40], 11:[6,42], 9:[26,28], 7:[44,42] },
  them: { 1:[25,3], 2:[7.5,38.5], 4:[26,24], 3:[42.5,38.5], 6:[25,36], 10:[28,51], 9:[22,59.5], 7:[12,58.5], 11:[40,57] },
  ball: '6',
  arrows: [{ team: 'them', from: [28,51], to: [29.6,53.3] }],
  pass: {
    1:  P(3, 'Pro choice', 'Everyone is marked except our keeper. The keeper is the extra player. Play it back, and there is time to find the next pass.'),
    4:  P(0, 'Marked', 'Their 9 is right on the 4, in front of our goal. Steal it there, and their 9 scores.'),
    2:  P(1, 'Risky', 'Their 11 is right there. Risky this close to our goal.'),
    3:  P(0, 'Intercepted', 'A long pass across our own box to a marked player.', { cut: '9' }),
    10: P(0, 'Blocked', "Their 10 is on you and their 6 is on your 10. It won't get through."),
    9:  P(0, 'Blocked', 'Long pass under pressure to a marked 9.'),
    7:  P(0, 'Blocked', 'Long pass under pressure to a marked player.'),
    11: P(0, 'Blocked', 'Long pass under pressure to a marked player.')
  },
  shoot: FAR,
  carry: [],
  leadNote: 'The keeper wants it to feet, away from their 9.',
  elsewhere: P(0, 'Too risky', 'Dribbling in front of our own box with pressure on? Too risky.'),
  best: { kind: 'pass', to: '1' } },

/* ---------------- 6. Final third ---------------- */
{ ch: 5, type: 'move', title: 'Arrive late',
  prompt: 'Your 7 is about to cross from the end line. Your 9 and 11 are in the box. Drag the 6 to the best spot.',
  hint: 'Everyone runs at the goal. Where is the space?',
  lesson: "Arrive late at the top of the box. Don't run into the crowd.",
  us:   { 1:[25,70], 3:[13,42], 4:[25,44], 2:[37,42], 6:[29,30], 10:[31,15], 11:[15,9.5], 9:[28,7], 7:[44,6] },
  them: { 1:[25,2.5], 2:[18,5], 4:[23.5,9], 3:[39,3.5], 6:[34,20], 10:[22,30], 9:[26,49], 7:[10,22], 11:[42,22] },
  ball: { team: 'us', n: '7' },
  zones: [
    [23, 17, 4, 3, 'Pro spot', 'Everyone ran at the goal, so the space is at the top of the box. Arrive late and the cutback is yours.'],
    [26, 7, 5, 0, 'Too crowded', 'The box is jammed. The cross or cutback can’t reach you in there.'],
    [29, 30, 4, 1, 'Too far', "You're too far away to help. Get closer to the box."],
    [40, 13, 4, 1, 'Too close to the 7', 'You’re taking the 7’s space instead of giving the 7 a pass.']
  ],
  elsewhere: P(1, 'Not quite', 'Find the space at the top of the box, where the cutback goes.'),
  best: { kind: 'move', at: [23,17] } },

{ ch: 5, type: 'ball', title: 'Shoot?',
  prompt: 'The cutback comes to you at the top of the box. What do you do?',
  hint: 'Can you see the goal? Are your teammates free?',
  lesson: 'Clear path to goal and in range? Shoot, and hit the target.',
  us:   { 1:[25,70], 3:[13,42], 4:[25,44], 2:[37,42], 6:[24,17], 10:[35,14], 11:[14,9], 9:[29,7], 7:[43,9] },
  them: { 1:[25,2.5], 2:[17,5], 4:[32.5,4.5], 3:[40,6], 6:[31,22], 10:[19,24], 9:[26,49], 7:[9,24], 11:[39,18] },
  ball: '6',
  arrows: [{ team: 'them', from: [31,22], to: [28.4,20.4] }, { team: 'them', from: [19,24], to: [21,21.6] }],
  pass: {
    9:  P(1, 'Marked', 'Their 4 is right on the 9, and you had a clear shot.'),
    11: P(1, 'Marked', 'Their 2 is right there, and you had a clear shot.'),
    10: P(1, 'Sideways', 'Their 11 is near the 10, and you had the shot.'),
    7:  P(1, 'Backwards', 'Back out wide when you are in the best shooting spot on the field?'),
    4:  P(0, 'Way too safe', 'That was the moment to shoot!'),
    3:  P(0, 'Way too safe', 'That was the moment to shoot!'),
    2:  P(0, 'Way too safe', 'That was the moment to shoot!'),
    1:  P(0, 'Way too safe', 'That was the moment to shoot!')
  },
  shoot: P(3, 'Pro choice', 'Top of the box, clear path to goal, and your teammates are marked. Hit the target, low and hard to the corner.'),
  carry: [[24, 12, 3.5, 2, 'Okay', 'Getting closer works, but defenders are closing in. A first-time shot is better.']],
  elsewhere: P(1, 'Not quite', 'Defenders are closing. Every touch gives them time to block it. Shoot!'),
  best: { kind: 'shoot' } },

{ ch: 5, type: 'ball', title: 'Shoot or square it?',
  prompt: 'You have the ball at the edge of the box. Their 4 is right in front of you. Look around before you shoot.',
  hint: 'Is anyone free at the back post?',
  lesson: "If your shot is blocked and a teammate has an easier chance, pass it.",
  us:   { 1:[25,70], 3:[13,42], 4:[25,44], 2:[37,42], 6:[25,20], 10:[33,15], 11:[14,8], 9:[30,7], 7:[43,12] },
  them: { 1:[25,2.5], 2:[20,4.5], 4:[25,13.5], 3:[33.5,5], 6:[37,20], 10:[18,27], 9:[26,49], 7:[9,24], 11:[42,24] },
  ball: '6',
  pass: {
    11: P(3, 'Pro choice', 'A defender is right in front of you, so your shot gets blocked. Your 11 is alone at the back post. Give the 11 a tap-in.'),
    9:  P(0, 'Marked', 'Their 3 is right on the 9.'),
    10: P(1, 'Marked', 'Their 6 is close to the 10, and the 11 was wide open.'),
    7:  P(1, 'Backwards', 'Back out wide when your 11 was free in front of goal?'),
    4:  P(0, 'Way too safe', 'Your 11 was free at the back post!'),
    3:  P(0, 'Way too safe', 'Your 11 was free at the back post!'),
    2:  P(0, 'Way too safe', 'Your 11 was free at the back post!'),
    1:  P(0, 'Way too safe', 'Your 11 was free at the back post!')
  },
  shoot: P(1, 'Blocked', 'Their 4 is standing right in the way. The 11 was wide open.', { end: [25,14.5] }),
  carry: [],
  elsewhere: P(1, 'Not quite', 'Dribbling into their 4 when your 11 is free at the back post?'),
  best: { kind: 'pass', to: '11' } },

{ ch: 5, type: 'ball', title: 'Long shot?',
  prompt: "You're 30 yards out and nobody is pressing you. Shoot, or something better?",
  hint: 'How far is 30 yards for our keepers and goals? Who else is free?',
  lesson: 'Shoot when you are in range with a clear path. From far out, a pass is usually better.',
  us:   { 1:[25,70], 3:[12,48], 4:[25,50], 2:[38,48], 6:[25,31], 10:[31,20], 11:[7,22], 9:[23,12], 7:[44,22] },
  them: { 1:[25,3], 2:[13,12], 4:[24,8], 3:[37,12], 6:[18,24], 10:[21,38], 9:[28,45], 7:[8,30], 11:[42,30] },
  ball: '6',
  pass: {
    10: P(3, 'Pro choice', 'From 30 yards a shot rarely beats the keeper. Your 10 is free in the pocket, and now the 10 has the ball in shooting range.'),
    7:  P(2, 'Good', 'Open and forward. The 10 is even closer to goal.'),
    9:  P(1, 'Marked', 'Their 4 is right on your 9.'),
    11: P(1, 'Risky', 'Their 6 can cut that pass out.'),
    4:  TOO_SAFE('Too safe. You had a free 10 in front of you.'),
    3:  P(0, 'Intercepted', 'Their 10 is standing in that lane.', { cut: '10' }),
    2:  TOO_SAFE('Too safe. You had a free 10 in front of you.'),
    1:  TOO_SAFE('Too safe. You had a free 10 in front of you.')
  },
  shoot: P(1, 'Too far', "That's 30 yards. Usually the keeper catches it and we lose the ball. Get closer first."),
  carry: [[25, 24, 5, 2, 'Okay', 'Driving closer is smart, but your 10 was already there.']],
  elsewhere: P(1, 'Not quite', 'Find the free 10 in the pocket.'),
  best: { kind: 'pass', to: '10' } },

{ ch: 5, type: 'ball', title: 'Look at the keeper',
  prompt: 'A clearance falls to you at the edge of the box. Their keeper ran out for the cross and is out of position. Go!',
  hint: 'Where is their keeper? Where is the goal?',
  lesson: 'Always check where the keeper is. If the keeper is out of position, shoot.',
  us:   { 1:[25,70], 3:[13,44], 4:[25,46], 2:[37,44], 6:[26,23], 10:[37,18], 11:[13,14], 9:[29,13], 7:[44,10] },
  them: { 1:[33,7], 2:[17,9.5], 4:[33.5,15], 3:[41,6], 6:[31,28], 10:[19,30], 9:[29,40], 7:[8,26], 11:[42,26] },
  ball: '6',
  arrows: [{ team: 'them', from: [33,6.5], to: [30,4], dash: 1 }],
  pass: {
    11: P(1, 'Slow', 'The goal was open, and their 2 is near your 11.'),
    9:  P(1, 'Slow', 'Their 4 is on the 9, and the goal was open.'),
    10: P(1, 'Slow', 'The goal was open. Every extra pass gives their keeper time to get back.'),
    7:  P(1, 'Slow', 'The goal was open. Every extra pass gives their keeper time to get back.'),
    4:  P(0, 'The goal was open!', 'Their keeper was out of position. That was your chance.'),
    3:  P(0, 'The goal was open!', 'Their keeper was out of position. That was your chance.'),
    2:  P(0, 'The goal was open!', 'Their keeper was out of position. That was your chance.'),
    1:  P(0, 'The goal was open!', 'Their keeper was out of position. That was your chance.')
  },
  shoot: P(3, 'Pro choice', 'Their keeper is off the line. You looked up and hit it at the open net before the keeper got back.', { end: [23.5,-1.2] }),
  carry: [],
  elsewhere: P(1, 'Too slow', 'Every touch gives their keeper time to get back. Shoot!'),
  best: { kind: 'shoot' } }
];

/* ---------------- Motion: the build-ups and what happens next (chapter 1 for now) ----------------
   Matched to the puzzles above by title. Format at the top of riddles-motion.js. */
// a teammate gets the ball and a defender steps in and takes it
const steal = (who, them, to, head, sub) => [
  { t: .8, them: { [them]: to }, tag: { ['them:' + them]: 'TACKLE' }, head, sub, cam: { at: 'us:' + who, zoom: 1.5, tilt: .45 } },
  { t: .5, pass: 'them:' + them, wait: 1.1 }];
// Play forward: a pass back lets them push up and mark the free 10
const shutDoor = press => [{ t: 1.3, them: { 9: press, 6: [27.5, 28.3], 10: [20.5, 43] },
  tag: { 'them:9': 'PRESS', 'them:6': 'MARK' }, marks: [{ l: ['us:6', 'us:10'], c: 'bad', x: true }],
  head: 'It goes back. The gap closes.', sub: 'They push up, and your free 10 is marked again.',
  cam: { at: [25, 44], zoom: 1.2, tilt: .45 }, wait: 1.3 }];
// Set it back: turning with their 10 on your back
const turned = { replace: true, steps: [
  { t: .7, face: { 'us:6': 'up' }, them: { 10: [25.5, 45.2] }, tag: { 'them:10': 'TACKLE' },
    head: 'Turned into trouble', sub: 'Their 10 was right on your back.', cam: { at: [25, 47], zoom: 1.6, tilt: .45 } },
  { t: .45, pass: 'them:10' },
  { t: 1, them: { 10: [21, 53.5], 9: [16, 59] }, us: { 4: [24, 57] }, sub: "And now they're running at our goal.", head: 'Turned into trouble',
    cam: { at: [23, 52], zoom: 1.35, tilt: .5 }, wait: .9 }] };

const MOTION = {
  'Play forward': {
    intro: { start: { ball: 'us:4', us: { 6: [27, 51], 10: [29, 35], 9: [27, 24], 11: [9, 38], 7: [41, 38], 3: [13, 62], 2: [37, 62] },
        them: { 9: [23, 53], 10: [16, 37], 7: [9, 40], 11: [41, 41], 6: [33, 24], 2: [13, 15], 4: [25, 13], 3: [37, 15] } },
      cam: { at: [25, 56], zoom: 1.6, tilt: .5 },
      steps: [
        { t: 1.6, pass: 'us:6', pd: .2,
          us: { 6: [25, 47], 10: [25, 31], 9: [26, 20], 11: [6, 34], 7: [44, 34], 3: [12, 60], 2: [38, 60] },
          them: { 9: [21, 57], 10: [18, 41], 7: [10, 44], 11: [40, 45], 6: [35, 27], 2: [13, 17], 4: [25, 15], 3: [37, 17] },
          head: "Nobody's on you", sub: 'Your 4 plays it in. Look up before it arrives.', cam: { at: [25, 47], zoom: 1.45, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      10: [{ t: 1.2, face: { 'us:10': 'up' }, us: { 10: [25, 25.5], 9: [30, 15], 11: [8.5, 25], 7: [41.5, 25] },
        them: { 6: [31, 26.5], 4: [25, 19.5], 2: [15, 18.5], 3: [35, 18.5] },
        focus: ['us:10', 'us:9', 'us:11', 'us:7', 'them:2', 'them:4', 'them:3', 'them:1', 'them:6'],
        chain: [{ ns: ['them:2', 'them:4', 'them:3'], c: 'good' }], tag: { 'us:10': ['TURNED', 'good'] },
        head: 'One pass, four players gone', sub: 'Their 7, 10, 11 and 9 are all behind the ball now.',
        cam: { at: 'us:10', zoom: 1.35, tilt: .6 }, wait: 1.4 }],
      7: [{ t: 1.1, them: { 6: [40.5, 30.5], 3: [41, 24] }, tag: { 'them:6': 'PRESS', 'them:3': 'COVER' },
        head: 'Wide is slower', sub: 'Their 6 and 3 get across in time. Through the middle was one pass.',
        cam: { at: [41, 30], zoom: 1.4, tilt: .45 }, wait: 1.2 }],
      9: [{ t: .8, them: { 4: [26.3, 16.5] }, tag: { 'them:4': 'TIGHT' }, head: 'A defender right behind',
          sub: 'Their 4 is on the 9 before the ball gets there.', cam: { at: 'us:9', zoom: 1.5, tilt: .4 } },
        { t: .6, pass: 'them:4', wait: 1 }],
      4: shutDoor([22.5, 58.2]), 3: shutDoor([15.2, 58.2]), 2: shutDoor([34.6, 58.4]), 1: shutDoor([23, 66.5])
    } },

  'Switch it': {
    intro: { start: { ball: 'us:2', us: { 6: [27, 51], 10: [29, 36], 9: [27, 22], 11: [7, 33], 7: [44, 35], 3: [11, 60], 4: [24, 63] },
        them: { 9: [34, 48], 10: [34, 41], 7: [14, 32], 6: [26, 28], 11: [40, 26], 2: [13, 16], 4: [24, 14], 3: [34, 16], 1: [24, 3] } },
      cam: { at: [37, 52], zoom: 1.6, tilt: .5 },
      steps: [
        { t: 1.5, us: { 6: [26, 50], 10: [30, 33], 9: [28, 19], 11: [5, 30], 7: [45, 32], 3: [10, 58], 4: [24, 62] },
          them: { 9: [33, 54], 10: [32, 43.5], 7: [19, 33], 6: [31, 29], 11: [42, 28], 2: [17, 17], 4: [27, 15], 3: [37, 17], 1: [25, 3] },
          head: "They've all shifted right", sub: 'Your 2 is under pressure out on the right.', cam: { at: [35, 48], zoom: 1.55, tilt: .5 } },
        { t: 1.2, pass: 'us:6', pd: .1, us: { 6: [24, 48] }, them: { 10: [30, 45] }, cam: 'wide',
          head: 'Your 2 plays it in to you', sub: 'Now look at the whole field.', wait: .5 }] },
    after: {
      lead0: [{ t: 1.3, us: { 11: [8, 14.5], 9: [31, 10], 10: [21, 25] }, them: { 2: [12.5, 16.5], 4: [22.5, 14], 7: [15, 30], 6: [28, 28], 3: [32, 16] },
        hatch: [{ pts: [[0, 9], [15, 9], [15, 40], [0, 40]], c: 'good' }], tag: { 'us:11': ['FREE', 'good'], 'them:2': 'LATE' },
        head: "Switched. They're on the wrong side.", sub: 'Your 11 runs onto it, and their 2 is a step behind.',
        cam: { at: [12, 20], zoom: 1.45, tilt: .55 }, wait: 1.3 }],
      11: [{ t: 1.1, them: { 2: [11, 23.5] }, hatch: [{ pts: [[1, 13], [12, 13], [12, 25], [1, 25]], c: 'good' }], tag: { 'them:2': 'CLOSE' },
        head: 'Good switch, but to feet', sub: 'The grass in front was empty. Played into it, the 11 runs on at full speed.',
        cam: { at: [9, 25], zoom: 1.45, tilt: .5 }, wait: 1.3 }],
      10: steal('10', '6', [30, 29.6], 'Crowded', 'Their 6 is right on your 10.'),
      7: steal('7', '11', [43, 29], 'Crowded', 'Their 11 is right on your 7. The right side is jammed.'),
      9: steal('9', '4', [27.5, 16], 'Marked', "Their 4 is right there. It won't stick.")
    } },

  'Away from pressure': {
    intro: { start: { ball: 'us:4', us: { 6: [26, 51.5], 7: [43, 40], 10: [23, 35], 2: [38, 60], 3: [12, 61], 11: [5, 35], 9: [27, 22] },
        them: { 10: [12, 38], 9: [17, 56], 7: [11, 37], 11: [41, 51], 3: [41, 22], 6: [21, 25], 2: [14, 16], 4: [26, 14] } },
      cam: { at: [22, 52], zoom: 1.6, tilt: .5 },
      steps: [
        { t: 1.5, pass: 'us:6', pd: .25,
          us: { 6: [25, 47], 7: [45, 36], 10: [22, 32], 2: [39, 58], 3: [11, 59], 11: [6, 33], 9: [27, 20] },
          them: { 10: [19, 44], 9: [14, 52], 7: [10, 40], 11: [40, 48], 3: [42, 25], 6: [22, 27.5], 2: [14, 17], 4: [26, 15] },
          tag: { 'them:10': 'PRESS' }, head: 'Here comes their 10', sub: "From your left, at full speed. You'll get one touch.",
          cam: { at: [22, 47], zoom: 1.55, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      7: [{ t: 1.1, face: { 'us:7': 'up' }, us: { 6: [29, 45], 7: [45, 31.5] }, them: { 10: [24, 46.5], 3: [42.5, 26.5] },
        hatch: [{ pts: [[5, 37], [26, 37], [26, 57], [5, 57]], c: 'bad' }], tag: { 'them:10': 'TOO LATE', 'us:7': ['FREE', 'good'] },
        head: 'Out the other side', sub: "Their 10 arrives, and the ball's already gone.",
        cam: { at: [30, 42], zoom: 1.15, tilt: .5 }, wait: 1.3 }],
      4: [{ t: 1.2, them: { 10: [23, 57] }, tag: { 'them:10': 'PRESS' }, head: 'It goes back. They keep coming.',
        sub: 'Their 10 just keeps pressing. Your 7 was free on the other side.', cam: { at: [25, 54], zoom: 1.35, tilt: .45 }, wait: 1.2 }],
      10: [{ t: .9, them: { 6: [22, 28.6] }, tag: { 'them:6': 'TIGHT' }, head: 'Tight',
        sub: "Their 6 is right behind your 10, and their 10 is closing. Tough spot to turn in.", cam: { at: 'us:10', zoom: 1.5, tilt: .45 }, wait: 1.1 }],
      carry1: [{ t: .6, pass: 'them:10', tag: { 'them:10': 'TACKLE' }, head: 'Into pressure', sub: 'You dribbled right into their 10.',
        cam: { at: 'them:10', zoom: 1.45, tilt: .45 }, wait: 1.1 }]
    } },

  'Set it back': {
    intro: { start: { ball: 'us:4', us: { 6: [25, 42.5], 10: [24, 34], 9: [28, 23], 11: [8, 37], 7: [42, 36], 3: [12, 62], 2: [38, 62] },
        them: { 10: [25, 37], 9: [17, 58], 7: [12, 40], 11: [38, 44], 6: [24, 23] } },
      cam: { at: [25, 50], zoom: 1.7, tilt: .45 },
      steps: [
        { t: 1.5, pass: 'us:6', pd: .3, face: { 'us:6': 'down' },
          us: { 6: [25, 48], 10: [23, 31], 9: [28, 20], 11: [6, 34], 7: [44, 33], 3: [11, 60], 2: [39, 60] },
          them: { 10: [25, 43.4], 9: [14, 55], 7: [10, 42], 11: [40, 46], 6: [24, 26] },
          tag: { 'them:10': 'TIGHT' }, head: 'Your 4 plays it in', sub: "You're facing your own goal, and their 10 is right on your back.",
          cam: { at: [25, 47], zoom: 1.65, tilt: .45 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      4: [{ t: .9, face: { 'us:6': 'up' }, us: { 6: [30.5, 45.5] }, them: { 10: [25.5, 46.8] },
          head: 'Set it back, then spin', sub: "Their 10 follows the ball. You're free.", cam: { at: [27, 52], zoom: 1.45, tilt: .5 } },
        { t: 1, pass: 'us:6', pd: .1, us: { 6: [30.5, 44] }, tag: { 'us:6': ['OPEN', 'good'], 'them:10': 'BEATEN' },
          head: "Now you're facing their goal", sub: 'One touch back, a quick spin, and their 10 is out of the play.',
          cam: { at: [28, 47], zoom: 1.4, tilt: .55 }, wait: 1.3 }],
      10: turned, 9: turned, 7: turned, 11: turned
    } },

  'Over the top': {
    intro: { start: { ball: 'us:4', us: { 6: [25, 54], 9: [28, 29], 10: [24, 37], 11: [7, 33], 7: [43, 33], 3: [12, 60], 2: [38, 60] },
        them: { 2: [10, 26], 4: [25, 25.5], 3: [40, 26], 1: [25, 4], 6: [23, 32], 10: [17, 41], 7: [12, 47], 11: [38, 44], 9: [30, 47] } },
      cam: { at: [25, 34], zoom: 1.35, tilt: .6 },
      steps: [
        { t: 1.7, pass: 'us:6', pd: .45,
          us: { 6: [24, 50], 9: [29, 34.5], 10: [24, 42], 11: [6, 38], 7: [44, 38], 3: [12, 58], 2: [38, 58] },
          them: { 2: [10, 34], 4: [25, 33.5], 3: [40, 34], 1: [25, 7], 6: [23, 38], 10: [17, 46], 7: [12, 52], 11: [38, 49], 9: [31, 52] },
          chain: [{ ns: ['them:2', 'them:4', 'them:3'], c: 'good' }],
          head: 'Their back line pushes up', sub: "All the way to halfway. What's behind it?", cam: { at: [25, 40], zoom: 1.3, tilt: .6 } },
        { t: 1, cam: 'wide', head: '', chain: [] }] },
    after: {
      lead0: [{ t: 1.3, us: { 9: [28, 13.5] }, them: { 2: [17, 25], 4: [26, 24], 3: [35, 25], 1: [26, 8.5] },
        chain: [{ ns: ['them:2', 'them:4', 'them:3'], c: 'good' }], hatch: [{ pts: [[4, 13], [46, 13], [46, 32], [4, 32]], c: 'good' }],
        tag: { 'us:9': ['THROUGH', 'good'] }, head: 'In behind. Nobody catches the 9.', sub: 'When their line pushes high, the space is behind it.',
        cam: { at: [27, 20], zoom: 1.4, tilt: .6 }, wait: 1.3 }],
      9: { replace: true, steps: [{ t: 1.2, pass: 'them:4', pd: .05, us: { 9: [30.5, 26.5] }, them: { 4: [28, 36] }, tag: { 'them:4': 'STEPS IN' },
        head: 'Behind the run', sub: 'Your 9 is already sprinting. The ball arrives where the 9 was, and their 4 takes it.',
        cam: { at: [28, 32], zoom: 1.45, tilt: .5 }, wait: 1.2 }] }
    } },

  /* ---- 2. Get open ---- */
  'Out of the shadow': {
    intro: { start: { ball: 'us:1', us: { 4: [23, 64.5], 6: [26, 42], 10: [25, 33], 7: [42, 36] }, them: { 9: [30, 51], 10: [12, 42], 11: [42, 38], 6: [25, 23] } },
      cam: { at: [25, 64], zoom: 1.6, tilt: .5 },
      steps: [
        { t: 1.5, pass: 'us:4', pd: .15, us: { 4: [25, 62], 6: [25, 46], 10: [24, 30], 7: [44, 33] }, them: { 9: [25, 54], 10: [14, 45], 11: [40, 41], 6: [25, 26] },
          head: 'Your keeper plays it to the 4', sub: 'You drop in to help. Where is their 9?', cam: { at: [25, 56], zoom: 1.5, tilt: .5 } },
        { t: 1.1, marks: [{ s: ['them:9', 'us:4'], len: 11 }], head: 'Their 9 is in the way', sub: "You're standing in the shadow of their 9.", cam: 'wide' }] },
    after: {
      zone0: [{ t: 1.1, face: { 'us:6': 'up' }, us: { 6: { by: [1, -4] } }, marks: [{ s: ['them:9', 'us:4'], len: 11 }], tag: { 'us:6': ['OPEN', 'good'] },
        head: 'Out of the shadow', sub: 'The 4 passes around their 9, and you can turn and play forward.', cam: { at: 'us:6', zoom: 1.35, tilt: .5 }, wait: 1.2 }],
      zone1: [{ t: .9, them: { 10: [15.5, 46.5] }, tag: { 'them:10': 'PRESS' }, head: 'Out of the shadow, into their 10',
        sub: 'It works, but their 10 is right there. The right side had more room.', cam: { at: [17, 49], zoom: 1.45, tilt: .45 }, wait: 1.1 }],
      zone2: [{ t: .9, pass: 'them:9', marks: [{ s: ['them:9', 'us:4'], len: 11 }], tag: { 'them:9': 'CUT' }, head: 'Hidden behind their 9',
          sub: 'The 4 tries it anyway, and their 9 cuts it out.', cam: { at: [25, 55], zoom: 1.5, tilt: .45 } },
        { t: 1, them: { 9: [20, 58.5] }, head: 'Hidden behind their 9', sub: "And now they're running at our goal.", wait: 1 }]
    } },

  'Help the 3': {
    intro: { start: { ball: 'us:4', us: { 3: [12, 60], 6: [30, 45], 11: [7, 39] }, them: { 7: [12, 44], 9: [23, 58], 10: [26, 41] } },
      cam: { at: [20, 61], zoom: 1.6, tilt: .5 },
      steps: [
        { t: 1.5, pass: 'us:3', pd: .2, us: { 3: [10, 57], 6: [32, 48], 11: [6, 36] }, them: { 7: [9, 49], 9: [20, 62], 10: [25, 44] }, tag: { 'them:7': 'PRESS' },
          head: 'Your 4 swings it out to the 3', sub: 'Their 7 is closing in on the 3, fast.', cam: { at: [14, 56], zoom: 1.55, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.1, face: { 'us:6': 'up' }, us: { 6: { by: [2, -3.5] } }, them: { 7: [12, 52] }, tag: { 'them:7': 'TOO LATE', 'us:6': ['FREE', 'good'] },
        head: 'Around their 7', sub: 'Inside and a bit ahead: the 3 finds you, and you can play forward or switch it.', cam: { at: 'us:6', zoom: 1.4, tilt: .5 }, wait: 1.2 }],
      zone1: [{ t: .9, them: { 7: [9.5, 51] }, tag: { 'them:7': 'PRESS' }, head: 'Too close', sub: 'Their 7 can press you and the 3 at the same time.',
        cam: { at: [12, 54], zoom: 1.5, tilt: .45 }, wait: 1.1 }],
      zone2: [{ t: .9, pass: 'them:9', tag: { 'them:9': 'CUT' }, head: 'Right next to their 9', sub: 'In front of our goal, their 9 steps in and steals it.',
        cam: { at: [18, 62], zoom: 1.5, tilt: .45 }, wait: 1.2 }]
    } },

  'Goal kick pocket': {
    intro: { start: { us: { 3: [12, 62], 2: [38, 62], 4: [25, 63], 6: [25, 42], 7: [43, 35], 11: [7, 35] }, them: { 7: [13, 54], 11: [37, 54], 9: [25, 52], 10: [25, 46] } },
      cam: { at: [25, 62], zoom: 1.5, tilt: .55 },
      steps: [
        { t: 1.6, us: { 3: [9, 63], 2: [41, 63], 4: [25, 61], 6: [25, 46], 7: [45, 38], 11: [5, 38] }, them: { 7: [13, 59], 11: [37, 59], 9: [25, 57], 10: [25, 51] },
          chain: [{ ns: ['them:7', 'them:9', 'them:11'], c: 'bad' }], head: 'Goal kick. They push up.',
          sub: 'Their 9 and 10 guard the middle, and their 7 and 11 mark our defenders.', cam: { at: [25, 59], zoom: 1.35, tilt: .55 } },
        { t: 1, cam: 'wide', head: '', chain: [] }] },
    after: {
      zone0: [{ t: 1.1, face: { 'us:6': 'up' }, us: { 6: { by: [0, -3.5] } }, chain: [{ ns: ['them:7', 'them:10', 'them:11'], c: 'good' }], tag: { 'us:6': ['TURNED', 'good'] },
        head: 'Through their press', sub: 'The keeper finds you in the gap, and you turn with four of theirs behind you.', cam: { at: 'us:6', zoom: 1.4, tilt: .55 }, wait: 1.2 }],
      zone1: [{ t: 1.1, face: { 'us:6': 'up' }, us: { 6: { by: [0, -3.5] } }, chain: [{ ns: ['them:7', 'them:10', 'them:11'], c: 'good' }], tag: { 'us:6': ['TURNED', 'good'] },
        head: 'Through their press', sub: 'The keeper finds you in the gap, and you turn with four of theirs behind you.', cam: { at: 'us:6', zoom: 1.4, tilt: .55 }, wait: 1.2 }],
      zone2: [{ t: .8, marks: [{ s: ['them:9', 'us:1'], len: 12 }, { s: ['them:10', 'us:1'], len: 9 }], head: 'Hidden',
        sub: "Their 9 and 10 are both between you and the keeper. There's no pass.", cam: { at: [25, 56], zoom: 1.4, tilt: .5 }, wait: 1.3 }]
    } },

  'Escape route': {
    intro: { start: { ball: 'us:3', us: { 3: [11, 54], 11: [5, 42], 6: [29, 46] }, them: { 2: [8, 28], 7: [15, 32], 10: [30, 38] } },
      cam: { at: [9, 47], zoom: 1.6, tilt: .5 },
      steps: [
        { t: 1.6, pass: 'us:11', pd: .2, us: { 11: [6, 38], 6: [27, 49] }, them: { 2: [8, 32], 7: [12, 35], 10: [29, 41] }, tag: { 'them:2': 'PRESS', 'them:7': 'PRESS' },
          head: 'Your 11 gets it by the sideline', sub: 'Their 2 and 7 close in to trap the 11.', cam: { at: [10, 38], zoom: 1.55, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.1, face: { 'us:6': 'up' }, us: { 6: { by: [3, -1] } }, them: { 2: [7.5, 35.5], 7: [11, 39.5] }, tag: { 'them:2': 'PRESS', 'them:7': 'TOO LATE' },
          head: 'Out of the trap', sub: 'One pass inside and behind, and their 2 and 7 are left holding nothing.', cam: { at: 'us:6', zoom: 1.3, tilt: .5 } },
        { t: 1.2, pass: 'us:7', air: true, us: { 7: [44, 24] }, untag: true, head: 'Switch it', sub: 'And the 7 has the whole right side.',
          cam: { at: [32, 32], zoom: 1.1, tilt: .5 }, wait: 1.1 }],
      zone3: [{ t: .8, them: { 7: [9, 37] }, tag: { 'them:7': 'TACKLE' }, head: 'No help', sub: 'The 11 is trapped with no pass, and their 7 takes it.',
          cam: { at: [8, 37], zoom: 1.5, tilt: .45 } },
        { t: .5, pass: 'them:7', wait: 1.1 }]
    } },

  'Stay home': {
    intro: { start: { ball: 'us:7', us: { 7: [44, 30], 6: [33, 36], 9: [25, 16], 10: [31, 22], 11: [13, 18], 2: [38, 53], 3: [13, 55], 4: [25, 57], 1: [25, 67] },
        them: { 2: [17, 12], 4: [28, 10], 3: [37, 16], 11: [43, 34], 6: [32, 27], 9: [26, 40], 10: [24, 33], 7: [9, 26] } },
      cam: { at: [43, 33], zoom: 1.55, tilt: .55 },
      steps: [
        { t: 1.7, us: { 7: [44, 22], 6: [37, 31], 9: [25, 10], 10: [31, 17], 11: [13, 12], 2: [38, 48], 3: [13, 50], 4: [25, 52], 1: [25, 64] },
          them: { 2: [17, 8], 4: [28, 6], 3: [37, 12], 11: [43, 29], 6: [32, 23], 9: [26, 44], 10: [24, 37], 7: [9, 22] },
          head: 'We attack down the right', sub: 'Your 7 drives at their box. Where should the 6 be?', cam: { at: [40, 24], zoom: 1.4, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.1, face: { 'us:6': 'up' }, us: { 6: { by: [0, -2] } }, marks: [{ ring: 'them:9', c: 'bad' }, { ring: 'them:10', c: 'bad' }], tag: { 'us:6': ['HOME', 'good'] },
        head: 'Behind the ball, in the middle', sub: 'You can take a pass back from the 7, and their 9 and 10 have nobody to run at.',
        cam: { at: [27, 33], zoom: 1.3, tilt: .5 }, wait: 1.3 }],
      zone1: [{ t: .8, them: { 11: [43, 24.5] }, tag: { 'them:11': 'TACKLE' }, head: 'Ball watching', sub: 'We lose it, and nobody is guarding the middle.',
          cam: { at: [43, 24], zoom: 1.45, tilt: .45 } },
        { t: .5, pass: 'them:11' },
        { t: 1.1, pass: 'them:10', air: true, them: { 10: [21, 40] }, hatch: [{ pts: [[15, 30], [35, 30], [35, 42], [15, 42]], c: 'bad' }],
          cam: { at: [26, 38], zoom: 1.2, tilt: .5 }, wait: 1 }],
      zone2: [{ t: 1, pass: 'them:1', air: true, head: 'Nobody home', sub: 'Their keeper catches the cross…', cam: { at: [25, 9], zoom: 1.4, tilt: .5 } },
        { t: 1, pass: 'them:10', air: true, them: { 10: [22, 40] }, sub: '…throws it out, and their 9 and 10 run at our defenders.', head: 'Nobody home',
          cam: { at: [26, 44], zoom: 1.25, tilt: .5 } },
        { t: 1, them: { 10: [29, 47], 9: [19, 51] }, wait: 1 }]
    } },

  /* ---- 3. Guard the middle ---- */
  'Block the lane': {
    intro: { start: { ball: 'them:3', them: { 6: [26, 28.5], 10: [24, 44] }, us: { 10: [19, 26], 6: [19, 40] } },
      cam: { at: [28, 25], zoom: 1.5, tilt: .5 },
      steps: [
        { t: 1.6, pass: 'them:6', pd: .2, them: { 6: [25, 32], 10: [28, 50] }, us: { 10: [21, 29], 6: [16, 42] }, tag: { 'them:10': 'RUN' },
          head: 'Their 6 has it', sub: 'And their 10 sneaks into the space behind you.', cam: { at: [25, 40], zoom: 1.35, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1, us: { 10: [23, 30] }, marks: [{ l: ['them:6', 'them:10'], c: 'bad', x: true }], tag: { 'us:10': ['PRESS', 'good'], 'us:6': ['BLOCKING', 'good'] },
          head: 'Lane closed', sub: "Their 6 can't find the 10, and your 10 closes in from behind.", cam: { at: [26, 38], zoom: 1.4, tilt: .5 } },
        { t: .7, pass: 'us:10', wait: 1.1 }],
      zone1: [{ t: 1, pass: 'them:10', tag: { 'us:6': ['MARKING', 'good'] }, head: 'Marking works too', sub: 'But the ball still reaches their 10. Better to stop the pass.',
        cam: { at: [27, 47], zoom: 1.4, tilt: .5 }, wait: 1.1 }],
      zone2: [{ t: 1, pass: 'them:10', air: true, tag: { 'them:10': 'FREE' }, head: 'Wrong job', sub: 'You pressed their 6, so the ball goes over you to their 10…',
          cam: { at: [27, 46], zoom: 1.35, tilt: .5 } },
        { t: 1, them: { 10: [27, 55] }, head: 'Wrong job', sub: '…and their 10 runs at our defenders.', wait: 1 }],
      zone3: [{ t: 1, pass: 'them:10', tag: { 'them:10': 'FREE' }, head: 'Their 10 is free', sub: 'One pass behind you…', cam: { at: [27, 46], zoom: 1.35, tilt: .5 } },
        { t: 1, them: { 10: [27, 55] }, head: 'Their 10 is free', sub: '…and their 10 runs at our defenders.', wait: 1 }]
    } },

  'Fill the gap': {
    intro: { start: { ball: 'them:6', them: { 11: [44, 43.5], 9: [32.5, 47.5] }, us: { 2: [39.5, 55], 6: [27, 41] } },
      cam: { at: [34, 42], zoom: 1.5, tilt: .5 },
      steps: [
        { t: 1.6, pass: 'them:11', pd: .2, them: { 11: [45, 47], 9: [34, 52] }, us: { 2: [42, 51], 6: [26, 45] }, tag: { 'us:2': ['PRESS', 'good'], 'them:9': 'RUN' },
          head: 'Your 2 steps out to press', sub: 'And their 9 runs into the space the 2 left behind.', cam: { at: [39, 52], zoom: 1.45, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.1, them: { 9: [34, 54.5] }, tag: { 'us:6': ['COVER', 'good'], 'us:2': ['PRESS', 'good'] }, head: 'Gap filled',
        sub: "The 2 presses, you cover. Their 9's run goes nowhere.", cam: { at: [37, 56], zoom: 1.4, tilt: .5 }, wait: 1.2 }],
      zone2: [{ t: 1.2, pass: 'them:9', them: { 9: [36, 62] }, tag: { 'them:9': 'FREE' }, head: 'Double team',
        sub: 'Two of us on the winger, and their 9 is free in the gap in front of our goal.', cam: { at: [37, 59], zoom: 1.4, tilt: .5 }, wait: 1.1 }],
      zone3: [{ t: 1.2, pass: 'them:9', them: { 9: [36, 62] }, tag: { 'them:9': 'FREE' }, head: 'Gap left open',
        sub: 'Their 9 runs into the space behind the 2, right in front of our goal.', cam: { at: [36, 59], zoom: 1.4, tilt: .5 }, wait: 1.1 }]
    } },

  "Don't dive in": {
    intro: { start: { ball: 'them:6', them: { 10: [23, 35] }, us: { 6: [33, 54] } },
      cam: { at: [27, 33], zoom: 1.5, tilt: .5 },
      steps: [
        { t: 1.6, pass: 'them:10', pd: .1, them: { 10: [24, 40] }, us: { 6: [31, 51] }, head: 'Their 10 picks it up',
          sub: 'And dribbles straight at you, with our defenders busy.', cam: { at: [26, 45], zoom: 1.45, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.2, them: { 10: [23, 39.5] }, us: { 10: [28, 37] }, tag: { 'us:6': ['JOCKEY', 'good'], 'us:10': ['HELP', 'good'] }, head: 'On your feet, slow it down',
        sub: 'Their 10 has to check back, and your 10 races back to help.', cam: { at: [25, 43], zoom: 1.45, tilt: .5 }, wait: 1.2 }],
      zone1: [{ t: 1.1, them: { 10: [21, 50] }, tag: { 'them:10': 'PAST YOU' }, head: 'Dived in', sub: 'One touch past you, and their 10 is through on our defenders.',
        cam: { at: [23, 49], zoom: 1.4, tilt: .5 }, wait: 1.1 }],
      zone2: [{ t: .9, them: { 10: [24, 43] }, head: 'Too far off', sub: 'Nobody bothers their 10, who has all the time in the world to shoot.',
          cam: { at: [25, 52], zoom: 1.3, tilt: .5 } },
        { t: .8, shot: [26, 71], wait: 1 }]
    } },

  'Track the runner': {
    intro: { start: { ball: 'them:2', them: { 7: [8, 44], 6: [31, 36] }, us: { 6: [26, 41] } },
      cam: { at: [10, 36], zoom: 1.5, tilt: .5 },
      steps: [
        { t: 1.6, pass: 'them:7', pd: .2, air: true, them: { 7: [6, 48], 6: [28, 38] }, us: { 6: [25, 44] }, head: 'Their 7 has it out wide',
          sub: 'Watch their 6. A late run is coming.', cam: { at: [14, 45], zoom: 1.35, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: 1.1, them: { 6: [26.5, 51] }, pass: 'us:6', air: true, pd: .4, tag: { 'us:6': ['WON IT', 'good'] }, head: 'Runner tracked',
        sub: "You're between the runner and our goal. The cross is yours.", cam: { at: [25, 54], zoom: 1.4, tilt: .5 }, wait: 1.1 }],
      zone1: [{ t: .6, them: { 6: [30.5, 47] }, tag: { 'them:6': 'RUN' }, head: 'Keep going!', sub: 'You tracked the run, but not all the way. The runner still gets to the cross first.', cam: { at: [26, 53], zoom: 1.4, tilt: .5 } },
        { t: .7, them: { 6: [27.5, 56.5] }, pass: 'them:6', air: true, pd: .25, tag: { 'them:6': 'FREE' }, wait: 1.1 }],
      zone2: [{ t: .6, them: { 6: [30.5, 47] }, tag: { 'them:6': 'RUN' }, head: 'Ball watching', sub: 'Their 6 runs right past you, and the cross finds the runner in front of our goal.', cam: { at: [26, 53], zoom: 1.4, tilt: .5 } },
        { t: .7, them: { 6: [27.5, 56.5] }, pass: 'them:6', air: true, pd: .25, tag: { 'them:6': 'FREE' }, wait: 1.1 }],
      zone3: [{ t: .6, them: { 6: [30.5, 47] }, tag: { 'them:6': 'RUN' }, head: 'Left behind', sub: 'Their 6 runs past you, and the cross finds the runner in front of our goal.', cam: { at: [26, 53], zoom: 1.4, tilt: .5 } },
        { t: .7, them: { 6: [27.5, 56.5] }, pass: 'them:6', air: true, pd: .25, tag: { 'them:6': 'FREE' }, wait: 1.1 }]
    } },

  'Stay central': {
    intro: { start: { ball: 'them:7', them: { 7: [6, 46], 10: [26, 47] }, us: { 3: [10, 60], 11: [10, 41], 6: [15, 45] } },
      cam: { at: [9, 47], zoom: 1.55, tilt: .5 },
      steps: [
        { t: 1.6, them: { 7: [5, 52], 10: [25, 52] }, us: { 3: [9, 57], 11: [9, 45], 6: [13, 48] }, head: 'Their 7 runs at our left side',
          sub: 'Our 3 and 11 go with the 7. Where are you needed?', cam: { at: [12, 52], zoom: 1.45, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: .9, marks: [{ l: ['them:7', 'them:10'], c: 'bad', x: true }], tag: { 'us:6': ['BLOCKING', 'good'] }, head: 'Lane closed',
          sub: "Our 3 and 11 handle the winger, and the pass inside to their 10 isn't on.", cam: { at: [14, 53], zoom: 1.4, tilt: .5 } },
        { t: .8, us: { 3: [7, 54.5] }, tag: { 'us:3': ['TACKLE', 'good'] } },
        { t: .5, pass: 'us:3', wait: 1 }],
      zone2: [{ t: 1, pass: 'them:10', air: true, tag: { 'them:10': 'FREE' }, head: 'Three on one',
          sub: 'All of us on the winger, and their 10 is free in front of our goal.', cam: { at: [22, 56], zoom: 1.4, tilt: .5 } },
        { t: .8, shot: [23.5, 76], wait: 1 }],
      zone3: [{ t: 1, pass: 'them:10', tag: { 'them:10': 'FREE' }, head: 'Stuck halfway',
          sub: 'Not helping the 3, and not guarding the middle. The pass inside goes right past you.', cam: { at: [20, 55], zoom: 1.4, tilt: .5 } },
        { t: .8, shot: [23.5, 76], wait: 1 }]
    } },

  /* ---- 4. Ball won, ball lost ---- */
  'Win it, go!': {
    intro: { start: { ball: 'them:10', them: { 10: [22, 44], 6: [33, 42] }, us: { 6: [28, 44], 7: [41.5, 34] } },
      cam: { at: [24, 46], zoom: 1.65, tilt: .5 },
      steps: [
        { t: .9, them: { 10: [22, 47.5] }, us: { 6: [25, 45.5] }, tag: { 'us:6': ['TACKLE', 'good'] }, head: 'Their 10 runs into the middle', sub: '' },
        { t: .6, pass: 'us:6', them: { 10: [20, 52] }, us: { 6: [24, 46] }, tag: { 'us:6': ['WON IT', 'good'] }, head: 'You steal it!', sub: 'Most of their team is in our half. Go!' },
        { t: 1.1, them: { 6: [31, 45] }, us: { 7: [42, 31] }, untag: true, cam: 'wide' }] },
    after: {
      lead0: [{ t: 1.3, us: { 7: [39, 11], 9: [27, 15] }, them: { 4: [32, 12.5], 2: [17, 17] }, hatch: [{ pts: [[34, 8], [50, 8], [50, 40], [34, 40]], c: 'good' }],
        focus: ['us:7', 'us:9', 'us:6', 'them:4', 'them:2', 'them:1'], tag: { 'us:7': ['COUNTER', 'good'] }, head: 'Counterattack!',
        sub: 'Their right side pushed up, so the whole wing is yours. Most of their team is still in our half.', cam: { at: [36, 18], zoom: 1.35, tilt: .6 }, wait: 1.2 }],
      carry0: [{ t: 1, them: { 6: [27.5, 40.5] }, tag: { 'them:6': 'PRESS' }, head: 'Okay, but slower', sub: 'Their 6 chases you down. A pass forward gets there faster.',
        cam: { at: [25, 40], zoom: 1.45, tilt: .5 }, wait: 1.1 }]
    } },

  'Win it back': {
    intro: { start: { ball: 'us:10', us: { 10: [25, 34], 6: [24, 52] }, them: { 6: [28, 44] } },
      cam: { at: [25, 40], zoom: 1.65, tilt: .5 },
      steps: [
        { t: .8, us: { 10: [25.5, 38.5] }, them: { 6: [27, 42] }, tag: { 'them:6': 'TACKLE' }, head: 'Your 10 runs into trouble', sub: '' },
        { t: .6, pass: 'them:6', us: { 10: [23, 36], 6: [24, 49] }, them: { 6: [26, 41] }, head: 'Your 10 loses it',
          sub: 'Their 6 picks it up, facing their own goal, right next to you.' },
        { t: 1, untag: true, cam: 'wide' }] },
    after: {
      zone0: [{ t: .8, us: { 10: [24.5, 38] }, tag: { 'us:6': ['PRESS', 'good'], 'us:10': ['PRESS', 'good'] }, head: 'Win it back!',
          sub: 'Their 6 is facing the wrong way, and you and the 10 close in together.', cam: { at: [25, 42], zoom: 1.6, tilt: .5 } },
        { t: .5, pass: 'us:6', tag: { 'us:6': ['WON IT', 'good'] }, wait: 1.1 }],
      zone1: [{ t: 1, pass: 'them:9', head: 'Backed off', sub: 'Their 6 has time to turn and play it forward to their 9.',
        cam: { at: [28, 50], zoom: 1.35, tilt: .5 }, wait: 1.1 }]
    } },

  'Get home': {
    intro: { start: { ball: 'us:10', them: { 2: [13, 16], 9: [28, 36], 10: [24, 28], 7: [6, 29], 11: [42, 27] } },
      cam: { at: [20, 15], zoom: 1.5, tilt: .5 },
      steps: [
        { t: 1.2, pass: 'them:2', pd: .15, them: { 2: [11, 13] }, tag: { 'them:2': 'CUT' }, head: 'We lose it deep in their half',
          sub: 'Their 2 cuts it out…', cam: { at: [16, 16], zoom: 1.45, tilt: .5 } },
        { t: 1.3, them: { 9: [28, 42], 10: [22, 32], 7: [6, 34], 11: [42, 32] }, untag: true, head: 'They break forward', sub: "…and you're 30 yards from the ball.", cam: 'wide' }] },
    after: {
      zone0: [{ t: 1.3, pass: 'them:10', air: true, them: { 10: [23, 40], 9: [29.5, 44] }, chain: [{ ns: ['us:3', 'us:4', 'us:2'], c: 'good' }], tag: { 'us:6': ['HOME', 'good'] },
        head: 'Home in time', sub: "You can't win it from 30 yards, so you protect the middle in front of our defenders.", cam: { at: [25, 45], zoom: 1.3, tilt: .55 }, wait: 1.2 }],
      zone2: [{ t: 1.2, pass: 'them:10', air: true, them: { 10: [23, 40], 9: [28, 46] }, hatch: [{ pts: [[16, 34], [34, 34], [34, 50], [16, 50]], c: 'bad' }],
          head: 'Chasing', sub: "You'll never catch it, and now the middle is empty.", cam: { at: [25, 42], zoom: 1.25, tilt: .5 } },
        { t: 1, them: { 10: [23, 47] }, wait: 1 }]
    } },

  'Win it, keep it': {
    intro: { start: { ball: 'them:9', them: { 9: [28, 40], 10: [19, 39] }, us: { 6: [25, 50] } },
      cam: { at: [26, 45], zoom: 1.6, tilt: .5 },
      steps: [
        { t: .9, them: { 9: [27.5, 43.5] }, us: { 6: [26, 47] }, tag: { 'us:6': ['TACKLE', 'good'] }, head: 'You win it in the middle', sub: '' },
        { t: .6, pass: 'us:6', them: { 9: [30, 43] }, tag: { 'us:6': ['WON IT', 'good'] }, sub: 'But their team is organized, and their 9 and 10 close in fast.', head: 'You win it in the middle' },
        { t: 1, them: { 10: [21, 42] }, untag: true, tag: { 'them:9': 'PRESS', 'them:10': 'PRESS' }, cam: 'wide' }] },
    after: {
      2: [{ t: 1.1, them: { 9: [33, 49], 10: [22, 44] }, tag: { 'us:2': ['SAFE', 'good'] }, head: 'Win it, then keep it',
        sub: 'Their 9 and 10 press thin air, and we build again from the back.', cam: { at: [33, 52], zoom: 1.25, tilt: .5 }, wait: 1.1 }],
      3: [{ t: 1.1, them: { 10: [17, 49] }, tag: { 'us:3': ['SAFE', 'good'] }, head: 'Win it, then keep it',
        sub: 'Their 9 and 10 press thin air, and we build again from the back.', cam: { at: [18, 52], zoom: 1.25, tilt: .5 }, wait: 1.1 }],
      9: steal('9', '4', [26, 21.5], 'Marked', 'Their 4 is right on your 9. Forcing it forward hands it straight back.'),
      10: steal('10', '6', [24, 32], 'Marked', 'Their 6 is right on your 10. Forcing it forward hands it straight back.'),
      7: steal('7', '11', [43, 34], 'Marked', 'Their 11 is on your 7. Forcing it forward hands it straight back.'),
      11: steal('11', '7', [8, 34], 'Marked', 'Their 7 is on your 11. Forcing it forward hands it straight back.')
    } },

  'Drive into space': {
    intro: { start: { ball: 'them:6', them: { 6: [27, 46], 10: [21, 50] }, us: { 6: [24, 50] } },
      cam: { at: [25, 48], zoom: 1.6, tilt: .5 },
      steps: [
        { t: .9, them: { 6: [27, 49.5] }, us: { 6: [25, 48] }, tag: { 'us:6': ['TACKLE', 'good'] }, head: 'You win it in the middle', sub: '' },
        { t: .7, pass: 'us:6', them: { 6: [28, 54], 10: [20, 56] }, tag: { 'us:6': ['WON IT', 'good'] }, head: 'You win it in the middle', sub: 'Their midfielders are caught behind you.' },
        { t: 1, untag: true, cam: 'wide' }] },
    after: {
      carry0: [{ t: 1, them: { 4: [24, 28] }, us: { 9: [32, 18] }, tag: { 'them:4': 'STEPS UP' }, head: 'Drive at them', sub: 'Make a defender come to you…',
          cam: { at: [26, 28], zoom: 1.35, tilt: .55 } },
        { t: 1, pass: 'us:9', us: { 9: [31, 14] }, tag: { 'us:9': ['FREE', 'good'] }, head: 'Drive at them', sub: '…then pass to the player that defender left free.', wait: 1.1 }]
    } },

  /* ---- 5. Beat the press ---- */
  'Marked from behind': {
    intro: { start: { ball: 'us:4', us: { 6: [26, 53], 10: [26.5, 31] }, them: { 6: [26.5, 26.5] } },
      cam: { at: [25, 56], zoom: 1.55, tilt: .5 },
      steps: [
        { t: 1.6, pass: 'us:6', pd: .15, us: { 6: [25, 50], 10: [26, 37] }, them: { 6: [26, 32.5] }, tag: { 'them:6': 'TIGHT' },
          head: 'Your 10 comes short to help', sub: "Their 6 follows, right on the 10's back.", cam: { at: [26, 42], zoom: 1.4, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      10: [{ t: .9, face: { 'us:10': 'down' }, tag: { 'us:10': ['SHIELD', 'good'], 'them:6': 'TIGHT' }, head: 'Firm, to feet',
          sub: 'The 10 holds it up with their 6 stuck behind.', cam: { at: [26, 38], zoom: 1.5, tilt: .5 } },
        { t: 1, pass: 'us:6', us: { 6: [27, 45] }, face: { 'us:6': 'up' }, head: 'Lay it off', sub: 'Back to you, facing forward, and you go again.',
          cam: { at: [26, 42], zoom: 1.4, tilt: .5 }, wait: 1.1 }]
    } },

  'Who got left?': {
    intro: { start: { ball: 'us:3', us: { 6: [26, 51], 10: [29, 38] }, them: { 6: [21.5, 35] } },
      cam: { at: [18, 53], zoom: 1.55, tilt: .5 },
      steps: [
        { t: 1.6, pass: 'us:6', pd: .2, us: { 6: [25, 48], 10: [31, 36] }, them: { 6: [23, 42] }, tag: { 'them:6': 'PRESS' },
          head: 'Their 6 runs up to press you', sub: 'Who did their 6 leave behind?', cam: { at: [25, 45], zoom: 1.45, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      10: [{ t: 1.1, face: { 'us:10': 'up' }, us: { 10: [31, 31] }, hatch: [{ pts: [[20, 29], [38, 29], [38, 40], [20, 40]], c: 'good' }],
        tag: { 'us:10': ['FREE', 'good'], 'them:6': 'LEFT IT' }, head: 'Who got left? Your 10.', sub: 'Their 6 left the middle to press you, so the ball goes right past.',
        cam: { at: [29, 36], zoom: 1.35, tilt: .55 }, wait: 1.2 }]
    } },

  "It's a trap": {
    intro: { start: { ball: 'us:2', us: { 6: [28, 52], 7: [44, 42] }, them: { 10: [31, 39], 11: [42, 47], 3: [39, 29] } },
      cam: { at: [36, 55], zoom: 1.5, tilt: .5 },
      steps: [
        { t: 1.6, pass: 'us:6', pd: .2, us: { 6: [26, 49], 7: [45, 45] }, them: { 10: [33, 42], 11: [40, 50], 3: [38, 32] },
          head: 'Your 7 looks wide open', sub: 'Before you pass, check who is waiting nearby.', cam: { at: [37, 47], zoom: 1.35, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      7: [{ t: 1, them: { 10: [41, 44.5], 11: [43, 48.5], 3: [43, 41] }, tag: { 'them:10': 'TRAP', 'them:11': 'TRAP', 'them:3': 'TRAP' }, head: "It's a trap",
          sub: 'They left the 7 open on purpose. Now three of them jump on the 7, with the sideline behind.', cam: { at: [43, 45], zoom: 1.55, tilt: .5 } },
        { t: .5, pass: 'them:10', wait: 1.1 }],
      3: [{ t: 1.2, us: { 3: [10, 50] }, hatch: [{ pts: [[2, 40], [20, 40], [20, 60], [2, 60]], c: 'good' }], tag: { 'us:3': ['SPACE', 'good'] },
        head: 'Away from the trap', sub: 'The 7 looked open, but it was a trap. Your 3 has the whole left side.', cam: { at: [14, 52], zoom: 1.3, tilt: .5 }, wait: 1.1 }]
    } },

  'Take your marker for a walk': {
    intro: { start: { ball: 'us:1', us: { 4: [24, 64], 6: [25, 43.5], 10: [25, 30] }, them: { 10: [25, 39.5] } },
      cam: { at: [25, 64], zoom: 1.5, tilt: .5 },
      steps: [
        { t: 1.6, pass: 'us:4', pd: .15, us: { 4: [25, 61], 6: [25, 47], 10: [25, 33] }, them: { 10: [25, 43] }, tag: { 'them:10': 'MARK' },
          marks: [{ l: ['us:4', 'us:10'], c: 'bad', x: true }], head: 'Their 10 follows you everywhere', sub: 'And you two are blocking the pass to your 10.',
          cam: { at: [25, 47], zoom: 1.35, tilt: .55 } },
        { t: 1, cam: 'wide', head: '', marks: [] }] },
    after: {
      zone0: [{ t: 1.1, face: { 'us:10': 'up' }, us: { 10: [25, 28] }, tag: { 'them:10': 'FOLLOWED', 'us:10': ['FREE', 'good'] }, head: 'Take your marker for a walk',
        sub: 'Their 10 followed you out, and the middle opened for the pass to your 10.', cam: { at: [25, 35], zoom: 1.25, tilt: .55 }, wait: 1.2 }],
      zone1: [{ t: 1.1, face: { 'us:10': 'up' }, us: { 10: [25, 28] }, tag: { 'them:10': 'FOLLOWED', 'us:10': ['FREE', 'good'] }, head: 'Take your marker for a walk',
        sub: 'Their 10 followed you out, and the middle opened for the pass to your 10.', cam: { at: [25, 35], zoom: 1.25, tilt: .55 }, wait: 1.2 }],
      zone2: [{ t: .6, marks: [{ l: ['us:4', 'us:10'], c: 'bad', x: true }], head: 'Blocking', sub: 'You and their 10 are still clogging the lane to your 10.',
        cam: { at: [25, 47], zoom: 1.3, tilt: .5 }, wait: 1.3 }]
    } },

  'Use your keeper': {
    intro: { start: { ball: 'us:2', us: { 6: [34, 59] }, them: { 10: [25, 46], 7: [12, 55], 9: [22, 56], 11: [40, 54] } },
      cam: { at: [37, 60], zoom: 1.55, tilt: .5 },
      steps: [
        { t: 1.6, pass: 'us:6', pd: .2, us: { 6: [31, 56] }, them: { 10: [28, 51], 7: [12, 58.5], 9: [22, 59.5], 11: [40, 57] }, tag: { 'them:10': 'PRESS' },
          head: 'Everyone is marked', sub: 'And their 10 is pressing you. Is anyone free?', cam: { at: [30, 58], zoom: 1.4, tilt: .5 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      1: [{ t: 1, them: { 10: [27, 60] }, tag: { 'us:1': ['FREE', 'good'] }, head: 'The keeper is the extra player',
          sub: 'Everyone else was marked. Now there is time to find the next pass.', cam: { at: [27, 64], zoom: 1.35, tilt: .5 } },
        { t: 1.2, pass: 'us:7', air: true, cam: { at: [36, 52], zoom: 1.1, tilt: .5 }, wait: 1 }],
      4: steal('4', '9', [23.5, 61.5], 'Marked', 'Their 9 is right on the 4, in front of our goal.'),
      10: steal('10', '6', [25, 38], 'Blocked', 'Their 10 is on you and their 6 is on your 10. It won’t get through.')
    } },

  /* ---- 6. Final third ---- */
  'Arrive late': {
    intro: { start: { ball: 'us:7', us: { 7: [43, 14], 9: [27, 13], 11: [16, 15], 10: [32, 20], 6: [28, 34] },
        them: { 4: [22, 13.5], 2: [18, 10], 3: [40, 8], 6: [33, 25], 10: [22, 34] } },
      cam: { at: [42, 16], zoom: 1.55, tilt: .55 },
      steps: [
        { t: 1.7, us: { 7: [44, 6], 9: [28, 7], 11: [15, 9.5], 10: [31, 15], 6: [29, 30] }, them: { 4: [23.5, 9], 2: [18, 5], 3: [39, 3.5], 6: [34, 20], 10: [22, 30] },
          head: 'Your 7 races to the end line', sub: 'Your 9 and 11 attack the box. Where do you go?', cam: { at: [36, 11], zoom: 1.4, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      zone0: [{ t: .8, shot: [27, -1.2], air: true, tag: { 'us:6': ['LATE', 'good'] }, head: 'Arrive late', sub: 'Everyone ran at the goal, so the cutback is yours. Goal!',
        cam: { at: [25, 10], zoom: 1.4, tilt: .55 }, wait: 1.2 }],
      zone1: [{ t: 1, pass: 'them:4', air: true, head: 'Too crowded', sub: 'The box is jammed, and their 4 heads it away.', cam: { at: [26, 9], zoom: 1.4, tilt: .5 } },
        { t: 1, pass: 'them:10', air: true, wait: 1 }]
    } },

  'Shoot?': {
    intro: { start: { ball: 'us:7', us: { 6: [26, 24] }, them: { 6: [33, 24], 10: [17, 27] } },
      cam: { at: [40, 11], zoom: 1.55, tilt: .55 },
      steps: [
        { t: 1.4, pass: 'us:6', pd: .3, us: { 6: [24, 17] }, them: { 6: [31, 22], 10: [19, 24] }, head: 'The cutback comes to you',
          sub: 'At the top of the box, with defenders closing in.', cam: { at: [28, 15], zoom: 1.45, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      shoot: [{ t: .4, tag: { 'us:6': ['GOAL', 'good'] }, head: 'Goal!', sub: 'First time, before they could block it.', cam: { at: [24, 8], zoom: 1.4, tilt: .55 }, wait: 1.3 }],
      carry0: [{ t: .9, them: { 6: [27.5, 13.5], 10: [20.5, 13] }, tag: { 'them:6': 'BLOCK', 'them:10': 'BLOCK' }, head: 'Okay, but they close in',
        sub: 'Every touch gives them time to block it. First time was better.', cam: { at: [24, 13], zoom: 1.5, tilt: .5 }, wait: 1.1 }]
    } },

  'Shoot or square it?': {
    intro: { start: { ball: 'us:6', us: { 6: [25, 27], 11: [16, 12] }, them: { 4: [25, 10] } },
      cam: { at: [25, 24], zoom: 1.55, tilt: .55 },
      steps: [
        { t: 1.5, us: { 6: [25, 20], 11: [14, 8] }, them: { 4: [25, 13.5] }, tag: { 'them:4': 'BLOCK' }, head: 'You drive to the edge of the box',
          sub: 'Their 4 steps up right in front of you. Look around.', cam: { at: [24, 15], zoom: 1.5, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      11: [{ t: .7, shot: [22.5, -1.2], air: true, tag: { 'us:11': ['TAP-IN', 'good'] }, head: 'Square it',
        sub: 'Their 4 would block your shot. Your 11 is alone at the back post. Goal!', cam: { at: [18, 6], zoom: 1.5, tilt: .55 }, wait: 1.2 }],
      shoot: { replace: true, steps: [
        { t: .45, pass: 'them:4', tag: { 'them:4': 'BLOCK' }, head: 'Blocked', sub: 'Their 4 was right in front of you. Your 11 was alone at the back post.',
          cam: { at: [25, 15], zoom: 1.55, tilt: .5 } },
        { t: 1, pass: 'them:10', air: true, wait: 1 }] },
      9: steal('9', '3', [31.5, 5.5], 'Marked', 'Their 3 is right on the 9, and your 11 was wide open.')
    } },

  'Long shot?': {
    intro: { start: { ball: 'us:6', us: { 6: [26.5, 37], 10: [29, 24] }, them: { 6: [16, 22] } },
      cam: { at: [26, 34], zoom: 1.5, tilt: .55 },
      steps: [
        { t: 1.5, us: { 6: [25, 31], 10: [31, 20] }, them: { 6: [18, 24] }, head: 'Nobody is pressing you', sub: '30 yards out. Shoot, or something better?',
          cam: { at: [26, 25], zoom: 1.4, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      10: [{ t: .7, face: { 'us:10': 'up' }, us: { 10: [30, 17.5] }, tag: { 'us:10': ['FREE', 'good'] }, head: 'Find the free 10',
          sub: 'From 30 yards a shot rarely beats the keeper. From here, the 10 can score.', cam: { at: [28, 14], zoom: 1.45, tilt: .55 } },
        { t: .6, shot: [27.5, -1.2], wait: 1.1 }],
      shoot: [{ t: .5, head: 'Too far', sub: 'The keeper has it easily. Your 10 was free, closer to goal.', cam: { at: [25, 6], zoom: 1.4, tilt: .5 }, wait: 1.2 }]
    } },

  'Look at the keeper': {
    intro: { start: { ball: 'us:7', us: { 6: [25, 27] }, them: { 1: [28, 3.5] } },
      cam: { at: [36, 10], zoom: 1.5, tilt: .55 },
      steps: [
        { t: 1, pass: 'them:1', air: true, pd: .1, them: { 1: [33, 7] }, tag: { 'them:1': 'OUT' }, head: 'Your 7 crosses', sub: 'Their keeper comes way out to punch it…',
          cam: { at: [32, 9], zoom: 1.5, tilt: .55 } },
        { t: 1.1, pass: 'us:6', air: true, us: { 6: [26, 23] }, head: 'It falls to you!', sub: 'And their keeper is out of position.', cam: { at: [28, 15], zoom: 1.35, tilt: .55 } },
        { t: 1, cam: 'wide', head: '' }] },
    after: {
      shoot: [{ t: .4, tag: { 'us:6': ['GOAL', 'good'] }, head: 'Goal!', sub: "Their keeper was out of position, and you didn't wait.", cam: { at: [26, 8], zoom: 1.4, tilt: .55 }, wait: 1.3 }],
      7: [{ t: 1, them: { 1: [27, 3] }, tag: { 'them:1': 'BACK' }, head: 'Too slow', sub: 'Every extra pass gives their keeper time to get back.', cam: { at: [28, 8], zoom: 1.4, tilt: .5 }, wait: 1.1 }],
      10: [{ t: 1, them: { 1: [27, 3] }, tag: { 'them:1': 'BACK' }, head: 'Too slow', sub: 'Every extra pass gives their keeper time to get back.', cam: { at: [28, 8], zoom: 1.4, tilt: .5 }, wait: 1.1 }],
      9: [{ t: 1, them: { 1: [27, 3] }, tag: { 'them:1': 'BACK' }, head: 'Too slow', sub: 'Every extra pass gives their keeper time to get back.', cam: { at: [28, 8], zoom: 1.4, tilt: .5 }, wait: 1.1 }],
      11: [{ t: 1, them: { 1: [27, 3] }, tag: { 'them:1': 'BACK' }, head: 'Too slow', sub: 'Every extra pass gives their keeper time to get back.', cam: { at: [28, 8], zoom: 1.4, tilt: .5 }, wait: 1.1 }]
    } },
};
RIDDLES.forEach(r => { if (MOTION[r.title]) r.motion = MOTION[r.title]; });

window.RIDDLE_LIB.defineSet({ me: '6', chapters: CHAPTERS, riddles: RIDDLES });
})();
