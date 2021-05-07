<template>
  <Page>
    <base-card>
      <h1>Login</h1>
      <form @submit.prevent="onLogin">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="Your Email" v-model.trim="email" />
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Your Password" v-model.trim="password" />
        </div>
        <input-validation :login="!isLoginDataValid"></input-validation>
        <link-button class="login-button">Login</link-button>
        <router-link :to="Route.Register">
          <link-button type="button" mode="flat">Don't have an account? Sign up</link-button>
        </router-link>
      </form>
    </base-card>
  </Page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Page from '@components/page/page.vue';
import { authVuexModule } from '@src/vuex/store-accessor';
import { Route } from '@src/router/routes.enum';
import BaseCard from '@components/cards/card.vue';
import LinkButton from '@components/buttons/link-button.vue';
import checkIsLoginDataValid from '@src/validation/loginValidation';
import InputValidation from '@src/components/inputs/input-validation.vue';

export default defineComponent({
  components: {
    Page,
    BaseCard,
    LinkButton,
    InputValidation,
  },

  data() {
    return {
      email: '',
      password: '',
      isLoginDataValid: true,
    };
  },

  methods: {
    async onLogin(): Promise<void> {
      const { email, password } = this;
      this.isLoginDataValid = checkIsLoginDataValid({ email, password });
      if (this.isLoginDataValid) await authVuexModule.login({ email, password });
    },
  },

  computed: {
    Route() {
      return Route;
    },
  },
});
</script>

<style lang="scss" scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-top: 0.7rem;
  display: block;
  font-size: 1.1rem;
}

input {
  display: block;
  width: 100%;
  height: 2.5rem;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
  &:focus {
    border-color: #3d3d3d;
    background-color: #faf6ff;
    outline: none;
  }
}

.login-button {
  margin-top: 1rem;
}
</style>
