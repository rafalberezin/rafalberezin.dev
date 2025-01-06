<script>
	import { clickOutside } from '$lib/actions/clickOutside'
	import { loopFocus } from '$lib/actions/loopFocus'

	import { onNavigate } from '$app/navigation'
	import { quadOut } from 'svelte/easing'
	import { derived } from 'svelte/store'
	import { fly, slide } from 'svelte/transition'
	import {
		LucideFolderGit2,
		LucideHome,
		LucideMail,
		LucideMenu,
		LucideX
	} from 'lucide-svelte'

	const WIDTH_BREAKPOINT = 650
	const MAIN_NAV_LINKS = [
		{
			href: '/',
			label: 'home',
			icon: LucideHome
		},
		{
			href: '/projects',
			label: 'projects',
			icon: LucideFolderGit2
		},
		{
			href: '/contact',
			label: 'contact',
			icon: LucideMail
		}
	]

	let navbarWidth = $state(1920)
	let mobile = $derived(navbarWidth < WIDTH_BREAKPOINT)
	let open = $state(false)

	let scrollTop = $state(0)
	let top = $derived(scrollTop == 0)

	$effect(() => {
		if (!mobile) open = false
	})

	onNavigate(() => {
		open = false
	})

	// svelte-ignore non_reactive_update
	let mobileToggle
</script>

<svelte:window bind:scrollY={scrollTop} />

<a href="#main-content" class="skip-to-content">Skip to content</a>

<header
	bind:clientWidth={navbarWidth}
	class:top
	class:mobile
	class:open
	use:clickOutside={_ => (open = false)}>
	<div class="container">
		<a href="/" class="logo">
			<img src="favicon.svg" alt="Logo" />
			<span class="name">rafalberezin<span class="highlight">.dev</span></span>
		</a>

		<button
			class="mobile-toggle"
			onclick={() => (open = !open)}
			aria-label="toggle navigation"
			aria-expanded={open}
			bind:this={mobileToggle}>
			{#if open}
				<LucideX />
			{:else}
				<LucideMenu />
			{/if}
		</button>

		{#if mobile}
			{#if open}
				<nav
					class="mobile"
					transition:slide={{
						duration: 150,
						axis: 'y',
						easing: quadOut
					}}
					use:loopFocus={{ loopTo: mobileToggle }}>
					{#each MAIN_NAV_LINKS as link, i}
						<a
							in:fly|global={{
								delay: i * 100 + 150,
								duration: 100,
								y: 25,
								easing: quadOut
							}}
							href={link.href}
							data-focusable>
							<link.icon />{link.label}
						</a>
					{/each}
				</nav>
			{/if}
		{:else}
			<nav class="links">
				{#each MAIN_NAV_LINKS as link}
					<a href={link.href}><link.icon />{link.label}</a>
				{/each}
			</nav>
		{/if}
	</div>
</header>

<style>
	.skip-to-content {
		position: fixed;
		top: 0.5em;
		left: 0.5em;
		display: grid;
		justify-content: center;
		align-content: center;
		height: 3em;
		padding: 1em;
		background-color: var(--surface-0);
		color: var(--text);
		font-weight: bold;
		text-decoration: none;
		border: 1px solid var(--surface-0);
		z-index: 110;
		transform: translateY(-120%);
		transition: transform var(--transition-duration) ease-out;

		&:focus-visible {
			transform: translateY(0);
		}
	}

	header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 4rem;
		background-color: #1e1e2e80;
		backdrop-filter: blur(2px);
		border-bottom: 1px solid transparent;
		transition: border-bottom-color var(--transition-duration) ease-out;
		z-index: 100;

		&:is(:not(.top), .mobile.open) {
			border-bottom-color: var(--surface-0);
		}
	}

	.container {
		display: flex;
		justify-content: space-between;
		gap: 1em;
		height: 100%;
		width: 100%;
		max-width: 1200px;
		margin-left: auto;
		margin-right: auto;
		padding: 0.5em;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.5em;
		padding: 0 1em;

		color: var(--subtext-0);
		font-family: var(--font-mono);
		letter-spacing: 2px;
		text-transform: uppercase;
		transition: color var(--transition-duration) linear;

		img {
			width: 2.3em;
			aspect-ratio: 1;
		}

		.highlight {
			color: var(--peach);
		}

		&:is(:hover, :focus-visible) {
			color: var(--text);
		}
	}

	@media (max-width: 800px) {
		.name {
			display: none;
		}
	}

	nav {
		display: flex;
		gap: 2em;
		justify-content: end;
		padding: 0 1em;
	}

	nav > a {
		display: flex;
		align-items: center;
		gap: 0.5em;
		padding: 0.5em 1em;
		color: var(--text);
		font-weight: normal;
		text-transform: uppercase;
		letter-spacing: 1px;
		transition: color var(--transition-duration) linear;

		&:is(:hover, :focus-visible) {
			color: var(--yellow);
		}
	}

	nav.mobile {
		position: absolute;
		top: 4rem;
		left: 0;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		width: 100%;
		height: calc(100vh - 4rem);
		padding-top: 2em;
		background-color: var(--mantle);
		border-bottom: 1px solid var(--surface-0);
	}

	.mobile-toggle {
		display: none;
		justify-content: center;
		align-content: center;
		height: 100%;
		background-color: transparent;
		border: 1px solid var(--surface-0);
		aspect-ratio: 1;
		cursor: pointer;
		transition: background-color var(--transition-duration) linear;

		&:is(:hover, :focus-visible) {
			background-color: var(--surface-0);
		}
	}

	.mobile .mobile-toggle {
		display: grid;
	}
</style>
