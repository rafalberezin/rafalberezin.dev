<script>
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";

	import "../css/main.css";

	const { children } = $props();
</script>

<svelte:head>
	<title>Rafał Berezin</title>
</svelte:head>

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
		padding-top: 4rem; /* Heading height */
	}
</style>
