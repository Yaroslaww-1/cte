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
import { EmailConfirmDto } from '@shared/dto';

export default defineComponent({
  components: {
    Page,
  },

  methods: {
    async onConfirmEmail() {
      const { emailConfirmToken } = this.$route.query;
      console.log(emailConfirmToken, this.$route.query);
      if (typeof emailConfirmToken !== 'string') {
        // TODO: show notifications
      } else {
        await authVuexModule.confirmEmail(new EmailConfirmDto({ emailConfirmToken }));
      }
    },
  },
});
</script>
