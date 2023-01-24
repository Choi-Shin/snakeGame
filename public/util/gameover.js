import {
  createRect,
  getMousePos,
  isInside,
  makeBevelBox,
  writeText,
} from "./functions/functions.js";
import { mainShow } from "./mainpage.js";
import { gameLoop } from "./movement.js";

let canvas = document.getElementById("canvas");
let canvasContext = canvas.getContext("2d");
let score;
let gameState;
let menuButton = { x: 30, y: canvas.height - 100, width: 200, height: 80 };
let retryButton = {
  x: canvas.width - 230,
  y: canvas.height - 100,
  width: 200,
  height: 80,
};
let gameOverButtons = [menuButton, retryButton];

canvas.addEventListener("mousemove", function (event) {
  let mousePos = getMousePos(canvas, event);
  if (gameState === "gameover") {
    if (isInside(mousePos, gameOverButtons[0])) {
      canvas.style.cursor = "pointer";
    } else if (isInside(mousePos, gameOverButtons[1])) {
      canvas.style.cursor = "pointer";
    } else {
      canvas.style.cursor = "default";
    }
  }
});
canvas.addEventListener("click", function (event) {
  let mousePos = getMousePos(canvas, event);
  if (gameState === "gameover") {
    if (isInside(mousePos, gameOverButtons[0])) {
      gameState = "";
      canvas.style.cursor = "default";
      mainShow("refresh");
    } else if (isInside(mousePos, gameOverButtons[1])) {
      gameState = "";
      canvas.style.cursor = "default";
      gameLoop("start");
    }
  }
});

export function gameOver(tail) {
  score = tail;
  gameState = "gameover";
  show();
}
function show() {
  draw();
}

function draw() {
  createRect(0, 0, canvas.width, canvas.height, "black");
  writeText("3rem", "arial", "white", "Game Over...", 120, 150);
  writeText("2rem", "arial", "white", `Your Score is... ${score}`, 120, 200);
  writeText("3rem", "arial", "white", "Thanks for Playing", 50, 350);
  makeBevelBox(4, "white", 30, canvas.height - 100, 200, 80);
  writeText("2rem", "arial", "white", "Menu", 90, canvas.height - 50);
  makeBevelBox(4, "white", canvas.width - 230, canvas.height - 100, 200, 80);
  writeText(
    "2rem",
    "arial",
    "white",
    "Retry",
    canvas.width - 170,
    canvas.height - 50
  );
}
