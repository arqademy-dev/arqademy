import { cn } from "../lib/utils";
import { LabelHTMLAttributes } from "react";

export const Label = ({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={cn("block text-sm font-semibold text-[#0A3E49] mb-2", className)}
    {...props}
  />
);