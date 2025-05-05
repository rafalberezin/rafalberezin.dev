<script lang="ts">
	import DiscordIcon from '$lib/components/icons/DiscordIcon.svelte'
	import ParticleBackground from '$lib/components/ParticleBackground.svelte'
	import { toaster } from '$lib/stores/toast'
	import { LucideGithub, LucideMail } from 'lucide-svelte'
</script>

<svelte:head>
	<title>Contact | Rafał Berezin</title>
</svelte:head>

<main id="main-content">
	<section class="page-section section-fill">
		<ParticleBackground />
		<div class="content-wrapper">
			<h1>Get in Touch</h1>
			<button
				class="fake-link"
				onclick={() => {
					if (navigator.clipboard) {
						navigator.clipboard.writeText('rafalberezin')
						toaster.add('Copied to clipboard', 'success', 3_000)
					} else {
						toaster.add(
							`Clipboard unavailable, please copy manually:
							<span style="display: block; padding: 1em; font-size: 1.2rem; letter-spacing: 1px; text-align: center;">
								rafalberezin
							</span>`,
							'warning',
							10_000
						)
					}
				}}>
				<DiscordIcon size="1.5em" aria-label="Discord" /> rafalberezin
			</button>
			<a class="external" href="mailto:contact@rafalberezin.dev">
				<LucideMail size="1.5em" aria-label="Email" /> contact@rafalberezin.dev
			</a>
			<a href="https://github.com/rafalberezin" target="_blank">
				<LucideGithub size="1.5em" aria-label="Github" /> rafalberezin
			</a>
		</div>
	</section>
</main>

<style>
	.content-wrapper {
		display: grid;
		gap: 1em;
		padding: 2rem;
		backdrop-filter: blur(10px);
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
</style>
