import { DayTest } from "../day-test";
import { Day09 } from "./day-09";

const day = new Day09();

describe(`Day ${day.getDayIndex()}`, () => {
	DayTest.solve(day, 6415184586041, 0);
});
