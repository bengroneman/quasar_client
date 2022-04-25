import { browser } from '$app/env'
import { writable } from 'svelte/store'

const init_departments = browser ? window.sessionStorage.getItem('departments').split(',') : []

const init_jc_codes = browser ? window.sessionStorage.getItem('jc_codes').split(',') : []

const init_measure_rows = browser ? JSON.parse(window.sessionStorage.getItem('measure_rows')) : []

export const departments = writable(init_departments)
departments.subscribe((dept) => {
    if (browser) {
        window.sessionStorage.setItem('departments', dept)
    }
})

export const jc_codes = writable(init_jc_codes)
jc_codes.subscribe((code) => {
    if (browser) {
        window.sessionStorage.setItem('jc_codes', code)
    }
})

export const measure_rows = writable(init_measure_rows)
measure_rows.subscribe((row) => {
    if (browser) {
        window.sessionStorage.setItem('measure_rows', row)
    }
})
