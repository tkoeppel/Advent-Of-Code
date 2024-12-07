import { DayTest } from "../day-test";
import { Day02 } from "./day-02";

const day = new Day02();

describe(`Day ${day.getDayIndex()}`, () => {
	DayTest.solve(day, 606, 644);
});
