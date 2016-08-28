preloaderState = {
  preload: function() {
    sky = this.add.sprite(0, 0, 'sky');
    sky.fixedToCamera = true;

    this.load.tilemap('map', 'assets/images/test_map.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('whiteBrick', 'assets/images/Witebrick.png');
    this.load.image('player', 'assets/images/player_block.png');
    this.load.image('goldenSkull', 'assets/images/golden_skull.png');
    this.load.image('spikes', 'assets/images/spikes_new.png');
    this.load.image('keys', 'assets/images/keys.png');
    this.load.image('blueKey', 'assets/images/blue_key.png');
    this.load.image('redKey', 'assets/images/red_key.png');
    this.load.image('redKeyHole', 'assets/images/red_keyhole.png');
    this.load.image('blueKeyHole', 'assets/images/blue_keyhole.png');
    this.load.image('enemy', 'assets/images/test_orange.png');
    this.load.image('purple', 'assets/images/test_purple.png');
    this.load.image('vase', 'assets/images/push_vase.png');
    game.load.atlasJSONHash('flags', 'assets/images/flag.png', 'assets/images/flag.json');
    this.load.bitmapFont('nokia', 'assets/fonts/nokia.png', 'assets/fonts/nokia.xml');
  },
  create: function() {
    this.state.start('levelOne');
  }
}
