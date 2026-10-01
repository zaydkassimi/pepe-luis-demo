"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu as MenuIcon, X } from "lucide-react";
import { navItems } from "@/config/site";
import { cx, sectionHref } from "@/lib/utils";
import { Wordmark } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  /* Condenses the bar once the hero starts scrolling away. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Locking the body prevents the page scrolling behind the open overlay. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  /* Escape closes the overlay. A route change closes it too, but by clicking
     the link itself rather than from an effect — syncing to `pathname` inside
     an effect would need a setState in effect, which re-renders on every
     navigation for no benefit. */
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "border-b border-ink/10 bg-cream/92 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="gutter flex items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="Pepe Luis — accueil"
            className={cx(
              "font-display leading-none tracking-[0.02em] transition-all duration-500",
              scrolled ? "py-4 text-[1.5rem] text-ink" : "py-6 text-[1.75rem] text-ink",
            )}
          >
            <Wordmark />
          </Link>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navItems.map((item) => {
                const href = sectionHref(item.href.replace("#", ""), isHome);
                return (
                  <li key={item.label}>
                    <Link
                      href={href}
                      className="group relative font-sans text-ui font-medium uppercase tracking-[0.14em] text-ink/75 transition-colors duration-300 hover:text-ink"
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-1.5 left-0 h-px w-0 bg-terracotta transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href="/menu"
              aria-current={pathname === "/menu" ? "page" : undefined}
              className={cx(
                "font-sans text-ui font-medium uppercase tracking-[0.14em] transition-colors duration-300",
                pathname === "/menu" ? "text-terracotta" : "text-ink/75 hover:text-ink",
              )}
            >
              La carte
            </Link>
            <ButtonLink
              href="/#reservation"
              size="sm"
              trailing="oui"
              aria-label="Réserver une table"
            >
              Réserver
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="-mr-2 inline-flex size-11 items-center justify-center text-ink lg:hidden"
          >
            {open ? <X size={22} strokeWidth={1.5} /> : <MenuIcon size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-mobile"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-cream pt-28 lg:hidden"
          >
            <nav aria-label="Navigation mobile" className="gutter flex-1 overflow-y-auto pb-8">
              <ul className="flex flex-col gap-1">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.label}
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.05 + index * 0.05 }}
                  >
                    <Link
                      href={sectionHref(item.href.replace("#", ""), isHome)}
                      onClick={() => setOpen(false)}
                      className="flex min-h-14 items-center border-b border-ink/10 font-display text-[2rem] leading-none text-ink"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 + navItems.length * 0.05 }}
                >
                  <Link
                    href="/menu"
                    onClick={() => setOpen(false)}
                    className="flex min-h-14 items-center border-b border-ink/10 font-display text-[2rem] leading-none text-terracotta"
                  >
                    La carte
                  </Link>
                </motion.li>
              </ul>

              <div className="mt-10 flex flex-col gap-4">
                <ButtonLink href="/#reservation" size="md" className="w-full">
                  Réserver une table
                </ButtonLink>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 font-sans text-ui font-semibold uppercase tracking-[0.14em] text-ink/70"
                >
                  Nous trouver
                  <ArrowUpRight size={15} strokeWidth={1.5} />
                </a>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}