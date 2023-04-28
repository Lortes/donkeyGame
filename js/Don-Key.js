class Don {
    constructor(ctx, canvasSize, donWidth, donHeight, donX, donY) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.donSize = {
            w: donWidth,
            h: donHeight,
        }
        this.donPos = {
            x: donX,
            y: donY
        }
        this.donVel = {
            x: 5, y: 0
        }
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = './img/donkeyMove.png'
        this.imageInstance.frames = 3
        this.imageInstance.framesIndex = 0
    }

    draw(frameIndex) {

        this.ctx.drawImage(
            this.imageInstance,
            this.imageInstance.width / this.imageInstance.frames * this.imageInstance.framesIndex,
            0,
            this.imageInstance.width / this.imageInstance.frames,
            this.imageInstance.height,
            this.donPos.x,
            this.donPos.y,
            this.donSize.w,
            this.donSize.h
            )
            
            this.move()
            
            this.animate(frameIndex)


    }

        animate(frameIndex){
         if(frameIndex % 20 === 0){
            this.imageInstance.framesIndex++
         }

         if(this.imageInstance.framesIndex >= this.imageInstance.frames){
            this.imageInstance.framesIndex = 0
         }
    }


    move() {
        if (this.donPos.x + this.donSize.w > 1200) {
            this.donVel.x *= -1
        }
        if (this.donPos.x < 10) {
            this.donVel.x *= -1
        }
        this.donPos.x += this.donVel.x
    }
}
