<script lang="ts">
	import type { TableCell } from 'mdast'
	import BlockChildren from './BlockChildren.svelte'

	interface Props {
		block: TableCell
	}

	const { block }: Props = $props()
</script>

<td>
	<BlockChildren {block} />
</td>
