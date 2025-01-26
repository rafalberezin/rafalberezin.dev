<script lang="ts">
	import type { Image } from 'mdast'

	interface Props {
		block: Image
	}

	const { block }: Props = $props()
	const { alt, title, url: src, data } = block
	const { center, width } = data?.params ?? {}
	const style = width ? `max-width: ${width}; width: 100%` : undefined
</script>

<img {src} {alt} {title} {style} class:center />

<style>
	img {
		display: inline-block;

		&.center {
			display: block;
			margin-left: auto;
			margin-right: auto;
		}
	}
</style>
