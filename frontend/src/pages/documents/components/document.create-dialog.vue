<template>
  <div>
    <create-dialog :opened="opened">
      <template v-slot:title>
        <input-validation
          v-model:inputData="title"
          :withLabel="true"
          label="Enter new document title"
          :validator="validator"
          :empty="empty"
          value="title"
        >
        </input-validation>
      </template>
      <link-button @click="createDocument">Create</link-button>
      <link-button @click="toggleCreateDialog">Close</link-button>
    </create-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { authVuexModule, documentsVuexModule, documentEditVuexModule } from '@src/vuex/store-accessor';
import CreateDialog from '@components/dialogs/create-dialog.vue';
import LinkButton from '@components/buttons/link-button.vue';
import getDateAndTime from '@src/date-time/dateAndTime';
import { DocumentDto } from '@shared/dto';
import { v4 as uuidv4 } from 'uuid';
import InputValidation from '@src/components/inputs/input-validation.vue';
import validator from '@src/validation/titleValidator';
import { CreateDocumentRequest } from '@shared/request-response';

export default defineComponent({
  props: {
    opened: {
      type: Boolean,
      required: true,
    },
  },

  components: {
    CreateDialog,
    LinkButton,
    InputValidation,
  },

  data() {
    return {
      title: '',
      inputData: '',
      empty: false,
    };
  },

  methods: {
    async createDocument(): Promise<void> {
      if (!this.title) {
        this.empty = true;
        return;
      }
      const id = uuidv4();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const currentUser = authVuexModule.currentUser!;
      const date = new Date();
      const document = await DocumentDto.new(DocumentDto, {
        id: id,
        title: this.title,
        user: currentUser,
        content: '',
        contributorsNames: [currentUser.name],
        createdDate: getDateAndTime(),
        modifiedDate: getDateAndTime(),
      });
      documentsVuexModule.addDocument(document);
      const createDocumentRequest = await CreateDocumentRequest.new(CreateDocumentRequest, {
        title: this.title,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        userId: authVuexModule.currentUser!.id,
        createdDate: date.toISOString(),
        modifiedDate: date.toISOString(),
      });
      await documentsVuexModule.createDocument(createDocumentRequest);
      this.toggleCreateDialog();
    },
    toggleCreateDialog(): void {
      this.empty = false;
      this.title = '';
      documentEditVuexModule.toggleDialog(['create', null]);
    },
    validator: validator,
  },
});
</script>

<style lang="scss" scoped>
input {
  width: 100%;
  height: 2.2rem;
  margin-top: 0.5rem;
  font-size: 1.2rem;
}
</style>
