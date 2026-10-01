import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cx } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onDark";
type Size = "sm" | "md";

const BASE =
  "relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-sans font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]";

const SIZES: Record<Size, string> = {
  // min-h keeps every variant at or above the 44px tap-target guidance.
  sm: "min-h-11 px-5 text-[0.6875rem]",
  md: "min-h-12 px-7 text-[0.75rem]",
};

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-wine text-shell hover:bg-wine-deep border border-wine hover:border-wine-deep",
  secondary:
    "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-shell",
  ghost: "border border-ink/15 text-ink hover:border-ink/45",
  onDark:
    "border border-shell/35 text-shell hover:bg-shell hover:text-wine hover:border-shell",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Optional editorial detail rendered as a trailing hairline marker. */
  trailing?: string;
};

function inner(children: ReactNode, trailing?: string) {
  return (
    <>
      <span>{children}</span>
      {trailing ? (
        <span
          aria-hidden="true"
          className="ml-1 inline-block h-px w-6 bg-current opacity-45"
        />
      ) : null}
    </>
  );
}

/**
 * Anchor-styled button. Renders a real `<a>` for external URLs and in-page
 * hashes, and a Next `<Link>` for internal routes, so navigation behaves
 * correctly without a router.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  trailing,
  external,
  ...rest
}: CommonProps & { href: string; external?: boolean } & Omit<
    ComponentProps<"a">,
    "href" | "className" | "children"
  >) {
  const classes = cx(BASE, SIZES[size], VARIANTS[variant], className);
  const isExternal = external ?? /^https?:/.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {inner(children, trailing)}
      </a>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes} {...rest}>
        {inner(children, trailing)}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {inner(children, trailing)}
    </Link>
  );
}

/**
 * Anchor-styled button used for the mobile reservation bar, which needs to be
 * a real link so it can be opened in a new tab or long-pressed.
 */
export function ButtonExternal({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: CommonProps & { href: string } & Omit<ComponentProps<"a">, "href" | "className">) {
  const classes = cx(BASE, SIZES[size], VARIANTS[variant], className);
  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  );
}