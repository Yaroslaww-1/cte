<template>
	<button @click="this.onClick" :title="this.description" class="btn">
		<component :is="IconComponent">
			<slot />
		</component>
	</button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
	props: {
		description: String,
		IconComponent: Object,
		action: String,
		onClickAction: Function,
	},
})
export default class IconButton extends Vue {
	description!: string;
	// eslint-disable-next-line @typescript-eslint/ban-types
	IconComponent!: object;
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
.btn {
	padding: 0;
	outline: none;
	border: none;
	padding: 5px;
	height: 20px;
	width: 20px;

	svg {
		width: 16px !important;
		height: 16px !important;
	}
}
.btn:hover {
	background-color: lightgrey;
}
</style>
