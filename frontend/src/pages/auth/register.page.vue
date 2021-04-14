<template>
  <Page>
    <h1>Register</h1>
    <input type="text" id="name" placeholder="Your Name" v-model.trim="name" />
    <input type="email" id="email" placeholder="Your Email" v-model.trim="email" />
    <input type="password" id="password" placeholder="Your Password" v-model.trim="password" />
    <button @click="onRegister">Register</button>
  </Page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Page from '@components/page/page.vue';
import { authVuexModule } from '@src/vuex/store-accessor';
import { CreateUserRequest } from '@shared/request-response';

export default defineComponent({
  components: {
    Page,
  },

  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },

  methods: {
    async onRegister() {
      const { name, email, password } = this;
      await authVuexModule.register(await CreateUserRequest.new(CreateUserRequest, { name, email, password }));
    },
  },
});
</script>
