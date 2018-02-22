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
            _this.flapSound = _this.game.add.audio('flap');
            _this.alive = false;
            _this.onGround = false;
            // enable physics on the bird
            // and disable gravity on the bird
            // until the game is started
            // also make sure the collisions are using circular body
            _this.game.physics.arcade.enableBody(_this);
            _this.body.allowGravity = false;
            _this.body.collideWorldBounds = true;
            _this.events.onKilled.add(_this.onKilled, _this);
            return _this;
        }
        Bird.prototype.flap = function () {
            if (this.alive) {
                this.onGround = false;
                this.flapSound.play();
                //cause our bird to "jump" upward
                this.body.velocity.y = -400;
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
            if (!this.alive) {
                this.body.velocity.x = 0;
            }
        };
        Bird.prototype.onKilled = function () {
            this.exists = true;
            this.visible = true;
            this.animations.stop();
            var duration = 90 / this.y * 300;
            this.game.add.tween(this).to({ angle: 90 }, duration).start();
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
            // enable physics on the ground sprite
            // this is needed for collision detection
            _this.game.physics.arcade.enableBody(_this);
            // we don't want the ground's body
            // to be affected by gravity or external forces
            _this.body.allowGravity = false;
            _this.body.immovable = true;
            return _this;
        }
        return Ground;
    }(Phaser.TileSprite));
    FlappyBird.Ground = Ground;
})(FlappyBird || (FlappyBird = {}));
var FlappyBird;
(function (FlappyBird) {
    var Pipe = /** @class */ (function (_super) {
        __extends(Pipe, _super);
        function Pipe(game, x, y, frame) {
            var _this = _super.call(this, game, x, y, "pipe", frame) || this;
            _this.anchor.setTo(0.5, 0.5);
            _this.game.physics.arcade.enableBody(_this);
            _this.body.allowGravity = false;
            _this.body.immovable = true;
            return _this;
        }
        return Pipe;
    }(Phaser.Sprite));
    FlappyBird.Pipe = Pipe;
})(FlappyBird || (FlappyBird = {}));
var FlappyBird;
(function (FlappyBird) {
    var PipeGroup = /** @class */ (function (_super) {
        __extends(PipeGroup, _super);
        function PipeGroup(game, parent) {
            var _this = _super.call(this, game, parent) || this;
            _this.topPipe = new FlappyBird.Pipe(_this.game, 0, 0, 0);
            _this.bottomPipe = new FlappyBird.Pipe(_this.game, 0, 440, 1);
            _this.add(_this.topPipe);
            _this.add(_this.bottomPipe);
            _this.setAll("body.velocity.x", -200);
            return _this;
        }
        PipeGroup.prototype.update = function () {
            if (!this.topPipe.inWorld) {
                this.exists = false;
            }
        };
        ;
        PipeGroup.prototype.reset = function (x, y) {
            this.topPipe.reset(0, 0);
            this.bottomPipe.reset(0, 440);
            this.x = x + 20;
            this.y = y;
            this.setAll("body.velocity.x", -200);
            this.exists = true;
        };
        ;
        PipeGroup.prototype.stop = function () {
            this.setAll("body.velocity.x", 0);
        };
        ;
        return PipeGroup;
    }(Phaser.Group));
    FlappyBird.PipeGroup = PipeGroup;
})(FlappyBird || (FlappyBird = {}));
var FlappyBird;
(function (FlappyBird) {
    var PlayState = /** @class */ (function (_super) {
        __extends(PlayState, _super);
        function PlayState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PlayState.prototype.create = function () {
            // start the phaser arcade physics engine
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            // give our world an initial gravity of 1200
            this.game.physics.arcade.gravity.y = 1200;
            this.background = this.game.add.sprite(0, 0, "background");
            // create and add a group to hold our pipeGroup prefabs
            this.pipes = this.game.add.group();
            this.pipeGenerator = null;
            this.bird = new FlappyBird.Bird(this.game, 100, this.game.height / 2, 0);
            this.game.add.existing(this.bird);
            this.ground = new FlappyBird.Ground(this.game, 0, 400, 335, 112);
            this.game.add.existing(this.ground);
            // add mouse/touch controls
            this.game.input.onDown.addOnce(this.startGame, this);
            this.game.input.onDown.add(this.bird.flap, this.bird);
            this.groundHitSound = this.game.add.audio('groundHit');
            this.pipeHitSound = this.game.add.audio('pipeHit');
        };
        PlayState.prototype.startGame = function () {
            if (!this.bird.alive && !this.gameover) {
                this.bird.body.allowGravity = true;
                this.bird.alive = true;
                // add a timer
                this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
                this.pipeGenerator.timer.start();
            }
        };
        PlayState.prototype.update = function () {
            // enable collisions between the bird and the ground
            this.game.physics.arcade.collide(this.bird, this.ground, this.deathHandler, null, this);
            if (!this.gameover) {
                // enable collisions between the bird and each group in the pipes group
                this.pipes.forEach(function (pipeGroup) {
                    this.game.physics.arcade.collide(this.bird, pipeGroup, this.deathHandler, null, this);
                }, this);
            }
        };
        PlayState.prototype.deathHandler = function (bird, enemy) {
            if (enemy instanceof FlappyBird.Ground && !this.bird.onGround) {
                this.groundHitSound.play();
                this.bird.onGround = true;
            }
            else if (enemy instanceof FlappyBird.Pipe) {
                this.pipeHitSound.play();
            }
            if (!this.gameover) {
                this.gameover = true;
                this.bird.kill();
                this.pipes.callAll("stop", null);
                this.pipeGenerator.timer.stop();
                this.ground.stopScroll();
            }
        };
        PlayState.prototype.generatePipes = function () {
            var pipeY = this.game.rnd.integerInRange(-100, 100);
            var pipeGroup = this.pipes.getFirstExists(false);
            if (!pipeGroup) {
                pipeGroup = new FlappyBird.PipeGroup(this.game, this.pipes);
            }
            pipeGroup.reset(this.game.width, pipeY);
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
