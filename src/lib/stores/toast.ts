import { writable, type Writable } from 'svelte/store'

export interface Toast {
	id: number
	message: string
	type: ToastType
	duration: number /* ms */
}

export type ToastType = 'info' | 'success' | 'warning' | 'error'

export interface ToastStore extends Omit<Writable<Toast[]>, 'set' | 'update'> {
	add(message: string, type: ToastType, duration: number): number
	remove(id: number): void
	clear(): void
}

function createToastStore(): ToastStore {
	const { subscribe, set, update } = writable([] as Toast[])
	let _id = 0

	function add(message: string, type: ToastType, duration: number): number {
		const id = _id++
		update(toasts => {
			toasts.push({ id, message, type, duration })
			setTimeout(() => remove(id), duration)
			return toasts
		})
		return id
	}

	function remove(id: number) {
		update(toasts => toasts.filter(toast => toast.id !== id))
	}

	function clear() {
		set([])
	}

	return {
		subscribe,
		add,
		remove,
		clear
	}
}

export const toaster = createToastStore()
