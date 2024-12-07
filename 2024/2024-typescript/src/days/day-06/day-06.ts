import { ListUtil } from "../../utils/list-util";
import { StringUtil } from "../../utils/string-util";
import { IDay } from "../day";

export class Day06 implements IDay {
	getDayIndex(): number {
		return 6;
	}

	public solvePart01(data: string): string | number {
		const guardJourney = GuardJourney.from(data);
		return guardJourney.simulateMovement();
	}

	public solvePart02(data: string): string | number {
		// TODO
		return -1;
	}
}

class GuardJourney {
	private static readonly OBSTACLE = "#";
	private static readonly VISITED = "X";
	private readonly MAX_X;
	private readonly MAX_Y;
	private map: string[][];
	private guard: Guard;

	constructor(map: string[][], guard: Guard) {
		this.map = map;
		this.guard = guard;
		this.MAX_Y = map.length;
		this.MAX_X = map[0].length;
	}

	public static from(data: string) {
		const map = StringUtil.extractLines(data).map((line) => line.split(""));
		const guard = Guard.from(map);
		return new GuardJourney(map, guard);
	}

	public simulateMovement() {
		while (this.guard.isInSight) {
			this.move();
		}

		console.log(this.map.map((line) => line.join("")));
		const visitedCounts = this.map.map(
			(row) => row.filter((col) => col === GuardJourney.VISITED).length
		);
		return ListUtil.sumUp(visitedCounts);
	}

	private isOutOfBounds(pos: [number, number]) {
		return (
			pos[1] < 0 ||
			pos[1] >= this.MAX_Y ||
			pos[0] < 0 ||
			pos[0] >= this.MAX_X
		);
	}

	private move() {
		const y = this.guard.pos[1] + this.guard.direction.vec[1];
		const x = this.guard.pos[0] + this.guard.direction.vec[0];

		if (this.isOutOfBounds([x, y])) {
			this.visit(this.guard.pos);
			this.guard.isInSight = false;
		} else if (this.map[y][x] === GuardJourney.OBSTACLE) {
			this.guard.turn90Degrees();
		} else {
			this.visit(this.guard.pos);
			this.guard.move();
		}
	}

	private visit(pos: [number, number]) {
		this.map[pos[1]][pos[0]] = GuardJourney.VISITED;
	}
}

class Guard {
	public pos: [number, number];
	public direction: Direction;
	public isInSight: boolean;

	constructor(pos: [number, number], direction: Direction) {
		this.pos = pos;
		this.direction = direction;
		this.isInSight = true;
	}

	public static from(data: string[][]) {
		for (let y = 0; y < data.length; y++) {
			for (let x = 0; x < data[y].length; x++) {
				if (Direction.availableDirectionSymbols.includes(data[y][x])) {
					return new Guard([x, y], Direction.from(data[y][x]));
				}
			}
		}
		throw Error("No guard starting position found.");
	}

	public turn90Degrees() {
		this.direction = Direction.turn90Degrees(this.direction);
	}

	public move() {
		this.pos = [
			this.pos[0] + this.direction.vec[0],
			this.pos[1] + this.direction.vec[1],
		];
	}
}

class Direction {
	public static readonly availableDirectionSymbols = ["^", ">", "v", ""];
	public static readonly UP = new Direction("^", [0, -1]);
	public static readonly RIGHT = new Direction(">", [1, 0]);
	public static readonly DOWN = new Direction("v", [0, 1]);
	public static readonly LEFT = new Direction("<", [-1, 0]);

	constructor(
		public readonly symbol: string,
		public readonly vec: [number, number]
	) {
		// nothing to do
	}

	public static from(symbol: string) {
		switch (symbol) {
			case Direction.UP.symbol:
				return Direction.UP;
			case Direction.RIGHT.symbol:
				return Direction.RIGHT;
			case Direction.DOWN.symbol:
				return Direction.DOWN;
			case Direction.LEFT.symbol:
				return Direction.LEFT;
			default:
				throw Error(`No Direction with symbol '${symbol}'.`);
		}
	}

	public static turn90Degrees(direction: Direction) {
		switch (direction) {
			case Direction.UP:
				return Direction.RIGHT;
			case Direction.RIGHT:
				return Direction.DOWN;
			case Direction.DOWN:
				return Direction.LEFT;
			case Direction.LEFT:
				return Direction.UP;
			default:
				throw Error(`Unknown direction: ${this}`);
		}
	}
}
