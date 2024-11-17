<script>
	import { debounce } from "$lib/utils";
	import { onMount } from "svelte";
	
		const density = 15000;
		const maxParticles = 200;
		const minVelocity = 0.01;
		const maxVelocity = 0.03;
		const velocityRange = maxVelocity - minVelocity;
		const minSize = 3;
		const maxSize = 7;
		const sizeRange = maxSize - minSize;
		const particleColor = "#fab387";

	/** @type {HTMLCanvasElement} */
	let canvas;

	/** @type {CanvasRenderingContext2D} */
	let ctx;

	/**
	 * @typedef Particle
	 * @property {number} x
	 * @property {number} y
	 * @property {number} vx
	 * @property {number} vy
	 * @property {number} size
	*/

	/** @type {Particle[]} */
	let particles;
	
	/** @type {number} */
	let previousTimestamp;

	/** @type {number} */
	let nextFrameHandle;

	function initCanvas() {
		if (!resizeCanvas()) return;
		initParticles(density, canvas.width, canvas.height);
	}

	function resizeCanvas() {
		const previousWidth = canvas.width;
		const previousHeight = canvas.height;
		canvas.width = canvas.parentElement?.clientWidth ?? 0;
		canvas.height = canvas.parentElement?.clientHeight ?? 0;

		return canvas.width !== previousWidth || canvas.height !== previousHeight;
	}

	/**
	 * @param {number} density
	 * @param {number} width
	 * @param {number} height
	 */
	function initParticles(density, width, height) {
		const count = Math.min(width * height / density, maxParticles);
		particles = Array.from({ length: count }, () => {
			const x = Math.random() * width;
			const y = Math.random() * height;
			const vx = Math.random() * velocityRange + minVelocity;
			const vy = Math.random() * velocityRange + minVelocity;
			const size = Math.floor(Math.random() * sizeRange + minSize);

			return { x, y, vx, vy, size };
		});
	}

	/** @param {number} delta */
	function updateParticles(delta) {
		particles.forEach(particle => {
			particle.x += particle.vx * delta;
			particle.y += particle.vy * delta;

			if (particle.x - particle.size > canvas.width) particle.x = -particle.size;
			if (particle.y - particle.size > canvas.height) particle.y = -particle.size;
		});
	}

	/** @param {CanvasRenderingContext2D} ctx */
	function drawParticles(ctx) {
		particles.forEach(particle => {
			ctx.beginPath();
			ctx.fillStyle = particleColor;
			ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2, false);
			ctx.fill();
		});
	}

	/** @param {number} timestamp */
	function animate(timestamp) {
		const delta = (timestamp - previousTimestamp);
		previousTimestamp = timestamp;
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		updateParticles(Math.min(delta, 50));
		drawParticles(ctx);
		nextFrameHandle = requestAnimationFrame(animate);
	}


	onMount(() => {
		ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext("2d"));

		previousTimestamp = performance.now();
		
		initCanvas();
		nextFrameHandle = requestAnimationFrame(animate);

		const resizeObserver = new ResizeObserver(debounce(initCanvas, 250));
		if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

		return () => {
			resizeObserver.disconnect();
			cancelAnimationFrame(nextFrameHandle);
		}
	});
</script>

<div class="background">
	<canvas bind:this={canvas} ></canvas>
</div>

<style>
	.background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		opacity: 0;
		overflow: hidden;
		animation: fadeIn 800ms ease-out 200ms forwards;
		pointer-events: none;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}

		to {
			opacity: 0.5;
		}
	}
</style>
