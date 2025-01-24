<script lang="ts">
	import BlockChildren from './BlockChildren.svelte'
	import type { Root } from 'mdast'

	interface Props {
		mdast: Root
		accentColor: string
	}

	const { mdast, accentColor }: Props = $props()
</script>

<article style={`--accent-color: ${accentColor}`}>
	<BlockChildren block={mdast} />
</article>

<style>
	article {
		width: 100%;
		padding: 1rem;
		padding-left: 3rem;
		background-color: var(--mantle);
	}
</style>
