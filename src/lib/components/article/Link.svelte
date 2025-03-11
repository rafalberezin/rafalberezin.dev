<script lang="ts">
	import type { Link } from 'mdast'
	import BlockChildren from './BlockChildren.svelte'

	interface Props {
		block: Link
	}

	const { block }: Props = $props()
	const { title, url: href, data } = block
</script>

<a {href} {title} class="hover-bg" target={data?.external ? '_blank' : undefined}>
	<BlockChildren {block} />
</a>

<style>
	a {
		display: inline-block;
		position: relative;
		color: var(--accent-color);
		isolation: isolate;

		&::before {
			z-index: -1;
			left: -0.2em;
			width: calc(100% + 0.4em);
		}

		&:global(:has(img)) {
			line-height: 0;
		}
	}
</style>
