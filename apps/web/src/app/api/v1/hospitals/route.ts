import { NextRequest, NextResponse } from "next/server";
import { INITIAL_HOSPITALS } from "@/lib/mockData";
import { Hospital } from "@/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("search") || "";
  const city = searchParams.get("city") || "ALL";
  const department = searchParams.get("department") || "ALL";
  const emergencyOnly = searchParams.get("emergencyOnly") === "true";
  const minRating = parseFloat(searchParams.get("minRating") || "0");

  const filtered = INITIAL_HOSPITALS.filter((hosp) => {
    const matchesSearch =
      !search ||
      hosp.name.toLowerCase().includes(search.toLowerCase()) ||
      hosp.city.toLowerCase().includes(search.toLowerCase()) ||
      hosp.address.toLowerCase().includes(search.toLowerCase()) ||
      hosp.departments.some((d) =>
        d.toLowerCase().includes(search.toLowerCase())
      );

    const matchesCity = city === "ALL" || hosp.city === city;
    const matchesDept =
      department === "ALL" ||
      hosp.departments.some(
        (d) => d.toLowerCase() === department.toLowerCase()
      );
    const matchesEmergency = !emergencyOnly || hosp.hasEmergency;
    const matchesRating = hosp.rating >= minRating;

    return (
      matchesSearch &&
      matchesCity &&
      matchesDept &&
      matchesEmergency &&
      matchesRating
    );
  });

  return NextResponse.json(
    {
      success: true,
      total: filtered.length,
      data: filtered,
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.city) {
      return NextResponse.json(
        { success: false, error: "Hospital name and city are required." },
        { status: 400 }
      );
    }

    const newHospital: Hospital = {
      id: `hosp-${Date.now()}`,
      name: body.name,
      slug: body.name.toLowerCase().replace(/\s+/g, "-"),
      address: body.address || "100 Health Way",
      city: body.city,
      state: body.state || "NY",
      zip: body.zip || "10001",
      phone: body.phone || "+1 (555) 000-0000",
      emergencyPhone: body.emergencyPhone || "+1 (555) 911-0000",
      hasEmergency: body.hasEmergency ?? true,
      availableEmergencyBeds: body.availableEmergencyBeds || 10,
      totalEmergencyBeds: body.totalEmergencyBeds || 20,
      lat: body.lat || 40.7128,
      lng: body.lng || -74.006,
      rating: 5.0,
      reviewCount: 0,
      images: body.images || [
        "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80",
      ],
      departments: body.departments || ["Emergency & Trauma"],
      operatingHours: "24/7 Open",
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        message: "Hospital created successfully",
        data: newHospital,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid JSON payload" },
      { status: 400 }
    );
  }
}
