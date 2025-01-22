import { browser } from '$app/environment'
import { readable } from 'svelte/store'

const DEFAULT = true
const MOBILE_BREAKPOINT = 650

export const mobile = readable(DEFAULT, set => {
	if (!browser) return

	function update() {
		set(window.innerWidth < MOBILE_BREAKPOINT)
	}

	update()
	window.addEventListener('resize', update)

	return () => {
		window.removeEventListener('resize', update)
	}
})
