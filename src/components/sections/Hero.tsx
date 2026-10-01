import Image from "next/image";
import { HeroCopy } from "@/components/sections/HeroCopy";

/**
 * Full-bleed opening frame.
 *
 * Stays a Server Component: the photograph and layout ship as HTML, and only
 * `HeroCopy` hydrates.
 */
export function Hero() {
  return (
    <section
      id="accueil"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-ink"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* `priority` because this is the LCP element on every viewport. */}
        <Image
          src="/images/hero/paella-grill.jpg"
          alt="Paella de fruits de mer dans une grande poêle, servie sur une table en bois"
          fill
          priority
          sizes="100vw"
          quality={78}
          className="size-full scale-105 object-cover"
        />
        {/* Scrim: dark enough for AA text contrast at every breakpoint, weighted
            toward the lower left where the headline sits. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/35"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-ink/75 via-transparent to-transparent"
        />
      </div>

      <div className="gutter relative w-full pb-20 pt-40 sm:pb-24 lg:pb-28">
        <HeroCopy />
      </div>

      {/* Scroll hint. Decorative, so it is hidden from assistive tech. */}
      <div
        aria-hidden="true"
        className="absolute bottom-7 right-[max(1.25rem,5vw)] hidden lg:block"
      >
        <span className="eyebrow block rotate-90 origin-right text-shell/40">
          Défiler
        </span>
      </div>
    </section>
  );
}