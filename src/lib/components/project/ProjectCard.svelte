<script lang="ts">
	import { LucideClock, LucideScale, LucideStar, LucideTag } from 'lucide-svelte'
	import type { ProjectData } from '$lib/types/project'
	import Tags from './Tags.svelte'

	const { project }: { project: ProjectData } = $props()
</script>

<a
	class="project no-global"
	href={`/projects/${project.slug}`}
	style={`--accent-color: ${project.color}`}>
	<h2>
		{#if project.featured}
			<span class="featured">
				<LucideStar fill="currentcolor" />
			</span>
		{/if}
		{project.title}
		{#if project.latest_version}
			<span class="version">{project.latest_version}</span>
		{/if}
	</h2>

	{#if project.description}
		<p class="description">{project.description}</p>
	{/if}

	<Tags tags={project.tags ?? {}}>
		{#snippet beforeChildren()}
			<li class="tag license">
				<LucideScale size="16" aria-label="License" />{project.license}
			</li>
		{/snippet}
	</Tags>

	<span class="updated-at">
		<LucideClock size="16" aria-label="Updated at" />
		{project.updated_at}
	</span>
</a>

<style>
	.project {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 1em;
		background-color: var(--mantle);
		text-decoration: none;
		border: 3px solid var(--accent-color);
		outline-offset: 5px;
		transition: background-color var(--transition-duration) ease-out;

		&:is(:hover, :focus-visible) {
			background-color: var(--base);

			.version {
				background-color: var(--surface-0);
			}
		}
	}

	h2 {
		color: var(--accent-color);
	}

	.version {
		padding: 0.2em 0.3em 0.1em 0.3em;
		background-color: var(--base);
		color: var(--subtext-0);
		font-size: 0.9rem;
		transition: background-color var(--transition-duration) ease-out;
	}

	.featured {
		display: inline-block;
		color: var(--yellow);
	}

	p {
		padding: 1em 0;
		color: var(--subtext-0);
	}

	.license {
		color: var(--subtext-0);

		:global(svg) {
			margin-top: 0;
		}
	}

	.updated-at {
		display: flex;
		gap: 0.25em;
		padding-top: 1em;
		color: var(--overlay-0);
	}
</style>
