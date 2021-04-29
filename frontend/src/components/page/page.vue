<template>
  <div>
    <Navbar />
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Navbar from '@components/navbar/navbar.vue';

export default defineComponent({
  components: {
    Navbar,
  },
});
</script>
