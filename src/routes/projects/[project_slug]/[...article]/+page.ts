import { supabase } from '$lib/db/client'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

const hasFileExtensionRegex = /[^/]\.\w+$/

function getArticleUrl(project_slug: string, article_slug: string): string {
	let path = `${project_slug}/articles/${article_slug}`
	if (!hasFileExtensionRegex.test(article_slug)) path += '.md'

	return supabase.storage.from('projects').getPublicUrl(path).data.publicUrl
}

export const load: PageLoad = async ({ params, fetch, parent }) => {
	const article_slug = params.article || 'index'
	const fileUrl = getArticleUrl(params.project_slug, article_slug)

	const response = await fetch(fileUrl)
	if (!response.ok) {
		const status = response.status === 400 ? 404 : response.status
		error(status, status === 404 ? `Article '${article_slug}' does not exist` : undefined)
	}
	const file = await response.text()

	const { articleTitles, project } = await parent()

	const articleTitle = articleTitles[`${params.project_slug}/${params.article}`]

	const title = `${articleTitle ? `${articleTitle} | ` : ''}${project.title} | Rafał Berezin`

	return {
		article: file,
		title
	}
}
