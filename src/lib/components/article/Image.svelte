<script lang="ts">
	import type { Image } from 'mdast'

	interface Props {
		block: Image
	}

	const { block }: Props = $props()
	const { alt, title, url: src } = block
</script>

<img {src} {alt} {title} />

<style>
	img {
		display: inline-block;
	}
</style>
