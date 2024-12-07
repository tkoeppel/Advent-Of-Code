import { DayTest } from "../day-test";
import { Day05 } from "./day-05";

const day = new Day05();

describe(`Day ${day.getDayIndex()}`, () => {
	DayTest.solve(day, 4135, 5285);
});
