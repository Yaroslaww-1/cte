<template>
  <span class="badge">
    {{ contributorName }}
  </span>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    contributorName: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.6rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}
</style>
