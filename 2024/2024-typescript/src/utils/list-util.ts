import { UniformTree } from "../data-structures/uniform-tree";

export class ListUtil {
	/**
	 * Transpose the matrix. Requisite is the lists in the lsit have the same size
	 * @param matrix The matrix. Either consisting of strings or numbers
	 * @returns The transposed matrix
	 */
	public static transposeMatrix(
		matrix: (string | number)[][]
	): (string | number)[][] {
		return matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
	}

	/**
	 * Converts the list of strings to a list of numbers
	 * @param list The list of strings
	 * @returns  The list of numbers
	 */
	public static toNumber(list: string[]) {
		return list.map((s) => Number(s));
	}

	/**
	 * Sums up a list of numbers
	 * @param list The list of numbers
	 * @returns The summed up value
	 */
	public static sumUp(list: number[]) {
		return list.reduce((acc, current) => acc + current, 0);
	}

	/**
	 * Count occurrences in a list and return the list element with its occurence count
	 * @param list The list to count the occurences
	 * @returns The Map of elements with its correlating occurence count
	 */
	public static countOccurences(list: any[]) {
		const element2Occurence: Map<any, number> = new Map();
		for (const elem of list) {
			if (element2Occurence.has(elem)) {
				element2Occurence.set(elem, element2Occurence.get(elem)! + 1);
			} else {
				element2Occurence.set(elem, 1);
			}
		}
		return element2Occurence;
	}

	public static isBlank(list: any[] | undefined | null) {
		return !list || list.length === 0;
	}

	/**
	 * Creates permuations from uniform tree.
	 * @param symbols The symbols to use for permutations
	 * @param size The size of the array with permutations
	 * @returns The permuatation lists
	 */
	public static permutate<T>(symbols: Set<T>, size: number): T[][] {
		const tree = UniformTree.build<T>(symbols, size);
		return tree.getLeafs() as T[][];
	}
}
