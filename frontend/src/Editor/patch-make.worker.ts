import { DMP } from '../../../cte-shared/DMP';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const patchMake: Worker = self as any;

const dmp = new DMP();
let oldText = '';

patchMake.addEventListener('message', event => {
	const newText = event.data.newText;
	const patch = dmp.patch_make(oldText, newText);
	oldText = newText;
	patchMake.postMessage(patch);
});
