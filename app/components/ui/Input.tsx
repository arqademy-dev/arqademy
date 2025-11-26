import { cn } from "../lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#34D2A2] focus:ring-4 focus:ring-[#34D2A2]/20 outline-none transition-all text-gray-800 placeholder-gray-400",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";