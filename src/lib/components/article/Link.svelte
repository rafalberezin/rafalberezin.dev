<script lang="ts">
	import type { Link } from 'mdast'
	import BlockChildren from './BlockChildren.svelte'

	interface Props {
		block: Link
	}

	const { block }: Props = $props()
	const { title, url: href } = block
</script>

<a {href} {title} class="hover-bg">
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
		}

		&:global(:has(img)) {
			line-height: 0;
		}
	}
</style>
