import Image from "next/image";
import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

/**
 * Image frame with a subtle inner hairline.
 *
 * Keeps the "restrained borders" language consistent across every photograph on
 * the site without each call site re-declaring the ring. The frame has a fixed
 * aspect so the grid never shifts while images load.
 */
export function ImageFrame({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
  className,
  aspect,
  ring = true,
  children,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Overrides the intrinsic ratio, cropping the image with object-cover. */
  aspect?: "square" | "portrait" | "landscape" | "cinematic";
  ring?: boolean;
  children?: ReactNode;
}) {
  const aspectClass = aspect
    ? {
        square: "aspect-square",
        portrait: "aspect-[3/4]",
        landscape: "aspect-[4/3]",
        cinematic: "aspect-[16/10]",
      }[aspect]
    : undefined;

  return (
    <div
      className={cx(
        "relative overflow-hidden bg-stone",
        aspectClass,
        ring && "ring-1 ring-inset ring-ink/10",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className="size-full object-cover"
      />
      {children}
    </div>
  );
}

/**
 * Full-bleed photographic band used for section transitions.
 *
 * The image is rendered taller than its container and clipped, so the crop can
 * never expose a letterbox edge regardless of viewport ratio.
 */
export function ImageBand({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
  className,
  overlay = true,
  children,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  className?: string;
  overlay?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={cx("relative overflow-hidden bg-ink", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className="size-full object-cover"
      />
      {overlay ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/72 via-ink/28 to-ink/52"
        />
      ) : null}
      {children}
    </div>
  );
}