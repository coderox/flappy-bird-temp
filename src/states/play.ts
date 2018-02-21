namespace FlappyBird {
    
    export class PlayState extends Phaser.State {

        background: Phaser.Sprite;
        bird: Phaser.Sprite;
        ground: Phaser.TileSprite;

        create() {
            this.background = this.game.add.sprite(0,0,"background");
            
            this.bird = this.game.add.sprite(100, this.game.height/2, "bird", 0);
            
            this.bird.animations.add("flap");
            this.bird.animations.play("flap", 12, true);
          
            this.ground = this.game.add.tileSprite(0, 400, 335, 112, "ground");
            this.ground.autoScroll(-200, 0);
        }

        update() {

        }
    }
}