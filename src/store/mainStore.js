import { writable, derived } from 'svelte/store';
import { browser } from '$app/env';

export const measureRows = writable([]);

if (browser) {
  measureRows.subscribe(val => localStorage.setItem("_qmt_rows", JSON.stringify(val)))
}

export const departments = derived(measureRows, ($measureRows) => {
  const allDepartments = $measureRows.map(row => row.dept_name);
  const uniqueDepartments = [...new Set(allDepartments)];
  if (browser) {
    localStorage.setItem('_departments', uniqueDepartments)
  }
  return uniqueDepartments
});

export const regulations = derived(measureRows, ($measureRows) => {
  const allRegulations = $measureRows.map(row =>
    !row.regulation_code ? 'Uncategorized' : row.regulation_code
  );
  const uniqueRegulations = [...new Set(allRegulations)]
  if (browser) {
    localStorage.setItem('_regulations', uniqueRegulations)
  }
  return uniqueRegulations
});

export const years = derived(measureRows, ($measureRows) => {
  const allYears = $measureRows.map((row) => row.year);
  if (browser) {
    localStorage.setItem('_regulations', allYears)
  }
  return [...new Set(allYears)];
});

