<script lang="ts">
	import type { ArticleMapDirectory } from '$lib/types/article'
	import { quadOut } from 'svelte/easing'
	import { slide } from 'svelte/transition'
	import ArticleListChildren from './ArticleListChildren.svelte'
	import { LucideArrowDownSquare, LucideArrowUpSquare } from 'lucide-svelte'

	interface Props {
		directory: ArticleMapDirectory
	}

	const { directory }: Props = $props()
	let open = $state(true)
</script>

<div class="wrapper">
	<button class="title" onclick={() => (open = !open)}>
		{#if open}
			<LucideArrowUpSquare class="icon" />
		{:else}
			<LucideArrowDownSquare class="icon" />
		{/if}
		{directory.title}</button>
	{#if open}
		<div class="contents" transition:slide={{ axis: 'y', duration: 150, easing: quadOut }}>
			<ArticleListChildren children={directory.children} />
		</div>
	{/if}
</div>

<style>
	.wrapper {
		border: 1px solid var(--surface-0);
		border-left: none;
		border-right: none;
		margin-top: 0.25em;
	}

	.title {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		gap: 0.5em;
		align-items: center;
		width: 100%;
		padding: 0.5em 0;
		margin-bottom: -1px;
		background-color: transparent;
		color: var(--subtext-0);
		font-weight: bold;
		border: none;
		border-bottom: 1px solid var(--surface-0);
		cursor: pointer;
	}

	.contents {
		padding: 0.5em;
	}
</style>
