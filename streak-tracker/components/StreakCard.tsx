import { formatDisplayDate, StudyStats } from "@/lib/streakLogic";

type Props = {
  stats: StudyStats;
};

export function StreakCard({ stats }: Props) {
  return (
    <section className="w-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        Daily Learning Streak
      </h2>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Stay consistent by marking your study every day.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-zinc-50 p-4 text-center dark:bg-zinc-800/60">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Current Streak
          </p>
          <p className="mt-2 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {stats.currentStreak}{" "}
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              day{stats.currentStreak === 1 ? "" : "s"}
            </span>
          </p>
        </div>

        <div className="rounded-xl bg-zinc-50 p-4 text-center dark:bg-zinc-800/60">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Total Study Days
          </p>
          <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            {stats.totalDays}
          </p>
        </div>

        <div className="rounded-xl bg-zinc-50 p-4 text-center dark:bg-zinc-800/60">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Last Studied
          </p>
          <p className="mt-2 text-sm font-medium text-zinc-900 dark:text-zinc-50">
            {formatDisplayDate(stats.lastStudyDate)}
          </p>
        </div>
      </div>
    </section>
  );
}

