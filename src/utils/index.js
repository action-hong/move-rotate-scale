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

export function rotate (point, centerPoint, angle) {
  const sin = Math.sin(angle * Math.PI / 180)
  const cos = Math.cos(angle * Math.PI / 180)
  const x = point.x - centerPoint.x
  const y = point.y - centerPoint.y
  const x1 = x * cos + y * sin
  const y1 = -x * sin + y * cos
  return {
    x: x1 + centerPoint.x,
    y: y1 + centerPoint.y
  }
}

/**
 * 过点point 做垂线交AB于点C，返回点C
 * @param point
 * @param A
 * @param B
 * @returns
 */
export function calcPointInLine (point, A, B) {
  // 计算点到某条直线上的垂直点
  const x0 = point.x
  const y0 = point.y
  const x1 = A.x
  const y1 = A.y
  const x2 = B.x
  const y2 = B.y
  console.log(point, A, B)
  if (x1 === x2) {
    return {
      x: x1,
      y: y0
    }
  } else if (y1 === y2) {
    return {
      x: x0,
      y: y1
    }
  }

  const k = (y2 - y1) / (x2 - x1)
  const x = (k * k * x1 + k * (y0 - y1) + x0) / (k * k + 1)
  const y = k * (x - x1) + y1
  return {
    x,
    y
  }
}

const dirs = [
  'n',
  'ne',
  'e',
  'se',
  's',
  'sw',
  'w',
  'nw'
]

export function getCursor (dir, angle) {
  const index = dirs.indexOf(dir)
  angle += index * 45
  const i = Math.round(angle / 45) % 8
  return dirs[i] + '-resize'
}
