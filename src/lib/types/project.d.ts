export interface ProjectData {
	id: number
	slug: string
	name: string
	summary?: string
	license: string
	source?: string
	accent: string
	featured: boolean
	latest_version: string
	versions: string[]
	tags?: { [key: string]: string }
}
