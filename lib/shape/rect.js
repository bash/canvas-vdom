import { createContext } from '../dom'

export class Rect {
  constructor ({ x, y, width, height, color }) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
  }

  needsRepaint (newRect) {
    return (
      this.width !== newRect.width ||
      this.height !== newRect.height ||
      this.color !== newRect.color
    )
  }

  needsReposition (newRect) {
    return (
      this.x !== newRect.x ||
      this.y !== newRect.y
    )
  }

  paint () {
    // console.info('painting rect', this)

    const ctx = createContext(this.width, this.height)

    ctx.fillStyle = this.color
    ctx.fillRect(0, 0, this.width, this.height)

    return { ctx, x: this.x, y: this.y }
  }
}

