<template>
  <base-dialog :show="opened" title="Create new document">
    <div>
      <slot name="title"></slot>
    </div>
    <p v-if="emptyTitle">Document cannot be untitled. Please, enter the title.</p>
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
    emptyTitle: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    // addDocument() {
    //   documentsVuexModule.createDocument();
    // },
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
