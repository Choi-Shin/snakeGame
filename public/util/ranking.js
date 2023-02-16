import {
  createRect,
  getMousePos,
  isInside,
  makeBevelBox,
  sortByScore,
  writeText,
} from "./functions/functions.js";
import { mainShow } from "./mainpage.js";
import { gameLoop } from "./movement.js";
import { getRanking } from "/rank.js";
const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
let buttons = [
  { x: 75, y: canvas.height - 70, width: 150, height: 40 },
  { x: 280, y: canvas.height - 70, width: 150, height: 40 },
];
export function ranking() {
  show();
}

function show() {
  draw();
}

async function draw() {
  let data = await getRanking("/rank")
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
  createRect(0, 0, canvas.width, canvas.height, "black");
  writeText("3rem", "arial", "white", "Ranking", canvas.width / 3, 50);
  writeText("1.2rem", "arial", "#00FF42", "rank", 50, 100);
  writeText("1.2rem", "arial", "#00FF42", "name", 100, 100);
  writeText("1.2rem", "arial", "#00FF42", "score", 200, 100);
  writeText("1.2rem", "arial", "#00FF42", "date", 300, 100);
  const newData = sortByScore(data["ranking"]);
  newData.map((data, i) => {
    writeText("1.3rem", "arial", "white", `${i + 1}`, 50, 140 + i * 30);
    writeText(
      "1.3rem",
      "arial",
      "white",
      `${data.name.length < 8 ? data.name : data.name.substr(0, 8)}`,
      100,
      140 + i * 30
    );
    writeText("1.3rem", "arial", "white", `${data.score}`, 200, 140 + i * 30);
    writeText("1.3rem", "arial", "white", `${data.date}`, 300, 140 + i * 30);
  });
  makeBevelBox(4, "white", 75, canvas.height - 70, 150, 40);
  makeBevelBox(4, "white", 280, canvas.height - 70, 150, 40);
  writeText("1.3rem", "arial", "#00FF42", "Menu", 125, canvas.height - 45);
  writeText(
    "1.3rem",
    "arial",
    "#00FF42",
    "Game Start",
    303,
    canvas.height - 45
  );
}

canvas.addEventListener("mousemove", function (event) {
  let mousePos = getMousePos(canvas, event);
  if (isInside(mousePos, buttons[0])) {
    canvas.style.cursor = "pointer";
  } else if (isInside(mousePos, buttons[1])) {
    canvas.style.cursor = "pointer";
  } else {
    canvas.style.cursor = "default";
  }
});
canvas.addEventListener("click", function (event) {
  let mousePos = getMousePos(canvas, event);
  if (isInside(mousePos, buttons[0])) {
    canvas.style.cursor = "default";
    mainShow("refresh");
  } else if (isInside(mousePos, buttons[1])) {
    canvas.style.cursor = "default";
    gameLoop("start");
  }
});
