import { writable, derived } from 'svelte/store';

export const measureRows = writable(localStorage.getItem('_qmt_rows') || []);
measureRows.subscribe(val => localStorage.setItem("_qmt_rows", val))

export const departments = derived(measureRows, ($measureRows) => {
  const allDepartments = $measureRows.map((row) => row.dept_name);
  return [...new Set(allDepartments)];
});

export const regulations = derived(measureRows, ($measureRows) => {
  const allRegulations = $measureRows.map((row) =>
    !row.regulation_code ? 'Uncategorized' : row.regulation_code
  );
  localStorage.setItem('_regulations', allRegulations)
  return [...new Set(allRegulations)];
});

export const years = derived(measureRows, ($measureRows) => {
  const allYears = $measureRows.map((row) => row.year);
  localStorage.setItem('_regulations', allYears)
  return [...new Set(allYears)];
});
