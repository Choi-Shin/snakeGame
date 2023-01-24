let canvas = document.getElementById("canvas");
let canvasContext = canvas.getContext("2d");

export function makeBevelBox(lineW, color, x, y, width, height) {
  canvasContext.lineJoin = "bevel";
  canvasContext.lineWidth = lineW;
  canvasContext.strokeStyle = color;
  canvasContext.strokeRect(x, y, width, height);
}
export function createRect(x, y, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
}

export function writeText(fontSize, fontFamily, color, content, posX, posY) {
  canvasContext.font = `${fontSize} ${fontFamily}`;
  canvasContext.fillStyle = color;
  canvasContext.fillText(content, posX, posY);
}

export function sortByScore(object) {
  let arr = [];
  for (let i in object) {
    arr.push(object[i]);
  }
  return arr.sort((a, b) => {
    if (a.score > b.score) {
      return -1;
    }
  });
}

export function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

export function isInside(pos, rect) {
  return (
    pos.x > rect.x &&
    pos.x < rect.x + rect.width &&
    pos.y < rect.y + rect.height &&
    pos.y > rect.y
  );
}

export function dayFormatting(source, delimiter = "-") {
  const year = source.getFullYear();
  const month = source.getMonth() + 1;
  const day = source.getDate();

  return [year, month, day].join(delimiter);
}
export function timeFormatting(source, delimiter) {
  const h = source.getHours();
  const m = source.getMinutes();
  const s = source.getSeconds();
  const hour = h < 10 ? "0" + h : h;
  const minutes = m < 10 ? "0" + m : m;
  const seconds = s < 10 ? "0" + s : s;
  return [hour, minutes, seconds].join(delimiter);
}
