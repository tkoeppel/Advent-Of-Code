import { ObjectUtil } from "../../utils/object-util";
import { StringUtil } from "../../utils/string-util";
import { IDay } from "../day";

export class Day06 implements IDay {
	getDayIndex(): number {
		return 6;
	}

	public solvePart01(data: string): string | number {
		const guardJourney = GuardJourney.from(data);
		return guardJourney.journey().size;
	}

	public solvePart02(data: string): string | number {
		const guardJourney = GuardJourney.from(data);
		return guardJourney.findPossibleJounreyLoops();
	}
}

class GuardJourney {
	private static readonly OBSTACLE = "#";
	private readonly MAX_X;
	private readonly MAX_Y;
	private readonly map: string[][];
	private readonly guard: Guard;

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

	public journey() {
		const visited: Set<string> = new Set(); // string for uniqueness
		visited.add(`${this.guard.pos}`);

		const m = ObjectUtil.clone(this.map);
		const g = new Guard(this.guard.pos, this.guard.direction);

		while (this.move(m, g)) {
			visited.add(`${g.pos}`);
		}

		return visited;
	}

	private move(map: string[][], guard: Guard) {
		const y = guard.pos[1] + guard.direction.vec[1];
		const x = guard.pos[0] + guard.direction.vec[0];

		if (this.isOutOfBounds([x, y])) {
			guard.move();
			return false;
		} else if (map[y][x] === GuardJourney.OBSTACLE) {
			guard.turn90Degrees();
		} else {
			guard.move();
		}
		return true;
	}

	public findPossibleJounreyLoops() {
		let count = 0;
		const visited = this.journey();
		const maps = [...visited].splice(1).map((v) => {
			const m = ObjectUtil.clone(this.map);
			const vPos = v.match(/\d+/g)?.map((m) => Number(m));
			m[vPos![1]][vPos![0]] = GuardJourney.OBSTACLE;
			return m;
		});

		for (const m of maps) {
			if (this.willGuardLoop(m)) count++;
		}

		return count;
	}

	private willGuardLoop(m: string[][]): boolean {
		const g = new Guard(this.guard.pos, this.guard.direction);
		let pathLength = 0;

		while (this.move(m, g)) {
			if (this.isLoop(pathLength)) {
				return true;
			}
			pathLength++;
		}
		return false;
	}

	private isOutOfBounds(pos: [number, number]) {
		return (
			pos[1] < 0 ||
			pos[1] >= this.MAX_Y ||
			pos[0] < 0 ||
			pos[0] >= this.MAX_X
		);
	}

	private isLoop(pathLength: number) {
		const maxPath = Math.pow(this.MAX_X, 2) + Math.pow(this.MAX_Y, 2);
		return pathLength > maxPath;
	}
}

class Guard {
	public pos: [number, number];
	public direction: Direction;

	constructor(pos: [number, number], direction: Direction) {
		this.pos = pos;
		this.direction = direction;
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
