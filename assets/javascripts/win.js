winState = {
  preload: function() {
    this.load.image('win_screen', 'assets/images/win.png');
  },
  create: function() {
    this.add.sprite(0, 0, 'win_screen');
    spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },
  update: function() {
    if (spacebar.isDown) {
      game.state.start('levelOne');
    }
  }
}
