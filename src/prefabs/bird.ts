namespace FlappyBird {

    export class Bird extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number, frame: number) {
            super(game, x, y, "bird", frame);
            this.anchor.setTo(0.5, 0.5);
            this.animations.add("flap");
            this.animations.play("flap", 12, true);
        }

        flap() {
            if(this.alive) {
                // rotate the bird to -40 degrees
                this.game.add.tween(this).to({angle: -40}, 100).start();
            } 
        }

        update() {
            // check to see if our angle is less than 90
            // if it is rotate the bird towards the ground by 2.5 degrees
            if(this.angle < 90 && this.alive) {
                this.angle += 2.5;
            } 
        }
    }
}