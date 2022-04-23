<script>
  import ScorecardTable from '../../components/ScorecardTable.svelte'
  import Hero from '../../components/Hero.svelte'
  import { browser } from '$app/env'

  let measure_rows;
  if (browser){
    measure_rows = JSON.parse(window.sessionStorage.getItem('measure_rows'))
  }
</script>

<!--<NotificationPanel />-->
<Hero center={false}>Scorecard Overview</Hero>

<ScorecardTable measure_rows="{measure_rows}"/>
