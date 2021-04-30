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
import { documentsVuexModule } from '@src/vuex/store-accessor';

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
    onMounted(() => {
      documentsVuexModule.fetchDocuments();
    });
  },
});
</script>
