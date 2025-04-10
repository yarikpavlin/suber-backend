import { UUID } from "crypto";
import { Request, Response } from "express";
import { MockUserRepository } from "../repositories/mockUser";
import { ApiError } from "../lib/errors";

const userRepo = new MockUserRepository();

const getUsers = async (req: Request, res: Response) => {
    const users = await userRepo.readAll();
    if (users.length === 0) {
        res.status(404).json({ error: 'No users found' });
    } else {
        res.status(200).json(users);
    }
}

const getUserById = async (req: Request, res: Response) => {
    const id = req.params.id as UUID;
    const user = await userRepo.read(id);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
    } else {
        res.status(200).json(user);
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
        const user = await userRepo.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export {
    getUserById, getUsers, createUser
};
