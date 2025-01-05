import type { Writable } from 'svelte/store'

export type ToastType = 'info' | 'success' | 'warning' | 'error'

export interface Toast {
	id: number
	message: string
	type: ToastType
	duration: number /* ms */
}

export interface ToastStore extends Omit<Writable<Toast[]>, 'set' | 'update'> {
	add(message: string, type: ToastType, duration: number): number
	remove(id: number): void
	clear(): void
}
