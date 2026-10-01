import Image from "next/image";
import { siteConfig } from "@/config/site";
import { socialFeedImages } from "@/data/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { InstagramIcon } from "@/components/ui/BrandIcons";

/**
 * Instagram teaser.
 *
 * Static local images standing in for a feed. No API call, and deliberately no
 * follower count, like count or comment count: none of those numbers could be
 * verified, and a demo that shows fabricated engagement metrics is the exact
 * failure mode this project is meant to avoid.
 *
 * The whole tile links to the real profile so the section has one clear action.
 */
export function InstagramFeed() {
  return (
    <section
      aria-labelledby="instagram-title"
      className="border-t border-ink/12 bg-cream py-section"
    >
      <div className="gutter">
        <SectionHeading
          id="instagram-title"
          eyebrow={siteConfig.instagramHandle}
          align="center"
          title={
            <>
              Suivez-nous
              <br />
              <span className="italic text-terracotta">sur Instagram</span>
            </>
          }
        />

        <RevealGroup className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:mt-16">
          {socialFeedImages.map((image) => (
            <RevealItem key={image.src}>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden bg-stone"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 640px) 23vw, 48vw"
                  quality={72}
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-500 group-hover:bg-ink/40 group-hover:opacity-100"
                >
                  <InstagramIcon className="size-7 text-shell" />
                </span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal index={2} className="mt-10 flex justify-center">
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-12 items-center gap-3 border border-ink/25 px-8 font-sans text-ui font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-shell"
          >
            <InstagramIcon className="size-[1.125rem]" />
            @{siteConfig.instagramHandle}
          </a>
        </Reveal>
      </div>
    </section>
  );
}