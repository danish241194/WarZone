export default class Rocket {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 4;
    this.height = 40;
    this.angle = 0;
    this.position = {
      x1: this.gameWidth / 2 - this.width / 2,
      y1: this.gameHeight - this.height - 10,
      x2: this.gameWidth / 2 - this.width / 2,
      y2: this.gameHeight - 10
    };
  }
  distance(x1, x2, y1, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var dist = Math.sqrt(dx * dx + dy * dy);
    return dist;
  }

  rotateLeft() {
    //change direction
    let x = (this.position.x1 + this.position.x2) / 2;
    let y = (this.position.y1 + this.position.y2) / 2;

    let angle = 0.1 * Math.PI;
    let radius =
      this.distance(
        this.position.x1,
        this.position.x2,
        this.position.y1,
        this.position.y2
      ) / 2;

    this.position.x1 = x + radius * Math.cos(angle);
    this.position.y1 = y + radius * Math.sin(angle);
    this.position.x2 = x - radius * Math.cos(angle);
    this.position.y2 = y - radius * Math.sin(angle);
  }

  rotateRight() {
    this.position.x1 += 2;
  }
  draw() {
    this.ctx.strokeStyle = "#ff00ff";
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.moveTo(this.position.x1, this.position.y1);
    this.ctx.lineTo(this.position.x2, this.position.y2);
    this.ctx.stroke();
  }
  moveLeft() {
    this.position.x1 -= 2;
  }
}
