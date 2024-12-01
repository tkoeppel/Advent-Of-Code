import { DayTest } from "../day-test";
import { Day01 } from "./day-01";

const day = new Day01();

describe(`Day ${day.getDayIndex()}`, () => {
	DayTest.solve(day, 2086478, 24941624);
});
