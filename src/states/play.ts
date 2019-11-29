
namespace FlappyBird {

    export class PlayScene extends Phaser.Scene {

        bird: Bird | undefined;
        ground: Ground | undefined;
        panorama: Panorama | undefined;
        scoreboard: ScoreBoard | undefined;

        background: Phaser.GameObjects.Sprite | undefined;
        pipes: Phaser.GameObjects.Group | undefined;
        instructions: Phaser.GameObjects.Container | undefined;

        pipeGenerator: Phaser.Time.TimerEvent | undefined;

        // groundHitSound: Phaser.Sound | undefined;
        // pipeHitSound: Phaser.Sound | undefined;
        // scoreSound: Phaser.Sound | undefined;

        scoreText: Phaser.GameObjects.BitmapText | undefined;

        gameover: boolean = false;
        score: number = 0;
        pipeGeneratorConfig: Phaser.Types.Time.TimerEventConfig = {
            loop: true,
            callback: this.generatePipes,
            callbackScope:  this,
            delay: 1500
        };

        constructor() {
            super({key:"play"});
        }

        create() {
            // start the phaser arcade physics engine
            // this.game.physics.startSystem(Phaser.Physics.ARCADE);

            // give our world an initial gravity of 1200
            // this.game.physics.arcade.gravity.y = 1200;
            this.physics.world.setBounds(0, 0, this.sys.canvas.width, this.sys.canvas.height);

            this.background = this.add.sprite(0, 0, "sky")
                .setOrigin(0, 0);

            this.panorama = new Panorama(this);
            this.add.group(this.panorama)

            // create and add a group to hold our pipeGroup prefabs
            this.pipes = this.add.group();
                        
            this.bird = new Bird(this, 100, this.sys.canvas.height/2, 0);
            this.add.existing(this.bird);

            this.ground = new Ground(this, 0, 400, 335, 112).setOrigin(0,0);
            this.add.existing(this.ground);

            // add mouse/touch controls
            this.input.on("pointerdown", this.inputHandler, this);

            this.score = 0;
            this.scoreText = this.add.bitmapText(this.sys.canvas.width/2, 10, "flappyfont", this.score.toString(), 24);

            // this.groundHitSound = this.game.add.audio("groundHit");
            // this.pipeHitSound = this.game.add.audio("pipeHit");
            // this.scoreSound = this.game.add.audio("score");

            this.instructions = this.add.container(0,0);
            this.instructions.add(this.add.image(this.sys.canvas.width/2, 100, "getReady"));
            this.instructions.add(this.add.image(this.sys.canvas.width/2, 325, "instructions"));

            this.gameover = false;
        }

        inputHandler() {
            if(this.bird) {
                if(!this.bird.alive && !this.gameover) {
                    this.bird.setAlive(true);
                    this.pipeGenerator = this.time.delayedCall(
                        1000,
                        this.generatePipes,
                        [],
                        this
                    );
                    this.pipeGenerator.reset(this.pipeGeneratorConfig);
                
                    if(this.instructions) {
                        this.instructions.destroy();
                    }   
                }
                this.bird.flap();
            }
        }

        checkScore(pipeGroup: PipeGroup) {
            if(this.bird && pipeGroup.exists && !pipeGroup.hasScored 
                && pipeGroup.x <= this.bird.x) {
                pipeGroup.hasScored = true;
                this.score++;
                if(this.scoreText) {
                    this.scoreText.setText(this.score.toString());
                }
                // if(this.scoreSound)
                //     this.scoreSound.play();
            }
        }

        update() {
            this.panorama!.update();
            // enable collisions between the bird and the ground
            if(this.bird && this.ground) {
                this.ground.update();
                this.bird.update();
                this.physics.add.collider(this.bird, this.ground, this.collisionHandler, undefined, this);
            }
            
            if(!this.gameover && this.pipes && this.bird) {
                // enable collisions between the bird and each group in the pipes group
                this.pipes.getChildren().forEach(pipeGroup => {
                    if(pipeGroup instanceof PipeGroup && this.bird) {
                        pipeGroup.update();
                        this.checkScore(pipeGroup);                        
                        this.physics.add.collider(this.bird, pipeGroup.getAll(), this.collisionHandler, undefined, this);    
                    }
                }, this);
            }
        }

        collisionHandler(object1: Phaser.GameObjects.GameObject, object2: Phaser.GameObjects.GameObject) {
            if(object1 instanceof Bird) {
                if(object2 instanceof Ground) {
                    this.birdGroundCollisionHandler(object1, object2);
                } else if(object2 instanceof Pipe) {
                    this.birdPipeCollisionHandler(object1, object2);
                }
            }
        }

        birdGroundCollisionHandler(bird: Bird, ground: Ground) {
            if(this.bird && !this.bird.onGround) {
                // if(this.groundHitSound)
                //     this.groundHitSound.play();
                this.bird.onGround = true;

                this.scoreboard = new ScoreBoard(this);
                this.add.existing(this.scoreboard);
                this.scoreboard.show(this.score);
            }
            this.checkGameOver();
        }

        birdPipeCollisionHandler(bird: Bird, pipe: Pipe) {
            // if(this.pipeHitSound)
            //     this.pipeHitSound.play();
            this.checkGameOver();
        }

        checkGameOver() {
            if(!this.gameover && this.bird && this.pipes && this.pipeGenerator 
                && this.ground && this.panorama) {
                this.gameover = true;
                this.bird.stop();
                this.pipes.getChildren().forEach(pipeGroup => {
                    if(pipeGroup instanceof PipeGroup) {
                        pipeGroup.stop();
                    }
                }, this);
                this.pipeGenerator.reset({});
                this.ground.active = false;
                this.panorama.active = false;
            }
        }

        generatePipes() {
            let pipeY = Phaser.Math.RND.integerInRange(-100, 100);

            if(this.pipes) {
                let pipeGroup = this.pipes.getFirstDead();
                if(!pipeGroup) {
                    pipeGroup = new PipeGroup(this, this.pipes);
                }
                pipeGroup.reset(this.sys.canvas.width, pipeY);
            }

            if(this.ground && this.bird && this.scoreText) {
                this.children.bringToTop(this.ground);
                this.children.bringToTop(this.bird);
                this.children.bringToTop(this.scoreText);
            }
        }
    }
}
