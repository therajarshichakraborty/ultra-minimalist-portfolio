import Link from "next/link";
import { BackToTop } from "@/components/back-to-top";
import { LocalTime } from "@/components/local-time";
import { footer, site } from "@/content/site";

function FooterLink({ href, label }: { href: string; label: string }) {
  const className = "text-ink transition-colors duration-150 hover:text-muted focus-visible:text-muted";
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
  return (
    <footer className="column pb-[max(128px,calc(env(safe-area-inset-bottom)+112px))] print:hidden">
      <p aria-hidden="true" className="w-fit -rotate-3 font-script text-[40px] leading-none">
        {site.signature}
      </p>
      <p className="mt-4 max-w-80 text-pretty text-muted">{site.tagline}</p>

      <nav aria-label="Footer" className="mt-10 grid grid-cols-3 gap-6 max-sm:gap-4">
        {footer.groups.map((group) => (
          <div key={group.title}>
            <h2 className="text-meta text-muted">{group.title}</h2>
            <ul className="mt-3 grid gap-1.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-meta text-muted">
        <p className="flex items-center gap-1.5">
          <span className="live-dot" aria-hidden="true" />
          {site.location} · <LocalTime />
        </p>
        <BackToTop />
      </div>
    </footer>
  );
}
