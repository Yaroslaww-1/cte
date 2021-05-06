<template>
  <Page>
    <h1>Documents</h1>
    <Document v-for="document in documents" :key="document.id" />
  </Page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import Page from '@components/page/page.vue';
import Document from './components/document.component.vue';
import { authVuexModule, documentsVuexModule } from '@src/vuex/store-accessor';
import { CreateDocumentRequest } from '@shared/request-response';

export default defineComponent({
  components: {
    Page,
    Document,
  },

  computed: {
    documents() {
      return documentsVuexModule.documents;
    },
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
