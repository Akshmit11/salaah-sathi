import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {

  let plan_id = process.env.NEXT_PUBLIC_RAZORPAY_EXPERT_PLAN_ID!;
  // Check if plan_id is set
  if (!plan_id) {
    return NextResponse.json({ error: "Plan ID is not set in environment variables" }, { status: 500 });
  }
  
  try {
    const subscription = await instance.subscriptions.create({
      plan_id: plan_id,
      total_count: 1,
    });

    return NextResponse.json(subscription.id);

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
