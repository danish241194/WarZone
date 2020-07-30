import DirectionBox from "./direction";
import Rocket from "/src/rocket";

export default class Player {
  constructor(ctx, GAME_WIDTH, GAME_HEIGHT, rockets_positions, pid) {
    this.total_rockets = rockets_positions.length;
    this.current_rocket = 0;
    let direction_width = 4;
    let direction_height = 15;
    var direction_x_y, box_dimension;
    if (pid === 1) {
      direction_x_y = {
        x1: GAME_WIDTH / 2 - direction_width / 2,
        y1: GAME_HEIGHT - 20,
        x2: GAME_WIDTH / 2 - direction_width / 2,
        y2: GAME_HEIGHT - direction_height - 20
      };
      box_dimension = {
        x: direction_x_y.x1 - 20,
        y: GAME_HEIGHT - 40,
        width: 40,
        height: 40
      };
    } else {
      direction_x_y = {
        x1: GAME_WIDTH / 2 - direction_width / 2,
        y1: 20,
        x2: GAME_WIDTH / 2 - direction_width / 2,
        y2: direction_height + 20
      };
      box_dimension = {
        x: direction_x_y.x1 - 20,
        y: 0,
        width: 40,
        height: 40
      };
    }
    this.directionbox = new DirectionBox(
      ctx,
      GAME_WIDTH,
      GAME_HEIGHT,
      direction_width,
      direction_x_y,
      box_dimension
    );
    this.rockets = [];
    for (var i = 0; i < this.total_rockets; i++) {
      let rocket = new Rocket(
        ctx,
        GAME_WIDTH,
        GAME_HEIGHT,
        rockets_positions[i][0],
        rockets_positions[i][1],
        this.directionbox
      );
      this.rockets.push(rocket);
    }
    this.rockets[0].set_circle_color("red");
  }
  set_rocket() {
    this.rockets[this.current_rocket].set_circle_color("green");
    this.current_rocket += 1;
    this.current_rocket %= this.total_rockets;
    this.rockets[this.current_rocket].set_circle_color("red");
  }
  draw() {
    this.directionbox.draw(1);

    for (var i = 0; i < this.total_rockets; i++) {
      this.rockets[i].draw();
    }
  }

  rotateLeft() {
    this.directionbox.rotateLeft();
  }

  rotateRight() {
    this.directionbox.rotateRight();
  }
  shoot(time) {
    this.rockets[this.current_rocket].shoot(time);
  }
}
