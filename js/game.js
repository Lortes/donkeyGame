const donkeyGame = {
    appName: 'Donkey Kong',
    author: 'Ignacio y Lorena',
    version: '1.0.0',
    license: undefined,
    description: 'Donkey Kong is a 1981 arcade video game developed and published by Nintendo.',
    canvasSize: {
        w: 1200,
        h: 900
    },
    player: undefined,
    playerBaseY: undefined,
    lives: [],
    isJumping: false,
    don: undefined,
    platforms: [],
    overPlatform: false,
    activePlatform: undefined,
    barrells: [],
    frameIndex: 0,
    FPS: 60,
    interval: undefined,
    damageSound: new Audio('./audio/takingDamage.mp3'),
    winSound: new Audio('./audio/soundWin.mp3'),
    gameOverSound: new Audio('./audio/gameOver.mp3'),

    // INIT LLAMADO DESDE NUESTRO SCRIPT.JS  -----------------------------------------------------------------------------------------------

    init() {
        this.setContext()
        this.setDimensions()
        this.createDon()
        this.createPrincess()
        this.createPlatforms()
        this.createPlayer()
        this.clearBarrells()
        this.createLives()
        this.start()
    },

    // ESTABLECEMOS CONTEXTO Y DIMENSIONES DE NUESTRO CANVAS  -----------------------------------------------------------------------------------------------
    setContext() {
        this.ctx = document.querySelector('canvas').getContext('2d')
    },

    setDimensions() {
        document.querySelector('canvas').setAttribute('width', this.canvasSize.w)
        document.querySelector('canvas').setAttribute('height', this.canvasSize.h)
    },


    // MARIO / DONKEY KONG / PRINCESS  -----------------------------------------------------------------------------------------------

    createPlayer() {
        this.player = new Player(this.ctx, this.canvasSize, this.isJumping)
    },

    createDon() {
        this.don = new Don(this.ctx, this.canvasSize, 100, 100, 100, 40)
    },

    createPrincess() {
        this.princess = new Princess(this.ctx, this.canvasSize)
    },

    createLives() {
        this.lives.push(
            new Lives(this.ctx, this.canvasSize, 5, 10, 40, 40),
            new Lives(this.ctx, this.canvasSize, 50, 10, 40, 40),
            new Lives(this.ctx, this.canvasSize, 95, 10, 40, 40)
        )
    },


    // COLISIONES CON PRINCESA  -----------------------------------------------------------------------------------------------
    isCollissionWithPrincess() {
        if (
            this.player.marioSpecs.pos.x < this.princess.princessPos.x + this.princess.princessSize.w &&
            this.player.marioSpecs.pos.x + this.player.marioSpecs.size.w > this.princess.princessPos.x &&
            this.player.marioSpecs.pos.y < this.princess.princessPos.y + this.princess.princessSize.h &&
            this.player.marioSpecs.size.h + this.player.marioSpecs.pos.y > this.princess.princessPos.y
        ) {
            this.winGame()
        }
    },

    // PLATFORMS-----------------------------------------------------------------------------------------------

    drawPlatform() {
        this.platforms.forEach((eachPlatform) => {
            eachPlatform.draw()
        })
    },

    createPlatforms() {
        this.platforms.push(
            new Platform(this.ctx, this.canvasSize, 350, 280),
            new Platform(this.ctx, this.canvasSize, 0, 440),
            new Platform(this.ctx, this.canvasSize, 350, 600),
            new Platform(this.ctx, this.canvasSize, 0, 740),
        )
    },

    // PLATFORMS COLISIONES 
    checkJumpOverPlatform() {
        this.platforms.forEach((eachPlatform) => {
            if (
                this.player.marioSpecs.pos.y + this.player.marioSpecs.size.h <= eachPlatform.platformSpecs.pos.y
                && this.player.isJumping
            ) {
                this.playerBaseY = Math.floor(eachPlatform.platformSpecs.pos.y)
                this.player.marioSpecs.pos.y = this.playerBaseY - 100
                this.player.isJumping = false
            }
        })
    },

    checkIfOverPlatform() {

        const isOverPlatform = this.platforms.some((eachPlatform) => {

            const marioPosX = this.player.marioSpecs.pos.x
            const marioPosY = this.player.marioSpecs.pos.y + 100

            const platformPosX = eachPlatform.platformSpecs.pos.x
            const platformPosY = eachPlatform.platformSpecs.pos.y
            const platWidth = eachPlatform.platformSpecs.size.w

            if (
                (marioPosY === platformPosY) &&
                (marioPosX <= platformPosX + platWidth) &&
                !(marioPosX + this.player.marioSpecs.size.w < platformPosX && platformPosX != 0)

            ) {
                return true
            }
        })

        const notOnFloor = this.player.marioSpecs.pos.y < this.canvasSize.h - 110

        if (!isOverPlatform && notOnFloor) {
            this.player.setGravity()
        }
        if (isOverPlatform && notOnFloor) {
            this.player.removeGravity()
        }
        if (!notOnFloor) {
            this.player.removeGravity()
        }
    },
    setActivePlatform() {
        this.platforms.forEach((eachPlatform, idx) => {

            const marioPosY = this.player.marioSpecs.pos.y + 100
            const platformPosY = eachPlatform.platformSpecs.pos.y
            this.activePlatform = idx
            // const OnFloor = marioPosY <= this.canvasSize.h


            // if ((marioPosY === platformPosY) &&
            //     (this.activePlatform === 1 || this.activePlatform === 3) &&
            //     (this.player.marioSpecs.pos.x >= 0) &&
            //     (this.player.marioSpecs.pos.x <= this.platforms[2].platformSpecs.pos.x)) {
            //     this.player.jumpType = true

            // } else {
            //     console.log('PASANDO A FALSE 1')

            //     this.player.jumpType = false
            // }


            // if ((marioPosY === platformPosY) &&
            //     (this.activePlatform === 0 || this.activePlatform === 2) &&
            //     (this.player.marioSpecs.pos.x <= this.canvasSize.w) &&
            //     (this.player.marioSpecs.pos.x >= this.platforms[1].platformSpecs.pos.x)) {
            //     this.player.jumpType = true

            // } else {
            //     console.log('PASANDO A FALSE 2')
            //     this.player.jumpType = false
            // }

            // if ((OnFloor) &&
            //     (this.player.marioSpecs.pos.x <= this.canvasSize.w) &&
            //     (this.player.marioSpecs.pos.x >= this.platforms[3].platformSpecs.pos.x + this.platforms[3].platformSpecs.size.w)) {

            //     this.player.jumpType = true
            //     console.log("JUMPTYPE DESDE GAME:", this.player.jumpType)
            // }
        })
    },

    checkIfPlayerCollitionBottomPlatform() {

        const isUnderPlatform = this.platforms.some((eachPlatform) => {

            const marioPosX = this.player.marioSpecs.pos.x
            const marioPosY = this.player.marioSpecs.pos.y + 100

            const platformPosX = eachPlatform.platformSpecs.pos.x
            const platformPosY = eachPlatform.platformSpecs.pos.y
            const platWidth = eachPlatform.platformSpecs.size.w

            if (
                (marioPosY === platformPosY) &&
                (marioPosX <= platformPosX + platWidth) &&
                !(marioPosX + this.player.marioSpecs.size.w < platformPosX && platformPosX != 0)

            ) {
                return true
            }
        })

        if (isUnderPlatform) {
        } else {
        }

    },

    // BARRELLS -----------------------------------------------------------------------------------------------
    drawBarrells(frameIndex) {

        this.barrells.forEach((eachBarrell) => {
            eachBarrell.draw(frameIndex)
        })
        if (this.frameIndex % 60 == 0) {
            this.createBarrells()
        }
    },
    createBarrells() {
        const positionBarrelsX = this.don.donPos.x
        const positionBarrelsY = this.don.donPos.y + 50
        this.barrells.push(
            new Barrell(this.ctx, this.canvasSize, positionBarrelsX, positionBarrelsY),
        )
    },

    // CHEQUEAMOS LAS COLISIONES DE LOS BARRILES CON MARIO -----------------------------------------------------------------------------------------------
    checkCollisionWithBarrell() {
        this.barrells.forEach((barrellCollision, i) => {
            if (this.player.marioSpecs.pos.x < barrellCollision.barrellSpecs.pos.x + barrellCollision.barrellSpecs.size.w &&
                this.player.marioSpecs.pos.x + this.player.marioSpecs.size.w > barrellCollision.barrellSpecs.pos.x &&
                this.player.marioSpecs.pos.y < barrellCollision.barrellSpecs.pos.y + barrellCollision.barrellSpecs.size.h &&
                this.player.marioSpecs.size.h + this.player.marioSpecs.pos.y > barrellCollision.barrellSpecs.pos.y) {


                this.barrells = this.barrells.filter(b => b !== this.barrells[i])
                this.lives.pop()
                this.damageSound.play()
                if (this.lives.length === 0) {
                    this.gameOver()
                }

            }
        })
    },
    // LIMPIAMOS ARRAY DE BARRELS CUANDO SALEN FUERA DE CANVAS-----------------------------------------------------------------------------------------------
    clearBarrells() { // ASEGURARNOS DE QUE REALMENTE SE ELIMINAN LOS BARRELLS FUERA DE CANVAS
        this.barrells = this.barrells.filter(Barrel => Barrel.barrellSpecs.pos.y <= this.canvasSize.h)
    },


    // CORAZON DE NUESTRO JUEGO-----------------------------------------------------------------------------------------------

    start() {
        this.interval = setInterval(() => {
            this.frameIndex++
            this.clearAll()
            this.drawAll()
            this.checkJumpOverPlatform()
            this.checkCollisionWithBarrell()
            this.checkIfOverPlatform()
            this.checkIfPlayerCollitionBottomPlatform()
            this.setActivePlatform()
            this.isCollissionWithPrincess()
            this.clearBarrells()
        }, 1000 / this.FPS)
    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    drawAll() {
        this.drawWinGame()
        this.drawGameOver()
        this.drawPlatform()
        this.player.draw(this.frameIndex)
        this.don.draw(this.frameIndex)
        this.princess.draw(this.frameIndex)
        this.drawBarrells(this.frameIndex)
        this.lives.forEach(EachLive => EachLive.draw())
    },

    // WIN -----------------------------------------------------------------------------------------------

    drawWinGame() {
        this.gameIsWin = new Image()
        this.gameIsWin.src = './img/marioWin.jpeg'
    },
    winGame() {
        clearInterval(this.interval)
        this.clearAll()
        this.winSound.play()
        this.ctx.drawImage(this.gameIsWin, 0, 0, this.canvasSize.w, this.canvasSize.h)
        setTimeout(() => location.reload(), 5000)
    },

    // GAME OVER -----------------------------------------------------------------------------------------------
    drawGameOver() {
        this.gameIsOver = new Image()
        this.gameIsOver.src = './img/game-over.webp'
    },
    gameOver() {
        clearInterval(this.interval)
        this.clearAll()
        this.gameOverSound.play()
        this.ctx.drawImage(this.gameIsOver, 250, 0, 1000, 700)
        setTimeout(() => location.reload(), 4000)
    }
}