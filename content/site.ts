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
  role: "software engineer",
  location: "kolkata, india",
  email: "rajarshichakraborty2005@gmail.com",
  url: "https://example.com",
  title: "rajarshi chakraborty · software engineer",
  description:
    "rajarshi chakraborty is a software engineer at brand voy building live sports products, drawn to systems that are fast, dependable, and easy to understand.",
  links: {
    linkedin: "https://www.linkedin.com/in/rajarshi-c-06a3402b7",
    x: "https://x.com/IamRajarshi_Dev",
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
    experience: "shipping production software, running research and leading campus communities.",
    about: "the person behind the work: where i am, what i am building, and what keeps me curious.",
    contact:
      "whether it is a role, a freelance project, or an idea that will not leave you alone, tell me about it. every message lands in my own inbox, and i read each one myself.",
  },
};

export type Skill = {
  name: string;
  icon: string;
};

export const about = {
  photo: "https://avatars.githubusercontent.com/u/274300136?v=4",
  greeting: "hey, i'm rajarshi.",
  story: [
    "I like the moment a system breaks and nobody knows why yet. That’s usually where I do my best work.",
    "Tracing a slow page back to one missing index, or a flaky deploy back to a race condition nobody wrote down, is exactly the kind of puzzle I enjoy. It shaped how I build: understand the whole path end to end, then make it simple enough that the next person never has to dig. Fast matters. Understandable matters more.",
    "Lately that curiosity has pulled me toward AI agents, systems that reason, call tools and fail in brand-new ways. Making them dependable enough to trust with real work is the problem I find most interesting right now.",
    "[Got something that’s broken in a way nobody can explain?](/contact)",
    "Back in school I captained the cricket team, which turned out to be good training for engineering: read the conditions, back your team and stay calm when the plan falls apart.",
    "Today I’m a Software Engineer at Brand Voy, building live sports products on high-volume cricket and football data. When a match is live, the numbers have to be right and they have to be fast, and that standard has stuck with me in everything I build.",
    "I’m also finishing my B.Tech in Computer Science at Techno Main Salt Lake, where I research time-series forecasting and co-authored a research paper on deep learning. Away from the keyboard, I’ve co-led IGNITE at Samarth TMSL and helped run EDGE, our technical fest, with Geekonix. Organizing events for hundreds of people taught me as much about building things as any codebase.",
    "The rest of the time I’m solving problems on LeetCode or writing up what I’ve learned on [my blog](/notes).",
  ],
  now: [
    "building live sports products at brand voy",
    "finishing my b.tech in computer science, class of 2027",
    "solving problems on leetcode most days",
    "writing short notes about building interfaces",
  ],
  skillsTitle: "tools i ship production software with",
  skills: [
    [
      { name: "TypeScript", icon: "typescript" },
      { name: "Python", icon: "python" },
      { name: "Node", icon: "nodedotjs" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Express", icon: "express" },
      { name: "NestJS", icon: "nestjs" },
      { name: "Hono", icon: "hono" },
      { name: "Java", icon: "openjdk" },
      { name: "C++", icon: "cplusplus" },
      { name: "PostgreSQL", icon: "postgresql" },
    ],
    [
      { name: "Redis", icon: "redis" },
      { name: "Docker", icon: "docker" },
      { name: "GCP", icon: "googlecloud" },
      { name: "Cloudflare", icon: "cloudflare" },
      { name: "Terraform", icon: "terraform" },
      { name: "GitHub Actions", icon: "githubactions" },
      { name: "Jenkins", icon: "jenkins" },
      { name: "Kafka", icon: "apachekafka" },
      { name: "RabbitMQ", icon: "rabbitmq" },
    ],
  ] as Skill[][],
};

export type Role = {
  company: string;
  role: string;
  location: string;
  period: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  skills: string[];
};

export const experienceIntro = {
  heading: "Where I've been building.",
  text: "Shipping production software, running research and leading the campus communities that taught me how teams actually work.",
};

export const experience: Role[] = [
  {
    company: "Brand Voy",
    role: "Software Engineer",
    location: "London, United Kingdom (Remote)",
    period: "Aug 2026 - Present",
    current: true,
    summary:
      "Building live sports products on high-volume cricket and football data for clients across English and Vietnamese markets.",
    highlights: [
      "Ship and maintain production web apps that serve real-time matches, fixtures, scores and statistics.",
      "Optimize data handling and app workflows so pages stay fast under high-volume, live-match traffic.",
      "Own features end to end, from requirements and implementation to testing, deployment and production support.",
    ],
    skills: ["TypeScript", "Next.js", "React Native", "Expo", "Node.js", "Express", "PostgreSQL", "Docker", "Kubernetes", "Git"],
  },
  {
    company: "Techno Main Salt Lake",
    role: "UnderGrad Researcher",
    location: "Kolkata, West Bengal, India",
    period: "Jan 2026 - Present",
    current: true,
    summary: "Researching deep learning for weather time-series forecasting, from raw data to a deployable pipeline.",
    highlights: [
      "Built and benchmarked LSTM, ARIMA and RNN models, improving prediction reliability by 28.75% over statistical baselines across 3+ years of backtesting.",
      "Turned research notebooks into a modular Python pipeline, cutting the retrain-to-redeploy cycle from 3+ days to under 4 hours.",
      "Cleaned a 60,000+ row dataset and tuned 120+ configurations, lifting LSTM validation accuracy by 19.4% and cutting MAE by 22%.",
    ],
    skills: ["Python", "PyTorch", "NumPy", "Pandas", "Scikit-Learn", "Node.js", "Time Series Analysis"],
  },
  {
    company: "Samarth TMSL",
    role: "Co-Head & Content Writer, IGNITE",
    location: "Kolkata, West Bengal, India",
    period: "July 2023 - Present",
    current: true,
    summary: "Co-leading the IGNITE division of Samarth TMSL, running its events and writing the content behind them.",
    highlights: [
      "Co-organized 6+ large-scale events, including the national-level hackathon Educathon and the annual fest Safalya, drawing 500+ participants.",
      "Led cross-functional teams of 20+ volunteers across logistics, design, outreach and operations, delivering every event on schedule.",
      "Wrote 15+ articles, workshop decks and guides, helping grow social media engagement by 40%.",
    ],
    skills: ["Leadership", "Event Management", "Content Writing", "Public Speaking", "Community Building"],
  },
  {
    company: "Geekonix",
    role: "Volunteer & Management Staff",
    location: "Kolkata, West Bengal, India",
    period: "Oct 2023 - Dec 2024",
    summary: "Helped run EDGE, the official technical fest of Techno Main Salt Lake.",
    highlights: [
      "Supported 10+ event tracks across competitive programming, robotics and quizzing over two fest days.",
      "Coordinated scheduling, venues and resources for 300+ participants a day with a 30+ member volunteer team.",
      "Spotted bottlenecks in registration and check-in mid-event and fixed them on the spot, cutting average wait time by 25%.",
    ],
    skills: ["Event Operations", "Team Management", "Logistics", "Coordination"],
  },
];

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
    role: "software engineer",
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
    role: "software engineer",
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
    "software engineer at brand voy, building live sports products on high-volume cricket and football data. finishing a b.tech in computer science at techno main salt lake, where i research deep learning for time-series forecasting.",
  skills: [
    { group: "engineering", items: "typescript, next.js, react native, expo, node.js, express, postgresql" },
    { group: "infrastructure", items: "docker, kubernetes, git" },
    { group: "data and ml", items: "python, pytorch, numpy, pandas, scikit-learn, time series analysis" },
  ],
};

export const contributionCount = openSource.reduce((total, project) => total + project.contributions.length, 0);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function domain() {
  return site.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
