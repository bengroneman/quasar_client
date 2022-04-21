<script>
	import Hero from '../../components/Hero.svelte';
</script>

<div class="container mx-auto sm:px-6 lg:px-4">
	<!-- insert messages/notifications -->
	<Hero center={true}>Quality Toolkit</Hero>
	<main class="flex-1">
		<div class="py-12">
			<div class="max-w-full mx-auto px-4 sm:px-6 md:px-8">
				<div class="relative overflow-hidden">
					<div class="mr-auto w-full">
						<div
							class="relative z-10 mx-auto pb-8 sm:pb-8 w-full md:pb-10 lg:max-w-2xl lg:w-full lg:pb-12 xl:pb-16"
						>
							<div class="sm:text-center lg:text-left">
								<slot />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>
