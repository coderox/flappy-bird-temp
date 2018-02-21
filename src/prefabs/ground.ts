namespace FlappyBird {

    export class Ground extends Phaser.TileSprite {
        
        constructor(game: Phaser.Game, x: number, y: number, width: number, height: number) {
            super(game, x, y, width, height, "ground");

            // start scrolling our ground
            this.autoScroll(-200,0);

            // enable physics on the ground sprite
            // this is needed for collision detection
            this.game.physics.arcade.enableBody(this);

            // we don't want the ground's body
            // to be affected by gravity or external forces
            this.body.allowGravity = false;
            this.body.immovable = true;
        }
    }
}