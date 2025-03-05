<script lang="ts">
	import { arrowFocus } from '$lib/actions/arrowFocus'
	import { shortcutFocus } from '$lib/actions/shortcutFocus'
	import type { TableOfContents } from '$lib/types/article'
	import { onMount } from 'svelte'

	interface Props {
		toc: TableOfContents
	}

	const { toc }: Props = $props()
	let activeId = $state(null as string | null)

	onMount(() => {
		const sections = Array.from(document.querySelectorAll('section.article-section'))
		const allEntries = new Map<Element, IntersectionObserverEntry>()

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => allEntries.set(entry.target, entry))

				for (const entry of allEntries.values()) {
					if (entry.isIntersecting) {
						activeId = entry.target.getAttribute('aria-labelledby')
						break
					}
				}
			},
			{
				rootMargin: '-65px 0px 0px 0px'
			}
		)

		sections.forEach(section => observer.observe(section))

		return () => observer.disconnect()
	})
</script>

<nav
	class="toc"
	use:shortcutFocus={{ selectors: ['a.active', 'a'], shift: true, key: 't' }}
	use:arrowFocus={{ loop: true }}
	aria-keyshortcuts="Shift + T"
	aria-roledescription="Table of article contents">
	<h2>Table of Contents</h2>
	{#if toc.length === 0}
		<p class="empty">No distinct sections</p>
	{:else}
		<p class="focus">Focus: <kbd>Shift + T</kbd></p>
		<ul>
			{#each toc as { id, title, major }}
				<li>
					<a href={`#${id}`} class:major class:active={id === activeId}><span>{title}</span></a>
				</li>
			{/each}
		</ul>
	{/if}
</nav>

<style>
	.toc {
		padding: 1em 2em;
		overflow-y: auto;
		height: 100%;
	}

	h2 {
		margin-bottom: 1rem;
		font-family: var(--font-mono);
	}

	.empty {
		color: var(--subtext-0);
	}

	.focus {
		color: var(--subtext-0);
		font-size: 0.9rem;
		margin-bottom: 1em;

		kbd {
			padding: 0.2em 0.5em;
			background-color: var(--overlay);
			font-family: var(--font-mono);
			font-size: 0.8rem;
			border: 1px solid var(--surface-0);
			border-radius: 5px;
		}
	}

	ul {
		list-style-type: none;
	}

	a {
		display: block;
		position: relative;
		color: var(--subtext-0);
		outline-offset: 0 0 0 -1em;

		> span {
			display: block;
			padding: 1ch;
			padding-left: 2ch;
		}

		&:not(.major) > span {
			font-weight: normal;
			padding-left: 3ch;
		}

		&::before {
			content: ' ';
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 1px;
			background-color: var(--surface-0);
			transition:
				width var(--transition-duration) linear,
				background-color var(--transition-duration) linear;
		}

		&.active::before {
			background-color: var(--accent-color);
		}

		&:is(:hover, :focus-visible) {
			color: var(--accent-color);

			&::before {
				width: 1ch;
			}
		}
	}
</style>
