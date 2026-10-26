"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";

type Status = "idle" | "sending" | "sent" | "error";

type ContactFormProps = {
  email: string;
  topics: string[];
  endpoint: string;
};

const field =
  "w-full rounded-md bg-bg px-3 py-2.5 text-ink ring-1 ring-line outline-none transition-[box-shadow,background-color] duration-150 placeholder:text-faint hover:ring-[color-mix(in_srgb,var(--ink)_18%,transparent)] focus:ring-2 focus:ring-ink aria-invalid:ring-[#ff453a]";

export function ContactForm({ email, topics, endpoint }: ContactFormProps) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      topic: String(data.get("topic") ?? ""),
      message: String(data.get("message") ?? "").trim(),
    };
    const errors = {
      name: !values.name,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email),
      message: values.message.length < 10,
    };
    setInvalid(errors);
    if (Object.values(errors).some(Boolean)) {
      form.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
      return;
    }

    if (!endpoint) {
      const subject = encodeURIComponent(`${values.topic} from ${values.name}`);
      const body = encodeURIComponent(`${values.message}\n\n${values.name}\n${values.email}`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const label = (name: string, text: string) => (
    <label htmlFor={`${id}-${name}`} className="mb-1.5 block text-meta text-muted">
      {text} <span aria-hidden="true">*</span>
    </label>
  );

  return (
    <form noValidate onSubmit={submit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          {label("name", "Name")}
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            placeholder="Jane Doe"
            aria-invalid={invalid.name || undefined}
            required
            className={field}
          />
        </div>
        <div>
          {label("email", "Email")}
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            aria-invalid={invalid.email || undefined}
            required
            className={field}
          />
        </div>
      </div>
      <div>
        {label("topic", "Topic")}
        <span className="relative block">
          <select id={`${id}-topic`} name="topic" defaultValue={topics[0]} className={`${field} appearance-none pr-9`}>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </div>
      <div>
        {label("message", "Message")}
        <textarea
          id={`${id}-message`}
          name="message"
          rows={6}
          placeholder="Tell me a little about your idea, project or question"
          aria-invalid={invalid.message || undefined}
          aria-describedby={`${id}-hint`}
          required
          className={`${field} resize-y`}
        />
        <p id={`${id}-hint`} className="mt-1.5 text-meta text-muted">
          {invalid.message
            ? "A few more words, please. At least ten characters."
            : endpoint
              ? "Sent straight to my inbox."
              : "Opens your mail app with everything filled in."}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="moving-border group relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-bg shadow-lift transition-[transform,opacity] duration-200 ease-snap active:scale-[0.97] disabled:opacity-60"
        >
          {status === "sent" ? <CheckIcon className="size-4" /> : null}
          {status === "sending" ? "Sending" : status === "sent" ? "Sent, thank you" : "Send message"}
          {status === "idle" || status === "error" ? (
            <ArrowRightIcon className="size-4 transition-transform duration-200 ease-snap group-hover:translate-x-0.5" />
          ) : null}
        </button>
        <p role="status" className="text-meta text-muted">
          {status === "error" ? `Something went wrong. Write to ${email} instead.` : ""}
        </p>
      </div>
    </form>
  );
}
