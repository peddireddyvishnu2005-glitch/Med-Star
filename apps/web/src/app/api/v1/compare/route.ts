import { NextRequest, NextResponse } from "next/server";
import { INITIAL_HOSPITALS, INITIAL_DOCTORS } from "@/lib/mockData";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const hospitalIdsParam = searchParams.get("hospitalIds");
  const doctorIdsParam = searchParams.get("doctorIds");

  let comparedHospitals = INITIAL_HOSPITALS;
  if (hospitalIdsParam) {
    const ids = hospitalIdsParam.split(",");
    comparedHospitals = INITIAL_HOSPITALS.filter((h) => ids.includes(h.id));
  }

  let comparedDoctors = INITIAL_DOCTORS;
  if (doctorIdsParam) {
    const ids = doctorIdsParam.split(",");
    comparedDoctors = INITIAL_DOCTORS.filter((d) => ids.includes(d.id));
  }

  return NextResponse.json({
    success: true,
    hospitals: comparedHospitals,
    doctors: comparedDoctors,
  });
}
