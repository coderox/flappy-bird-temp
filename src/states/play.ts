namespace FlappyBird {
    
    export class PlayState extends Phaser.State {

        background: Phaser.Sprite;
        bird: Bird;
        ground: Ground;

        create() {
            this.background = this.game.add.sprite(0,0,"background");
            
            this.bird = new Bird(this.game, 100, this.game.height/2, 0);
            this.game.add.existing(this.bird);
          
            this.ground = new Ground(this.game, 0, 400, 335, 112);
            this.game.add.existing(this.ground);

            // add mouse/touch controls
            this.game.input.onDown.add(this.bird.flap, this.bird);            
        }

        update() {

        }
    }
}