bootState = {
  preload: function() {
    this.load.image('sky', 'assets/images/sky.png');
  },
  create: function() {
    this.state.start('preloader');
  }
}
