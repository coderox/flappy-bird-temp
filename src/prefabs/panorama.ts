namespace FlappyBird {
    
    export class Panorama extends Phaser.GameObjects.Group {
        clouds: Phaser.GameObjects.TileSprite;
        cityscape: Phaser.GameObjects.TileSprite;
        trees: Phaser.GameObjects.TileSprite;

        constructor(scene: Phaser.Scene) { 
            super(scene);

            this.clouds = this.scene.add.tileSprite(0, 300, 352, 100, "clouds").setOrigin(0,0); 
            this.cityscape = this.scene.add.tileSprite(0, 330, 300, 43, "cityscape").setOrigin(0,0);
            this.trees = this.scene.add.tileSprite(0, 360, 415, 144, "trees").setOrigin(0,0);
        }

        update() {
            if(this.active){
                this.clouds.tilePositionX += 0.25;
                this.cityscape.tilePositionX += 0.75;
                this.trees.tilePositionX += 1.0;            
            }
        }
    }
}