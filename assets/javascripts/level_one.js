function winGame() {
  game.state.start('win');
}

function loseGame() {
  game.state.start('lose');
}

var keys = {
  blueKey: false,
  redKey: false
}

levelOneState = {
  preload: function() {
    this.load.tilemap('map', 'assets/images/test_map.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', 'assets/images/test_tiles.png');
    this.load.image('player', 'assets/images/player_block.png');
    this.load.image('golden_skull', 'assets/images/golden_skull.png');
    this.load.image('spikes', 'assets/images/spikes.png');
    this.load.image('small_spikes', 'assets/images/small_spikes.png');
  },
  create: function () {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    // this.physics.arcade.gravity.y = 300;

    map = this.add.tilemap('map');
    map.addTilesetImage('test_tiles', 'tiles');
    // map.addTilesetImage('small_spikes', 'small_spikes');

    main_layer = map.createLayer(0);
    // spike_layer = map.createLayer('Spike Layer')
    map.setCollisionBetween(2, 2);
    // map.setCollisionBetween(1, 3, spike_layer);

    main_layer.resizeWorld();

    player = this.add.sprite(0, 1536, 'player')
    this.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.bounce.y = 0.0;
    player.body.setSize(20, 32, 8, 0);
    player.body.gravity.y = 300;
    this.camera.follow(player);

    skulls = game.add.group();
    skulls.enableBody = true;
    map.createFromObjects('Skull Layer', 4, 'golden_skull', 0, true, false, skulls)

    spikes = game.add.group();
    spikes.enableBody = true;
    map.createFromObjects('Spike Layer', 3, 'spikes', 0, true, false, spikes);

    for (i in spikes.hash) {
      spikes.hash[i].body.setSize(32, 12, 0, 20);
    }

    keyboard = this.input.keyboard.createCursorKeys();
  },
  update: function () {
    this.physics.arcade.collide(player, main_layer);
    this.physics.arcade.collide(player, skulls, winGame);
    this.physics.arcade.collide(player, spikes, loseGame);

    player.body.velocity.x = 0

    if (keyboard.left.isDown) {
      player.body.velocity.x = -75;
    }
    else if (keyboard.right.isDown) {
      player.body.velocity.x = 75;
    }

    if (keyboard.up.isDown && player.body.blocked.down) {
      player.body.velocity.y -= 250
    }
  },
  render: function() {
    // game.debug.body(spikes.hash[2]);
  }
}
