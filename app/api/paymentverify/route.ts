import Razorpay from "razorpay";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongoose";
import { createPayment } from "@/lib/actions/plan.actions";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const {
      userId,
      razorpay_subscription_id,
      razorpay_payment_id,
      razorpay_signature
    } = await req.json();

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(razorpay_payment_id + "|" + razorpay_subscription_id, "utf-8")
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      const newPayment = await createPayment({
        userId,
        razorpayId: razorpay_payment_id,
        razorpaySubscriptionId: razorpay_subscription_id
      });

      return NextResponse.json({ message: "success", payment: newPayment }, { status: 200 });
    } else {
      return NextResponse.json({ message: "failed" }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
