<script>
  import ScorecardTable from '../../components/ScorecardTable.svelte';
  import Hero from '../../components/Hero.svelte';
  import { onMount } from 'svelte'
  import { session } from '$app/stores'
  // import NotificationPanel from '../../../components/NotificationPanel.svelte'
  onMount(() => {
      console.log(session.measure_rows)
  })
</script>

<!--<NotificationPanel />-->
<Hero center={false}>Scorecard Overview</Hero>

<ScorecardTable />
