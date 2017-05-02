import { createContext } from '../dom'

export class Arc {
  constructor ({ x, y, radius, startAngle, endAngle, color }) {
    this.x = x
    this.y = y
    this.radius = radius
    this.startAngle = startAngle
    this.endAngle = endAngle
    this.color = color
  }

  needsRepaint (newShape) {
    return (
      this.radius !== newShape.radius ||
      this.startAngle !== newShape.startAngle ||
      this.endAngle !== newShape.endAngle ||
      this.color !== newShape.color
    )
  }

  needsReposition (newShape) {
    return (
      this.x !== newShape.x ||
      this.y !== newShape.y
    )
  }

  paint () {
    const radius = this.radius
    const diameter = radius * 2
    const ctx = createContext(diameter, diameter)

    // console.info('painting arc', this)

    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(radius, radius, radius, this.startAngle, this.endAngle)
    ctx.fill()

    return { ctx, x: this.x, y: this.y }
  }
}

