<template>
  <base-dialog :show="opened" title="Create new document">
    <div>
      <slot name="title"></slot>
    </div>
    <input-validation :emptyTitle="emptyTitle"></input-validation>
    <div class="buttons">
      <slot></slot>
    </div>
  </base-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import BaseDialog from './dialog.vue';
import InputValidation from '../inputs/input-validation.vue';

export default defineComponent({
  components: {
    BaseDialog,
    InputValidation,
  },

  props: {
    opened: {
      type: Boolean,
      required: true,
    },
    emptyTitle: {
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
