import { Chip } from "@/components/chip";
import { CompanionLink } from "@/components/companion";
import { CopyEmail } from "@/components/copy-email";
import { HomeCards } from "@/components/home-cards";
import { GithubIcon, LinkedinIcon, MergeIcon, PencilLineIcon, XLogoIcon } from "@/components/icons";
import { PersonJsonLd } from "@/components/json-ld";
import { NameSignature } from "@/components/name-signature";
import { ResumeChip } from "@/components/resume/resume-chip";
import { Reveal } from "@/components/reveal";
import { PageTransition } from "@/components/transitions";
import { site } from "@/content/site";

export default function Home() {
  return (
    <PageTransition>
      <main className="column flex min-h-svh flex-col justify-center py-[clamp(48px,6svh,56px)]">
        <PersonJsonLd />
        <header>
          <h1 className="leading-[1.65]">
            <Reveal>
              hi i&apos;m <NameSignature name={site.name} signature={site.signature} />
            </Reveal>
          </h1>
          <p className="mt-1 leading-[1.55]">
            <Reveal delay={70}>{site.role}</Reveal>
          </p>
          <p className="mt-8 max-w-[480px] text-pretty">
            <Reveal delay={140} step={14}>
              {site.home.intro} sometimes i make{" "}
              <CompanionLink href="/interactions">{site.home.experiments}</CompanionLink>, contribute to{" "}
              <Chip href="/open-source" brand="oss" iconName="open-source" icon={<MergeIcon />}>
                {site.home.openSource}
              </Chip>
              , and share what i&apos;m{" "}
              <Chip href="/notes" iconName="notes" icon={<PencilLineIcon />}>
                {site.home.thinking}
              </Chip>
              .
            </Reveal>
          </p>
          <p className="mt-8 tracking-normal">
            <Reveal delay={380} step={14}>
              <CopyEmail email={site.email} /> to say hi. find me on{" "}
              <Chip href={site.links.linkedin} external brand="linkedin" iconName="linkedin" icon={<LinkedinIcon />}>
                linkedin
              </Chip>
              , <Chip href={site.links.x} external brand="x" iconName="x" icon={<XLogoIcon />} label="x" /> and{" "}
              <Chip href={site.links.github} external brand="github" iconName="github" icon={<GithubIcon />}>
                github
              </Chip>
              , or read my <ResumeChip />.
            </Reveal>
          </p>
          <p className="mt-8 text-pretty">
            <Reveal delay={480} step={14}>
              more: <Chip href="/about">about me</Chip>, my <Chip href="/activity">coding activity</Chip>,{" "}
              <Chip href="/education">education</Chip>, and a <Chip href="/contact">contact form</Chip>.
            </Reveal>
          </p>
        </header>
        <HomeCards />
      </main>
    </PageTransition>
  );
}
