"use client";

import { useId, useState, type FormEvent } from "react";
import {
  BUDGETS,
  MESSAGE_MAX,
  PROJECT_TYPES,
  TIMELINES,
  composeBrief,
  validateBrief,
  type BriefErrors,
  type BriefInput,
} from "@/lib/brief";
import { emailLink } from "@/lib/site";

type Status = { kind: "idle" } | { kind: "sent" } | { kind: "invalid"; count: number };

// Choice fields start unanswered; validation rejects the empty string with a readable message.
interface FormValues {
  name: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

const EMPTY: FormValues = { name: "", company: "", projectType: "", budget: "", timeline: "", message: "" };
const ERROR_TEXT = "text-[#A3341F]";

interface ChoiceProps {
  name: keyof FormValues;
  legend: string;
  options: readonly string[];
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

const Choice = ({ name, legend, options, value, error, onChange }: ChoiceProps) => {
  const errorId = `${name}-error`;
  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="text-[15px] font-semibold">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="peer sr-only"
            />
            <span className="inline-flex min-h-[40px] items-center rounded border border-line bg-surface px-4 text-[15px] transition-colors duration-150 hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:ring-2 peer-focus-visible:ring-brand peer-focus-visible:ring-offset-2">
              {option}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} className={`mt-2 text-sm ${ERROR_TEXT}`}>
          {error}
        </p>
      )}
    </fieldset>
  );
};

export const BriefForm = () => {
  const id = useId();
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<BriefErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const set = (field: keyof FormValues) => (value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const { [field]: _cleared, ...rest } = current;
      return rest;
    });
  };

  const send = () => {
    // The schema narrows the free strings to the allowed options.
    const result = validateBrief(values as BriefInput);
    if (!result.ok) {
      setErrors(result.errors);
      setStatus({ kind: "invalid", count: Object.keys(result.errors).length });
      const first = Object.keys(result.errors)[0];
      document.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const text = composeBrief(result.brief);
    window.location.href = emailLink(text, `Project brief: ${result.brief.projectType}`);
    setStatus({ kind: "sent" });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    send();
  };

  const textField = (name: "name" | "company", label: string, autoComplete: string, maxLength: number, optional = false) => {
    const inputId = `${id}-${name}`;
    const error = errors[name];
    return (
      <div>
        <label htmlFor={inputId} className="text-[15px] font-semibold">
          {label} {optional && <span className="font-normal text-muted">(optional)</span>}
        </label>
        <input
          id={inputId}
          name={name}
          autoComplete={autoComplete}
          value={values[name]}
          onChange={(e) => set(name)(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          maxLength={maxLength}
          className="mt-2 block min-h-[48px] w-full rounded border border-line bg-surface px-4 text-base outline-none transition-colors duration-150 hover:border-muted focus:border-ink aria-[invalid=true]:border-[#A3341F]"
        />
        {error && (
          <p id={`${inputId}-error`} className={`mt-2 text-sm ${ERROR_TEXT}`}>
            {error}
          </p>
        )}
      </div>
    );
  };

  const messageId = `${id}-message`;
  const remaining = MESSAGE_MAX - values.message.length;

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-8" aria-label="Project brief">
      <div className="grid gap-6 sm:grid-cols-2">
        {textField("name", "Your name", "name", 80)}
        {textField("company", "Company", "organization", 120, true)}
      </div>
      <Choice name="projectType" legend="What do you need built?" options={PROJECT_TYPES} value={values.projectType} error={errors.projectType} onChange={set("projectType")} />
      <Choice name="budget" legend="Budget range" options={BUDGETS} value={values.budget} error={errors.budget} onChange={set("budget")} />
      <Choice name="timeline" legend="Timeline" options={TIMELINES} value={values.timeline} error={errors.timeline} onChange={set("timeline")} />
      <div>
        <label htmlFor={messageId} className="text-[15px] font-semibold">
          Tell us about the project
        </label>
        <p id={`${messageId}-hint`} className="mt-1 text-sm text-muted">
          How does the work run today, and what should be different?
        </p>
        <textarea
          id={messageId}
          name="message"
          rows={6}
          maxLength={MESSAGE_MAX}
          value={values.message}
          onChange={(e) => set("message")(e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={`${messageId}-hint ${messageId}-count${errors.message ? ` ${messageId}-error` : ""}`}
          className="mt-2 block w-full rounded border border-line bg-surface px-4 py-3 text-base leading-relaxed outline-none transition-colors duration-150 hover:border-muted focus:border-ink aria-[invalid=true]:border-[#A3341F]"
        />
        <div className="mt-2 flex justify-between gap-4 text-sm">
          <span>
            {errors.message && (
              <span id={`${messageId}-error`} className={ERROR_TEXT}>
                {errors.message}
              </span>
            )}
          </span>
          <span id={`${messageId}-count`} className={`tabular ${remaining < 100 ? "text-ink" : "text-muted"}`}>
            {remaining} characters left
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-line pt-8 sm:flex-row">
        <button type="submit" className="btn-primary">
          Send brief by email
        </button>
      </div>

      <div aria-live="polite" className="text-[15px]">
        {status.kind === "invalid" && (
          <p className={ERROR_TEXT}>
            {status.count === 1 ? "One answer needs" : `${status.count} answers need`} attention before we can send the brief.
          </p>
        )}
        {status.kind === "sent" && (
          <p className="rounded border border-brand/30 bg-brand-soft px-4 py-3 text-brand-ink">
            Your brief is ready in your email app. Press send there and we&rsquo;ll reply within one working day. If nothing opened, use the email address on this page.
          </p>
        )}
      </div>
    </form>
  );
};
