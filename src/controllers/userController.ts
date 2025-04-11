import { UUID } from "crypto";
import { Request, Response } from "express";
import { UserRepository } from "../repositories/user";

const userRepo = new UserRepository();


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

export {
    getUserById, getUsers
};
