import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";
import { Rail } from "@/components/rail";
import { PageTransition } from "@/components/transitions";
import { projects, site } from "@/content/site";

export const metadata: Metadata = {
  title: "work",
  description: `selected projects by ${site.name}, designed and built start to finish.`,
};

export default function WorkPage() {
  return (
    <PageTransition>
      <main className="focus-cards flex min-h-svh flex-col justify-center py-8 max-sm:justify-start max-sm:pt-6 max-sm:pb-20">
        <div className="column mb-8">
          <PageHeader title="work" meta={`${projects.length} projects`}>
            {site.pages.work}
          </PageHeader>
        </div>
        <Rail label="work">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </Rail>
      </main>
    </PageTransition>
  );
}
