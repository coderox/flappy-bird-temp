namespace FlappyBird {

    export class PreloadState extends Phaser.State {

        ready: Boolean = false;

        preload() {
            var preloadBar = this.add.sprite(this.stage.width/2,this.stage.height/2, "preloader");
            preloadBar.anchor.setTo(0.5, 0.5);

            this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
            this.load.setPreloadSprite(preloadBar);

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
            this.load.spritesheet("medals", "assets/medals.png",44, 46, 2);
            this.load.spritesheet("bird", "assets/bird.png", 34,24,3);
            this.load.spritesheet("pipe", "assets/pipes.png", 54,320,2);

            // sound effects
            this.load.audio("flap", "assets/flap.wav");
            this.load.audio("pipeHit", "assets/pipe-hit.wav");
            this.load.audio("groundHit", "assets/ground-hit.wav");
            this.load.audio("score", "assets/score.wav");
            this.load.audio("ouch", "assets/ouch.wav");
        
            // fonts
            this.load.bitmapFont("flappyfont", "assets/fonts/flappyfont/flappyfont.png", "assets/fonts/flappyfont/flappyfont.fnt");
        }

        update() {
            if(this.ready) {
                this.game.state.start("menu");
            }
        }
        
        onLoadComplete() {
            this.ready = true;
        }
    }
}