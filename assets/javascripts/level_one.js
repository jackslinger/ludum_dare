function winGame() {
  game.state.start('win');
}

function loseGame() {
  game.state.start('lose');
}

levelOneState = {
  preload: function() {
    this.load.tilemap('map', 'assets/images/test_map.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', 'assets/images/test_tiles.png');
    this.load.image('player', 'assets/images/player_block.png');
    this.load.image('golden_skull', 'assets/images/golden_skull.png');
    this.load.image('spikes', 'assets/images/spikes.png');
  },
  create: function () {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    // this.physics.arcade.gravity.y = 300;

    map = this.add.tilemap('map');
    map.addTilesetImage('test_tiles', 'tiles');
    map.setCollisionBetween(2,2);

    layer = map.createLayer(0);
    layer.resizeWorld();

    player = this.add.sprite(0, 1536, 'player')
    this.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.bounce.y = 0.0;
    player.body.setSize(20, 32, 8, 0);
    player.body.gravity.y = 300;
    this.camera.follow(player);

    skull = this.add.sprite((22 * 32), (36 * 32), 'golden_skull');
    this.physics.arcade.enable(skull);

    spikes = game.add.group(undefined, undefined, undefined, true);
    spikes.create((4 * 32), (48 * 32), 'spikes');
    spikes.create((5 * 32), (48 * 32), 'spikes');
    spikes.create((6 * 32), (48 * 32), 'spikes');

    spikes.create((8 * 32), (46 * 32), 'spikes');
    spikes.create((10 * 32), (44 * 32), 'spikes');
    spikes.create((12 * 32), (42 * 32), 'spikes');
    spikes.create((14 * 32), (40 * 32), 'spikes');



    for (i in spikes.hash) {
      spikes.hash[i].body.setSize(32, 12, 0, 20);
    }

    keyboard = this.input.keyboard.createCursorKeys();
  },
  update: function () {
    this.physics.arcade.collide(player, layer);
    this.physics.arcade.collide(player, skull, winGame);
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
