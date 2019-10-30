namespace FlappyBird {

    export class Bird extends Phaser.GameObjects.Sprite {

        flapSound: Phaser.Sound.BaseSound;
        onGround: Boolean;

        constructor(game: Phaser.Game, x: number, y: number, frame: number) {
            super(game, x, y, "bird", frame);
            this.anchor.setTo(0.5, 0.5);
            this.animations.add("flap");
            this.animations.play("flap", 12, true);

            this.flapSound = this.game.add.audio('flap');

            this.alive = false;
            this.onGround = false;

            // enable physics on the bird
            // and disable gravity on the bird
            // until the game is started
            // also make sure the collisions are using circular body
            this.game.physics.arcade.enableBody(this);
            this.body.setCircle(13, 5, -2);
            this.body.allowGravity = false;
            this.body.collideWorldBounds = true;

            this.events.onKilled.add(this.onKilled, this);
        }

        flap() {
            if(this.alive) {
                this.onGround = false;
                this.flapSound.play();
                //cause our bird to "jump" upward
                this.body.velocity.y = -400;
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

            if(!this.alive) {
                this.body.velocity.x = 0;
            } 
        }

        onKilled() {
            this.exists = true;
            this.visible = true;
            this.animations.stop();
            let duration = 90 / this.y * 300;
            this.game.add.tween(this).to({angle: 90}, duration).start();
        }
    }
}