<script context="module">
  import { get } from '../../helpers/utils';
  import { browser } from '$app/env'
  import Sidebar from '../../components/Sidebar.svelte';

  /** @type {import('./[slug]').Load} */
  export async function load({ params, fetch, session, stuff }) {
    if (browser) {
      const rows = window.sessionStorage.getItem('measure_rows')
      if (rows === null) {
        const response = await get('api/v1/scorecard/overview/?hospital_id=6&year=2022');
        window.sessionStorage.setItem('measure_rows', JSON.stringify(response))
        return { status: 200 }
      }
    }
    return { status: 200, message: 'Failed to set storage' }
  }
</script>

<div class="min-h-full">
  <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
  <div
    id="nav-menu"
    class="fixed hidden inset-0 flex z-40 lg:hidden"
    role="dialog"
    aria-modal="true"
  >
    <div class="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true" />
    <div class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
      <div class="absolute top-0 right-0 -mr-12 pt-2">
        <button
          id="close-button"
          type="button"
          class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        >
          <span class="sr-only">Close sidebar</span>
          <!-- Heroicon name: outline/x -->
          <svg
            class="h-6 w-6 text-white"
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
        </button>
      </div>
      <Sidebar />
    </div>

    <div class="flex-shrink-0 w-14" aria-hidden="true">
      <!-- Dummy element to force sidebar to shrink to fit close icon -->
    </div>
  </div>

  <Sidebar />

  <!-- Main column -->
  <div class="lg:pl-64 flex flex-col">
    <!-- Search header -->
    <div
      class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden"
    >
      <!-- Sidebar toggle, controls the 'sidebarOpen' sidebar state. -->
      <button
        id="open-button"
        type="button"
        class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
      >
        <span class="sr-only">Open sidebar</span>
        <!-- Heroicon name: outline/menu-alt-1 -->
        <svg
          class="h-6 w-6"
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
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </button>
      <div class="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
        <div class="flex-1 flex">
          <form class="w-full flex md:ml-0" action="#" method="GET">
            <label for="search-field" class="sr-only">Search</label>
            <div class="relative w-full text-gray-400 focus-within:text-gray-600">
              <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                <!-- Heroicon name: solid/search -->
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <input
                id="search-field"
                name="search-field"
                class="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm"
                placeholder="Search"
                type="search"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
    <main class="flex-1">
      <div class="py-12">
        <div class="max-w-full mx-auto px-4 sm:px-6 md:px-8">
          <div class="relative overflow-hidden">
            <div class="mr-auto w-full">
              <div class="sm:text-center lg:text-left">
                <slot />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>
