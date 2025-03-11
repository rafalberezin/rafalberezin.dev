<script lang="ts">
	import type { InlineCode } from 'mdast'

	interface Props {
		block: InlineCode
	}

	const { block }: Props = $props()
</script>

<code class="inline">{block.value}</code>

<style>
	code {
		background-color: var(--base);
		padding: 0.18em 0.5em;
		font-size: 0.9rem;
		font-family: var(--font-mono);
		line-height: 1.75;
		border: 1px solid var(--surface-0);
	}
</style>
