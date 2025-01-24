<script lang="ts">
	import type { Html } from 'mdast'

	interface Props {
		block: Html
	}

	const { block }: Props = $props()
</script>

<noscript>
	{@html block.value}
</noscript>
