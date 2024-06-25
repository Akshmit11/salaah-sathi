import { Document, Schema, model, models } from "mongoose";

export interface IPayment extends Document {
  _id: string;
  user: { _id: string; username: string };
  razorpayId: string;
  razorpaySubscriptionId: string;
  plan: "free" | "pro";
  createdAt: Date;
  endAt: Date;
}

const PaymentSchema: Schema<IPayment> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  razorpayId: { type: String, required: true },
  razorpaySubscriptionId: { type: String, required: true },
  plan: { type: String, default: "pro" },
  createdAt: { type: Date, default: Date.now },
  endAt: { type: Date, default: Date.now },
});

const Payment = models.Payment || model("Payment", PaymentSchema);

export default Payment;
