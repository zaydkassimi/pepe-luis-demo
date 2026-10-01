import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

/**
 * Fonts
 *
 * Instrument Serif is a display-only face: 400 weight only, so it is applied
 * to large headings and never to body copy. Manrope covers everything else.
 *
 * `variable` assigns the CSS custom property that next/font injects onto
 * <html>. Those names are what `@theme inline` in globals.css points the
 * `font-display` / `font-sans` utilities at — do not rename them without
 * updating that block.
 */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
  fallback: ["ui-serif", "Georgia", "Times New Roman", "serif"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  display: "swap",
  variable: "--font-sans",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Helvetica Neue", "sans-serif"],
});

/**
 * Social images are only advertised when a production origin exists.
 *
 * Without `siteConfig.url`, Next resolves relative OG image paths against
 * `http://localhost:3000` and warns at build time — which would ship a preview
 * card pointing at the developer's own machine. Emitting no image is the only
 * honest option until the real domain is configured.
 */
const hasOrigin = Boolean(siteConfig.url);
const metadataBase = hasOrigin ? new URL(siteConfig.url) : undefined;

const socialImage = hasOrigin
  ? {
      url: "/images/og-image.jpg",
      width: 1200,
      height: 630,
      alt: `${siteConfig.name} — ${siteConfig.tagline}`,
    }
  : [];

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "restaurant Casablanca",
    "cuisine espagnole",
    "fruits de mer",
    "paella",
    "Pepe Luis",
  ],
  openGraph: {
    type: "website",
    locale: "fr_MA",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: socialImage,
  },
  twitter: {
    card: hasOrigin ? ("summary_large_image" as const) : ("summary" as const),
    title: siteConfig.name,
    description: siteConfig.description,
    images: hasOrigin ? ["/images/og-image.jpg"] : undefined,
  },
  robots: {
    // The demo is explicitly unofficial, so it asks not to be indexed.
    index: false,
    follow: false,
  },
  category: "restaurant",
};

export const viewport: Viewport = {
  themeColor: "#1b1a18",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${instrumentSerif.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-cream text-ink antialiased">
        {/* Skip link: first tab stop, reveals the main content. */}
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:rounded-sm focus:bg-ink focus:px-5 focus:py-3 focus:font-sans focus:text-ui focus:font-semibold focus:uppercase focus:tracking-[0.14em] focus:text-shell"
        >
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  );
}