<template>
  <Page>
    <create-dialog :opened="createDialogOpened" :emptyTitle="emptyTitle">
      <template v-slot:title>
        <label for="document-title">Enter new document title</label>
        <input type="text" id="document-title" v-model="title" autocomplete="off" />
      </template>
      <base-button @click="createdDocument">Create</base-button>
      <base-button @click="toggleCreateDialog">Close</base-button>
    </create-dialog>
    <delete-dialog :opened="deleteDialogOpened">
      <base-button @click="deleteDocument">Ok</base-button>
      <base-button @click="toggleDeleteDialog">Cancel</base-button>
    </delete-dialog>
    <contributor-dialog :opened="contributorDialogOpened" :emptyUserName="emptyUserName">
      <template v-slot:userName>
        <label for="contributor-username">Enter contributor username</label>
        <input type="text" id="contributor-username" v-model="userName" autocomplete="off" />
      </template>
      <base-button @click="addContributor">Add</base-button>
      <base-button @click="toggleContributorDialog">Cancel</base-button>
    </contributor-dialog>
    <section>
      <base-card class="card">
        <base-button mode="flat" @click="toggleCreateDialog">Create</base-button>
        <h2 v-if="hasDocuments">Your documents</h2>
        <ul v-if="hasDocuments">
          <the-document v-for="document in documents" :key="document.id" :document="document">
            <base-button @click.prevent="toggleContributorDialog(document.id)">Add contributor</base-button>
            <base-button @click.prevent="toggleDeleteDialog(document.id)">Delete</base-button>
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
import { documentsVuexModule, authVuexModule } from '@src/vuex/store-accessor';
import { DocumentDto } from '@shared/dto';
import BaseButton from '@components/buttons/link-button.vue';
import BaseCard from '@components/cards/card.vue';
import CreateDialog from '@components/dialogs/create-dialog.vue';
import DeleteDialog from '@components/dialogs/delete-dialog.vue';
import ContributorDialog from '@components/dialogs/contributor-dialog.vue';

export default defineComponent({
  components: {
    Page,
    TheDocument,
    BaseButton,
    BaseCard,
    CreateDialog,
    DeleteDialog,
    ContributorDialog,
  },

  data() {
    return {
      createDialogOpened: false,
      title: '',
      emptyTitle: false,
      deleteDialogOpened: false,
      documentID: '',
      contributorDialogOpened: false,
      userName: '',
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
      if (!this.createDialogOpened) this.emptyTitle = false;
    },
    toggleDeleteDialog(id?: string): void {
      if (id) this.documentID = id;
      this.deleteDialogOpened = !this.deleteDialogOpened;
    },
    toggleContributorDialog(id?: string): void {
      if (id) this.documentID = id;
      this.contributorDialogOpened = !this.contributorDialogOpened;
      if (!this.contributorDialogOpened) this.emptyUserName = false;
    },
    createdDocument(): void | undefined {
      if (this.title === '') {
        this.emptyTitle = true;
        return;
      }
      this.emptyTitle = false;
      this.toggleCreateDialog();
      const id = this.createID();
      const currentUser = authVuexModule.currentUser;
      if (currentUser) {
        const document = {
          id: id,
          title: this.title,
          user: currentUser,
          contributors: [currentUser.name],
          createdDate: this.dateAndTime(),
          modifiedDate: this.dateAndTime(),
        };
        documentsVuexModule.createDocument(document);
      }
      this.title = '';
    },
    deleteDocument(): void {
      this.toggleDeleteDialog();
      const index = documentsVuexModule.documents.findIndex(value => value.id === this.documentID);
      documentsVuexModule.deleteDocument(index);
    },
    addContributor(): void | undefined {
      if (this.userName === '') {
        this.emptyUserName = true;
        return;
      }
      this.emptyUserName = false;
      this.toggleContributorDialog();
      const index = documentsVuexModule.documents.findIndex(value => value.id === this.documentID);
      documentsVuexModule.addContributor([index, this.userName]);
      this.changeModifiedDate(index);
      this.userName = '';
    },
    dateAndTime(): string {
      const date = new Date();
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      const hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
      const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
      const seconds = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
      return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
    },
    createID(): string {
      const sameTitle = this.documents.filter(value => value.title === this.title);
      if (!sameTitle.length) return this.title;
      else return `${this.title}${sameTitle.length + 1}`;
    },
    changeModifiedDate(index: number): void {
      const date = this.dateAndTime();
      documentsVuexModule.changeModifiedDate([index, date]);
    },
  },

  setup() {
    onMounted(() => {
      documentsVuexModule.fetchDocuments();
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

input {
  width: 100%;
  height: 2.2rem;
  margin-top: 0.5rem;
  font-size: 1.2rem;
}

.buttons {
  display: flex;
  flex-direction: row;
  margin-top: 0.8rem;
  margin-left: 24rem;
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
