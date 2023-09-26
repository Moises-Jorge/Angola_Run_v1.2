class StartScene extends Phaser.Scene {
    constructor() {
        super('StartScene')
    }

    preload() {
        this.load.image('startScreen', 'img/startScreen.jpg')
        this.load.image('startButton', 'img/startButton.jpg')
    }

    create() {
        this.add.image(0, 0, 'startScreen').setOrigin(0)
        let startButton = this.add.image(320, 320, 'startButton').setOrigin(0)
        startButton.setInteractive()
        startButton.on('pointerdown', () => this.scene.start('Scene01'))
    }
}