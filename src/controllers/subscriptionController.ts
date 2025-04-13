import { ApiError } from "../lib/errors";
import { SubscriptionRepository } from "../repositories/subscription";
import { Request, Response } from "express";
const subscriptionRepo = new SubscriptionRepository();

export const getSubscriptions = async (req: Request, res: Response) => {
    try {
        const subscriptions = await subscriptionRepo.readAll();
        res.status(200).json(subscriptions);
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const getSubscriptionById = async (req: Request, res: Response) => {
    try {
        const subscription = await subscriptionRepo.read(req.params.id);
        res.status(200).json(subscription);
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
export const createSubscription = async (req: Request, res: Response) => {
    try {
        const subscription = await subscriptionRepo.create(req.body);
        res.status(201).json(subscription);
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }    
}

export const updateFullSubscription = async (req: Request, res: Response) => {
    try {
        const subscription = await subscriptionRepo.update(req.params.id, req.body);
        res.status(200).json(subscription);
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const updatePartialSubscription = async (req: Request, res: Response) => {
    try {
        const subscription = await subscriptionRepo.update(req.params.id, req.body);
        res.status(200).json(subscription);
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const deleteSubscription = async (req: Request, res: Response) => {
    try {
        const subscription = await subscriptionRepo.delete(req.params.id);
        res.status(200).json(subscription);
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}