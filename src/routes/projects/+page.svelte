<script lang="ts">
	import { fakeHover } from '$lib/actions/fakeHover'
	import ProjectCard from '$lib/components/project/ProjectCard.svelte'
	import { onMount } from 'svelte'

	const { data } = $props()

	let projectsDiv: HTMLElement
	onMount(() => {
		projectsDiv.dispatchEvent(new CustomEvent('fakeHover'))
	})
</script>

<svelte:head>
	<title>Projects | Rafał Berezin</title>
</svelte:head>

<main id="main-content">
	<section class="page-section section-fill">
		<h1>Projects</h1>

		<div class="content-wrapper">
			<div
				class="projects"
				bind:this={projectsDiv}
				use:fakeHover={{
					selector: 'a',
					duration: 500,
					delay: 300,
					sequentialDelay: 150
				}}>
				{#each data.projects as project}
					<ProjectCard {project} />
				{/each}
			</div>
		</div>
	</section>
</main>

<style>
	h1 {
		color: var(--subtext-0);
		font-family: var(--font-mono);
		font-weight: bold;
		text-align: center;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.content-wrapper {
		width: 100%;
	}

	.projects {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(35ch, 100%), 1fr));
		justify-content: center;
		gap: 1em;
		padding: 2em 0;

		> :global(.project) {
			max-width: 72ch;
			margin-inline: auto;
			border-color: var(--surface-0);
			outline: none;
			transition: border-color var(--transition-duration) linear;

			&:is(:global(:hover), :global(:focus-visible), :global(.fake-hover)) {
				border-color: var(--accent-color);
				background-color: color-mix(in oklab, var(--accent-color) 5%, var(--base));
			}
		}
	}
</style>
