namespace FlappyBird {

    export class Pipe extends Phaser.GameObjects.Sprite {

        constructor(game: Phaser.Game, x: number, y: number, frame: number){
            super(game, x, y, "pipe", frame);
            this.anchor.setTo(0.5, 0.5);
            this.game.physics.arcade.enableBody(this);

            this.body.allowGravity = false;
            this.body.immovable = true;
        }
    }
}
