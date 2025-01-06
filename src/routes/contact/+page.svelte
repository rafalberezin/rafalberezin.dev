<script>
	import ParticleBackground from '$lib/components/ParticleBackground.svelte'
	import { toaster } from '$lib/stores/toast'
	import { LucideGithub, LucideMail } from 'lucide-svelte'
</script>

<svelte:head>
	<title>Contact | Rafał Berezin</title>
</svelte:head>

<main id="main-content">
	<section class="page-section section-fill">
		<div class="content-wrapper">
			<ParticleBackground />
			<h1>Get in Touch</h1>
			<button
				class="fake-link"
				onclick={event => {
					event.preventDefault()
					navigator.clipboard.writeText('rafalberezin')
					toaster.add('Copied to clipboard', 'success', 3000)
				}}>
				<img class="icon" src="discord.svg" alt="discord" /> rafalberezin
			</button>
			<a class="external" href="mailto:contact@rafalberezin.dev">
				<LucideMail size="1.5em" /> contact@rafalberezin.dev
			</a>
			<a href="https://github.com/RafalBerezin" target="_blank">
				<LucideGithub size="1.5em" /> RafalBerezin
			</a>
		</div>
	</section>
</main>

<style>
	.content-wrapper {
		display: grid;
		gap: 1em;
	}

	h1 {
		background-image: var(--y-p-gradient);
		background-clip: text;
		color: transparent;
		font-weight: bold;
		letter-spacing: 1px;
	}

	a,
	.fake-link {
		display: flex;
		gap: 0.5em;
		color: var(--text);
		font-family: var(--font-mono);
		transition: color var(--transition-duration) linear;

		img,
		:global(svg) {
			margin-top: -1px;
		}

		&:is(:hover, :focus-visible) {
			color: var(--yellow);
		}
	}

	.fake-link {
		background: transparent;
		border: none;
		cursor: pointer;
	}

	.icon {
		height: 1.5em;
	}
</style>
