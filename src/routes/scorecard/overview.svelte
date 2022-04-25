<script>
  import ScorecardTable from '../../components/ScorecardTable.svelte';
  import Hero from '../../components/Hero.svelte';
  import { departments, measure_rows } from '../../lib/mainStore';

  $: localDepartments = $departments;
  $: localMeasureRows = $measure_rows;
</script>

<!--<NotificationPanel />-->
<Hero center={false}>Scorecard Overview</Hero>

<ScorecardTable measure_rows={localMeasureRows} department_names={localDepartments} />
