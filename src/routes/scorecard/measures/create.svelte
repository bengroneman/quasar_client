<script>
  import Hero from '../../../components/Hero.svelte';
  import NewMeasureForm from '../../../components/forms/NewMeasureForm.svelte';
  import { departments, jc_codes } from '../../../lib/mainStore';

  $: localDepartments = $departments;
  $: localJCCodes = $jc_codes;
</script>

<Hero>Create a new measure</Hero>
<NewMeasureForm departments={localDepartments} jc_codes={localJCCodes} />
