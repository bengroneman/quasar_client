<script>
	export let center = true;
</script>

<div class="relative overflow-hidden">
  <div class="ml-auto w-full">
	<div class="relative z-10 mx-auto pb-8 sm:pb-8 w-full md:pb-10 lg:max-w-2xl lg:w-full lg:pb-12 xl:pb-16" class:mx-auto={center}>

	  <section class="mx-auto max-w-7xl sm:mt-4 md:mt-8 lg:mt-12 xl:mt-16">
		<div class="sm:text-center lg:text-left">
		  <h2 class="sub-heading" class:text-center={center}>
			<slot />
		  </h2>
		</div>
	  </section>

	</div>
  </div>
</div>
