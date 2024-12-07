import { ListUtil } from "../../utils/list-util";
import { StringUtil } from "../../utils/string-util";
import { IDay } from "../day";

export class Day03 implements IDay {
	getDayIndex(): number {
		return 3;
	}

	public solvePart01(data: string): string | number {
		const memory = Memory.from(data);
		return memory.calc();
	}

	public solvePart02(data: string): string | number {
		const enabledMemory = Memory.fromEnabled(data);
		return enabledMemory.calc();
	}
}

class Memory {
	private static readonly ENABLE = "do()";
	private static readonly DISABLE = "don't()";

	private instructions: Instruction[];

	constructor(instructions: Instruction[]) {
		this.instructions = instructions;
	}

	public static from(data: string) {
		const regEx = new RegExp(/mul\(\d+,\d+\)/g);
		const instructions = StringUtil.removeWhitespace(data)
			.match(regEx)
			?.map((match) => Instruction.from(match));

		if (ListUtil.isBlank(instructions)) {
			throw Error("No memory found.");
		}

		return new Memory(instructions!);
	}

	public static fromEnabled(data: string) {
		// set beginning and ending match primer
		const dataPrimered =
			this.ENABLE + StringUtil.removeWhitespace(data) + this.DISABLE;
		const regEx = new RegExp(/(?<=do\(\)).*?(?=don't\(\))/g);
		const enabledData = dataPrimered.match(regEx);

		if (ListUtil.isBlank(enabledData)) {
			throw Error("No enabled memory found.");
		}

		return this.from(enabledData!.join());
	}

	public calc() {
		return ListUtil.sumUp(this.instructions.map((instr) => instr.calc()));
	}
}

class Instruction {
	private a: number;
	private b: number;

	constructor(a: number, b: number) {
		this.a = a;
		this.b = b;
	}

	public static from(data: string) {
		const regEx = new RegExp(/\d+/g);
		const result = data.match(regEx);

		if (!result || result.length !== 2) {
			throw Error(`Invalid instruction string: ${data}`);
		}

		return new Instruction(Number(result[0]), Number(result[1]));
	}

	public calc() {
		return this.a * this.b;
	}
}
