<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import ChevronLeft from "lucide-svelte/icons/chevron-left";
	import ChevronRight from "lucide-svelte/icons/chevron-right";
	import { cn } from "$lib/utils.js";
	import { stepperVariants, type Props, type Events, currentStep } from "./index";
  
	type $$Props = Props;
	type $$Events = Events;
  
	export let steps: string[];
	export let variant: $$Props["variant"] = "default";
	export let size: $$Props["size"] = "default";
	let className: $$Props["class"] = undefined;
	export { className as class };
  
	$: handleStepChange = (newStep: number) => {
    $currentStep = Math.max(0, Math.min(steps.length - 1, newStep));
  }
  </script>
  
  <div class={cn(stepperVariants({ variant, size, className }))}>
	<Button
	  variant="outline"
	  size="icon"
	  on:click={() => handleStepChange($currentStep - 1)}
	  disabled={$currentStep === 0}
	>
	  <ChevronLeft class="h-4 w-4" />
	</Button>
	<div class="flex items-center space-x-2">
	  {#each steps as step, index}
		<div
		  class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium
				 {index <= $currentStep ? 'bg-primary text-primary-foreground' : 'bg-gray-200 text-gray-600'}"
		>
		  {index + 1}
		</div>
		{#if index < steps.length - 1}
		  <div class="h-px w-4 bg-gray-300"></div>
		{/if}
	  {/each}
	</div>
	<Button
	  variant="outline"
	  size="icon"
	  on:click={() => handleStepChange($currentStep + 1)}
	  disabled={$currentStep === steps.length - 1}
	>
	  <ChevronRight class="h-4 w-4" />
	</Button>
  </div>