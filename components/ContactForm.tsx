"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle, FileWarning } from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | "">("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    setLoading(true);
    setStatus("");
    setMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send message.");
      }

      setStatus("success");
      setMessage("Your message has been sent successfully! I will get back to you soon.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      action="/api/send-email"
      method="POST"
      onSubmit={handleSubmit}
      className="border border-gray-200 bg-gray-50/70 p-6 dark:border-zinc-800 dark:bg-zinc-900/30 sm:p-8"
    >
      {/* Form configuration */}
      <input
        type="hidden"
        name="_subject"
        value="New message from your portfolio"
      />

      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />

      {/* Honeypot spam protection */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {/* NAME & EMAIL */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-2 block text-sm font-medium text-gray-800 dark:text-zinc-200"
          >
            Your name <span className="text-blue-700">*</span>
          </label>

          <input
            id="contact-name"
            type="text"
            name="name"
            placeholder="John Doe"
            autoComplete="name"
            required
            maxLength={100}
            className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:border-blue-400 dark:focus:ring-blue-400"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="mb-2 block text-sm font-medium text-gray-800 dark:text-zinc-200"
          >
            Email address <span className="text-blue-700">*</span>
          </label>

          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder="john@example.com"
            autoComplete="email"
            required
            maxLength={254}
            className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:border-blue-400 dark:focus:ring-blue-400"
          />
        </div>
      </div>

      {/* SUBJECT */}
      <div className="mt-6">
        <label
          htmlFor="contact-subject"
          className="mb-2 block text-sm font-medium text-gray-800 dark:text-zinc-200"
        >
          Subject <span className="text-blue-700">*</span>
        </label>

        <input
          id="contact-subject"
          type="text"
          name="subject"
          placeholder="What would you like to discuss?"
          required
          maxLength={150}
          className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:border-blue-400 dark:focus:ring-blue-400"
        />
      </div>

      {/* MESSAGE */}
      <div className="mt-6">
        <label
          htmlFor="contact-message"
          className="mb-2 block text-sm font-medium text-gray-800 dark:text-zinc-200"
        >
          Your message <span className="text-blue-700">*</span>
        </label>

        <textarea
          id="contact-message"
          name="message"
          rows={6}
          placeholder="Tell me about your idea, project, or anything you'd like to discuss..."
          required
          minLength={10}
          maxLength={5000}
          className="w-full resize-y border border-gray-200 bg-white px-4 py-3 text-sm leading-6 text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:border-blue-400 dark:focus:ring-blue-400"
        />
      </div>

      {/* SUBMIT */}
      <div className="mt-8 flex flex-col gap-5 border-t border-gray-200 pt-6 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xs">
         {!status &&  <p className="text-xs leading-5 text-gray-500 dark:text-zinc-500">
            Your message will be sent directly to my email. I&apos;ll get back
            to you as soon as possible.
          </p>
}
          {/* Response feedback */}
          {status && (
            <p
              role="status"
              aria-live="polite"
              className={`mt-3 text-sm flex gap-2 ${
                status === "success"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {status === "success" ? (
                <CheckCircle size={18} />
              ) : (
                <FileWarning size={18} />
              )}
              {message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group inline-flex shrink-0 items-center justify-center gap-3 bg-blue-800 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          {loading ? "Sending..." : "Send message"}

          {!loading && (
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          )}
        </button>
      </div>
    </form>
  );
}
