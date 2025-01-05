/** @type {import('svelte/action').Action<HTMLElement, (node: Node) => void>} */
export const clickOutside = (node, callback) => {
	const handleClick = (/** @type {MouseEvent} */ event) => {
		if (
			node &&
			!node.contains(/** @type {Node} */ (event.target)) &&
			!event?.defaultPrevented
		) {
			callback(node)
		}
	}

	document.addEventListener('click', handleClick, true)

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true)
		}
	}
}
