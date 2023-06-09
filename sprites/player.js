import { Sprite } from "./sprite.js";
export const Player = function(ctx, x, y) {

    const sequences = {
        idle:  { x: 0, y: 0, width: 32, height: 32, count: 1, timing: 100, loop: false },
        move: { x: 0, y: 96, width: 32, height: 32, count: 4, timing: 100, loop: true },
        death: { x: 0, y: 160, width: 32, height: 32, count: 7, timing: 100, loop: false }
    };

    const sprite = Sprite(ctx, x, y);

    sprite.setSequence(sequences.idle)
          .setScale(2.5)
          .useSheet("./asset/Players/players blue x1.png");

    const move = function() {
        sprite.setSequence(sequences.move);
    };

    const stop = function() {
        sprite.setSequence(sequences.idle);
    };

    const die = function() {
        sprite.setSequence(sequences.death);
    }

    return {
        move: move,
        stop: stop,
        die: die,
        getBoundingBox: sprite.getBoundingBox,
        draw: sprite.draw,
        update: sprite.update
    };
};
