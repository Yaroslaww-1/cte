<template>
  <Page>
    <h1>Welcome to CTE</h1>
    <input type="email" id="email" placeholder="Your Email" v-model.trim="email" />
    <input type="password" id="password" placeholder="Your Password" v-model.trim="password" />
    <button @click="onLogin">Login</button>
  </Page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Page from '@components/page/page.vue';
import { authVuexModule } from '@src/vuex/store-accessor';

export default defineComponent({
  components: {
    Page,
  },

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    async onLogin() {
      await authVuexModule.login({ email: this.email, password: this.password });
    },
  },
});
</script>
