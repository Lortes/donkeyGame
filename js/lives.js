class Lives {

    constructor(ctx, canvasSize, liveX, liveY, liveWidth, liveHeight) {

        this.ctx = ctx
        this.canvasSize = canvasSize

        this.liveSize = { w: liveWidth, h: liveHeight }
        this.livePos = { x: liveX, y: liveY }

        this.init()

    }

    init() {
        this.draw()
    }

    draw() {

        this.imageInstance = new Image()
        this.imageInstance.src = "./img/heart.png"
        this.ctx.drawImage(
            this.imageInstance, 
            this.livePos.x, 
            this.livePos.y, 
            this.liveSize.w, 
            this.liveSize.h
        )
    }


}