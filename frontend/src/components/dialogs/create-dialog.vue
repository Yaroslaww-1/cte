<template>
  <base-dialog :show="opened" title="Create new document">
    <div>
      <slot name="title"></slot>
    </div>
    <div class="buttons">
      <slot></slot>
    </div>
  </base-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import BaseDialog from './dialog.vue';

export default defineComponent({
  components: {
    BaseDialog,
  },

  props: {
    opened: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.buttons {
  border: none;
  margin-top: 1rem;
  margin-bottom: -2rem;
  margin-left: 24rem;
}
</style>
