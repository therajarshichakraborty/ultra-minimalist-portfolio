import { Children, type CSSProperties, type ReactNode } from "react";

export function revealDelay(ms: number) {
  return { "--d": `${ms}ms` } as CSSProperties;
}

type RevealProps = {
  children: ReactNode;
  delay?: number;
  step?: number;
};

export function Reveal({ children, delay = 0, step = 16 }: RevealProps) {
  let index = 0;
  const nodes: ReactNode[] = [];
  const next = () => revealDelay(delay + index++ * step);

  Children.toArray(children).forEach((child, position) => {
    if (typeof child === "string" || typeof child === "number") {
      String(child)
        .split(/(\s+)/)
        .forEach((part, offset) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            nodes.push(part);
            return;
          }
          nodes.push(
            <span key={`${position}-${offset}`} className="reveal reveal-word" style={next()}>
              {part}
            </span>,
          );
        });
      return;
    }
    nodes.push(
      <span key={position} className="reveal reveal-word" style={next()}>
        {child}
      </span>,
    );
  });

  return <>{nodes}</>;
}
