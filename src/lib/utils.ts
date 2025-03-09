export function debounce<T extends unknown[]>(
	callback: (...args: T) => void,
	delay: number
): (...args: T) => void {
	let timeoutId: ReturnType<typeof setTimeout>
	return (...args) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => callback(...args), delay)
	}
}

export function trimFileExtension(filePath: string): string {
	return filePath.replace(/(?<=[^\\/])\.\w*(?=(?:#.*)?$)/, '')
}
