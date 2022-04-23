<script>
  import Combobox from '../Combobox.svelte';

  let measure = {};
  let isChecked = false;
  let jc_codes = ['test', 'test2'];
  let departments = ['test', 'test2'];
</script>

<div class="space-y-6">
  <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Measure Overview</h3>
        <p class="mt-1 text-sm text-gray-500">Describe the measure from a high level</p>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form class="space-y-6" action="#" method="POST">
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
                class="shadow-sm form-field focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="Describe the measure in detail"
              ></textarea>
            </div>
          </div>
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-3">
              <div class="form-field">
                <label for="measure-metric-type" class="form-label">Metric Type</label>
                <input
                  type="text"
                  name="measure-metric-type"
                  id="measure-metric-type"
                  bind:value={measure.metric_type}
                  class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="25"
                >
                <div class="absolute inset-y-0 right-0 flex items-center">
                  <label for="measure-value-type" class="sr-only">Metric value type</label>
                  <select
                    id="measure-value-type"
                    name="measure-value-type"
                    bind:value={measure.value_type}
                    class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="decimal">Decimal</option>
                    <option value="whole">Whole</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-span-3">
              <div class="flex items-center justify-between">
                <span class="flex-grow flex flex-col">
                  <span class="text-sm font-medium text-gray-900" id="availability-label">
                    Should the target be greater than the goal?
                  </span>
                  <span class="text-sm text-gray-500" id="availability-description">
                    Describe this
                  </span>
                </span>
                <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
                <button
                  type="button"
                  class="{isChecked ? 'check-box bg-dark-orchid': 'check-box bg-gray-200'}"
                  on:click={isChecked = !isChecked}
                  role="switch"
                  aria-checked="false"
                  aria-labelledby="target greater than goal"
                  aria-describedby="Should the target be greater than the goal?"
                >
                  <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                  <span
                    aria-hidden="true"

                    class="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                  ></span>
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
      >Cancel</button>
    <button
      type="submit"
      class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >Save</button>
  </div>
</div>
