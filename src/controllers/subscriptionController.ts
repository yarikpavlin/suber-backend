import { SubscriptionRepository } from "../repositories/subscription";
import { Request, Response } from "express";
import { handleApiResponse } from "../lib/api/apiResponse";

const subscriptionRepo = new SubscriptionRepository();

export const getSubscriptions = async (req: Request, res: Response) => {
    await handleApiResponse(res, () => subscriptionRepo.readAll());
}

export const getSubscriptionById = async (req: Request, res: Response) => {
    await handleApiResponse(res, () => subscriptionRepo.read(req.params.id));
}

export const createSubscription = async (req: Request, res: Response) => {
    await handleApiResponse(res, () => subscriptionRepo.create(req.body), 201);
}

export const updateFullSubscription = async (req: Request, res: Response) => {
    await handleApiResponse(res, () => subscriptionRepo.update(req.params.id, req.body));
}

export const updatePartialSubscription = async (req: Request, res: Response) => {
    await handleApiResponse(res, () => subscriptionRepo.update(req.params.id, req.body));
}

export const deleteSubscription = async (req: Request, res: Response) => {
    await handleApiResponse(res, () => subscriptionRepo.delete(req.params.id));
}