import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  max?: number;
};

export function TiltCard({ children, className }: TiltCardProps) {
  return <div className={cn("relative", className)}>{children}</div>;
}
