var keys = {
  blueKey: 0,
  redKey: 0
}

function winGame() {
  game.state.start('win');
}

function loseGame() {
  game.state.start('lose');
}

function collectBlueKey(player, key) {
  keys.blueKey += 1;
  blueKeyText.text = keys.blueKey;
  key.kill();
}

function collectRedKey(player, key) {
  keys.redKey += 1;
  redKeyText.text = keys.redKey;
  key.kill();
}

function collideWithRedLock(player, lock) {
  if (keys.redKey > 0) {
    keys.redKey -= 1;
    redKeyText.text = keys.redKey;
    lock.kill();
  }
}

function collideWithBlueLock(player, lock) {
  if (keys.blueKey > 0) {
    keys.blueKey -= 1;
    blueKeyText.text = keys.blueKey;
    lock.kill();
  }
}

levelOneState = {
  preload: function() {
    this.load.tilemap('map', 'assets/images/test_map.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', 'assets/images/test_tiles.png');
    this.load.image('player', 'assets/images/player_block.png');
    this.load.image('goldenSkull', 'assets/images/golden_skull.png');
    this.load.image('spikes', 'assets/images/spikes_new.png');
    this.load.image('keys', 'assets/images/keys.png');
    this.load.image('blueKey', 'assets/images/blue_key.png');
    this.load.image('redKey', 'assets/images/red_key.png');
    this.load.image('redKeyHole', 'assets/images/red_key_hole.png');
    this.load.image('blueKeyHole', 'assets/images/blue_key_hole.png');

    this.load.bitmapFont('nokia', 'assets/fonts/nokia.png', 'assets/fonts/nokia.xml');
  },
  create: function () {
    this.stage.backgroundColor = "#4488AA";

    this.physics.startSystem(Phaser.Physics.ARCADE);
    // this.physics.arcade.gravity.y = 300;

    map = this.add.tilemap('map');
    map.addTilesetImage('test_tiles', 'tiles');

    layer = map.createLayer(0);
    map.setCollisionBetween(2, 2);

    layer.resizeWorld();

    inventoryGroup = this.add.group();

    inventoryBlueKey = this.add.sprite(0, 0, 'blueKey');
    inventoryBlueKey.fixedToCamera = true;

    blueKeyText = this.add.bitmapText(40, 7, 'nokia', '0', 16);
    blueKeyText.fixedToCamera = true;

    inventoryRedKey = this.add.sprite(0, 32, 'redKey');
    inventoryRedKey.fixedToCamera = true;

    redKeyText = this.add.bitmapText(40, 39, 'nokia', '0', 16);
    redKeyText.fixedToCamera = true;

    player = this.add.sprite(0, 1536, 'player')
    this.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.bounce.y = 0.0;
    player.body.setSize(20, 32, 8, 0);
    player.body.gravity.y = 300;
    this.camera.follow(player);

    skulls = game.add.group();
    skulls.enableBody = true;
    map.createFromObjects('Skull Layer', 4, 'goldenSkull', 0, true, false, skulls)

    spikes = game.add.group();
    spikes.enableBody = true;
    map.createFromObjects('Spike Layer', 3, 'spikes', 0, true, false, spikes);

    blueKeys = game.add.group();
    blueKeys.enableBody = true;
    map.createFromObjects('Key Layer', 5, 'blueKey', 0, true, false, blueKeys);

    blueKeyHoles = game.add.group();
    blueKeyHoles.enableBody = true;
    map.createFromObjects('Key Layer', 6, 'blueKeyHole', 0, true, false, blueKeyHoles);

    for (i in blueKeyHoles.hash) {
      blueKeyHoles.hash[i].body.immovable = true;
    }

    redKeys = game.add.group();
    redKeys.enableBody = true;
    map.createFromObjects('Key Layer', 7, 'redKey', 0, true, false, redKeys);

    redKeyHoles = game.add.group();
    redKeyHoles.enableBody = true;
    map.createFromObjects('Key Layer', 8, 'redKeyHole', 0, true, false, redKeyHoles);

    for (i in redKeyHoles.hash) {
      redKeyHoles.hash[i].body.immovable = true;
    }

    for (i in spikes.hash) {
      spikes.hash[i].body.setSize(32, 12, 0, 20);
    }

    keyboard = this.input.keyboard.createCursorKeys();
  },
  update: function () {
    this.physics.arcade.collide(player, layer);
    this.physics.arcade.collide(player, skulls, winGame);
    this.physics.arcade.collide(player, spikes, loseGame);
    this.physics.arcade.collide(player, blueKeys, collectBlueKey);
    this.physics.arcade.collide(player, redKeys, collectRedKey);
    this.physics.arcade.collide(player, redKeyHoles, collideWithRedLock);
    this.physics.arcade.collide(player, blueKeyHoles, collideWithBlueLock);

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
