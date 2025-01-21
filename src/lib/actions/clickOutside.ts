import type { Action } from 'svelte/action'

export const clickOutside: Action<HTMLElement, (node: Node) => void> = (node, callback) => {
	const handleClick = (event: MouseEvent) => {
		if (!node.contains(event.target as Node) && !event.defaultPrevented) callback(node)
	}

	document.addEventListener('click', handleClick, true)

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true)
		}
	}
}
