<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { user, signInWithGoogle, signOutUser } from '$lib/store';
</script>

<div class="flex flex-col items-center justify-center px-4">
  <Card.Root class="shadow-2xl shadow-accent">
    <Card.Header class="items-center text-center space-y-2">
      <Card.Title class="text-3xl">Sign In</Card.Title>
      <Card.Description>
        By continuing, you agree to our <a
          href="#terms"
          class="text-blue-200 underline underline-offset-2">Terms of Service</a
        >
        and
        <a href="#privacy" class="text-blue-200 underline underline-offset-2">Privacy Policy.</a
        ></Card.Description
      >
    </Card.Header>
    <Card.Content class="flex items-center justify-center">
      {#if $user}
        <div class="flex flex-col gap-y-6">
          <p class="italic text-xl">Welcome, {$user.displayName}</p>
          <Button
            on:click={signOutUser}
            variant={'outline'}
            class="px-6 py-3 hover:shadow-2xl shadow-accent"
          >
            <span class="flex gap-x-2 items-center"
              ><img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
                alt="google"
                class="h-4 w-4"
              />
              <span>Sign Out</span></span
            ></Button
          >
        </div>
      {:else}
        <Button
          on:click={signInWithGoogle}
          variant={'outline'}
          class="px-6 py-3 hover:shadow-2xl shadow-accent"
        >
          <span class="flex gap-x-2 items-center"
            ><img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
              alt="google"
              class="h-4 w-4"
            />
            <span>Sign In With Google</span></span
          ></Button
        >
      {/if}
    </Card.Content>
    <Card.Footer class="flex flex-col items-center text-center space-y-2">
      <p class="italic">Secure and Convenient Access to All Your Links.</p>
      <p>
        <span>Need Help?</span>
        <a href="#support" class="text-blue-200 underline underline-offset-2">Contact Support</a>
      </p>
    </Card.Footer>
  </Card.Root>
</div>
