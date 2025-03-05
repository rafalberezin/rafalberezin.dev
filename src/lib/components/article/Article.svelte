<script lang="ts">
	import BlockChildren from './BlockChildren.svelte'
	import type { Root } from 'mdast'

	interface Props {
		mdast: Root
	}

	const { mdast }: Props = $props()
</script>

<article>
	<BlockChildren block={mdast} />
</article>

<style>
	article {
		padding: 3rem;
		background-color: var(--mantle);
		font-size: 1.2rem;
		letter-spacing: 0.5px;
	}

	:global(html) {
		scroll-padding: var(--header-height);
	}
</style>
