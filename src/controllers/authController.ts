import { Request, Response } from "express";
import { MockUserRepository } from "../repositories/mockUser";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ApiError } from "../lib/errors";
const userRepo = new MockUserRepository();

const signup = async (req: Request, res: Response) => {
    try {
        const user = await userRepo.create(req.body);
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
        res.status(201).header('Authorization', `Bearer ${token}`).json({id: user.id, email: user.email});
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await userRepo.findByEmail(email);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
    res.status(200).header('Authorization', `Bearer ${token}`).json({id: user.id, email: user.email});
}

export { signup, login };