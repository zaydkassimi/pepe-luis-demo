/**
 * Shared motion tokens.
 *
 * Durations stay inside 250–700ms: long enough to feel composed, short
 * enough that the page never feels sluggish. `prefers-reduced-motion` is
 * handled at the call site via `useReducedMotion`, which collapses these to 0.
 */

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.25,
  base: 0.45,
  slow: 0.65,
} as const;

/** Distance travelled by a reveal. Kept small so text never drifts far. */
export const REVEAL_Y = 18;

/** Stagger between children of a group reveal, in seconds. */
export const STAGGER = 0.07;

/**
 * Builds a fade + rise transition.
 * `index` shifts the delay so grouped items cascade instead of popping together.
 */
export function revealTransition(index = 0, duration: number = DURATION.base) {
  return {
    duration,
    delay: index * STAGGER,
    ease: EASE_OUT_EXPO,
  } as const;
}