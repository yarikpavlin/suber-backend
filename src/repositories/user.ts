import { UUID } from "crypto";
import { User } from "../models/user";
import { Repository } from "./abstraction/repo";
import { Nullable } from "../lib/types";
import { ApiError } from "../lib/errors";
import bcrypt from "bcryptjs";

export class UserRepository extends Repository<User, UUID> {
    async readAll(): Promise<User[]> {
        return User.find({}, 'id email createdAt');
    }
    async read(id: UUID): Promise<Nullable<User>> {
        return User.findOne({id: id}, 'id email createdAt');
    }
    async create(t: User): Promise<User> {
        if (!t.email || !t.password) {
            throw new ApiError(400, 'Email and password are required');
        }

        const allowedFields = ['email', 'password'];
        const unexpectedFields = Object.keys(t).filter(field => !allowedFields.includes(field));
        if (unexpectedFields.length > 0) {
            throw new ApiError(400, `Unexpected fields: ${unexpectedFields.join(', ')}`);
        }

        const existingUser = await User.findOne({email: t.email});
        if (existingUser) {
            throw new ApiError(409, 'User with this email already exists');
        }

        const user = await User.create({
            ...t,
            password: bcrypt.hashSync(t.password, 10),
        });
        return user.save();
    }
    update(id: UUID, t: Partial<User>): Promise<Nullable<User>> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<Nullable<User>> {
        throw new Error("Method not implemented.");
    }   

    async findByEmail(email: string): Promise<Nullable<User>> {
        return User.findOne({email: email});
    }
}