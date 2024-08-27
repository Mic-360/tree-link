<script lang="ts">
  import type { PageData } from './$types';
  import {UserLink} from '$lib/components'
  export let data: PageData;
</script>


<svelte:head>
  <title>@{data.username} Links-Tree</title>
  <meta content={data.links} name="keywords" />
  <meta content="@{data.username}" name="twitter:site" />
  <meta content="@{data.username}" name="twitter:creator" />
  <meta content={data.bio} name="description" />
  <meta content={data.displayName} name="twitter:title" />
  <meta content={data.bio} name="twitter:description" />
  <meta content={data.photoURL} name="twitter:image" />
</svelte:head>

<main class="h-full w-full flex flex-col items-center justify-center">
  <h1 class="text-center text-3xl font-bold mb-4">
    @{data.username}
  </h1>
  <img src={data.photoURL} alt="profile" class="h-1/3 w-1/3 rounded-xl mb-4" />
  <p>{data.bio ?? 'no bio yet ...'}</p>
  <ul class="p-4 w-1/3">
    {#each data.links as items}
    <li class="bg-zinc-900 rounded-sm p-2 mb-2">
      <UserLink {...items} />
    </li>
    {/each}
  </ul>
</main>
