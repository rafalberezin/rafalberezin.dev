import type { Action } from 'svelte/action'

export interface LoopFocusParams {
	loopTo?: HTMLElement
	loopFromCurrent?: boolean
	focusableSelector?: string
}

export const loopFocus: Action<HTMLElement, LoopFocusParams> = (node, params) => {
	let loopFrom: HTMLElement = node
	let loopTo = params.loopTo

	if (!params.loopFromCurrent || !loopTo) {
		const focusableElements = node.querySelectorAll(params.focusableSelector ?? '[data-focusable]')
		if (focusableElements.length < 1) return

		if (!params.loopFromCurrent)
			loopFrom = focusableElements[focusableElements.length - 1] as HTMLElement

		if (!loopTo) loopTo = focusableElements[0] as HTMLElement
	}

	if (loopFrom === loopTo) return

	const handleTab = (event: KeyboardEvent) => {
		if (event.key === 'Tab' && document.activeElement === loopFrom) {
			event.preventDefault()
			loopTo.focus()
		}
	}

	document.addEventListener('keydown', handleTab, true)

	return {
		destroy() {
			document.removeEventListener('keydown', handleTab, true)
		}
	}
}
