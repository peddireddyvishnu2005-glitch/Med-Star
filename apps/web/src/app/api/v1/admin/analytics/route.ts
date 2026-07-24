import { NextRequest, NextResponse } from "next/server";
import { INITIAL_ADMIN_ANALYTICS, INITIAL_AUDIT_LOGS } from "@/lib/mockData";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  return NextResponse.json({
    success: true,
    data: {
      analytics: INITIAL_ADMIN_ANALYTICS,
      auditLogs: INITIAL_AUDIT_LOGS,
    },
  });
}
