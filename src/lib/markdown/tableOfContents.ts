import type { TableOfContents } from '$lib/types/article'
import type { Root } from 'mdast'

export function generateTOC(mdast: Root): TableOfContents {
	const toc: TableOfContents = []

	for (const section of mdast.children) {
		if (section.type !== 'section') continue

		const heading = section.children[0]
		if (heading?.type !== 'heading' || heading.depth === 1) continue

		const id = heading.data?.id
		const title = heading.data?.rawText

		if (id && title) toc.push({ id, title, major: heading.depth === 2 })
	}

	return toc
}
