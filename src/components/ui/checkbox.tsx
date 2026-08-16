import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * Checkbox component with gradient border defined via CSS theme variable.
 *
 * BUG #5 (CSS Variable Mismatch):
 *   The gradient border style references `--gradient-border` but the CSS theme
 *   in index.css defines it as `--border-gradient`.
 *   Fix: change `var(--gradient-border)` to `var(--border-gradient)` in the
 *   gradientBorderStyle object below.
 */
const gradientBorderStyle: React.CSSProperties = {
  border: "2px solid transparent",
  background:
    "linear-gradient(white, white) padding-box, var(--border-gradient, transparent) border-box",
};

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, style, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "h-5 w-5 shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-indigo-600 data-[state=checked]:text-white",
      className
    )}
    style={{ ...gradientBorderStyle, ...style }}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center">
      <Check className="h-3 w-3" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
