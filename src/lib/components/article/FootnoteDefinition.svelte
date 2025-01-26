<script lang="ts">
	import type { FootnoteDefinition } from 'mdast'
	import BlockChildren from './BlockChildren.svelte'

	interface Props {
		block: FootnoteDefinition
	}

	const { block }: Props = $props()
	const { identifier, label } = block
</script>

<div class="footnote">
	<a class="hover-bg" href={`#note-ref-${identifier}`} id={`note-def-${identifier}`}>{label}:</a>
	<div class="content">
		<BlockChildren {block} />
	</div>
</div>

<style>
	.footnote {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;

		a {
			height: min-content;
			padding: 0.2em;
			color: var(--accent-color);
			font-weight: normal;
		}

		.content {
			padding: 0.2em;

			:global(p) {
				margin-bottom: 0.5em;

				&:last-child {
					margin-bottom: 0;
				}
			}
		}
	}
</style>
