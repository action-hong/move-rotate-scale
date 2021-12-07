<template>
  <div id="app">
    <label for="useProportion">按比例缩放</label>
    <input type="checkbox" id="useProportion" v-model="useProportion">
    <control-point
      :use-proportion="useProportion">
      <rectangle />
    </control-point>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ControlPoint from './components/ControlPoint.vue'
import Rectangle from './components/Rectangle.vue'

const useProportion = ref(false)
</script>

<style>
#app {
  width: 80vw;
  height: 80vh;
  border: 1px solid black;
  margin: auto;
  position: relative;
}

* {
  box-sizing: border-box;
}
</style>
