import { cn } from "../lib/utils";
import { HTMLAttributes } from "react";

export const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden",
      className
    )}
    {...props}
  />
);