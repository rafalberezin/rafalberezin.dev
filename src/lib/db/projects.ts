import { supabase } from '$lib/db/client'
import type { ProjectData } from '$lib/types/project'
import type { ArticleTitles, ArticleMapChildren } from '$lib/types/article'

const cache: {
	data: ProjectData[]
	expiresAt: number
	promise: Promise<ProjectData[]> | null
	titles: Record<string, ArticleTitles>
} = {
	data: [],
	expiresAt: 0,
	promise: null,
	titles: {}
}

export async function getProjects(): Promise<ProjectData[]> {
	const now = Date.now()

	if (now < cache.expiresAt) return cache.data
	if (cache.promise != null) return cache.promise

	cache.promise = fetchProjectData().then(data => {
		cache.data = data
		cache.expiresAt = Date.now() + 3600000
		cache.promise = null

		return data
	})

	return cache.promise
}

async function fetchProjectData(): Promise<ProjectData[]> {
	const { data, error } = await supabase
		.from('projects')
		.select('*')
		.order('featured', { ascending: false })
		.order('updated_at', { ascending: false })

	if (error || !data) return [] as ProjectData[]

	data.forEach(preprocessProjectData)
	return data as ProjectData[]
}

export function preprocessProjectData(project: ProjectData) {
	project.created_at = formatDate(project.created_at)
	project.updated_at = formatDate(project.updated_at)
	trimArticlePathExtensions(project.articles.children)
	renameIndexArticle(project)
}

function formatDate(date: number | string | Date): string {
	return new Date(date).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'short',
		year: 'numeric'
	})
}

function trimArticlePathExtensions(children: ArticleMapChildren) {
	for (const child of children) {
		if (child.type === 'directory') {
			trimArticlePathExtensions(child.children)
			continue
		}

		const path = child.path.replace('/articles', '')
		if (path.endsWith('.md')) child.path = path.substring(0, path.length - 3)
	}
}

function renameIndexArticle(project: ProjectData) {
	const firstArticle = project.articles.children[0]
	if (firstArticle?.type !== 'article' || firstArticle.title !== 'Index') return

	firstArticle.title = project.title
	firstArticle.path = `${project.slug}`
}

export async function getArticleTitles(project: ProjectData): Promise<ArticleTitles> {
	const now = Date.now()

	if (now >= cache.expiresAt) {
		cache.titles = {}
	}

	const cachedTitles = cache.titles[project.slug]
	if (cachedTitles !== undefined) return cachedTitles

	const titles = extractArticleTitles(project)
	cache.titles[project.slug] = titles

	return titles
}

export function extractArticleTitles(project: ProjectData): ArticleTitles {
	const titles: ArticleTitles = {}

	function extractTitles(children: ArticleMapChildren) {
		for (const child of children) {
			if (child.type === 'article') titles[child.path] = child.title
			else extractTitles(child.children)
		}
	}

	extractTitles(project.articles.children)

	return titles
}
