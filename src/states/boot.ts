namespace FlappyBird {

    export class BootScene extends Phaser.Scene {

        constructor() {
            super("boot");
        }

        preload() {
            this.load.image("preloader", "assets/preloader.gif");
        }

        create() {
            this.scene.start("preload");
        }
    }
}
