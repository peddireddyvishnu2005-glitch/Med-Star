import { NextRequest, NextResponse } from "next/server";
import { INITIAL_LAB_TESTS } from "@/lib/mockData";
import { LabBooking } from "@/types";

export const dynamic = 'force-dynamic';

let labBookings: LabBooking[] = [];

export async function GET(req: NextRequest) {
  return NextResponse.json({
    success: true,
    tests: INITIAL_LAB_TESTS,
    bookings: labBookings,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newBooking: LabBooking = {
      id: `lab-bk-${Date.now()}`,
      userId: body.userId || "usr-demo",
      userName: body.userName || "Alexander Wright",
      labTestId: body.labTestId,
      labTestName: body.labTestName,
      bookingDate: body.bookingDate || "2026-07-30",
      timeSlot: body.timeSlot || "08:00 AM",
      sampleCollectionType: body.sampleCollectionType || "HOME_COLLECTION",
      address: body.address || "350 5th Ave, New York, NY",
      price: Number(body.price || 75),
      status: "BOOKED",
      createdAt: new Date().toISOString(),
    };

    labBookings.unshift(newBooking);

    return NextResponse.json(
      {
        success: true,
        message: "Lab test booked successfully",
        data: newBooking,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to book lab test" },
      { status: 400 }
    );
  }
}
