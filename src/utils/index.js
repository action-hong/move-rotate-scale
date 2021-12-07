export function getFixPoint (state, dir) {
  const { x, y, width, height } = state
  if (dir === 'nw') {
    return {
      x: x + width,
      y: y + height
    }
  } else if (dir === 'ne') {
    return {
      x,
      y: y + height
    }
  } else if (dir === 'sw') {
    return {
      x: x + width,
      y
    }
  } else if (dir === 'se') {
    return {
      x,
      y
    }
  } else if (dir === 'n') {
    return {
      x: x + width / 2,
      y: y + height
    }
  } else if (dir === 's') {
    return {
      x: x + width / 2,
      y
    }
  } else if (dir === 'w') {
    return {
      x: x + width,
      y: y + height / 2
    }
  } else {
    return {
      x,
      y: y + height / 2
    }
  }
}
