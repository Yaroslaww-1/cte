import { DMP } from '../../../cte-shared/DMP';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ctx: Worker = self as any;

const dmp = new DMP();
let oldText = '';

ctx.addEventListener('message', event => {
	const newText = event.data.newText;
	const diff = dmp.diff_main(oldText, newText);
	oldText = newText;
	ctx.postMessage(diff);
});
