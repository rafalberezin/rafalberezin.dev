<script lang="ts">
	import { LucideCopyright, LucideHeart } from 'lucide-svelte'
</script>

<footer>
	<p>
		Built with <LucideHeart fill="var(--red)" color="var(--red)" aria-label="Love" />
	</p>
	<p>
		Rafał Berezin <LucideCopyright size="16" aria-label="Copyright" /> 2025
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
		color: var(--subtext-0);
		font-family: var(--font-mono);
		font-weight: lighter;
		--red: #ec4646;
	}

	p {
		display: flex;
		align-items: center;
		gap: 0.25em;
	}
</style>
