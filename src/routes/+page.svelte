<script>
	import { fakeHover } from "$lib/actions/fakeHover.js";
	import { interserct } from "$lib/actions/intersect.js";
	import ParticleBackground from "$lib/components/ParticleBackground.svelte";

	import { LucideScale, LucideTag } from "lucide-svelte";

	const { data } = $props();
</script>

<main id="main-content">
	<section id="hero" class="page-section section-fill">
		<ParticleBackground />
		<div class="content-wrapper">
			<h1>Hi, I'm <span class="highlight">Rafał</span> <span class="handwave">👋</span></h1>
			<p>I'm a 22-year-old developer from Poland with a passion for coding that began when i was 15. From simple websites and game modding, I've been expanding my skill set for years.</p>
			<a href="#projects" class="call-to-action">See projects</a>
		</div>
	</section>

	<section id="skills" class="page-section"
		use:interserct={{
			once: true,
			event: "fakeHover",
			intersectingOnly: true,
			observerOptions: { threshold: 0.3 }
		}}
		use:fakeHover={{
			selector: "li",
			duration: 200,
			delay: 300,
			sequantialDelay: 100
		}}
	>
		<div class="content-wrapper">
			<h2 class="section-title">What I know</h2>
			<ul class="icon-blocks">
				<li class="block"><img class="icon" src="tech/html.svg"   alt="html icon"></li>
				<li class="block"><img class="icon" src="tech/css.svg"    alt="css icon"></li>
				<li class="block"><img class="icon" src="tech/js.svg"     alt="javascript icon"></li>
				<li class="block"><img class="icon" src="tech/git.svg"    alt="git icon"></li>
				<li class="block"><img class="icon" src="tech/svelte.svg" alt="svelte icon"></li>
				<li class="block"><img class="icon" src="tech/java.svg"   alt="java icon"></li>
			</ul>
		</div>
		<div class="content-wrapper">
			<h2 class="section-title">What I'm learning</h2>
			<ul class="icon-blocks">
				<li class="block"><img class="icon" src="tech/go.svg"     alt="go icon"></li>
				<li class="block"><img class="icon" src="tech/docker.svg" alt="docker icon"></li>
			</ul>
		</div>
	</section>

	<section id="knowledge" class="page-section">
		<h2 class="section-title">Knowledge means more when you share it</h2>
		<p>That's why I'm making my projects <nobr class="highlight">open-source</nobr> whenever possible.</p>
	</section>

	<section id="projects" class="page-section section-fill">
		<div class="content-wrapper">
			<h2>Featured projects</h2>

			<div class="featured-projects">
				{#each data.featuredProjects as project}
					<a class="project no-global" href={`/projects/${project.slug}`} style={`--accent: ${project.accent}`}>
						<h3>{project.name} <span class="version">{project.latest_version}</span></h3>
						<p class="summary">{project.summary}</p>
						<ul class="tags">
							<li class="tag license"><LucideScale size=16 aria-label="license" />{project.license}</li>
							{#each Object.entries(project.tags) as [label, color]}
							<li class="tag" style={`color: ${color}`}><LucideTag size=16 aria-hidden="true" />{label}</li>
							{/each}
						</ul>
					</a>
				{/each}
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
		h1 {
			margin-bottom: 0.5em;
			font-size: 3rem;
		}

		p {
			margin-bottom: 1em;
			color: var(--subtext-0);
			font-size: 1.2rem;
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
		0%, 100% {
        	transform: rotate(0deg);
		}
		20%, 60% {
			transform: rotate(-10deg);
		}
		40%, 80% {
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
		transition: background-color 150ms ease-out,
					color 150ms ease-out;

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
			transition: scale 200ms ease-out,
						opacity 200ms ease-out,
						filter 200ms ease-out;
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

		nobr.highlight {
			padding: 0.25em 0.5em;
			background-color: var(--base);
			color: var(--mauve);
			border-radius: 5px;
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
		list-style-type: none;
	}

	.project {
		display: flex;
		flex-direction: column;
		flex: 1 0 30ch;
		width: 100%;
		padding: 1em;
		text-decoration: none;
		background-color: var(--mantle);
		border: 3px solid var(--accent);
		outline-offset: 5px;
		transition: background-color 150ms ease-out;

		&:is(:hover, :focus-visible) {
			background-color: var(--base);

			.version {
				background-color: var(--surface-0);
			}
		}

		h3 {
			color: var(--accent);
		}

		.version {
			padding: 0.2em 0.3em 0.1em 0.3em;
			background-color: var(--base);
			color: var(--subtext-0);
			font-size: 0.9rem;
			transition: background-color 150ms ease-out;
		}

		p {
			padding: 1em 0;
			color: var(--subtext-0);
		}
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
		transition: background 150ms ease-out,
					color 150ms ease-out;

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
