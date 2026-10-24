export type Interaction = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

export const interactions: Interaction[] = [
  {
    slug: "little-guy",
    title: "little guy",
    date: "2026-10",
    description: "a companion that watches your cursor. tap him and he jumps.",
  },
  {
    slug: "dock",
    title: "dock",
    date: "2026-09",
    description: "magnification that follows the pointer, with springs instead of steps.",
  },
  {
    slug: "magnetic",
    title: "magnetic",
    date: "2026-09",
    description: "a button that leans toward you before you touch it.",
  },
  {
    slug: "hold",
    title: "hold to delete",
    date: "2026-09",
    description: "destructive actions ask for a second of commitment.",
  },
  {
    slug: "copy",
    title: "copy",
    date: "2026-08",
    description: "feedback that swaps in place, so nothing around it moves.",
  },
  {
    slug: "tabs",
    title: "tabs",
    date: "2026-08",
    description: "one indicator that travels between options instead of blinking.",
  },
  {
    slug: "stack",
    title: "stack",
    date: "2026-07",
    description: "cards that fan out on hover and shuffle when you click.",
  },
  {
    slug: "scramble",
    title: "scramble",
    date: "2026-07",
    description: "text that decodes itself one character at a time.",
  },
  {
    slug: "spotlight",
    title: "spotlight",
    date: "2026-06",
    description: "a border that lights up wherever your pointer is.",
  },
];
