import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PrintButton } from "@/components/resume/print-button";
import { ResumePaper } from "@/components/resume/resume-paper";
import { revealDelay } from "@/components/reveal";
import { PageTransition } from "@/components/transitions";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Résumé",
  description: `The one-page résumé of ${site.name}, ${site.role}.`,
};

export default function ResumePage() {
  return (
    <PageTransition>
      <main className="mx-auto w-[min(680px,calc(100%-2*var(--gutter)))] py-[clamp(48px,10svh,112px)] print:w-full print:py-0">
        <div className="print:hidden">
          <PageHeader title="Résumé" meta={<PrintButton />} />
        </div>
        <div
          className="reveal mt-10 rounded-3xl bg-bg p-6 shadow-media ring-1 ring-line max-sm:rounded-2xl sm:p-10 print:mt-0 print:rounded-none print:p-0 print:shadow-none print:ring-0"
          style={revealDelay(180)}
        >
          <ResumePaper />
        </div>
      </main>
    </PageTransition>
  );
}
