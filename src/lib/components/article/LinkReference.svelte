<script lang="ts">
	import type { LinkReference } from 'mdast'

	interface Props {
		block: LinkReference
	}

	const { block }: Props = $props()
</script>
