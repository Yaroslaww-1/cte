<template>
  <div>
    <base-dialog :show="createDialogOpened" fixed title="Create new document">
    <div>
      <label for="document-title">Enter new document title</label>
      <input type="text" id="document-title" v-model="title" autocomplete="off">
    </div>
    <p v-if="emptyTitle">Document cannot be untitled. Please, enter the title.</p>
    <div class="buttons">
      <base-button @click="createdDocument">Create</base-button>
      <base-button @click="toggleCreateDialog">Close</base-button>
    </div>
    </base-dialog>
    <base-dialog :show="deleteDialogOpened" fixed title="Delete Confirmation">
      <p>This document will be permanently deleted</p>
      <div class="buttons">
        <base-button @click="deleteDocument">Ok</base-button>
        <base-button @click="toggleDeleteDialog">Cancel</base-button>
      </div>
    </base-dialog>
    <base-dialog :show="contributorDialogOpened" fixed title="Add contributor">
      <div>
        <label for="contributor-username">Enter contributor username</label>
        <input type="text" id="contributor-username" v-model="userName" autocomplete="off">
      </div>
      <p v-if="emptyUserName">Incorrect user name. Please, enter the valid one.</p>
      <div class="buttons add-button">
        <base-button @click="addContributor">Add</base-button>
        <base-button @click="toggleContributorDialog">Cancel</base-button>
      </div>
    </base-dialog>
    <div>
      <section>
        <base-card>
          <base-button mode="flat" @click="toggleCreateDialog">Create</base-button>
          <ul v-if="hasDocuments">
            <document-item 
              v-for="document in documents"
              :key="document.id"
              :id="document.id"
              :title="document.title"
              :contributors="document.contributors"
              :created-date="document.createdDate"
              :modified-date="document.modifiedDate"
            >
            <base-button @click.prevent="toggleContributorDialog(document.id)">Add contributor</base-button>
            <base-button @click.prevent="toggleDeleteDialog(document.id)">Delete</base-button> 
            </document-item>
          </ul>
          <h2 v-else>You have no documents yet</h2>
        </base-card>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import DocumentItem from '../../components/documents/document-item.vue';
import BaseCard from '../../components/cards/card.vue';
import BaseButton from '../../components/buttons/link-button.vue';
import BaseDialog from '../../components/dialogs/dialog.vue';

export default {
  components: {
    DocumentItem,
    BaseCard,
    BaseButton,
    BaseDialog,
  },
  data(): { [prop: string]: any } {
    return {
      createDialogOpened: false,
      title: '',
      deleteDialogOpened: false,
      documentID: '',
      contributorDialogOpened: false,
      userName: '',
      emptyTitle: false,
      emptyUserName: false,
    };
  },
  computed: {
    documents(): { [prop: string]: string | string[] } {
      return this.$store.getters['documents/documents'];
    },
    hasDocuments(): boolean {
      return this.$store.getters['documents/hasDocuments'];
    },
  },
  methods: {
    toggleCreateDialog(): void {
      this.createDialogOpened = !this.createDialogOpened;
    },
    toggleDeleteDialog(id: string = ''): void {
      if (id) this.documentID = id;
      this.deleteDialogOpened = !this.deleteDialogOpened;
    },
    toggleContributorDialog(id: string = ''): void {
      if (id) this.documentID = id;
      this.contributorDialogOpened = !this.contributorDialogOpened;
    },
    createdDocument(): void | undefined {
      if (this.title === '') {
        this.emptyTitle = true;
        return;
      }
      this.emptyTitle = false;
      this.toggleCreateDialog();
      const id = this.createID();
      const document = {
        id: id,
        title: this.title,
        contributors: [this.$store.getters['auth/userName']],
        createdDate: this.dateAndTime(),
        modifiedDate: this.dateAndTime(),
      };
      this.$store.dispatch('documents/createDocument', document);
      this.title = '';
    },
    deleteDocument(): void {
      this.toggleDeleteDialog();
      const index = this.$store.getters['documents/documents']
        .findIndex(value => value.id === this.documentID);
      this.$store.dispatch('documents/deleteDocument', index);
    },
    addContributor(): void | undefined {
      if (this.userName === '') {
        this.emptyUserName = true;
        return;
      }
      this.emptyUserName = false;
      this.toggleContributorDialog();
      const index = this.$store.getters['documents/documents']
        .findIndex(value => value.id === this.documentID);
      this.$store.dispatch('documents/addContributor', [index, this.userName]);
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
      const sameTitle = this.$store.getters['documents/documents']
        .filter(value => value.title === this.title);
      if (!sameTitle.length) return this.title;
      else return `${this.title}${sameTitle.length + 1}`;
    },
    changeModifiedDate(index: number): void {
      const date = this.dateAndTime();
      this.$store.dispatch('documents/changeModifiedDate', [index, date]);
    }
  },
}
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

.add-button {
  margin-left: 24.8rem;
}

h2 {
  text-align: center;
}
</style>