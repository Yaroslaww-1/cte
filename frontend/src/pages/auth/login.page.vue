<template>
  <Page>
    <h1>Login</h1>
    <input type="email" id="email" placeholder="Your Email" v-model.trim="email" />
    <input type="password" id="password" placeholder="Your Password" v-model.trim="password" />
    <button @click="onLogin">Login</button>
    <br />
    <button @click="onGoogleGetCode">Login with Google</button>
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

  mounted: function () {
    this.$nextTick(() => {
      if (this.$route.query.code) {
        this.onGoogleLogin(String(this.$route.query.code));
      }
    });
  },

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    async onLogin() {
      const { email, password } = this;
      await authVuexModule.login({ email, password });
    },
    async onGoogleGetCode() {
      await authVuexModule.getGoogleCode();
    },
    async onGoogleLogin(code: string) {
      await authVuexModule.loginWithGoogle(code);
    },
  },
});
</script>
