<template>
  <Page>
    <base-card>
      <h1>Register</h1>
      <form @submit.prevent="onRegister">
        <div class="form-control">
          <input-validation
            v-model:inputData="name"
            :withLabel="true"
            label="Name"
            :validator="nameValidator"
            :empty="empty"
            value="registerName"
            placeholder="Your Name"
          ></input-validation>
          <input-validation
            v-model:inputData="email"
            :withLabel="true"
            label="Email"
            :validator="emailValidator"
            :empty="empty"
            value="registerEmail"
            type="email"
            placeholder="Your Email"
          ></input-validation>
          <input-validation
            v-model:inputData="password"
            :withLabel="true"
            label="Password"
            :validator="passwordValidator"
            :empty="empty"
            value="registerPassword"
            type="password"
            placeholder="Set Password"
          ></input-validation>
          <input-validation
            v-model:inputData="confirmPassword"
            :withLabel="true"
            label="Confirm Password"
            :passwordValidator="confirmPasswordValidator"
            :empty="empty"
            value="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            :password="password"
          ></input-validation>
        </div>
        <link-button class="register-button">Register</link-button>
        <link-button :to="Route.Login" type="button" :link="true" mode="flat" @click="clearInputs">
          Have an account? Log in instead
        </link-button>
      </form>
    </base-card>
  </Page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Page from '@components/page/page.vue';
import { authVuexModule } from '@src/vuex/store-accessor';
import { CreateUserRequest } from '@shared/request-response';
import { Route } from '@src/router/routes.enum';
import BaseCard from '@components/cards/card.vue';
import LinkButton from '@components/buttons/link-button.vue';
import {
  nameValidator,
  emailValidator,
  passwordValidator,
  confirmPasswordValidator,
} from '@src/shared-frontend/validation/registerValidation';
import InputValidation from '@components/inputs/input-validation.vue';

export default defineComponent({
  components: {
    Page,
    BaseCard,
    LinkButton,
    InputValidation,
  },

  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      inputData: '',
      empty: false,
    };
  },

  methods: {
    async onRegister(): Promise<void> {
      const { name, email, password, confirmPassword } = this;
      if (!name || !email || !password || !confirmPassword) {
        this.empty = true;
        return;
      }
      await authVuexModule.register(await CreateUserRequest.new(CreateUserRequest, { name, email, password }));
      this.clearInputs();
    },
    clearInputs() {
      this.name = '';
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
    },
    nameValidator: nameValidator,
    emailValidator: emailValidator,
    passwordValidator: passwordValidator,
    confirmPasswordValidator: confirmPasswordValidator,
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
