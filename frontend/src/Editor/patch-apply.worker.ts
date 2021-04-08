import { DMP } from '../../../cte-shared/DMP';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const patchApply: Worker = self as any;

const dmp = new DMP();

patchApply.addEventListener('message', event => {
	const oldText = event.data.oldText;
	const newText = dmp.patch_apply(event.data.patch, oldText)[0];
	patchApply.postMessage(newText);
});
