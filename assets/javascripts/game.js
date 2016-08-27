var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {});

game.state.add('levelOne', levelOneState);
game.state.add('win', winState);
game.state.add('lose', loseState);

game.state.start('levelOne');
