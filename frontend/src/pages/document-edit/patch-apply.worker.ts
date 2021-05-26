import { DMP } from '@shared/libs/dmp.lib';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const patchApply: Worker = self as any;

const dmp = new DMP();

patchApply.addEventListener('message', event => {
  const { currentText, patchOperations } = event.data;
  const newText = dmp.patchApply(patchOperations, currentText)[0];
  patchApply.postMessage(newText);
});
