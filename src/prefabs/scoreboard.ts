namespace FlappyBird {

    export class ScoreBoard extends Phaser.GameObjects.Container {

        scoreText: Phaser.GameObjects.BitmapText;
        bestText: Phaser.GameObjects.BitmapText;
        //startButton: Phaser.GameObjects.Button;
        scoreboard: Phaser.GameObjects.Image;

        constructor(scene: Phaser.Scene) {
            super(scene,0, scene.sys.canvas.height);

            let gameover = this.scene.add.image(this.scene.sys.canvas.width / 2, 100, "gameover");
            //gameover.anchor.setTo(0.5, 0.5);

            this.scoreboard = this.scene.add.image(this.scene.sys.canvas.width / 2, 200, "scoreboard");
            // this.scoreboard.anchor.setTo(0.5, 0.5);

            this.scoreText = this.scene.add.bitmapText(this.scoreboard.width, 180, "flappyfont", "", 18);
            //this.add(this.scoreText);

            this.bestText = this.scene.add.bitmapText(this.scoreboard.width, 230, "flappyfont", "", 18);
            // this.add(this.bestText);

            let startButton = this.scene.add.image(this.scene.sys.canvas.width/2, 300, "startButton")
            startButton.setInteractive();
            startButton.on("pointerup", this.startClick, this);
        }

        show(score: number) {
            let coin: Phaser.GameObjects.Sprite | undefined;
            let bestScore: number = 0;
            this.scoreText.setText(score.toString());
            if(localStorage) {
                let existingScore = localStorage.getItem("bestScore");
                if(existingScore) {
                    bestScore = parseInt(existingScore);
                }
                if(!bestScore || bestScore < score) {
                    bestScore = score;
                    localStorage.setItem("bestScore", bestScore.toString());
                }
            }

            this.bestText.setText(bestScore.toString());

            if(score >= 10 && score < 20) {
                coin = this.scene.add.sprite(-65 , 7, "medals", 1);
            } else if(score >= 20) {
                coin = this.scene.add.sprite(-65 , 7, "medals", 0);
            }

            //this.scene.add.tween(this).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);
            this.scene.tweens.add({ 
                targets: this,
                y: 0, 
                duration: 1000,
                ease: "bounce"
            });

            if (coin) {
                coin.setOrigin(0.5, 0.5);
                // if(this.scoreboard){
                //     this.scoreboard.addChild(coin);
                // }
            }
        }

        startClick() {
            this.scene.scene.start("play");
        }
    }
}
