<template>
  <teleport to="body">
    <div v-if="show" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <header>
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>
        <section>
          <slot></slot>
        </section>
        <menu v-if="!fixed">
          <slot name="actions"></slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
@mixin fixedPosition($top, $left) {
  position: fixed;
  top: $top;
  left: $left;
}
@mixin animationParams($opacity, $scale) {
  opacity: $opacity;
  transform: scale($scale);
}
.backdrop {
  @include fixedPosition(0, 0);
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}
dialog {
  @include fixedPosition(20vh, 10%);
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
  @media (min-width: 768px) {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
header {
  background-color: #7a7a7a;
  color: white;
  width: 100%;
  padding: 1rem;
  h2 {
    margin: 0;
  }
}
section {
  padding: 1rem;
  font-size: 1.3rem;
}
menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}
.dialog-enter-from,
.dialog-leave-to {
  @include animationParams(0, 0.8);
}
.dialog-enter-active {
  transition: all 0.3s ease-out;
}
.dialog-leave-active {
  transition: all 0.3s ease-in;
}
.dialog-enter-to,
.dialog-leave-from {
  @include animationParams(1, 1);
}
</style>
