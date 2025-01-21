import type { Action } from 'svelte/action'

export interface IntersectParams {
	observerOptions?: IntersectionObserverInit
	once?: boolean
	event?: string
	intersectingOnly?: boolean
	callback?: (detail: IntersectDetail) => void
}

export interface IntersectDetail {
	node: HTMLElement
	isIntersecting: boolean
}

export const intersect: Action<HTMLElement, IntersectParams | undefined> = (node, params) => {
	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (params?.intersectingOnly && !entry.isIntersecting) return
			if (entry.isIntersecting && params?.once) observer.unobserve(entry.target)

			const detail: IntersectDetail = {
				node: entry.target as HTMLElement,
				isIntersecting: entry.isIntersecting
			}

			if (params?.callback) {
				params.callback(detail)
				if (!params?.event) return
			}

			const event = new CustomEvent(params?.event ?? 'intersect', { detail })
			entry.target.dispatchEvent(event)
		})
	}, params?.observerOptions)

	observer.observe(node)

	return {
		destroy() {
			observer.disconnect()
		}
	}
}
