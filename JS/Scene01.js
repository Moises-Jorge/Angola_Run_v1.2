class Scene01 extends Phaser.Scene {
    constructor() {
        super('Scene01')
    }

     /**
     * Método responsável por carregar os recursos do jogo
     */
    preload() {
        // Carregando a imagem de background
        this.load.image('background', 'img/background.png') 

        // Carregando a imagem do personagem (spritesheet = contem várias posições)
        this.load.spritesheet('player', 'img/player.png', {frameWidth: 32, frameHeight: 32})
        
        // Carregando a imagem do asfalto
        this.load.image('asphalt', 'img/asphalt.png')

        // Carregando a imagem das moedas
        this.load.spritesheet('coin', 'img/coin.png', {frameWidth: 32, frameHeight: 32})

        // Carregando a imagem do obstaculo ameaçador para o personagem
        this.load.image('enemy', 'img/hiace.png')
        
        // Carregando os sons do jogo
        this.load.audio('backSound', 'sounds/music.ogg')
        this.load.audio('jumpSound', 'sounds/jump.ogg')
        this.load.audio('getCoinSound', 'sounds/getcoin.ogg')
    }

    /**
     * Método usado para criar e configurar os objectos do jogo
     */
    create() {
        // Adicionando a imagem de fundo no jogo
        this.background = this.add.image(0, 0, 'background').setOrigin(0,0)
        this.background.displayWidth = 15000
        this.background.displayHeight = 600

        // Adicionando o personagem no jogo e aumentando a sua escala
        this.player = this.physics.add.sprite(50, 500, 'player')
        .setCollideWorldBounds(true).setScale(2).setVelocityX(150)
        this.player.body.setSize(16, 32) // Redimensionando a área ocupada pelo personagem

        // Criando ANIMAÇÕES para o personagem
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 3
            }),
            frameRate: 8,
            repeat: -1
        })

        // Criando e adicionando funções às teclas (Para interagir com o personagem e para iniciar o jogo)
        this.player.canJump = true // variável que controla o salto do personagem
        this.keyBoard = this.input.keyboard.createCursorKeys()

        // Criando e add o Asfalto (através de um grupo de objectos que vão ser configurados da mesma forma)
        this.asphalts = this.physics.add.staticGroup()
        this.asphalts.create(0, 600, 'asphalt').setScale(37.5, 1).setOrigin(0, 1).refreshBody()

        // Criando e adicionando MOEDAS ao jogo
        this.coins = this.physics.add.group({
            key: 'coin',
            repeat: 30,
            setXY: {
                x: 300,
                y: -50,
                stepX: 50
            }
        })
        // Criando ANIMAÇÕES para as moedas
        this.anims.create({
            key: 'spin',
            frames: this.anims.generateFrameNumbers('coin', {
                start: 0,
                end: 4
            }),
            frameRate: 8,
            repeat: -1
        })
        // Adicionando efeito bounce e aplicando a animação nas moedas
        this.coins.children.iterate((c) => {
            c.setBounceY(0.3)
            c.anims.play('spin')
        })

        // Criando e inserindo o placar de moedas na tela
        this.score = 0 // Contador de moedas
        this.txtScore = this.add.text(15, 15, `SCORE: ${this.score}`, {fontSize: '32px'}).setShadow(0, 0, '#000', 3).setScrollFactor(0)
        this.updateScore()

        // Criando o grupo de ameaças e adicinado-os ao jogo
        this.enemies = this.physics.add.group()
        this.enemies.create(1500, 500, 'enemy')//.setCollideWorldBounds(true)
        .setScale(1.5, 2.7).setSize(95, 28)//.setVelocityX(-200)
        
        this.enemies.create(2500, 500, 'enemy')//.setCollideWorldBounds(true)
        .setScale(1.5, 2.7).setSize(95, 28)//.setVelocityX(-200)

        this.enemies.create(3500, 500, 'enemy')//.setCollideWorldBounds(true)
        .setScale(1.5, 2.7).setSize(95, 28)//.setVelocityX(-200)

        this.enemies.create(4500, 500, 'enemy')//.setCollideWorldBounds(true)
        .setScale(1.5, 2.7).setSize(95, 28)//.setVelocityX(-200)

        this.enemies.create(5500, 500, 'enemy')//.setCollideWorldBounds(true)
        .setScale(1.5, 2.7).setSize(95, 28)//.setVelocityX(-200)

        this.enemies.create(6400, 500, 'enemy')//.setCollideWorldBounds(true)
        .setScale(1.5, 2.7).setSize(95, 28)//.setVelocityX(-200)

        this.enemies.create(7300, 500, 'enemy')//.setCollideWorldBounds(true)
        .setScale(1.5, 2.7).setSize(95, 28)//.setVelocityX(-200)

        this.enemies.create(8200, 500, 'enemy')//.setCollideWorldBounds(true)
        .setScale(1.5, 2.7).setSize(95, 28)//.setVelocityX(-200)

        this.enemies.create(9100, 500, 'enemy')//.setCollideWorldBounds(true)
        .setScale(1.5, 2.7).setSize(95, 28)//.setVelocityX(-200)

        this.enemies.create(10000, 500, 'enemy')//.setCollideWorldBounds(true)
        .setScale(1.5, 2.7).setSize(95, 28)//.setVelocityX(-200)

        this.enemies.create(10500, 500, 'enemy')//.setCollideWorldBounds(true)
        .setScale(1.5, 2.7).setSize(95, 28)//.setVelocityX(-200)

        this.enemies.create(11000, 500, 'enemy')//.setCollideWorldBounds(true)
        .setScale(1.5, 2.7).setSize(95, 28)//.setVelocityX(-200)

        this.enemies.create(11500, 500, 'enemy')//.setCollideWorldBounds(true)
        .setScale(1.5, 2.7).setSize(95, 28)//.setVelocityX(-350)

        this.enemies.create(12000, 500, 'enemy')//.setCollideWorldBounds(true)
        .setScale(1.5, 2.7).setSize(95, 28)//.setVelocityX(-500)

        this.enemies.create(12400, 500, 'enemy')//.setCollideWorldBounds(true)
        .setScale(1.5, 2.7).setSize(95, 28)//.setVelocityX(-500)

        this.enemies.create(12700, 500, 'enemy')//.setCollideWorldBounds(true)
        .setScale(1.5, 2.7).setSize(95, 28)//.setVelocityX(-500)

        this.enemies.create(13000, 500, 'enemy')//.setCollideWorldBounds(true)
        .setScale(1.5, 2.7).setSize(95, 28)//.setVelocityX(-500)

        this.enemies.create(13300, 500, 'enemy')//.setCollideWorldBounds(true)
        .setScale(1.5, 2.7).setSize(95, 28)//.setVelocityX(-500)

        // Criando as colisões entre os elementos do jogo (Asfalto, Personagem, moedas e as ameaças)
        this.physics.add.collider(this.player, this.asphalts)
        this.physics.add.collider(this.coins, this.asphalts)
        this.physics.add.collider(this.enemies, this.asphalts)
        this.physics.add.collider(this.player, this.enemies, this.enemyHit, null, this)
        // Criando a colisão que permite o personagem apanhar as moedas
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this)

        // Redimensionando o Mundo de Jogo (aumentando a fronteira) e configurando a câmera para seguir o personagem
        this.physics.world.setBounds(0, 0, 15000, 600)
        this.cameras.main.startFollow(this.player).setBounds(0, 0, 15000, 600)

        // Adicionando os sons ao jogo
        this.backSound = this.sound.add('backSound')
        this.backSound.play({
            volume: 0.5,
            loop: true
        })
        this.jumpSound = this.sound.add('jumpSound')
        this.getCoinSound = this.sound.add('getCoinSound')

        // Variável que determina o fim do jogo (se o personagem entrar em contacto com uma ameaça)
        this.gameOver = false
    }

    /**
     * Método usado para actualizar o jogo, ou seja, alterar as carecterísticas padrão de alguns objectos
     */
    update() {
        if (!this.gameOver) {
            // Movimentação do jogador no eixo "X": APENAS UM TESTE, DEPOIS REMOVER
            if (this.keyBoard.left.isDown) {
                // Chamando e adicionando a animação ao personagem
                this.player.anims.play('walk', true)
                this.player.flipX = true // Virar o corpo para a esquerda
                this.player.setVelocityX(-150)
            } else {
                // Chamando e adicionando a animação ao personagem
                this.player.anims.play('walk', true)
                this.player.flipX = false // Continuar virado para a frente
                this.player.setVelocityX(250)
            }

            // Movimentação do jogador no eixo "Y": Saltar e baixar
            if (this.keyBoard.up.isDown && this.player.canJump && this.player.body.touching.down) {
                this.jumpSound.play()
                this.player.setVelocityY(-500)
                this.player.canJump = false
            }
            // Recuperando o valor "True" para o personagem poder pular novamente
            if (!this.keyBoard.up.isDown && !this.player.canJump && this.player.body.touching.down) {
                this.player.canJump = true
            }
            // Chamando e adicionando a animação ao personagem
            if (!this.player.body.touching.down) {
                this.player.setFrame(
                    this.player.body.velocity.y < 0 ? 1 : 3
                )
            }
        }
    }

    /**
     * Método responsável pela coleta das moedas
     */
    collectCoin(player, coin) {
        // Eliminando a moeda quando o personagem toca na mesma
        this.getCoinSound.play()
        coin.destroy()
        this.score++
        this.updateScore()
    }

    /**
     * Método responsável por actualizar o placar
     */
    updateScore() {
        // Verificação de dois dígitos de acordo com a quantidade de moedas coletadas
        this.txtScore.setText(this.score < 10 ? `SCORE: 0${this.score}` : `SCORE: ${this.score}`)
    }

    /**
     * Método responsável por causar o Game Over
     */
    enemyHit(player, enemy) {
        if (!enemy.body.touching.up) {
            this.backSound.stop()
            this.physics.pause()
            player.anims.stop()
            player.setTint(0xff0000)
            this.gameOver = true
        }
    }
}