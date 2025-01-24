<script lang="ts">
	import type { TableRow } from 'mdast'
	import BlockChildren from './BlockChildren.svelte'

	interface Props {
		block: TableRow
	}

	const { block }: Props = $props()
</script>

<tr>
	<BlockChildren {block} />
</tr>

<style>
	tr:nth-child(even) {
		background-color: var(--base);
	}
</style>
