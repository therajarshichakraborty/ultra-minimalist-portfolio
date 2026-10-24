export type Contribution = {
  number: number;
  title: string;
  summary: string;
};

export type OpenSourceProject = {
  name: string;
  repo: string;
  contributions: Contribution[];
};

export const openSourceIntro = "small fixes to the tools i use every day. keyboard input, focus, and the details of ui behavior.";

export const openSource: OpenSourceProject[] = [
  {
    name: "radix primitives",
    repo: "radix-ui/primitives",
    contributions: [
      {
        number: 3412,
        title: "return focus after nested popovers close",
        summary: "focus lands back on the trigger, even two layers deep.",
      },
      {
        number: 3398,
        title: "keep scroll position when a dialog opens",
        summary: "the page behind a dialog no longer jumps to the top.",
      },
    ],
  },
  {
    name: "react aria",
    repo: "adobe/react-spectrum",
    contributions: [
      {
        number: 8841,
        title: "stable caret while editing tags",
        summary: "adding or removing a tag keeps the caret where you left it.",
      },
    ],
  },
  {
    name: "motion",
    repo: "motiondivision/motion",
    contributions: [
      {
        number: 3120,
        title: "respect reduced motion in layout animations",
        summary: "shared layout transitions fade instead of fly when asked to.",
      },
      {
        number: 3087,
        title: "clearer spring documentation",
        summary: "examples now show how stiffness and damping feel, not just what they do.",
      },
    ],
  },
  {
    name: "tailwind css",
    repo: "tailwindlabs/tailwindcss",
    contributions: [
      {
        number: 17204,
        title: "sort container query variants",
        summary: "container variants now apply in a predictable order.",
      },
    ],
  },
  {
    name: "shadcn/ui",
    repo: "shadcn-ui/ui",
    contributions: [
      {
        number: 6532,
        title: "announce toast actions to screen readers",
        summary: "toast buttons now say what they will do before you press them.",
      },
      {
        number: 6490,
        title: "fix command menu focus on mobile safari",
        summary: "the first result stays highlighted while the keyboard is open.",
      },
    ],
  },
  {
    name: "next.js",
    repo: "vercel/next.js",
    contributions: [
      {
        number: 71950,
        title: "typo in the view transitions guide",
        summary: "a small one, but it confused me, so it probably confused someone else.",
      },
    ],
  },
];

export const contributionCount = openSource.reduce((total, project) => total + project.contributions.length, 0);
