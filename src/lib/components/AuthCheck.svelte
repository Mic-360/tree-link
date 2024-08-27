<script lang="ts">
  import { user } from '$lib/store';
  import { Button } from './ui/button';
</script>

{#if $user}
  <slot />
{:else}
  <div class="flex flex-col items-center justify-center gap-y-4">
    <p>Please login to continue</p>
    <a href="/">
      <Button variant={'outline'} class="px-6 py-3 hover:shadow-2xl shadow-accent">
        <span class="flex gap-x-2 items-center"
          ><img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
            alt="google"
            class="h-4 w-4"
          />
          <span>Go To Login Page</span></span
        ></Button
      ></a
    >
  </div>
{/if}
