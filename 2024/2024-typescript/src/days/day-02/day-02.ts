import { ListUtil } from "../../utils/list-util";
import { StringUtil } from "../../utils/string-util";
import { IDay } from "../day";

export class Day02 implements IDay {
	getDayIndex(): number {
		return 2;
	}

	public solvePart01(data: string): string | number {
		const reports = StringUtil.extractLines(data).map((line) =>
			Report.from(line)
		);
		return reports.filter((report) => report.isSafe()).length;
	}

	public solvePart02(data: string): string | number {
		const reports = StringUtil.extractLines(data).map((line) =>
			Report.from(line)
		);
		return reports.filter((report) => report.isSafeTolerated()).length;
	}
}

class Report {
	private readonly SAFE_DIFFS = [1, 2, 3];
	private levels: number[];

	constructor(levels: number[]) {
		this.levels = levels;
	}

	public static from(data: string) {
		const levels = ListUtil.toNumber(StringUtil.extractWords(data));
		return new Report(levels);
	}

	public isSafe() {
		return this.areLevelsSafe(this.levels);
	}

	public isSafeTolerated() {
		return this.getSublists(this.levels).some((levels) =>
			this.areLevelsSafe(levels)
		);
	}

	private areLevelsSafe(levels: number[]) {
		const sign = Math.sign(levels[0] - levels[levels.length - 1]);

		for (let i = 0; i < levels.length - 1; i++) {
			const diff = levels[i] - levels[i + 1];
			if (
				Math.sign(diff) !== sign ||
				!this.SAFE_DIFFS.includes(Math.abs(diff))
			) {
				return false;
			}
		}
		return true;
	}

	private getSublists(list: number[]) {
		const sublists = [];
		for (let i = 0; i < list.length; i++) {
			const sublist = [...list.slice(0, i), ...list.slice(i + 1)];
			sublists.push(sublist);
		}
		return sublists;
	}
}
