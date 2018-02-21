/// <reference path="../phaser-ce/typescript/phaser.d.ts"/>

namespace FlappyBird {

    export class Game extends Phaser.Game {

        constructor() {
            super(288, 505, Phaser.AUTO, "content", null);

            this.state.add("play", PlayState, false);

            this.state.start("play");
        }
    }

}

window.onload = () => {
    var game = new FlappyBird.Game();
}