/// <reference path="../phaser-ce/typescript/phaser.d.ts"/>

namespace FlappyBird {

    export class Game extends Phaser.Game {

        constructor() {
            super(288, 505, Phaser.AUTO, "content", {
                preload() {

                },

                create() {
                    this.stage.backgroundColor  = "#00FF00";
                },

                update() {

                }
            });
        }
    }

}

window.onload = () => {
    var game = new FlappyBird.Game();
}