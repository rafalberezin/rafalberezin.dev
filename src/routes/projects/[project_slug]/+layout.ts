import { error } from '@sveltejs/kit'
import { getArticleTitles } from '$lib/db/projects'
import type { LayoutLoad } from './$types'
import { getProjects } from '$lib/db/projects'

export const load: LayoutLoad = async ({ params }) => {
	const projects = await getProjects()

	const project = projects.find(project => project.slug === params.project_slug)
	if (project === undefined) {
		error(404, `Project '${params.project_slug}' does not exist`)
	}

	const articleTitles = await getArticleTitles(project)

	return { project, articleTitles }
}
