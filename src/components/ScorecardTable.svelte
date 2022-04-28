<script>
  // data
  import { departments, jc_codes, years, measure_rows } from '../lib/mainStore';
  import { browser } from '$app/env';

  // utils
  import { beforeUpdate, afterUpdate } from 'svelte';
  import * as cookie from 'cookie';
  import _ from 'lodash';

  // components
  import ScorecardMeasureLineChart from './charts/ScorecardMeasureLineChart.svelte';
  import ExternalLinkIcon from './icons/ExternalLinkIcon.svelte';
  import NewMeasureForm from './forms/NewMeasureForm.svelte';
  import MeasureIcon from './icons/MeasureIcon.svelte';
  import Combobox from './Combobox.svelte';
  import Modal from './Modal.svelte';

  // globals
  let modalOpen = false;
  let local_departments = [];

  let selectedMeasureID = 0;
  let selectedDepartment = '';

  // reactive globals
  $: selectedMeasure = _.find($measure_rows, (row) => row.measure_id === selectedMeasureID);
  $: local_measure_rows = $measure_rows.filter(
    (row) => Array(row.dept_name).indexOf(selectedDepartment) > -1
  );
  $: localDepartments = $departments;
  $: localJCCodes = $jc_codes;
  $: local_years = $years;

  // lifecycle hooks
  beforeUpdate(() => {
    if (local_departments.length >= 1) {
      local_departments = [];
    }
  });

  // functions
  function addRowToDept(n) {
    local_departments.push(n);
    return n;
  }

  function editRow(rowIndex) {
    local_measure_rows[rowIndex].edit = true;
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

  async function saveRow(row, rowIndex) {
    let picked_row = _.pick(row, ['dept_id', 'measure_id', 'hospital_id', 'year', 'metrics']);
    // Setup the one dimensional array to be passed to MSSQL Server
    let flat_row = _.flatten(_.values(picked_row));

    // TODO: Ensure token is picked up during standard post call
    // TODO: Consider using svelte kit fetch instead
    let auth_token = '';
    if (browser) {
      const local_cookie = cookie.parse(document.cookie)
      auth_token = local_cookie.token
      console.log(auth_token)
    }
    const options = {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(flat_row || {}),
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth_token}`
      }
    }
    const response = await fetch('api/v1/scorecard/measure', options)
      .then((res) => {
        local_measure_rows[rowIndex].edit = false;
        return res.json();
      })
      .catch((err) => {
        local_measure_rows[rowIndex].edit = false;
        console.error(err);
      });
    console.log(response)
  }

  function handleMeasureClick(event) {
    // TODO: look into deprecation of srcElement
    const elementID = event.srcElement.parentElement.id;
    selectedMeasureID = Number(elementID.split('-').slice(-1));
    modalOpen = true;
  }
  // TODO: rework this entirely
  function rowHasBeenLabeledBefore(i, dept_name) {
    return i === local_measure_rows.indexOf((val) => val.dept_name === dept_name);
  }
</script>

{#if modalOpen}
  <Modal bind:modalOpen>
    <h2>{selectedMeasure['measure_description']}</h2>
    <div class="body">
      <ScorecardMeasureLineChart
        goal={selectedMeasure['goal']}
        metrics={selectedMeasure['metrics']}
      />
    </div>
    <hr />
    <NewMeasureForm
      measure={selectedMeasure}
      departments={localDepartments}
      jc_codes={localJCCodes}
    />
  </Modal>
{/if}

<div class="flex flex-col z-0 w-full">
  <div class="-mx-4">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-100 sm:rounded-lg">
        <div class="flex justify-end mt-4 pt-4 pr-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <a href="/scorecard/measures/create" type="button" class="button-primary">
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
                  <Combobox
                    options={$departments}
                    label="Department"
                    bind:selectedOption={selectedDepartment}
                  />
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

                        {#each local_measure_rows as row, index}
                          {#if rowHasBeenLabeledBefore(index, row.dept_name)}
                            <tr class="border-gray-100 bg-gray-50 table-row">
                              <th
                                colspan="1"
                                scope="colgroup"
                                class="table-header font-display text-orange-soda tracking-wide"
                              >
                                <span class="font-bold text-lg">
                                  {addRowToDept(row.dept_name)}
                                </span>
                              </th>
                            </tr>
                          {/if}
                          <tr class="table-row">
                            <td
                              id="measure-{row.measure_id}"
                              on:click|stopPropagation={handleMeasureClick}
                              class="_table-cell text-left fixed-table-cell cursor-pointer hover:bg-gray-50 flex flex-col relative"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6 inline-block standard-svg align-middle -ml-6 absolute"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                              <span class="font-bold block pl-2 word-wrap truncate">
                                {row.measure_description}
                              </span>
                              <span class="block text-sm pl-2"
                                >JC Criteria: {row.regulation_code}</span
                              >
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
                              {#if local_measure_rows[index].edit}
                                <td class="_table-cell w-fit">
                                  <input
                                    type="text"
                                    onClick="this.select();"
                                    name="metric"
                                    class="focus:ring-indigo-500 text-center w-full focus:border-indigo-500 block sm:text-sm border-gray-100 rounded-md"
                                    bind:value={metric}
                                  />
                                </td>
                              {:else}
                                <td
                                  class={colorCodeCell(
                                    local_measure_rows[index].goal,
                                    metric,
                                    local_measure_rows[index].good
                                  )}
                                >
                                  <span>{metric}</span>
                                </td>
                              {/if}
                            {/each}
                            <td class="_table-cell">
                              {#if row.edit}
                                <input
                                  on:click={() => saveRow(local_measure_rows[index], index)}
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
                    {#if local_measure_rows.length < 1}
                      <a
                        href="/scorecard/measures/create"
                        type="button"
                        class="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <span class="flex justify-center">
                          <MeasureIcon width="12" height="12" />
                        </span>
                        <span class="mt-2 block text-sm font-medium text-gray-900">
                          No measures to show - create one</span
                        >
                      </a>
                    {/if}
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
