import { createCanvas } from './dom'

const updateShapes = (canvas, shapes) => {
  return shapes.map((shape, i) => updateShape(
    canvas.layers[i],
    canvas.shapes[i],
    shape
  ))
}

const updateShape = (layer, oldShape, newShape) => {
  if (!oldShape) {
    return newShape.paint()
  }

  if (oldShape.needsRepaint(newShape)) {
    return newShape.paint()
  }

  if (oldShape.needsReposition(newShape)) {
    return { ctx: layer.ctx, x: newShape.x, y: newShape.y }
  }

  return layer
}


export class Canvas {
  constructor (width, height) {
    this._layers = []
    this._canvas = createCanvas(width, height)
    this._shapes = []
  }

  _merge () {
    this.ctx.clearRect(0, 0, this.width, this.height)

    this.layers.forEach(({ ctx, x, y }) => {
      this.ctx.drawImage(ctx.canvas, x, y)
    })
  }

  update (shapes) {
    this._layers = updateShapes(this, shapes)
    this._shapes = shapes
    this._merge()
  }

  get $canvas () {
    return this._canvas
  }

  get shapes () {
    return this._shapes
  }

  get ctx () {
    return this._canvas.getContext('2d')
  }

  get width () {
    return this._canvas.width
  }

  get height () {
    return this._canvas.height
  }

  get layers () {
    return this._layers
  }
}
