import { ListUtil } from "../../utils/list-util";
import { StringUtil } from "../../utils/string-util";
import { IDay } from "../day";

export class Day07 implements IDay {
	getDayIndex(): number {
		return 7;
	}

	public solvePart01(data: string): string | number {
		const calibration = Calibration.from(data, [
			Operator.ADD,
			Operator.MULTIPLY,
		]);
		return calibration.getCalibrationResult();
	}

	public solvePart02(data: string): string | number {
		const calibration = Calibration.from(data, [
			Operator.ADD,
			Operator.MULTIPLY,
			Operator.CONCAT,
		]);
		return calibration.getCalibrationResult();
	}
}

class Calibration {
	private availableOperators: Set<Operator>;
	private equations: Equation[];
	private permutations: Map<number, Operator[][]>;

	constructor(availableOperators: Set<Operator>, equations: Equation[]) {
		this.availableOperators = availableOperators;
		this.equations = equations;
		this.permutations = new Map();
		for (const eq of equations) {
			const p = eq.values.length - 1;
			if (!this.permutations.has(p)) {
				this.permutations.set(
					p,
					ListUtil.permutate(this.availableOperators, p)
				);
			}
		}
	}

	public static from(data: string, operators: Operator[]) {
		return new Calibration(
			new Set(operators),
			StringUtil.extractLines(data).map((line) => Equation.from(line))
		);
	}

	public getCalibrationResult() {
		const calculatableresults = this.equations
			.filter((eq) =>
				eq.isCalculatable(this.permutations.get(eq.values.length - 1)!)
			)
			.map((eq) => eq.result);
		return ListUtil.sumUp(calculatableresults);
	}
}

class Equation {
	public result: number;
	public values: number[];

	constructor(result: number, values: number[]) {
		this.result = result;
		this.values = values;
	}

	public static from(data: string) {
		const resVals = data.split(":");

		if (resVals.length !== 2) {
			throw Error("Invalid input format.");
		}

		const res = Number(resVals[0]);
		const vals = resVals[1].match(/\d+/g)?.map((v) => Number(v));

		return new Equation(res, vals!);
	}

	public calculate(operators: Operator[]) {
		if (operators.length !== this.values.length - 1) {
			throw Error(
				"The operator combinations have to have the same length as the values."
			);
		}
		let result = this.values[0];

		for (let i = 0; i < this.values.length - 1; i++) {
			result = operators[i].calc(result, this.values[i + 1]);
		}

		return result;
	}

	public isCalculatable(operatorsList: Operator[][]) {
		for (const operators of operatorsList) {
			if (this.result === this.calculate(operators)) {
				return true;
			}
		}
		return false;
	}
}

class Operator {
	public static ADD: Operator = new Operator("+", (a, b) => a + b);
	public static MULTIPLY: Operator = new Operator("*", (a, b) => a * b);
	public static CONCAT: Operator = new Operator("||", (a, b) =>
		parseInt(a.toString() + b.toString(), 10)
	);
	public symbol: string;
	public calc: (a: number, b: number) => number;

	constructor(symbol: string, calc: (a: number, b: number) => number) {
		this.symbol = symbol;
		this.calc = calc;
	}
}
