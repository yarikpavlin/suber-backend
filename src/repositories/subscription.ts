import { ApiError } from "../lib/errors";
import { Nullable } from "../lib/types";
import { Subscription } from "../models/subscriptions";
import { Repository } from "./abstraction/repo";
import { Types } from "mongoose";

export class SubscriptionRepository extends Repository<Subscription, string> {
    async readAll(): Promise<Subscription[]> {
        return Subscription.find({});
    }
    async read(id: string): Promise<Nullable<Subscription>> {
        const subscription = await Subscription.findById(new Types.ObjectId(id));
        if (!subscription) {
            throw new ApiError(404, 'Subscription not found');
        }
        return subscription;
    }
    async create(t: Subscription): Promise<Subscription> {  
        const subscription = await Subscription.findOne({name: t.name})
        if (subscription) {
            throw new ApiError(409, 'Subscription already exists');
        }
        return Subscription.create(t);
    }
    async update(id: string, t: Partial<Subscription>): Promise<Nullable<Subscription>> {
        const objectId = new Types.ObjectId(id);
        const subscription = await Subscription.findById(objectId)
        if (!subscription) {
            throw new ApiError(404, 'Subscription not found');
        }
        return Subscription.findOneAndUpdate(
            { _id: objectId },
            t,
            { new: true, runValidators: true }
        );
    }
    async delete(id: string): Promise<Nullable<Subscription>> {
        const objectId = new Types.ObjectId(id);
        const subscription = await Subscription.findById(objectId)
        if (!subscription) {
            throw new ApiError(404, 'Subscription not found');
        }
        return Subscription.findByIdAndDelete(objectId);
    }
}