import fs from "fs/promises";
import path from "path";

export type StudyStats = {
  currentStreak: number;
  totalDays: number;
  lastStudyDate: string | null;
};

export type StudyHistoryItem = {
  date: string; // YYYY-MM-DD
};

const DATA_DIR = "data";
const DATA_FILE = "study-data.json";

function getDataFilePath() {
  return path.join(process.cwd(), DATA_DIR, DATA_FILE);
}

async function ensureDataFile() {
  const filePath = getDataFilePath();
  const dir = path.dirname(filePath);

  await fs.mkdir(dir, { recursive: true });

  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, JSON.stringify({ dates: [] }), "utf8");
  }
}

export async function getStudyDates(): Promise<string[]> {
  await ensureDataFile();
  const filePath = getDataFilePath();
  const raw = await fs.readFile(filePath, "utf8");

  try {
    const parsed = JSON.parse(raw) as { dates?: string[] };
    const dates = Array.isArray(parsed.dates) ? parsed.dates : [];
    // Deduplicate and sort ascending
    return Array.from(new Set(dates)).sort();
  } catch {
    return [];
  }
}

export async function saveStudyDates(dates: string[]): Promise<void> {
  await ensureDataFile();
  const filePath = getDataFilePath();
  // Deduplicate and sort ascending before saving
  const unique = Array.from(new Set(dates)).sort();
  await fs.writeFile(filePath, JSON.stringify({ dates: unique }, null, 2), "utf8");
}

export function getTodayString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function diffInDays(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  const da = new Date(ay, am - 1, ad);
  const db = new Date(by, bm - 1, bd);
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((db.getTime() - da.getTime()) / msPerDay);
}

export function computeStudyStats(dates: string[]): StudyStats {
  if (dates.length === 0) {
    return {
      currentStreak: 0,
      totalDays: 0,
      lastStudyDate: null,
    };
  }

  const sorted = Array.from(new Set(dates)).sort();
  const totalDays = sorted.length;
  const lastStudyDate = sorted[sorted.length - 1];

  let currentStreak = 1;
  for (let i = sorted.length - 2; i >= 0; i--) {
    const prev = sorted[i];
    const next = sorted[i + 1];
    if (diffInDays(prev, next) === 1) {
      currentStreak += 1;
    } else {
      break;
    }
  }

  return {
    currentStreak,
    totalDays,
    lastStudyDate,
  };
}

export function formatDisplayDate(date: string | null): string {
  if (!date) return "No study yet";
  const [year, month, day] = date.split("-").map(Number);
  const dt = new Date(year, month - 1, day);
  return dt.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function addTodayIfNotExists() {
  const today = getTodayString();
  const dates = await getStudyDates();

  if (dates.includes(today)) {
    return {
      added: false,
      message: "You have already marked today.",
      dates,
    };
  }

  const updated = [...dates, today];
  await saveStudyDates(updated);

  return {
    added: true,
    message: "Great job! Today's study has been recorded.",
    dates: updated,
  };
}

export async function getStudyStats(): Promise<StudyStats> {
  const dates = await getStudyDates();
  return computeStudyStats(dates);
}

export async function getStudyHistory(): Promise<StudyHistoryItem[]> {
  const dates = await getStudyDates();
  // newest first
  const sortedDesc = [...dates].sort().reverse();
  return sortedDesc.map((d) => ({ date: d }));
}

