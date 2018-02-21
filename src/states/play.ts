namespace FlappyBird {

    export class PlayState extends Phaser.State {

        background: Phaser.Sprite;
        bird: Bird;
        ground: Ground;

        create() {
            // start the phaser arcade physics engine
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            // give our world an initial gravity of 1200
            this.game.physics.arcade.gravity.y = 1200;

            this.background = this.game.add.sprite(0,0,"background");

            this.bird = new Bird(this.game, 100, this.game.height/2, 0);
            this.game.add.existing(this.bird);

            this.ground = new Ground(this.game, 0, 400, 335, 112);
            this.game.add.existing(this.ground);

            // add mouse/touch controls
            this.game.input.onDown.add(this.bird.flap, this.bird);            
        }

        update() {
            // enable collisions between the bird and the ground
            this.game.physics.arcade.collide(this.bird, this.ground, this.deathHandler, null, this);

        }

        deathHandler(bird: Bird, enemy: Phaser.Sprite) {

        }

    }
}