import type { Action } from 'svelte/action'

interface ArrowFocusParams {
	loop?: boolean
	selector?: string
	observe?: boolean
}

const DEFAULT_SELECTOR = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'

export const arrowFocus: Action<HTMLElement, ArrowFocusParams | undefined> = (node, params) => {
	const selector = params?.selector ?? DEFAULT_SELECTOR
	let observer: MutationObserver | null = null
	let focusable: HTMLElement[] = []

	function refreshFocusable() {
		focusable = Array.from(node.querySelectorAll(selector)) as HTMLElement[]
	}
	refreshFocusable()

	if (focusable.length < 2 && !params?.observe) return

	function arrowListener(event: KeyboardEvent) {
		const next = event.key === 'ArrowDown'
		if (!next && event.key !== 'ArrowUp') return

		event.preventDefault()

		const currentIndex = focusable.indexOf(document.activeElement as HTMLElement)
		if (currentIndex === -1) return

		let newIndex = next ? currentIndex + 1 : currentIndex - 1
		if (params?.loop)
			newIndex = newIndex < 0 ? newIndex + focusable.length : newIndex % focusable.length

		focusable[newIndex]?.focus()
	}

	if (params?.observe) {
		observer = new MutationObserver(refreshFocusable)
		observer.observe(node, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ['tabindex', 'hidden', 'disabled', 'href']
		})
	}

	node.addEventListener('keydown', arrowListener)

	return {
		destroy() {
			node.removeEventListener('keydown', arrowListener)
			observer?.disconnect()
		}
	}
}
