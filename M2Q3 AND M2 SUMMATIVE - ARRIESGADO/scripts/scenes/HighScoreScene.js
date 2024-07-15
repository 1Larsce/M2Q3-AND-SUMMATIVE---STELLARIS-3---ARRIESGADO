class HighScoreScene extends Phaser.Scene {
    constructor() {
        super({ key: 'HighScoreScene' });
    }

    create() {
        const gameWidth = this.sys.game.config.width;
        const gameHeight = this.sys.game.config.height;

        this.add.text(gameWidth / 2, 50, 'High Scores', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        highScores.forEach((score, index) => {
            this.add.text(gameWidth / 2, 100 + index * 30, `${score.player} - Time Cleared: ${score.time} seconds`, {
                fontSize: '24px',
                fill: '#ffffff'
            }).setOrigin(0.5);
        });

        const backButton = this.add.text(gameWidth / 2, gameHeight - 50, 'Back to Main Menu', {
            fontSize: '24px',
            fill: '#ffffff'
        }).setOrigin(0.5).setInteractive();

        backButton.on('pointerdown', () => {
            this.scene.start('MainMenuScene');
        });
    }
}
