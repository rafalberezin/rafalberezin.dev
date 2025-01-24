<script lang="ts">
	import type { Emphasis } from 'mdast'
	import BlockChildren from './BlockChildren.svelte'

	interface Props {
		block: Emphasis
	}

	const { block }: Props = $props()
</script>

<em>
	<BlockChildren {block} />
</em>

<style>
	em {
		font-style: italic;
	}
</style>
