export const createCanvas = (width, height) => {
  const canvas = document.createElement('canvas')

  canvas.width = width
  canvas.height = height

  return canvas
}

export const createContext = (width, height) => {
  return createCanvas(width, height).getContext('2d')
}
