namespace FlappyBird {
    
    export class Panorama extends Phaser.Group {

        constructor(game: Phaser.Game) { 
            super(game);

            let clouds = this.game.add.tileSprite(0, 300, 352, 100, "clouds");
            clouds.autoScroll(-20, 0);
            this.add(clouds);

            let cityscape = this.game.add.tileSprite(0, 330, 300, 43, "cityscape");
            cityscape.autoScroll(-30, 0);
            this.add(cityscape);

            let trees = this.game.add.tileSprite(0, 360, 415, 144, "trees");
            trees.autoScroll(-60, 0);
            this.add(trees);
        }

        stop() {
            this.callAll("stopScroll", null);
        }
    }
}