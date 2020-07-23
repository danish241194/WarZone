import Rocket from "/src/rocket";
import InputHandler from "/src/input";

let canvas = document.getElementById("gamescreen");
let ctx = canvas.getContext("2d");

let GAME_WIDTH = 800;
let GAME_HEIGHT = 600;
ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

let rocket = new Rocket(ctx, GAME_WIDTH, GAME_HEIGHT);

let handler = new InputHandler(rocket);
 
function gameLoop(timestamp) {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  rocket.draw();
  requestAnimationFrame(gameLoop);
}
gameLoop();
