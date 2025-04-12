import { ApiError } from "../lib/errors";
import { Nullable } from "../lib/types";
import { Subscription } from "../models/subscriptions";
import { Repository } from "./abstraction/repo";

export class SubscriptionRepository extends Repository<Subscription, string> {
    async readAll(): Promise<Subscription[]> {
        return Subscription.find({});
    }
    async read(id: string): Promise<Nullable<Subscription>> {
        return Subscription.findOne({id: id});
    }
    async create(t: Subscription): Promise<Subscription> {
        const existingSubscription = await Subscription.findOne({name: t.name});
        if (existingSubscription) {
            throw new ApiError(409, 'Subscription with this name already exists');
        }
        return Subscription.create(t);;
    }
    async update(t: Subscription): Promise<Subscription> {
        throw new Error("Method not implemented.");
    }
    async delete(t: Subscription): Promise<Subscription> {
        throw new Error("Method not implemented.");
    }
    
}