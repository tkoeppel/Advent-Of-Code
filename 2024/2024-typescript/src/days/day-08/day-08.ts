import { StringUtil } from "../../utils/string-util";
import { IDay } from "../day";

export class Day08 implements IDay {
	getDayIndex(): number {
		return 8;
	}

	public solvePart01(data: string): string | number {
		const map = AntennaMap.from(data);
		return map.findAntinodes().size;
	}

	public solvePart02(data: string): string | number {
		const map = AntennaMap.from(data);
		return map.findAntinodesWithHarmoniceRes().size;
	}
}

class AntennaMap {
	private readonly map: string[][];
	private freq2pos: Map<string, [number, number][]>;
	private readonly MAX_Y;
	private readonly MAX_X;
	private static readonly FREE = ".";

	constructor(map: string[][]) {
		this.map = map;
		this.MAX_Y = map.length;
		this.MAX_X = map[0].length;
		this.freq2pos = new Map();

		for (let y = 0; y < this.MAX_Y; y++) {
			for (let x = 0; x < this.MAX_X; x++) {
				const freq = map[y][x];
				if (freq === AntennaMap.FREE) {
					continue;
				}

				if (this.freq2pos.has(freq)) {
					this.freq2pos.get(freq)!.push([x, y]);
				} else {
					this.freq2pos.set(freq, [[x, y]]);
				}
			}
		}
	}

	public static from(data: string) {
		const map = StringUtil.extractLines(data).map((line) => line.split(""));
		return new AntennaMap(map);
	}

	public findAntinodes() {
		const antinodes: Set<string> = new Set();

		for (const [freq, pos] of this.freq2pos) {
			this.applyOnPosPairs(pos, this.calcAntinodes.bind(this)).forEach(
				(antinode) => antinodes.add(`${antinode}`) // string for uniqueness
			);
		}

		return antinodes;
	}

	public findAntinodesWithHarmoniceRes() {
		const antinodes: Set<string> = new Set();

		for (const [freq, pos] of this.freq2pos) {
			this.applyOnPosPairs(
				pos,
				this.calcAntinodesWithHarmonicRes.bind(this)
			).forEach(
				(antinode) => antinodes.add(`${antinode}`) // string for uniqueness
			);
		}

		return antinodes;
	}

	private calcAntinodes(pos1: [number, number], pos2: [number, number]) {
		const vec1: [number, number] = [pos1[0] - pos2[0], pos1[1] - pos2[1]];
		const vec2: [number, number] = [-vec1[0], -vec1[1]];
		const a1: [number, number] = [pos1[0] + vec1[0], pos1[1] + vec1[1]];
		const a2: [number, number] = [pos2[0] + vec2[0], pos2[1] + vec2[1]];

		const antinodes: [number, number][] = [];
		for (const a of [a1, a2]) {
			if (!this.isOutOfBounds(a)) {
				antinodes.push(a);
			}
		}
		return antinodes;
	}

	private calcAntinodesWithHarmonicRes(
		pos1: [number, number],
		pos2: [number, number]
	) {
		const vec1: [number, number] = [pos1[0] - pos2[0], pos1[1] - pos2[1]];
		const vec2: [number, number] = [-vec1[0], -vec1[1]];

		const antinodes: [number, number][] = [];
		for (const [pos, vec] of [
			[pos1, vec1],
			[pos2, vec2],
		]) {
			let a = pos;
			while (!this.isOutOfBounds(a)) {
				antinodes.push(a);
				a = [a[0] + vec[0], a[1] + vec[1]];
			}
		}
		return antinodes;
	}

	private isOutOfBounds(pos: [number, number]) {
		return (
			pos[0] < 0 ||
			pos[0] >= this.MAX_X ||
			pos[1] < 0 ||
			pos[1] >= this.MAX_Y
		);
	}

	private applyOnPosPairs(
		list: [number, number][],
		operation: (
			a: [number, number],
			b: [number, number]
		) => [number, number][]
	) {
		let results: [number, number][] = [];
		for (let i = 0; i < list.length; i++) {
			for (let j = i + 1; j < list.length; j++) {
				results = [...results, ...operation(list[i], list[j])];
			}
		}
		return results;
	}
}
