<script lang="ts">
	import type { ThematicBreak } from 'mdast'

	interface Props {
		block: ThematicBreak
	}

	const _props: Props = $props()
</script>

<hr />

<style>
	hr {
		border: none;
		border-bottom: 1px solid var(--surface-0);
		margin: 0.5em 0;
	}
</style>
