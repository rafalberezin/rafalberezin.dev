<script lang="ts">
	import { fakeHover } from '$lib/actions/fakeHover'
	import { intersect } from '$lib/actions/intersect'
	import ParticleBackground from '$lib/components/ParticleBackground.svelte'
	import ProjectCard from '$lib/components/ProjectCard.svelte'

	const { data } = $props()

	const WHAT_I_KNOW = ['html', 'css', 'ts', 'git', 'java', 'svelte', 'postgresql']
	const WHAT_IM_LEARNING = ['go', 'docker']
</script>

<svelte:head>
	<title>Rafał Berezin</title>
</svelte:head>

<main id="main-content">
	<section id="hero" class="page-section section-fill">
		<ParticleBackground />
		<div class="content-wrapper">
			<h1>
				Hi, I'm <span class="highlight">Rafał</span>
				<span class="handwave">👋</span>
			</h1>
			<p>
				I'm a 22-year-old developer from Poland with a passion for programming that began when I was
				15.
			</p>
			<a href="#projects" class="call-to-action">See projects</a>
		</div>
	</section>

	<section
		id="skills"
		class="page-section"
		use:intersect={{
			once: true,
			event: 'fakeHover',
			intersectingOnly: true,
			observerOptions: { rootMargin: '-50%' }
		}}
		use:fakeHover={{
			selector: 'li',
			duration: 200,
			delay: 200,
			sequentialDelay: 100
		}}>
		<div class="content-wrapper">
			<h2 class="section-title">What I know</h2>
			<ul class="icon-blocks">
				{#each WHAT_I_KNOW as icon}
					<li class="block">
						<img src={`tech/${icon}.svg`} alt={`${icon} icon`} class="icon" />
					</li>
				{/each}
			</ul>
		</div>

		<div class="content-wrapper">
			<h2 class="section-title">What I'm learning</h2>
			<ul class="icon-blocks">
				{#each WHAT_IM_LEARNING as icon}
					<li class="block">
						<img src={`tech/${icon}.svg`} alt={`${icon} icon`} class="icon" />
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<section id="knowledge" class="page-section">
		<h2 class="section-title">Knowledge means more when you share it</h2>
		<p>
			That's why I'm making my projects <span class="nobr highlight">open-source</span> whenever possible.
		</p>
	</section>

	<section id="projects" class="page-section section-fill">
		<div class="content-wrapper">
			<h2>Featured projects</h2>

			<div class="featured-projects">
				{#if data.featuredProjects.length > 0}
					{#each data.featuredProjects as project}
						<ProjectCard {project} />
					{/each}
				{:else}
					<div class="nothing-there-yet">Nothing there yet</div>
				{/if}
			</div>

			<a href="/projects" class="see-more">See more</a>
		</div>
	</section>
</main>

<style>
	.section-title {
		text-align: center;
	}

	/* #region Hero */

	#hero {
		padding-top: 0;

		h1 {
			margin-bottom: 0.25em;
			font-size: 4.5rem;
			font-weight: bold;
			font-family: var(--font-mono);
			text-align: center;
		}

		p {
			margin-bottom: 1em;
			color: var(--subtext-0);
			font-size: 1.4rem;
			max-width: 50ch;
		}

		.highlight {
			background-image: var(--y-p-gradient);
			background-clip: text;
			color: transparent;
		}
	}

	.handwave {
		display: inline-block;
		transform-origin: bottom right;
		animation: handwave 1000ms ease-in-out 500ms;
	}

	@keyframes handwave {
		0%,
		100% {
			transform: rotate(0deg);
		}
		20%,
		60% {
			transform: rotate(-10deg);
		}
		40%,
		80% {
			transform: rotate(10deg);
		}
	}

	.call-to-action {
		position: relative;
		display: block;
		width: fit-content;
		padding: 1em 2em;
		background: var(--surface-0);
		color: var(--subtext-0);
		font-weight: normal;
		text-transform: uppercase;
		letter-spacing: 1px;
		transition:
			background-color var(--transition-duration) ease-out,
			color var(--transition-duration) ease-out;

		&:is(:hover, :focus-visible) {
			background: transparent;
			color: var(--mantle);
		}

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-image: var(--y-p-gradient);
			z-index: -1;
		}
	}

	/* #region Skills */

	#skills {
		background-color: var(--mantle);

		h2 {
			margin: 1em;
		}
	}

	ul.icon-blocks {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		list-style-type: none;
		margin-bottom: 1em;
	}

	li.block {
		max-height: 10rem;
		padding: 2em;
		aspect-ratio: 1;

		img {
			scale: 1;
			opacity: 0.3;
			filter: grayscale(0.7);
			transition:
				scale var(--transition-duration-long) ease-out,
				opacity var(--transition-duration-long) ease-out,
				filter var(--transition-duration-long) ease-out;
		}

		&:is(:hover, :global(.fake-hover)) img {
			scale: 1.3;
			opacity: 1;
			filter: grayscale(0);
		}
	}

	/* #region Knowledge */

	#knowledge {
		display: grid;
		justify-content: center;
		gap: 1em;
		padding: 2em;
		background-image: var(--y-p-gradient);
		color: var(--base);

		h2 {
			font-size: 2.2rem;
			font-weight: normal;
		}

		p {
			line-height: 1.6;
			margin: 0 auto;
			text-align: center;
		}

		.nobr.highlight {
			padding: 0.25em 0.5em;
			background-color: var(--base);
			color: var(--mauve);
			border-radius: 5px;
			white-space: no-wrap;
		}
	}

	/* #region Projects */

	#projects {
		h2 {
			color: var(--subtext-0);
			font-family: var(--font-mono);
			font-weight: normal;
			text-align: center;
			text-transform: uppercase;
			letter-spacing: 1px;
		}
	}

	.featured-projects {
		display: flex;
		flex-wrap: wrap;
		gap: 1em;
		padding: 2em 0;

		> :global(.project) {
			flex: 1 0 35ch;
			max-width: 100%;
		}

		.nothing-there-yet {
			width: 100%;
			padding: 1em;
			color: var(--overlay-0);
			font-size: 1.5rem;
			text-align: center;
		}
	}

	.see-more {
		position: relative;
		display: block;
		width: fit-content;
		padding: 1em 2em;
		margin-left: auto;
		background-clip: padding-box;
		color: var(--base);
		font-weight: normal;
		text-transform: uppercase;
		letter-spacing: 1px;
		border: 3px solid transparent;
		transition:
			background var(--transition-duration) ease-out,
			color var(--transition-duration) ease-out;

		&:is(:hover, :focus-visible) {
			color: var(--text);
			background-color: var(--mantle);
		}

		&::before {
			content: '';
			position: absolute;
			top: -3px;
			left: -3px;
			width: calc(100% + 6px);
			height: calc(100% + 6px);
			background: var(--y-p-gradient);
			z-index: -1;
		}
	}
</style>
