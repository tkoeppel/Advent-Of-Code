export class StringUtil {
	/**
	 * Extracts lines of a data string. Empty lines are ignored.
	 * @param data The string having line breaks
	 * @returns The lines as string[]
	 */
	public static extractLines(data: string): string[] {
		const lines = data.split("\n");
		return lines.filter((line) => line.length > 0);
	}

	/**
	 * Extracts the words from a data string. Every whitespace is spliced
	 * @param data The string having white spaces
	 * @returns The words as string[]
	 */
	public static extractWords(data: string): string[] {
		return data.split(/\s+/);
	}
}
