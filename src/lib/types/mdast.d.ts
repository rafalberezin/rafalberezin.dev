import 'mdast'
import type { Component } from 'svelte'
import type { CodeParams } from '$lib/markdown/params/code'
import type { ImageParams } from '$lib/markdown/params/image'
import type { AlertType } from '$lib/markdown/preprocess'
import type { Parent } from 'mdast'

export interface Section extends Parent {
	type: 'section'
	data?: SectionData
}

export interface SectionData {
	headingId?: string
}

declare module 'mdast' {
	interface Node {
		component?: Component<{ block: this }>
	}

	interface BlockquoteData {
		alert?: AlertType
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

	interface LinkData {
		external?: boolean
	}

	interface TableCellData {
		align?: AlignType
		header?: boolean
	}

	interface RootContentMap {
		section: Section
	}
}
