loseState = {
  preload: function() {
    this.load.image('lose_screen', 'assets/images/lose.png');
  },
  create: function() {
    this.add.sprite(0, 0, 'lose_screen');
    spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },
  update: function() {
    if (spacebar.isDown) {
      game.state.start('levelOne');
    }
  }
}
