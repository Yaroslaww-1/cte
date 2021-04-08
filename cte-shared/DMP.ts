import { Diff, DiffMatchPatch, PatchOperation } from 'diff-match-patch-ts';

export class DMP {
	dmp = new DiffMatchPatch();
	diff_main(text1: string, text2: string): Diff[] {
		return this.dmp.diff_main(text1, text2);
	}
	patch_apply(patch: PatchOperation[], text: string): [string, boolean[]] {
		return this.dmp.patch_apply(patch, text);
	}
	patch_make(text1: string, text2: string): PatchOperation[] {
		return this.dmp.patch_make(text1, text2, this.diff_main(text1, text2));
	}
}
