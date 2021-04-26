<template>
	<button @click="this.onClick" :title="this.description" v-html="icon" class="btn"></button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
	props: {
		description: String,
		icon: String,
		action: String,
		onClickAction: Function,
	},
})
export default class IconButton extends Vue {
	description!: string;
	icon!: string;
	action!: string;
	onClickAction!: () => void;
	onClick(): void {
		const editor = document.getElementById('editor');
		if (editor) editor.focus();
		this.onClickAction();
	}
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
