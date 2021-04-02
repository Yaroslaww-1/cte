<template>
  <div>
    <Navbar />
    <h1>Welcome to CTE</h1>
  </div>
</template>

<script lang="ts">
import Navbar from '@components/navbar/navbar.vue';
export default {
  components: { Navbar },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 1rem;
}
</style>
