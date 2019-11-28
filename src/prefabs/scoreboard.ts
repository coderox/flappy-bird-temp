namespace FlappyBird {

    export class ScoreBoard extends Phaser.GameObjects.Group {

        scoreText: Phaser.GameObjects.BitmapText | undefined;
        bestText: Phaser.GameObjects.BitmapText | undefined;
        //startButton: Phaser.GameObjects.Button;
        scoreboard: Phaser.GameObjects.Sprite | undefined;

        constructor(scene: Phaser.Scene) {
            super(scene);

            // var gameover = this.create(this.game.width / 2, 100, "gameover");
            // gameover.anchor.setTo(0.5, 0.5);

            // this.scoreboard = this.create(this.game.width / 2, 200, "scoreboard");
            // this.scoreboard.anchor.setTo(0.5, 0.5);

            // this.scoreText = this.game.add.bitmapText(this.scoreboard.width, 180, "flappyfont", "", 18);
            // this.add(this.scoreText);

            // this.bestText = this.game.add.bitmapText(this.scoreboard.width, 230, "flappyfont", "", 18);
            // this.add(this.bestText);

            // // add our start button with a callback
            // this.startButton = this.game.add.button(this.game.width/2, 300, "startButton", this.startClick, this);
            // this.startButton.anchor.setTo(0.5,0.5);

            // this.add(this.startButton);

            // this.y = this.game.height;
            // this.x = 0;
        }

        show(score: number) {
            let coin: Phaser.GameObjects.Sprite | undefined;
            let bestScore: number = 0;
            //this.scoreText.setText(score.toString());
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

            // this.bestText.setText(bestScore.toString());

            if(score >= 10 && score < 20) {
                coin = this.scene.add.sprite(-65 , 7, "medals", 1);
            } else if(score >= 20) {
                coin = this.scene.add.sprite(-65 , 7, "medals", 0);
            }

            //this.scene.add.tween(this).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);

            if (coin) {
                coin.setOrigin(0.5, 0.5);
                if(this.scoreboard){
                    //this.scoreboard.addChild(coin);
                }
            }
        }

        startClick() {
            //this.game.state.start("play");
        }
    }
}
