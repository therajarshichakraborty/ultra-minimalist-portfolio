import type { Metadata } from "next";
import { InteractionCard } from "@/components/interaction-card";
import { PageHeader } from "@/components/page-header";
import { Rail } from "@/components/rail";
import { PageTransition } from "@/components/transitions";
import { interactions, site } from "@/content/site";

export const metadata: Metadata = {
  title: "interactions",
  description: `small studies in motion and feedback by ${site.name}. every one is live in the browser, so you can touch them.`,
};

export default function InteractionsPage() {
  return (
    <PageTransition>
      <main className="flex min-h-svh flex-col justify-center py-8 max-sm:justify-start max-sm:pt-6 max-sm:pb-20">
        <div className="column mb-8">
          <PageHeader title="interactions" meta={interactions.length}>
            {site.pages.interactions}
          </PageHeader>
        </div>
        <Rail label="interactions">
          {interactions.map((interaction, index) => (
            <InteractionCard
              key={interaction.slug}
              interaction={interaction}
              morph={index === 0 ? "cover-interactions" : undefined}
            />
          ))}
        </Rail>
      </main>
    </PageTransition>
  );
}
