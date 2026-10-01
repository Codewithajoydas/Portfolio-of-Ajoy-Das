import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

export const runtime = "nodejs";

const analytics = new BetaAnalyticsDataClient();

export async function GET() {
  try {
    const propertyId = process.env.GA_PROPERTY_ID;

    if (!propertyId) {
      throw new Error("GA_PROPERTY_ID is missing");
    }

    const [response] = await analytics.runReport({
      property: `properties/${propertyId}`,

      dateRanges: [
        {
          startDate: "30daysAgo",
          endDate: "today",
        },
      ],

      metrics: [
        { name: "activeUsers" },
        { name: "screenPageViews" },
        { name: "sessions" },
      ],
    });

    const values = response.rows?.[0]?.metricValues;

    return NextResponse.json({
      visitors: Number(values?.[0]?.value ?? 0),
      pageViews: Number(values?.[1]?.value ?? 0),
      sessions: Number(values?.[2]?.value ?? 0),
    });
  } catch (error) {
    console.error("Analytics Error:", error);

    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}