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
            _this.state.start("play");
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
    var PlayState = /** @class */ (function (_super) {
        __extends(PlayState, _super);
        function PlayState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PlayState.prototype.preload = function () {
            this.load.image("background", "assets/background.png");
            this.load.spritesheet("bird", "assets/bird.png", 34, 24, 3);
        };
        PlayState.prototype.create = function () {
            this.background = this.game.add.sprite(0, 0, "background");
            this.bird = this.game.add.sprite(100, this.game.height / 2, "bird", 0);
        };
        PlayState.prototype.update = function () {
        };
        return PlayState;
    }(Phaser.State));
    FlappyBird.PlayState = PlayState;
})(FlappyBird || (FlappyBird = {}));
