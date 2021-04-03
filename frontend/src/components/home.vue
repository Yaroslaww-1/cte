<template>
  <div>
    <the-header></the-header>
    <h1>Welcome to CTE</h1>
  </div>
</template>

<script lang="ts">
import TheHeader from './navbar/navbar.vue';
export default {
  components: { TheHeader },
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  margin-top: 1rem;
}
</style>
