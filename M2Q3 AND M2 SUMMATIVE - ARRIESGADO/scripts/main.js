window.onload = function () {
    var config = {
        type: Phaser.AUTO,
        width: 1200,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: true // Enable debug mode to check for any issues
            }
        },
        scene: [OpeningScene, MainMenuScene, GameScene, GameOverScene, GameWinScene, PauseScene, HighScoreScene],
        render: {
            pixelArt: true
        },
    };

    var game = new Phaser.Game(config);
};
