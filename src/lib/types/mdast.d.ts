import type { Component } from 'svelte'

import 'mdast'

declare module 'mdast' {
	interface Node {
		component?: Component<{ block: this }>
	}

	interface HeadingData {
		id?: string
	}
}
