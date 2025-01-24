<script lang="ts">
	import type { Table } from 'mdast'
	import BlockChildren from './BlockChildren.svelte'

	interface Props {
		block: Table
	}

	const { block }: Props = $props()
</script>

<table>
	<BlockChildren {block} />
</table>
