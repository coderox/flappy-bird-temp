namespace FlappyBird {

    export class Bird extends Phaser.GameObjects.Sprite {

        flapSound: Phaser.Sound.BaseSound | undefined;
        onGround: boolean;
        public alive: boolean;

        constructor(scene: Phaser.Scene, x: number, y: number, frame: number) {
            super(scene, x, y, "bird", frame);
            //this.setOrigin(this.width/2, this.height/2);

            this.anims.animationManager.create({
                key: "flap", 
                frames: this.anims.animationManager.generateFrameNames("bird"),
                frameRate: 12,
                repeat: -1});
            this.anims.play("flap");

            // this.flapSound = this.game.add.audio('flap');

            this.active = true;
            this.onGround = false;
            this.alive = false;

            // enable physics on the bird
            // and disable gravity on the bird
            // until the game is started
            // also make sure the collisions are using circular body
            this.scene.physics.world.enableBody(this);
            if(this.body instanceof Phaser.Physics.Arcade.Body){
                this.body.setCircle(13, 5, -2);
                this.body.allowGravity = false;
                this.body.collideWorldBounds = true;
            }
        }

        setAlive(alive: boolean) { 
            this.alive = alive;
            if(this.body instanceof Phaser.Physics.Arcade.Body) {
                this.body.allowGravity = alive;
                this.body.setGravityY(1200);
            }
        }

        flap() {
            if(this.alive && this.active) {
                this.onGround = false;
                //this.flapSound.play();
                //cause our bird to "jump" upward
                if(this.body instanceof Phaser.Physics.Arcade.Body) {
                    this.body.velocity.y = -400;
                }
                // rotate the bird to -40 degrees
                this.scene.tweens.add({ 
                    targets: this,
                    angle: -40, 
                    duration: 100
                });
            } 
        }

        update() {
            // check to see if our angle is less than 90
            // if it is rotate the bird towards the ground by 2.5 degrees
            if(this.angle < 90 && this.alive) {
                this.angle += 2.5;
            }
        }

        stop() {
            this.visible = true;
            this.active = false;
            this.anims.stop();
            let duration = 90 / this.y * 300;
            this.scene.tweens.add({ 
                targets: this,
                angle: 90, 
                duration: duration
            });
        }
    }
}