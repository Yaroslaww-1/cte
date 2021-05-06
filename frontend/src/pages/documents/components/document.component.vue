<template>
  <div>
    <router-link :to="editorLink">
      <li>
        <h2>{{ document.title }}</h2>
        <div class="contributors">
          <h3>{{ document.contributors.length > 1 ? 'Contributors:' : 'Contributor:' }}</h3>
          <base-badge v-for="contributor in document.contributors" :key="contributor" :contributor="contributor">
          </base-badge>
        </div>
        <p>Created: {{ document.createdDate }}</p>
        <p>Modified: {{ document.modifiedDate }}</p>
        <div class="actions">
          <slot></slot>
        </div>
      </li>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import BaseBadge from '@components/badges/badge.vue';

export default defineComponent({
  props: {
    document: {
      type: Object,
      required: true,
    },
  },

  components: {
    BaseBadge,
  },

  computed: {
    editorLink(): string {
      return '/editor/' + this.document.id;
    },
  },
});
</script>

<style lang="scss" scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h2 {
  font-size: 1.5rem;
  margin: 0.5rem 0;
}

h3 {
  margin: 0.5rem 0;
  margin-right: 1rem;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
.contributors {
  display: flex;
  flex-direction: row;
}

a {
  text-decoration: none;
  color: #000000;
}
</style>
