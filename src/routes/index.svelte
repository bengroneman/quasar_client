<script context="module">
  import { browser } from '$app/env';
  import { goto } from '$app/navigation';

  export async function load({ session }) {
    if (!session.user) {
      if (browser) {
        goto('/login');
      }
      return { status: 200, message: 'Should login' };
    }
    if (browser) {
      goto('/scorecard/dashboard');
    }
    return { status: 200, message: 'Logged in' };
  }
</script>

<svelte:head>
  <title>Quality Toolkit</title>
</svelte:head>

<div class="home-page">
  <h1>Hello, home page</h1>
</div>
