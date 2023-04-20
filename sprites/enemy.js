import { Sprite } from "./sprite.js";
export const Enemy = function(ctx, x, y) {

    const sequences = {
        idle:  { x: 0, y: 192, width: 32, height: 32, count: 4, timing: 100, loop: true },
        move: { x: 0, y: 256, width: 32, height: 32, count: 4, timing: 100, loop: true },
        hurt: { x: 0, y: 320, width: 32, height: 32, count: 1, timing: 2000, loop: false },
        death: { x: 0, y: 320, width: 32, height: 32, count: 8, timing: 100, loop: false}
    };

    const sprite = Sprite(ctx, x, y);

    sprite.setSequence(sequences.idle)
          .setScale(2)
          .useSheet("./asset/Enemies/enemies x1.png");

    let speed = 30;

    const move = function() {
        speed = 30;
        sprite.setSequence(sequences.move);
    };

    const stop = function() {
        speed = 0;
        sprite.setSequence(sequences.idle);
    };

    const hurt = function() {
        speed = -30;
        sprite.setSequence(sequences.hurt);
    };

    const die = function() {
        speed = 0;
        sprite.setSequence(sequences.death);
    }

    const speedUp = function() {
        speed = 70;
    };

    const speedNormal = function() {
        speed = 30;
    }

    const update = function(time) {
        let { x, y } = sprite.getXY();

        x += speed / 60;
        sprite.setXY(x, y);
        sprite.update(time);
    };

    return {
        move: move,
        stop: stop,
        hurt: hurt,
        die: die,
        getBoundingBox: sprite.getBoundingBox,
        draw: sprite.draw,
        getXY: sprite.getXY,
        update: update,
        speedUp: speedUp,
        speedNormal: speedNormal
    };
};
