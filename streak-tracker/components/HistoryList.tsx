import { formatDisplayDate, StudyHistoryItem } from "@/lib/streakLogic";

type Props = {
  history: StudyHistoryItem[];
};

export function HistoryList({ history }: Props) {
  if (history.length === 0) {
    return (
      <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
        No study days recorded yet. Start your streak by marking today!
      </p>
    );
  }

  return (
    <ul className="mt-4 divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
      {history.map((item) => (
        <li
          key={item.date}
          className="flex items-center justify-between px-4 py-3 text-sm sm:px-6"
        >
          <span className="font-medium text-zinc-900 dark:text-zinc-50">
            {formatDisplayDate(item.date)}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {item.date}
          </span>
        </li>
      ))}
    </ul>
  );
}

