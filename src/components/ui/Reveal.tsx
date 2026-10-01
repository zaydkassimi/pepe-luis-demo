"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO, DURATION, REVEAL_Y } from "@/lib/motion";

/**
 * Pre-created motion components.
 *
 * These MUST be declared at module scope. Building them with
 * `motion.create(Tag)` inside the component body produces a brand-new component
 * type on every render, which throws away the element's state and defeats
 * reconciliation entirely. A fixed lookup keeps the type stable and is
 * checked at compile time — an unlisted tag is a type error rather than a
 * runtime surprise.
 */
const MOTION_TAGS = {
  div: motion.div,
  span: motion.span,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  li: motion.li,
  figure: motion.figure,
} as const;

export type RevealTag = keyof typeof MOTION_TAGS;

/**
 * Scroll-triggered reveal.
 *
 * Reveals once, on entry into the viewport, then stops observing — re-animating
 * on scroll-back reads as cheap.
 *
 * `prefers-reduced-motion` keeps the opacity fade but drops the transform, since
 * an abrupt opacity flip is its own kind of jarring.
 */
export function Reveal({
  children,
  as = "div",
  index = 0,
  delay,
  duration = DURATION.base,
  className,
  amount = 0.25,
  id,
}: {
  children?: ReactNode;
  as?: RevealTag;
  index?: number;
  delay?: number;
  duration?: number;
  className?: string;
  /** Fraction of the element that must be visible before revealing. */
  amount?: number;
  id?: string;
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = MOTION_TAGS[as];

  return (
    <MotionTag
      id={id}
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: REVEAL_Y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={
        reduceMotion
          ? { duration: 0.3, ease: EASE_OUT_EXPO }
          : { duration, delay: delay ?? index * 0.07, ease: EASE_OUT_EXPO }
      }
    >
      {children}
    </MotionTag>
  );
}

/**
 * Image mask reveal: the frame expands vertically from a thin line.
 * Used sparingly, on hero-adjacent imagery only.
 */
export function MaskReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { clipPath: "inset(0% 0% 100% 0%)" },
        shown: {
          clipPath: "inset(0% 0% 0% 0%)",
          transition: { duration: 0.9, delay, ease: EASE_OUT_EXPO },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Slow vertical drift for a full-bleed image band.
 * Disabled entirely under reduced-motion rather than merely slowed: a
 * continuously moving background is exactly what the preference targets.
 */
export function ParallaxShift({
  children,
  distance = 40,
  className,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ y: -distance / 2 }}
      whileInView={{ y: distance / 2 }}
      viewport={{ once: false, amount: 0 }}
      transition={{ ease: "linear" }}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered wrapper for grids and lists. */
export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Child of `RevealGroup`. */
export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: REVEAL_Y },
        shown: {
          opacity: 1,
          y: 0,
          transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
        },
      }}
    >
      {children}
    </motion.div>
  );
}