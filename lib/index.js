import { Rect } from './shape/rect'
import { Arc } from './shape/arc'
import { Canvas } from './canvas'

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

document.body.appendChild(canvas.$canvas)

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
