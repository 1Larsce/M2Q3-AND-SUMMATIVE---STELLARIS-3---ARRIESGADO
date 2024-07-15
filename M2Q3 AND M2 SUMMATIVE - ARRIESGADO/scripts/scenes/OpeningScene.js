class OpeningScene extends Phaser.Scene {
    constructor() {
        super({ key: 'OpeningScene' });
    }

    preload() {
        // Load your logo image
        this.load.image('logo', 'assets/misc/icon2.jpg');
        // Load the narrator audio
        this.load.audio('introVoice', 'assets/audio/introvoice.mp3');
    }

    create() {
        const gameWidth = this.sys.game.config.width;
        const gameHeight = this.sys.game.config.height;
        const message = `In the whimsical land of Stellaris, where mushrooms gossip and trees dance under the moonlight, a peculiar Knight named Night" wakes up one day with an unusual mission. The Order of Shrooms, a bunch of wise but slightly bonkers mushrooms, has entrusted Night with the task of saving the forest. How? By creating and collecting enchanted coins, of course!

You see, these aren’t just any coins—they're magical coins. And Night's job? To bounce, leap, and dash through the forest, creating and collecting every single one of them. No enemies, no battles, just pure, coin-collecting madness.

Armed with nothing but enthusiasm and maybe a little too much caffeine, Night sets off. The forest is counting on this quirky little sprite to restore its sparkle, one coin at a time.

Ready, set, collect! Stellaris’ fate rests in Night’s tiny hands.`;

        const totalCharacters = message.length;
        const totalDuration = 60000; // 1 minute in milliseconds
        const delay = totalDuration / totalCharacters; // Calculate the delay per character

        // Add and resize the logo image, then place it at the top middle
        const logo = this.add.image(gameWidth / 2, gameHeight / 6, 'logo').setScale(0.6).setOrigin(0.5, 0.5);

        // Draw a brown border behind the logo
        const borderThickness = 10;
        const borderColor = 0x8B4513; // Dark brown color
        const logoBounds = logo.getBounds();

        const border = this.add.graphics();
        border.lineStyle(borderThickness, borderColor);
        border.strokeRect(
            logoBounds.x - borderThickness / 2,
            logoBounds.y - borderThickness / 2,
            logoBounds.width + borderThickness,
            logoBounds.height + borderThickness
        );

        // Bring the logo to the front
        logo.setDepth(1);

        // Play the narrator audio
        this.introVoice = this.sound.add('introVoice');
        this.introVoice.play();

        // Display the text with the typewriter effect
        this.typewriterText(message, 40, gameHeight / 3, delay);

        // Add "Press Space to Skip" text
        this.skipText = this.add.text(gameWidth / 2, gameHeight - 40, 'Press Space to Skip', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#FFFFFF'
        }).setOrigin(0.5, 0.5);

        // Add spacebar input
        this.input.keyboard.on('keydown-SPACE', () => {
            this.skipIntro();
        });

        // Transition to MainMenuScene after audio ends
        this.introVoice.on('complete', () => {
            this.scene.start('MainMenuScene');
        });
    }

    typewriterText(text, x, y, delay) {
        const textObj = this.add.text(x, y, '', {
            fontFamily: 'Arial',
            fontSize: '20px',
            color: '#8B4513', // Dark brown color
            stroke: '#FFD700', // Yellow outline
            strokeThickness: 1.5,
            align: 'left',
            wordWrap: { width: this.sys.game.config.width - 80 }
        }).setOrigin(0, 0);

        let charIndex = 0;

        const timer = this.time.addEvent({
            delay: delay,
            callback: () => {
                if (charIndex < text.length) {
                    textObj.text += text.charAt(charIndex);
                    charIndex++;
                } else {
                    timer.remove();
                }
            },
            callbackScope: this,
            loop: true
        });
    }

    skipIntro() {
        // Stop the audio and transition to MainMenuScene
        if (this.introVoice.isPlaying) {
            this.introVoice.stop();
        }
        this.scene.start('MainMenuScene');
    }
}
