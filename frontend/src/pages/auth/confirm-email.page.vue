<template>
  <Page>
    <h1>Confrim email</h1>
    <button @click="onConfirmEmail">Confrim email</button>
  </Page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Page from '@components/page/page.vue';
import { authVuexModule } from '@src/vuex/store-accessor';
import { ConfirmEmailRequest } from '@shared/request-response';

export default defineComponent({
  components: {
    Page,
  },

  methods: {
    async onConfirmEmail() {
      const { confirmEmailToken } = this.$route.query;
      console.log(confirmEmailToken, this.$route.query);
      if (typeof confirmEmailToken !== 'string') {
        // TODO: show notifications
      } else {
        await authVuexModule.confirmEmail(await ConfirmEmailRequest.new(ConfirmEmailRequest, { confirmEmailToken }));
      }
    },
  },
});
</script>
