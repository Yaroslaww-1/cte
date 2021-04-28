<template>
  <section>
    <h1> {{ title }}</h1>
  </section>
</template>

<script lang="ts">
export default {
  props: ['id'],
  data(): { [prop: string]: any } {
    return {
      selectedDocument: null,
    };
  },
  computed: {
    title(): string {
      return this.selectedDocument.title;
    },
  },
  created(): void {
    this.selectedDocument = this.$store.getters['documents/documents'].find(value => value.id === this.id);
  },
}
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
</style>