import { supabase } from '$lib/db/client'
import { preprocessProjectData } from '$lib/project/preprocessData'
import type { ProjectData } from '$lib/types/project'

export async function load() {
	const { data, error } = await supabase.from('projects').select('*').eq('featured', true).limit(3)

	if (error || !data) return { featuredProjects: [] as ProjectData[] }

	data.forEach(project => preprocessProjectData(project, false))
	return {
		featuredProjects: data as ProjectData[]
	}
}
