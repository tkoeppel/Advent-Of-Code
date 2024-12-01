export interface IDay {
	getDayIndex(): number;

	solvePart01(data: string): string | number;

	solvePart02(data: string): string | number;
}
