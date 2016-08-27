var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {
  game.load.tilemap('map', 'assets/images/test_map.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tiles', 'assets/images/test_tiles.png');
  game.load.image('player', 'assets/images/player_block.png');
}

function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.gravity.y = 300;

  map = game.add.tilemap('map');
  map.addTilesetImage('test_tiles', 'tiles');
  map.setCollisionBetween(2,2);

  layer = map.createLayer(0);
  layer.resizeWorld();

  player = game.add.sprite(0, 1536, 'player')
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;
  player.body.bounce.y = 0.0;
  player.body.setSize(20, 32, 8, 0);
  game.camera.follow(player);

  keyboard = game.input.keyboard.createCursorKeys();
}

function update() {
  game.physics.arcade.collide(player, layer);

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
}

function render() {
  // game.debug.body(player);
}
