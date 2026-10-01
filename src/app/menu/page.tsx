import Image from "next/image";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getMenuByCategory, menuHasPrices, menuItems } from "@/data/menu";
import { SiteShell } from "@/components/layout/SiteShell";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "La carte",
  description:
    "La carte de Pepe Luis : paellas, poissons et fruits de mer, poulpe à l'espagnole et douceurs. Sélection de démonstration.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  const categories = getMenuByCategory();

  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative isolate flex min-h-[62svh] items-end overflow-hidden bg-ink">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/menu/menu-hero-lamp.jpg"
            alt="Table dressée éclairée par une lampe dans une salle sombre"
            fill
            priority
            sizes="100vw"
            quality={78}
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/40"
          />
        </div>

        <div className="gutter w-full pb-16 pt-40 sm:pb-20">
          <div className="max-w-[46rem]">
            <p className="eyebrow text-saffron">{siteConfig.descriptor}</p>
            <h1 className="mt-6 font-display text-display-menu leading-[0.94] tracking-[-0.02em] text-shell">
              La carte
            </h1>
            <p className="mt-7 max-w-[48ch] text-lead leading-relaxed text-shell/80">
              Le feu, la mer, et de quoi partager. Les prix sont présentés en
              salle.
            </p>
          </div>
        </div>
      </section>

      {/* Menu */}
      <div className="gutter py-section">
        {siteConfig.demoMode ? (
          <Reveal className="mb-14 border-l-2 border-terracotta bg-shell/60 px-5 py-4">
            <p className="font-sans text-ui leading-relaxed text-ink/70">
              <span className="font-semibold text-ink">
                Sélection de démonstration.
              </span>{" "}
              Cette carte est un aperçu de présentation : elle ne constitue pas
              le menu du restaurant. Les prix ne sont pas affichés.
            </p>
          </Reveal>
        ) : null}

        <div className="flex flex-col gap-20 lg:gap-28">
          {categories.map((category) => (
            <section
              key={category.id}
              id={category.id}
              aria-labelledby={`menu-${category.id}`}
              className="scroll-mt-28"
            >
              <div className="flex items-baseline justify-between gap-6 border-b border-ink/15 pb-5">
                <h2
                  id={`menu-${category.id}`}
                  className="font-display text-section leading-none tracking-[-0.01em] text-ink"
                >
                  {category.label}
                </h2>
                <span
                  aria-hidden="true"
                  className="font-sans text-ui text-ink/35"
                >
                  {String(category.items.length).padStart(2, "0")}
                </span>
              </div>

              <ul className="mt-2">
                {category.items.map((item) => (
                  <li
                    key={item.id}
                    className="border-b border-ink/10 py-6 transition-colors duration-300 hover:bg-shell/45"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h3 className="font-sans text-dish font-semibold tracking-[-0.01em] text-ink">
                            {item.name}
                          </h3>
                          {item.featured ? (
                            <span className="border border-terracotta/40 px-2 py-0.5 font-sans text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-terracotta">
                              Signature
                            </span>
                          ) : null}
                        </div>

                        {item.description ? (
                          <p className="mt-2 max-w-[56ch] font-sans text-body leading-relaxed text-ink/65">
                            {item.description}
                          </p>
                        ) : null}
                      </div>

                      {/* Prices render only when real prices are supplied. */}
                      {menuHasPrices && item.price ? (
                        <p className="shrink-0 font-sans text-dish font-medium tabular-nums text-ink">
                          {item.price}
                        </p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Closing CTA */}
        <Reveal className="mt-24 border-t border-ink/15 pt-14 text-center lg:mt-32">
          <h2 className="font-display text-section leading-tight text-ink">
            On se retrouve à table ?
          </h2>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row sm:items-center sm:gap-5">
            <ButtonLink href="/#reservation">Réserver une table</ButtonLink>
            <ButtonLink href="/" variant="secondary">
              Retour à l&apos;accueil
            </ButtonLink>
          </div>

          {siteConfig.demoMode ? (
            <p className="mt-10 font-sans text-ui text-ink/45">
              {menuItems.length} plats de démonstration — à remplacer par la
              carte réelle.
            </p>
          ) : null}
        </Reveal>
      </div>
    </SiteShell>
  );
}