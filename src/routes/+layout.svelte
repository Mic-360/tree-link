<script lang="ts">
  import type { LayoutData } from './$types';
  import '../app.css';
  import { user, userData } from '$lib/store';

  $user;
  $userData;
</script>

<main class="min-h-screen flex flex-col items-center justify-center gap-2">
  <slot />
</main>
