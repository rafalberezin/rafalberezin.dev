<script lang="ts">
	import type { Paragraph } from 'mdast'
	import BlockChildren from './BlockChildren.svelte'

	interface Props {
		block: Paragraph
	}

	const { block }: Props = $props()
</script>

<p><BlockChildren {block} /></p>

<style>
	p {
		margin-bottom: 1em;
		max-width: unset;
		line-height: 1.5;
	}
</style>
