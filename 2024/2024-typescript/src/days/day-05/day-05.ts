import { ListUtil } from "../../utils/list-util";
import { StringUtil } from "../../utils/string-util";
import { IDay } from "../day";

export class Day05 implements IDay {
	getDayIndex(): number {
		return 5;
	}

	public solvePart01(data: string): string | number {
		const manual = Manual.from(data);
		return manual.validateUpdates();
	}

	public solvePart02(data: string): string | number {
		const manual = Manual.from(data);
		return manual.validateFixedUpdates();
	}
}

class Manual {
	private id2neighbours: Map<number, number[]>;
	private updates: Update[];

	constructor(id2neighbours: Map<number, number[]>, updates: Update[]) {
		this.id2neighbours = id2neighbours;
		this.updates = updates;
	}

	public static from(data: string) {
		const parts = StringUtil.extractParts(data, 2);
		const rulesList: number[][] = StringUtil.extractLines(parts[0]).map(
			(line) => line.split("|").map((n) => Number(n))
		);
		const rules: Map<number, number[]> = new Map();
		for (const r of rulesList) {
			if (rules.has(r[0])) {
				rules.get(r[0])!.push(r[1]);
			} else {
				rules.set(r[0], [r[1]]);
			}
		}

		const updates = StringUtil.extractLines(parts[1]).map((line) =>
			Update.from(line)
		);
		return new Manual(rules, updates);
	}

	public validateUpdates() {
		const validMiddleNumbers = this.updates
			.filter((update) => this.validateUpdatePages(update.pages))
			.map((update) => update.MIDDLE_NUMBER);
		return ListUtil.sumUp(validMiddleNumbers);
	}

	private validateUpdatePages(pages: number[]) {
		for (let i = 0; i < pages.length - 1; i++) {
			if (!this.id2neighbours.get(pages[i])?.includes(pages[i + 1])) {
				return false;
			}
		}
		return true;
	}

	public validateFixedUpdates() {
		const fixedUpdateMiddleNumbers = this.updates
			.filter((update) => !this.validateUpdatePages(update.pages))
			.map((update) => this.fixUpdate(update).MIDDLE_NUMBER);
		return ListUtil.sumUp(fixedUpdateMiddleNumbers);
	}

	private fixUpdate(update: Update) {
		const sortedPages = update.pages.sort((a, b) =>
			this.id2neighbours.get(a)?.includes(b) ? -1 : 1
		);
		return new Update(sortedPages);
	}
}

class Update {
	public pages: number[];
	public readonly MIDDLE_NUMBER: number;

	constructor(pages: number[]) {
		this.pages = pages;
		this.MIDDLE_NUMBER = pages[Math.ceil(pages.length / 2) - 1];
	}

	public static from(data: string) {
		return new Update(data.split(",").map((s) => Number(s)));
	}
}
