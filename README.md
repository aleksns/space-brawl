![titleGit](https://user-images.githubusercontent.com/75623459/157774017-3b93cfe6-efe6-4dca-8f25-9cc5636b7ba8.png)

<br/>

* [**About**](#about) 
* [**PLAY DEMO**](#play-demo)
* [**Video Examples**](#video-examples)
<br />

* [Game Mechanics](#game-mechanics)
* [Controls](#controls)
* [UI](#ui)
* [Player](#player)
* [Enemies](#enemies)
* [Progression](#progression)
* [Items](#items)
* [Cutscenes](#cutscenes)
* [Credits](#credits)

# `About` 
***
Space-Brawl is the classic arcade shooter. Destroy enemies, use skills, collect coins to gain experience and LVL UP your ship. 3 Ship Tiers with unique ship models and guns. Be aware of The Boss! It's time to show the aliens how it's done! Wait no more and try it out yourself! Click on the link below.


# [<ins>`PLAY DEMO`</ins>](https://aleksns.github.io/space-brawl/)
##### *Note: The game was tested with Google Chrome browser and 1920x1080 screen resolution. It might work different with other configurations*
***

# `Video Examples`
***
### *Video example 1/3*

https://user-images.githubusercontent.com/75623459/157510396-02b499da-e568-4ba4-ac69-e6e55d1a9fbb.mp4

<br />

### *Video example 2/3*

https://user-images.githubusercontent.com/75623459/157510558-d2a97596-e873-4ea0-88bf-5c8e6a550f8e.mp4

<br />

### *Video example 3/3*

https://user-images.githubusercontent.com/75623459/157510698-f8e698f1-0467-4c0c-8afb-d281dc763d3c.mp4

<br />

# `Game Mechanics`
***
- Destroy enemies and collect coins to level UP your ship and advance in TIER (see [Player](#player) section and [Coin](#coin) section)
- Use skills, but watch out for CD timer
- Buff-Items (atk speed and medkits) spawn with different delay, collect them to assert the victory (see [Buffs](#buffs) section)
- Each destroyed enemy fills `Threat Bar`, fill it to spawn The Boss (you still need to destroy remaining enemies after `Threat Bar` is filled)
- Watch a wonderful and unskippable cutscene before every Boss spawn. (see [Cutscenes](#cutscenes) section)
- Destroy The Boss to advance to the next Level
- The game is looped with difficulty being increased with each wave and level (see [Progression](#progression) section). Rinse and repeat...PROFIT??

# `Controls`
***
- **`WASD`** - move the ship
- **`1`** - Slow Time skill
- **`2`** - Shield skill
- **`3`** - Laser skill
- **`Space`** - pause the game

# `UI`
***
*Note: if you move with you ship over `Skills Bar` or `Exp Bar` it will become transparent*

![githubUI](https://user-images.githubusercontent.com/75623459/157761516-5fd1ce10-fc7c-4fac-bbc9-a29fc611b445.png)

# `Player`
***
Player ship has 3 different upgrades, each alters the look of the ship, stats and guns. Below health bar, you can see exp bar with player level number. Destroy ships and collect coins they drop to gain exp. If your health reaches 0, you will...well, you know :(

## TIERS

Every few levels advance in TIER. Better stats, more guns, bigger ship

![gitTiers](https://user-images.githubusercontent.com/75623459/157770213-4605589e-e486-4302-8514-90a12b86e4d5.png)


## Skills

Player has 3 skills: Slow Time, Shield, Laser. Each has a different CD and properties.

### *Slow Time*

For a short duration, feel yourself like the main character in that movie.

![skillSlow](https://user-images.githubusercontent.com/75623459/157758123-6ec830cc-b36b-4a7e-b80b-a6cd3ac2a9fc.gif)

### *Shield*

Absorbs 100% of projectiles damage and 99% of ships ramming damage. The remaining duration can be tracked by visual shield opacity.

![skillShield](https://user-images.githubusercontent.com/75623459/157758150-90182c6b-83bc-4fd8-b1af-580684d42670.gif)

### *Laser*

Strong and powerful beam of energy which damages all enemies on it's path. During the Laser skill, normal attack is disabled. Laser width decreases in proportion to the remaining skill time

![skillLaser](https://user-images.githubusercontent.com/75623459/157758174-a6fe909e-0fb7-4cad-8808-654d50800e42.gif)

# `Enemies`
***
There are 5 types of enemies, each has it's own abilities and movement patterns. Enemies spawn at random position, outside of the game screen and move towards the game borders, upon arriving, they get random movement pattern, which changes every few seconds or on collision with game borders.

## Boss

Also known as THE Boss. Has to be destroyed in order to advance a level. Very tough, has 3 different attacks: 360 barrage, triple front burst and triple on-target. 
To assert the dominance, it doesn't move (apart from cutscenes). Yelds a lot of exp and score points. Also, it blinks...

![enemy-T0](https://user-images.githubusercontent.com/75623459/157729542-0e3fd978-8efe-4127-b938-247b4738ae49.gif)

## Enemy T2

Classic mini-boss. Spawns every 3rd wave (there is a chance to spawn 2 of them). Got 360 barrage and double on-target guns. Slow, but got a lot of HP points.
Yes, eyes are flashing (quality content right here).
Moves freely on the game screen. 

![enemy-t2](https://user-images.githubusercontent.com/75623459/157730248-eafd8513-07e7-44ce-bc72-3a7284c11c48.gif)

## Enemy T3

It may look funny if 2 of these ships will align together, forming eyes. Ship itself has 2 attack patterns: on-target burst and 80 angle front barrage.
Moves freely on the game screen.

![enemy-t3](https://user-images.githubusercontent.com/75623459/157734899-d340c3a3-6b46-40d9-9b06-620eab7680ae.gif)

## Enemy T4

There are actually 3 aliens in this ship. One of them is invisible, but rumors say, it reveal itself once in awhile. Has only 1 attack (on-target type) but 
projectiles are very fast, comparing to other ships.
Moves freely on the game screen.

![enemy-t4](https://user-images.githubusercontent.com/75623459/157734939-333d12ae-aadd-4bca-94d5-1ef234248df0.gif)

## Enemy T5

Nothing special here. Just a free exp. Weak ship, weak gun. Shoots only in forward direction. Spawns in the north direction.
Moves only in one direction.

![enemy-t5](https://user-images.githubusercontent.com/75623459/157734983-70ace57e-bfd9-4e93-99d0-d46d7c15711d.gif)

## Formation T5

Every wave, there is a chance for T5-Formation to be spawned. Number of ships is random.

![formation-t5](https://user-images.githubusercontent.com/75623459/157735034-ef260b4a-0144-4429-aece-ea0b477be20d.gif)

# `Progression`
***
There are few main progression systems: Player progression, Level progression, Wave progression

## Player Level

Each new player level adds modifiers to player stats (and to item-buff medkit), every few levels player advances in `TIER`, 
with new ship model, guns and significant modifiers. To level up, you need to destroy enemies and collect coins they drop on death.
The stronger the enemy, the more exp you get. Player exerience bar and level can be seen in the upper left corner. 

## Game Level 

The game starts at level 1, in order to advance, you need to destroy enemies and fill `Threat Level Bar`, which will spawn a Boss (once all remaining enemies are defeated).
Every level adds significant modifiers to enemies.

## Waves

Enemies spawn in waves, every defeated wave adds small modifiers to enemies. Every wave is being generated with random enemy types and amount of enemies.
Every 3rd wave a mini boss is spawned (T2 enemy), there is also a chance for T5 Formation to be spawned (random amount of t5 ships alligned in line).

# `Items`
***
Items move down with different speed. Collect them to recieve different buffs. Each item has different "vison range" and `magnet effect`. Aproach them and they will follow you, but if you will move out of the "vision range" they will stop following and continue moving down with a default speed.

## Coin

Dropped from destroyed enemies. Collect it to gain experience. The stronger the enemy, the more experience it will yeld.

![itemCoin](https://user-images.githubusercontent.com/75623459/157766182-40697d81-7904-4c79-a652-9d3829c689af.gif)

## Buffs

### *Attack Speed*

Temporary increases Player's attack speed by 200%

![atkSpeedGit](https://user-images.githubusercontent.com/75623459/157764007-d7e11b36-bddf-40a5-8b65-36ce9e12bf2a.png)

### *Medkit*

Immediately restores Player's health. Amount of health restored is based on Player's level.

![medkitGit](https://user-images.githubusercontent.com/75623459/157764000-20a1772a-7f71-4268-860f-24c5c18cd322.png)

# `Cutscenes`
***

Watch and enjoy unskippable cutscene with The Boss appearance. It picks a random dialog and (perhaps) reveals the deep lore of the game

# `Credits`
***
#### - Music -
- [background music](https://freesound.org/people/CarnotaurusTeam/sounds/505283/)
- [laser](https://freesound.org/people/DayCraftMC/sounds/337112/)

#### - Images -
- [All images](https://github.com/aleksns)
