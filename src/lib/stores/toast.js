/**
 * @typedef {import('$lib/types/toast').Toast} Toast
 * @typedef {import('$lib/types/toast').ToastType} ToastType
 * @typedef {import('$lib/types/toast').ToastStore} ToastStore
 */

import { writable } from 'svelte/store'

/**
 * @returns {ToastStore}
 */
function createToastStore() {
	const { subscribe, set, update } = writable(/** @type {Toast[]} */ ([]))
	let _id = 0

	/**
	 * @param {string} message
	 * @param {ToastType} type
	 * @param {number} duration
	 * @returns {number}
	 */
	function add(message, type, duration) {
		const id = _id++
		update(toasts => {
			toasts.push({ id, message, type, duration })
			setTimeout(() => remove(id), duration)
			return toasts
		})
		return id
	}

	/**
	 * @param {number} id
	 */
	function remove(id) {
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
