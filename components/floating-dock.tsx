"use client";

import {
  AnimatePresence,
  motion,
  MotionConfig,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, type MouseEvent, type ReactNode, type Ref } from "react";
import { GithubIcon, LinkedinIcon, MailIcon, PencilLineIcon, XLogoIcon } from "@/components/icons";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const stroke = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

type Item = {
  label: string;
  href?: string;
  icon: ReactNode;
  external?: boolean;
  action?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const pages: Item[] = [
  {
    label: "Home",
    href: "/",
    icon: (
      <svg {...stroke} aria-hidden="true">
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    ),
  },
  {
    label: "Work",
    href: "/work",
    icon: (
      <svg {...stroke} aria-hidden="true">
        <path d="m16 18 6-6-6-6" />
        <path d="m8 6-6 6 6 6" />
      </svg>
    ),
  },
  {
    label: "Experience",
    href: "/experience",
    icon: (
      <svg {...stroke} aria-hidden="true">
        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        <rect width="20" height="14" x="2" y="6" rx="2" />
      </svg>
    ),
  },
  {
    label: "Activity",
    href: "/activity",
    icon: (
      <svg {...stroke} aria-hidden="true">
        <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
      </svg>
    ),
  },
  {
    label: "Education",
    href: "/education",
    icon: (
      <svg {...stroke} aria-hidden="true">
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
        <path d="M22 10v6" />
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
      </svg>
    ),
  },
  { label: "Blog", href: "/blog", icon: <PencilLineIcon /> },
  {
    label: "Contact",
    href: "/contact",
    icon: (
      <svg {...stroke} aria-hidden="true">
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      </svg>
    ),
  },
];

const socials: Item[] = [
  { label: "GitHub", href: site.links.github, icon: <GithubIcon />, external: true },
  { label: "LinkedIn", href: site.links.linkedin, icon: <LinkedinIcon />, external: true },
  { label: "X", href: site.links.x, icon: <XLogoIcon />, external: true },
  { label: "Email", href: `mailto:${site.email}`, icon: <MailIcon />, external: true },
];

const spring = { mass: 0.1, stiffness: 170, damping: 13 };

function Tile({ item, mouse, active }: { item: Item; mouse: MotionValue<number>; active: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const distance = useTransform(mouse, (x) => {
    const box = ref.current?.getBoundingClientRect();
    return box ? x - box.left - box.width / 2 : Number.POSITIVE_INFINITY;
  });
  const size = useSpring(useTransform(distance, [-140, 0, 140], [40, 58, 40]), spring);
  const glyph = useSpring(useTransform(distance, [-140, 0, 140], [17, 25, 17]), spring);

  const tile = (
    <motion.span
      style={{ width: size, height: size }}
      className={cn(
        "relative grid place-items-center rounded-full bg-bg/80 text-ink shadow-media ring-1 ring-line backdrop-blur-md transition-colors duration-150 max-sm:size-9!",
        active && "bg-bg ring-[color-mix(in_srgb,var(--ink)_22%,transparent)]",
      )}
    >
      <AnimatePresence>
        {hovered ? (
          <motion.span
            initial={{ opacity: 0, y: 6, x: "-50%", filter: "blur(2px)" }}
            animate={{ opacity: 1, y: 0, x: "-50%", filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            transition={{ duration: 0.16 }}
            className="pointer-events-none absolute -top-9 left-1/2 rounded-md bg-ink px-2 py-0.5 text-meta whitespace-nowrap text-bg shadow-lift"
          >
            {item.label}
          </motion.span>
        ) : null}
      </AnimatePresence>
      <motion.span
        style={{ width: glyph, height: glyph }}
        className="grid place-items-center max-sm:size-[17px]! [&>svg]:size-full"
      >
        {item.icon}
      </motion.span>
      {active ? <span aria-hidden="true" className="absolute -bottom-1.5 size-1 rounded-full bg-ink" /> : null}
    </motion.span>
  );

  const shared = {
    "aria-label": item.label,
    onPointerEnter: () => setHovered(true),
    onPointerLeave: () => setHovered(false),
    onFocus: () => setHovered(true),
    onBlur: () => setHovered(false),
    className: "rounded-full outline-offset-2",
  };

  if (item.action) {
    return (
      <button type="button" ref={ref as Ref<HTMLButtonElement>} onClick={item.action} {...shared}>
        {tile}
      </button>
    );
  }

  const href = item.href ?? "/";

  return item.external ? (
    <a
      href={href}
      ref={ref as Ref<HTMLAnchorElement>}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      {...shared}
    >
      {tile}
    </a>
  ) : (
    <Link href={href} ref={ref as Ref<HTMLAnchorElement>} aria-current={active ? "page" : undefined} {...shared}>
      {tile}
    </Link>
  );
}

export function FloatingDock() {
  const mouse = useMotionValue(Number.POSITIVE_INFINITY);
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <MotionConfig reducedMotion="user">
      <nav
        aria-label="Primary"
        className="dock pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-3 print:hidden"
      >
        <motion.div
          initial={{ y: 24, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          onPointerMove={(event) => event.pointerType === "mouse" && mouse.set(event.clientX)}
          onPointerLeave={() => mouse.set(Number.POSITIVE_INFINITY)}
          className="pointer-events-auto flex h-14 items-end gap-2.5 px-2.5 pb-2 max-sm:h-auto max-sm:items-center max-sm:gap-1.5 max-sm:p-1.5"
        >
          {pages.map((item) => (
            <Tile key={item.label} item={item} mouse={mouse} active={isActive(item.href ?? "")} />
          ))}
          <span aria-hidden="true" className="mx-0.5 mb-1.5 h-8 w-px self-end bg-line max-sm:hidden" />
          <div className="flex items-end gap-2.5 max-sm:hidden">
            {socials.map((item) => (
              <Tile key={item.label} item={item} mouse={mouse} active={false} />
            ))}
          </div>
        </motion.div>
      </nav>
    </MotionConfig>
  );
}
