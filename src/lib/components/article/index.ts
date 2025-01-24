import type { Component } from 'svelte'
import type { RootContentMap } from 'mdast'

type MdastComponentMap = {
	[K in keyof RootContentMap]: Component<{ block: RootContentMap[K] }>
}

const components: MdastComponentMap = {
}

export default components
