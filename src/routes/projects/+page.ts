import { supabase } from '$lib/db/client'
import { preprocessProjectData } from '$lib/project/preprocessData'
import type { ProjectData } from '$lib/types/project'

export async function load() {
	const { data, error } = await supabase
		.from('projects')
		.select('*')
		.order('featured', { ascending: false })
		.order('updated_at', { ascending: false })

	if (error || !data) return { projects: [] as ProjectData[] }

	data.forEach(project => preprocessProjectData(project, false))
	return { projects: data as ProjectData[] }
}
