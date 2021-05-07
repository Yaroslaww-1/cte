<template>
  <div>
    <contributor-dialog :opened="opened" :emptyUserName="emptyUserName">
      <template v-slot:userName>
        <label for="contributor-username">Enter contributor username</label>
        <input type="text" id="contributor-username" v-model="userName" autocomplete="off" />
      </template>
      <link-button @click="addContributor">Add</link-button>
      <link-button @click="toggle('')" v-on:click="hideMessage">Cancel</link-button>
    </contributor-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { documentsVuexModule, documentEditVuexModule } from '@src/vuex/store-accessor';
import ContributorDialog from '@components/dialogs/contributor-dialog.vue';
import LinkButton from '@components/buttons/link-button.vue';
import changeModifiedDate from '@src/date-time/changeModifiedDate';

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
    ContributorDialog,
    LinkButton,
  },

  data() {
    return {
      userName: '',
      emptyUserName: this.empty,
      toggle: this.toggleContributorDialog,
    };
  },

  methods: {
    addContributor(): void | undefined {
      if (this.userName === '') {
        this.emptyUserName = true;
        return;
      }
      this.emptyUserName = false;
      this.toggle();
      const document = documentsVuexModule.documents.find(value => value.id === this.id);
      if (document) {
        documentEditVuexModule.addContributor([document, this.userName]);
        changeModifiedDate(document);
      }
      this.userName = '';
    },
    hideMessage() {
      if (this.emptyUserName) this.emptyUserName = false;
      if (this.userName) this.userName = '';
    },
  },

  inject: ['toggleContributorDialog'],
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
