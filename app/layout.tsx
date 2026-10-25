import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Mrs_Saint_Delafield } from "next/font/google";
import { DotField } from "@/components/dot-field";
import { IntroGate } from "@/components/intro-gate";
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

const signature = Mrs_Saint_Delafield({
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

const light = "#ffffff";
const dark = "#0a0a0a";

export const viewport: Viewport = {
  colorScheme: site.theme === "system" ? "light dark" : site.theme,
  themeColor:
    site.theme === "system"
      ? [
          { media: "(prefers-color-scheme: light)", color: light },
          { media: "(prefers-color-scheme: dark)", color: dark },
        ]
      : site.theme === "dark"
        ? dark
        : light,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme={site.theme}
      data-intro=""
      suppressHydrationWarning
      className={cn(inter.variable, mono.variable, signature.variable, "font-sans")}
    >
      <body>
        <DotField />
        {children}
        <IntroGate />
      </body>
    </html>
  );
}
