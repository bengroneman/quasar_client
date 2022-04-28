<script context="module">
  // SRC: https://kit.svelte.dev/docs/page-options#prerender
  import { get } from '../../../helpers/utils';
  import { departments, years, jc_codes, measure_rows } from '../../../lib/mainStore';
  import _ from 'lodash';

  /** @type {import('./[slug]').Load} */
  export async function load() {
    try {
      const response = await get('api/v1/scorecard/overview?hospital_id=6&year=2022');
      let department_values = response.map((val) => val.dept_name);
      let year_values = response.map((val) => val.year);
      let _departments = _.uniq(department_values);
      let _years = _.uniq(year_values);

      let jc_code_values = response.map((val) => {
        if (val.regulation_code !== 'null') {
          return val.regulation_code;
        }
      });
      let _jc_codes = _.uniq(jc_code_values);

      departments.set(_departments);
      years.set(_years);
      jc_codes.set(_jc_codes);
      measure_rows.set(response);
      return { status: 200 };
    } catch (e) {
      console.log(e);
      return { status: 500 };
    }
  }
</script>

<script>
</script>

<div class="min-h-full">
<slot></slot>
</div>
