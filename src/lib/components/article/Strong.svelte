<script lang="ts">
	import type { Strong } from 'mdast'
	import BlockChildren from './BlockChildren.svelte'

	interface Props {
		block: Strong
	}

	const { block }: Props = $props()
</script>

<strong>
	<BlockChildren {block} />
</strong>

<style>
	strong {
		font-weight: bold;
	}
</style>
