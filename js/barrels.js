class Barrell {
    constructor(ctx, canvasSize, posBarrellX, posBarrellY) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.barrellSpecs = {
            pos: { x: posBarrellX, y: posBarrellY },
            size: { w: 100, h: 100 }
        }
        this.barrellInstance = undefined
        this.speed = 10
        this.init()
    }

    init() {
        this.barrellInstance = new Image()
        this.barrellInstance.src = './img/barrelsImage.png'
        this.barrellInstance.frames = 4
        this.barrellInstance.framesIndex = 0;
    }

    draw(frameIndex) {
      
        this.ctx.drawImage(
            this.barrellInstance,
            this.barrellInstance.width / this.barrellInstance.frames * this.barrellInstance.framesIndex,
            0,
            this.barrellInstance.width / this.barrellInstance.frames,
            this.barrellInstance.height,
            this.barrellSpecs.pos.x,
            this.barrellSpecs.pos.y,
            this.barrellSpecs.size.w,
            this.barrellSpecs.size.h
        )

        this.move()
        this.animate(frameIndex)
    }
    animate(frameIndex){
        if(frameIndex % 12 === 0){
            this.barrellInstance.framesIndex++
        }
        if (this.barrellInstance.framesIndex >= this.barrellInstance.frames){
            this.barrellInstance.framesIndex = 0
        }
    }
    
    move() {
        this.barrellSpecs.pos.y += this.speed
    }
}