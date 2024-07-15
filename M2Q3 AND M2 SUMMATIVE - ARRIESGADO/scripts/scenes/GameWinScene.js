class GameWinScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameWinScene' });
    }

    preload() {
        // Preload assets if needed
    }

    create(data) {
        const gameWidth = this.sys.game.config.width;
        const gameHeight = this.sys.game.config.height;

        this.add.text(gameWidth / 2, gameHeight / 2, 'You Win!', { fontSize: '48px', fill: '#ffffff' }).setOrigin(0.5);

        // Calculate and display time taken
        const minutes = Math.floor(data.time / 60);
        const seconds = data.time % 60;
        const timeString = `${minutes} minutes and ${seconds} seconds`;

        this.add.text(gameWidth / 2, gameHeight / 2 + 50, `Time: ${timeString}`, { fontSize: '32px', fill: '#ffffff' }).setOrigin(0.5);

        // Save high score
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        highScores.push(timeString);
        localStorage.setItem('highScores', JSON.stringify(highScores));

        // Add a button to view high scores
        const highScoresButton = this.add.text(gameWidth / 2, gameHeight / 2 + 100, 'View High Scores', { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
        highScoresButton.on('pointerdown', () => {
            this.scene.start('HighScoreScene');
        });

        // Add a button to return to the main menu
        const mainMenuButton = this.add.text(gameWidth / 2, gameHeight / 2 + 150, 'Back to Main Menu', { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5).setInteractive();
        mainMenuButton.on('pointerdown', () => {
            this.scene.start('MainMenuScene');
        });
    }
}
