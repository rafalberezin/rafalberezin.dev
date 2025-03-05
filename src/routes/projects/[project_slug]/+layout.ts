import { supabase } from '$lib/db/client'
import { error } from '@sveltejs/kit'
import { extractArticleTitles, preprocessProjectData } from '$lib/project/preprocessData'
import type { LayoutLoad } from './$types'
import type { ProjectData } from '$lib/types/project'

export const load: LayoutLoad = async ({ params }) => {
	const { data, error: supabaseError } = await supabase
		.from('projects')
		.select('*')
		.eq('slug', params.project_slug)
		.single()

	if (supabaseError) {
		// PGRST116: multiple or no rows returned.
		// 'slug' is unique, so it's only no rows in this case.
		if (supabaseError.code === 'PGRST116') {
			error(404, `Project '${params.project_slug}' does not exist`)
		} else {
			error(500, 'An unexpected error occurred while fetching the project.')
		}
	}

	preprocessProjectData(data, true)
	const articleTitles = extractArticleTitles(data)

	return {
		project: data as ProjectData,
		articleTitles
	}
}
