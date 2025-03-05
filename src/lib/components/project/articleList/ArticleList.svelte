<script lang="ts">
	import { debounce } from '$lib/utils'
	import ArticleListChildren from './ArticleListChildren.svelte'
	import type { ArticleMap, ArticleMapChildren } from '$lib/types/article'
	import { arrowFocus } from '$lib/actions/arrowFocus'

	interface Props {
		articles: ArticleMap
	}

	const { articles }: Props = $props()

	function filter(search: string, children: ArticleMapChildren): ArticleMapChildren {
		const filtered: ArticleMapChildren = []
		for (const child of children) {
			if (child.title.toLocaleLowerCase().includes(search)) filtered.push(child)
			else if (child.type === 'directory') {
				const directoryChildren = filter(search, child.children)
				if (directoryChildren.length > 0)
					filtered.push({ type: 'directory', title: child.title, children: directoryChildren })
			}
		}
		return filtered
	}

	function filterArticles(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		const search = (event.target as HTMLInputElement).value.toLowerCase()
		filtered = filter(search, articles.children)
	}

	let filtered = $state(articles.children)
</script>

<nav
	aria-label="Project articles"
	use:arrowFocus={{ loop: true, selector: 'a, button, input', observe: true }}>
	<input type="search" oninput={debounce(filterArticles, 100)} placeholder="Filter articles" />

	<ArticleListChildren children={filtered} />
</nav>

<style>
	nav {
		font-family: var(--font-mono);
	}

	input {
		display: block;
		padding: 0.25em 0.5em;
		width: 100%;
		margin: 1em 0;
		background-color: var(--mantle);
		border: 1px solid var(--surface-0);
		border-radius: 0;

		&:focus {
			border: 1px solid var(--accent-color);
		}

		&::placeholder {
			font-family: var(--font-mono);
		}
	}
</style>
