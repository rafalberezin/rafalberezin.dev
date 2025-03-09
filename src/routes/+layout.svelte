<script lang="ts">
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import Toaster from '$lib/components/Toaster.svelte'
	import { afterNavigate, beforeNavigate } from '$app/navigation'

	import '../css/main.css'

	const { children } = $props()

	/* Disable smooth scrolling during page navigation */
	beforeNavigate(() => {
		document.documentElement.classList.add('navigating')
	})
	afterNavigate(() => {
		document.documentElement.classList.remove('navigating')
	})
</script>

<Toaster />

<div class="page">
	<Header />
	{@render children()}
	<Footer />
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
