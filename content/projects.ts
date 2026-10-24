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
  role: string;
  team: string;
  timeline: string;
  summary: string;
  sections: ProjectSection[];
  image?: {
    src: string;
    alt: string;
  };
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
          "the streaming message, for example, never shifts the layout while tokens arrive, and the approval card keeps focus on the decision instead of jumping to the next message.",
        ],
      },
      {
        heading: "what changed",
        body: [
          "a few teams now use it as a starting point, and the patterns found their way into two open source libraries.",
        ],
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
        body: [
          "storm alerts tell you what is coming, not what to do. people either panic or ignore them.",
        ],
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

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
