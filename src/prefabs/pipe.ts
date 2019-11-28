namespace FlappyBird {

    export class Pipe extends Phaser.GameObjects.Sprite {

        constructor(scene: Phaser.Scene, x: number, y: number, frame: number){
            super(scene, x, y, "pipe", frame);
            this.setOrigin(0.5, 0.5);
            //this.scene.physics.arcade.enableBody(this);

            //this.body.allowGravity = false;
            //this.body.immovable = true;
        }
    }
}
