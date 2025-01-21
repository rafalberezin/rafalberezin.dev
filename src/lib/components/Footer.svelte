<script lang="ts">
	import { LucideCopyright, LucideHeart } from 'lucide-svelte'
</script>

<footer>
	<p>
		Built with <LucideHeart fill="var(--red)" color="var(--red)" aria-label="love" />
	</p>
	<p>
		Rafał Berezin <LucideCopyright size="16" aria-label="copyright" /> 2025
	</p>
</footer>

<style>
	footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1em;
		margin-top: auto;
		padding: 2em 1em;
		background-color: var(--mantle);
		color: var(--subtext-0);
		border-top: 1px solid var(--surface-0);
	}

	p {
		display: flex;
		align-items: center;
		gap: 0.25em;
	}
</style>
