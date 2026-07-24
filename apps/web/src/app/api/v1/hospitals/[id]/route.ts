import { NextRequest, NextResponse } from "next/server";
import { INITIAL_HOSPITALS, INITIAL_DOCTORS, INITIAL_REVIEWS } from "@/lib/mockData";

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const hospital = INITIAL_HOSPITALS.find((h) => h.id === id || h.slug === id);

  if (!hospital) {
    return NextResponse.json(
      { success: false, error: "Hospital not found" },
      { status: 404 }
    );
  }

  const doctors = INITIAL_DOCTORS.filter((d) => d.hospitalId === hospital.id);
  const reviews = INITIAL_REVIEWS.filter((r) => r.hospitalId === hospital.id);

  return NextResponse.json(
    {
      success: true,
      data: {
        ...hospital,
        doctorRoster: doctors,
        patientReviews: reviews,
      },
    },
    { status: 200 }
  );
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const hospital = INITIAL_HOSPITALS.find((h) => h.id === id || h.slug === id);

  if (!hospital) {
    return NextResponse.json(
      { success: false, error: "Hospital not found" },
      { status: 404 }
    );
  }

  try {
    const body = await request.json();
    const updated = {
      ...hospital,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        message: "Hospital record updated successfully",
        data: updated,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid update payload" },
      { status: 400 }
    );
  }
}
