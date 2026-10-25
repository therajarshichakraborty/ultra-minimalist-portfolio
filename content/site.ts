export type Theme = "light" | "dark" | "system";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  stack: string[];
  role: string;
  team: string;
  timeline: string;
  summary: string;
  sections: { heading: string; body: string[] }[];
  image?: { src: string; alt: string };
};

export type Interaction = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

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

export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
};

export type Education = {
  degree: string;
  school: string;
  href?: string;
  mark: string;
  location: string;
  period: string;
  grades: string[];
  highlight: string;
  coursework: string[];
};

export type Channel = {
  label: string;
  value: string;
  href: string;
  kind: "email" | "phone" | "whatsapp" | "linkedin" | "github" | "leetcode";
};

export const site = {
  name: "rajarshi chakraborty",
  signature: "rajarshi",
  role: "design engineer",
  location: "kolkata, india",
  email: "rajarshichakraborty2005@gmail.com",
  url: "https://example.com",
  title: "rajarshi chakraborty · design engineer",
  description:
    "rajarshi chakraborty is a design engineer building interfaces for the web, with a focus on motion, feedback, and the small details that make software feel considered.",
  theme: "light" as Theme,
  links: {
    linkedin: "https://www.linkedin.com/in/rajarshi-c-06a3402b7",
    x: "https://x.com/",
    github: "https://github.com/therajarshichakraborty",
  },
  profiles: {
    github: "therajarshichakraborty",
    leetcode: "rajarshi_2005",
  },
  home: {
    intro: "i design and build interfaces for the web and ios, and i care most about how they move and respond.",
    experiments: "little experiments",
    openSource: "open source",
    thinking: "thinking about",
  },
  pages: {
    interactions: "small studies in motion and feedback. they are all live, so go ahead and touch.",
    work: "things i designed and built, start to finish.",
    openSource: "small fixes to the tools i use every day. keyboard input, focus, and the details of ui behavior.",
    notes: "short notes on building interfaces, written when something finally clicks.",
    activity: "a live log of what i ship and what i practice, pulled from github and leetcode every hour.",
    education: "the fundamentals behind the work, from the core sciences to computer science and research.",
    contact:
      "whether it is a role, a freelance project, or an idea that will not leave you alone, tell me about it. every message lands in my own inbox, and i read each one myself.",
  },
};

export const education: Education[] = [
  {
    degree: "b.tech in computer science and engineering",
    school: "techno main salt lake",
    href: "https://www.technoindiagroup.com/",
    mark: "t",
    location: "kolkata, west bengal, india",
    period: "june 2023 to present",
    grades: ["gpa 8.136 / 10 (through semester 6)", "class of 2027"],
    highlight: "co-authored a research paper on deep learning for fruit quality assessment (ciacon 2026) alongside my coursework.",
    coursework: [
      "data structures and algorithms",
      "design and analysis of algorithms",
      "operating systems",
      "database management systems",
      "computer networks",
      "machine learning",
      "cryptography and network security",
      "software engineering",
    ],
  },
  {
    degree: "higher secondary (class xii), science",
    school: "west bengal council of higher secondary education",
    href: "https://wbchse.wb.gov.in/",
    mark: "w",
    location: "west bengal, india",
    period: "april 2020 to march 2023",
    grades: ["grade a+", "81.2% overall"],
    highlight: "captained the school cricket team through inter school tournaments while studying the core sciences.",
    coursework: ["physics", "chemistry", "mathematics", "biology", "english", "bengali"],
  },
];

export const contact = {
  heading: "got an idea?",
  accent: "let's make it real.",
  topics: ["project inquiry", "full time role", "freelance work", "collaboration", "just saying hi"],
  formEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "",
  channels: [
    {
      label: "primary email",
      value: "rajarshichakraborty2005@gmail.com",
      href: "mailto:rajarshichakraborty2005@gmail.com",
      kind: "email",
    },
    {
      label: "secondary email",
      value: "rajarshi29032005@gmail.com",
      href: "mailto:rajarshi29032005@gmail.com",
      kind: "email",
    },
    { label: "phone", value: "+91 8001950250", href: "tel:+918001950250", kind: "phone" },
    { label: "whatsapp", value: "message me directly", href: "https://wa.me/918001950250", kind: "whatsapp" },
    {
      label: "linkedin",
      value: "in/rajarshi-c-06a3402b7",
      href: "https://www.linkedin.com/in/rajarshi-c-06a3402b7",
      kind: "linkedin",
    },
    {
      label: "github",
      value: "@therajarshichakraborty",
      href: "https://github.com/therajarshichakraborty",
      kind: "github",
    },
    {
      label: "leetcode",
      value: "@rajarshi_2005",
      href: "https://leetcode.com/u/rajarshi_2005/",
      kind: "leetcode",
    },
  ] as Channel[],
};

export const projects: Project[] = [
  {
    slug: "relay",
    title: "relay",
    tagline: "triage that travels from the street to the er.",
    year: "2026",
    stack: ["swiftui", "typescript", "websocket"],
    role: "design engineer",
    team: "two engineers, one researcher",
    timeline: "ten weeks",
    summary:
      "three connected apps for field medics, incident command, and hospital intake. they share one live patient record, so nobody has to ask the same question twice.",
    sections: [
      {
        heading: "the problem",
        body: [
          "during a mass casualty incident, the same patient gets described three times: once by the medic on scene, once over the radio, and once at the hospital door. every handoff loses a detail.",
          "we wanted a record that moves with the patient instead of being rebuilt at each stop.",
        ],
      },
      {
        heading: "what i built",
        body: [
          "a swiftui app for medics that captures triage in four taps, a command dashboard that maps every patient in real time, and an intake view for the emergency room.",
          "all three talk to a small typescript server over websockets. when a medic changes a triage color, command and the hospital see it in under a second.",
        ],
      },
      {
        heading: "what changed",
        body: [
          "in a timed drill with forty seven simulated patients, handoff time dropped by more than half, and nobody had to repeat a vital sign.",
        ],
      },
    ],
  },
  {
    slug: "kit",
    title: "kit",
    tagline: "components for interfaces that think out loud.",
    year: "2026",
    stack: ["react", "typescript", "css"],
    role: "design engineer",
    team: "solo",
    timeline: "ongoing",
    summary:
      "a small library of react components for ai interfaces: composers, streaming messages, tool approvals, and progress that tells you what the system is actually doing.",
    sections: [
      {
        heading: "the problem",
        body: [
          "most ai products reinvent the same pieces, and most of them get the hard states wrong. interruptions, retries, and approvals are where trust is won or lost.",
        ],
      },
      {
        heading: "what i built",
        body: [
          "every component documents its states, keyboard behavior, and focus order, with a live preview next to copyable source.",
          "the streaming message never shifts the layout while tokens arrive, and the approval card keeps focus on the decision instead of jumping to the next message.",
        ],
      },
      {
        heading: "what changed",
        body: ["a few teams now use it as a starting point, and the patterns found their way into two open source libraries."],
      },
    ],
  },
  {
    slug: "tide",
    title: "tide",
    tagline: "a weather alert that turns into a plan.",
    year: "2025",
    stack: ["swiftui", "figma"],
    role: "design lead",
    team: "three designers",
    timeline: "48 hours",
    summary:
      "a homeowner dashboard that turns a storm warning into a short, ordered checklist, built as a swiftui prototype during a weekend hackathon.",
    sections: [
      {
        heading: "the problem",
        body: ["storm alerts tell you what is coming, not what to do. people either panic or ignore them."],
      },
      {
        heading: "what i built",
        body: [
          "a risk view that reads the forecast against the home itself, and a plan that sorts tasks by how long they take and how much they matter.",
          "we designed the flow in figma in an afternoon, then built a working swiftui version overnight.",
        ],
      },
      {
        heading: "what changed",
        body: ["it won first place, and the checklist pattern became the backbone of a later project."],
      },
    ],
  },
];

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
];

export const resume = {
  summary:
    "design engineer building web and ios interfaces with react, typescript, and swiftui. focused on interaction patterns, reusable components, and motion that explains what the system is doing.",
  experience: [
    {
      role: "design engineer",
      company: "northwind studio",
      period: "2025 to now",
      description: "prototype and ship interaction models for ai products, from first sketch to production react components.",
    },
    {
      role: "product designer",
      company: "fieldwork",
      period: "2023 to 2025",
      description: "led the design system and built its react implementation, cutting new feature design time roughly in half.",
    },
    {
      role: "frontend engineer",
      company: "parcel labs",
      period: "2021 to 2023",
      description: "built the merchant dashboard and the motion guidelines the team still uses.",
    },
  ] as Experience[],
  skills: [
    { group: "engineering", items: "react, next.js, typescript, swiftui, css, motion" },
    { group: "design", items: "figma, interaction design, prototyping, design systems, accessibility" },
    { group: "tools", items: "git, vitest, playwright, gsap" },
  ],
  education: {
    school: "school of visual arts",
    degree: "bfa, interaction design",
    location: "new york, ny",
    year: "2021",
  },
};

export const contributionCount = openSource.reduce((total, project) => total + project.contributions.length, 0);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function domain() {
  return site.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
