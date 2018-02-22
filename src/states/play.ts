namespace FlappyBird {

    export class PlayState extends Phaser.State {

        bird: Bird;
        ground: Ground;

        background: Phaser.Sprite;
        pipes: Phaser.Group;

        pipeGenerator: Phaser.TimerEvent;

        groundHitSound: Phaser.Sound;

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

            // create and add a group to hold our pipeGroup prefabs
            this.pipes = this.game.add.group();
            this.pipeGenerator = null;

            // add mouse/touch controls
            this.game.input.onDown.add(this.bird.flap, this.bird);

            this.groundHitSound = this.game.add.audio('groundHit');

            // add a timer
            this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
            this.pipeGenerator.timer.start();
        }

        update() {
            // enable collisions between the bird and the ground
            this.game.physics.arcade.collide(this.bird, this.ground, this.deathHandler, null, this);
        }

        deathHandler(bird: Bird, enemy: Phaser.Sprite) {
            if(enemy instanceof Ground && !this.bird.onGround) {
                this.groundHitSound.play();
                this.bird.onGround = true;
            }
        }

        generatePipes() {
            var pipeY = this.game.rnd.integerInRange(-100, 100);
            var pipeGroup = this.pipes.getFirstExists(false);
            if(!pipeGroup) {
                pipeGroup = new PipeGroup(this.game, this.pipes);  
            }
            pipeGroup.reset(this.game.width, pipeY);
        }
    }
}