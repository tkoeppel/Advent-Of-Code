import { DayTest } from "../day-test";
import { Day06 } from "./day-06";

const day = new Day06();

describe(`Day ${day.getDayIndex()}`, () => {
    DayTest.solve(day, 0, 0);
});