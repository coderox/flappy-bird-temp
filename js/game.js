var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path="../phaser-ce/typescript/phaser.d.ts"/>
var FlappyBird;
(function (FlappyBird) {
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this, 288, 505, Phaser.AUTO, "content", null) || this;
            _this.state.add("play", FlappyBird.PlayState, false);
            _this.state.add("preload", FlappyBird.PreloadState, false);
            _this.state.start("preload");
            return _this;
        }
        return Game;
    }(Phaser.Game));
    FlappyBird.Game = Game;
})(FlappyBird || (FlappyBird = {}));
window.onload = function () {
    var game = new FlappyBird.Game();
};
var FlappyBird;
(function (FlappyBird) {
    var Bird = /** @class */ (function (_super) {
        __extends(Bird, _super);
        function Bird(game, x, y, frame) {
            var _this = _super.call(this, game, x, y, "bird", frame) || this;
            _this.anchor.setTo(0.5, 0.5);
            _this.animations.add("flap");
            _this.animations.play("flap", 12, true);
            return _this;
        }
        Bird.prototype.flap = function () {
            if (this.alive) {
                // rotate the bird to -40 degrees
                this.game.add.tween(this).to({ angle: -40 }, 100).start();
            }
        };
        Bird.prototype.update = function () {
            // check to see if our angle is less than 90
            // if it is rotate the bird towards the ground by 2.5 degrees
            if (this.angle < 90 && this.alive) {
                this.angle += 2.5;
            }
        };
        return Bird;
    }(Phaser.Sprite));
    FlappyBird.Bird = Bird;
})(FlappyBird || (FlappyBird = {}));
var FlappyBird;
(function (FlappyBird) {
    var Ground = /** @class */ (function (_super) {
        __extends(Ground, _super);
        function Ground(game, x, y, width, height) {
            var _this = _super.call(this, game, x, y, width, height, "ground") || this;
            // start scrolling our ground
            _this.autoScroll(-200, 0);
            return _this;
        }
        return Ground;
    }(Phaser.TileSprite));
    FlappyBird.Ground = Ground;
})(FlappyBird || (FlappyBird = {}));
var FlappyBird;
(function (FlappyBird) {
    var PlayState = /** @class */ (function (_super) {
        __extends(PlayState, _super);
        function PlayState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PlayState.prototype.create = function () {
            this.background = this.game.add.sprite(0, 0, "background");
            this.bird = new FlappyBird.Bird(this.game, 100, this.game.height / 2, 0);
            this.game.add.existing(this.bird);
            this.ground = new FlappyBird.Ground(this.game, 0, 400, 335, 112);
            this.game.add.existing(this.ground);
            // add mouse/touch controls
            this.game.input.onDown.add(this.bird.flap, this.bird);
        };
        PlayState.prototype.update = function () {
        };
        return PlayState;
    }(Phaser.State));
    FlappyBird.PlayState = PlayState;
})(FlappyBird || (FlappyBird = {}));
var FlappyBird;
(function (FlappyBird) {
    var PreloadState = /** @class */ (function (_super) {
        __extends(PreloadState, _super);
        function PreloadState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PreloadState.prototype.preload = function () {
            this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
            // images
            this.load.image("background", "assets/background.png");
            this.load.image("ground", "assets/ground.png");
            this.load.image("title", "assets/title.png");
            this.load.image("startButton", "assets/start-button.png");
            this.load.image("instructions", "assets/instructions.png");
            this.load.image("getReady", "assets/get-ready.png");
            this.load.image("scoreboard", "assets/scoreboard.png");
            this.load.image("gameover", "assets/gameover.png");
            this.load.image("particle", "assets/particle.png");
            // sprite sheets
            this.load.spritesheet("medals", "assets/medals.png", 44, 46, 2);
            this.load.spritesheet("bird", "assets/bird.png", 34, 24, 3);
            this.load.spritesheet("pipe", "assets/pipes.png", 54, 320, 2);
            // sound effects
            this.load.audio("flap", "assets/flap.wav");
            this.load.audio("pipeHit", "assets/pipe-hit.wav");
            this.load.audio("groundHit", "assets/ground-hit.wav");
            this.load.audio("score", "assets/score.wav");
            this.load.audio("ouch", "assets/ouch.wav");
            // fonts
            this.load.bitmapFont("flappyfont", "assets/fonts/flappyfont/flappyfont.png", "assets/fonts/flappyfont/flappyfont.fnt");
        };
        PreloadState.prototype.update = function () {
            if (this.ready) {
                this.game.state.start("play");
            }
        };
        PreloadState.prototype.onLoadComplete = function () {
            this.ready = true;
        };
        return PreloadState;
    }(Phaser.State));
    FlappyBird.PreloadState = PreloadState;
})(FlappyBird || (FlappyBird = {}));
