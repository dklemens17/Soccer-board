# Soccer board

A 9v9 soccer tactics board for phones. Drag players and the ball, sketch runs and passes, switch formations and save setups.

Live: https://dklemens17.github.io/Soccer-board/

**Riddles** (`riddles.html`): 30 game situations for a number 6, in six chapters. Pass, move, dribble or shoot, and get graded with stars, an explanation and a coach's rule. Scenarios live in `riddles-data.js`; each one is plain data (player positions, graded answers, feedback), so riddles can be edited or added without touching the page code.

No build step: the board is `index.html`, the riddles are `riddles.html` + `riddles-data.js`.
