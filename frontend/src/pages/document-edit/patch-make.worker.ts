import { DMP } from '@shared/libs/dmp.lib';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const patchMake: Worker = self as any;

const dmp = new DMP();
let oldText: string | null = null;

patchMake.addEventListener('message', event => {
  const { currentText } = event.data;
  if (!oldText) {
    oldText = currentText;
    return;
  }
  const patch = dmp.patchMake(oldText, currentText);
  oldText = currentText;
  patchMake.postMessage(patch);
});
