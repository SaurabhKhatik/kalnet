import { NextResponse } from "next/server";
import { getStudyStats } from "@/lib/streakLogic";

export async function GET() {
  try {
    const stats = await getStudyStats();
    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/streak", error);
    return NextResponse.json(
      {
        currentStreak: 0,
        totalDays: 0,
        lastStudyDate: null,
      },
      { status: 500 }
    );
  }
}

