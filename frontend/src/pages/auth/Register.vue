<template>
  <div>
    <the-header></the-header>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <form v-if="mode === 'signup'" @submit.prevent="submit">
        <div class="form-control">
          <label for="first_name">First Name</label>
          <input type="text" id="first_name" placeholder="Your First Name" v-model.trim="firstName" />
          <label for="last_name">Last Name</label>
          <input type="text" id="last_name" placeholder="Your Last Name" v-model.trim="lastName" />
          <label for="user_name">User Name</label>
          <input type="text" id="user_name" placeholder="Set User Name" v-model.trim="userName" />
          <label for="email_su">Email</label>
          <input type="email" id="email_su" placeholder="Your Email" v-model.trim="signupEmail" />
          <label for="password_su">Password</label>
          <input type="password" id="password_su" placeholder="Set Password" v-model.trim="signupPassword" />
          <label for="password">Confirm Password</label>
          <input type="password" id="password_confirm" placeholder="Confirm Password" v-model.trim="confirmPassword" />
        </div>
        <p v-if="!signupDataIsValid">Your data is incorrect</p>
        <base-button>Register</base-button>
        <base-button type="button" mode="flat" @click="swithAuthMode">Have an account? Log in instead</base-button>
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
      signupDataIsValid: true,
      isLoading: false,
      error: null,
      firstName: '',
      lastName: '',
      userName: '',
      signupEmail: '',
      signupPassword: '',
      confirmPassword: '',
    };
  },
  methods: {
    async submit(): Promise<void> {
      const signupPayload = {
        firstName: String(this.firstName),
        lastName: String(this.lastName),
        userName: String(this.userName),
        email: String(this.signupEmail),
        password: String(this.signupPassword),
      };
      this.signupDataIsValid = this.checkValidation('register', signupPayload);
      this.isLoading = true;
      try {
        await this.$store.dispatch('signUp', signupPayload);
        this.$router.replace('./documents');
      } catch (error) {
        this.error = error.message || 'Failed. Try later!';
      }
      this.isLoading = false;
    },
    swithAuthMode(): void {
      this.$router.replace('/login');
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
