export interface ProjectData {
	slug: string
	title: string
	description?: string
	license?: string
	source?: string
	latest_version?: string
	versions?: string[]
	color: string
	tags?: { [key: string]: string }
	featured: boolean
	articles: ArticleMap
	created_at: string
	updated_at: string
}

export interface ArticleMap {
	type: 'root'
	children: ArticleMapChildren
}

export type ArticleMapChildren = (ArticleMapArticle | ArticleMapDirectory)[]

export interface ArticleMapArticle {
	type: 'article'
	title: string
	path: string
}

export interface ArticleMapDirectory {
	type: 'directory'
	title: string
	children: ArticleMapChildren
}
