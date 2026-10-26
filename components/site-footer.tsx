import Link from "next/link";
import type { ReactNode } from "react";
import { BackToTop } from "@/components/back-to-top";
import { GithubIcon, LinkedinIcon, MailIcon, XLogoIcon } from "@/components/icons";
import { footer, site } from "@/content/site";

const socials = [
  { label: "GitHub", href: site.links.github, icon: <GithubIcon /> },
  { label: "LinkedIn", href: site.links.linkedin, icon: <LinkedinIcon /> },
  { label: "X", href: site.links.x, icon: <XLogoIcon /> },
  { label: "Email", href: `mailto:${site.email}`, icon: <MailIcon /> },
];

// The letter of the wordmark that gets the accent gradient: the "J" in RAJARSHI.
const accent = 2;

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  const className = "callout transition-colors duration-150 hover:text-ink focus-visible:text-ink";
  const label = <span className="callout-text">{children}</span>;
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export function SiteFooter() {
  const letters = site.signature.toUpperCase().split("");

  return (
    <footer className="relative overflow-hidden border-t border-line print:hidden">
      <div className="column flex flex-col items-center pt-16 text-center">
        <Link href="/" className="font-medium">
          {site.name}
        </Link>
        <p className="mt-1.5 max-w-90 text-pretty text-muted">{site.tagline}</p>

        <ul className="mt-6 flex gap-2.5">
          {socials.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={item.label}
                title={item.label}
                className="grid size-10 place-items-center rounded-full bg-chip text-ink transition-[background-color,transform] duration-200 ease-snap hover:-translate-y-0.5 hover:bg-chip-hover active:scale-[0.94] [&>svg]:size-[17px]"
              >
                {item.icon}
              </a>
            </li>
          ))}
        </ul>

        <nav aria-label="Footer" className="mt-10 grid gap-3">
          <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2">
            {footer.primary.map((item) => (
              <li key={item.href}>
                <FooterLink href={item.href}>{item.label}</FooterLink>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2 text-muted">
            {footer.secondary.map((item) => (
              <li key={item.href}>
                <FooterLink href={item.href}>{item.label}</FooterLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10">
          <BackToTop />
        </div>
      </div>

      <p aria-hidden="true" className="footer-wordmark mt-14 flex justify-center select-none">
        {letters.map((letter, index) => (
          <span key={index} data-accent={index === accent || undefined} className="footer-letter">
            {letter}
          </span>
        ))}
      </p>

      <p className="column pt-6 pb-[max(112px,calc(env(safe-area-inset-bottom)+96px))] text-center text-meta text-muted">
        Designed and built by {site.name} in {site.location}.
      </p>
    </footer>
  );
}
