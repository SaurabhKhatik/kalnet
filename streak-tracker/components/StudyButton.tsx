"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { StudyStats } from "@/lib/streakLogic";

type Props = {
  initialStats: StudyStats;
};

type StudyResponse = {
  success: boolean;
  message: string;
  stats?: StudyStats;
};

export function StudyButton({ initialStats }: Props) {
  const [message, setMessage] = useState<string | null>(null);
  const [stats, setStats] = useState<StudyStats>(initialStats);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleClick() {
    setMessage(null);
    try {
      const res = await fetch("/api/study", {
        method: "POST",
      });

      const data: StudyResponse = await res.json();
      setMessage(data.message);
      if (data.stats) {
        setStats(data.stats);
      }

      // Refresh server components so other places (like history page) stay in sync
      startTransition(() => {
        router.refresh();
      });
    } catch {
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="mt-6 w-full space-y-4">
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className="inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isPending ? "Saving..." : "I Studied Today"}
      </button>

      {message && (
        <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
          {message}
        </p>
      )}
    </section>
  );
}

