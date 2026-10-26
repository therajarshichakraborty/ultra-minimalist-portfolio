import type { LogoName } from "@/components/tech-logo";

export type ProjectSection = {
  heading: string;
  body: string[];
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  stack: string[];
  summary: string;
  links: { live?: string; repo: string };
  image: { src: string; alt: string };
  sections?: ProjectSection[];
};

export type Interaction = {
  slug: string;
  title: string;
  date: string;
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
  name: "Rajarshi Chakraborty",
  signature: "Rajarshi",
  role: "Software Engineer",
  location: "Kolkata, West Bengal, India",
  email: "rajarshichakraborty2005@gmail.com",
  url: "https://rajarshis-portfolio.vercel.app",
  title: "Rajarshi Chakraborty · Software Engineer",
  description:
    "Rajarshi Chakraborty is a Software Engineer at Brand Voy building live sports products, drawn to systems that are fast, dependable, and easy to understand.",
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
    lead: "I like the moment a system breaks and nobody knows why yet. That’s usually where I do my best work.",
    story: [
      "Tracing a slow page back to one missing index, or a flaky deploy back to a race condition nobody wrote down, is exactly the kind of puzzle I enjoy. It shaped how I build: understand the whole path end to end, then make it simple enough that the next person never has to dig. Fast matters. Understandable matters more.",
      "Lately that curiosity has pulled me toward AI agents, systems that reason, call tools and fail in brand-new ways. Making them dependable enough to trust with real work is the problem I find most interesting right now.",
    ],
    experiments: "little experiments",
    projects: "side projects",
    thinking: "thinking about",
  },
  pages: {
    interactions: "Small studies in motion and feedback. They are all live, so go ahead and touch.",
    work: "Side projects I designed, built and shipped, each one live on the web.",
    notes: "Short notes on building interfaces, written when something finally clicks.",
    activity: "A live log of what I ship and what I practice, pulled from GitHub and LeetCode every hour.",
    education: "The fundamentals behind the work, from the core sciences to computer science and research.",
    experience: "Shipping production software, running research and leading campus communities.",
    about: "The person behind the work: where I am, what I am building, and what keeps me curious.",
    contact:
      "Whether it is a role, a freelance project, or an idea that will not leave you alone, tell me about it. Every message lands in my own inbox, and I read each one myself.",
  },
};

export type Skill = {
  name: string;
  icon: LogoName;
};

export type Author = {
  name: string;
  affiliation: string;
  self?: boolean;
};

export type Publication = {
  status: string;
  paperId: string;
  date: string;
  title: string;
  authors: Author[];
  venue: { name: string; full: string; note: string };
  abstract: string;
  identifiers: { label: string; value: string }[];
  links: { paper: string; publisher: string };
};

export const about = {
  photo: "/rajarshi.png",
  greeting: "Hey, I’m Rajarshi.",
  story: [
    "Back in school I captained the cricket team, which turned out to be good training for engineering: read the conditions, back your team and stay calm when the plan falls apart.",
    "Today I’m a Software Engineer at Brand Voy, building live sports products on high-volume cricket and football data. When a match is live, the numbers have to be right and they have to be fast, and that standard has stuck with me in everything I build.",
    "I’m also finishing my B.Tech in Computer Science at Techno Main Salt Lake, where I research time-series forecasting and co-authored a research paper on deep learning. Away from the keyboard, I’ve co-led IGNITE at Samarth TMSL and helped run EDGE, our technical fest, with Geekonix. Organizing events for hundreds of people taught me as much about building things as any codebase.",
    "The rest of the time I’m solving problems on LeetCode or writing up what I’ve learned on [my blog](/blog).",
    "[Got something that’s broken in a way nobody can explain?](/contact)",
  ],
  now: [
    "Building live sports products at Brand Voy",
    "Finishing my B.Tech in Computer Science, class of 2027",
    "Solving problems on LeetCode most days",
    "Writing about JavaScript, Node.js, Git and AI on Hashnode",
  ],
  skillsTitle: "Tools I ship production software with",
  skills: [
    [
      { name: "TypeScript", icon: "typescript" },
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Node.js", icon: "nodejs" },
      { name: "Express", icon: "express" },
      { name: "NestJS", icon: "nestjs" },
      { name: "Hono", icon: "hono" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Python", icon: "python" },
    ],
    [
      { name: "Java", icon: "java" },
      { name: "C++", icon: "cplusplus" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Prisma", icon: "prisma" },
      { name: "Redis", icon: "redis" },
      { name: "Kafka", icon: "kafka" },
      { name: "RabbitMQ", icon: "rabbitmq" },
      { name: "PyTorch", icon: "pytorch" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
    ],
    [
      { name: "Docker", icon: "docker" },
      { name: "Kubernetes", icon: "kubernetes" },
      { name: "Google Cloud", icon: "googlecloud" },
      { name: "Cloudflare", icon: "cloudflare" },
      { name: "Terraform", icon: "terraform" },
      { name: "GitHub Actions", icon: "githubactions" },
      { name: "Jenkins", icon: "jenkins" },
      { name: "Git", icon: "git" },
    ],
  ] as Skill[][],
};

export const research = {
  eyebrow: "Publications",
  heading: "Research I’ve published",
  intro:
    "Committed to advancing technology through research, technical publications and engineering contributions across multiple domains.",
};

export const publications: Publication[] = [
  {
    status: "Published",
    paperId: "2074",
    date: "July 2026",
    title: "Deep Learning Enabled Fruit Quality Assessment with Hyper-Spectral Feature Fusion",
    authors: [
      { name: "Rajarshi Chakraborty", affiliation: "UnderGrad Researcher, Techno Main Salt Lake, Kolkata", self: true },
      { name: "Dr. Subhankar Chatterjee", affiliation: "Professor, Techno Main Salt Lake, Kolkata" },
      { name: "Aditi Nandi Tokder", affiliation: "Assistant Professor, Techno Main Salt Lake, Kolkata" },
      { name: "Dr. Anirban Bose", affiliation: "Assistant Professor, Dr. B. C. Roy Engineering College, Durgapur" },
    ],
    venue: {
      name: "CIACON 2026",
      full: "International Conference on Control, Instrumentation, Energy & Communication",
      note: "IEEE Xplore",
    },
    abstract:
      "Proposes a novel deep learning framework that integrates hyper-spectral features using a fusion network to assess fruit quality with high precision, combining external appearance defects with internal chemical composition data.",
    identifiers: [
      { label: "Electronic ISBN", value: "979-8-3315-5231-2" },
      { label: "Print on Demand (PoD) ISBN", value: "979-8-3315-5232-9" },
    ],
    links: {
      paper: "/pdfs/research-paper.pdf",
      publisher: "https://ieeexplore.ieee.org/document/11688352",
    },
  },
];

export const blog = {
  heading: "Things I learned",
  accent: "the hard way.",
  topics: "JavaScript, Node.js, networking, Git and AI",
  profile: "https://hashnode.com/@Rajarshi2005",
  series: [
    { name: "The Debug Monk", host: "the-debug-monk.hashnode.dev" },
    { name: "WebDev Cohort 2026", host: "webdev-cohort-2026.hashnode.dev" },
    { name: "Git For All", host: "git-for-all.hashnode.dev" },
  ],
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
    skills: [
      "TypeScript",
      "Next.js",
      "React Native",
      "Expo",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
      "Git",
    ],
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
    skills: ["Python", "PyTorch", "NumPy", "Pandas", "Scikit-Learn", "Node.js"],
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
    skills: [],
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
    skills: [],
  },
];

export const education: Education[] = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    school: "Techno Main Salt Lake",
    href: "https://www.technoindiagroup.com/",
    mark: "T",
    location: "Kolkata, West Bengal, India",
    period: "June 2023 to Present",
    grades: ["GPA 8.136 / 10 (through semester 6)", "Class of 2027"],
    highlight:
      "Co-authored a research paper on deep learning for fruit quality assessment (CIACON 2026) alongside my coursework.",
    coursework: [
      "Data Structures and Algorithms",
      "Design and Analysis of Algorithms",
      "Operating Systems",
      "Database Management Systems",
      "Computer Networks",
      "Machine Learning",
      "Cryptography and Network Security",
      "Software Engineering",
      "Object Oriented Programming",
      "Project Management and Entrepreneurship",
    ],
  },
  {
    degree: "Higher Secondary (+2)",
    school: "West Bengal Council of Higher Secondary Education",
    href: "https://wbchse.wb.gov.in/",
    mark: "W",
    location: "West Bengal, India",
    period: "April 2020 to March 2023",
    grades: ["Grade A+", "81.2% overall"],
    highlight: "Captained the school cricket team through inter school tournaments while studying the core sciences.",
    coursework: ["Physics", "Chemistry", "Mathematics", "Biology", "English", "Bengali"],
  },
];

export const contact = {
  heading: "Got an idea?",
  accent: "Let's make it real.",
  topics: ["Project inquiry", "Full-time role", "Freelance work", "Collaboration", "Just saying hi"],
  formEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "",
  channels: [
    {
      label: "Primary email",
      value: "rajarshichakraborty2005@gmail.com",
      href: "mailto:rajarshichakraborty2005@gmail.com",
      kind: "email",
    },
    {
      label: "Secondary email",
      value: "rajarshi29032005@gmail.com",
      href: "mailto:rajarshi29032005@gmail.com",
      kind: "email",
    },
    { label: "Phone", value: "+91 8001950250", href: "tel:+918001950250", kind: "phone" },
    { label: "WhatsApp", value: "Message me directly", href: "https://wa.me/918001950250", kind: "whatsapp" },
    {
      label: "LinkedIn",
      value: "in/rajarshi-c-06a3402b7",
      href: "https://www.linkedin.com/in/rajarshi-c-06a3402b7",
      kind: "linkedin",
    },
    {
      label: "GitHub",
      value: "@therajarshichakraborty",
      href: "https://github.com/therajarshichakraborty",
      kind: "github",
    },
    {
      label: "LeetCode",
      value: "@rajarshi_2005",
      href: "https://leetcode.com/u/rajarshi_2005/",
      kind: "leetcode",
    },
  ] as Channel[],
};

export const projects: Project[] = [
  {
    slug: "reviewray",
    title: "ReviewRay",
    tagline: "AI code reviews posted straight onto your pull requests.",
    year: "2026",
    stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Prisma", "Neon", "Inngest", "OpenRouter", "AI SDK"],
    summary:
      "ReviewRay is an automated, AI-powered code review engine designed to streamline pull request workflows. Built on OpenAI and Inngest, it provides real-time, context-aware code analysis and continuous feedback.",
    links: {
      live: "https://review-ray.vercel.app",
      repo: "https://github.com/therajarshichakraborty/ReviewRay",
    },
    image: { src: "/work/reviewray.png", alt: "the ReviewRay landing page" },
  },
  {
    slug: "talktoyourgithub",
    title: "TalkToYourGitHub",
    tagline: "Ask your repositories questions in plain language.",
    year: "2026",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Neon", "Pinecone", "Inngest", "OpenAI", "Vercel AI SDK"],
    summary:
      "Query your commits, branches, pull requests, and issues using plain questions. TalkToYourGitHub combines a live GitHub API proxy, RAG vector embeddings, LangChain text splitting, and background Inngest pipelines to give you an AI assistant that truly understands your codebase.",
    links: {
      live: "https://talk-to-your-github.vercel.app",
      repo: "https://github.com/therajarshichakraborty/TalkToYourGithub",
    },
    image: { src: "/work/talktoyourgithub.png", alt: "the TalkToYourGitHub landing page" },
  },
  {
    slug: "exeos-ai",
    title: "ExeOS AI",
    tagline: "An autonomous executive assistant for email, calendar and tasks.",
    year: "2026",
    stack: ["Next.js", "PostgreSQL", "Drizzle ORM", "Clerk", "OpenRouter", "Vercel AI SDK", "shadcn/ui"],
    summary:
      "ExeOS-AI is an AI-powered executive operating system that intelligently manages email, calendars, tasks, and workflows, helping professionals stay organized, automate routine work, and focus on what matters most.",
    links: {
      live: "https://exe-os-ai.vercel.app",
      repo: "https://github.com/therajarshichakraborty/ExeOS-AI",
    },
    image: { src: "/work/exeos-ai.png", alt: "the ExecOS landing page" },
  },
  {
    slug: "zenith-cli",
    title: "Zenith CLI",
    tagline: "Language models in the terminal, automating engineering workflows.",
    year: "2026",
    stack: ["Node.js", "TypeScript", "Commander.js", "Next.js", "Better Auth", "OpenAI", "Tailwind CSS"],
    summary:
      "A high-performance command line application that integrates advanced language models directly into the terminal to automate software engineering workflows.",
    links: {
      live: "https://zenith-cli-azure.vercel.app",
      repo: "https://github.com/therajarshichakraborty/Zenith-CLI",
    },
    image: { src: "/work/zenith-cli.png", alt: "the ZenithCLI landing page" },
  },
  {
    slug: "synapse-ui",
    title: "Synapse UI",
    tagline: "A production-ready component library for modern web apps.",
    year: "2026",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Bun"],
    summary:
      "A modern, production-ready UI component library built for scalable web applications using Next.js, TypeScript, TailwindCSS, Shadcn/UI, and Bun.",
    links: {
      live: "https://synapse-ui-rho.vercel.app",
      repo: "https://github.com/therajarshichakraborty/Synapse-UI",
    },
    image: { src: "/work/synapse-ui.png", alt: "the Synapse UI landing page" },
  },
];

export const interactions: Interaction[] = [
  {
    slug: "little-guy",
    title: "Little guy",
    date: "2026-10",
    description: "A companion that watches your cursor. Tap him and he jumps.",
  },
  {
    slug: "dock",
    title: "Dock",
    date: "2026-09",
    description: "Magnification that follows the pointer, with springs instead of steps.",
  },
  {
    slug: "magnetic",
    title: "Magnetic",
    date: "2026-09",
    description: "A button that leans toward you before you touch it.",
  },
  {
    slug: "hold",
    title: "Hold to delete",
    date: "2026-09",
    description: "Destructive actions ask for a second of commitment.",
  },
  {
    slug: "copy",
    title: "Copy",
    date: "2026-08",
    description: "Feedback that swaps in place, so nothing around it moves.",
  },
  {
    slug: "tabs",
    title: "Tabs",
    date: "2026-08",
    description: "One indicator that travels between options instead of blinking.",
  },
  {
    slug: "scramble",
    title: "Scramble",
    date: "2026-07",
    description: "Text that decodes itself one character at a time.",
  },
  {
    slug: "spotlight",
    title: "Spotlight",
    date: "2026-06",
    description: "A border that lights up wherever your pointer is.",
  },
];

export const resume = {
  summary:
    "Software Engineer at Brand Voy, building live sports products on high-volume cricket and football data. Finishing a B.Tech in Computer Science at Techno Main Salt Lake, where I research deep learning for time-series forecasting.",
  skills: [
    { group: "Engineering", items: "TypeScript, Next.js, React Native, Expo, Node.js, Express, PostgreSQL" },
    { group: "Infrastructure", items: "Docker, Kubernetes, Git" },
    { group: "Data and ML", items: "Python, PyTorch, NumPy, Pandas, scikit-learn, time-series analysis" },
  ],
};

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function domain() {
  return site.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
