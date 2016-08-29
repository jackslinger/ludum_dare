bootState = {
  preload: function() {
    this.load.image('sky', 'assets/images/sky_graphic.png');
  },
  create: function() {
    this.state.start('preloader');
  }
}
