import { ListUtil } from "../../utils/list-util";
import { StringUtil } from "../../utils/string-util";
import { IDay } from "../day";

export class Day01 implements IDay {
	getDayIndex(): number {
		return 1;
	}

	public solvePart01(data: string): string | number {
		const list1 = List.from(data, 0);
		const list2 = List.from(data, 1);
		return list1.caclulateDistances(list2);
	}

	public solvePart02(data: string): string | number {
		const list1 = List.from(data, 0);
		const list2 = List.from(data, 1);
		return list1.calculateSimilarityScore(list2);
	}
}

class List {
	private locationIds: number[];

	constructor(locationIds: number[]) {
		this.locationIds = locationIds;
	}

	public static from(data: string, index: number) {
		const wordLines = StringUtil.extractLines(data).map((line) =>
			StringUtil.extractWords(line)
		);
		const stringList = ListUtil.transposeMatrix(wordLines)[index];
		const list = ListUtil.toNumber(stringList as string[]);

		return new List(list);
	}

	private sort(asc: boolean) {
		this.locationIds.sort((a, b) => (asc ? a - b : b - a));
	}

	public caclulateDistances(list: List) {
		if (this.locationIds.length !== list.locationIds.length) {
			throw Error("Location IDs have to have the same length.");
		}

		this.sort(true);
		list.sort(true);

		const diffs: number[] = [];
		for (let i = 0; i < this.locationIds.length; i++) {
			diffs.push(Math.abs(this.locationIds[i] - list.locationIds[i]));
		}
		return ListUtil.sumUp(diffs);
	}

	public calculateSimilarityScore(list: List) {
		const id2OccurencesInThis = ListUtil.countOccurences(
			this.locationIds
		) as Map<number, number>;
		const id2OccurencesInOther = ListUtil.countOccurences(
			list.locationIds
		) as Map<number, number>;

		let score = 0;
		for (const thisId of id2OccurencesInThis.keys()) {
			score +=
				thisId *
				(id2OccurencesInOther.get(thisId) || 0) *
				id2OccurencesInThis.get(thisId)!;
		}
		return score;
	}
}
