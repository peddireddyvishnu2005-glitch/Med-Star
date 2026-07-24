import { NextRequest, NextResponse } from "next/server";
import { INITIAL_APPOINTMENTS } from "@/lib/mockData";
import { Appointment } from "@/types";

export const dynamic = 'force-dynamic';

let appointmentsList: Appointment[] = [...INITIAL_APPOINTMENTS];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const patientId = searchParams.get("patientId");
  const doctorId = searchParams.get("doctorId");
  const status = searchParams.get("status");

  let filtered = appointmentsList;

  if (patientId) {
    filtered = filtered.filter((a) => a.patientId === patientId);
  }

  if (doctorId) {
    filtered = filtered.filter((a) => a.doctorId === doctorId);
  }

  if (status) {
    filtered = filtered.filter((a) => a.status === status);
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
    const newAppointment: Appointment = {
      id: `app-${Date.now()}`,
      patientId: body.patientId || "usr-demo",
      patientName: body.patientName || "Alexander Wright",
      patientPhone: body.patientPhone || "+1 (555) 987-6543",
      doctorId: body.doctorId,
      doctorName: body.doctorName,
      doctorSpecialty: body.doctorSpecialty || "General Physician",
      hospitalId: body.hospitalId,
      hospitalName: body.hospitalName,
      type: body.type || "IN_PERSON",
      date: body.date,
      timeSlot: body.timeSlot,
      status: "CONFIRMED",
      queueNumber: Math.floor(Math.random() * 5) + 1,
      notes: body.notes || "",
      consultationFee: body.consultationFee || 100,
      paymentStatus: "PAID",
      meetingLink: body.type === "VIDEO_CONSULTATION" ? `https://medstart.health/meet/app-${Date.now()}` : undefined,
      createdAt: new Date().toISOString(),
    };

    appointmentsList.unshift(newAppointment);

    return NextResponse.json(
      {
        success: true,
        message: "Appointment booked successfully",
        data: newAppointment,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to book appointment" },
      { status: 400 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, notes, date, timeSlot } = body;

    const index = appointmentsList.findIndex((a) => a.id === id);
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: "Appointment not found" },
        { status: 404 }
      );
    }

    appointmentsList[index] = {
      ...appointmentsList[index],
      ...(status && { status }),
      ...(notes && { notes }),
      ...(date && { date }),
      ...(timeSlot && { timeSlot }),
    };

    return NextResponse.json({
      success: true,
      message: "Appointment updated successfully",
      data: appointmentsList[index],
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update appointment" },
      { status: 400 }
    );
  }
}
