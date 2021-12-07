<template>
  <div
    ref="el"
    class="control-point-wrapper"
    :style="myStyle"
    @mousedown="handleMove"
  >
      <span @mousedown.stop="handleCircle" class="iconfont icon-xiangyouxuanzhuan"></span>
      <div class="point"
        v-for="(point) in points"
        :key="point"
        :style="getPointStyle(point)"
        @mousedown.stop="e => handleScale(e, point)"
      ></div>
    <slot></slot>
  </div>
</template>

<script setup>
import { reactive, computed, ref, defineProps } from 'vue'
import { calcPointInLine, getFixPoint, rotate } from '../utils'

const el = ref()

const props = defineProps({
  useProportion: {
    type: Boolean,
    default: false
  }
})

const points = [
  'n',
  'ne',
  'e',
  'se',
  's',
  'sw',
  'w',
  'nw'
]

const getPointStyle = (name) => {
  const style = {}

  if (name.includes('n')) {
    style.top = '-5px'
  }
  if (name.includes('s')) {
    style.bottom = '-5px'
  }
  if (name.includes('w')) {
    style.left = '-5px'
  }
  if (name.includes('e')) {
    style.right = '-5px'
  }

  if (name === 'n' || name === 's') {
    style.left = '50%'
    style.transform = 'translateX(-50%)'
  } else if (name === 'e' || name === 'w') {
    style.top = '50%'
    style.transform = 'translateY(-50%)'
  }

  return style
}

const state = reactive({
  width: 100,
  height: 100,
  x: 100,
  y: 100,
  rotate: 0
})

const myStyle = computed(() => {
  return {
    width: `${state.width}px`,
    height: `${state.height}px`,
    top: `${state.y}px`,
    left: `${state.x}px`,
    transform: `rotate(${state.rotate}deg)`
  }
})

const handleMove = (e) => {
  const startX = e.pageX - state.x
  const startY = e.pageY - state.y

  const move = (e) => {
    state.x = e.pageX - startX
    state.y = e.pageY - startY
  }

  const up = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}

const handleCircle = (e) => {
  const rect = el.value.getBoundingClientRect()
  const center = {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  }
  const startRotate = state.rotate

  const startX = e.pageX - center.x
  const startY = e.pageY - center.y
  // 首次点击的角度值
  const before = Math.atan2(startY, startX) * 180 / Math.PI
  const move = (e) => {
    const currentX = e.pageX - center.x
    const currentY = e.pageY - center.y

    const after = Math.atan2(currentY, currentX) * 180 / Math.PI
    state.rotate = startRotate + after - before
  }

  const up = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}

const handleScale = (e, dir) => {
  const rect = el.value.parentElement.getBoundingClientRect()
  const centerPoint = {
    x: state.x + state.width / 2,
    y: state.y + state.height / 2
  }
  const fixPoint = rotate(getFixPoint(state, dir), centerPoint, -state.rotate)
  const move = (e) => {
    let current = {
      x: e.pageX - rect.left,
      y: e.pageY - rect.top
    }

    if (dir.length === 1 || props.useProportion) {
      current = calcPointInLine(current, fixPoint, centerPoint)
    }

    const newCenterPoint = {
      x: (current.x + fixPoint.x) / 2,
      y: (current.y + fixPoint.y) / 2
    }

    const beforeRotateFixPoint = rotate(fixPoint, newCenterPoint, state.rotate)
    const beforeRotateCurrentPoint = rotate(current, newCenterPoint, state.rotate)

    if (dir !== 's' && dir !== 'n') {
      state.width = Math.abs(beforeRotateFixPoint.x - beforeRotateCurrentPoint.x)
      state.x = Math.min(beforeRotateFixPoint.x, beforeRotateCurrentPoint.x)
    } else {
      state.x = beforeRotateFixPoint.x - state.width / 2
    }

    if (dir !== 'w' && dir !== 'e') {
      state.height = Math.abs(beforeRotateFixPoint.y - beforeRotateCurrentPoint.y)
      state.y = Math.min(beforeRotateFixPoint.y, beforeRotateCurrentPoint.y)
    } else {
      state.y = beforeRotateFixPoint.y - state.height / 2
    }
  }

  const up = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}

</script>

<style scoped>
.control-point-wrapper {
  position: absolute;
}

.active {
  outline: 1px solid #00EEFF;
}

.point {
  position: absolute;
  width: 10px;
  height: 10px;
  border: 1px solid #00EEFF;
  background: #fff;
  border-radius: 5px;
  z-index: 1;
}

.iconfont {
  position: absolute;
  top: 0;
  height: 20px;
  width: 20px;
  left: 50%;
  transform: translate(-10px, -30px);
  cursor: grab;
  color: #00EEFF;
}
</style>
