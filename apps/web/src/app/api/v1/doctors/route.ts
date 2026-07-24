import { NextRequest, NextResponse } from "next/server";
import { INITIAL_DOCTORS } from "@/lib/mockData";
import { Doctor } from "@/types";

export const dynamic = 'force-dynamic';

let doctorsList: Doctor[] = [...INITIAL_DOCTORS];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const specialty = searchParams.get("specialty");
  const hospitalId = searchParams.get("hospitalId");
  const search = searchParams.get("search");

  let filtered = doctorsList;

  if (specialty) {
    filtered = filtered.filter((d) => d.specialty.toLowerCase().includes(specialty.toLowerCase()) || d.department.toLowerCase().includes(specialty.toLowerCase()));
  }

  if (hospitalId) {
    filtered = filtered.filter((d) => d.hospitalId === hospitalId);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        d.department.toLowerCase().includes(q) ||
        (d.hospitalName && d.hospitalName.toLowerCase().includes(q))
    );
  }

  return NextResponse.json({
    success: true,
    count: filtered.length,
    data: filtered,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newDoctor: Doctor = {
      id: `doc-${Date.now()}`,
      hospitalId: body.hospitalId || "hosp-101",
      hospitalName: body.hospitalName || "Metropolis General Hospital",
      name: body.name,
      specialty: body.specialty,
      department: body.department || "Cardiology",
      qualifications: body.qualifications || ["MD"],
      experienceYears: Number(body.experienceYears || 5),
      languages: body.languages || ["English"],
      consultationFee: Number(body.consultationFee || 100),
      phone: body.phone || "+1 (555) 000-0000",
      email: body.email || "doctor@medstart.org",
      isVerified: true,
      availableDays: body.availableDays || ["Mon", "Wed", "Fri"],
      availabilities: body.availabilities || [],
      avatarUrl: body.avatarUrl || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
      rating: 5.0,
      reviewCount: 1,
      onlineStatus: "ONLINE",
      status: "ACTIVE",
    };

    doctorsList.push(newDoctor);

    return NextResponse.json(
      {
        success: true,
        message: "Doctor created and verified successfully",
        data: newDoctor,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create doctor profile" },
      { status: 400 }
    );
  }
}
