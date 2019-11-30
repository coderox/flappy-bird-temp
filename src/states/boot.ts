namespace FlappyBird {

    export class BootScene extends Phaser.Scene {

        constructor() {
            super({ key: "boot", active: true });
        }

        preload() {
            // let preloadBar = this.add.sprite(this.scene.scene.scale.width/2,this.scene.scene.scale.height/2, "preloader");
            // preloadBar.setOrigin(0.5, 0.5);

            this.load.on("complete", this.onLoadComplete, this);
            //this.load.image("preloader");

            // images
            this.load.image("sky", "assets/sky.png");
            this.load.image("ground", "assets/ground.png");
            this.load.image("title", "assets/title.png");
            this.load.image("startButton", "assets/start-button.png");
            this.load.image("instructions", "assets/instructions.png");
            this.load.image("getReady", "assets/get-ready.png");
            this.load.image("scoreboard", "assets/scoreboard.png");
            this.load.image("gameover", "assets/gameover.png");
            this.load.image("particle", "assets/particle.png");
            this.load.image("trees", "assets/trees.png");
            this.load.image("clouds", "assets/clouds.png");
            this.load.image("cityscape", "assets/cityscape.png");
            
            // sprite sheets
            this.load.spritesheet("medals", "assets/medals.png", { frameWidth: 44, frameHeight: 46 });
            this.load.spritesheet("bird", "assets/bird.png", { frameWidth: 34, frameHeight: 24 });
            this.load.spritesheet("pipe", "assets/pipes.png",{ frameWidth: 54, frameHeight: 320 });

            // sound effects
            this.load.audio("flap", "assets/flap.wav");
            this.load.audio("pipeHit", "assets/pipe-hit.wav");
            this.load.audio("groundHit", "assets/ground-hit.wav");
            this.load.audio("score", "assets/score.wav");
            this.load.audio("ouch", "assets/ouch.wav");

            // fonts
            this.load.bitmapFont("flappyfont", "assets/fonts/flappyfont/flappyfont.png", "assets/fonts/flappyfont/flappyfont.fnt");
        }

        onLoadComplete() {
            this.scene.start("menu");
        }
    }
}