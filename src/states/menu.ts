namespace FlappyBird {

    export class MenuScene extends Phaser.Scene {
        ground: Ground | undefined;
        panorama: Panorama | undefined;

        constructor() {
            super({key:"menu"});
        }

        create() {
            this.add.image(0, 0, "sky").setOrigin(0,0);

            this.panorama = new Panorama(this);
            this.add.group(this.panorama);
            
            this.ground = new Ground(this,0, 400, 335, 112)
                .setOrigin(0,0);
            this.add.existing(this.ground);

            let titleGroup = this.add.container(30,100);

            let title = this.add.sprite(0, 0, "title")
                .setOrigin(0,0);
            titleGroup.add(title);

            let bird = this.add.sprite(200, 5, "bird")
                .setOrigin(0,0);
            titleGroup.add(bird);

            this.anims.create({
                key: "flap", 
                frames: this.anims.generateFrameNames("bird"),
                frameRate: 12,
                repeat: -1});
            bird.anims.play("flap");

            this.tweens.add({ 
                targets: titleGroup,
                y: 115, 
                duration: 350,
                ease: "Linear",
                yoyo: true,
                loop: -1});

            let startButton = this.add.image(this.sys.canvas.width/2, 300, "startButton")
            startButton.setInteractive();
            startButton.on("pointerup", this.startClick, this);
        }

        update() {
            this.panorama!.update();
            this.ground!.update();
        }

        startClick() {
            this.scene.start("play");
        }
    }
}