import * as icons from "simple-icons";
import type { CSSProperties } from "react";
import type { Skill } from "@/content/site";

type Glyph = { title: string; path: string; hex: string };

const library = icons as unknown as Record<string, Glyph | undefined>;

function glyph(slug: string) {
  return library[`si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`];
}

function tone(hex: string) {
  const value = parseInt(hex, 16);
  const luminance = 0.2126 * ((value >> 16) & 255) + 0.7152 * ((value >> 8) & 255) + 0.0722 * (value & 255);
  return luminance < 48 ? "currentColor" : `#${hex}`;
}

function Pill({ skill }: { skill: Skill }) {
  const icon = glyph(skill.icon);
  return (
    <li className="skill-pill flex shrink-0 items-center gap-2 rounded-full bg-bg py-1.5 pr-3.5 pl-2.5 whitespace-nowrap text-ink shadow-media ring-1 ring-line">
      {icon ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 shrink-0" fill={tone(icon.hex)}>
          <path d={icon.path} />
        </svg>
      ) : null}
      {skill.name}
    </li>
  );
}

export function SkillsMarquee({ rows, label }: { rows: Skill[][]; label: string }) {
  return (
    <div className="marquee relative left-1/2 w-[min(760px,100vw)] -translate-x-1/2" aria-label={label}>
      {rows.map((row, index) => (
        <div key={index} className="marquee-row overflow-hidden py-1.5" style={{ "--speed": `${28 + index * 6}s` } as CSSProperties}>
          <ul data-reverse={index % 2 === 1} className="marquee-track flex w-max gap-2.5">
            {row.map((skill) => (
              <Pill key={skill.name} skill={skill} />
            ))}
            {row.map((skill) => (
              <Pill key={`${skill.name}-again`} skill={skill} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
