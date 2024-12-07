import { DayTest } from "../day-test";
import { Day03 } from "./day-03";

const day = new Day03();

describe(`Day ${day.getDayIndex()}`, () => {
	DayTest.solve(day, 173517243, 100450138);
});
