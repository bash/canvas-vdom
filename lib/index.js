import { Rect } from './shape/rect'
import { Arc } from './shape/arc'
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

class Canvas {
  constructor (width, height) {
    this._layers = []
    this._canvas = createCanvas(width, height)
    this._shapes = []
  }

  _compose () {
    this.ctx.clearRect(0, 0, this.width, this.height)

    this.layers.forEach(({ ctx, x, y }) => {
      this.ctx.drawImage(ctx.canvas, x, y)
    })
  }

  update (shapes) {
    // console.info('updating')
    this._layers = updateShapes(this, shapes)
    this._shapes = shapes
    this._compose()
  }

  get canvas () {
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

const getShapes = (count = 0) => {
  const shapes = []

  for (let i = 0; i < count; i++) {
    shapes.push(new Rect({ x: i, y: i, width: 2, height: 2, color: '#0f0' }))
  }

  if (count >= 50) {
    shapes.push(new Rect({ x: 100, y: 200, width: 100, height: 100, color: '#00f' }))
  }

  if (count >= 20) {
    shapes.push(new Arc({ x: 760, y: 760, radius: 20, startAngle: 0, endAngle: 2 * Math.PI, color: '#0ff' }))
  }

  if (count > 20) {
    for (let i = 0; i < (count - 20); i++) {
      shapes.push(new Rect({ x: (800 - i), y: i, width: 2, height: 2, color: '#f0f' }))
    }
  }

  return shapes
}

const canvas = new Canvas(800, 800)

window.__canvas = canvas

document.body.appendChild(canvas.canvas)

let count = 1
let interval

canvas.update(getShapes())

interval = window.setInterval(() => {
  count += 1
  canvas.update(getShapes(count))

  if (count > 700) {
    window.clearInterval(interval)
  }
}, 60)
