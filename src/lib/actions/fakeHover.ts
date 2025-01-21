import type { Action } from 'svelte/action'

export interface FakeHoverParams {
	duration: number
	this?: boolean
	selector?: string
	delay?: number
	sequentialDelay?: number
}

/** @description Add .fake-hover as :hover alternative to css selector */
export const fakeHover: Action<HTMLElement, FakeHoverParams> = (node, params) => {
	const elements: HTMLElement[] = params.this ? [node] : []
	if (params.selector)
		elements.push(...(node.querySelectorAll(params.selector) as NodeListOf<HTMLElement>))

	if (elements.length === 0) return

	const baseDelay = params.delay ?? 0
	const sequentialDelay = params.sequentialDelay ?? 0

	const eventHandler = () => {
		elements.forEach((element, i) => {
			const delay = baseDelay + sequentialDelay * i
			setTimeout(() => {
				element.classList.add('fake-hover')
				setTimeout(() => {
					element.classList.remove('fake-hover')
				}, params.duration)
			}, delay)
		})
	}

	node.addEventListener('fakeHover', eventHandler, true)

	return {
		destroy() {
			node.removeEventListener('fakeHover', eventHandler, true)
		}
	}
}
