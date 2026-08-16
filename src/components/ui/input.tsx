import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Input component with gradient border defined via CSS theme variable.
 *
 * BUG #5 (CSS Variable Mismatch):
 *   References `--gradient-border` but index.css defines `--border-gradient`.
 *   Fix: change `var(--gradient-border)` to `var(--border-gradient)` below.
 */
const gradientBorderStyle: React.CSSProperties = {
  border: "2px solid transparent",
  background:
    "white padding-box, var(--border-gradient, transparent) border-box",
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, style, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-lg px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      style={{ ...gradientBorderStyle, ...style }}
      {...props}
    />
  )
);

Input.displayName = "Input";

export { Input };
