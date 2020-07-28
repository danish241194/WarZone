import DirectionBox from "./direction";
import Rocket from "/src/rocket";

export default class Player {
  constructor(ctx, GAME_WIDTH, GAME_HEIGHT, rockets_positions) {
    this.total_rockets = rockets_positions.length;
    this.current_rocket = 0;
    this.directionbox = new DirectionBox(ctx, GAME_WIDTH, GAME_HEIGHT);
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
  set_rocket(i) {
    this.rockets[this.current_rocket].set_circle_color("green");
    this.current_rocket = i;
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
