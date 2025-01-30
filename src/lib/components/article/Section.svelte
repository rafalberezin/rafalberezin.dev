<script lang="ts">
	import type { Section } from '$lib/types/mdast'
	import BlockChildren from './BlockChildren.svelte'

	interface Props {
		block: Section
	}

	const { block }: Props = $props()
</script>

<section class="article-section" aria-labelledby={block.data?.headingId}>
	<BlockChildren {block} />
</section>

<style>
	section {
		display: flow-root;
	}
</style>
