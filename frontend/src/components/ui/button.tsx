import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-bold uppercase tracking-wider border-2 select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 focus-visible:outline-dotted focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-[#0000FF] text-white border-[#5555ff_#000080_#000080_#5555ff] shadow-[inset_-1px_-1px_0_#0000aa,inset_1px_1px_0_#6666ff] hover:bg-[#2222FF] active:border-[#000080_#5555ff_#5555ff_#000080] active:shadow-[inset_1px_1px_0_#0000aa,inset_-1px_-1px_0_#6666ff] active:translate-x-[1px] active:translate-y-[1px]",
        destructive:
          "bg-[#FF0000] text-white border-[#ff5555_#800000_#800000_#ff5555] shadow-[inset_-1px_-1px_0_#aa0000,inset_1px_1px_0_#ff6666] hover:bg-[#FF2222] active:border-[#800000_#ff5555_#ff5555_#800000] active:shadow-[inset_1px_1px_0_#aa0000,inset_-1px_-1px_0_#ff6666] active:translate-x-[1px] active:translate-y-[1px]",
        outline:
          "bg-[#C0C0C0] text-black border-[#fff_#808080_#808080_#fff] shadow-[inset_-1px_-1px_0_#404040,inset_1px_1px_0_#dfdfdf] hover:bg-[#d0d0d0] active:border-[#808080_#fff_#fff_#808080] active:shadow-[inset_1px_1px_0_#404040,inset_-1px_-1px_0_#dfdfdf] active:translate-x-[1px] active:translate-y-[1px]",
        secondary:
          "bg-[#C0C0C0] text-black border-[#fff_#808080_#808080_#fff] shadow-[inset_-1px_-1px_0_#404040,inset_1px_1px_0_#dfdfdf] hover:bg-[#d0d0d0] active:border-[#808080_#fff_#fff_#808080] active:shadow-[inset_1px_1px_0_#404040,inset_-1px_-1px_0_#dfdfdf] active:translate-x-[1px] active:translate-y-[1px]",
        ghost: "border-transparent shadow-none hover:bg-black/5",
        link: "border-transparent shadow-none text-[#0000FF] underline hover:text-[#FF0000]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
