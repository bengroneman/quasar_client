<script>
  import { onMount, onDestroy } from 'svelte';
  import ExclamationCircle from './icons/ExclamationCircle.svelte';
  import XIcon from './icons/XIcon.svelte';

  export let message = '';
  export let notificationOpen = true;
  const closeNotification = () => (notificationOpen = false);

  // svelte lifecycle
  onMount(() => {
    setTimeout(() => {
      closeNotification();
    }, 5000);
  });

  onDestroy(() => {
    message = '';
    notificationOpen = true;
  });
</script>

{#if notificationOpen}
  <!-- Global notification live region, render this permanently at the end of the document -->
  <div
    aria-live="assertive"
    class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
  >
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <!--
      Notification panel, dynamically insert this into the live region when it needs to be displayed

      Entering: "transform ease-out duration-300 transition"
        From: "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        To: "translate-y-0 opacity-100 sm:translate-x-0"
      Leaving: "transition ease-in duration-100"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <div
        class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
      >
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <!-- Heroicon name: outline/check-circle -->
              <ExclamationCircle />
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">Message: {{ message }}</p>
              <p class="mt-1 text-sm text-gray-500">
                <slot />
              </p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button
                on:click={closeNotification}
                class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span class="sr-only">Close</span>
                <XIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
