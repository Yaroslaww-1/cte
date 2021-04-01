<template>
<div>
  <the-header></the-header>
  <h1>Welcome to CTE</h1>
</div>
</template>

<script>

import TheHeader from './TheHeader.vue'
export default {
  components: { TheHeader },
}
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 1rem;
}
</style>
