import { credit } from "./credit.js";
import {
  createRect,
  getMousePos,
  isInside,
  makeBevelBox,
  writeText,
} from "./functions/functions.js";
import { gameLoop } from "./movement.js";
import { ranking } from "./ranking.js";
let snakeIcon = new Image();
snakeIcon.src = "../img/snake.png";
let gameState = "menu";
let canvas = document.getElementById("canvas");
let canvasContext = canvas.getContext("2d");
let startButton;
let rankingButton;
let creditButton;
let buttons = [startButton, rankingButton, creditButton];
window.onload = () => {
  mainShow();
};

canvas.addEventListener("mousemove", function (event) {
  let mousePos = getMousePos(canvas, event);
  if (gameState === "menu") {
    if (isInside(mousePos, buttons[0])) {
      canvas.style.cursor = "pointer";
    } else if (isInside(mousePos, buttons[1])) {
      canvas.style.cursor = "pointer";
    } else if (isInside(mousePos, buttons[2])) {
      canvas.style.cursor = "pointer";
    } else {
      canvas.style.cursor = "default";
    }
  }
});
canvas.addEventListener("click", function (event) {
  let mousePos = getMousePos(canvas, event);
  if (isInside(mousePos, buttons[0])) {
    canvas.style.cursor = "default";
    gameState = "gaming";
    gameLoop("start");
  } else if (isInside(mousePos, buttons[1])) {
    canvas.style.cursor = "default";
    gameState = "ranking";
    ranking();
  } else if (isInside(mousePos, buttons[2])) {
    canvas.style.cursor = "default";
    gameState = "credit";
    credit();
  } else {
  }
});

export function mainShow(state) {
  if (state === "refresh") {
    console.log(state);
    gameState = "menu";
  }
  draw();
}

function draw() {
  createRect(0, 0, canvas.width, canvas.height, "black");
  canvasContext.drawImage(snakeIcon, canvas.width / 6, 50, 320, 140);
  writeText("1.8rem", "arial", "white", "The Snake Game", 175, 110);
  createMenu();
}

function createMenu() {
  const boxX = canvas.width / 4;
  const boxY = canvas.height / 2.3;
  const boxW = 250;
  const boxH = 250;
  makeBevelBox(4, "white", boxX, boxY, boxW, boxH);
  var menu = ["Start", "Ranking", "Credits"];
  menu.map((element, i) => {
    buttons[i] = {
      x: boxX + 20,
      y: boxY + 30 + i * 70,
      width: 100,
      height: 50,
    };
    writeText(
      "1.7rem",
      "arial",
      "white",
      element,
      boxX + 20,
      boxY + 60 + i * 70
    );
  });
}
