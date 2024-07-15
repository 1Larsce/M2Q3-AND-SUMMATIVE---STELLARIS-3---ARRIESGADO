class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    preload() {
        // Load any assets needed for the game over scene
        this.load.image('btnRestart', 'assets/misc/uiRetry.png'); // Reusing the start button image as a restart button
    }

    create() {
        const gameWidth = this.sys.game.config.width;
        const gameHeight = this.sys.game.config.height;

        // Display the "Game Over" text
        this.add.text(gameWidth / 2, gameHeight / 2 - 100, 'Game Over', {
            fontFamily: 'Arial',
            fontSize: '48px',
            color: '#ff0000'
        }).setOrigin(0.5, 0.5);

        // Create the Restart button
        const restartButton = this.add.image(gameWidth / 2, gameHeight / 2 + 50, 'btnRestart').setOrigin(0.5, 0.5).setInteractive();
        restartButton.on('pointerdown', () => {
            this.scene.start('MainMenuScene');
        });
    }
}
