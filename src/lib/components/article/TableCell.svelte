<script lang="ts">
	import type { TableCell } from 'mdast'
	import BlockChildren from './BlockChildren.svelte'

	interface Props {
		block: TableCell
	}

	const { block }: Props = $props()
	const { align, header } = block?.data ?? {}
</script>

{#if header}
	<th class={align !== null ? `align-${align}` : undefined}>
		<BlockChildren {block} />
	</th>
{:else}
	<td class={align !== null ? `align-${align}` : undefined}>
		<BlockChildren {block} />
	</td>
{/if}

<style>
	th,
	td {
		padding: 0.5em 1em;
		border: 1px solid var(--light-border-color);
	}

	th {
		background-color: var(--mantle);
		color: var(--accent-color);
		text-align: center;
		border-color: var(--overlay-0);
	}

	td {
		&.align-left {
			text-align: left;
		}

		&.align-center {
			text-align: center;
		}

		&.align-right {
			text-align: right;
		}
	}
</style>
