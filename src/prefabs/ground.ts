namespace FlappyBird {

    export class Ground extends Phaser.TileSprite {
        
        constructor(game: Phaser.Game, x: number, y: number, width: number, height: number) {
            super(game, x, y, width, height, "ground");

            // start scrolling our ground
            this.autoScroll(-200,0);
        }
    }
}