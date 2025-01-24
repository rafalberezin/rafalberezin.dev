<script lang="ts">
	import type { Delete } from 'mdast'
	import BlockChildren from './BlockChildren.svelte'

	interface Props {
		block: Delete
	}

	const { block }: Props = $props()
</script>

<del>
	<BlockChildren {block} />
</del>
