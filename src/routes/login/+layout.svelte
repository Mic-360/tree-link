<script lang="ts">
  import { Stepper, currentStep } from '$lib/components/ui/stepper';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { AnimateRoute } from '$lib/components';

  $: {
    if ($currentStep === 0 && $page.url.pathname !== '/login') {
      goto('/login');
    } else if ($currentStep === 1 && $page.url.pathname !== '/login/username') {
      goto('/login/username');
    } else if ($currentStep === 2 && $page.url.pathname !== '/login/photo') {
      goto('/login/photo');
    }
  }

  onMount(() => {
    // Set initial step based on current route
    if ($page.url.pathname === '/login/username') {
      currentStep.set(1);
    } else if ($page.url.pathname === '/login/photo') {
      currentStep.set(2);
    } else {
      currentStep.set(0);
    }
  });
</script>

<section>
  <nav>
    <Stepper steps={['Step 1', 'Step 2', 'Step 3']} currentStep={$currentStep} size="xl" />
  </nav>
  <AnimateRoute>
    <slot></slot>
  </AnimateRoute>
</section>
