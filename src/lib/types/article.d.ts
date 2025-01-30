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

export type TableOfContents = { title: string; id: string; major: boolean }[]
