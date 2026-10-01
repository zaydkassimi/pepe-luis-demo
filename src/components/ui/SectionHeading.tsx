import type { ReactNode } from "react";
import { cx } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Editorial section header.
 *
 * Renders an optional eyebrow, the heading itself, a thin rule and an optional
 * supporting line. Alignment is a prop so the same component can serve the
 * left-aligned, centred and right-aligned compositions used across the page
 * without duplicating markup.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  as: Tag = "h2",
  tone = "dark",
  className,
  rule = true,
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  /** `dark` = ink text on cream, `light` = shell text on a dark surface. */
  tone?: "dark" | "light";
  className?: string;
  rule?: boolean;
  id?: string;
}) {
  const isCenter = align === "center";
  const isLight = tone === "light";

  return (
    <div
      className={cx(
        "flex flex-col",
        isCenter && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal as="div" className={cx("eyebrow", isLight ? "text-saffron" : "text-terracotta")}>
          {eyebrow}
        </Reveal>
      ) : null}

      <Reveal
        as={Tag}
        id={id}
        index={eyebrow ? 1 : 0}
        className={cx(
          "font-display text-section leading-[1.06] tracking-[-0.015em]",
          isLight ? "text-shell" : "text-ink",
          eyebrow ? "mt-5" : undefined,
        )}
      >
        {title}
      </Reveal>

      {rule ? (
        <Reveal
          as="div"
          index={eyebrow ? 2 : 1}
          aria-hidden="true"
          className={cx(
            "rule mt-7",
            isCenter ? "max-w-16" : "max-w-24",
            isLight ? "text-shell" : "text-ink",
          )}
        />
      ) : null}

      {subtitle ? (
        <Reveal
          as="p"
          index={eyebrow ? 3 : 2}
          className={cx(
            "mt-7 max-w-[52ch] text-lead leading-relaxed",
            isLight ? "text-shell/72" : "text-ink/68",
          )}
        >
          {subtitle}
        </Reveal>
      ) : null}
    </div>
  );
}