import { page } from '$app/state'
import components from '$lib/components/article'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import BananaSlug from 'github-slugger'
import { parseParams } from './params/parser'
import { codeParamsProcessors } from './params/code'
import { imageParamsProcessors } from './params/image'
import { supabase } from '$lib/db/client'

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

const mdastPreprocessCode: Plugin<void[], Root> = () => {
	return tree =>
		visit(tree, 'code', node => {
			if (!node.meta) return

			const params = parseParams(node.meta, codeParamsProcessors)
			;(node.data ??= {}).params = params
		})
}

const mdastPreprocessImages: Plugin<void[], Root> = () => {
	return tree =>
		visit(tree, 'image', node => {
			const [url, meta] = node.url.split('#')
			node.url = supabase.storage
				.from('projects')
				.getPublicUrl(
					`${page.data.project.slug}/${url.replace(/^(\.{1,2}\/)+/, '')}`
				).data.publicUrl

			const params = parseParams(meta, imageParamsProcessors)
			;(node.data ??= {}).params = params
		})
}
const mdastPreprocessTables: Plugin<void[], Root> = () => {
	return tree => {
		visit(tree, 'table', table => {
			const { align, children } = table
			if (children.length === 0) return

			const head = children[0]
			for (const [i, col] of head.children.entries()) {
				const data = col.data ?? (col.data = {})
				data.header = true
				data.align = align?.[i] ?? null
			}

			if (!align) return

			const body = children.slice(1)
			for (const row of body) {
				for (const [i, col] of row.children.entries()) {
					const data = col.data ?? (col.data = {})
					data.align = align[i] ?? null
				}
			}
		})
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
	.use(mdastPreprocessCode)
	.use(mdastPreprocessImages)
	.use(mdastPreprocessTables)
	.use(mdsastMapComponents)
	.freeze()

export async function preprocessMarkdown(markdown: string): Promise<Root> {
	const ast = processor.parse(markdown)
	const processed = await processor.run(ast)
	return processed
}
