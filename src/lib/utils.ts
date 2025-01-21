export function debounce(callback: () => void, delay: number): () => void {
	let timeoutId: ReturnType<typeof setTimeout>
	return () => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(callback, delay)
	}
}
