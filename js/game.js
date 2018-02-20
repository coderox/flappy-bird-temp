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
            return _super.call(this, 288, 505, Phaser.AUTO, "content", {
                preload: function () {
                },
                create: function () {
                    this.stage.backgroundColor = "#00FF00";
                },
                update: function () {
                }
            }) || this;
        }
        return Game;
    }(Phaser.Game));
    FlappyBird.Game = Game;
})(FlappyBird || (FlappyBird = {}));
window.onload = function () {
    var game = new FlappyBird.Game();
};
