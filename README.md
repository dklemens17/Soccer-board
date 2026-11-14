# Soccer board

A 9v9 soccer tactics board for phones, with puzzles and a Learn mode for every position, plus futsal puzzles. The header switches between the four: **Board**, **Puzzles**, **Learn** and **Futsal**, each with a small icon (a pitch, a puzzle piece, a graduation cap and a ball). On phones and in landscape the icon sits above the name; on the Board page in landscape the four tabs sit two by two.

Live: https://dklemens17.github.io/Soccer-board/

**Board** (`index.html`): drag players and the ball, sketch runs and passes, switch formations and save setups.

**Puzzles** (`riddles.html`): 30 game situations for every position on the field, plus 30 set pieces, in six chapters each. Each day the page asks which position you're playing, and you can switch anytime. Pass (to feet or into space), move, dribble, shoot, or kick it out, and get graded with stars, an explanation and a coach's rule. When you move a player, Pro means landing inside the best spot's circle; a near miss within 2 yards counts as Good, unless that step is offside, hidden behind a defender, or one of the puzzle's named mistakes. Stars are saved per position. Getting a puzzle right on the very first try plays a "First tryyyy!" burst with a stadium cheer. From three first tries in a row, every first try that keeps the run going gets the stand singing an "o-lé" chant; a first attempt that misses resets the run. After three misses on a puzzle, the page shows the right answer and opens the next one, so nobody gets stuck. A soft referee's whistle marks a wrong choice, and new levels and badges get a roar and a fanfare. Sounds can be switched off in the puzzle list or the trophy room.

**Moving puzzles.** Every puzzle plays like a short tactics video. It opens with the play building up: the camera follows the ball in, a caption says what's happening, players make their runs, then it pulls back and freezes on "YOUR CALL". After you answer, the play carries on and shows what your choice leads to, such as the 10 turning with four of theirs left behind, a save, a goal, or an interception that becomes their counter. Players get tags like PRESS or FREE, the ones who don't matter fade out, back lines are drawn as a line, and the open space is shaded. "Show the best answer" plays the right call the same way. Tap Skip, or the field, to jump ahead. The plays live in each position's file as `motion` data (mirrored automatically for the 2 and the 7) and are run by `riddles-motion.js`, which is built to stay smooth on cheap tablets. A new puzzle without a written play still gets an automatic build-up (the team without the ball closes in, runners make their runs), and any ball they win turns into their counter-attack. With "reduce motion" turned on in the device settings, puzzles open straight on the frozen moment.

**Learn** (`learn.html`): pick a position and watch its five keys, the main jobs of that position. Each key is a short play that stops for a TIMEOUT at the big moments: "See what the 6 just did?" Good moments are explained. Mistakes ask what the player should have done instead (multiple choice), then the play rewinds and shows the better choice. Marks on the field show the player's run and passes, the shadow a defender casts, passing lanes, open space and looks over the shoulder. The plays look like the moving puzzles: the camera follows the ball and the player you're learning, captions run along the top of the field, players get tags like PRESS or IN THE GAP, and at every TIMEOUT the camera pulls back to the whole field while everyone who isn't part of the moment fades out. The camera works on its own, so a key only needs its steps; a step can still aim it (`cam`), and the tags live in a small table at the bottom of each position's Learn file. Keys you've watched are ticked off, and the position picker shows how many of the five you've seen.

| Position | Keys |
| --- | --- |
| Keeper | Set your angle · Sweep behind our backs · Start the attack fast · Close down the breakaway · Own your 6-yard box |
| 3 and 2 | Push the winger down the line · Tuck in · Support the winger · Open up to the field · Recovery run |
| 4 | Cover behind the 3 and 2 · Step up together · Don't let their 9 turn · Play through their press · When in doubt, clear it |
| 6 | Get out of their shadow · Check your shoulder · Switch the play · Protect the middle · Stay home, slow the counter |
| 10 | Find the pocket · Open up on the half-turn · Arrive late at the top of the box · Pass and go · Press first |
| 11 and 7 | Stay wide · Take on your defender · Run in behind · Attack the far post · Track back |
| 9 | Time your run in behind · Hold it up · Attack the near post · Shoot early · Press from the front |

**Futsal** (`riddles.html?futsal`): 30 puzzles for five-a-side futsal, played on a hardwood court like a basketball floor (40 x 20 m, with painted D-shaped penalty areas, the 6 m and 10 m marks, and no offside). Our five are numbered like the 9v9 players who do the same job: 1 the keeper, 4 the fixo (the last player, who starts the attack), 11 and 7 the alas (left and right wingers) and 9 the pivot (the target striker). It's one mixed set, and each puzzle says which player you are. The puzzles are about attacking strategy, not the rules: making space and shots with rotations, switches and combinations. Like the 9v9 puzzles, every one has a moving build-up and plays out what your answer leads to. Kick-ins and the keeper's throw replace throw-ins and goal kicks. Futsal has its own progress and level ring (bronze, silver, gold), separate from the 9v9 positions. Grading is more forgiving on the court, which is drawn smaller than the 9v9 field while the players stay the same size. The best-answer circles are bigger, wherever that doesn't spill onto a defender, a blocked lane or a named mistake. Near misses count as Good up to 3 units out (dribbles too, unless they end next to a defender). A pass just off the planned space counts as Good when the runner still gets there first, and as one star when it's further off. A pass into open space that a teammate reaches first, through a clear lane, is never a zero.

| Chapter | What it teaches |
| --- | --- |
| Beat the press | Throw to the free side, fix a defender before passing, the third man, down the line, getting an angle |
| Rotations | Pass and follow, fill the empty spot, ala inside and fixo wide, swap with the pivot, clear the space for a shot |
| Switches | Switch it before they shift back, the diagonal into the pivot, shoot after the switch, wait on the far side, the far post run |
| The pivot | Lay it off, the one-two, turn when your defender stands off, set up the fixo arriving late, show for it |
| Create the shot | Shoot early, the cut-back, two against one, arrive late at the top of the area, square it past the keeper |
| Counters and routines | Two against one, three against two, a kick-in for the fixo, the corner to the far post, the power play with the keeper as a fifth attacker |

**Trophies.** Each position earns a level ring in Puzzles: bronze for clearing all 30, silver at 75 stars, gold at all 90. Groups of positions earn badges (The Wall, Engine Room, Front Three, Both Flanks, Both Wings, The Spine, Complete Player), each at the lowest level in its group. The player card rates Passing, Vision, Movement, Defending, Attacking and Keeping from your stars across every position, and can be saved as a picture. Every new level, badge and card upgrade plays a full-screen celebration. Tap the stars button to open the trophy room.

**Sounds.** The crowd is a real recording: *Free Crowd Cheering Sounds* by Gregor Quendel (https://opengameart.org/content/free-crowd-cheering-sounds), licensed CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). Changes: `sounds/stadium-cheer.mp3` is a 6.5-second cut of "03 - Strong cheering - I" and `sounds/stadium-crowd.mp3` a 10-second mono cut of "10 - Ambience", both faded, level-matched and re-encoded as MP3. The credit also appears in the trophy room. The whistles and the fanfare are synthesized in the browser with Web Audio, and if the recordings can't load, a synthesized cheer stands in. The o-lé chant was synthesized the same way (32 singing voices, claps, a drum and the crowd recording), then saved as `sounds/ole-chant.mp3`. Playing all of that live was too much work for cheap tablets: on a Fire tablet it stuttered or went quiet. The page keeps the live version (`chantLive`) only to remake the recording.

**Music.** A quiet beat called "Pulse" plays under Puzzles and Learn, starting with the first tap. It has a soft kick and rim, a pad that breathes with the kick, and a gentle arpeggio, at 96 bpm. It's an original piece played live in the browser by `music.js`, so there's no recording to download, and it's built to be light enough for cheap tablets. It follows a 32-bar form (a lighter start, a full section, open hats, then a breakdown without the kick) so it doesn't loop the same few seconds, and it sits about 14 dB under the cheers. It dips under every cheer and whistle, goes silent for the chant and the fanfares, and pauses when the page is hidden. The Music switch sits next to Sounds in the puzzle list, the trophy room and the Learn keys, and turning Sounds off silences it too. The Board stays quiet.

## Files

Each position's puzzles and Learn plays are plain data in their own files, so they can be edited or added without touching the page code. (The puzzle files kept their original `riddles-` names, so saved progress and links keep working.)

| Position | Puzzles | Learn |
| --- | --- | --- |
| 1 (keeper) | `riddles-gk.js` | `learn-gk.js` |
| 3, mirrored for the 2 | `riddles-wide-cb.js` | `learn-wide-cb.js` |
| 4 | `riddles-cb.js` | `learn-cb.js` |
| 6 | `riddles-6.js` | `learn-6.js` |
| 10 | `riddles-10.js` | `learn-10.js` |
| 11, mirrored for the 7 | `riddles-wing.js` | `learn-wing.js` |
| 9 | `riddles-9.js` | `learn-9.js` |
| Set pieces (corners, free kicks, throw-ins, goal kicks) | `riddles-setpieces.js` | |
| Futsal (one mixed set of 30) | `riddles-futsal.js` | |

`riddles-core.js` lists the positions and holds the shared puzzle helpers, including the mirroring; the answer format is described at the top of `riddles-6.js`, and the motion format at the top of `riddles-motion.js`. `learn-core.js` does the same for Learn and describes the play format (steps, passes, freeze frames, questions and field marks).

No build step: the pages are `index.html`, `riddles.html` (which is also the Futsal tab, as `riddles.html?futsal`) and `learn.html`, plus the files above, `music.js` and the `sounds` folder.
