<script lang="ts">
	import type { Parent } from 'mdast'

	interface Props {
		block: Parent
	}

	const { block }: Props = $props()
	const { children } = block
</script>

{#each children as block}
	{#if block.component}
		<block.component {block} />
	{/if}
{/each}
