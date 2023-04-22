import { Player } from "./sprites/player.js";
import { Enemy } from "./sprites/enemy.js";
import { Smoke } from "./sprites/smoke.js";
import { disableButtons , showLose } from "./script.js";

let backgroundSpeed = 1;
let backgroundX = 0;

const bg = new Image();
bg.src = "./scrollmap/scrollmap.png"

let reqID = 0;

const cv = document.getElementById('escape-canvas');
const context = cv.getContext('2d');

const player = Player(context, 768, 64);
const enemy = Enemy(context, 256, 64);
const smoke = Smoke(context, 256, 64);

let playerAlive = true;
let smokeVisible = false;

export function clickCorrect() {
    smokeVisible = true;
    enemy.hurt();
    smoke.start();
    setTimeout(resetEnemy, 3000);
}

export function clickWrong() {
    enemy.speedUp();
    setTimeout(resetEnemy, 3000);
}

export function getPlayerAlive() {
    return playerAlive;
}

export function endPlay() {
    backgroundSpeed = 0;
    enemy.die();
    player.stop();
    setTimeout(stopAnimation, 3000);
}

export function startPlay() {
    backgroundSpeed = 1;
    player.move();
    enemy.move();
}

function resetEnemy() {
    if (playerAlive) {
        enemy.move();
        enemy.speedNormal();
    }
    smokeVisible = false;
}

function resetPlayer() {
    player.move();
}

function stopAnimation() {
    cancelAnimationFrame(reqID);
}

/* The main processing of the game */
function doFrame(now) {
    
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
            backgroundSpeed = 0;
            player.die();
            enemy.stop();
            playerAlive = false;
            disableButtons();
            setTimeout(() => {
                showLose();
                stopAnimation();
            }, 2000);
        }
    }

    /* Clear the screen */
    context.clearRect(0, 0, cv.width, cv.height);

    /* Draw background */
    context.drawImage(bg, backgroundX, 0);
    context.drawImage(bg, backgroundX + 5120, 0);
    if (backgroundX < -5120) {
        backgroundX = 0;
    } else {
        backgroundX -= backgroundSpeed;
    }

    /* Draw the sprites */
    player.draw();
    enemy.draw();
    if (smokeVisible) {
        smoke.draw();
    }

    /* Process the next frame */
    reqID = requestAnimationFrame(doFrame);
}

window.onload = () => {
    player.stop();
    enemy.stop();
    backgroundSpeed = 0;
    reqID = requestAnimationFrame(doFrame);
}