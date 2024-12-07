import { DayTest } from "../day-test";
import { Day04 } from "./day-04";

const day = new Day04();

describe(`Day ${day.getDayIndex()}`, () => {
	DayTest.solve(day, 2427, 1900);
});
