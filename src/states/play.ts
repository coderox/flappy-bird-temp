namespace FlappyBird {

    export class PlayState extends Phaser.State {

        bird: Bird;
        ground: Ground;
        scoreboard: ScoreBoard;

        background: Phaser.Sprite;
        pipes: Phaser.Group;
        instructionsGroup: Phaser.Group;

        pipeGenerator: Phaser.TimerEvent;

        groundHitSound: Phaser.Sound;
        pipeHitSound: Phaser.Sound;
        scoreSound: Phaser.Sound;

        scoreText: Phaser.BitmapText;

        gameover: boolean;
        score: number;

        create() {
            // start the phaser arcade physics engine
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            // give our world an initial gravity of 1200
            this.game.physics.arcade.gravity.y = 1200;

            this.background = this.game.add.sprite(0,0,"background");

            // create and add a group to hold our pipeGroup prefabs
            this.pipes = this.game.add.group();
            this.pipeGenerator = null;

            this.bird = new Bird(this.game, 100, this.game.height/2, 0);
            this.game.add.existing(this.bird);

            this.ground = new Ground(this.game, 0, 400, 335, 112);
            this.game.add.existing(this.ground);

            // add mouse/touch controls
            this.game.input.onDown.addOnce(this.startGame, this);
            this.game.input.onDown.add(this.bird.flap, this.bird);

            this.score = 0;
            this.scoreText = this.game.add.bitmapText(this.game.width/2, 10, "flappyfont", this.score.toString(), 24);

            this.groundHitSound = this.game.add.audio("groundHit");
            this.pipeHitSound = this.game.add.audio("pipeHit");
            this.scoreSound = this.game.add.audio("score");

            this.instructionsGroup = this.game.add.group();
            this.instructionsGroup.add(this.game.add.sprite(this.game.width/2, 100, "getReady"));
            this.instructionsGroup.add(this.game.add.sprite(this.game.width/2, 325, "instructions"));
            this.instructionsGroup.setAll("anchor.x", 0.5);
            this.instructionsGroup.setAll("anchor.y", 0.5);

            this.gameover = false;
        }

        startGame() {
            if(!this.bird.alive && !this.gameover) {
                this.bird.body.allowGravity = true;
                this.bird.alive = true;
                // add a timer
                this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
                this.pipeGenerator.timer.start();

                this.instructionsGroup.destroy();
            }
        }

        checkScore(pipeGroup: PipeGroup) {
            if(pipeGroup.exists && !pipeGroup.hasScored && pipeGroup.topPipe.world.x <= this.bird.world.x) {
                pipeGroup.hasScored = true;
                this.score++;
                this.scoreText.setText(this.score.toString());
                this.scoreSound.play();
            }
        }

        update() {
            // enable collisions between the bird and the ground
            this.game.physics.arcade.collide(this.bird, this.ground, this.deathHandler, null, this);

            if(!this.gameover) {
                // enable collisions between the bird and each group in the pipes group
                this.pipes.forEach(function(pipeGroup) {
                    this.checkScore(pipeGroup);
                    this.game.physics.arcade.collide(this.bird, pipeGroup, this.deathHandler, null, this);
                }, this);
            }
        }

        deathHandler(bird: Bird, enemy: Phaser.Sprite) {
            if(enemy instanceof Ground && !this.bird.onGround) {
                this.groundHitSound.play();
                this.bird.onGround = true;

                this.scoreboard = new ScoreBoard(this.game);
                this.game.add.existing(this.scoreboard);
                this.scoreboard.show(this.score);

            } else if (enemy instanceof Pipe){
                this.pipeHitSound.play();
            }

            if(!this.gameover) {
                this.gameover = true;
                this.bird.kill();
                this.pipes.callAll("stop", null);
                this.pipeGenerator.timer.stop();
                this.ground.stopScroll();
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

        render() {
            //this.game.debug.body(this.bird);
        }
    }
}
