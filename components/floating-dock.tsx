"use client";

import { AnimatePresence, motion, MotionConfig, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, type MouseEvent, type ReactNode, type Ref } from "react";
import { GithubIcon, LinkedinIcon, MailIcon, PencilLineIcon, XLogoIcon } from "@/components/icons";
import { switchTheme, useResolvedTheme } from "@/components/theme";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const stroke = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round" } as const;

type Item = {
  label: string;
  href?: string;
  icon: ReactNode;
  external?: boolean;
  action?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const pages: Item[] = [
  {
    label: "home",
    href: "/",
    icon: (
      <svg {...stroke} aria-hidden="true">
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    ),
  },
  {
    label: "work",
    href: "/work",
    icon: (
      <svg {...stroke} aria-hidden="true">
        <path d="m16 18 6-6-6-6" />
        <path d="m8 6-6 6 6 6" />
      </svg>
    ),
  },
  {
    label: "activity",
    href: "/activity",
    icon: (
      <svg {...stroke} aria-hidden="true">
        <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
      </svg>
    ),
  },
  {
    label: "education",
    href: "/education",
    icon: (
      <svg {...stroke} aria-hidden="true">
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
        <path d="M22 10v6" />
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
      </svg>
    ),
  },
  { label: "notes", href: "/notes", icon: <PencilLineIcon /> },
  {
    label: "contact",
    href: "/contact",
    icon: (
      <svg {...stroke} aria-hidden="true">
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      </svg>
    ),
  },
];

const socials: Item[] = [
  { label: "github", href: site.links.github, icon: <GithubIcon />, external: true },
  { label: "linkedin", href: site.links.linkedin, icon: <LinkedinIcon />, external: true },
  { label: "x", href: site.links.x, icon: <XLogoIcon />, external: true },
  { label: "email", href: `mailto:${site.email}`, icon: <MailIcon />, external: true },
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
      <motion.span style={{ width: glyph, height: glyph }} className="grid place-items-center max-sm:size-[17px]! [&>svg]:size-full">
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
    <a href={href} ref={ref as Ref<HTMLAnchorElement>} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" {...shared}>
      {tile}
    </a>
  ) : (
    <Link href={href} ref={ref as Ref<HTMLAnchorElement>} aria-current={active ? "page" : undefined} {...shared}>
      {tile}
    </Link>
  );
}

const sun = (
  <svg {...stroke} aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2m-7.07-14.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const moon = (
  <svg {...stroke} aria-hidden="true">
    <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
  </svg>
);

export function FloatingDock() {
  const mouse = useMotionValue(Number.POSITIVE_INFINITY);
  const pathname = usePathname();
  const theme = useResolvedTheme(site.theme === "dark" ? "dark" : "light");
  const themeTile: Item = {
    label: theme === "dark" ? "light mode" : "dark mode",
    icon: theme === "dark" ? sun : moon,
    action: (event) => {
      const box = event.currentTarget.getBoundingClientRect();
      switchTheme({ x: box.left + box.width / 2, y: box.top + box.height / 2 });
    },
  };
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <MotionConfig reducedMotion="user">
      <nav aria-label="primary" className="dock pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-3 print:hidden">
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
          <span aria-hidden="true" className="mx-0.5 mb-1.5 h-8 w-px self-end bg-line max-sm:hidden" />
          <Tile item={themeTile} mouse={mouse} active={false} />
        </motion.div>
      </nav>
    </MotionConfig>
  );
}
