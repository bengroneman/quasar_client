<script>
  import Hero from '../../components/Hero.svelte';
  import SingleColumnCenterLayout from "../../components/layouts/SingleColumnCenterLayout.svelte";
</script>

<svelte:head>
  <title>Quality Toolkit | Register</title>
</svelte:head>

<div class="container mx-auto sm:px-6 lg:px-4">
  <!-- insert messages/notifications -->
  <SingleColumnCenterLayout>
    <Hero>
      Quality Toolkit
      <h2>Register below</h2>
    </Hero>
    <slot />
  </SingleColumnCenterLayout>
</div>
