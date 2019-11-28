namespace FlappyBird {
    
    export class Panorama extends Phaser.GameObjects.Group {

        constructor(scene: Phaser.Scene) { 
            super(scene);

            let clouds = this.scene.add.tileSprite(0, 300, 352, 100, "clouds");
            clouds.scrollFactorX = -20;
            this.add(clouds);

            let cityscape = this.scene.add.tileSprite(0, 330, 300, 43, "cityscape");
            cityscape.scrollFactorX = -30;
            this.add(cityscape);

            let trees = this.scene.add.tileSprite(0, 360, 415, 144, "trees");
            trees.scrollFactorX = -60;
            this.add(trees);
        }

        stop() {
            //this.callAll("stopScroll", null);
        }
    }
}