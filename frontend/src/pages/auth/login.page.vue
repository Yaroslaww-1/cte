<template>
  <Page>
    <base-card>
      <h1>Login</h1>
      <form @submit.prevent="onLogin">
        <div class="form-control">
          <input-validation
            :withLabel="true"
            label="Email"
            :validator="emailValidator"
            :empty="empty"
            value="loginEmail"
            type="email"
            placeholder="Your Email"
          ></input-validation>
          <input-validation
            :withLabel="true"
            label="Password"
            :validator="passwordValidator"
            :empty="empty"
            value="loginPassword"
            type="password"
            placeholder="Your Password"
          ></input-validation>
        </div>
        <link-button class="login-button">Login</link-button>
        <link-button :to="Route.Register" type="button" :link="true" mode="flat" @click="clearInputs">
          Don't have an account? Sign up
        </link-button>
      </form>
    </base-card>
  </Page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Page from '@components/page/page.vue';
import { authVuexModule, documentEditVuexModule } from '@src/vuex/store-accessor';
import { Route } from '@src/router/routes.enum';
import BaseCard from '@components/cards/card.vue';
import LinkButton from '@components/buttons/link-button.vue';
import { emailValidator, passwordValidator } from '@src/validation/loginValidation';
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
      empty: false,
    };
  },

  methods: {
    async onLogin(): Promise<void> {
      const email = documentEditVuexModule.inputs.loginEmail;
      const password = documentEditVuexModule.inputs.loginPassword;
      if (!email || !password) {
        this.empty = true;
        return;
      }
      await authVuexModule.login({ email, password });
      this.clearInputs();
    },
    clearInputs() {
      documentEditVuexModule.changeValue(['loginEmail', null]);
      documentEditVuexModule.changeValue(['loginPassword', null]);
    },
    emailValidator: emailValidator,
    passwordValidator: passwordValidator,
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

.login-button {
  margin-top: 1rem;
}
</style>
