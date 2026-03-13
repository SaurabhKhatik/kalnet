import Link from "next/link";
import { getStudyStats } from "@/lib/streakLogic";
import { StreakCard } from "@/components/StreakCard";
import { StudyButton } from "@/components/StudyButton";

export default async function Home() {
  const stats = await getStudyStats();

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
          Kalnet Daily Learning Streak
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Welcome, Student 👋
        </h1>
        <p className="max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          Mark your study every day and keep your streak alive. This simple
          tracker helps you stay consistent with your learning habit.
        </p>
      </header>

      <div className="space-y-8">
        <StreakCard stats={stats} />
        <StudyButton initialStats={stats} />

        <section className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
          <p>
            Want to see all the days you have studied?{" "}
            <Link
              href="/history"
              className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
            >
              View your study history →
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

