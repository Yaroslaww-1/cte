<template>
  <Page>
    <create-dialog :opened="createDialogOpened" :id="documentID" :empty="emptyTitle"></create-dialog>
    <delete-dialog :opened="deleteDialogOpened" :id="documentID"></delete-dialog>
    <contributor-dialog :opened="contributorDialogOpened" :id="documentID" :empty="emptyUserName"></contributor-dialog>
    <section>
      <base-card class="card">
        <link-button mode="flat" @click="toggleCreateDialog">Create</link-button>
        <h2 v-if="hasDocuments">Your documents</h2>
        <ul v-if="hasDocuments">
          <the-document v-for="document in documents" :key="document.id" :document="document">
            <link-button @click.prevent="toggleContributorDialog(document.id)">Add contributor</link-button>
            <link-button @click.prevent="toggleDeleteDialog(document.id)">Delete</link-button>
          </the-document>
        </ul>
        <h2 v-else>You have no documents yet</h2>
      </base-card>
    </section>
  </Page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import Page from '@components/page/page.vue';
import TheDocument from './components/document.component.vue';
import { authVuexModule, documentsVuexModule } from '@src/vuex/store-accessor';
import { CreateDocumentRequest } from '@shared/request-response';
import { DocumentDto } from '@shared/dto';
import LinkButton from '@components/buttons/link-button.vue';
import BaseCard from '@components/cards/card.vue';
import CreateDialog from './components/document.create-dialog.vue';
import DeleteDialog from './components/document.delete-dialog.vue';
import ContributorDialog from './components/document.contributor-dialog.vue';

export default defineComponent({
  components: {
    Page,
    TheDocument,
    LinkButton,
    BaseCard,
    CreateDialog,
    DeleteDialog,
    ContributorDialog,
  },

  data() {
    return {
      createDialogOpened: false,
      emptyTitle: false,
      deleteDialogOpened: false,
      documentID: '',
      contributorDialogOpened: false,
      emptyUserName: false,
    };
  },

  computed: {
    documents(): DocumentDto[] {
      return documentsVuexModule.documents;
    },
    hasDocuments(): number {
      return documentsVuexModule.documents.length;
    },
  },

  methods: {
    toggleCreateDialog(): void {
      this.createDialogOpened = !this.createDialogOpened;
    },
    toggleDeleteDialog(id?: string): void {
      if (id) this.documentID = id;
      this.deleteDialogOpened = !this.deleteDialogOpened;
    },
    toggleContributorDialog(id?: string): void {
      if (id) this.documentID = id;
      this.contributorDialogOpened = !this.contributorDialogOpened;
    },
  },

  provide() {
    return {
      toggleCreateDialog: this.toggleCreateDialog,
      toggleDeleteDialog: this.toggleDeleteDialog,
      toggleContributorDialog: this.toggleContributorDialog,
    };
  },

  setup() {
    onMounted(async () => {
      // await documentsVuexModule.fetchDocuments();
      // Code below is only for testing purposes
      const createDocumentRequest = await CreateDocumentRequest.new(CreateDocumentRequest, {
        title: 'random title',
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        userId: authVuexModule.currentUser!.id,
      });
      const document = await documentsVuexModule.createDocument(createDocumentRequest);
      console.log(`Created document: ${JSON.stringify(document)}`);
    });
  },
});
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

h2 {
  text-align: center;
  margin-top: 0.5rem;
}

.card {
  text-align: left;
  color: #000;
}
</style>
