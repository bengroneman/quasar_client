<script>
  import Combobox from '../Combobox.svelte';
  import { post } from '../../helpers/utils.js';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  export let measure = {};
  export let departments;
  export let regulations;

  onMount(() => (measure.good = false));

  function toggleSwitch() {
    measure.good = !measure.good;
  }
  // TODO: come back to this
  function parseValueType(valtype) {
    switch (valtype) {
      case 'percentage':
        return (measure['value'] = '25.2%');
      case 'decimal':
        return (measure['value'] = '25.2');
      default:
        return (measure['value'] = '25');
    }
  }
  function clearForm() {
    measure = {};
    goto('/scorecard/measures');
  }
  function handleSubmit() {
    // let token = undefined;
    // if (browser) {
    //   token = window.sessionStorage.getItem('_qmt_token');
    // }
    // if (token) {
    //   post('api/v1/measures/create', measure, token);
    // }
  }
</script>

<div class="space-y-6">
  <div
    class="bg-white mx-auto md:max-w-2xl shadow-sm border border-gray-50 px-4 py-5 sm:rounded-lg sm:p-6"
  >
    <form class="space-y-6">
      <div class="grid grid-cols-3 gap-6">
        <div class="form-field lg:col-span-2 sm:col-span-3 pl-4">
          <label for="title" class="form-label"> Title </label>
          <input
            id="title"
            bind:value={measure.title}
            type="text"
            name="title"
            class="form-input"
            placeholder="Simple title"
            autocomplete="off"
          />
        </div>
        <div class="form-field lg:col-span-1 sm:col-span-3">
          <label for="measure-regulation-code" class="form-label">JC Regulation Code</label>
          <select
            id="measure-regulation-code"
            name="measure-regulation-code"
            bind:value={measure.regulation_code}
            class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
          >
            {#each regulations as reg}
              <option>{reg}</option>
            {/each}
          </select>
        </div>
      </div>
      <div class="relative">
        <label for="measure-description" class="form-label z-20"> Description </label>
        <div class="mt-1">
          <textarea
            id="measure-description"
            name="measure-description"
            rows="3"
            bind:value={measure.description}
            class="shadow-sm form-field focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
            placeholder="Describe the measure in detail"
          />
        </div>
      </div>
      <div class="grid grid-cols-6 gap-6">
        <div class="col-span-2">
          <div class="relative form-field flex justify-center">
            <label for="measure-metric-type" class="form-label">Metric Type</label>
            <select
              id="measure-metric-type"
              name="measure-metric-type"
              bind:value={measure.val_type}
              class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
            >
              <option value="percentage">Percentage</option>
              <option value="decimal">Decimal</option>
              <option value="whole">Whole</option>
            </select>
          </div>
        </div>
        <div class="col-span-3">
          <div class="flex items-center justify-between">
            <span class="flex-grow text-sm flex flex-col">
              <span class="font-medium text-gray-900" id="availability-label">
                Should the metric be greater than the goal?
              </span>
            </span>
            <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
            <button
              type="button"
              class={measure.good ? 'check-box bg-dark-orchid' : 'check-box bg-gray-200'}
              on:click={toggleSwitch}
              role="switch"
              aria-checked="false"
              aria-labelledby="target greater than goal"
              aria-describedby="Should the target be greater than the goal?"
            >
              <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
              <span
                aria-hidden="true"
                class={measure.good ? 'check-circle translate-x-5' : 'check-circle translate-x-0'}
              />
            </button>
          </div>
        </div>
      </div>
      <div class="flex justify-end pb-6">
        <button type="button" on:click={clearForm} class="button-secondary">Cancel</button>
        <button
          type="submit"
          on:click={handleSubmit}
          class="button-danger cursor-not-allowed"
          disabled>Save</button
        >
      </div>
    </form>
  </div>
</div>
