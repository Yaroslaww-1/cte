<template>
  <header>
    <nav>
      <div class="logo">
        <router-link :to="Route.Base"><img src="@src/assets/logo.jpg" /></router-link>
      </div>
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

<style lang="scss" scoped>
@mixin flexCenter($justify) {
  display: flex;
  justify-content: $justify;
  align-items: center;
}
header {
  width: 100%;
  height: 5rem;
  background-color: #3f3f3f;
  @include flexCenter(center);
  a,
  p {
    text-decoration: none;
    color: #cecece;
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: 1px solid transparent;
    cursor: pointer;
  }
  nav {
    width: 90%;
    margin: auto;
    @include flexCenter(space-between);
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    @include flexCenter(center);
  }
}
a:active,
a:hover,
a.router-link-active {
  border: 1px solid #cecece;
}
p:active,
p:hover,
p.router-link-active {
  border: 1px solid #cecece;
}
.logo {
  margin: 0;
  a {
    color: white;
    margin: 0;
    &:hover,
    &:active,
    &.router-link-active {
      border-color: transparent;
    }
  }
}
li {
  margin: 0 0.5rem;
}
img {
  height: 55px;
}
</style>
