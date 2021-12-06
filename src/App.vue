<template>
  <div id="app">
    <control-point>
      <rectangle />
    </control-point>
  </div>
</template>

<script setup>
import ControlPoint from './components/ControlPoint.vue'
import Rectangle from './components/Rectangle.vue'
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
