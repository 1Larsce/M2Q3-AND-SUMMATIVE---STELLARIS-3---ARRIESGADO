class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    preload() {
        // Load any assets needed for the pause scene
        this.load.image('btnResume', 'assets/misc/uiStart.png'); // Reusing the start button image as a resume button
        this.load.image('btnMainMenu', 'assets/misc/uiQuit.png'); // Reusing the quit button image as a main menu button
    }

    create() {
        const gameWidth = this.sys.game.config.width;
        const gameHeight = this.sys.game.config.height;

        // Display the "Game Paused" text
        this.add.text(gameWidth / 2, gameHeight / 2 - 100, 'Game Paused', {
            fontFamily: 'Arial',
            fontSize: '48px',
            color: '#ffffff'
        }).setOrigin(0.5, 0.5);

        // Create the Resume button
        const resumeButton = this.add.image(gameWidth / 2, gameHeight / 2, 'btnResume').setOrigin(0.5, 0.5).setInteractive();
        resumeButton.on('pointerdown', () => {
            this.scene.resume('GameScene');
            this.scene.stop();
        });

        // Create the Main Menu button
        const mainMenuButton = this.add.image(gameWidth / 2, gameHeight / 2 + 100, 'btnMainMenu').setOrigin(0.5, 0.5).setInteractive();
        mainMenuButton.on('pointerdown', () => {
            this.scene.stop('GameScene');
            this.scene.start('MainMenuScene');
        });
    }
}
