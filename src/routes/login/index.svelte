<script>
  import { goto } from '$app/navigation';
  import { Jumper } from 'svelte-loading-spinners';

  import { browser } from '$app/env';
  import { serialize } from 'cookie';
  import { user } from '../../store/userStore.js'

  let email = '';
  let password = '';
  let loading;

  async function submit() {
    let token;
    const apiUrl = 'http://ec2-3-141-37-250.us-east-2.compute.amazonaws.com:4081/';
    loading = true;

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      let response = await fetch(
        `${apiUrl}api/v1/auth/login?username=${email}&password=${password}`,
        options
      );
      // maybe place this in the session for access to fetch the user data later
      token = await response.json().access_token;
    } catch (e) {
      console.log(e);
    }
    try {
      const options = {
        method: 'GET',
        credentials: 'include',
        headers: {
          authorization: `bearer ${token}`,
        }
      }
      const res = await fetch(`${apiUrl}api/v1/auth/user?email=${email}`, options);

      const _tempUser = await res.json();
      delete _tempUser['password'];
      user.set(_tempUser);
    } catch (e) {
      console.error(e);
    }
    goto('/scorecard/');
    loading = false;
  }
</script>

<svelte:head>
  <title>Sign in • Quality Toolkit</title>
</svelte:head>
<form method="POST" class="divide-y mx-auto max-w-xs divide-gray-200">
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
  {#if loading}
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div class="relative flex mx-auto">
        <Jumper size="60" color="#FF3E00" unit="px" duration="1s" />
      </div>
    </div>
  {/if}
  <div class="pt-5">
    <div class="flex justify-start">
      <button type="button" class="button-secondary"> Cancel </button>
      <button on:click|preventDefault={submit} type="submit" class="button-primary">
        Submit
      </button>
    </div>
  </div>
</form>
