import Link from "next/link";
import { getStudyHistory } from "@/lib/streakLogic";
import { HistoryList } from "@/components/HistoryList";

export default async function HistoryPage() {
  const history = await getStudyHistory();

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-6 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
          Study History
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          All your study days
        </h1>
        <p className="max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          Newest study dates appear first. Keep the list growing by marking your
          progress every day.
        </p>
      </header>

      <HistoryList history={history} />

      <div className="mt-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
        >
          ← Back to dashboard
        </Link>
      </div>
    </main>
  );
}

