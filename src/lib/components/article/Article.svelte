<script lang="ts">
	import { onMount } from 'svelte'
	import BlockChildren from './BlockChildren.svelte'
	import type { Root } from 'mdast'
	import { page } from '$app/state'

	interface Props {
		mdast: Root
	}

	const { mdast }: Props = $props()

	onMount(() => {
		if (page.url.hash) document.getElementById(page.url.hash.substring(1))?.scrollIntoView()
	})
</script>

<article>
	<BlockChildren block={mdast} />
</article>

<style>
	article {
		padding: 3rem;
		font-size: 1.2rem;
		letter-spacing: 0.5px;
	}

	:global(html) {
		scroll-padding: var(--header-height);
	}
</style>
