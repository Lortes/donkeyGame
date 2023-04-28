class Player {
    constructor(ctx, canvasSize, isJumping) {

        this.ctx = ctx
        this.canvasSize = canvasSize
        this.marioSpecs = {
            pos: { x: 0, y: this.canvasSize.h - 100 },
            size: { w: 100, h: 100 },
            vel: { x: 10, y: 180 }
        }
        this.marioInstance = undefined
        this.marioInstance2 = undefined
        this.lives = 3
        this.fluidRight = false
        this.fluidLeft = false
        this.gravity = 0
        this.isJumping = isJumping
        this.jumpType = true
        this.isOnPlatform = false
        this.isMoving = false
        this.isMovingRight = false
        this.isMovingLeft = false
        this.jumpingSound = new Audio('./audio/jumpSound.mp3')
        this.init()
    }

    init() {
        this.marioInstance = new Image()
        this.marioInstance.src = './img/player.png'
        this.marioInstance2 = new Image()
        this.marioInstance2.src = './img/player_2.png'
        this.marioInstance.frames = 3
        this.marioInstance.framesIndex = 0
        this.setListeners()
    }

    draw(frameIndex) {
        this.move()
        if (this.isMoving && this.isMovingRight) {
            this.ctx.drawImage(
                this.marioInstance,
                this.marioInstance.width / this.marioInstance.frames * this.marioInstance.framesIndex,
                0,
                this.marioInstance.width / this.marioInstance.frames,
                this.marioInstance.height,
                this.marioSpecs.pos.x,
                this.marioSpecs.pos.y,
                this.marioSpecs.size.w,
                this.marioSpecs.size.h
            )
            this.animate(frameIndex)

        }

        if (this.isMoving && this.isMovingLeft) {
            this.ctx.drawImage(
                this.marioInstance2,
                this.marioInstance2.width / this.marioInstance.frames * this.marioInstance.framesIndex,
                0,
                this.marioInstance2.width / this.marioInstance.frames,
                this.marioInstance2.height,
                this.marioSpecs.pos.x,
                this.marioSpecs.pos.y,
                this.marioSpecs.size.w,
                this.marioSpecs.size.h
            )
            this.animate(frameIndex)
        }

        if (!this.isMoving) {
            this.ctx.drawImage(
                this.marioInstance,
                this.marioInstance.width / this.marioInstance.frames * this.marioInstance.framesIndex,
                0,
                this.marioInstance.width / this.marioInstance.frames,
                this.marioInstance.height,
                this.marioSpecs.pos.x,
                this.marioSpecs.pos.y,
                this.marioSpecs.size.w,
                this.marioSpecs.size.h
            )

        }



    }
    animate(frameIndex) {
        if (frameIndex % 8 === 0) {
            this.marioInstance.framesIndex++
        }

        if (this.marioInstance.framesIndex >= this.marioInstance.frames) {
            this.marioInstance.framesIndex = 0
        }
    }


    move() {

        if (this.fluidLeft && 0 < this.marioSpecs.pos.x) {
            this.marioSpecs.pos.x -= this.marioSpecs.vel.x
        }
        if (this.fluidRight && this.canvasSize.w - this.marioSpecs.size.w > this.marioSpecs.pos.x) {
            this.marioSpecs.pos.x += this.marioSpecs.vel.x
        }

        this.marioSpecs.pos.y += this.gravity
    }

    jump() {
        console.log("JUMPTYPE DESDE PLAYER", this.jumpType)

        if (this.jumpType) {
            this.marioSpecs.pos.y -= this.marioSpecs.vel.y
            this.isJumping = false
            this.jumpingSound.play()
        } else {
            this.marioSpecs.pos.y -= 10
        }
    }

    setGravity() {
        this.gravity = 20
    }
    removeGravity() {
        this.gravity = 0
    }

    setListeners() {
        document.onkeydown = event => {
            const { key } = event
            if (key == 'ArrowLeft') {
                this.fluidLeft = true
                this.isMoving = true
                this.isMovingLeft = true
            }
            if (key == 'ArrowRight') {
                this.fluidRight = true
                this.isMoving = true
                this.isMovingRight = true
            }
            if (key == ' ') {
                // this.isMoving = true
                this.jump()
            }
        }
        document.onkeyup = event => {

            const { key } = event

            if (key == 'ArrowLeft') {
                this.fluidLeft = false
                this.isMoving = false
                this.isMovingLeft = false
            }
            if (key == 'ArrowRight') {
                this.fluidRight = false
                this.isMoving = false
                this.isMovingRight = false
            }
        }
    }
}
