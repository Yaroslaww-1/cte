<template>
  <div class="buttons">
    <IconButton
      v-for="(module, i) in modules"
      :key="module.title + i"
      :title="module.description"
      :IconComponent="module.IconComponent"
      :onClickAction="module.onClickAction"
    />
  </div>
  <div id="editor" contenteditable spellcheck="false" @input="this.update">{{ document?.content }}</div>
</template>

<script lang="ts">
/* eslint-disable import/no-webpack-loader-syntax */
import { defineComponent } from 'vue';
import { debounce } from 'ts-debounce';

import IconButton from '@src/components/buttons/icon-button.vue';
import bold from './modules/bold';
import italic from './modules/italic';

import PatchMakeWorker from 'worker-loader!./patch-make.worker';
import PatchApplyWorker from 'worker-loader!./patch-apply.worker';
import { UPDATE_DOCUMENT_CLIENT_EMIT_EVENT, UpdateDocumentClientEmitPayload } from '@shared/ws/emits-payload/document';
import { Ws } from '@src/api/ws.helper';
import { documentEditVuexModule } from '@src/vuex/store-accessor';

export default defineComponent({
  components: {
    IconButton,
  },

  data() {
    return {
      patchMakeWorker: new PatchMakeWorker(),
      patchApplyWorker: new PatchApplyWorker(),
      modules: [bold, italic],
      ws: new Ws('documents'),
    };
  },

  computed: {
    update(): unknown {
      return debounce(event => {
        this.patchMakeWorker.postMessage({ currentText: event.target.innerHTML });
      }, 500);
    },
    document() {
      return documentEditVuexModule.document;
    },
  },

  async mounted(): Promise<void> {
    const documentId: string = this.$route.params.documentId as string;

    await documentEditVuexModule.fetchDocument(documentId);
    this.patchMakeWorker.postMessage({ currentText: this.document?.content });

    this.patchMakeWorker.addEventListener('message', async e => {
      const payload = await UpdateDocumentClientEmitPayload.new(UpdateDocumentClientEmitPayload, {
        documentId,
        patchOperations: e.data,
      });
      this.ws.send(UPDATE_DOCUMENT_CLIENT_EMIT_EVENT, payload);
    });

    this.patchApplyWorker.addEventListener('message', function (e) {
      const editor = document.getElementById('editor');
      if (editor) editor.innerHTML = e.data;
      console.log('Patch by another user:');
      console.log(e.data);
    });
  },
});
</script>

<style lang="scss">
#editor {
  background-color: #1e2126;
  color: #abb2bf;
  min-height: calc(100vh - 51px);
  padding: 10px;
}
.buttons {
  display: flex;
  border: 1px solid grey;
}
</style>