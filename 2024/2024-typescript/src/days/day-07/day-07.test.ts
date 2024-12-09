import { DayTest } from "../day-test";
import { Day07 } from "./day-07";

const day = new Day07();

describe(`Day ${day.getDayIndex()}`, () => {
	DayTest.solve(day, 3119088655389, 0);
});
