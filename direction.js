import { rotate } from "/src/utils";
let STABLE_STATE = 1;
let ANIMATION_FRAME_SKIP = 5;
export default class DirectionBox {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.width = 4;
    this.height = 15;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.position = {
      x1: gameWidth / 2 - this.width / 2,
      y1: gameHeight - 20,
      x2: gameWidth / 2 - this.width / 2,
      y2: gameHeight - this.height - 20
    };
    this.rotation_degree = 10;
    this.box_dimension = {
      x: this.position.x1 - 20,
      y: this.gameHeight - 40,
      width: 40,
      height: 40
    };
  }
  rotateLeft() {
    let new_cord = rotate(
      this.position.x1,
      this.position.y1,
      this.position.x2,
      this.position.y2,
      this.rotation_degree,
      true
    );

    this.position.x2 = new_cord.x;
    this.position.y2 = new_cord.y;
  }

  rotateRight() {
    let new_cord = rotate(
      this.position.x1,
      this.position.y1,
      this.position.x2,
      this.position.y2,
      this.rotation_degree,
      false
    );

    this.position.x2 = new_cord.x;
    this.position.y2 = new_cord.y;
  }

  draw(state) {
    if (state === STABLE_STATE) {
      this.ctx.strokeStyle = "#00ff00";
    } else {
      this.ctx.strokeStyle = "#ff0000";
    }

    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.moveTo(this.position.x1, this.position.y1);
    this.ctx.lineTo(this.position.x2, this.position.y2);
    this.ctx.stroke();
    this.ctx.lineWidth = 2;
    // this.box
    // this.ctx.moveTo(this.position.x1 + 20, this.gameHeight);
    // this.ctx.lineTo(this.position.x1 + 20, this.gameHeight-40);
    // this.ctx.lineTo(this.position.x1 -20 , this.gameHeight-40);
    // this.ctx.lineTo(this.position.x1 -20, this.gameHeight);
    this.drawBox();

    // this.ctx.stroke();
  }

  drawBox() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.rect(
      this.box_dimension.x,
      this.box_dimension.y,
      this.box_dimension.width,
      this.box_dimension.height
    );
    this.ctx.stroke();
  }
  IsInsideBox(newx, newy) {
    if (
      newx + 10 > this.box_dimension.x &&
      newx < this.box_dimension.x + this.box_dimension.width &&
      newy + 10 > this.box_dimension.y
    ) {
      return true;
    }
    return false;
  }
  colide_position(oldx, oldy, newx, newy, velX, velY) {
    velX = velX / ANIMATION_FRAME_SKIP;
    velY = velY / ANIMATION_FRAME_SKIP;
    var result = { isColliding: false, x: 0, y: 0 };
    if (this.IsInsideBox(newx, newy)) {
      result.isColliding = true;
      result.x = oldx;
      result.y = oldy;

      for (
        let i = 0;
        i < ANIMATION_FRAME_SKIP &&
        !this.IsInsideBox(result.x + velX, result.y + velY);
        i++
      ) {
        result.x = result.x + velX;
        result.y = result.y + velY;
      }
    }
    return result;
  }
  get_velX_velY() {
    let tx = this.position.x2 - this.position.x1;
    let ty = this.position.y2 - this.position.y1;
    let dist = Math.sqrt(tx * tx + ty * ty);

    let velX = tx / dist;
    let velY = ty / dist;
    return { velx: velX, vely: velY };
  }
}
