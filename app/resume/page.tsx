import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PrintButton } from "@/components/resume/print-button";
import { ResumePaper } from "@/components/resume/resume-paper";
import { revealDelay } from "@/components/reveal";
import { PageTransition } from "@/components/transitions";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "résumé",
  description: `the one page résumé of ${site.name}, ${site.role}.`,
};

export default function ResumePage() {
  return (
    <PageTransition>
      <main className="column py-[clamp(48px,10svh,112px)] print:w-full print:py-0">
        <div className="print:hidden">
          <PageHeader title="résumé" meta={<PrintButton />} />
        </div>
        <div className="reveal mt-10 print:mt-0" style={revealDelay(180)}>
          <ResumePaper />
        </div>
      </main>
    </PageTransition>
  );
}
