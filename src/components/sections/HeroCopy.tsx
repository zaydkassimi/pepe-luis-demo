"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { EASE_OUT_EXPO, DURATION } from "@/lib/motion";
import { ButtonLink } from "@/components/ui/ButtonLink";

/**
 * Animated hero copy.
 *
 * Split out from `Hero` so the section itself can stay a Server Component:
 * only this block — and its motion runtime — reaches the client.
 *
 * Each line animates independently so the stack resolves upward in sequence
 * rather than as one block. Under `prefers-reduced-motion` the lines fade in
 * without travelling, keeping the composition but removing the motion.
 */
export function HeroCopy() {
  const reduceMotion = useReducedMotion();

  const rise = () =>
    reduceMotion
      ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
        };

  const transition = (delay: number) => ({
    duration: DURATION.slow,
    delay,
    ease: EASE_OUT_EXPO,
  });

  return (
    <div className="max-w-[64rem]">
      <motion.p {...rise()} transition={transition(0.05)} className="eyebrow text-saffron">
        {siteConfig.descriptor}
      </motion.p>

      {/* Explicit line breaks: the editorial stack must not depend on where the
          browser chooses to wrap, so `text-wrap: balance` is not applied here. */}
      <h1
        id="hero-title"
        className="mt-7 font-display text-display leading-[0.94] tracking-[-0.02em] text-shell"
      >
        <motion.span {...rise()} transition={transition(0.15)} className="block">
          Le goût
        </motion.span>
        <motion.span
          {...rise()}
          transition={transition(0.25)}
          className="block italic text-saffron"
        >
          de la mer,
        </motion.span>
        <motion.span {...rise()} transition={transition(0.35)} className="block">
          le rythme
        </motion.span>
        <motion.span
          {...rise()}
          transition={transition(0.45)}
          className="block italic"
        >
          de l&apos;Espagne.
        </motion.span>
      </h1>

      <motion.p
        {...rise()}
        transition={transition(0.6)}
        className="mt-9 max-w-[46ch] text-lead leading-relaxed text-shell/82"
      >
        Une table casablancaise où le riz, le feu et les produits de la mer se
        partagent.
      </motion.p>

      <motion.div
        {...rise()}
        transition={transition(0.72)}
        className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6"
      >
        <ButtonLink href="#reservation" variant="onDark" size="md">
          Réserver une table
        </ButtonLink>
        <ButtonLink
          href="/menu"
          variant="ghost"
          size="md"
          className="border-shell/35 text-shell hover:border-shell hover:bg-shell hover:text-wine"
        >
          Découvrir la carte
        </ButtonLink>
      </motion.div>
    </div>
  );
}