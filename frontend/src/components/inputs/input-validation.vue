<template>
  <div>
    <p v-if="login">{{ loginError }}</p>
    <p v-if="register">{{ registerError }}</p>
    <p v-if="emptyTitle">{{ emptyTitleError }}</p>
    <p v-if="emptyUserName">{{ emptyUserNameError }}</p>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    login: {
      type: Boolean,
      required: false,
      default: false,
    },
    register: {
      type: Boolean,
      required: false,
      default: false,
    },
    emptyTitle: {
      type: Boolean,
      required: false,
      default: false,
    },
    emptyUserName: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      loginError: 'You have not entered the required data.',
      registerError: 'Entered data is incorrect.',
      emptyTitleError: 'Document cannot be untitled. Please, enter the title.',
      emptyUserNameError: 'Incorrect user name. Please, enter the valid one.',
    };
  },
});
</script>

<style lang="scss" scoped>
p {
  color: red;
  font-size: 1.1rem;
}
</style>
