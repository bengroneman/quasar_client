import { browser } from '$app/env';
import { writable } from 'svelte/store';

function getInitDepartments() {
  if (browser) {
    try {
      return window.sessionStorage.getItem('departments').split(',');
    } catch (e) {
      return [];
    }
  }
  return [];
}
const init_departments = getInitDepartments();

function getInitJCCodes() {
  if (browser) {
    try {
      return window.sessionStorage.getItem('jc_codes').split(',');
    } catch (e) {
      return [];
    }
  }
  return [];
}
const init_jc_codes = getInitJCCodes();

function getInitMeasureRows() {
  if (browser) {
    try {
      return JSON.parse(window.sessionStorage.getItem('measure_rows'));
    } catch (e) {
      return [];
    }
  }
  return [];
}
const init_measure_rows = getInitMeasureRows();

export const departments = writable(init_departments);
departments.subscribe((dept) => {
  if (browser) {
    window.sessionStorage.setItem('departments', dept);
  }
});

export const jc_codes = writable(init_jc_codes);
jc_codes.subscribe((code) => {
  if (browser) {
    window.sessionStorage.setItem('jc_codes', code);
  }
});

export const measure_rows = writable(init_measure_rows);
measure_rows.subscribe((row) => {
  if (browser) {
    window.sessionStorage.setItem('measure_rows', row);
  }
});
