import type { CSSProperties } from "react";
import { TechLogo } from "@/components/tech-logo";
import type { Skill } from "@/content/site";

function Pill({ skill }: { skill: Skill }) {
  return (
    <li className="skill-pill flex shrink-0 items-center gap-2 rounded-full bg-transparent py-1.5 pr-3.5 pl-2.5 whitespace-nowrap text-ink ring-1 ring-line">
      <TechLogo name={skill.icon} className="size-[18px] shrink-0" />
      {skill.name}
    </li>
  );
}

export function SkillsMarquee({ rows, label }: { rows: Skill[][]; label: string }) {
  return (
    <div className="marquee relative left-1/2 w-[min(760px,100vw)] -translate-x-1/2" aria-label={label}>
      {rows.map((row, index) => (
        <div
          key={index}
          className="marquee-row overflow-hidden py-1.5"
          style={{ "--speed": `${30 + index * 6}s` } as CSSProperties}
        >
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
