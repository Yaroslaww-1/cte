<template>
  <header>
    <nav>
      <div class="logo">
        <router-link to="/"><img src="../../assets/logo.jpg" alt=""></router-link>
      </div>
      <ul>
        <li v-if="!isLoggedIn">
          <router-link to="/login">Log In</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link to="/register">Register</router-link>
        </li>
        <li v-if="isLoggedIn">
          <base-button @click="logOut">Log Out</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import BaseButton from '../../components/buttons/link-button.vue';
export default {
  components: {
    BaseButton,
  },
  computed: {
    isLoggedIn(): boolean {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    logOut(): void {
      this.$store.dispatch('logOut');
      this.$router.replace('/home');
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin flexCenter($justify) {
  display: flex;
  justify-content: $justify;
  align-items: center;
}
header {
  width: 100%;
  height: 5.8rem;
  background-color: #3f3f3f;
  @include flexCenter(center);
  a {
    text-decoration: none;
    color: #cecece;
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: 1px solid transparent;
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
