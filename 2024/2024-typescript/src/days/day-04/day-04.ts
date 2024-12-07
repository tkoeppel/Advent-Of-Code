import { StringUtil } from "../../utils/string-util";
import { IDay } from "../day";

export class Day04 implements IDay {
	getDayIndex(): number {
		return 4;
	}

	public solvePart01(data: string): string | number {
		const wordSearch = WordSearch.from(data);
		return wordSearch.search("XMAS");
	}

	public solvePart02(data: string): string | number {
		const wordSearch = WordSearch.from(data);
		return wordSearch.xSearch("MAS");
	}
}

class WordSearch {
	private puzzle: string[];
	private readonly MAX_HEIGHT;
	private readonly MAX_WIDTH;

	constructor(puzzle: string[]) {
		this.puzzle = puzzle;
		this.MAX_HEIGHT = puzzle.length;
		this.MAX_WIDTH = puzzle[0].length;
	}

	public static from(data: string) {
		const puzzle = StringUtil.extractLines(data);

		return new WordSearch(puzzle);
	}

	public search(term: string) {
		return this.generalSearch(term, term[0], this.countHits.bind(this));
	}

	public xSearch(term: string) {
		if (term.length % 2 === 0) {
			throw Error(
				"Number of letters of search terms must be odd fo X-search."
			);
		}

		return this.generalSearch(
			term,
			term[Math.ceil(term.length / 2) - 1],
			this.xCountHits.bind(this)
		);
	}

	private generalSearch(
		term: string,
		pivot: string,
		countFun: (term: string, row: number, col: number) => number
	) {
		if (term.length < 2) {
			throw Error("Algorithm is for words longer than 1 letter.");
		}

		let totalHits = 0;

		for (let row = 0; row < this.puzzle.length; row++) {
			for (let col = 0; col < this.puzzle[0].length; col++) {
				if (this.puzzle[row][col] === pivot) {
					totalHits += countFun(term, row, col);
				}
			}
		}
		return totalHits;
	}

	private xCountHits(term: string, row: number, col: number): number {
		let hitCount = 0;
		const half = Math.floor(term.length / 2);

		if (this.isDiagonalCross(term, row, col, half)) {
			hitCount++;
		}

		return hitCount;
	}

	private isDiagonalCross(
		term: string,
		row: number,
		col: number,
		half: number
	): boolean {
		let lineCount = 0;

		for (const ySign of [-1, 1]) {
			for (const xSign of [-1, 1]) {
				if (this.checkDiagonal(term, row, col, half, ySign, xSign)) {
					lineCount++;
				}
				if (lineCount >= 2) {
					return true;
				}
			}
		}

		return false;
	}

	private checkDiagonal(
		term: string,
		row: number,
		col: number,
		half: number,
		ySign: number,
		xSign: number
	): boolean {
		for (let i = 0, vec = -half; vec <= half; i++, vec++) {
			const y = row + vec * ySign;
			const x = col + vec * xSign;
			if (
				this.isXOutOfBounds(x) ||
				this.isYOutOfBounds(y) ||
				this.puzzle[y][x] !== term[i]
			) {
				return false;
			}
		}
		return true;
	}

	private countHits(term: string, row: number, col: number): number {
		let hitCount = 0;

		for (let vecY = -1; vecY <= 1; vecY++) {
			const y = row + vecY;
			if (this.isYOutOfBounds(y)) {
				continue;
			}

			for (let vecX = -1; vecX <= 1; vecX++) {
				const x = col + vecX;
				if (this.isXOutOfBounds(x) || (vecY === 0 && vecX === 0)) {
					continue;
				}

				if (this.findSubterm([x, y], [vecX, vecY], term.slice(1))) {
					hitCount++;
				}
			}
		}

		return hitCount;
	}

	private findSubterm(
		pos: [number, number],
		vec: [number, number],
		restTerm: string
	): boolean {
		if (restTerm.length === 0) {
			return true;
		}

		if (
			this.isXOutOfBounds(pos[0]) ||
			this.isYOutOfBounds(pos[1]) ||
			this.puzzle[pos[1]][pos[0]] !== restTerm[0]
		) {
			return false;
		}

		return this.findSubterm(
			[pos[0] + vec[0], pos[1] + vec[1]],
			vec,
			restTerm.slice(1)
		);
	}

	private isXOutOfBounds(x: number) {
		return x < 0 || x >= this.MAX_WIDTH;
	}

	private isYOutOfBounds(y: number) {
		return y < 0 || y >= this.MAX_HEIGHT;
	}
}
