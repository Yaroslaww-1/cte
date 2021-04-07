import { DiffMatchPatch } from 'diff-match-patch-ts';

export class DMP {
	dmp = new DiffMatchPatch();
	diff_main(text1: string, text2: string): unknown {
		return this.dmp.diff_main(text1, text2);
	}
}
