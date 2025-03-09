<script lang="ts">
	import type { Blockquote } from 'mdast'
	import BlockChildren from './BlockChildren.svelte'

	interface Props {
		block: Blockquote
	}

	const { block }: Props = $props()
	const { alert } = block.data ?? {}
</script>

<blockquote class={alert ? `alert ${alert.type.toLowerCase()}` : undefined}>
	{#if alert}
		<div class="alert-title">
			<alert.icon aria-hidden="true" />
			{alert.type}
		</div>
	{/if}
	<BlockChildren {block} />
</blockquote>

<style>
	blockquote {
		margin-bottom: 1em;
		padding: 1em;
		background-color: var(--base);
		border-left: 1ch solid var(--accent-color);

		> :global(:first-child) {
			margin-top: 0;
		}

		> :global(:last-child) {
			margin-bottom: 0;
		}

		&:global(:has(.heading)) {
			padding-left: 2.5rem;
		}

		&.alert {
			border-color: var(--alert-color);
			background-color: color-mix(in srgb, var(--alert-color) 10%, transparent);
		}

		&.note {
			--alert-color: var(--blue);
		}
		&.tip {
			--alert-color: var(--green);
		}
		&.important {
			--alert-color: var(--mauve);
		}
		&.warning {
			--alert-color: var(--peach);
		}
		&.caution {
			--alert-color: var(--red);
		}

		.alert-title {
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			gap: 0.6rem;
			margin-bottom: 1rem;
			font-family: var(--font-mono);
			font-size: 1.2rem;
			color: var(--alert-color);
		}
	}
</style>
