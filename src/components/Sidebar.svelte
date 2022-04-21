<script>
  // Utils
  import { goto } from '$app/navigation';
  import { browser } from '$app/env';
  import userStore from '../helpers/userStore.js';

  // Components
  import HomeIcon from './icons/HomeIcon.svelte';
  import ChartIcon from './icons/ChartIcon.svelte';
  import MeasureIcon from './icons/MeasureIcon.svelte';
  import SearchIcon from './icons/SearchIcon.svelte';
  import hp_logo from '../assets/trios-uw_chp_v.png';

  // Global variables
  let user;
  let searchTerm = '';
  let navItems = [
    {
      icon: HomeIcon,
      title: 'Home',
      path: '/main/dashboard',
      enabled: true
    },
    {
      icon: ChartIcon,
      title: 'Scorecard Overview',
      path: '/scorecard/overview',
      enabled: true
    },
    {
      icon: MeasureIcon,
      title: 'Create a Measure',
      path: '/scorecard/measures/create',
      enabled: true
    }
  ];

  $: filteredNavItems = navItems.filter((item) => {
    let lower_title = item.title.toLowerCase();
    return 0 === lower_title.indexOf(searchTerm.toLowerCase());
  });
  userStore.subscribe((u) => {
    user = u;
  });

  function logoutUser() {
    if (browser) {
      window.sessionStorage.clear();
    }
    user['logged_in'] = false;
    goto('/login');
  }
</script>

<div
  class="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:pt-5 lg:pb-4 lg:bg-gray-100"
>
  <div class="flex items-center flex-shrink-0 px-6">
    <img
      src={hp_logo}
      alt="trios healthcare"
      aria-labelledby="Trios healthcare logo"
      href="/"
      class="w-fit"
    />
  </div>
  <!-- Sidebar component, swap this element with another sidebar if you like -->
  <div class="mt-6 h-0 flex-1 flex flex-col overflow-y-auto">
    <!-- User account dropdown -->
    <!-- Sidebar Search -->
    <div class="px-3 mt-5">
      <label for="search" class="sr-only">Search</label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <div
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          aria-hidden="true"
        >
          <SearchIcon />
        </div>
        <input
          type="text"
          name="search"
          bind:value={searchTerm}
          id="search"
          class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md"
          placeholder="Search"
        />
      </div>
    </div>
    <!-- Navigation -->
    <nav class="px-3 mt-6">
      <div class="space-y-1">
        <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-700 hover:text-gray-900 hover:bg-gray-50" -->
        {#each filteredNavItems as item}
          <a href={item.path} class="navbar-item" aria-current="page">
            <svelte:component this={item.icon} />
            {item.title}
          </a>
        {/each}
      </div>
    </nav>
  </div>
  <button on:click={logoutUser} class="button-danger">
    <span class="truncate font-bold mb-0"> Logout </span>
  </button>
</div>
