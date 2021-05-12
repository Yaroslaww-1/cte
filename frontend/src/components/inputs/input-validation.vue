<template>
  <div>
    <label v-if="withLabel" :for="value" :class="{ formLabel: !!placeholder }">{{ label }}</label>
    <input
      :class="{ invalid: !!(error && blured), formInput: !!placeholder }"
      :id="value"
      @blur="onBlur"
      v-model="input"
      autocomplete="off"
      :type="type"
      :placeholder="placeholder"
    />
    <p v-if="error && blured">{{ error.message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { documentEditVuexModule } from '@src/vuex/store-accessor';

export default defineComponent({
  props: {
    validator: {
      type: Function as PropType<(input: string) => Error | null>,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    withLabel: {
      type: Boolean,
      default: false,
    },
    empty: {
      type: Boolean,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
  },

  data() {
    return {
      input: '',
      blured: false,
    };
  },

  methods: {
    onBlur() {
      this.blured = true;
      if (!this.error) documentEditVuexModule.changeValue([this.value, this.input]);
    },
  },

  computed: {
    error(): Error | null {
      return this.validator(this.input);
    },
  },

  watch: {
    empty() {
      this.blured = true;
    },
  },
});
</script>

<style lang="scss" scoped>
p {
  color: red;
  font-size: 1.1rem;
}
input {
  width: 100%;
  height: 2.2rem;
  margin-top: 0.5rem;
  font-size: 1.2rem;
  outline: none;
}

.formLabel {
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-top: 0.7rem;
  display: block;
  font-size: 1.1rem;
}

.formInput {
  display: block;
  width: 100%;
  height: 2.5rem;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
  &:focus {
    background-color: #faf6ff;
    outline: none;
  }
}

.invalid {
  border-color: red;
}
</style>
