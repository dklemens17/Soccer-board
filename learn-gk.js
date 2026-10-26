/* Learn: the keeper. Format is described in learn-core.js. */
(function () {
const POSTS = s => [{ l: [s, [21.75, 75]], c: 'w' }, { l: [s, [28.25, 75]], c: 'w' }];   // the shooter's view of our goal
const KEYS = [
  {
    key: 'Set your angle',
    rule: 'When they shoot from an angle, stand on the line between the ball and the middle of the goal, a couple of steps out, feet set.',
    intro: 'Their 11 has the ball on our right. Watch where the keeper stands.',
    start: {
      us: { 1: [25, 72], 3: [12, 58], 4: [24, 60], 2: [33, 58], 6: [25, 49], 10: [27, 38.5], 11: [11, 40], 9: [27, 28], 7: [41, 40] },
      them: { 1: [25, 4], 2: [9, 30], 4: [24, 24], 3: [39, 30], 6: [28, 34], 10: [20, 46], 7: [10, 49], 9: [22, 55], 11: [41, 52] },
      ball: 'them:11'
    },
    steps: [
      { snap: 's0', t: 1.1, them: { 11: [38, 64] }, us: { 2: [35, 61] }, say: 'Their 11 dribbles into our box. The keeper stays in the middle of the goal.' },
      { t: .6, shot: [28, 75.8], say: 'Their 11 shoots at the near post...' },
      { freeze: 'bad',
        text: 'The keeper stayed in the middle of the goal while the ball was out on our right. That left a big gap at the near post, and the shot went right through it.',
        marks: [{ l: ['them:11', [25, 75]], c: 'w' }, { z: [28.5, 71.5, 1.8], c: 'good' }],
        options: [
          { t: 'Shift toward the near post, onto the line between the ball and the middle of the goal', ok: true,
            why: 'On that line, a couple of steps out, the keeper covers both posts as well as possible. The near post is shut, and the far post is a long way for the shooter.' },
          { t: 'Stay in the middle of the goal',
            why: 'The middle is right only when the ball is in the middle. From an angle, it leaves the near post open.' },
          { t: 'Stand right against the near post',
            why: 'Hugging the post leaves the whole far side open for a shot across the goal.' }
        ],
        rewind: 's0',
        fix: [
          { t: 1.1, them: { 11: [38, 64] }, us: { 2: [35, 61], 1: [28.5, 71.5] }, say: 'This time the keeper shifts across as the ball moves...' },
          { t: .6, pass: 'us:1', say: '...so the shot at the near post goes straight into the gloves.' }
        ],
        after: { text: 'The keeper moved as the ball moved and stood on the line between the ball and the middle of the goal. The near post was shut, so the shot came straight at the keeper.',
          marks: [{ l: ['them:11', [25, 75]], c: 'w' }] } }
    ]
  },

  {
    key: 'Sweep behind our backs',
    rule: "When we're attacking, step up toward the top of our box. You can reach balls played over our backs before their forwards can.",
    intro: "We're attacking in their half. Watch where our keeper stands.",
    start: {
      us: { 1: [25, 72], 3: [12, 46], 4: [24, 48], 2: [38, 46], 6: [25, 37.5], 10: [27, 24], 11: [8, 20], 9: [25, 14], 7: [42, 18] },
      them: { 1: [25, 3], 2: [11, 12], 4: [21, 9], 3: [37, 12], 6: [26, 19], 10: [20, 30], 7: [12, 33], 9: [28, 41], 11: [38, 32] },
      ball: 'us:7'
    },
    steps: [
      { snap: 's0', t: 1.0, pass: 'them:3', pd: .2, them: { 3: [39, 15] }, say: 'We lose the ball on the right...' },
      { t: 1.1, pass: [27, 64], air: true, pd: .2, them: { 9: [30, 60] }, say: '...and their 3 hits it long, over our backs, for their 9 to chase.' },
      { t: .8, pass: 'them:9', them: { 9: [28, 65] }, us: { 1: [25, 70], 4: [26, 55] }, say: 'Our keeper stayed on the goal line, so their 9 gets there first...' },
      { t: .6, shot: [22.5, 75.8], say: '...and scores.' },
      { freeze: 'bad',
        text: 'We were attacking, but the keeper stayed back on the goal line. When they hit it long over our backs, the keeper was too far away to reach it.',
        marks: [{ z: [27, 63, 4], c: 'good' }, { a: ['us:1', [26.5, 64.5]], c: 'good', dash: 1 }],
        options: [
          { t: 'Start higher, near the top of our box, and come out to sweep it up', ok: true,
            why: 'From the top of the box, the keeper is closer to that ball than their 9. One catch or one kick and the danger is gone.' },
          { t: 'Stay on the goal line and wait for the shot',
            why: 'Waiting on the line gives their 9 a free run at goal.' },
          { t: 'Shout for our 4 to run back',
            why: 'Our 4 was too far away to win that race. The keeper was the one who could get there.' }
        ],
        rewind: 's0',
        fix: [
          { t: 1.0, pass: 'them:3', pd: .2, them: { 3: [39, 15] }, us: { 1: [25, 61.5] }, say: 'This time our keeper has stepped up to the top of the box...' },
          { t: 1.1, pass: 'us:1', air: true, pd: .2, us: { 1: [27, 63] }, them: { 9: [29, 56.5] }, say: '...so when they hit it long, the keeper gets there first...' },
          { t: .9, pass: 'us:2', us: { 2: [40, 52] }, say: '...and plays it out to our 2.' }
        ],
        after: { text: 'With us attacking, the keeper started near the top of our box. When they played it over our backs, the keeper swept it up before their 9 could get there.',
          marks: [{ h: ['them:9'], c: 'good' }] } }
    ]
  },

  {
    key: 'Start the attack fast',
    rule: 'When you catch it, look up. Roll or throw it quickly to a free teammate, away from their forwards.',
    intro: 'Our keeper is about to catch a cross. Watch what the keeper does next.',
    start: {
      us: { 1: [25, 71], 3: [15, 61], 4: [25, 62], 2: [36, 61], 6: [24, 51], 10: [27, 40], 11: [7, 40], 9: [27, 29.5], 7: [42, 42] },
      them: { 1: [25, 4], 2: [10, 30], 4: [24, 24], 3: [38, 30], 6: [28, 35], 10: [20, 49], 7: [11, 52], 9: [28.5, 57], 11: [42, 58] },
      ball: 'them:11'
    },
    steps: [
      { t: 1.0, pass: 'us:1', air: true, us: { 1: [26, 68.5] }, say: 'Their 11 crosses, and our keeper catches it.' },
      { snap: 's1', t: 1.2, them: { 9: [29, 64.5], 10: [21, 56], 7: [12, 57.5], 11: [39, 57.5] }, say: 'The keeper holds on to it while everyone gets set...' },
      { t: 1.1, pass: [27, 30.5], air: true, pd: .2, us: { 9: [24, 29] }, say: '...then kicks it long down the middle...' },
      { t: .7, pass: 'them:6', them: { 6: [27.5, 32.5] }, say: '...and their 6 wins it.' },
      { freeze: 'bad',
        text: 'The keeper held the ball while they got organized, then kicked it long into a crowd. Their 6 won it easily. At the moment of the catch, our 2 had been wide open.',
        marks: [{ z: [37, 60, 4.5], c: 'good' }, { h: ['us:2'], c: 'us' }],
        options: [
          { t: 'Throw it quickly to our 2, who was free on the right', ok: true,
            why: "Right after a catch, their forwards are still in our box. A quick throw to the free side starts our attack before they're set." },
          { t: 'Hold it and wait for everyone to get set',
            why: 'Waiting lets them get organized too. The free player is only free for a moment.' },
          { t: 'Kick it even further',
            why: 'Long kicks into a crowd are a coin flip at best. A throw to a free teammate keeps the ball.' }
        ],
        rewind: 's1',
        fix: [
          { t: .8, pass: 'us:2', air: true, us: { 2: [37, 57] }, say: 'This time the keeper looks up straight away and throws it to the 2...' },
          { t: 1.1, us: { 2: [40, 47], 7: [43, 34], 10: [32, 38] }, them: { 11: [41, 53] }, say: "...who's away up the right before they can react." }
        ],
        after: { text: 'The keeper looked up right after the catch and threw it to the free player. Their forwards were still in our box, so we were away before they could get back.',
          marks: [{ h: ['them:9', 'them:10', 'them:7'], c: 'good' }] } }
    ]
  },

  {
    key: 'Close down the breakaway',
    rule: 'When an attacker is through alone, come out fast to make the goal smaller. Stay big and on your feet until the shot.',
    intro: 'Their 9 is through on goal, all alone. Watch our keeper.',
    start: {
      us: { 1: [25, 72], 3: [12, 52], 4: [22, 50], 2: [37, 52], 6: [27, 42], 10: [29, 33], 11: [10, 34], 9: [27, 22], 7: [40, 32] },
      them: { 1: [25, 4], 2: [10, 24], 4: [24, 18], 3: [38, 22], 6: [26, 28], 10: [20, 40], 7: [9, 44], 9: [27, 55], 11: [40, 44] },
      ball: 'them:9'
    },
    steps: [
      { snap: 's0', t: 1.2, them: { 9: [26, 61] }, us: { 4: [22, 56] }, say: 'Their 9 runs at goal. Our keeper stays on the goal line.' },
      { t: .6, shot: [22.6, 75.8], say: 'Their 9 has the whole goal to aim at.' },
      { freeze: 'bad',
        text: 'The keeper stayed on the goal line, so their 9 could see the whole goal. From there, any decent shot goes in.',
        marks: POSTS([26, 61]),
        options: [
          { t: 'Rush out toward their 9, then stay big and on your feet', ok: true,
            why: "Coming out makes the goal look tiny from where the shooter is. Staying on your feet means you can still react to the shot." },
          { t: 'Dive at the ball as early as possible',
            why: 'Going down too early lets the attacker just go around or chip it over.' },
          { t: 'Stay on the line and guess a side',
            why: 'Guessing from the line is a coin flip, with a huge goal to cover.' }
        ],
        rewind: 's0',
        fix: [
          { t: 1.2, them: { 9: [26, 61] }, us: { 4: [22, 56], 1: [25.5, 66] }, say: 'This time the keeper rushes out toward their 9...' },
          { freeze: 'good', head: 'See the angle?', text: 'Out here, the keeper covers most of the goal. Look how small the gaps by the posts are now.',
            marks: POSTS('them:9') },
          { t: .6, pass: 'us:1', say: '...stays big, and the shot hits the keeper.' }
        ],
        after: { text: "The keeper came out fast and stayed big. From the shooter's spot the goal looked tiny, and the shot went straight at the keeper.",
          marks: [{ h: ['them:9'], c: 'good' }] } }
    ]
  },

  {
    key: 'Own your 6-yard box',
    rule: 'If a cross comes into your 6-yard box, come off your line and catch it at its highest point.',
    intro: 'Their 7 is about to cross from our left. Watch our keeper.',
    start: {
      us: { 1: [25, 72], 3: [13, 62], 4: [24, 61], 2: [35, 61], 6: [25, 50], 10: [27, 40.5], 11: [10, 44], 9: [27, 30], 7: [41, 40] },
      them: { 1: [25, 4], 2: [9, 32], 4: [24, 24], 3: [38, 30], 6: [28, 36], 10: [20, 49], 7: [6, 62], 9: [29, 58], 11: [38, 52] },
      ball: 'them:7'
    },
    steps: [
      { snap: 's0', t: 1.0, them: { 9: [27, 64.5], 11: [33, 62] }, us: { 2: [37, 64] }, say: 'Their 7 gets to the end line. Their 9 and 11 run into our box.' },
      { t: 1.0, pass: 'them:9', air: true, them: { 9: [25.5, 69.2] }, close: 1, say: 'The cross drops into our 6-yard box. The keeper stays on the goal line...' },
      { t: .4, shot: [24, 75.8], close: 1, say: '...and their 9 heads it in.' },
      { freeze: 'bad',
        text: 'The cross dropped right in front of the keeper, inside the 6-yard box, but the keeper stayed on the goal line. Their 9 got there first.',
        marks: [{ z: [25.5, 69.5, 3], c: 'good' }, { h: ['them:9'], c: 'bad' }],
        options: [
          { t: 'Come off the line and catch it at its highest point', ok: true,
            why: 'In the 6-yard box, the keeper can use both hands and reach higher than anyone. That ball belongs to the keeper.' },
          { t: 'Stay on the line and try to save the header',
            why: "From a few yards away, a header is almost impossible to save. Better to win the ball before it's headed." },
          { t: 'Punch it as hard as possible toward the middle',
            why: 'Punching it to the middle sends it straight back to them. If you can catch it, catch it.' }
        ],
        rewind: 's0',
        fix: [
          { t: 1.0, them: { 9: [27, 64.5], 11: [33, 62] }, us: { 2: [37, 64] }, say: 'Same cross...' },
          { t: 1.0, pass: 'us:1', air: true, us: { 1: [25.5, 68.5] }, them: { 9: [28, 65] }, say: 'This time the keeper comes off the line and catches it at its highest point...' },
          { t: .9, pass: 'us:3', air: true, us: { 3: [9, 57] }, say: '...then throws it out to our 3.' }
        ],
        after: { text: 'The ball dropped into the 6-yard box, so the keeper came and took it. Nobody wins that ball if the keeper catches it at its highest point.',
          marks: [{ h: ['them:9'], c: 'good' }] } }
    ]
  }
];
window.LEARN_LIB.define({ me: '1', keys: KEYS });
})();
