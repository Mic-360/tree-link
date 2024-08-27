<script lang="ts">
  import { Progress as ProgressPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils.js';

  type $$Props = ProgressPrimitive.Props;

  let className: $$Props['class'] = undefined;

  export { className as class };
</script>

<ProgressPrimitive.Root
  class={cn('bg-primary/20 relative h-2 w-full overflow-hidden rounded-full', className)}
  {...$$restProps}
>
  <div class="bg-primary h-full w-full flex-1 transition-all animate-progress"></div>
</ProgressPrimitive.Root>

<style>
  @keyframes progress {
    0% {
      transform: translateX(-100%);
    }
    25% {
      transform: translateX(25%);
    }
    50% {
      transform: translateX(50%);
    }
    75% {
      transform: translateX(75%);
    }
    100% {
      transform: translateX(0);
    }
  }

  .animate-progress {
    animation: progress cubic-bezier(0.55, 0.055, 0.675, 0.19) 5s infinite;
  }
</style>
