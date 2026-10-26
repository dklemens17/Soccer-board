# Soccer board

A 9v9 soccer tactics board for phones. Drag players and the ball, sketch runs and passes, switch formations and save setups.

Live: https://dklemens17.github.io/Soccer-board/

**Riddles** (`riddles.html`): 30 game situations for every position on the field, plus 30 set pieces, in six chapters each. Each day the page asks which position you're playing, and you can switch anytime. Pass (to feet or into space), move, dribble, shoot, or kick it out, and get graded with stars, an explanation and a coach's rule. Stars are saved per position. Getting a riddle right on the very first try plays a "First tryyyy!" burst with a stadium cheer. From three first tries in a row, every first try that keeps the run going gets the stand singing an "o-lé" chant; a first attempt that misses resets the run. After three misses on a riddle, the page shows the right answer and opens the next riddle, so nobody gets stuck. A soft referee's whistle marks a wrong choice, and new levels and badges get a roar and a fanfare. Sounds can be switched off in the riddle list or the trophy room.

The crowd is a real recording: *Free Crowd Cheering Sounds* by Gregor Quendel (https://opengameart.org/content/free-crowd-cheering-sounds), licensed CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). Changes: `sounds/stadium-cheer.mp3` is a 6.5-second cut of "03 - Strong cheering - I" and `sounds/stadium-crowd.mp3` a 10-second mono cut of "10 - Ambience", both faded, level-matched and re-encoded as MP3. The credit also appears in the trophy room. Everything else (the chant's singing, claps and drum, the whistle, the fanfare) is synthesized in the browser with Web Audio, and if the recordings can't load, a synthesized cheer stands in.

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
| `riddles-setpieces.js` | Set pieces: corners, free kicks, throw-ins and goal kicks. Each riddle says which player you are. |

**Trophies.** Each position earns a level ring: bronze for clearing all 30 riddles, silver at 75 stars, gold at all 90. Groups of positions earn badges (The Wall, Engine Room, Front Three, Both Flanks, Both Wings, The Spine, Complete Player), each at the lowest level in its group. The player card rates Passing, Vision, Movement, Defending, Attacking and Keeping from your stars across every position, and can be saved as a picture. Every new level, badge and card upgrade plays a full-screen celebration. Tap the stars button to open the trophy room.

`riddles-core.js` lists the positions and holds the shared helpers, including the mirroring. The answer format is described at the top of `riddles-6.js`.

No build step: the board is `index.html`, the riddles are `riddles.html` plus the files above and the `sounds` folder.
