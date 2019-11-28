namespace FlappyBird {

    export class PlayScene extends Phaser.Scene {

        bird: Bird | undefined;
        ground: Ground | undefined;
        panorama: Panorama | undefined;
        scoreboard: ScoreBoard | undefined;

        // background: Phaser.Sprite | undefined;
        // pipes: Phaser.Group | undefined;
        // instructionsGroup: Phaser.Group | undefined;

        // pipeGenerator: Phaser.TimerEvent | undefined;

        // groundHitSound: Phaser.Sound | undefined;
        // pipeHitSound: Phaser.Sound | undefined;
        // scoreSound: Phaser.Sound | undefined;

        // scoreText: Phaser.BitmapText | undefined;

        gameover: boolean = false;
        score: number = 0;

        constructor() {
            super("play");
        }

        create() {
            // start the phaser arcade physics engine
            // this.game.physics.startSystem(Phaser.Physics.ARCADE);

            // give our world an initial gravity of 1200
            // this.game.physics.arcade.gravity.y = 1200;

            // this.background = this.game.add.sprite(0,0,"sky");

            // this.panorama = new Panorama(this.game);
            // this.game.add.existing(this.panorama)

                // create and add a group to hold our pipeGroup prefabs
            // this.pipes = this.game.add.group();
            // this.pipeGenerator = undefined;

            // this.bird = new Bird(this.game, 100, this.game.height/2, 0);
            // this.game.add.existing(this.bird);

            // this.ground = new Ground(this.game, 0, 400, 335, 112);
            // this.game.add.existing(this.ground);

            // // add mouse/touch controls
            // this.game.input.onDown.addOnce(this.startGame, this);
            // this.game.input.onDown.add(this.bird.flap, this.bird);

            // this.score = 0;
            // this.scoreText = this.game.add.bitmapText(this.game.width/2, 10, "flappyfont", this.score.toString(), 24);

            // this.groundHitSound = this.game.add.audio("groundHit");
            // this.pipeHitSound = this.game.add.audio("pipeHit");
            // this.scoreSound = this.game.add.audio("score");

            // this.instructionsGroup = this.game.add.group();
            // this.instructionsGroup.add(this.game.add.sprite(this.game.width/2, 100, "getReady"));
            // this.instructionsGroup.add(this.game.add.sprite(this.game.width/2, 325, "instructions"));
            // this.instructionsGroup.setAll("anchor.x", 0.5);
            // this.instructionsGroup.setAll("anchor.y", 0.5);

            // this.gameover = false;
        }

        startGame() {
            // if(this.bird && !this.bird.alive && !this.gameover) {
            //     this.bird.body.allowGravity = true;
            //     this.bird.alive = true;
            //     // add a timer
            //     this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
            //     this.pipeGenerator.timer.start();

            //     if(this.instructionsGroup)
            //         this.instructionsGroup.destroy();
            // }
        }

        checkScore(pipeGroup: PipeGroup) {
            // if(this.bird && pipeGroup.exists && !pipeGroup.hasScored && pipeGroup.topPipe.world.x <= this.bird.world.x) {
            //     pipeGroup.hasScored = true;
            //     this.score++;
            //     if(this.scoreText)
            //         this.scoreText.setText(this.score.toString());
            //     if(this.scoreSound)
            //         this.scoreSound.play();
            // }
        }

        update() {
            // enable collisions between the bird and the ground
            // this.game.physics.arcade.collide(this.bird, this.ground, this.birdGroundCollisionHandler, undefined, this);

            // if(!this.gameover && this.pipes) {
            //     // enable collisions between the bird and each group in the pipes group
            //     this.pipes.forEach((pipeGroup : PipeGroup) => {
            //         this.checkScore(pipeGroup);
            //         this.game.physics.arcade.collide(this.bird, pipeGroup, this.birdPipeCollisionHandler, undefined, this);
            //     }, this);
            // }
        }

        birdGroundCollisionHandler(bird: Bird, ground: Ground) {
            // if(this.bird && !this.bird.onGround) {
            //     if(this.groundHitSound)
            //         this.groundHitSound.play();
            //     this.bird.onGround = true;

            //     this.scoreboard = new ScoreBoard(this.game);
            //     this.game.add.existing(this.scoreboard);
            //     this.scoreboard.show(this.score);
            // }
            // this.checkGameOver();
        }

        birdPipeCollisionHandler(bird : Bird, pipe: Pipe){
            // if(this.pipeHitSound)
            //     this.pipeHitSound.play();
            // this.checkGameOver();
        }

        checkGameOver() {
            // if(!this.gameover && this.bird && this.pipes && this.pipeGenerator && this.ground && this.panorama) {
            //     this.gameover = true;
            //     this.bird.kill();
            //     this.pipes.callAll("stop", null);
            //     this.pipeGenerator.timer.stop();
            //     this.ground.stopScroll();
            //     this.panorama.stop();
            // }
        }

        generatePipes() {
            // let pipeY = this.game.rnd.integerInRange(-100, 100);
            
            // if(this.pipes) {
            //     let pipeGroup = this.pipes.getFirstExists(false);
            //     if(!pipeGroup) {
            //         pipeGroup = new PipeGroup(this.game, this.pipes);
            //     }
            //     pipeGroup.reset(this.game.width, pipeY);
            // }
        }

        render() {
            //this.game.debug.body(this.bird);
        }
    }
}
