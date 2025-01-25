<script lang="ts">
	import type { Heading } from 'mdast'
	import BlockChildren from './BlockChildren.svelte'
	import { toaster } from '$lib/stores/toast'
	import { LucideHash } from 'lucide-svelte'

	interface Props {
		block: Heading
	}

	const { block }: Props = $props()
	const { data, depth } = block

	const tag = `h${depth}`
	const id = data?.id

	function copyPermalink(event: MouseEvent) {
		if (!event.currentTarget || !navigator.clipboard) return

		const href = (event.currentTarget as HTMLAnchorElement).href
		if (!href) return

		navigator.clipboard.writeText(href)
		toaster.add('Permalink copied to clipboard', 'success', 3_000)
	}
</script>

<svelte:element this={tag} {id} class="heading">
	{#if id && depth !== 1}
		<a href={`#${data.id}`} class="permalink" onclick={copyPermalink}
			><LucideHash aria-label={`Permalink to ${id}`} /></a>
	{/if}
	<BlockChildren {block} />
</svelte:element>

<style>
	.heading {
		position: relative;
		margin-bottom: 0.5em;

		&:not(:global(h1)) {
			margin: 1rem 0;
			margin-left: -0.5rem;
			padding-left: 0.5rem;
		}

		&:hover .permalink {
			opacity: 1;
		}
	}

	h1.heading {
		font-size: 3rem;
		color: var(--accent-color);
	}

	h2.heading {
		padding-bottom: 0.5rem;
		font-size: 2rem;
		border-bottom: 1px solid var(--surface-0);
	}

	h3.heading {
		font-size: 1.66rem;
	}

	.permalink {
		position: absolute;
		top: 0.5lh;
		left: -1.5rem;
		padding: 0.2rem 0;
		color: var(--surface-0);
		opacity: 0;
		transform: translateY(-50%);
		transition:
			opacity var(--transition-duration) linear,
			color var(--transition-duration) linear;

		&:is(:hover, :focus-visible) {
			opacity: 1;
			color: var(--accent-color);
		}
	}
</style>
