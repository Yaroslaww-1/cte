<template>
	<div class="buttons">
		<Button
			v-for="(module, i) in modules"
			:key="module.title + i"
			:title="module.description"
			:icon="module.icon"
			:action="module.action"
		/>
	</div>
	<div id="editor" contenteditable spellcheck="false" @input="this.update">Enter text here...</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { debounce } from 'ts-debounce';
import Button from '@src/Editor/Button.vue';
import bold from './modules/bold';
import italic from './modules/italic';

// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!./Worker';

const worker = new Worker();
worker.addEventListener('message', function (e) {
	console.log(e.data);
});

@Options({
	components: {
		Button,
	},
})
export default class Editor extends Vue {
	modules = [bold, italic];

	execute(command: string, arg?: string): void {
		const editor = document.getElementById('editor');
		if (editor !== null) editor.focus();
		document.execCommand(command, false, arg || '');
	}

	update = debounce(event => {
		console.log(event.target.innerHTML);
		worker.postMessage({ newText: event.target.innerHTML });
	}, 500);
}
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
