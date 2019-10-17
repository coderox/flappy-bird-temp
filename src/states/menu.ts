namespace FlappyBird {

    export class MenuState extends Phaser.State {

        create() {
            this.game.add.sprite(0, 0, "sky");

            let panorama = new Panorama(this.game);
            this.add.existing(panorama);
            
            let ground = this.game.add.tileSprite(0, 400, 335, 112, "ground");
            ground.autoScroll(-200, 0);

            let titleGroup = this.game.add.group()

            let title = this.add.sprite(0, 0, "title");
            titleGroup.add(title);

            let bird = this.add.sprite(200, 5, "bird");
            titleGroup.add(bird);

            bird.animations.add("flap");
            bird.animations.play("flap", 12, true);

            titleGroup.x = 30;
            titleGroup.y = 100;

            this.game.add.tween(titleGroup).to({y:115}, 350, Phaser.Easing.Linear.None, true, 0, 1000, true);

            let startButton = this.game.add.button(this.game.width/2, 300, "startButton", this.startClick, this);
            startButton.anchor.setTo(0.5, 0.5);
        }

        startClick() {
            this.game.state.start("play");
        }
    }
}