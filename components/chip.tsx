import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ChipIconName = "email" | "linkedin" | "x" | "github" | "resume" | "notes" | "open-source";

export type ChipBrand = "linkedin" | "github" | "x" | "oss";

export function ChipIcon({ name, children }: { name?: ChipIconName; children: ReactNode }) {
  return (
    <span className="chip-icon" data-icon={name} aria-hidden="true">
      {children}
    </span>
  );
}

type ChipProps = {
  href: string;
  children?: ReactNode;
  icon?: ReactNode;
  iconName?: ChipIconName;
  brand?: ChipBrand;
  external?: boolean;
  label?: string;
  direction?: "forward" | "back";
  className?: string;
};

export function Chip({
  href,
  children,
  icon,
  iconName,
  brand,
  external,
  label,
  direction = "forward",
  className,
}: ChipProps) {
  const content = (
    <>
      {icon ? <ChipIcon name={iconName}>{icon}</ChipIcon> : null}
      {children}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        title={children ? undefined : label}
        data-brand={brand}
        className={cn("chip", className)}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      data-brand={brand}
      transitionTypes={[direction === "back" ? "nav-back" : "nav-forward"]}
      className={cn("chip", className)}
    >
      {content}
    </Link>
  );
}
