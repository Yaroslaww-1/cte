<template>
  <base-dialog :show="opened" title="Add contributor">
    <div>
      <slot name="userName"></slot>
    </div>
    <p v-if="emptyUserName">Incorrect user name. Please, enter the valid one.</p>
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
    emptyUserName: {
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
  margin-left: 24.8rem;
  margin-bottom: -2rem;
}
</style>
