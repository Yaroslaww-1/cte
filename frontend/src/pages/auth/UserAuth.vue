<template>
  <div>
    <the-header></the-header>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <form v-if="mode === 'login'" @submit.prevent="submit">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="Your Email" v-model.trim="email" />
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Your Password" v-model.trim="password" />
        </div>
        <p v-if="!loginDataIsValid">You have not entered the required data</p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="swithAuthMode">{{ switchModeButtonCaption }}</base-button>
      </form>
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
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="swithAuthMode">{{ switchModeButtonCaption }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script lang="ts">
import BaseCard from '../components/BaseCard.vue';
import BaseButton from '../components/BaseButton.vue';
import BaseDialog from '../components/BaseDialog.vue';
import TheHeader from './TheHeader.vue';
export default {
  components: {
    BaseCard,
    BaseButton,
    BaseDialog,
    TheHeader,
  },
  data(): unknown {
    return {
      email: '',
      password: '',
      signupDataIsValid: true,
      loginDataIsValid: true,
      mode: 'login',
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
    checkValidation(): void {
      const check1 = this.firstName === this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1);
      const check2 = this.lastName === this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1);
      const re = /^[^\s@]+@[^\s@]+$/;
      const check3 = re.test(this.signupEmail);
      const check4 = this.signupPassword === this.confirmPassword;
      if (!(check1 && check2 && check3 && check4)) this.signupDataIsValid = false;
      if (!this.email || !this.password) this.loginDataIsValid = false;
    },
    async submit(): Promise<void> {
      this.checkValidation();

      this.isLoading = true;
      const actionPayload = {
        email: this.email,
        password: this.password,
      };
      const signupPayload = {
        firstName: this.firstName,
        lastName: this.lastName,
        userName: this.userName,
        email: this.signupEmail,
        password: this.signupPassword,
      };
      try {
        if (this.loginDataIsValid && this.mode === 'login') {
          await this.$store.dispatch('logIn', actionPayload);
        } else if (this.signupDataIsValid && this.mode === 'signup') {
          await this.$store.dispatch('signUp', signupPayload);
        }
      } catch (error) {
        this.error = error.message || 'Failed. Try later!';
      }
      this.isLoading = false;
    },
    swithAuthMode(): void {
      if (this.mode === 'login') this.mode = 'signup';
      else this.mode = 'login';
    },
    handleError(): void {
      this.error = null;
    },
  },
  computed: {
    submitButtonCaption(): string {
      if (this.mode === 'login') return 'Login';
      else return 'Signup';
    },
    switchModeButtonCaption(): string {
      // eslint-disable-next-line prettier/prettier
      if (this.mode === 'login') return 'Don\'t have an account? Sign up';
      else return 'Have an account? Log in instead';
    },
  },
};
</script>

<style scoped>
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
input,
textarea {
  display: block;
  width: 100%;
  height: 2.5rem;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}
input:focus,
textarea:focus {
  border-color: #3d3d3d;
  background-color: #faf6ff;
  outline: none;
}
</style>
