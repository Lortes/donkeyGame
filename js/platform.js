class Platform {
    constructor(ctx, canvasSize, posPlatformX, posPlatformY) {
        this.ctx = ctx
        this.canvasSize = canvasSize

        this.platformSpecs = {
            pos: { x: posPlatformX, y: posPlatformY },
            size: { w: this.canvasSize.w - 350, h: 40 }
        }
    }


    draw() {

        this.imageInstance = new Image()
        this.imageInstance.src = './img/platform.png'

        this.ctx.drawImage(
            this.imageInstance,
            this.platformSpecs.pos.x,
            this.platformSpecs.pos.y,
            this.platformSpecs.size.w,
            this.platformSpecs.size.h  
        )
       // this.ctx.fillStyle = "black",
            // this.ctx.fillRect(
            //     this.platformSpecs.pos.x,
            //     this.platformSpecs.pos.y,
            //     this.platformSpecs.size.w,
            //     this.platformSpecs.size.h
            // )
    }
}