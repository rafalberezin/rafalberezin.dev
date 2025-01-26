import 'mdast'
import type { Component } from 'svelte'
import type { CodeParams } from '$lib/markdown/params/code'
import type { ImageParams } from '$lib/markdown/params/image'

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

	interface ImageData {
		params?: ImageParams
	}

	interface TableCellData {
		align?: AlignType
		header?: boolean
	}
}
