"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Field, controlClass } from "@/components/ui/Field";
import { Reveal } from "@/components/ui/Reveal";
import { todayISODate } from "@/lib/utils";
import type {
  ReservationErrors,
  ReservationFieldName,
  ReservationValues,
} from "@/types";

const EMPTY: ReservationValues = {
  name: "",
  phone: "",
  partySize: "",
  date: "",
  time: "",
  message: "",
};

/**
 * Validation.
 *
 * Each rule below exists because the demo must not imply a working booking
 * pipeline. There is no backend, so the form's whole job is to be honest:
 * validate locally, then say plainly that nothing was sent.
 */
function validate(values: ReservationValues): ReservationErrors {
  const errors: ReservationErrors = {};

  if (!values.name.trim()) {
    errors.name = "Indiquez votre nom.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Ce nom semble trop court.";
  }

  /* Accepts spaces, dots, dashes and an optional +212 / 00212 prefix. */
  const digits = values.phone.replace(/[^\d]/g, "");
  if (!values.phone.trim()) {
    errors.phone = "Indiquez un numéro de téléphone.";
  } else if (digits.length < 8) {
    errors.phone = "Ce numéro semble incomplet.";
  }

  const party = Number(values.partySize);
  if (!values.partySize) {
    errors.partySize = "Indiquez le nombre de personnes.";
  } else if (!Number.isInteger(party) || party < 1 || party > 20) {
    errors.partySize = "Indiquez un nombre entre 1 et 20.";
  }

  if (!values.date) {
    errors.date = "Choisissez une date.";
  } else if (values.date < todayISODate()) {
    errors.date = "Choisissez une date à venir.";
  }

  if (!values.time) {
    errors.time = "Choisissez une heure.";
  }

  return errors;
}

const TIME_SLOTS = [
  "12:00", "12:30", "13:00", "13:30", "14:00",
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00",
];

export function Reservation() {
  const formId = useId();
  const reduceMotion = useReducedMotion();
  const [values, setValues] = useState<ReservationValues>(EMPTY);
  const [errors, setErrors] = useState<ReservationErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);

  const set = (name: ReservationFieldName) => (value: string) => {
    const next = { ...values, [name]: value };
    setValues(next);
    /* Only re-validate a field the user has already left, so errors do not
       appear while they are still typing the first character. */
    if (touched) setErrors(validate(next));
    if (submitted) setSubmitted(false);
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched(true);

    /* Focus the first invalid control so keyboard and screen-reader users land
       on the problem instead of having to hunt for it. */
    const firstInvalid = (Object.keys(nextErrors) as ReservationFieldName[])[0];
    if (firstInvalid) {
      document.getElementById(`${formId}-${firstInvalid}`)?.focus();
      return;
    }

    /* No request is made anywhere. This is deliberate and disclosed in the UI. */
    setSubmitted(true);
  }

  const fieldId = (name: ReservationFieldName) => `${formId}-${name}`;

  return (
    <section
      id="reservation"
      aria-labelledby="reservation-title"
      className="on-dark bg-wine-deep text-shell"
    >
      <div className="gutter py-section">
        <div className="mx-auto max-w-[52rem]">
          <SectionHeading
            id="reservation-title"
            eyebrow="Réservation"
            tone="light"
            align="center"
            title={
              <>
                Réserver
                <br />
                <span className="italic text-saffron">une table</span>
              </>
            }
            subtitle="Pour les demandes de groupe ou les informations pratiques, écrivez-nous directement sur Instagram."
          />

          {submitted ? (
            <Reveal className="mt-14">
              <div
                role="status"
                className="border border-shell/20 bg-shell/5 p-9 text-center"
              >
                <Check
                  size={26}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="mx-auto text-saffron"
                />
                <p className="mt-5 font-display text-subsection leading-tight text-shell">
                  Merci, {values.name.trim().split(" ")[0]}.
                </p>
                <p className="mx-auto mt-4 max-w-[46ch] text-body leading-relaxed text-shell/70">
                  Démo : aucune réservation n&apos;a été transmise au
                  restaurant.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setValues(EMPTY);
                    setSubmitted(false);
                    setTouched(false);
                  }}
                  className="mt-7 inline-flex min-h-11 items-center font-sans text-ui font-semibold uppercase tracking-[0.14em] text-saffron underline underline-offset-4 transition-colors hover:text-shell"
                >
                  Modifier la demande
                </button>
              </div>
            </Reveal>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-14">
              {/* Names, so a screen reader announces what the field is for. */}
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Nom" name={fieldId("name")} error={errors.name}>
                  {({ describedBy, invalid }) => (
                    <input
                      id={fieldId("name")}
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={(e) => set("name")(e.target.value)}
                      aria-describedby={describedBy}
                      aria-invalid={invalid}
                      className={controlClass(invalid, true)}
                    />
                  )}
                </Field>

                <Field label="Téléphone" name={fieldId("phone")} error={errors.phone}>
                  {({ describedBy, invalid }) => (
                    <input
                      id={fieldId("phone")}
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+212 6 ..."
                      value={values.phone}
                      onChange={(e) => set("phone")(e.target.value)}
                      aria-describedby={describedBy}
                      aria-invalid={invalid}
                      className={controlClass(invalid, true)}
                    />
                  )}
                </Field>

                <Field
                  label="Personnes"
                  name={fieldId("partySize")}
                  error={errors.partySize}
                >
                  {({ describedBy, invalid }) => (
                    <select
                      id={fieldId("partySize")}
                      name="partySize"
                      value={values.partySize}
                      onChange={(e) => set("partySize")(e.target.value)}
                      aria-describedby={describedBy}
                      aria-invalid={invalid}
                      className={controlClass(invalid, true)}
                    >
                      <option value="">Choisir</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "personne" : "personnes"}
                        </option>
                      ))}
                    </select>
                  )}
                </Field>

                <Field label="Date" name={fieldId("date")} error={errors.date}>
                  {({ describedBy, invalid }) => (
                    <input
                      id={fieldId("date")}
                      name="date"
                      type="date"
                      value={values.date}
                      min={todayISODate()}
                      onChange={(e) => set("date")(e.target.value)}
                      aria-describedby={describedBy}
                      aria-invalid={invalid}
                      className={controlClass(invalid, true)}
                    />
                  )}
                </Field>

                <Field label="Heure" name={fieldId("time")} error={errors.time}>
                  {({ describedBy, invalid }) => (
                    <select
                      id={fieldId("time")}
                      name="time"
                      value={values.time}
                      onChange={(e) => set("time")(e.target.value)}
                      aria-describedby={describedBy}
                      aria-invalid={invalid}
                      className={controlClass(invalid, true)}
                    >
                      <option value="">Choisir</option>
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  )}
                </Field>
              </div>

              <Field
                label="Message (facultatif)"
                name={fieldId("message")}
                className="mt-6"
                hint="Allergie, occasion spéciale, accessibilité…"
              >
                {({ describedBy }) => (
                  <textarea
                    id={fieldId("message")}
                    name="message"
                    rows={4}
                    value={values.message}
                    onChange={(e) => set("message")(e.target.value)}
                    aria-describedby={describedBy}
                    className={controlClass(false, true)}
                  />
                )}
              </Field>

              <div className="mt-9 flex flex-col items-center gap-5">
                <button
                  type="submit"
                  className="inline-flex min-h-13 w-full items-center justify-center bg-shell px-8 py-4 font-sans text-ui font-semibold uppercase tracking-[0.14em] text-wine transition-colors duration-300 hover:bg-saffron sm:w-auto"
                >
                  Envoyer la demande
                </button>

                <p className="max-w-[48ch] text-center font-sans text-ui leading-relaxed text-shell/55">
                  Démo : aucune réservation n&apos;a été transmise au
                  restaurant.
                </p>
              </div>
            </form>
          )}

          {/* Summary of what the visitor entered, so the demo feels complete. */}
          <AnimatePresence>
            {touched && Object.keys(errors).length === 0 && !submitted ? (
              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="status"
                className="mt-6 text-center font-sans text-ui text-shell/55"
              >
                Le formulaire est prêt — il ne sera pas envoyé.
              </motion.p>
            ) : null}
          </AnimatePresence>

          {siteConfig.demoMode ? (
            <p className="mt-10 text-center font-sans text-ui text-shell/40">
              Formule de démonstration — aucune donnée n&apos;est stockée ni
              envoyée.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}