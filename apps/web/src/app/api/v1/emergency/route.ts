import { NextRequest, NextResponse } from "next/server";
import { INITIAL_EMERGENCIES, INITIAL_HOSPITALS } from "@/lib/mockData";
import { EmergencyRequest } from "@/types";

export const dynamic = 'force-dynamic';

let emergenciesList: EmergencyRequest[] = [...INITIAL_EMERGENCIES];

export async function GET(req: NextRequest) {
  return NextResponse.json({
    success: true,
    count: emergenciesList.length,
    data: emergenciesList,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const lat = body.lat || 40.7128;
    const lng = body.lng || -74.006;

    const nearestHospital = INITIAL_HOSPITALS.find((h) => h.hasEmergency) || INITIAL_HOSPITALS[0];

    const newEmergency: EmergencyRequest = {
      id: `emg-${Date.now()}`,
      userId: body.userId || "usr-demo",
      patientName: body.patientName || "Emergency Patient",
      phone: body.phone || "+1 (555) 911-0000",
      lat,
      lng,
      address: body.address || "Live GPS Location",
      severity: body.severity || "HIGH",
      symptoms: body.symptoms || ["Emergency Dispatch Request"],
      assignedHospitalId: nearestHospital.id,
      assignedHospitalName: nearestHospital.name,
      assignedAmbulanceId: `amb-${Math.floor(Math.random() * 90) + 10}`,
      ambulanceDriverName: "Paramedic Officer John Doe",
      ambulanceDriverPhone: "+1 (555) 911-0199",
      ambulanceLat: lat + 0.005,
      ambulanceLng: lng + 0.005,
      etaMins: Math.floor(Math.random() * 5) + 3,
      status: "DISPATCHED",
      createdAt: new Date().toISOString(),
    };

    emergenciesList.unshift(newEmergency);

    return NextResponse.json(
      {
        success: true,
        message: "Emergency SOS triggered! Ambulance dispatched.",
        data: newEmergency,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Emergency SOS dispatch failed" },
      { status: 400 }
    );
  }
}
