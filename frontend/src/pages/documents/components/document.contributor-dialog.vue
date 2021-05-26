<template>
  <div>
    <contributor-dialog :opened="opened">
      <template v-slot:userName>
        <input-validation
          v-model:inputData="userName"
          :withLabel="true"
          label="Enter contributor username"
          :validator="validator"
          :empty="empty"
          value="userName"
        >
        </input-validation>
      </template>
      <link-button @click="addContributor">Add</link-button>
      <link-button @click="toggleContributorDialog">Cancel</link-button>
    </contributor-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { documentEditVuexModule } from '@src/vuex/store-accessor';
import ContributorDialog from '@components/dialogs/contributor-dialog.vue';
import LinkButton from '@components/buttons/link-button.vue';
import InputValidation from '@src/components/inputs/input-validation.vue';
import validator from '@src/shared-frontend/validation/userNameValidator';

export default defineComponent({
  props: {
    opened: {
      type: Boolean,
      required: true,
    },
  },

  components: {
    ContributorDialog,
    LinkButton,
    InputValidation,
  },

  data() {
    return {
      userName: '',
      inputData: '',
      empty: false,
    };
  },

  methods: {
    addContributor(): void | undefined {
      if (!this.userName) {
        this.empty = true;
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const document = documentEditVuexModule.document!;
      documentEditVuexModule.addContributor([document, this.userName]);
      this.toggleContributorDialog();
    },
    toggleContributorDialog(): void {
      this.empty = false;
      this.userName = '';
      documentEditVuexModule.toggleDialog(['contributor', null]);
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
