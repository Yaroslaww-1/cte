<template>
	<div class="buttons"></div>
	<div id="editor" contenteditable spellcheck="false">Enter text here...</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
	methods: {
		execute(command: string, arg?: string): void {
			const editor = document.getElementById('editor');
			if (editor !== null) editor.focus();
			document.execCommand(command, false, arg || '');
		},
	},
})
export default class Editor extends Vue {}
</script>

<style lang="scss">
#editor {
	background-color: #1e2126;
	color: #abb2bf;
	min-height: 90vh;
	padding: 10px;
}
.buttons {
	display: flex;
	border: 1px solid grey;
}
</style>
