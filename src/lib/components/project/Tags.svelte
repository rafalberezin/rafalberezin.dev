<script lang="ts">
	import { LucideTag } from 'lucide-svelte'
	import type { Snippet } from 'svelte'

	interface Props {
		tags: Record<string, string>
		beforeChildren?: Snippet
		afterChildren?: Snippet
	}

	const { tags, beforeChildren, afterChildren }: Props = $props()
</script>

<ul class="tags">
	{@render beforeChildren?.()}

	{#each Object.entries(tags) as [label, color]}
		<li class="tag" style={`color: ${color}`}>
			<LucideTag size="16" aria-hidden="true" />{label}
		</li>
	{/each}

	{@render afterChildren?.()}
</ul>

<style>
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25em;
		list-style-type: none;
		margin-top: auto;

		:global(.tag) {
			display: flex;
			align-content: center;
			gap: 0.25em;
			padding: 0.25em 0.5em;
			border: 1px solid var(--surface-0);
			border-radius: 1em;

			:global(svg) {
				margin-top: 2px;
			}
		}
	}
</style>
