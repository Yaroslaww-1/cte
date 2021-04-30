<template>
  <span class="badge">
    {{ contributor }}
  </span>
</template>

<script>
export default {
  props: ['contributor'],
}
</script>

<style lang="scss" scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}
</style>
