<template>
  <Page>
    <base-card>
      <h1>Register</h1>
      <form @submit.prevent="onRegister">
        <div class="form-control">
          <label for="name">Name</label>
          <input type="text" id="name" placeholder="Your Name" v-model.trim="name" />
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="Your Email" v-model.trim="email" />
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Set Password" v-model.trim="password" />
          <label for="password_confirm">Confirm Password</label>
          <input type="password" id="password_confirm" placeholder="Confirm Password" v-model.trim="confirmPassword" />
        </div>
        <base-button class="register-button">Register</base-button>
        <router-link :to="Route.Login">
          <base-button type="button" mode="flat">Have an account? Log in instead</base-button>
        </router-link>
      </form>
    </base-card>
  </Page>
</template>

<script lang="ts">
import { defineComponent, registerRuntimeCompiler } from 'vue';

import Page from '@components/page/page.vue';
import { authVuexModule } from '@src/vuex/store-accessor';
import { CreateUserRequest } from '@shared/request-response';
import { Route } from '@src/router/routes.enum';
import BaseCard from '@components/cards/card.vue';
import BaseButton from '@components/buttons/link-button.vue';
import checkRegisterValidation from '@src/validation/registerValidation';

export default defineComponent({
  components: {
    Page,
    BaseCard,
    BaseButton,
  },

  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      registerDataIsValid: true,
    };
  },

  methods: {
    async onRegister(): Promise<void> {
      const { name, email, password, confirmPassword } = this;
      this.registerDataIsValid = checkRegisterValidation({ name, email, password, confirmPassword });
      if (this.registerDataIsValid) {
        await authVuexModule.register(await CreateUserRequest.new(CreateUserRequest, { name, email, password }));
      }
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

.register-button {
  margin-top: 1rem;
}
</style>
