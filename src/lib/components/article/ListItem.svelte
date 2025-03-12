<script lang="ts">
	import type { ListItem } from 'mdast'
	import { LucideSquare, LucideSquareCheckBig } from 'lucide-svelte'
	import BlockChildren from './BlockChildren.svelte'

	interface Props {
		block: ListItem
	}

	const { block }: Props = $props()
	const { checked } = block
	const todo = typeof checked === 'boolean'
</script>

<li class:todo>
	{#if todo && checked !== null}
		{#if checked}
			<LucideSquareCheckBig color="var(--accent-color)" aria-label="Task completed" />
		{:else}
			<LucideSquare color="var(--overlay-0)" aria-label="Task not completed" />
		{/if}
	{/if}
	<div class="content-wrapper">
		<BlockChildren {block} />
	</div>
</li>

<style>
	li {
		margin-left: 1em;
		max-width: unset;
	}

	.todo {
		display: grid;
		grid-template-columns: max-content auto;
		gap: 0.5em;
		margin-left: 0;

		:global(svg) {
			margin-top: 3px;
		}
	}

	.content-wrapper:global(:first-child) {
		margin-top: 0;
	}
</style>
