import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Shadows_Into_Light } from "next/font/google";
import { DotField } from "@/components/dot-field";
import { FloatingDock } from "@/components/floating-dock";
import { SiteFooter } from "@/components/site-footer";
import { IntroGate } from "@/components/intro-gate";
import { ScrollProgress } from "@/components/scroll-progress";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  preload: false,
});

const signature = Shadows_Into_Light({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-signature",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-intro=""
      suppressHydrationWarning
      className={cn(inter.variable, mono.variable, signature.variable, "font-sans")}
    >
      <body>
        <ScrollProgress />
        <DotField />
        {children}
        <SiteFooter />
        <FloatingDock />
        <IntroGate />
      </body>
    </html>
  );
}
