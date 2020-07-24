var space_key_down_time = 0;
var flag = true;

let SPACE_BAR = 32;
let LEFT_ARROW = 37;
let RIGHT_ARROW = 39;

export default class InputHandler {
  constructor(rocket_) {
    document.addEventListener("keydown", event => {
      if (event.keyCode === LEFT_ARROW) {
        rocket_.rotateLeft();
      } else if (event.keyCode === RIGHT_ARROW) {
        rocket_.rotateRight();
      } else if (event.keyCode === SPACE_BAR) {
        if (space_key_down_time >= 25) {
          rocket_.shoot(25);
          space_key_down_time = 0;
          flag = false;
        } else if (space_key_down_time <= 25 && flag) {
          space_key_down_time += 1;
        }
      }
    });

    document.addEventListener("keyup", event => {
      if (event.keyCode === SPACE_BAR) {
        if (space_key_down_time > 0) {
          rocket_.shoot(space_key_down_time);
          space_key_down_time = 0;
        }
        flag = true;
      }
    });
  }
}
