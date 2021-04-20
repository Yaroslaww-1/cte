<template>
  <header>
    <nav>
      <h1>
        <router-link :to="Route.Base">CTE</router-link>
      </h1>
      <ul>
        <li>
          <router-link :to="Route.Login">Log In</router-link>
        </li>
        <li>
          <router-link :to="Route.Register">Register</router-link>
        </li>
        <li>
          <router-link :to="Route.Documents">Documents</router-link>
        </li>
        <li>
          <p @click="onLogout">Logout</p>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { authVuexModule } from '@src/vuex/store-accessor';
import { Route } from '@src/router/routes.enum';

export default defineComponent({
  computed: {
    Route() {
      return Route;
    },
  },
  methods: {
    async onLogout() {
      await authVuexModule.logout();
    },
  },
});
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #3f3f3f;
  display: flex;
  justify-content: center;
  align-items: center;
}
header a {
  text-decoration: none;
  color: #cecece;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}
a:active,
a:hover,
a.router-link-active {
  border: 1px solid #cecece;
}
h1 {
  margin: 0;
}
h1 a {
  color: white;
  margin: 0;
}
h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}
header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
li {
  margin: 0 0.5rem;
}
</style>
