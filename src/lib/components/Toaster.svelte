<script lang="ts">
	import { flip } from 'svelte/animate'
	import { quadOut } from 'svelte/easing'
	import { fly, fade } from 'svelte/transition'
	import { toaster } from '$lib/stores/toast'
	import { LucideX } from 'lucide-svelte'
</script>

<div class="toaster">
	{#each $toaster as toast (toast.id)}
		<div
			class={`toast ${toast.type}`}
			in:fly={{ duration: 350, y: 50, easing: quadOut }}
			out:fade={{ duration: 350, easing: quadOut }}
			animate:flip={{ duration: 350, easing: quadOut }}
			role="alert">
			<p class="type">{toast.type}</p>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			<p class="message">{@html toast.message}</p>
			<button
				class="close"
				aria-label="Close notification"
				onclick={() => {
					toaster.remove(toast.id)
				}}><LucideX aria-hidden="true" /></button>
		</div>
	{/each}
</div>

<style>
	.toaster {
		position: fixed;
		top: 5rem;
		right: 1em;
		display: flex;
		flex-direction: column;
		gap: 1em;
		width: 100%;
		max-width: 40ch;
		z-index: 110;
	}

	.toast {
		position: relative;
		width: 100%;
		padding: 0.5em 3em 0.5em 1em;
		background-color: var(--surface-0);
		border-left: 5px solid var(--accent);

		&.info {
			--accent: var(--blue);
		}
		&.success {
			--accent: var(--green);
		}
		&.warning {
			--accent: var(--yellow);
		}
		&.error {
			--accent: var(--red);
		}
	}

	.type {
		color: var(--accent);
		font-family: var(--font-mono);
		font-size: 1.1rem;
		text-transform: uppercase;
		letter-spacing: 1.1;
		margin-bottom: 0.5em;
	}

	.message {
		color: var(--subtext-1);
	}

	.close {
		position: absolute;
		border: none;
		outline: none;
		color: var(--red);
		background-color: transparent;
		top: 0.75em;
		right: 0.75em;
		cursor: pointer;

		&::before {
			content: '';
			position: absolute;
			display: block;
			width: 100%;
			aspect-ratio: 1;
			background-color: var(--red);
			border-radius: 0.25em;
			opacity: 0;
			transition: opacity var(--transition-duration) ease-out;
		}

		&:is(:hover, :focus-visible)::before {
			opacity: 0.3;
		}

		&:focus-visible {
			outline: 2px solid var(--blue);
		}
	}
</style>
