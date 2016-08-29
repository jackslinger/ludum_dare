bootState = {
  preload: function() {
    this.load.image('loading', 'assets/images/loading.png');
  },
  create: function() {
    this.state.start('preloader');
  }
}
