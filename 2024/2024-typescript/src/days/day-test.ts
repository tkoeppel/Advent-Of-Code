import { readFileSync } from "fs";
import { IDay } from "./day";

export class DayTest {
	public static solve(
		day: IDay,
		sol1: string | number,
		sol2: string | number
	) {
		const data = readInput(
			`src/days/day-${this.getDayIndexFormatted(
				day.getDayIndex()
			)}/data.txt`
		);

		it(`Day ${day.getDayIndex()}: Part 1`, () => {
			expect(day.solvePart01(data)).toBe(sol1);
		});

		it(`Day ${day.getDayIndex()}: Part 2`, () => {
			expect(day.solvePart02(data)).toBe(sol2);
		});
	}

	private static getDayIndexFormatted(index: number) {
		return `${index < 10 ? 0 : ""}${index}`;
	}
}

function readInput(filename: string): string {
	try {
		const data = readFileSync(filename, "utf-8");
		return data;
	} catch (err) {
		console.error("Failed to read the file:", err);
		return "";
	}
}
