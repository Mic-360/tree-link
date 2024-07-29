import { type VariantProps, tv } from "tailwind-variants";
import Root from "./stepper.svelte";

const stepperVariants = tv({
  base: "flex items-center space-x-2",
  variants: {
    variant: {
      default: "bg-background",
      outline: "border border-input bg-background",
    },
    size: {
      default: "p-2",
      sm: "p-1",
      lg: "p-3",
      xl: "p-5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type Variant = VariantProps<typeof stepperVariants>["variant"];
type Size = VariantProps<typeof stepperVariants>["size"];

type Props = {
  steps: string[];
  currentStep: number;
  variant?: Variant;
  size?: Size;
  class?: string;
};

type Events = {
  change: CustomEvent<number>;
};

export {
  Root,
  type Props,
  type Events,
  Root as Stepper,
  type Props as StepperProps,
  type Events as StepperEvents,
  stepperVariants,
};