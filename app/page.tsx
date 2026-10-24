import { Chip } from "@/components/chip";
import { GithubIcon, LinkedinIcon, MailIcon, MergeIcon, PencilLineIcon, XLogoIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { PageTransition } from "@/components/transitions";
import { site } from "@/content/site";

export default function Home() {
  return (
    <PageTransition>
      <main className="column flex min-h-svh flex-col justify-center py-[clamp(48px,6svh,56px)]">
        <h1>
          <Reveal>
            hi i&apos;m <b className="font-[550]">{site.name}</b>
          </Reveal>
        </h1>
        <p className="mt-1 leading-[1.55]">
          <Reveal delay={80}>{site.role}</Reveal>
        </p>
        <p className="mt-8 max-w-[480px] text-pretty">
          <Reveal delay={160}>
            i build interfaces for the web and ios. sometimes i make, contribute to{" "}
            <Chip href="/open-source" icon={<MergeIcon />} iconName="open-source" brand="oss">
              open source
            </Chip>
            , and share what i&apos;m{" "}
            <Chip href="/notes" icon={<PencilLineIcon />} iconName="notes">
              thinking about
            </Chip>
            .
          </Reveal>
        </p>
        <p className="mt-8 tracking-normal">
          <Reveal delay={420}>
            <Chip href={`mailto:${site.email}`} external icon={<MailIcon />} iconName="email">
              copy my email
            </Chip>{" "}
            to say hi. find me on{" "}
            <Chip href={site.links.linkedin} external icon={<LinkedinIcon />} iconName="linkedin" brand="linkedin">
              linkedin
            </Chip>
            ,{" "}
            <Chip href={site.links.x} external icon={<XLogoIcon />} iconName="x" brand="x" label="x" /> and{" "}
            <Chip href={site.links.github} external icon={<GithubIcon />} iconName="github" brand="github">
              github
            </Chip>
            .
          </Reveal>
        </p>
      </main>
    </PageTransition>
  );
}
