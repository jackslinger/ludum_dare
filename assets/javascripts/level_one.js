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

function checkSpikeCollision(player, spike) {
  playerAboveSpike = (player.y < spike.y);
  playerJumpingUp = (player.body.velocity.y < 0);
  return (playerAboveSpike && !playerJumpingUp);
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

function enemyBumpIntoWall(enemy, layer) {
  if (enemy.body.blocked.left) {
    enemy.body.velocity.x = levelOneState.ENEMY_SPEED;
  }
  else if (enemy.body.blocked.right) {
    enemy.body.velocity.x = -levelOneState.ENEMY_SPEED;
  }
}

levelOneState = {
  preload: function() {
    this.load.tilemap('map', 'assets/images/test_map.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('whiteBrick', 'assets/images/Witebrick.png');
    this.load.image('player', 'assets/images/player_block.png');
    this.load.image('goldenSkull', 'assets/images/golden_skull.png');
    this.load.image('spikes', 'assets/images/spikes_new.png');
    this.load.image('keys', 'assets/images/keys.png');
    this.load.image('blueKey', 'assets/images/blue_key.png');
    this.load.image('redKey', 'assets/images/red_key.png');
    this.load.image('redKeyHole', 'assets/images/red_key_hole.png');
    this.load.image('blueKeyHole', 'assets/images/blue_key_hole.png');
    this.load.image('enemy', 'assets/images/test_orange.png');
    this.load.image('purple', 'assets/images/test_purple.png');

    this.load.bitmapFont('nokia', 'assets/fonts/nokia.png', 'assets/fonts/nokia.xml');
  },
  create: function () {
    this.GRAVITY = 300;
    this.MAX_X_SPEED = 100;
    this.MAX_Y_SPEED = 5000;
    this.ACCELERATION = 20;
    this.ENEMY_SPEED = 50;
    this.JUMP_SPEED = -200;
    this.JUMP_DURATION = 300;
    this.DRAG = 300;

    this.stage.backgroundColor = "#4488AA";

    this.physics.startSystem(Phaser.Physics.ARCADE);
    // this.physics.arcade.gravity.y = 300;

    map = this.add.tilemap('map');
    map.addTilesetImage('Witebrick', 'whiteBrick');

    layer = map.createLayer(0);
    map.setCollisionBetween(7, 7);

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

    player = this.add.sprite((1 * 32), (27 * 32), 'player')
    this.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.bounce.y = 0.0;
    player.body.setSize(20, 32, 8, 0);
    player.body.gravity.y = this.GRAVITY;
    player.body.maxVelocity.setTo(this.MAX_X_SPEED, this.MAX_Y_SPEED);
    player.body.drag.setTo(this.DRAG, 0);
    this.camera.follow(player);

    pushBlock = this.add.sprite((4 * 32), (27 * 32), 'purple')
    this.physics.arcade.enable(pushBlock);
    pushBlock.body.drag.setTo(600, 0);
    pushBlock.body.gravity.y = this.GRAVITY;

    skulls = game.add.group();
    skulls.enableBody = true;
    map.createFromObjects('Skull Layer', 2, 'goldenSkull', 0, true, false, skulls)

    spikes = game.add.group();
    spikes.enableBody = true;
    map.createFromObjects('Spike Layer', 1, 'spikes', 0, true, false, spikes);

    for (i in spikes.hash) {
      spikes.hash[i].body.setSize(32, 12, 0, 20);
    }

    blueKeys = game.add.group();
    blueKeys.enableBody = true;
    map.createFromObjects('Key Layer', 3, 'blueKey', 0, true, false, blueKeys);

    blueKeyHoles = game.add.group();
    blueKeyHoles.enableBody = true;
    map.createFromObjects('Key Layer', 4, 'blueKeyHole', 0, true, false, blueKeyHoles);

    for (i in blueKeyHoles.hash) {
      blueKeyHoles.hash[i].body.immovable = true;
    }

    redKeys = game.add.group();
    redKeys.enableBody = true;
    map.createFromObjects('Key Layer', 5, 'redKey', 0, true, false, redKeys);

    redKeyHoles = game.add.group();
    redKeyHoles.enableBody = true;
    map.createFromObjects('Key Layer', 6, 'redKeyHole', 0, true, false, redKeyHoles);

    for (i in redKeyHoles.hash) {
      redKeyHoles.hash[i].body.immovable = true;
    }

    enemies = this.add.group();
    enemies.enableBody = true;
    enemies.create((34 * 32), (48 * 32), 'enemy');

    for (i in enemies.hash) {
      enemies.hash[i].body.collideWorldBounds = true;
      enemies.hash[i].body.velocity.x = this.ENEMY_SPEED
    }

    keyboard = this.input.keyboard.createCursorKeys();
  },
  update: function () {
    this.physics.arcade.collide(player, layer);
    this.physics.arcade.collide(enemies, layer, enemyBumpIntoWall);
    this.physics.arcade.collide(player, enemies, loseGame);
    this.physics.arcade.collide(player, skulls, winGame);
    this.physics.arcade.collide(player, spikes, loseGame, checkSpikeCollision);
    this.physics.arcade.collide(player, blueKeys, collectBlueKey);
    this.physics.arcade.collide(player, redKeys, collectRedKey);
    this.physics.arcade.collide(player, redKeyHoles, collideWithRedLock);
    this.physics.arcade.collide(player, blueKeyHoles, collideWithBlueLock);
    this.physics.arcade.collide(player, pushBlock);
    this.physics.arcade.collide(pushBlock, layer);

    if (keyboard.left.isDown) {
      player.body.velocity.x -= this.ACCELERATION;
    }
    else if (keyboard.right.isDown) {
      player.body.velocity.x += this.ACCELERATION;
    }

    if (player.body.blocked.down) {
      this.jumping = false;
      this.jumps = 1;
    }

    if (this.jumps > 0 && game.input.keyboard.downDuration(Phaser.Keyboard.UP, this.JUMP_DURATION)) {
      player.body.velocity.y = this.JUMP_SPEED;
      this.jumping = true;
    }

    if (this.jumping && game.input.keyboard.upDuration(Phaser.Keyboard.UP)) {
      this.jumps -= 1;
      this.jumping = false;
    }
  },
  render: function() {
    // game.debug.body(spikes.hash[2]);
  }
}
