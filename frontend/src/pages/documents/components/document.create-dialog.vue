<template>
  <div>
    <create-dialog :opened="opened" :emptyTitle="emptyTitle">
      <template v-slot:title>
        <label for="document-title">Enter new document title</label>
        <input type="text" id="document-title" v-model="title" autocomplete="off" />
      </template>
      <link-button @click="createdDocument">Create</link-button>
      <link-button @click="toggleCreateDialog('')" v-on:click="hideMessage">Close</link-button>
    </create-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { authVuexModule, documentsVuexModule } from '@src/vuex/store-accessor';
import CreateDialog from '@components/dialogs/create-dialog.vue';
import LinkButton from '@components/buttons/link-button.vue';
import dateAndTime from '@src/date-time/dateAndTime';

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
    empty: {
      type: Boolean,
      required: true,
    },
  },

  components: {
    CreateDialog,
    LinkButton,
  },

  data() {
    return {
      title: '',
      emptyTitle: this.empty,
      toggle: this.toggleCreateDialog,
    };
  },

  methods: {
    createdDocument(): void | undefined {
      if (this.title === '') {
        this.emptyTitle = true;
        return;
      }
      this.emptyTitle = false;
      this.toggle();
      const id = this.createID();
      const currentUser = authVuexModule.currentUser;
      if (currentUser) {
        const document = {
          id: id,
          title: this.title,
          user: currentUser,
          content: '',
          contributorsNames: [currentUser.name],
          createdDate: dateAndTime(),
          modifiedDate: dateAndTime(),
        };
        documentsVuexModule.addDocument(document);
      }
      this.title = '';
    },
    createID(): string {
      const sameTitle = documentsVuexModule.documents.filter(value => value.title === this.title);
      if (!sameTitle.length) return this.title;
      else return `${this.title}${sameTitle.length + 1}`;
    },
    hideMessage() {
      if (this.emptyTitle) this.emptyTitle = false;
      if (this.title) this.title = '';
    },
  },

  inject: ['toggleCreateDialog'],
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
