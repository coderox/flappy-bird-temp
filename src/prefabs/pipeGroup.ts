namespace FlappyBird {

    export class PipeGroup extends Phaser.GameObjects.Container {

        topPipe: Pipe;
        bottomPipe: Pipe;
        hasScored: boolean;

        constructor(scene: Phaser.Scene, parent: Phaser.GameObjects.Group ) {
            super(scene);

            this.topPipe = new Pipe(this.scene, 0, 0, 0);
            this.bottomPipe = new Pipe(this.scene, 0, 440, 1);
            this.add(this.topPipe);
            this.add(this.bottomPipe);

            this.hasScored = false;
            parent.add(this, true);
        }

        update() {
            this.x -= 2.0;
            if(this.x < 0) {
              this.active = false;
            }
        };

        reset(x: number, y: number) {
            this.topPipe.setPosition(0,0);
            this.bottomPipe.setPosition(0,440);
            this.x = x + 20;
            this.y = y;
            // this.setAll("body.velocity.x", -200);
            this.hasScored = false;
            this.active = true;
            this.topPipe.reset();
            this.bottomPipe.reset();
        };

        stop() {
            this.active = false;
            this.bottomPipe.stop();
            this.topPipe.stop();
        };
    }
}
