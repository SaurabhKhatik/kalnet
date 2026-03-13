import { NextResponse } from "next/server";
import { getStudyHistory, formatDisplayDate } from "@/lib/streakLogic";

export async function GET() {
  try {
    const history = await getStudyHistory();
    return NextResponse.json(
      history.map((item) => ({
        rawDate: item.date,
        displayDate: formatDisplayDate(item.date),
      })),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/history", error);
    return NextResponse.json([], { status: 500 });
  }
}

