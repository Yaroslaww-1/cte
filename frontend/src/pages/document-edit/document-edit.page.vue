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
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { defineComponent } from 'vue';
import { debounce } from 'ts-debounce';

import IconButton from '@src/components/buttons/icon-button.vue';
import bold from './modules/bold';
import italic from './modules/italic';

import PatchMakeWorker from 'worker-loader!./patch-make.worker';
import PatchApplyWorker from 'worker-loader!./patch-apply.worker';
import {
  UPDATE_DOCUMENT_CLIENT_SERVER_EMIT_EVENT,
  UpdateDocumentClientServerEmitPayload,
  START_EDITING_DOCUMENT_CLIENT_EMIT_EVENT,
  StartEditingDocumentClientEmitPayload,
} from '@shared/ws/emits-payload/document';
import { Ws } from '@src/api/ws.helper';
import { documentEditVuexModule, authVuexModule } from '@src/vuex/store-accessor';

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
      textAfterLastUpdate: document.getElementById('editor')?.innerHTML || '',
    };
  },

  computed: {
    update(): unknown {
      return debounce(event => {
        this.patchMakeWorker.postMessage({ oldText: this.textAfterLastUpdate, currentText: event.target.innerHTML });
        this.textAfterLastUpdate = document.getElementById('editor')?.innerHTML || '';
      }, 100);
    },
    document() {
      return documentEditVuexModule.document;
    },
  },

  methods: {
    async initializeWebsocket({ userId, documentId }: { userId: string; documentId: string }): Promise<void> {
      const payload = await StartEditingDocumentClientEmitPayload.new(StartEditingDocumentClientEmitPayload, {
        userId,
        documentId,
      });
      this.ws.send(START_EDITING_DOCUMENT_CLIENT_EMIT_EVENT, payload);
      this.ws.registerListener<UpdateDocumentClientServerEmitPayload>(
        UPDATE_DOCUMENT_CLIENT_SERVER_EMIT_EVENT,
        payload => {
          this.patchApplyWorker.postMessage({
            currentText: this.textAfterLastUpdate,
            patchOperations: payload.patchOperations,
          });
        },
        documentId,
      );
    },
  },

  async mounted(): Promise<void> {
    const documentId = this.$route.params.documentId as string;
    const userId = authVuexModule.currentUser!.id;

    await documentEditVuexModule.fetchDocument(documentId);

    this.initializeWebsocket({ userId, documentId });

    this.textAfterLastUpdate = this.document?.content || '';

    this.patchMakeWorker.addEventListener('message', async e => {
      const payload = await UpdateDocumentClientServerEmitPayload.new(UpdateDocumentClientServerEmitPayload, {
        userId,
        documentId,
        patchOperations: e.data,
      });
      this.ws.send(UPDATE_DOCUMENT_CLIENT_SERVER_EMIT_EVENT, payload);
    });

    this.patchApplyWorker.addEventListener('message', async e => {
      const editor = document.getElementById('editor');
      if (editor) {
        editor.innerHTML = e.data;
      }
      this.textAfterLastUpdate = e.data;
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
