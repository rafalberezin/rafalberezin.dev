<script lang="ts">
	import type { Parent, Table } from 'mdast'
	import BlockChildren from './BlockChildren.svelte'

	interface Props {
		block: Table
	}

	const { block }: Props = $props()

	const head = {
		children: block.children.length > 0 ? [block.children[0]] : []
	} as Parent

	const body = {
		children: block.children.slice(1)
	} as Parent
</script>

<div class="table-wrapper">
	<table>
		{#if head.children.length > 0}
			<thead>
				<BlockChildren block={head} />
			</thead>
		{/if}
		{#if body.children.length > 0}
			<tbody>
				<BlockChildren block={body} />
			</tbody>
		{/if}
	</table>
</div>

<style>
	.table-wrapper {
		overflow-x: auto;
		margin-bottom: 1em;
	}

	table {
		position: relative;
		border-collapse: collapse;
	}
</style>
