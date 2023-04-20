import { Player } from "./sprites/player.js";
import { Enemy } from "./sprites/enemy.js";
import { Smoke } from "./sprites/smoke.js";
import { disableButtons , showLose } from "./script.js";

let backgroundSpeed = 30;
let backgroundX = 0;

const bg1 = new Image();
bg1.src = "./scrollmap/scroll1.png";
const bg2 = new Image();
bg2.src = "./scrollmap/scroll2.png";
const bg3 = new Image();
bg3.src = "./scrollmap/scroll3.png";
const bg4 = new Image();
bg4.src = "./scrollmap/scroll4.png";
const bg5 = new Image();
bg5.src = "./scrollmap/scroll5.png";

let reqID = 0;

const cv = document.getElementById('escape-canvas');
const context = cv.getContext('2d');

const player = Player(context, 768, 64);
const enemy = Enemy(context, 256, 64);
const smoke = Smoke(context, 256, 64);

let playerAlive = true;

export function clickCorrect() {
    enemy.hurt();
    smoke.start();
    smoke.draw();
    setTimeout(resetEnemy, 3000);
}

export function clickWrong() {
    enemy.speedUp();
    setTimeout(resetEnemy, 3000);
}

export function endGame() {
    enemy.die();
    player.stop();
    setTimeout(() => {
        cancelAnimationFrame(reqID);
    }, 3000);
}

function resetEnemy() {
    enemy.move();
    enemy.speedNormal();
}

function resetPlayer() {
    player.move();
}

/* The main processing of the game */
function doFrame(now) {
    /* Draw background */
    /*
    context.drawImage(backgrounds[0], backgroundX, 0);
    if (backgroundX < -3072) {
        backgroundX = 3072;
    } else {
        backgroundX -= backgroundSpeed;
    }
    */
    
    /* Update the sprites */
    player.update(now);
    enemy.update(now);
    smoke.update(now);

    const {x, y} = enemy.getXY();
    smoke.setXY(x, y);

    /* Check if the enemy catches up the player */
    if (playerAlive == true) {
        const {x, y} = enemy.getXY();
        const box = player.getBoundingBox();
        if (box.isPointInBox(x, y)) {
            player.die();
            enemy.stop();
            playerAlive = false;
            disableButtons();
            setTimeout(showLose, 2000);
        }
    }

    /* Clear the screen */
    context.clearRect(0, 0, cv.width, cv.height);

    /* Draw the sprites */
    player.draw();
    enemy.draw();

    /* Process the next frame */
    reqID = requestAnimationFrame(doFrame);
}

window.onload = () => {
    /* Move sprites */
    player.move();
    enemy.move();

    /* Start the game */
    reqID = requestAnimationFrame(doFrame);
}
