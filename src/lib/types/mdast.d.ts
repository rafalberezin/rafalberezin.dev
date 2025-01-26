import 'mdast'
import type { Component } from 'svelte'
import type { CodeParams } from '$lib/markdown/params/code'

declare module 'mdast' {
	interface Node {
		component?: Component<{ block: this }>
	}

	interface CodeData {
		params?: CodeParams
	}

	interface HeadingData {
		id?: string
	}

	interface TableCellData {
		align?: AlignType
		header?: boolean
	}
}
