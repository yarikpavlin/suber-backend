import { UUID } from "crypto";
import { Request, Response } from "express";
import { MockUserRepository } from "../repositories/mockUser";

const userRepo = new MockUserRepository();

const getUsers = async (req: Request, res: Response) => {
    res.send(200).json(await userRepo.readAll())
}

const getUserById = async (req: Request, res: Response) => {
    const id = req.params.id as UUID;
    res.send(200).json(await userRepo.read(id))
}

export {
    getUserById, getUsers
};
