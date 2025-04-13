import { UUID } from "crypto";
import { Request, Response } from "express";
import { UserRepository } from "../repositories/user";
import { handleApiResponse } from "../lib/apiResponse";

const userRepo = new UserRepository();

const getUsers = async (req: Request, res: Response) => {
    await handleApiResponse(res, async () => {
        return userRepo.readAll();
    });
}

const getUserById = async (req: Request, res: Response) => {
    const id = req.params.id as UUID;
    await handleApiResponse(res, () => userRepo.read(id));
}

export {
    getUserById, getUsers
};
