<template>
	<button
		@click="if (this.$parent !== null) this.$parent.$options.methods.execute(action);"
		:title="this.description"
		v-html="icon"
		class="btn"
	></button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
	props: {
		description: String,
		icon: String,
		action: String,
	},
})
export default class Button extends Vue {
	description!: string;
	icon!: string;
	action!: string;
}
</script>

<style lang="scss">
svg {
	width: 16px !important;
	height: 16px !important;
}
.btn {
	padding: 0;
	outline: none;
	border: none;
	padding: 5px;
}
.btn:hover {
	background-color: lightgrey;
}
</style>
