"use client";

import { AnimatePresence, motion, MotionConfig, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef, useState, type ComponentType, type SVGProps } from "react";
import { FileTextIcon, GithubIcon, MailIcon, MergeIcon, PencilLineIcon } from "@/components/icons";

const items: { label: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  { label: "mail", Icon: MailIcon },
  { label: "github", Icon: GithubIcon },
  { label: "notes", Icon: PencilLineIcon },
  { label: "résumé", Icon: FileTextIcon },
  { label: "open source", Icon: MergeIcon },
];

const spring = { mass: 0.1, stiffness: 150, damping: 12 };

function Tile({
  label,
  Icon,
  mouse,
  focused,
  onFocus,
  onBlur,
}: {
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  mouse: MotionValue<number>;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  const distance = useTransform(mouse, (x) => {
    const box = ref.current?.getBoundingClientRect();
    return box ? x - box.left - box.width / 2 : Number.POSITIVE_INFINITY;
  });
  const target = useTransform(distance, [-120, 0, 120], [40, 62, 40]);
  const glyph = useTransform(distance, [-120, 0, 120], [18, 28, 18]);
  const size = useSpring(target, spring);
  const icon = useSpring(glyph, spring);
  const show = hovered || focused;

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={label}
      style={{ width: size, height: size }}
      animate={focused ? { scale: 1.12 } : { scale: 1 }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={onFocus}
      onBlur={onBlur}
      className="relative grid shrink-0 place-items-center rounded-xl bg-surface text-ink ring-1 ring-line"
    >
      <AnimatePresence>
        {show ? (
          <motion.span
            initial={{ opacity: 0, y: 6, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            transition={{ duration: 0.16 }}
            className="pointer-events-none absolute -top-8 left-1/2 rounded bg-ink px-1.5 py-0.5 text-meta whitespace-nowrap text-bg"
          >
            {label}
          </motion.span>
        ) : null}
      </AnimatePresence>
      <motion.span style={{ width: icon, height: icon }} className="grid place-items-center">
        <Icon className="size-[62%]" />
      </motion.span>
    </motion.button>
  );
}

export function DockDemo() {
  const mouse = useMotionValue(Number.POSITIVE_INFINITY);
  const [focused, setFocused] = useState<number | null>(null);

  return (
    <MotionConfig reducedMotion="user">
      <div className="absolute inset-0 grid place-items-center">
        <div
          onPointerMove={(event) => event.pointerType === "mouse" && mouse.set(event.clientX)}
          onPointerLeave={() => mouse.set(Number.POSITIVE_INFINITY)}
          className="flex h-[60px] items-end gap-2.5 rounded-2xl bg-bg px-3 pb-2.5 shadow-lift ring-1 ring-line"
        >
          {items.map((item, index) => (
            <Tile
              key={item.label}
              label={item.label}
              Icon={item.Icon}
              mouse={mouse}
              focused={focused === index}
              onFocus={() => setFocused(index)}
              onBlur={() => setFocused(null)}
            />
          ))}
        </div>
      </div>
    </MotionConfig>
  );
}
