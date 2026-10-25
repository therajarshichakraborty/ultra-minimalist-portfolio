import * as icons from "simple-icons";

type Glyph = { title: string; path: string; hex: string };

const library = icons as unknown as Record<string, Glyph | undefined>;

function tone(hex: string) {
  const value = parseInt(hex, 16);
  const luminance = 0.2126 * ((value >> 16) & 255) + 0.7152 * ((value >> 8) & 255) + 0.0722 * (value & 255);
  return luminance < 48 ? "currentColor" : `#${hex}`;
}

export function BrandIcon({ slug, className, mono = false }: { slug: string; className?: string; mono?: boolean }) {
  const icon = library[`si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`];
  if (!icon) return null;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill={mono ? "currentColor" : tone(icon.hex)}>
      <path d={icon.path} />
    </svg>
  );
}
