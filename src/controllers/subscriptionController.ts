import { SubscriptionRepository } from "../repositories/subscription";

const subscriptionRepo = new SubscriptionRepository();

export const createSubscription = async (req: Request, res: Response) => {
    
    // const subscription = await subscriptionRepo.create();
    // res.status(201).json(subscription);
}
