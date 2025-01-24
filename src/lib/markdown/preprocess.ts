import components from '$lib/components/article'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import BananaSlug from 'github-slugger'

import type { Plugin } from 'unified'
import type { FootnoteDefinition, Root } from 'mdast'

const mdastHeadingSlugs: Plugin<void[], Root> = () => {
	const slugger = new BananaSlug()

	return tree => {
		slugger.reset()

		visit(tree, 'heading', node => {
			const data = node.data ?? (node.data = {})

			const text = toString(node)
			const id = slugger.slug(text)

			data.id = id
		})
	}
}

const mdastExtractFootnotes: Plugin<void[], Root> = () => {
	return tree => {
		const footnotes: FootnoteDefinition[] = []

		visit(tree, 'footnoteDefinition', (node, index, parent) => {
			footnotes.push(node)
			if (parent && index !== undefined) parent.children.splice(index, 1)
		})

		if (footnotes.length > 0) {
			tree.children.push(
				{
					type: 'heading',
					depth: 2,
					data: { id: 'footnotes' },
					children: [{ type: 'text', value: 'Footnotes' }]
				},
				...footnotes
			)
		}
	}
}

const mdsastMapComponents: Plugin<void[], Root> = () => {
	return tree => {
		visit(tree, node => {
			if (node.type === 'root' || node.component) return
			node.component = components[node.type]
		})
	}
}

const processor = unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(mdastHeadingSlugs)
	.use(mdastExtractFootnotes)
	.use(mdsastMapComponents)
	.freeze()

export async function preprocessMarkdown(markdown: string): Promise<Root> {
	const ast = processor.parse(markdown)
	const processed = await processor.run(ast)
	return processed
}
