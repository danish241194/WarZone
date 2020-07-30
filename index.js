import InputHandler from "/src/input";
import Player from "./player";

let canvas = document.getElementById("gamescreen");
let ctx = canvas.getContext("2d");

let GAME_WIDTH = 800;
let GAME_HEIGHT = 600;
ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

let player2 = new Player(
  ctx,
  GAME_WIDTH,
  GAME_HEIGHT,
  [
    [GAME_WIDTH / 2 + 10, 55],
    [GAME_WIDTH / 2 - 7, 55],
    [GAME_WIDTH / 2 - 24, 55]
  ],
  2
);

let player1 = new Player(
  ctx,
  GAME_WIDTH,
  GAME_HEIGHT,
  [
    [GAME_WIDTH / 2 + 10, GAME_HEIGHT - 55],
    [GAME_WIDTH / 2 - 7, GAME_HEIGHT - 55],
    [GAME_WIDTH / 2 - 24, GAME_HEIGHT - 55]
  ],
  1
);

let handler = new InputHandler(player2);

function gameLoop(timestamp) {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  player2.draw();
  player1.draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
