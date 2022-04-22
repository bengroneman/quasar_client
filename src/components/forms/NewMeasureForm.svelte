<script>
  import Combobox from '../Combobox.svelte';
  import PlusIcon from '../icons/PlusIcon.svelte';
  import ToggleWithLabelandDescription from './ToggleWithLabelandDescription.svelte';

  let measure = {};
  let selectedMetricType;
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
            <Combobox class="sm:col-span-3" label="Department" options={departments}/>
            <Combobox label="JC Regulation Code" options={jc_codes}/>
          </div>

          <div class="relative">
            <label for="measure-description" class="form-label z-20"> Description </label>
            <div class="mt-1">
              <textarea
                id="measure-description"
                name="measure-description"
                rows="3"
                class="shadow-sm form-field focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="Describe the measure in detail"></textarea>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Measure Metric Details</h3>
        <p class="mt-1 text-sm text-gray-500">Outline the metrics, timeline and data types for your measure</p>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div class="grid grid-cols-6 gap-6">

            <div class="col-span-3">
              <label for="phone-number" class="block text-sm font-medium text-gray-700">Metric Type</label>
              <div class="mt-1 relative rounded-md shadow-sm divide-x">
                <div class="absolute inset-y-0 left-0 flex items-center">
                  <label for="measure-metric-type" class="sr-only">Metric Type</label>
                  <select bind:value={selectedMetricType} id="measure-metric-type" name="measure-metric-type" autocomplete="off" class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-3 pr-7 f-full border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
                    <option value="%">Percentage %25</option>
                    <option value=".">Decimal .25</option>
                    <option value="#">Whole 25</option>
                  </select>
                </div>
                <input type="text" name="measure-metric-type" id="measure-metric-type" class="focus:ring-indigo-500 focus:border-indigo-500 w-full pl-36 border-l font-bold sm:text-sm border-gray-300 rounded-md" placeholder="25">
              </div>
            </div>

            <div class="space-y-3 form-field col-span-3">
              <label for="new-metric" class="form-label">Add metrics</label>
              <div class="mt-1 relative flex items-center">
                <input type="text" name="new-metric" id="new-metric" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md">
                <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                  <kbd class="inline-flex items-center border border-gray-200 rounded px-2 mr-2 text-sm font-sans font-medium text-gray-400">
                    Enter
                  </kbd>
                  <PlusIcon />
                </div>
              </div>
            </div>
            <div class="col-span-6 sm:col-span-6">
              <ToggleWithLabelandDescription label="Should the target be greater than the goal?" description="Describe this" />
            </div>

          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="flex justify-end">
    <button type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</button>
    <button type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
  </div>
</div>
