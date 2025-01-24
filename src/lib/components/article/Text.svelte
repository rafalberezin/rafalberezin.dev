<script lang="ts">
	import type { Text } from 'mdast'

	interface Props {
		block: Text
	}

	const { block }: Props = $props()
</script>

{block.value}
