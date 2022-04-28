<script>
  import Combobox from '../Combobox.svelte';
  import { post } from '../../helpers/utils.js';

  export let measure = {}
  let measureDescription = '';
  let isChecked = false;
  export let departments;
  export let jc_codes;
  function toggleSwitch() {
    isChecked = !isChecked;
  }
  // TODO: come back to this
  function parseValueType(valtype) {
    switch (valtype) {
      case 'percentage':
        return measure['value'] = '25.2%'
      case 'decimal':
        return measure['value'] = '25.2'
      default:
        return measure['value'] = '25'
    }
  }
  function handleSubmit(event) {
    const newMeasure = new FormData(event.target)
    post('api/v1/measures/create', newMeasure)
  }
</script>

<div class="space-y-6">
  <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Measure Overview</h3>
        <p class="mt-1 text-sm text-gray-500">Describe the measure from a high level</p>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form class="space-y-6" on:submit|preventDefault={handleSubmit}>
          <div class="grid grid-cols-3 gap-6">
            <div class="form-field lg:col-span-1 sm:col-span-3 pl-4">
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
            <Combobox class="sm:col-span-3" label="Department" options={departments} />
            <Combobox label="JC Regulation Code" options={jc_codes} />
          </div>
          <div class="relative">
            <label for="measure-description" class="form-label z-20"> Description </label>
            <div class="mt-1">
              <textarea
                id="measure-description"
                name="measure-description"
                rows="3"
                value={measureDescription}
                class="shadow-sm form-field focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="Describe the measure in detail"
              />
            </div>
          </div>
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-2">
              <div class="relative form-field flex justify-end">
                <label for="measure-metric-type" class="form-label">Metric Type</label>
                  <select
                    id="measure-metric-type"
                    name="measure-metric-type"
                    bind:value={measure.metric_type}
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
                  <span class="pt-4 text-gray-500">
                    metric > goal =
                    <span
                      class={isChecked ? 'text-danger-red font-bold' : 'text-safe-green font-bold'}
                    >
                      {isChecked ? 'bad' : 'good'}
                    </span>
                  </span>
                </span>
                <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
                <button
                  type="button"
                  class={isChecked ? 'check-box bg-dark-orchid' : 'check-box bg-gray-200'}
                  on:click={toggleSwitch}
                  role="switch"
                  aria-checked="false"
                  aria-labelledby="target greater than goal"
                  aria-describedby="Should the target be greater than the goal?"
                >
                  <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                  <span
                    aria-hidden="true"
                    class={isChecked ? 'check-circle translate-x-5' : 'check-circle translate-x-0'}
                  />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="flex justify-end">
    <button
      type="button"
      class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >Cancel</button
    >
    <button
      type="submit"
      class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >Save</button
    >
  </div>
</div>
