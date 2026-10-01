import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  siteConfig,
  getMailHref,
  getPhoneHref,
  getWhatsAppUrl,
} from "@/config/site";
import { navItems } from "@/config/site";
import { InstagramIcon, Wordmark } from "@/components/ui/BrandIcons";

/**
 * Site footer.
 *
 * Channels whose config value is empty are omitted rather than rendered as
 * disabled links, so the demo never shows a "call us" affordance that goes
 * nowhere.
 */
export function Footer() {
  const phoneHref = getPhoneHref();
  const mailHref = getMailHref();
  const whatsappUrl = getWhatsAppUrl();

  return (
    <footer className="on-dark bg-ink text-shell">
      <div className="gutter pt-[clamp(3.5rem,7vw,6rem)] pb-10">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-display text-[clamp(2.5rem,6vw,3.5rem)] leading-none tracking-[0.01em]"
            >
              <Wordmark />
            </Link>
            <p className="mt-6 max-w-[34ch] font-display text-[1.5rem] leading-snug italic text-shell/90">
              {siteConfig.tagline}
            </p>
            <p className="mt-6 font-sans text-ui uppercase tracking-[0.16em] text-shell/50">
              {siteConfig.descriptor}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Navigation de pied de page">
            <h2 className="eyebrow text-saffron">Naviguer</h2>
            <ul className="mt-6 flex flex-col gap-3.5">
              <li>
                <Link
                  href="/"
                  className="font-sans text-body text-shell/75 transition-colors duration-300 hover:text-shell"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="font-sans text-body text-shell/75 transition-colors duration-300 hover:text-shell"
                >
                  La carte
                </Link>
              </li>
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={`/${item.href}`}
                    className="font-sans text-body text-shell/75 transition-colors duration-300 hover:text-shell"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="eyebrow text-saffron">Nous trouver</h2>
            <address className="mt-6 not-italic">
              <p className="font-sans text-body leading-relaxed text-shell/75">
                {siteConfig.addressShort}
                {siteConfig.addressLine2 ? (
                  <>
                    <br />
                    {siteConfig.addressLine2}
                  </>
                ) : null}
              </p>
              <p className="mt-4 font-sans text-body text-shell/75">
                {siteConfig.openingHours.display}
              </p>

              <ul className="mt-7 flex flex-col gap-3">
                <li>
                  <a
                    href={siteConfig.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-11 items-center gap-3 font-sans text-body text-shell transition-colors duration-300 hover:text-saffron"
                  >
                    <InstagramIcon className="size-[1.125rem] shrink-0" />
                    <span>@{siteConfig.instagramHandle}</span>
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="opacity-50 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </li>

                {phoneHref ? (
                  <li>
                    <a
                      href={phoneHref}
                      className="inline-flex min-h-11 items-center font-sans text-body text-shell transition-colors duration-300 hover:text-saffron"
                    >
                      {siteConfig.phone}
                    </a>
                  </li>
                ) : null}

                {whatsappUrl ? (
                  <li>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center font-sans text-body text-shell transition-colors duration-300 hover:text-saffron"
                    >
                      WhatsApp
                    </a>
                  </li>
                ) : null}

                {mailHref ? (
                  <li>
                    <a
                      href={mailHref}
                      className="inline-flex min-h-11 items-center font-sans text-body text-shell transition-colors duration-300 hover:text-saffron"
                    >
                      {siteConfig.email}
                    </a>
                  </li>
                ) : null}
              </ul>

              {siteConfig.mapsUrl ? (
                <a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center gap-2 border border-shell/25 px-5 font-sans text-ui font-semibold uppercase tracking-[0.14em] text-shell transition-colors duration-300 hover:border-shell hover:bg-shell hover:text-ink"
                >
                  Itinéraire
                  <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
                </a>
              ) : null}
            </address>
          </div>
        </div>

        {/* Disclosure */}
        <div className="mt-16 border-t border-shell/12 pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-sans text-ui text-shell/45">
              © {new Date().getFullYear()} Pepe Luis. Tous droits réservés.
            </p>
            {siteConfig.demoMode ? (
              <p className="font-sans text-ui text-shell/45">
                Concept web — démonstration non officielle
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}