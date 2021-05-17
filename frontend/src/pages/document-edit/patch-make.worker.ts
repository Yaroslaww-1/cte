import { DMP } from '@shared/libs/dmp.lib';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const patchMake: Worker = self as any;

const dmp = new DMP();

patchMake.addEventListener('message', event => {
  const { oldText, currentText } = event.data;
  console.log('PATCH MAKE', oldText, currentText);
  const patch = dmp.patchMake(oldText, currentText);
  patchMake.postMessage(patch);
});
