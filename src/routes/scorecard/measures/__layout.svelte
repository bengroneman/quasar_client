<script context="module">
  // SRC: https://kit.svelte.dev/docs/page-options#prerender
  import { get } from '../../../helpers/utils';
  import { measureRows } from '../../../store/mainStore';
  import _ from 'lodash';

  /** @type {import('./[slug]').Load} */
  export async function load() {
    try {
      const response = await get('api/v1/scorecard/overview?hospital_id=6&year=2022');
      let year_values = response.map((val) => val.year);

      measureRows.set(response);
      return { status: 200 };
    } catch (e) {
      console.log(e);
      return { status: 500 };
    }
  }
</script>

<div class="min-h-full">
  <slot />
</div>
