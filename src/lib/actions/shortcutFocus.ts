import type { Action } from 'svelte/action'

interface ShortcutParams {
	key: string
	alt?: boolean
	ctrl?: boolean
	shift?: boolean
	selectors?: string[]
}

function isTextEditableElement(element: Element | null): boolean {
	if (!element) return false

	const tagName = element.tagName
	return (
		tagName === 'INPUT' ||
		tagName === 'TEXTAREA' ||
		tagName === 'SELECT' ||
		(element as HTMLElement).isContentEditable
	)
}

export const shortcutFocus: Action<HTMLElement, ShortcutParams> = (node, params) => {
	const key = params.key.toLowerCase()
	function keyboardListener(event: KeyboardEvent) {
		if (isTextEditableElement(document.activeElement)) return

		if (
			event.altKey === (params.alt ?? false) &&
			event.ctrlKey === (params.ctrl ?? false) &&
			event.shiftKey === (params.shift ?? false) &&
			event.key.toLowerCase() === key
		) {
			event.preventDefault()
			if (!params.selectors) return node.focus()

			for (const selector of params.selectors) {
				const target = node.querySelector(selector) as HTMLElement | null
				if (target) return target?.focus()
			}
		}
	}

	document.addEventListener('keydown', keyboardListener)

	return {
		destroy() {
			document.removeEventListener('keydown', keyboardListener)
		}
	}
}
