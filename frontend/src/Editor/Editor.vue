<template>
	<div class="buttons">
		<IconButton
			v-for="(module, i) in modules"
			:key="module.title + i"
			:title="module.description"
			:icon="module.icon"
			:onClickAction="module.onClickAction"
		/>
	</div>
	<div id="editor" contenteditable spellcheck="false" @input="this.update">Enter text here...</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { debounce } from 'ts-debounce';
import IconButton from '@src/components/buttons/icon-button.vue';
import bold from './modules/bold';
import italic from './modules/italic';

// eslint-disable-next-line import/no-webpack-loader-syntax
import PatchMakeWorker from 'worker-loader!./patch-make.worker';
// eslint-disable-next-line import/no-webpack-loader-syntax
import PatchApplyWorker from 'worker-loader!./patch-apply.worker';

// const socket = new WebSocket('ws://localhost:8080');
// console.log(socket.readyState === WebSocket.CONNECTING);

const patchMakeWorker = new PatchMakeWorker();
patchMakeWorker.addEventListener('message', function (e) {
	console.log('Patch by this user:');
	console.log(e.data);
});

const patchApplyWorker = new PatchApplyWorker();
patchApplyWorker.addEventListener('message', function (e) {
	const editor = document.getElementById('editor');
	if (editor) editor.innerHTML = e.data;
	console.log('Patch by another user:');
	console.log(e.data);
});

@Options({
	components: {
		IconButton,
	},
})
export default class Editor extends Vue {
	modules = [bold, italic];

	update = debounce(event => {
		patchMakeWorker.postMessage({ newText: event.target.innerHTML });
	}, 500);
}
</script>

<style lang="scss">
#editor {
	background-color: #1e2126;
	color: #abb2bf;
	min-height: calc(100vh - 51px);
	padding: 10px;
}
.buttons {
	display: flex;
	border: 1px solid grey;
}
</style>
