<template>
  <base-card>
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <img src="@src/assets/logo.jpg" alt="" />
    <p>This page could not be found. Maybe, check out the <router-link to="/documents">documents</router-link> page.</p>
  </base-card>
</template>

<script>
import BaseCard from '@src/components/cards/card.vue';

export default {
  components: {
    BaseCard,
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 3rem;
}
h2 {
  font-size: 2rem;
}
img {
  width: 10rem;
}
p {
  font-size: 1.4rem;
}
</style>
