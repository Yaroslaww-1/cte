import { DMP } from '@shared/libs/dmp.lib';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const patchApply: Worker = self as any;

const dmp = new DMP();

patchApply.addEventListener('message', event => {
  const oldText = event.data.oldText;
  const newText = dmp.patchApply(event.data.patch, oldText)[0];
  patchApply.postMessage(newText);
});
