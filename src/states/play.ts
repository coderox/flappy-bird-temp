namespace FlappyBird {
    
    export class PlayState extends Phaser.State {

        background: Phaser.Sprite;
        bird: Phaser.Sprite;

        preload() {
            this.load.image("background", "assets/background.png");
            this.load.spritesheet("bird", "assets/bird.png", 34, 24, 3);            
        }

        create() {
            this.background = this.game.add.sprite(0,0,"background");
            this.bird = this.game.add.sprite(100, this.game.height/2, "bird", 0);
        }

        update() {

        }
    }
}