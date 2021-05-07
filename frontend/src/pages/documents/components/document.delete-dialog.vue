<template>
  <div>
    <delete-dialog :opened="opened">
      <link-button @click="deleteDocument">Ok</link-button>
      <link-button @click="toggle('')">Cancel</link-button>
    </delete-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { documentsVuexModule } from '@src/vuex/store-accessor';
import DeleteDialog from '@components/dialogs/delete-dialog.vue';
import LinkButton from '@components/buttons/link-button.vue';

export default defineComponent({
  props: {
    opened: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },

  components: {
    DeleteDialog,
    LinkButton,
  },

  data() {
    return {
      toggle: this.toggleDeleteDialog,
    };
  },

  methods: {
    deleteDocument(): void {
      this.toggle();
      const index = documentsVuexModule.documents.findIndex(value => value.id === this.id);
      documentsVuexModule.deleteDocument(index);
    },
  },

  inject: ['toggleDeleteDialog'],
});
</script>
