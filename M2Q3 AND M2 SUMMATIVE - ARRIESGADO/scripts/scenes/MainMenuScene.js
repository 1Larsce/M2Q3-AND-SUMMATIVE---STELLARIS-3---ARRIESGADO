class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    preload() {
        this.load.image('title', 'assets/misc/title.png');
        this.load.video('bg2', 'assets/misc/bg2.mp4', 'loadeddata', false, true);
        this.load.audio('mainbgm', 'assets/audio/mainbgm.mp3');
        this.load.audio('select', 'assets/audio/select.mp3');
        this.load.image('uiStart', 'assets/misc/uiStart.png'); // Load Start button image
        this.load.image('uiScore', 'assets/misc/uiScore.png'); // Load High Scores button image
        this.load.image('uiQuit', 'assets/misc/uiQuit.png'); // Load Quit button image
    }

    create() {
        const gameWidth = 1200;
        const gameHeight = 600;

        // Add the video background
        const video = this.add.video(gameWidth / 2, gameHeight / 2, 'bg2');
        video.setDisplaySize(gameWidth, gameHeight).play(true);

        // Position the title and buttons
        const titleX = 150; // X coordinate for the title
        const titleY = 150; // Y coordinate for the title
        const startButtonX = 150; // X coordinate for the start button
        const startButtonY = 350; // Y coordinate for the start button
        const scoresButtonX = 150; // X coordinate for the scores button
        const scoresButtonY = 420; // Y coordinate for the scores button
        const quitButtonX = 150; // X coordinate for the quit button
        const quitButtonY = 490; // Y coordinate for the quit button
        const volumeButtonX = gameWidth - 50; // X coordinate for the volume button
        const volumeButtonY = gameHeight - 50; // Y coordinate for the volume button

        // Add the title image
        let title = this.add.image(titleX, titleY, 'title').setOrigin(0.5);
        title.setScale(0.33); // Set the scale of the title

        if (!this.mainbgm) {
            this.mainbgm = this.sound.add('mainbgm', { volume: 0.5, loop: true });
        }
        if (!this.mainbgm.isPlaying) {
            this.mainbgm.play();
        }

        this.selectSound = this.sound.add('select');

        // Define scale values for the buttons
        const startButtonScale = 1.2;
        const scoresButtonScale = 1;
        const quitButtonScale = 0.8;

        // Create the buttons
        const startButton = this.add.image(startButtonX, startButtonY, 'uiStart').setOrigin(0.5).setInteractive().setScale(startButtonScale);
        const scoresButton = this.add.image(scoresButtonX, scoresButtonY, 'uiScore').setOrigin(0.5).setInteractive().setScale(scoresButtonScale);
        const quitButton = this.add.image(quitButtonX, quitButtonY, 'uiQuit').setOrigin(0.5).setInteractive().setScale(quitButtonScale);

        startButton.on('pointerdown', () => {
            this.selectSound.play();
            this.fadeOut('GameScene');
        });

        scoresButton.on('pointerdown', () => {
            this.selectSound.play();
            this.scene.start('HighScoreScene');
        });

        quitButton.on('pointerdown', () => {
            this.selectSound.play();
            window.close();
        });

        // Add mute/unmute button
        let isMuted = false;
        const volumeText = this.add.text(volumeButtonX, volumeButtonY, 'Music On', {
            fontSize: '20px',
            fill: '#00ff00' // Green color for unmute
        }).setOrigin(1, 1).setInteractive();

        volumeText.on('pointerdown', () => {
            isMuted = !isMuted;
            this.mainbgm.setMute(isMuted);
            if (isMuted) {
                volumeText.setText('Muted');
                volumeText.setFill('#ff0000'); // Red color for mute
            } else {
                volumeText.setText('Music On');
                volumeText.setFill('#00ff00'); // Green color for unmute
            }
        });

    }

    fadeOut(targetScene) {
        this.cameras.main.fadeOut(2000, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.mainbgm.stop();
            this.scene.start(targetScene);
        });
    }

    fadeIn() {
        this.cameras.main.fadeIn(2000, 0, 0, 0);
    }
}
