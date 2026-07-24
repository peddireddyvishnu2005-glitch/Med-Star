import { NextRequest, NextResponse } from "next/server";
import { INITIAL_PATIENT_PROFILE } from "@/lib/mockData";
import { PatientProfile } from "@/types";

export const dynamic = 'force-dynamic';

let currentPatientProfile: PatientProfile = { ...INITIAL_PATIENT_PROFILE };

export async function GET(req: NextRequest) {
  return NextResponse.json({
    success: true,
    data: currentPatientProfile,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    currentPatientProfile = {
      ...currentPatientProfile,
      ...body,
      updatedAt: new Date().toISOString(),
    };
    return NextResponse.json({
      success: true,
      message: "Patient profile updated successfully",
      data: currentPatientProfile,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update profile" },
      { status: 400 }
    );
  }
}
