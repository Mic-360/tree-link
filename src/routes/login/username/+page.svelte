<script lang="ts">
  import { AuthCheck } from '$lib/components';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Button } from '$lib/components/ui/button';
  import { db } from '$lib/firebase.config';
  import { userStore, userData } from '$lib/store';
  import { doc, getDoc, writeBatch } from 'firebase/firestore';
  import * as Card from '$lib/components/ui/card';
  import { currentStep } from '$lib/components/ui/stepper';

  export const user = userStore();

  let username = 'tree-link-user';
  let loading = false;
  let isAvailable = false;
  let debounceTimer: NodeJS.Timeout;

  const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  $: isValid = username?.length > 2 && username.length < 16 && re.test(username);

  const checkAvailablity = async () => {
    loading = true;
    debounceTimer && clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      const ref = doc(db, 'usernames', username);
      const exists = await getDoc(ref).then((doc) => doc.exists());
      isAvailable = !exists;
      loading = false;
    }, 500);
  };

  const confirmUsername = async () => {
    if (isAvailable && !loading && isValid) {
      const batch = writeBatch(db);
      batch.set(doc(db, 'usernames', username), {
        uid: $user?.uid
      });
      batch.set(doc(db, 'users', $user!.uid), {
        username,
        photoURL: $user?.photoURL ?? null,
        displayName: $user?.displayName,
        createdAt: new Date(),
        updatedAt: new Date(),
        links: [
          {
            title: 'Tree Link',
            url: 'https://tree-link.vercel.app',
            icon: 'custom'
          }
        ],
        bio: 'Hey! There I am using Tree Link',
        location: 'Space',
        isPrivate: false,
        published: true
      });
      await batch.commit();
      window.location.reload();
    }
  };
</script>

<AuthCheck>
  {#if $userData?.username}
    <div class="flex flex-col items-center justify-center gap-y-4">
      <Card.Root class="shadow-2xl shadow-accent p-8 space-y-8">
        <Card.Title class="text-3xl flex flex-col gap-y-2 items-center">
          <img src={$user?.photoURL} alt="profile" class="rounded-full h-28 w-28" />
          <span class="text-center"
            >Nice to meet you <br />
            <span class="italic font-semibold">{$userData.username}.</span></span
          >
        </Card.Title>
        <Card.Content class="max-w-lg text-center">
          How about we get a little bit more from you. <br />
          <em> Let's see a new avatar? </em>
          <br />Okay let's get you a new look and feel.
        </Card.Content>
        <Card.Footer class="flex flex-col items-center">
          <Button
            type="submit"
            variant={'outline'}
            class="px-6 py-3 hover:shadow-2xl shadow-accent"
            on:click={() => currentStep.set(2)}
          >
            <span class="flex gap-x-2 items-center">Get a new Avatar</span></Button
          >
        </Card.Footer>
      </Card.Root>
    </div>
  {:else}
    <div class="flex flex-col items-center justify-center gap-y-4">
      <Card.Root class="shadow-2xl shadow-accent py-8  space-y-2">
        <Card.Title class="text-3xl flex flex-col gap-y-2 items-center">
          <img src={$user?.photoURL} alt="profile" class="rounded-full h-28 w-28" />
          <span>Welcome <span class="italic font-semibold">{$user?.displayName}</span></span>
        </Card.Title>
        <Card.Content class="max-w-lg text-center">
          Your name is nice but others here can have same name as you.
          <em> So, what should we call you? </em>
          <br />Maybe you can tell us your nickname or something.
        </Card.Content>
        <Card.Footer class="flex flex-col items-center">
          <form on:submit|preventDefault={confirmUsername} class="space-y-10">
            <div class="space-y-2">
              <Label for="username">Enter Your Username</Label>
              <Input bind:value={username} on:input={checkAvailablity} maxlength={20} />
              {#if isAvailable && !loading && isValid}
                <p class="text-green-600 text-xs pl-2 py-1">
                  <span class="inline-block w-2 h-2 bg-green-600 rounded-full"></span>
                  {`@${username} is Available`}
                </p>
              {:else if !loading && !isAvailable}
                <p class="text-red-500 text-xs pl-2 py-1">
                  <span class="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                  {`@${username} is not Available`}
                </p>
              {/if}
              {#if loading}
                <p class="text-gray-400 text-xs pl-2 py-1">
                  <span class="inline-block w-2 h-2 bg-gray-400 rounded-full"></span>
                  {`Checking Availability...`}
                </p>
              {/if}
            </div>
            <Button
              type="submit"
              variant={'outline'}
              class="px-6 py-3 hover:shadow-2xl shadow-accent"
            >
              <span class="flex gap-x-2 items-center">Confirm @{username}</span></Button
            >
          </form>
        </Card.Footer>
      </Card.Root>
    </div>
  {/if}
</AuthCheck>
