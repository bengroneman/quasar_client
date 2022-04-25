<script context="module">
  import Combobox from '../components/Combobox.svelte';
  import PlusIcon from '../components/icons/PlusIcon.svelte';

  import { post } from '../helpers/utils';
  import { browser } from '$app/env';
  import _ from 'lodash';

  export let measure_rows = [];
  export let department_names = [];
  let token;

  if (browser) {
    token = window.sessionStorage.getItem('token');
  }
  function addDeptName(name) {
    department_names.push(name);
    return name;
  }

  function editRow(rowIndex) {
    measure_rows[rowIndex].edit = true;
  }

  function colorCodeCell(goal, value, up) {
    if (_.isEqual(value.toString(), value)) {
      return '_table-cell';
    }
    const value_is_good_and_above_goal = up.toLowerCase() === 'up' && value >= goal;
    const value_is_good_and_below_goal = up.toLowerCase() === 'down' && value <= goal;

    if (value_is_good_and_above_goal || value_is_good_and_below_goal) {
      return '_table-cell bg-safe-green';
    } else if (!value_is_good_and_above_goal || !value_is_good_and_below_goal) {
      return '_table-cell bg-danger-red';
    }
    return '_table-cell';
  }

  function saveRow(row, rowIndex) {
    let picked_row = _.pick(row, ['dept_id', 'measure_id', 'hospital_id', 'year', 'metrics']);
    // Setup the one dimensional array to be passed to MSSQL Server
    let flat_row = _.flatten(_.values(picked_row));

    post('api/v1/scorecard/measure', flat_row, token)
      .then(() => {
        measure_rows[rowIndex].edit = false;
      })
      .catch((err) => {
        measure_rows[rowIndex].edit = false;
        console.error(err);
      });
  }

  function openNewMeasureModal() {
    console.log('open modal');
  }
</script>

<div class="flex flex-col z-0 w-full">
  <div class="-mx-4">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-100 sm:rounded-lg">
        <div class="flex justify-end mt-4 pt-4 pr-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <a type="button" href="/scorecard/measures/create" class="button-primary">
            Create Measure
          </a>
        </div>
        <!-- START Oversight Row -->
        <div>
          <div class="px-4 py-6 sm:px-6 lg:px-8">
            <div class="sm:flex sm:items-center">
              <div class="sm:flex-auto">
                <h1 class="text-xl font-light text-gray-900">
                  <span class="block">Facility:</span>
                  <span class="block font-bold pb-4 pt-1">Trios Healthcare</span>
                </h1>
                <div class="grid grid-cols-6 w-full gap-4">
                  <Combobox options={department_names} label="Department" />
                </div>
              </div>
            </div>
            <div class="mt-8 flex flex-col">
              <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full align-middle md:px-6 lg:px-8">
                  <div class="overflow-hidden ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table class="min-w-full table-fixed">
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr class="bg-gray-100 text-black table-row">
                          <th scope="col" class="table-header ">Measure</th>
                          <th scope="col" class="table-header">Goal</th>
                          <th scope="col" class="table-header">Jan</th>
                          <th scope="col" class="table-header">Feb</th>
                          <th scope="col" class="table-header">Mar</th>
                          <th scope="col" class="table-header">Apr</th>
                          <th scope="col" class="table-header">May</th>
                          <th scope="col" class="table-header">Jun</th>
                          <th scope="col" class="table-header">Jul</th>
                          <th scope="col" class="table-header">Aug</th>
                          <th scope="col" class="table-header">Sep</th>
                          <th scope="col" class="table-header">Oct</th>
                          <th scope="col" class="table-header">Nov</th>
                          <th scope="col" class="table-header">Dec</th>
                          <th scope="col" class="table-header" />
                        </tr>
                        {#each measure_rows as row, index}
                          {#if !(department_names.indexOf(row.dept_name) > -1)}
                            <tr class="border-gray-100 bg-gray-50 table-row">
                              <th
                                colspan="1"
                                scope="colgroup"
                                class="table-header font-display text-orange-soda tracking-wide"
                              >
                                <span class="font-bold text-lg">
                                  {addDeptName(row.dept_name)}
                                </span>
                                <div class="input-link-primary flex pt-2">
                                  <kbd
                                    class="inline-flex items-center border border-gray-200 rounded px-2 mr-2 text-sm font-sans font-medium text-gray-400"
                                  >
                                    <span class="pr-2">Add measure to department</span>
                                    <PlusIcon />
                                  </kbd>
                                </div>
                              </th>
                            </tr>
                          {/if}
                          <tr class="table-row">
                            <td class="_table-cell text-left fixed-table-cell">
                              <span class="font-bold word-wrap truncate">
                                {row.measure_description}
                              </span>
                              <span class="block text-sm">JC Criteria: {row.regulation_code}</span>
                            </td>
                            <td class="_table-cell">
                              {row.goal}
                              {#if row.good.toLowerCase() === 'up'}
                                <span class="text-green-500 font-bold"> +</span>
                              {:else if row.good.toLowerCase() === 'down'}
                                <span class="text-red-500 font-bold"> -</span>
                              {:else}
                                <span />
                              {/if}
                            </td>
                            {#each row.metrics as metric}
                              {#if measure_rows[index].edit}
                                <td class="_table-cell w-fit">
                                  <input
                                    type="text"
                                    name="metric"
                                    class="focus:ring-indigo-500 text-center w-full focus:border-indigo-500 block sm:text-sm border-gray-100 rounded-md"
                                    bind:value={metric}
                                  />
                                </td>
                              {:else}
                                <td
                                  class={colorCodeCell(
                                    measure_rows[index].goal,
                                    metric,
                                    measure_rows[index].good
                                  )}
                                >
                                  <span>{metric}</span>
                                </td>
                              {/if}
                            {/each}
                            <td class="_table-cell">
                              {#if row.edit}
                                <input
                                  on:click={() => saveRow(measure_rows[index], index)}
                                  class="input-link-primary"
                                  type="button"
                                  value="Save"
                                />
                              {:else}
                                <input
                                  on:click={() => editRow(index)}
                                  class="input-link-primary"
                                  type="button"
                                  value="Edit"
                                />
                              {/if}
                            </td>
                          </tr>
                        {/each}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--  Oversight Row -->
      </div>
    </div>
  </div>
</div>
