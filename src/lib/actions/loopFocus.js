/** @type {import('svelte/action').Action<HTMLElement, { loopTo: HTMLElement? }>} */
export const loopFocus = (node, options) => {
	const focusableElements = node.querySelectorAll("[data-focusable]");
	if (focusableElements.length < 1) return;

	const loopFrom = focusableElements.item(focusableElements.length - 1);
	const loopTo = options.loopTo ?? /** @type {HTMLElement} */ (focusableElements.item(0));
	if (loopFrom === loopTo) return;

	const handleTab = (/** @type {KeyboardEvent} */ event) => {
		if (event.key === "Tab" && document.activeElement === loopFrom) {
			event.preventDefault();
			loopTo.focus();
		}
	};

	document.addEventListener("keydown", handleTab, true);

	return {
		destroy() {
			document.removeEventListener("keydown", handleTab, true);
		}
	}
}
