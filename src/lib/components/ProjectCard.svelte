<script>
	import { LucideScale, LucideTag } from 'lucide-svelte';

	/** @type {{ project: import('$lib/types/project').ProjectData }}*/
	const { project } = $props();
</script>

<a class="project no-global" href={`/projects/${project.slug}`} style={`--accent: ${project.accent}`}>
	<h2>{project.name} <span class="version">{project.latest_version}</span></h2>
	<p class="summary">{project.summary}</p>

	<ul class="tags">
		<li class="tag license"><LucideScale size=16 aria-label="license" />{project.license}</li>

		{#if project.tags}
			{#each Object.entries(project.tags) as [label, color]}
				<li class="tag" style={`color: ${color}`}><LucideTag size=16 aria-hidden="true" />{label}</li>
			{/each}
		{/if}
	</ul>
</a>

<style>
	.project {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 1em;
		background-color: var(--mantle);
		text-decoration: none;
		border: 3px solid var(--accent);
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
		color: var(--accent);
	}

	.version {
		padding: 0.2em 0.3em 0.1em 0.3em;
		background-color: var(--base);
		color: var(--subtext-0);
		font-size: 0.9rem;
		transition: background-color var(--transition-duration) ease-out;
	}

	p {
		padding: 1em 0;
		color: var(--subtext-0);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25em;
		list-style-type: none;
		margin-top: auto;
	}

	.tag {
		display: flex;
		align-content: center;
		gap: 0.25em;
		padding: 0.25em 0.5em;
		border: 1px solid var(--surface-0);
		border-radius: 1em;

		:global(svg) {
			margin-top: 2px;
		}
	}

	.license {
		color: var(--subtext-0);

		:global(svg) {
			margin-top: 0;
		}
	}
</style>
