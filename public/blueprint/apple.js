export default class Apple {
  constructor(canvas, snake) {
    this.size = 20;
    this.x = Math.floor((Math.random() * canvas.width) / this.size) * this.size;
    this.y =
      Math.floor((Math.random() * canvas.height) / this.size) * this.size;
    while (true) {
      let isTouching;
      for (var i = 0; i < snake.tail.length; i++) {
        if (this.x == snake.tail[i].x && this.y == snake.tail[i].y) {
          isTouching = true;
        }
      }
      if (!isTouching) {
        break;
      }
    }
  }
}
