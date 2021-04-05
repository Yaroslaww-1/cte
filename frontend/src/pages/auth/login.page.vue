<template>
  <Page>
    <h1>Welcome to CTE</h1>
    <input type="email" id="email" placeholder="Your Email" v-model.trim="email" />
    <input type="password" id="password" placeholder="Your Password" v-model.trim="password" />
    <button></button>
  </Page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Page from '@components/page/page.vue';

export default defineComponent({
  components: {
    Page,
  },

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    // onSubmit() {},
  },
});
</script>
