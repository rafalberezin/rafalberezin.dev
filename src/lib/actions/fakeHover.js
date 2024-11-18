/**
 * @type {import('svelte/action').Action<HTMLElement, import('$lib/types/fakeHover').FakeHoverParams>}
 * @description Add .fake-hover as :hover alternative to css selector.
 */
export const fakeHover = (node, params) => {
	/** @type {HTMLElement[]} */
	const elements = params.this ? [node] : []
	if (params.selector) elements.push(...(/** @type {NodeListOf<HTMLElement>} */ (node.querySelectorAll(params.selector))));

	const baseDelay = params.delay ?? 0;
	const sequantialDelay = params.sequantialDelay ?? 0;

	const eventHandler = () => {
		elements.forEach((element, i) => {
			const delay = baseDelay + sequantialDelay * i;
			setTimeout(() => {
				element.classList.add("fake-hover");
				setTimeout(() => {
					element.classList.remove("fake-hover");
				}, params.duration);
			}, delay);
		});
	}

	node.addEventListener("fakeHover", eventHandler, true);

	return {
		destroy() {
			node.removeEventListener("fakeHover", eventHandler, true);
		}
	}
}
