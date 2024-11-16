<script>
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import Toaster from "$lib/components/Toaster.svelte";

	import { toaster } from "$lib/stores/toast";
	import "../css/main.css";

	const { children } = $props();

	// TODO remove when finished
	toaster.add("Website currently in development", "info", 10000);
</script>

<svelte:head>
	<title>Rafał Berezin</title>
</svelte:head>

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
