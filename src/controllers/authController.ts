import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserRepository } from "../repositories/user";
import { handleApiResponse } from "../lib/api/apiResponse";

const userRepo = new UserRepository();

const signup = async (req: Request, res: Response) => {
    await handleApiResponse(res, async () => {
        const user = await userRepo.create(req.body);
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
        res.header('Authorization', `Bearer ${token}`);
        return { id: user.id, email: user.email };
    }, 201);
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await userRepo.findByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
    res.status(200).header('Authorization', `Bearer ${token}`).json({id: user.id, email: user.email});
}

export { signup, login };