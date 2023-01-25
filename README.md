# Snake Game

#### Front - Vanilla js
#### Backend - Express

### 1.5x speed play video
![snake game](./introduce/snakegame.gif)
```
npm i
npm run dev
```

- keydown handling
  - when the user presses a key with the function
  - javascript handles state
- mouse position
  - change cursor if mouse position x,y on button
- canvas
  - game created by html canvas object

- level system
  - level up every 5 points

- ranking system
  - get data from `public/data/ranking.json`
  - Only the top 10 scores are saved and updated
  - Data is posted and edited using Express

- sound effect
  - Objects such as eating an apple, leveling up and game over make the sound effects 
