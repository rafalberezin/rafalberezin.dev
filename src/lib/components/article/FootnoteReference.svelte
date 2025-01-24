<script lang="ts">
	import type { FootnoteReference } from 'mdast'

	interface Props {
		block: FootnoteReference
	}

	const { block }: Props = $props()
	const { identifier, label } = block
</script>

<sup>
	<a class="hover-bg" href={`#note-def-${identifier}`} id={`note-ref-${identifier}`}>[{label}]</a>
</sup>

<style>
	a {
		font-size: 0.8em;
		color: var(--accent-color);
		padding: 0.2rem;
	}
</style>
