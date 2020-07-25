import DirectionBox from "./direction";

let STABLE_STATE = 1;
let ANIMATION_STATE = 2;

let ANIMATION_FRAME_SKIP = 5;
export default class Rocket {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.act_pos = {
      x: this.gameWidth / 2 - 7,
      y: this.gameHeight - 55
    };

    this.state = STABLE_STATE;
    this.direction = new DirectionBox(this.ctx, gameWidth, gameHeight);
  }

  rotateLeft() {
    this.direction.rotateLeft();
  }

  rotateRight() {
    this.direction.rotateRight();
  }

  shoot(time) {
    this.animation_target_time = time * 10;
    let velocity = this.direction.get_velX_velY();
    this.velX = velocity.velx * ANIMATION_FRAME_SKIP;
    this.velY = velocity.vely * ANIMATION_FRAME_SKIP;
    this.state = ANIMATION_STATE;
    console.log("time = ", time);
  }

  draw() {
    if (this.state === ANIMATION_STATE) {
      let collide_result = this.direction.colide_position(
        this.act_pos.x,
        this.act_pos.y,
        this.act_pos.x + this.velX,
        this.act_pos.y + this.velY,
        this.velX,
        this.velY
      );

      if (collide_result.isColliding) {
        this.act_pos.x = collide_result.x;
        this.act_pos.y = collide_result.y;
        this.state = STABLE_STATE;
      } else {
        this.act_pos.x += this.velX;
        this.act_pos.y += this.velY;
      }

      if (this.act_pos.x < 0) {
        this.act_pos.x = 0;
        this.state = STABLE_STATE;
      } else if (this.act_pos.x + 10 > this.gameWidth) {
        this.act_pos.x = this.gameWidth - 10;
        this.state = STABLE_STATE;
      }

      if (this.act_pos.y + 10 > this.gameHeight) {
        this.act_pos.y = this.gameHeight - 10;
        this.state = STABLE_STATE;
      } else if (this.act_pos.y < 0) {
        this.act_pos.y = 0;
        this.state = STABLE_STATE;
      }

      this.animation_target_time -= 2;
      if (this.animation_target_time <= 0) {
        this.state = STABLE_STATE;
      }
    }
    this.direction.draw(this.state);

    this.ctx.fillRect(this.act_pos.x, this.act_pos.y, 10, 10);
  }
}
