<script>
  import { goto } from '$app/navigation';
  import { Jumper } from 'svelte-loading-spinners';
  import { get, post } from '../../lib/api';

  import { browser } from '$app/env';
  import { serialize } from 'cookie';
  import { user } from '../../store/userStore.js';

  let email = '';
  let password = '';
  let loading;

  async function submit(event) {
    let formData = new FormData(event.target)
    loading = true;
    try {
      const response = await post('api/v1/auth/login', formData)
      // maybe place this in the session for access to fetch the user data later
      let token = response.access_token;
      if (browser) {
        document.cookie = serialize('_qmt_token', token);
      }

      const _tempUser = await get(`api/v1/auth/user?email=${email}`);
      delete _tempUser['password'];
      user.set(_tempUser);
    } catch (e) {
      console.error(e);
    } finally {
      loading = false;
      goto('/scorecard/');
    }
  }
</script>

<svelte:head>
  <title>Sign in • Quality Toolkit</title>
</svelte:head>
<form method="POST" on:submit|preventDefault={submit} class="divide-y mx-auto max-w-xs divide-gray-200">
  <div class="space-y-8">
    <div class="mx-auto">
      <div class="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-4">
        <div class="form-field pl-4">
          <label for="username" class="form-label"> Email </label>
          <input
            id="username"
            bind:value={email}
            type="text"
            name="username"
            class="form-input"
            placeholder="Company Email"
            autocomplete="emailaddress"
          />
        </div>
        <div class="form-field">
          <label for="password" class="form-label"> Password </label>
          <input
            id="password"
            bind:value={password}
            type="password"
            name="password"
            class="form-input"
            placeholder="Password"
            autocomplete="password"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="pt-5">
    <div class="flex justify-start">
      <button type="submit" class="button-primary">
        Sign in
      </button>
    </div>
  </div>
  {#if loading}
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div class="relative flex mx-auto">
        <Jumper size="60" color="#FF3E00" unit="px" duration="1s" />
      </div>
    </div>
  {/if}
</form>
