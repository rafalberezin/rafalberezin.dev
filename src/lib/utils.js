/**
 * @param {() => void} callback
 * @param {number} delay
 * @returns {() => void}
 */
export function debounce(callback, delay) {
	/** @type {ReturnType<setTimeout>} */
	let timeoutId
	return () => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(callback, delay)
	}
}
