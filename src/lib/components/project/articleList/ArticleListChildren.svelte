<script lang="ts">
	import { page } from '$app/state'
	import ArticleListDirectory from './ArticleListDirectory.svelte'
	import type { ArticleMapChildren } from '$lib/types/article'

	interface Props {
		children: ArticleMapChildren
	}

	const { children }: Props = $props()
</script>

<ul>
	{#each children as child}
		{#if child.type === 'article'}
			{@const path = `/projects/${child.path}`}
			<li class="article">
				<a href={path} class="hover-bg" class:active={page.url.pathname === path}>{child.title}</a>
			</li>
		{:else}
			<li class="directory">
				<ArticleListDirectory directory={child} />
			</li>
		{/if}
	{/each}
</ul>

<style>
	ul {
		list-style-type: none;
	}

	.article {
		a {
			display: block;
			padding: 0.25em;
			width: 100%;
			color: var(--subtext-1);
			font-weight: normal;
			transition: color var(--transition-duration) linear;

			&:is(:hover, :focus-visible) {
				color: var(--accent-color);
			}

			&.active {
				font-weight: bold;
				color: var(--accent-color);
			}
		}
	}
</style>
