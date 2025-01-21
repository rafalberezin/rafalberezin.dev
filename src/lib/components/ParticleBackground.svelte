<script lang="ts">
	import { debounce } from '$lib/utils'
	import { onMount } from 'svelte'

	const DENSITY = 15_000
	const MAX_PARTICLES = 200
	const MIN_VELOCITY = 0.01
	const MAX_VELOCITY = 0.03
	const VELOCITY_RANGE = MAX_VELOCITY - MIN_VELOCITY
	const MIN_SIZE = 3
	const MAX_SIZE = 7
	const SIZE_RANGE = MAX_SIZE - MIN_SIZE
	const PARTICLE_COLOR = '#fab387'

	let canvas: HTMLCanvasElement
	let ctx: CanvasRenderingContext2D

	interface Particle {
		x: number
		y: number
		vx: number
		vy: number
		size: number
	}
	let particles: Particle[]

	let previousTimestamp: number
	let nextFrameHandle: number

	function initCanvas() {
		if (!resizeCanvas()) return
		initParticles(DENSITY, canvas.width, canvas.height)
	}

	function resizeCanvas() {
		const previousWidth = canvas.width
		const previousHeight = canvas.height
		canvas.width = canvas.parentElement?.clientWidth ?? 0
		canvas.height = canvas.parentElement?.clientHeight ?? 0

		return canvas.width !== previousWidth || canvas.height !== previousHeight
	}

	function initParticles(density: number, width: number, height: number) {
		const count = Math.min((width * height) / density, MAX_PARTICLES)
		particles = Array.from({ length: count }, () => {
			const x = Math.random() * width
			const y = Math.random() * height
			const vx = Math.random() * VELOCITY_RANGE + MIN_VELOCITY
			const vy = Math.random() * VELOCITY_RANGE + MIN_VELOCITY
			const size = Math.floor(Math.random() * SIZE_RANGE + MIN_SIZE)

			return { x, y, vx, vy, size }
		})
	}

	function updateParticles(delta: number) {
		particles.forEach(particle => {
			particle.x += particle.vx * delta
			particle.y += particle.vy * delta

			if (particle.x - particle.size > canvas.width) particle.x = -particle.size
			if (particle.y - particle.size > canvas.height) particle.y = -particle.size
		})
	}

	function drawParticles(ctx: CanvasRenderingContext2D) {
		particles.forEach(particle => {
			ctx.beginPath()
			ctx.fillStyle = PARTICLE_COLOR
			ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2, false)
			ctx.fill()
		})
	}

	function animate(timestamp: number) {
		const delta = timestamp - previousTimestamp
		previousTimestamp = timestamp

		ctx.clearRect(0, 0, canvas.width, canvas.height)
		updateParticles(Math.min(delta, 50))
		drawParticles(ctx)
		nextFrameHandle = requestAnimationFrame(animate)
	}

	onMount(() => {
		ctx = canvas.getContext('2d') as CanvasRenderingContext2D
		previousTimestamp = performance.now()

		initCanvas()
		nextFrameHandle = requestAnimationFrame(animate)

		const resizeObserver = new ResizeObserver(debounce(initCanvas, 250))
		if (canvas.parentElement) resizeObserver.observe(canvas.parentElement)

		return () => {
			resizeObserver.disconnect()
			cancelAnimationFrame(nextFrameHandle)
		}
	})
</script>

<div class="background">
	<canvas bind:this={canvas}></canvas>
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
