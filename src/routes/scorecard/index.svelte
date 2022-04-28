<script>
  import Hero from '../../components/Hero.svelte';
  import MeasureIcon from '../../components/icons/MeasureIcon.svelte';
  import ChartIcon from '../../components/icons/ChartIcon.svelte';

  const items = [
    {
      title: 'Create a measure',
      description: 'Build out a new measure',
      icon: MeasureIcon,
      href: '/scorecard/measures/create',
      background: 'bg-pink-500'
    },
    {
      title: 'Scorecard Overview',
      description: 'How are we doing? Broken down by department, and year.',
      icon: ChartIcon,
      href: '/scorecard/measures',
      background: 'bg-green-500'
    }
  ];
</script>

<Hero center={false}>Hello there</Hero>
<h2 class="text-lg font-medium text-gray-900">Projects</h2>
<p class="mt-1 text-sm text-gray-500">
  Start tracking your metrics, or check in on the progress to acheiving your facilities goals.
</p>
<ul class="mt-6 border-t border-b border-gray-200 py-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
  {#each items as item}
    <li class="flow-root">
      <div
        class="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500"
      >
        <svelte:component
          this={item.icon}
          class={item.background +
            'absolute flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg'}
        />
        <div>
          <h3 class="text-sm font-medium text-gray-900">
            <a href={item.href} class="focus:outline-none">
              <span class="absolute inset-0" aria-hidden="true" />
              {item.title}
            </a>
          </h3>
          <p class="mt-1 text-sm text-gray-500">{item.description}</p>
        </div>
      </div>
    </li>
  {/each}
</ul>
<div class="mt-4 flex">
  <a href="/scorecard/overview" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
    Or start from existing measures
  </a>
</div>
