import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/contact-form";
import { HoverList } from "@/components/hover-list";
import { ArrowUpRightIcon, GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { revealDelay } from "@/components/reveal";
import { PageTransition } from "@/components/transitions";
import { contact, site, type Channel } from "@/content/site";

export const metadata: Metadata = {
  title: "contact",
  description: `get in touch with ${site.name}.`,
};

const stroke = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const icons: Record<Channel["kind"], ReactNode> = {
  email: <MailIcon className="size-4" />,
  phone: (
    <svg {...stroke} aria-hidden="true" className="size-4">
      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
    </svg>
  ),
  whatsapp: (
    <svg {...stroke} aria-hidden="true" className="size-4">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  ),
  linkedin: <LinkedinIcon className="size-4" />,
  github: <GithubIcon className="size-4" />,
  leetcode: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  ),
};

export default function ContactPage() {
  return (
    <PageTransition>
      <main className="column py-[clamp(48px,10svh,112px)]">
        <PageHeader title="contact" meta="replies within a day">
          <span className="block text-[28px] leading-[1.15] font-medium tracking-[-0.03em] text-balance sm:text-[34px]">
            {contact.heading} <span className="contact-accent">{contact.accent}</span>
          </span>
          <span className="mt-4 block">{site.pages.contact}</span>
        </PageHeader>

        <section className="reveal mt-10" style={revealDelay(200)} aria-label="message form">
          <ContactForm email={site.email} topics={contact.topics} endpoint={contact.formEndpoint} />
        </section>

        <section className="reveal mt-14" style={revealDelay(260)}>
          <h2 className="font-medium">or reach me directly</h2>
          <HoverList className="-mx-2 mt-3 grid gap-0.5">
            {contact.channels.map((channel) => {
              const external = channel.href.startsWith("http");
              return (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="group grid grid-cols-[36px_1fr_16px] items-center gap-3 rounded-lg px-2 py-2.5"
                >
                  <span className="grid size-9 place-items-center rounded-full bg-bg text-ink ring-1 ring-line transition-transform duration-300 ease-out-quint group-hover:scale-105">
                    {icons[channel.kind]}
                  </span>
                  <span className="min-w-0">
                    <span className="block">{channel.label}</span>
                    <span className="block truncate text-muted">{channel.value}</span>
                  </span>
                  <ArrowUpRightIcon className="size-3.5 text-muted transition-transform duration-200 ease-snap group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
                </a>
              );
            })}
          </HoverList>
        </section>
      </main>
    </PageTransition>
  );
}
