export type Theme = "light" | "dark" | "system";

export type Site = {
  name: string;
  signature: string;
  role: string;
  location: string;
  email: string;
  url: string;
  title: string;
  description: string;
  links: {
    linkedin: string;
    x: string;
    github: string;
  };
  theme: Theme;
};

export const site: Site = {
  name: "alex rivera",
  signature: "alex",
  role: "design engineer",
  location: "brooklyn, ny",
  email: "hello@example.com",
  url: "https://example.com",
  title: "alex rivera · design engineer",
  description:
    "alex rivera is a design engineer building interfaces for the web and ios, with a focus on motion, feedback, and the small details that make software feel considered.",
  links: {
    linkedin: "https://www.linkedin.com/",
    x: "https://x.com/",
    github: "https://github.com/",
  },
  theme: "light",
};
