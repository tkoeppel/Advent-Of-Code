import { ListUtil } from "../../utils/list-util";
import { ObjectUtil } from "../../utils/object-util";
import { IDay } from "../day";

export class Day09 implements IDay {
	getDayIndex(): number {
		return 9;
	}

	public solvePart01(data: string): string | number {
		const diskMap = new DiskMap(data);
		return diskMap.compactFragmented();
	}

	public solvePart02(data: string): string | number {
		const diskMap = new DiskMap(data);
		return diskMap.compactWholeFile();
	}
}

class DiskMap {
	private static readonly EMPTY = -1;
	private raw: string;

	constructor(raw: string) {
		this.raw = raw;
	}

	public compactFragmented() {
		const compacted = this.getCompactFragmented();
		return this.calcChecksum(compacted);
	}

	public compactWholeFile() {
		const compacted = this.getCompactWholeFile();
		return 0;
	}

	private calcChecksum(compacted: number[]) {
		const products = compacted.map((c, i) => {
			// id * index
			if (c === DiskMap.EMPTY) {
				return 0; // should be always 0 when empty
			}
			return c * i;
		});
		return ListUtil.sumUp(products);
	}

	private getCompactFragmented() {
		const spaceFormat = this.getSpaceRepresentation();
		const compacted: number[] = ObjectUtil.clone(spaceFormat);

		for (
			let fileIndex = spaceFormat.length - 1;
			fileIndex >= 0;
			fileIndex--
		) {
			const emptySpaceIndex = compacted.indexOf(DiskMap.EMPTY);

			if (emptySpaceIndex > fileIndex) {
				break;
			}

			if (spaceFormat[fileIndex] !== DiskMap.EMPTY) {
				const fileBlock = spaceFormat[fileIndex];
				compacted[emptySpaceIndex] = fileBlock;
				compacted[fileIndex] = DiskMap.EMPTY;
			}
		}
		return compacted;
	}

	private getCompactWholeFile(): number {
		const spaceFormat = this.getSpaceRepresentation();
		return 0;
	}

	private getSpaceRepresentation() {
		const spaceRepresentation = [];
		for (let i = 0; i < this.raw.length; i += 2) {
			const id = i - i / 2;
			const fileSpace = Number(this.raw[i]);
			const freeSpace =
				this.raw.length - 1 === i
					? DiskMap.EMPTY
					: Number(this.raw[i + 1]);

			for (let j = 0; j < fileSpace; j++) {
				spaceRepresentation.push(id);
			}

			for (let j = 0; j < freeSpace; j++) {
				spaceRepresentation.push(DiskMap.EMPTY);
			}
		}
		return spaceRepresentation;
	}
}
