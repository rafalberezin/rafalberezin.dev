<script lang="ts">
	import { onNavigate } from '$app/navigation'
	import { fade, slide } from 'svelte/transition'
	import { quadOut } from 'svelte/easing'
	import Article from '$lib/components/article/Article.svelte'
	import ProjectInfo from '$lib/components/project/ProjectInfo.svelte'
	import ArticleList from '$lib/components/project/articleList/ArticleList.svelte'
	import TableOfContents from '$lib/components/TableOfContents.svelte'
	import { LucideBookText, LucideFileSearch, LucideFolderSearch } from 'lucide-svelte'
	import { preprocessMarkdown } from '$lib/markdown/preprocess'
	import { generateTOC } from '$lib/markdown/tableOfContents.js'
	import { mobile } from '$lib/stores/mobile.js'
	import type { Component } from 'svelte'

	const { data } = $props()
	let innerWidth = $state(0)
	const LAYOUT_BREAKPOINT = 1000
	let columns = $derived(innerWidth > LAYOUT_BREAKPOINT)

	type Tab = 'project-info' | 'articles' | 'toc'
	const infoSectionButtons: { tab: Tab; icon: Component }[] = [
		{
			tab: 'project-info',
			icon: LucideBookText as unknown as Component
		},
		{
			tab: 'articles',
			icon: LucideFolderSearch as unknown as Component
		},
		{
			tab: 'toc',
			icon: LucideFileSearch as unknown as Component
		}
	]

	let infoTab = $state(undefined as Tab | undefined)
	let open = $derived(infoTab !== undefined)

	function switchTab(newTab: Tab) {
		if (newTab === infoTab) {
			infoTab = undefined
		} else {
			infoTab = newTab
		}
	}

	$effect(() => {
		if (columns) {
			infoTab = undefined
		}
	})

	onNavigate(() => (infoTab = undefined))
</script>

<svelte:window bind:innerWidth />

<svelte:head>
	<title>{data.title}</title>
</svelte:head>

<div
	class="article-layout"
	class:columns
	style={`--accent-color: ${data.project.color}`}
	class:mobile={$mobile}>
	{#await preprocessMarkdown(data.article)}
		<main id="main-content">
			<p>Loading...</p>
		</main>
	{:then mdast}
		{@const toc = generateTOC(mdast)}

		<main id="main-content">
			<Article {mdast} />
		</main>

		{#if columns}
			<aside class="project-info-column">
				<ProjectInfo project={data.project}>
					<ArticleList articles={data.project.articles} />
				</ProjectInfo>
			</aside>
			<aside class="toc-column">
				<TableOfContents {toc} />
			</aside>
		{:else}
			{#if open}
				<div class="info-sections" transition:slide={{ duration: 150, axis: 'y', easing: quadOut }}>
					{#if infoTab === 'project-info'}
						<div class="wrapper" in:fade={{ duration: 150 }}>
							<ProjectInfo project={data.project} />
						</div>
					{:else if infoTab === 'articles'}
						<div class="wrapper" in:fade={{ duration: 150 }}>
							<div class="article-list-tab">
								<ArticleList articles={data.project.articles} />
							</div>
						</div>
					{:else if infoTab === 'toc'}
						<div class="wrapper" in:fade={{ duration: 150 }}>
							<TableOfContents {toc} />
						</div>
					{/if}
				</div>
			{/if}
			<div class="bottom-bar">
				{#each infoSectionButtons as button}
					<button onclick={() => switchTab(button.tab)} class:active={button.tab === infoTab}
						><button.icon /></button>
				{/each}
			</div>
		{/if}
	{:catch error}
		<main id="main-content">
			<section class="page-section section-fill error">
				<div class="content-wrapper">
					<h2>Something went wrong while loading this article.</h2>
					<details>
						<summary>Show details</summary>
						<div class="details-wrapper">
							<pre>{error}</pre>
						</div>
					</details>
				</div>
			</section>
		</main>
	{/await}
</div>

<style>
	.article-layout {
		padding-top: var(--header-height);
		min-height: calc(100vh - 124px);
	}

	.columns {
		display: grid;
		align-items: start;
		grid-template-areas: 'project-info main-content toc';
		grid-template-columns: 1fr min(1000px, 60%) 1fr;
	}

	main {
		grid-area: main-content;
		background-color: var(--mantle);
		height: 100%;
	}

	:global(html) {
		scroll-padding-top: var(--header-height);
	}

	aside {
		position: sticky;
		top: var(--header-height);
		max-height: calc(100vh - var(--header-height));
		overflow-y: auto;

		&.project-info-column {
			grid-area: project-info;
		}

		&.toc-column {
			grid-area: toc;
		}
	}

	.bottom-bar {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		position: sticky;
		bottom: 0;
		height: var(--header-height);
		border-top: 1px solid var(--surface-0);
		background-color: var(--base);

		button {
			flex: 1;
			display: grid;
			place-content: center;
			background-color: transparent;
			border: none;
			border-radius: none;
			cursor: pointer;
			transition: background-color var(--transition-duration) linear;

			&:is(:hover, :focus-visible) {
				background-color: var(--surface-0);
			}

			&.active {
				background-color: var(--mantle);
			}
		}
	}

	.info-sections {
		position: sticky;
		width: 100%;
		height: calc(100vh - 2 * var(--header-height));
		bottom: var(--header-height);
		background-color: var(--base);
	}

	.wrapper {
		height: 100%;
	}

	.article-list-tab {
		padding: 1em 2em;
	}

	.page-section.error {
		padding: 2rem 1rem;
		justify-content: start;

		h2 {
			color: var(--red);
			margin-bottom: 0.5rem;
		}

		.content-wrapper {
			width: 100%;
		}

		details {
			font-family: var(--font-mono);
		}

		summary {
			padding: 0.5em;
			margin-bottom: 0.5em;
			cursor: pointer;
			text-align: center;
		}

		.details-wrapper {
			padding: 1em;
			background-color: var(--base);
			overflow-x: auto;
		}
	}
</style>
