import { Diff, DiffMatchPatch, PatchOperation } from 'diff-match-patch-ts';

export class DMP {
  dmp = new DiffMatchPatch();
  diffMain(text1: string, text2: string): Diff[] {
    return this.dmp.diff_main(text1, text2);
  }
  patchApply(patch: PatchOperation[], text: string): [string, boolean[]] {
    return this.dmp.patch_apply(patch, text);
  }
  patchMake(text1: string, text2: string): PatchOperation[] {
    return this.dmp.patch_make(text1, text2, this.diffMain(text1, text2));
  }
}
