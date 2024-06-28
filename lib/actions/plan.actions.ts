"use server";

import { CreatePaymentParams } from "@/types";
import { connectToDatabase } from "../database/mongoose";
import User from "../database/models/user.model";
import Payment from "../database/models/payment.model";
import { handleError } from "../utils";

export async function subscribePlan() {
  try {
    const response = await fetch("https://suggestsolutions.com/api/subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const data = await response.json();
    const key = process.env.RAZORPAY_KEY_ID;

    return JSON.parse(JSON.stringify({ data, key }));
  } catch (error) {
    console.log(error);
  }
}

// create payment in database
export const createPayment = async ({
    userId,
    razorpayId,
    razorpaySubscriptionId,
  }: CreatePaymentParams) => {
    try {
      await connectToDatabase();
  
      const user = await User.findById(userId);
  
      if (!user) {
        throw new Error("User not found!");
      }
  
      const newPayment = await Payment.create({
        user: user._id,
        razorpayId,
        razorpaySubscriptionId,
        endAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // Set endAt to 1 year from now
      });

      // Update user's plan to "pro"
      user.plan = "pro";
      await user.save();

      return JSON.parse(JSON.stringify(newPayment));
    } catch (error) {
      handleError(error);
    }
  };
