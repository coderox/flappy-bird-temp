namespace FlappyBird {

    export class PipeGroup extends Phaser.Group {

        topPipe: Pipe;
        bottomPipe: Pipe;
        hasScored: boolean;

        constructor(game: Phaser.Game, parent: PIXI.DisplayObjectContainer ) {
            super(game, parent);

            this.topPipe = new Pipe(this.game, 0, 0, 0);
            this.bottomPipe = new Pipe(this.game, 0, 440, 1);
            this.add(this.topPipe);
            this.add(this.bottomPipe);

            this.setAll("body.velocity.x", -200);

            this.hasScored = false;
        }

        update() {
            if(!this.topPipe.inWorld) {
              this.exists = false;
            }
        };

        reset(x: number, y: number) {
            this.topPipe.reset(0,0);
            this.bottomPipe.reset(0,440);
            this.x = x + 20;
            this.y = y;
            this.setAll("body.velocity.x", -200);
            this.hasScored = false;
            this.exists = true;
        };

        stop() {
            this.setAll("body.velocity.x", 0);
        };
    }
}