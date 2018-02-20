var game = new Phaser.Game(288, 505, Phaser.AUTO, 'content', { 
    preload: preload, 
    create: create, 
    update: update 
});

function preload() {
}

function create() {
    game.stage.backgroundColor  = "#FF0000";
}

function update() {
}