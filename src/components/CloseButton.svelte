<svelte:options tag="close-button" />

<script>
  import { sidebar_open } from './stores.js';

  function toggleSidebar() {
    sidebar_open.set(!sidebar_open);
  }
</script>

<button
  on:click={toggleSidebar}
  type="button"
  class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
>
  {#if sidebar_open}
    <span class="sr-only">Close sidebar</span>
    <!-- Heroicon name: outline/x -->
    <svg
      class="h-6 w-6 text-black font-bold"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  {:else}
    <span class="sr-only">Open sidebar</span>
    <!-- Heroicon name: menu -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  {/if}
</button>
