import { writable } from 'svelte/store';

const notificationStore = writable({
  message: '',
  type: '',
  show: false
});

notificationStore.subscribe((value) => {
  notificationStore.set({
    message: value.message,
    type: value.type,
    show: value.show
  });
});
