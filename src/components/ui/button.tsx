import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "destructive";
}

/**
 * Button component with gradient border defined via CSS theme variable.
 * All variants show a gradient border.
 *
 * BUG #5 (CSS Variable Mismatch):
 *   The gradient border style references `--gradient-border` but the CSS theme
 *   in index.css defines it as `--border-gradient`.
 *   Fix: change `var(--gradient-border)` to `var(--border-gradient)` below.
 */
const makeGradientBorder = (bg: string): React.CSSProperties => ({
  border: "2px solid transparent",
  background: `${bg} padding-box, var(--gradient-border, transparent) border-box`,
});

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", style, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50";

    const variants: Record<string, string> = {
      default: "text-white hover:opacity-90",
      ghost: "bg-transparent text-indigo-600 hover:bg-indigo-50",
      destructive: "text-white hover:opacity-90",
    };

    const bgByVariant: Record<string, string> = {
      default: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      ghost: "white",
      destructive: "linear-gradient(135deg, #ef4444, #dc2626)",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], className)}
        style={{ ...makeGradientBorder(bgByVariant[variant ?? "default"]), ...style }}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
