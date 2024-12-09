export class ObjectUtil {
	/**
	 * Deep clone the provided object
	 * @param obj The object to clone
	 * @returns The same object deepl cloned
	 */
	public static clone<T>(obj: T): T {
		return JSON.parse(JSON.stringify(obj)) as T;
	}
}
