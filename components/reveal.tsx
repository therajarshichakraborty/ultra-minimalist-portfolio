import { Children, type CSSProperties, type ReactNode } from "react";

export function revealDelay(ms: number) {
  return { "--d": `${ms}ms` } as CSSProperties;
}

type RevealProps = {
  children: ReactNode;
  delay?: number;
  step?: number;
};

type Piece = { kind: "space"; value: string } | { kind: "word"; content: ReactNode[] };

export function Reveal({ children, delay = 0, step = 16 }: RevealProps) {
  const pieces: Piece[] = [];

  Children.toArray(children).forEach((child) => {
    if (typeof child !== "string" && typeof child !== "number") {
      pieces.push({ kind: "word", content: [child] });
      return;
    }
    String(child)
      .split(/(\s+)/)
      .forEach((part, offset) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          pieces.push({ kind: "space", value: part });
          return;
        }
        const previous = pieces[pieces.length - 1];
        if (offset === 0 && previous?.kind === "word") {
          previous.content.push(part);
          return;
        }
        pieces.push({ kind: "word", content: [part] });
      });
  });

  let index = 0;

  return (
    <>
      {pieces.map((piece, position) =>
        piece.kind === "space" ? (
          piece.value
        ) : (
          <span key={position} className="reveal reveal-word" style={revealDelay(delay + index++ * step)}>
            {piece.content}
          </span>
        ),
      )}
    </>
  );
}
