preloaderState = {
  preload: function() {
    this.add.sprite(0, 0, 'loading');

    this.load.tilemap('map', 'assets/images/levelOne.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.atlasJSONHash('tiles', 'assets/images/blocks.png', 'assets/images/blocks.json');
    this.load.atlasJSONHash('backgroundTiles', 'assets/images/background_tiles.png', 'assets/images/background_tiles.json');
    this.load.image('sky', 'assets/images/sky_graphic.png');
    this.load.image('goldenSkull', 'assets/images/golden_skull.png');
    this.load.image('spikes', 'assets/images/spikes_new.png');
    this.load.atlasJSONHash('keys', 'assets/images/keys.png', 'assets/images/keys.json');
    this.load.image('enemy', 'assets/images/enemy.png');
    this.load.atlasJSONHash('pushable', 'assets/images/pushable.png', 'assets/images/pushable.json');
    this.load.atlasJSONHash('player', 'assets/images/character_new.png', 'assets/images/character_new.json');
    this.load.image('vase', 'assets/images/push_vase.png');
    game.load.atlasJSONHash('flags', 'assets/images/flag.png', 'assets/images/flag.json');
    this.load.image('win_screen', 'assets/images/win.png');
    // game.load.image('orange', 'assets/images/orange.png');
    game.load.image('gem', 'assets/images/gem.png');
    game.load.image('title', 'assets/images/title_screen.png');

    this.load.bitmapFont('nokia', 'assets/fonts/nokia.png', 'assets/fonts/nokia.xml');

    game.load.audio('jump', 'assets/sounds/jumpfinal.wav');
    game.load.audio('collect', 'assets/sounds/collect_skull.wav');
    game.load.audio('hurt', 'assets/sounds/hurt.wav');
    game.load.audio('music', 'assets/sounds/Desert_City.mp3');
  },
  create: function() {
    spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.add.sprite(0, 0, 'title');
  },
  update: function() {
    if (spacebar.isDown) {
      game.state.start('levelOne');
    }
  }
}
