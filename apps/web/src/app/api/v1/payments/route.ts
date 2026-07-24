import { NextRequest, NextResponse } from "next/server";
import { PaymentTransaction } from "@/types";

export const dynamic = 'force-dynamic';

let transactions: PaymentTransaction[] = [
  {
    id: "txn-9001",
    userId: "usr-demo",
    userName: "Alexander Wright",
    amount: 150,
    currency: "USD",
    paymentMethod: "RAZORPAY",
    purpose: "APPOINTMENT",
    referenceId: "app-501",
    status: "SUCCESS",
    transactionDate: "2026-07-20T11:05:00Z",
  },
];

export async function GET(req: NextRequest) {
  return NextResponse.json({
    success: true,
    count: transactions.length,
    data: transactions,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newTxn: PaymentTransaction = {
      id: `txn-${Date.now()}`,
      userId: body.userId || "usr-demo",
      userName: body.userName || "Alexander Wright",
      amount: Number(body.amount || 100),
      currency: body.currency || "USD",
      paymentMethod: body.paymentMethod || "UPI",
      purpose: body.purpose || "APPOINTMENT",
      referenceId: body.referenceId || `ref-${Date.now()}`,
      status: "SUCCESS",
      transactionDate: new Date().toISOString(),
    };

    transactions.unshift(newTxn);

    return NextResponse.json(
      {
        success: true,
        message: "Payment processed successfully",
        data: newTxn,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Payment processing failed" },
      { status: 400 }
    );
  }
}
