<script>
	import { page } from "$app/stores";
</script>

<main id="main-content">
	<section class="page-section section-fill">
		<div class="content-wrapper">
			<h1>{$page.status}</h1>
			<p>{$page.error?.message}</p>
		</div>
	</section>
</main>

<style>
	h1 {
		background-image: var(--y-p-gradient);
		background-clip: text;
		color: transparent;
		text-align: center;
		font-size: 3rem;
		font-weight: 900;
		letter-spacing: 3px;
	}

	p {
		margin-top: 1rem;
		color: var(--subtext-0);
		font-size: 1.2rem;
		text-align: center;
	}
</style>
