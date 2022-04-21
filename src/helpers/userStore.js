import { writable } from 'svelte/store';
import { browser } from '$app/env';
import _ from 'lodash';

const userStore = writable(() => {
  if (browser) {
    return _.pick(window.sessionStorage, [
      'corporate_id',
      'department',
      'department_name',
      'logged_in',
      'hospital_id',
      'name',
      'parent_corporation_id',
      'permission_administrator',
      'permission_parent_corporate',
      'permission_quality',
      'permission_trainer',
      'permission_viewer'
    ]);
  }
  return false;
});

export default userStore;
