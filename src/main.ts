/// <reference path="../phaser/types/phaser.d.ts"/>

namespace FlappyBird {

    export class Game extends Phaser.Game {

        constructor() {
            super({
                type: Phaser.AUTO,
                width: 288,
                height: 505,
                parent: 'content',
                scene: [ BootScene ]
            });
            // 288, 505, Phaser.AUTO, "content", null);

            // this.state.add("play", PlayState, false);
            // this.state.add("preload", PreloadState, false);
            // this.state.add("boot", BootState, false);
            // this.state.add("menu", MenuState, false);

            // this.state.start("boot");
        }
    }

}

window.onload = () => {
    let game = new FlappyBird.Game();
}