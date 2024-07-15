class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Load the tilemap and tilesets
        this.load.tilemapTiledJSON('map1', 'assets/images/map1.json');
        this.load.image('tile1', 'assets/images/tile1.png');
        this.load.image('tile2', 'assets/images/tile2.png');
        this.load.image('tile3', 'assets/images/tile3.png');
        this.load.image('tile4', 'assets/images/tile4.png');
        this.load.image('tile5', 'assets/images/tile5.png');
        this.load.image('tile6', 'assets/images/tile6.png');
        this.load.image('tile7', 'assets/images/tile7.png');

        // Load the player spritesheets
        this.load.spritesheet('Run', 'assets/images/Run.png', { frameWidth: 162, frameHeight: 162 });
        this.load.spritesheet('Death', 'assets/images/Death.png', { frameWidth: 162, frameHeight: 162 });
        this.load.spritesheet('Fall', 'assets/images/Fall.png', { frameWidth: 162, frameHeight: 162 });
        this.load.spritesheet('Idle', 'assets/images/Idle.png', { frameWidth: 162, frameHeight: 162 });
        this.load.spritesheet('Jump', 'assets/images/Jump.png', { frameWidth: 162, frameHeight: 162 });

        // Load the coin spritesheet
        this.load.spritesheet('coin', 'assets/images/coin.png', { frameWidth: 16, frameHeight: 16 });

        // Load the audio files
        this.load.audio('coincollect', 'assets/audio/coincollect.mp3');
        this.load.audio('collect10', 'assets/audio/collect10.mp3');
        this.load.audio('collect20', 'assets/audio/collect20.mp3');
        this.load.audio('collect30', 'assets/audio/collect30.mp3');
        this.load.audio('collect40', 'assets/audio/collect40.mp3');
        this.load.audio('collect50', 'assets/audio/collect50.mp3');
        this.load.audio('youlost', 'assets/audio/youlost.mp3');
        this.load.audio('youwin', 'assets/audio/youwin.mp3');
        this.load.audio('beforegamestarts', 'assets/audio/beforegamestarts.mp3');
        this.load.audio('mainbgm', 'assets/audio/mainbgm.mp3');
    }

    create() {
        const gameWidth = this.sys.game.config.width;
        const gameHeight = this.sys.game.config.height;

        // Play the game start audio
        this.introVoice = this.sound.add('beforegamestarts');
        this.beforeGameStarts = this.sound.add('beforegamestarts');

        this.beforeGameStarts.play();

        // Create the map
        const map = this.make.tilemap({ key: 'map1' });

        // Add the tilesets to the map
        const tileset1 = map.addTilesetImage('tile1');
        const tileset2 = map.addTilesetImage('tile2');
        const tileset3 = map.addTilesetImage('tile3');
        const tileset4 = map.addTilesetImage('tile4');
        const tileset5 = map.addTilesetImage('tile5');
        const tileset6 = map.addTilesetImage('tile6');
        const tileset7 = map.addTilesetImage('tile7');

        // Create the layers
        const backgroundLayer = map.createLayer('Background', [tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7], 0, 0);
        const platformsLayer = map.createLayer('Platforms', [tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7], 0, 0);
        const decorationsLayer = map.createLayer('Decorations', [tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7], 0, 0);
        const decorationsLayer2 = map.createLayer('Decorations2', [tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7], 0, 0);
        const waterLayer = map.createLayer('Water', [tileset1, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7], 0, 0);

        // Set collision for platforms and water layers
        platformsLayer.setCollisionByExclusion([-1]);
        waterLayer.setCollisionByExclusion([-1]);

        // Create the player
        this.player = this.physics.add.sprite(100, 450, 'Idle');

        // Reduce the size of the player sprite
        this.player.setScale(0.7); // Scale down the player to 50%

        // Reduce the hitbox of the player
        this.player.body.setSize(this.player.width * 0.3, this.player.height * 0.3); // Adjust the hitbox size
        this.player.body.setOffset(this.player.width * 0.3, this.player.height * 0.3); // Adjust the hitbox offset

        // Player physics properties
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        // Player animations
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('Run', { start: 0, end: 7 }),
            frameRate: 24,
            repeat: -1
        });
        this.anims.create({
            key: 'death',
            frames: this.anims.generateFrameNumbers('Death', { start: 0, end: 6 }),
            frameRate: 24,
            repeat: -1
        });
        this.anims.create({
            key: 'fall',
            frames: this.anims.generateFrameNumbers('Fall', { start: 0, end: 2 }),
            frameRate: 24,
            repeat: -1
        });
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('Idle', { start: 0, end: 9 }),
            frameRate: 24,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('Jump', { start: 0, end: 2 }),
            frameRate: 24,
            repeat: -1
        });

        // Collide the player with the platforms layer
        this.physics.add.collider(this.player, platformsLayer);

        // Check for player touching water
        this.physics.add.collider(this.player, waterLayer, this.playerDrown, null, this);

        // Create the cursors for player input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        // Initialize audio for coin collection
        this.coinSound = this.sound.add('coincollect');
        this.collect10Sound = this.sound.add('collect10');
        this.collect20Sound = this.sound.add('collect20');
        this.collect30Sound = this.sound.add('collect30');
        this.collect40Sound = this.sound.add('collect40');
        this.collect50Sound = this.sound.add('collect50');

        // Initialize other properties
        this.coinsCollected = 0;
        this.totalCoins = 56; // Set this to the actual total number of coins

        // Create collectibles
        this.createCollectibles();

        // Add coin count text
        this.coinText = this.add.text(16, 50, 'Coins: 0', { fontSize: '32px', fill: '#ffffff' });
        this.coinText.setScrollFactor(0);

        // Add intro text and handle player control
        this.playerControlEnabled = false;
        this.coinText.setVisible(false);

        // Add text and typewriter effect for intro
        this.introText = `Welcome to the game, player!

You are playing as Night, the hero of our story. If you paid attention to the intro, you already know what to do, right? If not... well, you might need to press CTRL+R to restart the browser tab.

Just kidding! The game is simple: just collect all the coins, and you win!

I've got nothing else to say. Good luck out there, and cheerio!`;
        this.introTextObj = this.add.text(gameWidth / 2, gameHeight / 2, "", { fontSize: '18px', fill: '#ffffff', align: 'center', wordWrap: { width: gameWidth - 40 } }).setOrigin(0.5);
        this.typewriterText(this.introText, this.introTextObj);

        // Add "PRESS SPACE TO SKIP" text
        this.skipText = this.add.text(gameWidth / 2, gameHeight - 40, 'PRESS SPACE TO SKIP', {
            fontSize: '24px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Skip intro on spacebar press
        this.input.keyboard.on('keydown-SPACE', () => {
            this.skipIntro();
        });

        // Add listener for intro voice completion
        this.beforeGameStarts.on('complete', () => {
            this.startGame();
        });

        // Enable camera to follow the player and set world bounds
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, 3200, 608);
        this.physics.world.setBounds(0, 0, 3200, 608);

        // Add timer
        this.startTime = new Date();
        this.timerText = this.add.text(gameWidth - 16, 16, 'Time: 0', { fontSize: '32px', fill: '#ffffff' });
        this.timerText.setScrollFactor(0).setOrigin(1, 0);

        this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
    }

    typewriterText(text, textObj) {
        const length = text.length;
        let i = 0;
        this.time.addEvent({
            callback: () => {
                textObj.text += text[i];
                ++i;
            },
            repeat: length - 1,
            delay: 50
        });
    }

    createCollectibles() {
        // Coin animation
        this.anims.create({
            key: 'spin',
            frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 4 }),
            frameRate: 24,
            repeat: -1
        });

        // Create coins manually at specified positions
        const coinPositions = [
            [656, 432], [688, 432], [704, 432], [752, 480], [768, 480], [816, 432], [832, 432],
            [864, 432], [672, 304], [704, 304], [816, 304], [848, 304], [752, 240], [768, 240],
            [928, 528], [960, 512], [992, 528], [1024, 512], [1056, 528], [1088, 512], [1120, 528],
            [1232, 480], [1280, 480], [1360, 480], [1408, 480], [1584, 240], [1632, 192], [1680, 144],
            [1728, 144], [1824, 144], [1872, 144], [1920, 192], [1968, 240], [2064, 304], [2096, 336],
            [2128, 368], [2160, 400], [2192, 432], [2224, 464], [2256, 432], [2288, 400], [2320, 368],
            [2352, 336], [2384, 304], [2416, 336], [2464, 368], [2416, 400], [2464, 432], [2416, 464],
            [2448, 496], [2496, 496], [2528, 512], [2976, 464], [3072, 480], [3120, 464], [3168, 448]
        ];

        this.coinsGroup = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        coinPositions.forEach(position => {
            const coinSprite = this.coinsGroup.create(position[0], position[1], 'coin');
            coinSprite.setOrigin(0, 1);
            coinSprite.anims.play('spin'); // Play the coin animation
        });

        // Add overlap with the player
        this.physics.add.overlap(this.player, this.coinsGroup, this.collectCoin, null, this);
    }

    collectCoin(player, coin) {
        coin.disableBody(true, true);
        this.coinsCollected += 1;
        this.coinText.setText('Coins: ' + this.coinsCollected);
        this.coinSound.play(); // Play coin collect sound

        // Check for every 10 coins collected
        if (this.coinsCollected % 10 === 0) {
            let sound;
            let message;
            switch (this.coinsCollected) {
                case 10:
                    sound = this.collect10Sound;
                    message = "Lots of Coins! I Love it!";
                    break;
                case 20:
                    sound = this.collect20Sound;
                    message = "I really like what you're doing, player.";
                    break;
                case 30:
                    sound = this.collect30Sound;
                    message = "Nice Job! Now here's a joke: Why did the coin blush? \n\n\n\nbecause it saw the penny and got a little change. \n\n\nHahahaha, it's funny, right?";
                    break;
                case 40:
                    sound = this.collect40Sound;
                    message = "With these coins, Zuma will not get his revenge!";
                    break;
                case 50:
                    sound = this.collect50Sound;
                    message = "I'm gonna eat all of your coins, player!";
                    break;
            }
            if (sound && message) {
                sound.play();
                this.showMessage(message);
            }
        }

        // Check if all coins are collected
        if (this.coinsCollected === this.totalCoins) {
            this.sound.play('youwin');
            this.endTime = new Date();
            const timeTaken = Math.floor((this.endTime - this.startTime) / 1000);
            this.saveHighScore(timeTaken);
            this.scene.start('GameWinScene', { time: timeTaken });
        }
    }

    showMessage(message) {
        const gameWidth = this.sys.game.config.width;
        const gameHeight = this.sys.game.config.height;
        const textObj = this.add.text(gameWidth / 2, gameHeight - 100, message, {
            fontSize: '24px',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        textObj.setScrollFactor(0); // Ensure the text stays in the same place relative to the camera
        this.tweens.add({
            targets: textObj,
            alpha: { from: 1, to: 0 },
            ease: 'Linear',
            duration: 5000, // Show for 5 seconds
            onComplete: () => {
                textObj.destroy();
            }
        });
    }

    updateTimer() {
        const currentTime = new Date();
        const timeElapsed = Math.floor((currentTime - this.startTime) / 1000);
        this.timerText.setText('Time: ' + timeElapsed);
    }

    update() {
        if (!this.playerControlEnabled) return; // Disable player control if intro is not finished

        const isRunning = this.shiftKey.isDown;
        const speed = isRunning ? 125 : 90;

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);
            this.player.anims.play('run', true);
            this.player.setFlipX(true); // Flip the sprite horizontally when moving left
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);
            this.player.anims.play('run', true);
            this.player.setFlipX(false); // Unflip the sprite when moving right
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('idle', true);
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            if (this.player.body.blocked.down) {
                this.player.setVelocityY(-200);
                this.player.anims.play('jump', true);
                this.jumps = 1;
            } else if (this.jumps < 2) {
                this.player.setVelocityY(-200);
                this.player.anims.play('jump', true);
                this.jumps++;
            }
        }

        if (this.player.body.velocity.y > 0) {
            this.player.anims.play('fall', true);
        }

        // Handle pause functionality
        if (this.pauseKey && Phaser.Input.Keyboard.JustDown(this.pauseKey)) {
            this.scene.launch('PauseScene', { parentScene: this });
            this.scene.pause();
        }
    }

    playerDrown() {
        this.sound.play('youlost');
        this.player.anims.play('death', true);
        this.player.setTint(0xff0000);
        this.physics.pause();

        this.time.delayedCall(2000, () => {
            this.scene.start('GameOverScene');
        });
    }

    startGame() {
        this.introTextObj.setVisible(false);
        this.skipText.setVisible(false);
        this.playerControlEnabled = true;
        this.coinText.setVisible(true);
        this.timerText.setVisible(true);

        // Play in-game background music
        if (!this.mainbgm) {
            this.mainbgm = this.sound.add('mainbgm', { volume: 0.5, loop: true });
        }
        if (!this.mainbgm.isPlaying) {
            this.mainbgm.play();
        }
    }

    skipIntro() {
        this.beforeGameStarts.stop();
        this.startGame();
    }

    saveHighScore(timeTaken) {
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        const playerNumber = highScores.length + 1;
        highScores.push({ player: `Player ${playerNumber}`, time: timeTaken });
        localStorage.setItem('highScores', JSON.stringify(highScores));
    }
}
