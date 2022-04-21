<script>
  import { goto } from '$app/navigation';
  import { post, get } from '../../helpers/utils';
  import { browser } from '$app/env';
  import { serialize } from 'cookie';

  let email = '';
  let password = '';
  let errors;

  async function submit(event) {
    // TOOD: abstract this into store logic
    const response = await post(`api/v1/auth/login?username=${email}&password=${password}`);
    // TODO handle network errors
    errors = response.errors;
    const token = response.access_token;

    const userData = await get(`api/v1/auth/me`, token);
    userData['token'] = token;
    userData['logged_in'] = true;
    if (browser && token) {
      for (const [k, v] of Object.entries(userData)) {
        window.sessionStorage.setItem(k, v);
      }
      document.cookie = serialize('token', token);
    }
    goto('/main/dashboard');
  }
</script>

<svelte:head>
  <title>Sign in • Quality Toolkit</title>
</svelte:head>
<!-- TODO: only during dev -->
<form method="POST" action="/login" class="divide-y mx-auto max-w-xs divide-gray-200">
  <div class="space-y-8">
    <div class="mx-auto">
      <div class="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-4">
        <div class="form-field pl-4">
          <label for="email" class="form-label"> Email </label>
          <input
            id="email"
            bind:value={email}
            type="text"
            name="email"
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
      <button type="button" class="button-secondary"> Cancel </button>
      <button on:click|preventDefault={submit} type="submit" class="button-primary">
        Submit
      </button>
    </div>
  </div>
</form>
