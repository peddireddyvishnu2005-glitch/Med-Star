import { NextRequest, NextResponse } from "next/server";
import { generateRouteGeometry } from "@/lib/geoUtils";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const startLat = parseFloat(searchParams.get("startLat") || "40.7128");
  const startLng = parseFloat(searchParams.get("startLng") || "-74.006");
  const destLat = parseFloat(searchParams.get("destLat") || "40.7306");
  const destLng = parseFloat(searchParams.get("destLng") || "-73.9352");

  if (isNaN(startLat) || isNaN(startLng) || isNaN(destLat) || isNaN(destLng)) {
    return NextResponse.json(
      { success: false, error: "Valid startLat, startLng, destLat, destLng query params required." },
      { status: 400 }
    );
  }

  const routeInfo = generateRouteGeometry(startLat, startLng, destLat, destLng);

  return NextResponse.json(
    {
      success: true,
      data: routeInfo,
    },
    { status: 200 }
  );
}
