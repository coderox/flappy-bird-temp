namespace FlappyBird {

    export class Ground extends Phaser.GameObjects.TileSprite {
        constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
            super(scene, x, y, width, height, "ground");
            this.setOrigin(0, 0);
            this.scene.physics.world.enableBody(this, Phaser.Physics.Arcade.STATIC_BODY);
            
            // we don't want the ground's body
            // to be affected by gravity or external forces
            this.active = true;
        }

        update() {
            if(this.active) {
                this.tilePositionX += 2.0;
            }
        }
    }
}