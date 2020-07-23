export default class InputHandler {
  constructor(rocket_) {
    document.addEventListener("keydown", event => {
      if (event.keyCode === 37) {
        rocket_.rotateLeft();
      } else if (event.keyCode === 39) {
        console.log("right");
      }
    });
  }
}
