# Soccer board

A 9v9 soccer tactics board for phones. Drag players and the ball, sketch runs and passes, switch formations and save setups.

Live: https://dklemens17.github.io/Soccer-board/

**Riddles** (`riddles.html`): 30 game situations for every position on the field, in six chapters each. Each day the page asks which position you're playing, and you can switch anytime. Pass (to feet or into space), move, dribble, shoot, or kick it out, and get graded with stars, an explanation and a coach's rule. Stars are saved per position.

Each position's riddles are plain data (player positions, graded answers, feedback) in their own file, so they can be edited or added without touching the page code:

| File | Positions |
| --- | --- |
| `riddles-gk.js` | 1 (keeper) |
| `riddles-wide-cb.js` | 3, mirrored for the 2 |
| `riddles-cb.js` | 4 |
| `riddles-6.js` | 6 |
| `riddles-10.js` | 10 |
| `riddles-wing.js` | 11, mirrored for the 7 |
| `riddles-9.js` | 9 |

`riddles-core.js` lists the positions and holds the shared helpers, including the mirroring. The answer format is described at the top of `riddles-6.js`.

No build step: the board is `index.html`, the riddles are `riddles.html` plus the files above.
