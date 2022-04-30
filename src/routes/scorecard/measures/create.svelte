<script>
  import Hero from '../../../components/Hero.svelte';
  import NewMeasureForm from '../../../components/forms/NewMeasureForm.svelte';
  import { departments, regulations } from '../../../store/mainStore';

  $: localDepartments = $departments;
  $: localRegulations = $regulations;
</script>

<Hero>Create a new measure</Hero>
<NewMeasureForm departments={localDepartments} regulations={localRegulations} />
