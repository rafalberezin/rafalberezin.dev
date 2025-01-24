<script lang="ts">
	import type { List } from 'mdast'
	import BlockChildren from './BlockChildren.svelte'

	interface Props {
		block: List
	}

	const { block }: Props = $props()
	const { ordered } = block
</script>

{#if ordered}
	<ol>
		<BlockChildren {block} />
	</ol>
{:else}
	<ul>
		<BlockChildren {block} />
	</ul>
{/if}
