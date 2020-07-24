import { rotate } from "/src/utils";

let STABLE_STATE = 1;
let ANIMATION_STATE = 2;
let INTERMEDIATE_STATE = 3;

let ANIMATION_FRAME_SKIP = 5;
export default class Rocket {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 4;
    this.height = 20;
    this.angle = 0;
    this.position = {
      x1: this.gameWidth / 2 - this.width / 2,
      y1: this.gameHeight - 10,
      x2: this.gameWidth / 2 - this.width / 2,
      y2: this.gameHeight - this.height - 10
    };
    this.rotation_degree = 10;
    this.state = STABLE_STATE;
  }

  rotateLeft() {
    let new_x = rotate(
      this.position.x1,
      this.position.y1,
      this.position.x2,
      this.position.y2,
      this.rotation_degree,
      true
    );
    this.position.x2 = new_x.x;
    this.position.y2 = new_x.y;
  }

  rotateRight() {
    let new_x = rotate(
      this.position.x1,
      this.position.y1,
      this.position.x2,
      this.position.y2,
      this.rotation_degree,
      false
    );
    this.position.x2 = new_x.x;
    this.position.y2 = new_x.y;
  }

  shoot(time) {
    console.log("time = ", time);
    this.animation_target_time = time * 10;
    let tx = this.position.x2 - this.position.x1;
    let ty = this.position.y2 - this.position.y1;
    let dist = Math.sqrt(tx * tx + ty * ty);

    this.velX = (tx / dist) * ANIMATION_FRAME_SKIP;
    this.velY = (ty / dist) * ANIMATION_FRAME_SKIP;
    this.state = ANIMATION_STATE;
  }

  draw() {
    if (this.state === ANIMATION_STATE) {
      this.position.x2 += this.velX;
      this.position.y2 += this.velY;
      this.position.x1 += this.velX;
      this.position.y1 += this.velY;
      this.animation_target_time -= 2;
      if (this.animation_target_time <= 5) {
        this.state = INTERMEDIATE_STATE;
      }
    } else if (this.state === INTERMEDIATE_STATE) {
      this.animation_target_time -= 0.1;

      if (this.animation_target_time <= 0) {
        this.state = STABLE_STATE;
      }
    } else {
      this.ctx.strokeStyle = "#ff00ff";
      this.ctx.lineWidth = 4;
      this.ctx.beginPath();
      this.ctx.moveTo(this.position.x1, this.position.y1);
      this.ctx.lineTo(this.position.x2, this.position.y2);
      this.ctx.stroke();
    }
    this.ctx.fillRect(this.position.x1 - 5, this.position.y1 - 5, 10, 10);
  }
}
