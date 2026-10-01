"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { getReservationHref } from "@/config/site";
import { cx } from "@/lib/utils";

/**
 * Sticky mobile reservation bar.
 *
 * Only renders while the on-page reservation section is NOT in view, so the
 * call to action is always one tap away without ever duplicating the form the
 * visitor is already looking at. Hidden on sm and up because the desktop
 * navbar already carries a reservation button.
 */
export function MobileReservationBar() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  /* Falls back to the on-page form until a booking engine is configured. */
  const href = getReservationHref();

  useEffect(() => {
    const section = document.getElementById("reservation");
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setVisible(!entry.isIntersecting);
      },
      { rootMargin: "-10% 0px 0px 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  const isExternal = href.startsWith("http");

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { y: "100%" }}
      animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cx(
        "fixed inset-x-0 bottom-0 z-40 p-3 sm:hidden",
        // Sits above the iOS home indicator.
        "pb-[calc(0.75rem+env(safe-area-inset-bottom))]",
      )}
    >
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="flex min-h-13 items-center justify-center bg-wine px-6 py-4 font-sans text-ui font-semibold uppercase tracking-[0.14em] text-shell shadow-[0_-8px_28px_rgba(27,26,24,0.18)]"
      >
        Réserver une table
      </a>
    </motion.div>
  );
}