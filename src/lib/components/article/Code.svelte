<script lang="ts">
	import { toaster } from '$lib/stores/toast'
	import { LucideCopy } from 'lucide-svelte'
	import type { Code } from 'mdast'

	interface Props {
		block: Code
	}

	const { block }: Props = $props()
	const { value: content, lang, data } = block
	const params = data?.params ?? {}

	function copyCode(event: MouseEvent) {
		if (!event.currentTarget || !navigator.clipboard) return

		navigator.clipboard.writeText(content)
		toaster.add('Code copied to clipboard', 'success', 3_000)
	}
</script>

<div class="code">
	<div class="title-bar">
		<div class="title">
			<span class="lang">{lang}</span>
			{#if params.title}
				{params.title}
			{/if}
		</div>
		<button class="copy" onclick={copyCode} aria-label="Copy code">
			<LucideCopy aria-hidden="true" />
		</button>
	</div>
	<div class="content" style={`--max-height: ${params.height ?? 'unset'}`}>
		{#if params.lines}
			{@const lines = content.split('\n')}
			{@const linesColWidth = (params.lines + lines.length).toString().length + 2}
			{@const style = `--start-line: ${params.lines - 1}; --lines-col-width: ${linesColWidth}ch`}
			<div class="code-wrapper line-numbers" {style}>
				<code {lang}>
					<pre class="line meta">{params.lines !== 1 ? '...' : ''}</pre>
					{#each lines as line, i}
						<pre class="line" class:highlight={params.highlight?.(params.lines + i)}>{line}</pre>
					{/each}
					<pre class="line meta">{params.continue ? '...' : ''}</pre>
				</code>
			</div>
		{:else}
			<pre class="code-wrapper"><code {lang}><br />{content}<br /><br /></code></pre>
		{/if}
	</div>
</div>

<style>
	.code {
		margin-bottom: 1em;
		font-family: var(--font-mono);
		tab-size: 4ch;

		::selection {
			background-color: var(--overlay-0);
		}
	}

	.title-bar,
	.title {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		gap: 0.5em;
	}

	.title-bar {
		background-color: var(--surface-0);
		border: 1px solid var(--overlay-1);
	}

	.title {
		color: var(--accent-color);
		padding: 0.5em;
	}

	.lang {
		color: var(--subtext-0);
	}

	.copy {
		padding: 0.5em;
		background-color: transparent;
		border: none;
		border-left: 1px solid var(--overlay-1);
		color: var(--subtext-0);
		cursor: pointer;
		transition:
			color var(--transition-duration) linear,
			background-color var(--transition-duration) linear;

		&:is(:hover, :focus-visible) {
			color: var(--accent-color);
			background-color: var(--base);
		}
	}

	.code-wrapper {
		display: block;
		width: 100%;
		max-height: var(--max-height);
		background-color: var(--base);
		border: 1px solid var(--surface-0);
		border-top: none;
		overflow: auto;

		&:not(.line-numbers) {
			padding: 0 1ch;
		}
	}

	.line-numbers {
		counter-reset: line var(--start-line);
	}

	code {
		display: block;
		min-width: max-content;
		width: 100%;
	}

	.line {
		display: block;
		min-height: 1lh;
		padding-right: 1ch;

		&::before {
			content: counter(line);
			counter-increment: line;
			display: inline-block;
			position: sticky;
			margin-right: 1ch;
			left: 0;
			width: var(--lines-col-width);
			padding-right: 1ch;
			background-color: var(--mantle);
			text-align: right;
			color: var(--subtext-0);
			border-right: 1px solid var(--surface-0);
			user-select: none;
			pointer-events: none;
		}

		&.highlight {
			background-color: var(--surface-0);

			&::before {
				background-color: var(--base);
				color: var(--accent-color);
				border-color: var(--overlay-0);
			}
		}

		&.meta {
			color: var(--overlay-2);
			user-select: none;

			&::before {
				content: ' ';
				counter-increment: none;
			}
		}
	}
</style>
