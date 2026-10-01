import type { ReactNode, SelectHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cx } from "@/lib/utils";

const CONTROL =
  "w-full min-h-12 border bg-transparent px-4 py-3 text-body text-ink placeholder:text-ink/35 transition-colors duration-300 focus:border-terracotta focus:outline-none";

/**
 * Labelled form control.
 *
 * Error handling covers three accessibility requirements at once:
 *  • `aria-invalid` marks the field's validity
 *  • `aria-describedby` wires the message to the input so screen readers
 *    announce it
 *  • `role="alert"` on the message makes it announced on appearance
 *
 * The label is always rendered visually — no placeholder-as-label, which
 * disappears the moment a user starts typing and strands them.
 */
export function Field({
  label,
  name,
  error,
  hint,
  className,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  className?: string;
  /**
   * Render prop rather than a plain element: the control has to receive
   * `aria-invalid` and `aria-describedby` derived from the validation state,
   * which means the binding is only knowable here.
   */
  children: (binding: FieldBinding & { invalid: boolean }) => ReactNode;
}) {
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={cx("flex flex-col gap-2", className)}>
      <label
        htmlFor={name}
        className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-shell/70"
      >
        {label}
      </label>

      {children({ describedBy, invalid: Boolean(error) })}

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="font-sans text-ui text-saffron"
        >
          {error}
        </p>
      ) : null}

      {hint && !error ? (
        <p id={hintId} className="font-sans text-ui text-shell/45">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** Shared control styling. */
export function controlClass(
  invalid: boolean,
  onDark: boolean,
): string {
  return cx(
    CONTROL,
    invalid
      ? "border-saffron"
      : onDark
        ? "border-shell/25 hover:border-shell/40"
        : "border-ink/20 hover:border-ink/35",
  );
}

/** Props a control must spread in order to be correctly wired to its `Field`. */
export type FieldBinding = {
  /** Value for the control's `aria-describedby`. */
  describedBy?: string;
  /** Value for the control's `aria-invalid`. */
  invalid: boolean;
};

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & FieldBinding;
export type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & FieldBinding;
export type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & FieldBinding;