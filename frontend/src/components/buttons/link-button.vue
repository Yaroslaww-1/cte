<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <button v-else @click="onClick" :class="mode">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: '/',
    },
  },

  methods: {
    onClick() {
      this.$router.push(this.to);
    },
  },
});
</script>

<style lang="scss" scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3f3f3f;
  border: 1px solid #3f3f3f;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
  outline: none;
  &:hover,
  &:active {
    background-color: #535353;
    border-color: #535353;
  }
}

.flat {
  background-color: transparent;
  color: #696969;
  border: 1px solid gray;
  &:hover,
  &:active {
    background-color: #e8e8e8;
  }
}
</style>
