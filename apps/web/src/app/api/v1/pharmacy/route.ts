import { NextRequest, NextResponse } from "next/server";
import { INITIAL_MEDICINES } from "@/lib/mockData";
import { PharmacyOrder } from "@/types";

export const dynamic = 'force-dynamic';

let orders: PharmacyOrder[] = [];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("query")?.toLowerCase();

  let meds = INITIAL_MEDICINES;
  if (q) {
    meds = meds.filter((m) => m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q));
  }

  return NextResponse.json({
    success: true,
    count: meds.length,
    data: meds,
    ordersCount: orders.length,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newOrder: PharmacyOrder = {
      id: `ord-${Date.now()}`,
      userId: body.userId || "usr-demo",
      userName: body.userName || "Alexander Wright",
      shippingAddress: body.shippingAddress || "350 5th Ave, New York, NY",
      items: body.items || [],
      totalAmount: body.totalAmount || 0,
      prescriptionUrl: body.prescriptionUrl,
      status: "PLACED",
      createdAt: new Date().toISOString(),
    };

    orders.unshift(newOrder);

    return NextResponse.json(
      {
        success: true,
        message: "Pharmacy order placed successfully",
        data: newOrder,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to place pharmacy order" },
      { status: 400 }
    );
  }
}
