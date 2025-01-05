import { supabase } from '$lib/db/client'

export async function load() {
	const { data, error } = await supabase
		.from('projects')
		.select(`*`)
		.eq('featured', true)
		.limit(3)

	/** @type {{ featuredProjects: import('$lib/types/project').ProjectData[] }} */
	return {
		featuredProjects: !error ? data : []
	}
}
