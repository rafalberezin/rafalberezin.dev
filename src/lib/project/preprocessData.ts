import type { ArticleMapChildren, ArticleTitles } from '$lib/types/article'
import type { ProjectData } from '$lib/types/project'

export function preprocessProjectData(project: ProjectData, preprocessArticles: boolean = false) {
	project.created_at = formatDate(project.created_at)
	project.updated_at = formatDate(project.updated_at)

	if (!preprocessArticles) return
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

