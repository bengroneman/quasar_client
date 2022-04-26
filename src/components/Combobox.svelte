<script>
  import CheckIcon from '../components/icons/CheckIcon.svelte';
  import SelectorIcon from '../components/icons/SelectorIcon.svelte';

  export let options = ['All'];
  export let label;
  let selectedOption = '';
  let searching = false;

  const startSearching = () => searching = true;
  const stopSearching = () => searching = false;

  function selectOption(event) {
    selectedOption = event.target.innerText;
    setTimeout(() => {
      searching = false
    }, 500)
  }

  // Search
  $: filteredOptions = options.filter((option) => {
      const lower_option = option.toLowerCase();
      return lower_option.includes(selectedOption.toLowerCase());
  });
</script>

<div class="relative">
  <label for="combobox" class="form-label">{label}</label>
  <input
    id="combobox"
    bind:value={selectedOption}
    on:keydown={startSearching}
    on:keyup={stopSearching}
    on:click={startSearching}
    type="text"
    class="combobox"
    role="combobox"
    aria-controls="options"
    aria-expanded="false"
  />
  <button
    type="button"
    on:click={startSearching}
    class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
  >
    <SelectorIcon />
  </button>
  {#if searching}
    <ul
      class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
    >
      {#each filteredOptions as option, index}
        <li
          on:click|capture={selectOption}
          class="relative cursor-default select-none py-2 pl-8 pr-4 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
          id={'option-' + index}
          role="option"
          tabindex="-1"
        >
          <span class="block truncate">{option}</span>
          <span class="absolute inset-y-0 left-0 flex items-center pl-1.5 text-gray-200">
            <CheckIcon />
          </span>
        </li>
      {/each}
      <!-- More items... -->
    </ul>
  {/if}
</div>
