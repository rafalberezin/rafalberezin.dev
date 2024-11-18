import { supabase } from "$lib/db/client";

export async function load() {
	const { data, error } = await supabase
	.from("projects")
	.select(`
		slug,
		name,
		summary,
		latest_version,
		tags,
		license,
		accent
		`)
		.eq("featured", true)
		.limit(3);

	return {
		featuredProjects: !error ? data : []
	}
}
