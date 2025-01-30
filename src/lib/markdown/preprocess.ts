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
import { trimFileExtension } from '$lib/utils'
import {
	LucideInfo,
	LucideLightbulb,
	LucideOctagonAlert,
	LucideTriangleAlert,
	MessageSquareWarning
} from 'lucide-svelte'

import type { Plugin } from 'unified'
import type { FootnoteDefinition, Heading, Root, RootContent } from 'mdast'
import type { Component } from 'svelte'
import type { Section } from '$lib/types/mdast'

const mdastHeadingIds: Plugin<void[], Root> = () => {
	const slugger = new BananaSlug()

	return tree => {
		slugger.reset()

		visit(tree, 'heading', node => {
			const data = (node.data ??= {})

			const text = toString(node)
			const id = slugger.slug(text)

			data.id = id
		})
	}
}

const mdastExtractFootnotes: Plugin<void[], Root> = () => {
	return tree => {
		const footnotes: FootnoteDefinition[] = []

		visit(
			tree,
			'footnoteDefinition',
			(node, index, parent) => {
				footnotes.push(node)
				if (parent && index !== undefined) parent.children.splice(index, 1)
			},
			true
		)

		if (footnotes.length > 0) {
			tree.children.push(
				{
					type: 'heading',
					depth: 2,
					data: { id: 'footnotes' },
					children: [{ type: 'text', value: 'Footnotes' }]
				},
				...footnotes.reverse()
			)
		}
	}
}

const ALERT_TYPES = {
	NOTE: LucideInfo,
	TIP: LucideLightbulb,
	IMPORTANT: MessageSquareWarning,
	WARNING: LucideTriangleAlert,
	CAUTION: LucideOctagonAlert
} as const
export type AlertType = { type: string; icon: Component }
const mdastDefineAlerts: Plugin<void[], Root> = () => {
	return tree =>
		visit(tree, 'blockquote', node => {
			if (node.children.length < 2) return

			const firstChild = node.children[0]
			if (firstChild.type !== 'paragraph' || firstChild.children.length !== 1) return

			const innerChild = firstChild.children[0]
			if (innerChild.type !== 'text') return

			const text = innerChild.value.trim()
			if (!text.startsWith('[!') || !text.endsWith(']')) return

			const type = text.substring(2, text.length - 1)
			const icon = ALERT_TYPES[type as keyof typeof ALERT_TYPES] as unknown as Component
			if (!icon) return

			node.children.shift()
			;(node.data ??= {}).alert = { type, icon }
		})
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
			const params = parseParams(meta, imageParamsProcessors)
			;(node.data ??= {}).params = params

			if (url.startsWith('.'))
				node.url = supabase.storage
					.from('projects')
					.getPublicUrl(
						`${page.data.project.slug}/${url.replace(/^(\.{1,2}\/)+/, '')}`
					).data.publicUrl
		})
}

const mdastPreprocessLinks: Plugin<void[], Root> = () => {
	return tree =>
		visit(tree, 'link', node => {
			if (!node.url.startsWith('.')) {
				;(node.data ??= {}).external = true
				return
			}

			node.url = trimFileExtension(node.url).replaceAll(/[\\/]\d+-/g, '/')

			if (page.params.article) return
			// If no specific article is being rendered (e.g., default project overview page /`index` article),
			// adjust the link to be relative to `/projects/[project_slug]/[[article]]`.
			node.url = `./${page.data.project.slug}/${node.url.substring(2)}`
		})
}

const mdastPreprocessTables: Plugin<void[], Root> = () => {
	return tree => {
		visit(tree, 'table', node => {
			const { align, children } = node
			if (children.length === 0) return

			const head = children[0]
			for (const col of head.children) {
				const data = (col.data ??= {})
				data.header = true
			}

			if (!align) return

			const body = children.slice(1)
			for (const row of body) {
				for (const [i, col] of row.children.entries()) {
					const data = (col.data ??= {})
					data.align = align[i] ?? null
				}
			}
		})
	}
}

// Sections are only used for Table of Contents,
// so they are not nested for ease of use.
const mdastSectionArticle: Plugin<void[], Root> = () => {
	return tree => {
		const children = tree.children
		const newChildren: RootContent[] = []

		let heading: Heading | undefined
		let start = 0
		let end = -1

		while (end++ < children.length) {
			const child = children[end]
			if (child && (child.type !== 'heading' || child.depth === 1)) continue

			if (start === end) {
				heading = child
				continue
			}

			const section: Section = {
				type: 'section',
				children: children.slice(start, end),
				data: { headingId: heading?.data?.id }
			}

			start = end
			heading = child

			newChildren.push(section)
		}

		tree.children = newChildren
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
	.use(mdastHeadingIds)
	.use(mdastExtractFootnotes)
	.use(mdastDefineAlerts)
	.use(mdastPreprocessCode)
	.use(mdastPreprocessImages)
	.use(mdastPreprocessLinks)
	.use(mdastPreprocessTables)
	.use(mdastSectionArticle)
	.use(mdsastMapComponents)
	.freeze()

export async function preprocessMarkdown(markdown: string): Promise<Root> {
	const ast = processor.parse(markdown)
	const processed = await processor.run(ast)
	return processed
}
