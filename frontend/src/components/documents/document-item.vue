<template>
  <div>
    <router-link :to="documentLink">
      <li>
        <h2>{{ title }}</h2>
        <div class="contributors">
          <h3>{{ contributors.length > 1 ? 'Contributors:' : 'Contributor:' }}</h3>
          <base-badge v-for="contributor in contributors"
            :key="contributor"
            :contributor="contributor">
          </base-badge>
        </div>
        <p>Created: {{ createdDate }}</p>
        <p>Modified: {{ modifiedDate }}</p>
        <div class="actions">
          <slot></slot>
        </div>
      </li>
    </router-link>
  </div>
</template>

<script lang="ts">
import BaseBadge from '../badges/badge.vue';

export default {
  components: {
    BaseBadge,
  },
  props: ['id', 'title', 'contributors', 'createdDate', 'modifiedDate'],
  computed: {
    documentLink(): string {
      return '/documents/' + this.id;
    }
  },
}
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
}

h2,
h3 {
  margin: 0.5rem 0;
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

h3 {
  margin-right: 1rem;
}

a {
  text-decoration: none;
  color: #000000;
}
</style>
