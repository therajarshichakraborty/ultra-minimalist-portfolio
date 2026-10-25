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
  email: "[EMAIL_ADDRESS]",
  url: "https://rajarshis-portfolio.vercel.app",
  title: "Rajarshi Chakraborty · Software Engineer",
  description:
    "Rajarshi Chakraborty is a Software Engineer at BrandVoy building live sports products, drawn to systems that are fast, dependable, and easy to understand.",
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
    intro:
      "I build software that has to be right and fast, from live sports data at brand voy to deep learning research at university.",
    experiments: "little experiments",
    projects: "side projects",
    thinking: "thinking about",
  },
  pages: {
    interactions: "small studies in motion and feedback. they are all live, so go ahead and touch.",
    work: "side projects i designed, built and shipped, each one live on the web.",
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
    grades: ["gpa 8.136 / 10 (through semester 6)", "class of 2027"],
    highlight:
      "Co-authored a research paper on deep learning for fruit quality assessment ( CIACON 2026 ) alongside my coursework.",
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
      "Project Management and Entrepreneurship"
    ],
  },
  {
    degree: "Higher Secondary (+2)",
    school: "west bengal council of higher secondary education",
    href: "https://wbchse.wb.gov.in/",
    mark: "W",
    location: "West Bengal, India",
    period: "April 2020 to March 2023",
    grades: ["Grade A+", "81.2% overall"],
    highlight: "captained the school cricket team through inter school tournaments while studying the core sciences.",
    coursework: ["Physics", "Chemistry", "Mathematics", "Biology", "English", "Bengali"],
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

export const resume = {
  summary:
    "software engineer at brand voy, building live sports products on high-volume cricket and football data. finishing a b.tech in computer science at techno main salt lake, where i research deep learning for time-series forecasting.",
  skills: [
    { group: "engineering", items: "typescript, next.js, react native, expo, node.js, express, postgresql" },
    { group: "infrastructure", items: "docker, kubernetes, git" },
    { group: "data and ml", items: "python, pytorch, numpy, pandas, scikit-learn, time series analysis" },
  ],
};

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function domain() {
  return site.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
