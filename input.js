var space_key_down_time = 0;
var flag = true;

let SPACE_BAR = 32;
let LEFT_ARROW = 37;
let RIGHT_ARROW = 39;

let MAXIMUM_JUMP_TIME = 20;
export default class InputHandler {
  constructor(player) {
    document.addEventListener("keydown", event => {
      if (event.keyCode === SPACE_BAR) {
        if (space_key_down_time >= MAXIMUM_JUMP_TIME) {
          player.shoot(MAXIMUM_JUMP_TIME);
          space_key_down_time = 0;
          flag = false;
        } else if (space_key_down_time <= MAXIMUM_JUMP_TIME && flag) {
          space_key_down_time += 2;
        }
      } else if (event.keyCode === LEFT_ARROW) {
        player.rotateLeft();
      } else if (event.keyCode === RIGHT_ARROW) {
        player.rotateRight();
      } else if (event.keyCode === 48) {
        player.set_rocket(0);
      } else if (event.keyCode === 49) {
        player.set_rocket(1);
      } else if (event.keyCode === 50) {
        player.set_rocket(2);
      }
    });

    document.addEventListener("keyup", event => {
      if (event.keyCode === SPACE_BAR) {
        if (space_key_down_time > 0) {
          player.shoot(space_key_down_time);
          space_key_down_time = 0;
        }
        flag = true;
      }
    });
  }
}
