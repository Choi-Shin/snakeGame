import Snake from "../blueprint/snake.js";
import Apple from "../blueprint/apple.js";
import { gameOver } from "./gameover.js";
import {
  createRect,
  dayFormatting,
  sortByScore,
  timeFormatting,
} from "./functions/functions.js";
import { getRanking, postRanking } from "/rank.js";
let canvas = document.getElementById("canvas");
let canvasContext = canvas.getContext("2d");
let img = new Image();
img.src = "../img/apple.png";
let name;
let paused = false;
let SPEED = 5;
let json;

let gameState = true;
let snake;
let apple;
let level = 1;
var eat = new Audio("/sound/eating.wav");
var levelUp = new Audio("/sound/levelup.wav");
var gameover = new Audio("/sound/gameover2.wav");
export function gameLoop(state) {
  if (!name) {
    name = prompt("닉네임을 입력해주세요!");
  }
  if (state === "start") {
    snake = new Snake();
    apple = new Apple(canvas, snake);
    level = 1;
    gameState = true;
    loop();
  } else {
    snake = new Snake();
    apple = new Apple(canvas, snake);
    loop();
  }
}

async function loop() {
  json = await getRanking("http://localhost:3000/rank");
  let rankingData = sortByScore(json["ranking"]);
  if (gameState == false) {
    eat.currentTime = 0;
    levelUp.currentTime = 0;
    playClip(gameover);
    let count = 0;
    for (let i = 0; i < rankingData.length; i++) {
      if (rankingData[i].score < snake.tail.length - 1) {
        count += 1;
      }
    }
    let date = new Date();
    const day = dayFormatting(date, "-");
    const time = timeFormatting(date, ":");
    if (count > 0) {
      rankingData.splice(rankingData.length - count, 0, {
        score: snake.tail.length - 1,
        name: name,
        date: `${day} ${time}`,
      });
      if (count != 1 && rankingData.length > 10) {
        rankingData.pop();
      }
      let data = { ranking: rankingData };
      await postRanking("http://localhost:3000/rank", data);
    } else if (count == 0 && rankingData.length < 10) {
      rankingData.push({
        score: snake.tail.length - 1,
        name: name,
        date: `${day} ${time}`,
      });
      let data = { ranking: rankingData };
      await postRanking("http://localhost:3000/rank", data);
    }
    gameOver(snake.tail.length - 1);
    return;
  }
  try {
    show();
    setTimeout(loop, 700 / (level * SPEED));
  } catch (error) {
    console.log(error);
  }
}

function show() {
  if (!paused) {
    update();
  }
  draw();
}

function update() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  snake.move();
  eatApple();
  checkHitWall();
}

function playClip(sound) {
  sound.currentTime = 0; // On each click, rewind clip to start
  sound.play();
}
function eatApple() {
  if (
    snake.tail[snake.tail.length - 1].x == apple.x &&
    snake.tail[snake.tail.length - 1].y == apple.y
  ) {
    if (snake.tail.length % 5 == 0 && snake.tail.length / 5 <= level) {
      eat.currentTime = 0;
      playClip(levelUp);
      level += 1;
    }
    levelUp.currentTime = 0;
    playClip(eat);
    snake.tail[snake.tail.length] = { x: apple.x, y: apple.y };
    apple = new Apple(canvas, snake);
  }
}
function checkHitWall() {
  const x = snake.tail[snake.tail.length - 1].x;
  const y = snake.tail[snake.tail.length - 1].y;
  if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) {
    gameState = false;
  }
}

function draw() {
  createRect(0, 0, canvas.width, canvas.height, "black");
  for (var i = 0; i < snake.tail.length; i++) {
    createRect(
      snake.tail[i].x + 0.00000001,
      snake.tail[i].y + 0.00000001,
      snake.size - 5,
      snake.size - 5,
      i === snake.tail.length - 1 ? "green" : "white"
    );
  }
  canvasContext.font = "1rem Arial";
  canvasContext.fillStyle = "#FFFFFF";
  canvasContext.fillText("Your Level: " + level, canvas.width / 2.5, 20);

  canvasContext.font = "1rem Arial";
  canvasContext.fillStyle = "#00FF42";
  canvasContext.fillText("Score: " + (snake.tail.length - 1), 6, 20);
  canvasContext.drawImage(img, apple.x, apple.y, apple.size, apple.size);
}

window.addEventListener("keydown", (event) => {
  let key = event.key;
  if (key === "ArrowUp" && snake.rotateY != -1 && !paused) {
    snake.rotateX = 0;
    snake.rotateY = -1;
  } else if (key === "ArrowDown" && snake.rotateY != 1 && !paused) {
    snake.rotateX = 0;
    snake.rotateY = 1;
  } else if (key === "ArrowLeft" && snake.rotateX != -1 && !paused) {
    snake.rotateX = -1;
    snake.rotateY = 0;
  } else if (key === "ArrowRight" && snake.rotateX != 1 && !paused) {
    snake.rotateX = 1;
    snake.rotateY = 0;
  } else if (key == " ") {
    paused = !paused;
  } else if (key == "1") {
    SPEED = 5;
  } else if (key == "2") {
    SPEED = 15;
  } else if (key == "3") {
    SPEED = 25;
  } else if (key == "4") {
    SPEED = 40;
  }
});
