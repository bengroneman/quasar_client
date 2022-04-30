import { writable, derived } from 'svelte/store';

export const measureRows = writable([]);

export const departments = derived(measureRows, ($measureRows) => {
    const allDepartments = $measureRows.map(row => row.dept_name);
    return [...new Set(allDepartments)]
})

export const regulations = derived(measureRows, ($measureRows) => {
    const allRegulations = $measureRows.map(row => !row.regulation_code ? 'Uncategorized' : row.regulation_code);
    return [...new Set(allRegulations)]
})

export const years = derived(measureRows, ($measureRows) => {
    const allYears = $measureRows.map(row => row.year)
    return [... new Set(allYears)]
})

