import { supabase } from '$lib/db/client'
import type { ProjectData } from '$lib/types/project'

export async function load() {
	const { data, error } = await supabase.from('projects').select('*').eq('featured', true).limit(3)

	return {
		featuredProjects: (!error ? data : []) as ProjectData[]
	}
}
