<template>
  <div>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submit">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="Your Email" v-model.trim="email" />
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Your Password" v-model.trim="password" />
        </div>
        <p v-if="!loginDataIsValid">You have not entered the required data</p>
        <base-button>Login</base-button>
        <base-button type="button" mode="flat" @click="swithAuthMode">Don't have an account? Sign up</base-button>
      </form>
    </base-card>
  </div>
</template>

<script lang="ts">
import BaseCard from '../../components/cards/card.vue';
import BaseButton from '../../components/buttons/link-button.vue';
import BaseDialog from '../../components/dialogs/dialog.vue';
import TheHeader from '../../components/navbar/navbar.vue';
import checkValidation from '../../validation/index';
export default {
  components: {
    BaseCard,
    BaseButton,
    BaseDialog,
    TheHeader,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data(): { [prop: string]: any } {
    return {
      email: '',
      password: '',
      loginDataIsValid: true,
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async submit(): Promise<void> {
      const actionPayload = {
        email: String(this.email),
        password: String(this.password),
      };
      this.loginDataIsValid = checkValidation('login', actionPayload);
      this.isLoading = true;
      try {
        await this.$store.dispatch('logIn', actionPayload);
        this.$router.replace('./documents');
      } catch (error) {
        this.error = error.message || 'Failed. Try later!';
      }
      this.isLoading = false;
    },
    swithAuthMode(): void {
      this.$router.replace('/register');
    },
    handleError(): void {
      this.error = null;
    },
  },
};
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
  font-size: 1.1rem;;
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
</style>
