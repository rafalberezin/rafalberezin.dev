import { supabase } from '$lib/db/client'
import type { ProjectData } from '$lib/types/project'

export async function load() {
	const { data, error } = await supabase
		.from('projects')
		.select('*')
		.order('featured', { ascending: false })
		.order('updated_at', { ascending: false })

	return {
		projects: (!error ? data : []) as ProjectData[]
	}
}
