<template>
  <div>
    <delete-dialog :opened="opened">
      <link-button @click="deleteDocument">Ok</link-button>
      <link-button @click="toggleDeleteDialog">Cancel</link-button>
    </delete-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { documentsVuexModule, documentEditVuexModule } from '@src/vuex/store-accessor';
import DeleteDialog from '@components/dialogs/delete-dialog.vue';
import LinkButton from '@components/buttons/link-button.vue';
import { DocumentDto } from '@shared/dto';

export default defineComponent({
  props: {
    opened: {
      type: Boolean,
      required: true,
    },
  },

  components: {
    DeleteDialog,
    LinkButton,
  },

  methods: {
    deleteDocument(): void {
      this.toggleDeleteDialog();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const document = documentEditVuexModule.document!;
      const index = documentsVuexModule.documents.findIndex((value: DocumentDto) => value.id === document.id);
      documentsVuexModule.deleteDocument(index);
    },
    toggleDeleteDialog() {
      documentEditVuexModule.toggleDialog(['delete', null]);
    },
  },
});
</script>
