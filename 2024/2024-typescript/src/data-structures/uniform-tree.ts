export class UniformTree<T> {
	private val: T;
	private children: UniformTree<T>[];

	constructor(val: T, children: UniformTree<T>[]) {
		this.val = val;
		this.children = children;
	}

	/**
	 * Builds a uniformal tree
	 * @param values The values to set as children
	 * @param maxLevel The maximal level the tree should reach. Root is level 0.
	 * @returns A uniform k-tree
	 */
	public static build<T>(values: Set<T>, maxLevel: number) {
		return new UniformTree(null, this.buildRecursive(values, maxLevel, 0));
	}

	private static buildRecursive<T>(
		values: Set<T>,
		maxLevel: number,
		level: number
	): UniformTree<T>[] {
		const trees: UniformTree<T>[] = [];

		if (level >= maxLevel) {
			return trees;
		}

		const newLevel = level + 1;

		for (const val of values) {
			trees.push(
				new UniformTree<T>(
					val,
					this.buildRecursive(values, maxLevel, newLevel)
				)
			);
		}
		return trees;
	}

	/**
	 * Gets the leaf values as traversal result.
	 * @returns The leaf values as traversal result.
	 */
	public getLeafs(): T[][] {
		return this.getLeafsRecursive([]);
	}

	private getLeafsRecursive(prev: T[]): T[][] {
		const leafs = [...prev, this.val];
		if (this.children.length <= 0) {
			return [leafs];
		}

		let combinations: T[][] = [];

		for (const node of this.children) {
			const newPrev = this.val === null ? [] : leafs;
			combinations = [
				...combinations,
				...node.getLeafsRecursive(newPrev),
			];
		}

		return combinations;
	}
}
