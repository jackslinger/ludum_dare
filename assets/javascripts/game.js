var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser', {});

game.state.add('levelOne', levelOneState);
game.state.add('win', winState);
game.state.add('lose', loseState);
game.state.add('boot', bootState);
game.state.add('preloader', preloaderState);

game.state.start('boot');
