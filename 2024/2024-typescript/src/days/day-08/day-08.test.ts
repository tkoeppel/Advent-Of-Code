import { DayTest } from "../day-test";
import { Day08 } from "./day-08";

const day = new Day08();

describe(`Day ${day.getDayIndex()}`, () => {
	DayTest.solve(day, 367, 1285);
});
