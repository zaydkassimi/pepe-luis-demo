import {
  siteConfig,
  getMailHref,
  getPhoneHref,
  getWhatsAppUrl,
} from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";

/**
 * Contact block.
 *
 * Instagram is the only channel that always renders, because it is the only
 * one we can evidence. Phone, WhatsApp, email and the map link render only when
 * their config value is filled in.
 *
 * While `mapsUrl` is empty the address is shown as plain text — no link, no
 * coordinates, no "click to open in Maps" affordance that would fail.
 */
export function Contact() {
  const phoneHref = getPhoneHref();
  const mailHref = getMailHref();
  const whatsappUrl = getWhatsAppUrl();

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="gutter py-section"
    >
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            id="contact-title"
            eyebrow="Contact"
            title={
              <>
                Venez
                <br />
                <span className="italic text-terracotta">nous voir</span>
              </>
            }
            subtitle="Le plus simple reste de nous écrire. Réponse rapide sur nos horaires et nos disponibilités."
          />

          <Reveal index={3} className="mt-10">
            <div className="border-t border-ink/15 pt-7">
              <p className="eyebrow text-ink/45">Adresse</p>
              <address className="mt-3 not-italic">
                {siteConfig.mapsUrl ? (
                  <a
                    href={siteConfig.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center font-sans text-subsection leading-tight text-ink underline decoration-terracotta decoration-1 underline-offset-[6px] transition-colors hover:text-terracotta"
                  >
                    {siteConfig.addressShort}
                  </a>
                ) : (
                  <p className="font-sans text-subsection leading-tight text-ink">
                    {siteConfig.addressShort}
                  </p>
                )}
                {siteConfig.addressLine2 ? (
                  <p className="mt-2 font-sans text-body text-ink/70">
                    {siteConfig.addressLine2}
                  </p>
                ) : null}
              </address>
              <p className="mt-4 font-sans text-body text-ink/70">
                {siteConfig.city}, {siteConfig.country}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Channels */}
        <Reveal index={2} className="lg:pt-24">
          <ul className="flex flex-col divide-y divide-ink/12 border-y border-ink/12">
            <li>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-16 items-center justify-between gap-4 py-5 transition-colors duration-300 hover:text-terracotta"
              >
                <span className="flex items-center gap-4">
                  <InstagramIcon className="size-5 shrink-0" />
                  <span className="font-sans text-body">
                    @{siteConfig.instagramHandle}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="font-sans text-ui uppercase tracking-[0.14em] text-ink/40 transition-colors group-hover:text-terracotta"
                >
                  Écrire
                </span>
              </a>
            </li>

            {whatsappUrl ? (
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-16 items-center justify-between gap-4 py-5 transition-colors duration-300 hover:text-terracotta"
                >
                  <span className="flex items-center gap-4">
                    <WhatsAppIcon className="size-5 shrink-0" />
                    <span className="font-sans text-body">WhatsApp</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-sans text-ui uppercase tracking-[0.14em] text-ink/40 transition-colors group-hover:text-terracotta"
                  >
                    Écrire
                  </span>
                </a>
              </li>
            ) : null}

            {phoneHref ? (
              <li>
                <a
                  href={phoneHref}
                  className="group flex min-h-16 items-center justify-between gap-4 py-5 transition-colors duration-300 hover:text-terracotta"
                >
                  <span className="font-sans text-body">{siteConfig.phone}</span>
                  <span
                    aria-hidden="true"
                    className="font-sans text-ui uppercase tracking-[0.14em] text-ink/40 transition-colors group-hover:text-terracotta"
                  >
                    Appeler
                  </span>
                </a>
              </li>
            ) : null}

            {mailHref ? (
              <li>
                <a
                  href={mailHref}
                  className="group flex min-h-16 items-center justify-between gap-4 py-5 transition-colors duration-300 hover:text-terracotta"
                >
                  <span className="font-sans text-body">{siteConfig.email}</span>
                  <span
                    aria-hidden="true"
                    className="font-sans text-ui uppercase tracking-[0.14em] text-ink/40 transition-colors group-hover:text-terracotta"
                  >
                    Écrire
                  </span>
                </a>
              </li>
            ) : null}
          </ul>

          {!phoneHref && !whatsappUrl && !mailHref ? (
            <p className="mt-6 font-sans text-ui leading-relaxed text-ink/55">
              Les coordonnées telefoniques et l&apos;adresse e-mail n&apos;ont pas
              encore été vérifiées pour cette démonstration.
            </p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}