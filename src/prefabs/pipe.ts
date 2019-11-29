namespace FlappyBird {

    export class Pipe extends Phaser.GameObjects.Sprite {

        constructor(scene: Phaser.Scene, x: number, y: number, frame: number){
            super(scene, x, y, "pipe", frame);
            this.setOrigin(0.5, 0.5);
            this.reset();
        }

        reset() {
            this.scene.physics.world.enableBody(this);
            if(this.body instanceof Phaser.Physics.Arcade.Body){
                this.body.allowGravity = false;
                this.body.immovable = true;
            }
        }

        stop() {
            if(this.body instanceof Phaser.Physics.Arcade.Body) {
                this.scene.physics.world.disableBody(this.body);
            }
        }
    }
}
