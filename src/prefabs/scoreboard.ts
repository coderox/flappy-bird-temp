namespace FlappyBird {

    export class ScoreBoard extends Phaser.GameObjects.Container {

        scoreText: Phaser.GameObjects.BitmapText;
        bestText: Phaser.GameObjects.BitmapText;
        //startButton: Phaser.GameObjects.Button;
        scoreboard: Phaser.GameObjects.Image;

        constructor(scene: Phaser.Scene) {
            super(scene,0, scene.sys.canvas.height);

            let gameover = scene.add.image(this.scene.sys.canvas.width / 2, 100, "gameover");
            this.add(gameover);

            //gameover.anchor.setTo(0.5, 0.5);
            this.scoreboard = scene.add.image(this.scene.sys.canvas.width / 2, 200, "scoreboard");
            this.add(this.scoreboard);
            // this.scoreboard.anchor.setTo(0.5, 0.5);

            this.scoreText = scene.add.bitmapText(this.scoreboard.width, 180, "flappyfont", "", 18);
            this.add(this.scoreText);

            this.bestText = scene.add.bitmapText(this.scoreboard.width, 230, "flappyfont", "", 18);
            this.add(this.bestText);

            let startButton = scene.add.image(this.scene.sys.canvas.width/2, 300, "startButton")
            startButton.setInteractive();
            startButton.on("pointerup", this.startClick, this);
            this.add(startButton);
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

            if(score >= 10) {
                coin = this.scene.add.sprite(this.scoreboard.x - 65, this.scoreboard.y + 7, "medals", score >= 20 ? 1 : 0);
                this.add(coin);
            }

            this.scene.tweens.add({ 
                targets: this,
                y: 0, 
                duration: 1000,
                ease: "bounce"
            });
        }

        startClick() {
            this.scene.scene.start("play");
        }
    }
}
