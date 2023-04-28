class Princess {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.princessSize = {
            w: 120,
            h: 100,
        }
        this.princessPos = {
            x: 1050,
            y: 180
        }
        this.init()
    }
    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = './img/princessMove.png'
        this.imageInstance.frames = 5
        this.imageInstance.framesIndex = 0
    }
    draw(frameIndex) {
        this.ctx.drawImage(
            this.imageInstance,
            this.imageInstance.width / this.imageInstance.frames * this.imageInstance.framesIndex,
            0,
            this.imageInstance.width / this.imageInstance.frames,
            this.imageInstance.height,
            this.princessPos.x,
            this.princessPos.y,
            this.princessSize.w,
            this.princessSize.h)

        this.animate(frameIndex)
    }

    animate(frameIndex) {
        if (frameIndex % 20 === 0) {
            this.imageInstance.framesIndex++
        }

        if (this.imageInstance.framesIndex >= this.imageInstance.frames) {
            this.imageInstance.framesIndex = 0
        }
    }
}