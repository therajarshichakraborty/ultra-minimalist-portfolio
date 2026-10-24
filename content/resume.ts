export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
};

export type SkillGroup = {
  group: string;
  items: string;
};

export const resume = {
  summary:
    "design engineer building web and ios interfaces with react, typescript, and swiftui. focused on interaction patterns, reusable components, and motion that explains what the system is doing.",
  experience: [
    {
      role: "design engineer",
      company: "northwind studio",
      period: "2025 to now",
      description:
        "prototype and ship interaction models for ai products, from first sketch to production react components.",
    },
    {
      role: "product designer",
      company: "fieldwork",
      period: "2023 to 2025",
      description:
        "led the design system and built its react implementation, cutting new feature design time roughly in half.",
    },
    {
      role: "frontend engineer",
      company: "parcel labs",
      period: "2021 to 2023",
      description: "built the merchant dashboard and the motion guidelines the team still uses.",
    },
  ] satisfies Experience[],
  skills: [
    { group: "engineering", items: "react, next.js, typescript, swiftui, css, motion" },
    { group: "design", items: "figma, interaction design, prototyping, design systems, accessibility" },
    { group: "tools", items: "git, vitest, playwright, gsap" },
  ] satisfies SkillGroup[],
  education: {
    school: "school of visual arts",
    degree: "bfa, interaction design",
    location: "new york, ny",
    year: "2021",
  },
};
