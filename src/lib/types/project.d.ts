import type { ArticleMap } from './article'

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
