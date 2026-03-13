import { NextResponse } from "next/server";
import { addTodayIfNotExists, computeStudyStats, getStudyDates } from "@/lib/streakLogic";

export async function POST() {
  try {
    const result = await addTodayIfNotExists();
    const stats = computeStudyStats(result.dates);

    return NextResponse.json(
      {
        success: result.added,
        message: result.message,
        stats,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /api/study", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while saving today's study.",
      },
      { status: 500 }
    );
  }
}

