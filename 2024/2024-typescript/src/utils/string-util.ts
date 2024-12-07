export class StringUtil {
	/**
	 * Extracts lines of a data string. Empty lines are ignored.
	 * @param data The string having line breaks
	 * @returns The lines as string[]
	 */
	public static extractLines(data: string): string[] {
		const lines = data.split("\n");

		// trim possible empty end
		let endIndex = lines.length - 1;

		while (endIndex >= 0 && lines[endIndex].trim() === "") {
			endIndex--;
		}

		return lines.slice(0, endIndex + 1);
	}

	/**
	 * Extracts parts recognizable with a double line break
	 * @param data The data as single string
	 * @param expectedParts The expected parts amount
	 * @returns The parts as string list
	 */
	public static extractParts(data: string, expectedParts?: number): string[] {
		const parts = data.split("\n\n");

		if (expectedParts && parts.length !== expectedParts) {
			throw Error(
				`Invalid format. Expected ${expectedParts} parts but were ${parts.length}.`
			);
		}

		return parts;
	}

	/**
	 * Extracts the words from a data string. Every whitespace is spliced
	 * @param data The string having white spaces
	 * @returns The words as string[]
	 */
	public static extractWords(data: string): string[] {
		return data.split(/\s+/);
	}

	/**
	 * Removes all kind of whitespace
	 * @param data The string having whitespaces
	 * @returns The string as a single word
	 */
	public static removeWhitespace(data: string): string {
		return data.replace(/\s/g, "");
	}
}
