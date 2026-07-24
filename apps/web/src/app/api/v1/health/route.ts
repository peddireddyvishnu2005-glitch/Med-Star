import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(
    {
      status: "UP",
      service: "MedStart API Gateway",
      version: "v1.0.0",
      timestamp: new Date().toISOString(),
      uptimeSeconds: process.uptime(),
      environment: process.env.NODE_ENV || "development",
    },
    { status: 200 }
  );
}
