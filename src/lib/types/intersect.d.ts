export interface IntersectParams {
	observerOptions?: IntersectionObserverInit;
	once?: boolean;
	event?: string;
	intersectingOnly?: boolean;
	callback?: (detail: IntersectDetail) => void;
};

export interface IntersectDetail {
	node: HTMLElement;
	isIntersecting: boolean;
}
