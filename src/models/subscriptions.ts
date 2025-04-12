import { Document, model, Schema } from "mongoose";

export interface Subscription extends Document {
 id: string;
 userId: string;
 name: string;
 cost: number;
 currency: "UAH" | "USD" | "EUR";
 frequency: "weekly" | "monthly" | "yearly";
 lastPaidDate: Date;
 nextDueDate: Date;
 isActive: boolean;
 createdAt: Date;
 notes?: string;
}

const SubscriptionSchema = new Schema({
 id: { type: String, required: true },
 userId: { type: String, required: true, index: true },
 name: { type: String, required: true },
 cost: { type: Number, required: true },
 currency: { type: String, enum: ["UAH", "USD", "EUR"], required: true, default: "UAH" },
 frequency: { type: String, enum: ["weekly", "monthly", "yearly"], required: true, default: "monthly" },
 lastPaidDate: { type: Date, required: true },
 nextDueDate: { type: Date, required: true },
 isActive: { type: Boolean, required: true },
 createdAt: { type: Date, required: true, default: new Date() },
 notes: { type: String, required: false },
});

export const Subscription = model<Subscription>('Subscription', SubscriptionSchema);