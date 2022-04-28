<script>
  export let modalOpen = true;

  function modalOff() {
    modalOpen = false;
  }
  function handleKeyUp(event) {
    if (event.key === 'Escape') {
      modalOff();
    }
  }
  function handleClick(event) {
    if (event.target.id === 'dark-overlay') {
      modalOff()
    }
  }
</script>
<svelte:body
  on:keyup={handleKeyUp}
  on:click|stopPropagation={handleClick}
/>
{#if modalOpen}
<div
  class="fixed z-10 inset-0 overflow-y-auto"
  aria-labelledby="modal-title"
  role="dialog"
  aria-modal="true"
>
  <div
    class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
  >
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" id="dark-overlay" aria-hidden="true" />

    <!-- This element is to trick the browser into centering the modal contents. -->
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
      >&#8203;</span
    >

    <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
    <div
      class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md md:max-w-2xl sm:w-full sm:p-6"
    >
      <div>
        <div class="content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</div>
{/if}
