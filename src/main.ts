/// <reference path="../phaser/types/phaser.d.ts"/>

namespace FlappyBird {

    export class Game extends Phaser.Game {

        constructor() {
            super({
                type: Phaser.AUTO,
                width: 288,
                height: 505,
                parent: 'content',
                physics: { 
                    default: 'arcade',
                    arcade: {
                        y: 1200,
                        debug: true,
                    }},
                scene: [ BootScene, MenuScene, PlayScene ]
            });
        }
    }

}

window.onload = () => {
    let game = new FlappyBird.Game();
}