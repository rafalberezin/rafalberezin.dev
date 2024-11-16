/** @type {import('svelte/action').Action<HTMLElement, import('$lib/types/intersect.d.ts').IntersectParams?>} */
export const interserct = (node, params) => {
	const observer = new IntersectionObserver((entries, observer)  => {
		entries.forEach((entry) => {
			const detail = /** @type {import('$lib/types/intersect.d.ts').IntersectDetail} */ ({
				node: entry.target,
				isIntersecting: entry.isIntersecting
			});

			if (params?.intersectingOnly && !entry.isIntersecting) return;

			if (entry.isIntersecting && params?.once) observer.unobserve(entry.target);
			if (params?.callback) params.callback(detail);

			if (!params?.event && params?.callback) return;
			const event = new CustomEvent(params?.event ?? "intersect", { detail });
			entry.target.dispatchEvent(event);
		});
	}, params?.observerOptions);

	observer.observe(node);

	return {
		destroy() {
			observer.unobserve(node);
		}
	};
}
