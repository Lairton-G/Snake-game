import { game } from './game.js';

window.onkeydown = game.KeyPRESS;

game.drowSnake();
game.drowApple();

console.log("X Apple: ",game.appleX, " Y Apple: ", game.appleY)
