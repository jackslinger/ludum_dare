var keys = {
  blueKey: 0,
  redKey: 0
}

var latestCheckpoint = {
  x: null,
  y: null
}

function winGame() {
  game.state.start('win');
}

function loseGame() {
  if (latestCheckpoint.x && latestCheckpoint.y) {
    player.x = latestCheckpoint.x;
    player.y = latestCheckpoint.y;
  } else {
    game.state.start('lose');
  }
}

function checkSpikeCollision(player, spike) {
  playerAboveSpike = (player.y < spike.y);
  playerJumpingUp = (player.body.velocity.y < 0);
  return (playerAboveSpike && !playerJumpingUp);
}

function collideWithEnemy(player, enemy) {
  playerAboveEnemy = ((player.y + 30) < enemy.y);
  if (!playerAboveEnemy) {
    loseGame();
  }
}

function collideWithCheckpoint(player, checkpoint) {
  if (!checkpoint.flagRaised) {
    checkpoint.flagRaised = true;
    checkpoint.frameName = 'flag.png';
    latestCheckpoint.x = checkpoint.x;
    latestCheckpoint.y = checkpoint.y;
  }
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
  create: function () {
    this.GRAVITY = 300;
    this.MAX_X_SPEED = 100;
    this.MAX_Y_SPEED = 5000;
    this.ACCELERATION = 20;
    this.ENEMY_SPEED = 50;
    this.JUMP_SPEED = -200;
    this.JUMP_DURATION = 200;
    this.DRAG = 300;

    // this.stage.backgroundColor = "#4488AA";

    sky = this.add.sprite(0, 0, 'sky');
    sky.fixedToCamera = true;

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

    playerX = map.objects["Player Layer"][0].x;
    playerY = map.objects["Player Layer"][0].y - 32;

    player = this.add.sprite(playerX, playerY, 'player')
    this.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.bounce.y = 0.0;
    player.body.setSize(20, 32, 8, 0);
    player.body.gravity.y = this.GRAVITY;
    player.body.maxVelocity.setTo(this.MAX_X_SPEED, this.MAX_Y_SPEED);
    player.body.drag.setTo(this.DRAG, 0);
    this.camera.follow(player);

    pushBlocks = game.add.group();
    pushBlocks.enableBody = true;
    map.createFromObjects('Push Layer', 9, 'vase', 0, true, false, pushBlocks)

    for (i in pushBlocks.hash) {
      pushBlocks.hash[i].body.drag.setTo(600, 0);
      pushBlocks.hash[i].body.gravity.y = this.GRAVITY;
    }

    skulls = game.add.group();
    skulls.enableBody = true;
    map.createFromObjects('Skull Layer', 2, 'goldenSkull', 0, true, false, skulls)

    spikes = game.add.group();
    spikes.enableBody = true;
    map.createFromObjects('Spike Layer', 1, 'spikes', 0, true, false, spikes);

    for (i in spikes.hash) {
      spikes.hash[i].body.setSize(32, 12, 0, 20);
      spikes.hash[i].body.immovable = true;
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

    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.create((34 * 32), (48 * 32), 'enemy');

    for (i in enemies.hash) {
      enemies.hash[i].body.collideWorldBounds = true;
      enemies.hash[i].body.immovable = true;
      enemies.hash[i].body.velocity.x = this.ENEMY_SPEED
    }

    checkPoints = game.add.group();
    checkPoints.enableBody = true;
    map.createFromObjects('Checkpoint Layer', 10, 'flags', 'flag_pole.png', true, false, checkPoints);

    for (i in checkPoints.hash) {
      checkPoints.hash[i].body.immovable = true;
      checkPoints.hash[i].flagRaised = false;
    }

    keyboard = this.input.keyboard.createCursorKeys();
  },
  update: function () {
    this.physics.arcade.collide(player, layer);
    this.physics.arcade.collide(enemies, layer, enemyBumpIntoWall);
    this.physics.arcade.collide(player, enemies, collideWithEnemy);
    this.physics.arcade.collide(player, skulls, winGame);
    this.physics.arcade.collide(player, spikes, loseGame, checkSpikeCollision);
    this.physics.arcade.collide(player, blueKeys, collectBlueKey);
    this.physics.arcade.collide(player, redKeys, collectRedKey);
    this.physics.arcade.collide(player, redKeyHoles, collideWithRedLock);
    this.physics.arcade.collide(player, blueKeyHoles, collideWithBlueLock);
    this.physics.arcade.overlap(player, checkPoints, collideWithCheckpoint);
    this.physics.arcade.collide(player, pushBlocks);
    this.physics.arcade.collide(pushBlocks, pushBlocks);
    this.physics.arcade.collide(pushBlocks, layer);

    if (keyboard.left.isDown) {
      player.body.velocity.x -= this.ACCELERATION;
    }
    else if (keyboard.right.isDown) {
      player.body.velocity.x += this.ACCELERATION;
    }

    if (player.body.blocked.down || player.body.touching.down) {
      this.readyToJump = true;
      this.jumping = false;
    } else {
      this.readyToJump = false;
    }

    if ((this.readyToJump || this.jumping) && game.input.keyboard.downDuration(Phaser.Keyboard.UP, this.JUMP_DURATION)) {
      player.body.velocity.y = this.JUMP_SPEED;
      this.jumping = true;
    }

    if (this.jumping && game.input.keyboard.upDuration(Phaser.Keyboard.UP)) {
      this.jumping = false;
    }
  },
  render: function() {
    // game.debug.body(spikes.hash[2]);
  }
}
