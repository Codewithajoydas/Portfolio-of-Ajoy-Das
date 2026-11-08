"use client";

import Image from "next/image";
import { useState } from "react";
import { Clock, MessageSquareWarning } from "lucide-react";

export default function SpinnerBars() {
  const [showComplaint, setShowComplaint] = useState(false);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-gray-900 transition-colors duration-300 dark:bg-[#09090b] dark:text-white">

      {/* Loading Animation */}
      <div className="relative flex flex-col items-center gap-5">

        <div className="relative h-24 w-24">
          <Image
            src="/loading.gif"
            alt="Loading animation"
            fill
            priority
            unoptimized
            sizes="96px"
            className="object-contain"
          />
        </div>

        {/* Loading Text */}
        <div className="space-y-2 text-center">
          <h2 className="text-lg font-bold tracking-tight">
            Something great is loading...
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Please wait while we prepare everything for you.
          </p>
        </div>

        {/* Loading Indicator */}
        <div className="h-1 w-40 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
          <div className="h-full w-1/2 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-black dark:bg-white" />
        </div>

        {/* Complaint Option */}
        <button
          type="button"
          onClick={() => setShowComplaint(!showComplaint)}
          className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        >
          <MessageSquareWarning size={15} />
          Having trouble with loading?
        </button>

        {showComplaint && (
          <div className="max-w-xs rounded-xl border border-gray-200 bg-gray-50 p-4 text-center dark:border-gray-800 dark:bg-gray-900">
            <Clock size={20} className="mx-auto mb-2" />

            <p className="text-sm font-semibold">
              Taking longer than expected?
            </p>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Please check your internet connection or try refreshing the page.
            </p>

            <a
              href="/contact?subject=Loading%20Issue"
              className="mt-3 inline-block text-xs font-semibold underline underline-offset-4"
            >
              Raise a complaint
            </a>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  );
}