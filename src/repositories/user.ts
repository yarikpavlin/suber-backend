import { UUID } from "crypto";
import { User } from "../models/user";
import { Repository } from "./abstraction/repo";
import { Nullable } from "../lib/types/common";
import { ApiError } from "../lib/errors/apiError";
import bcrypt from "bcryptjs";

export class UserRepository extends Repository<User, UUID> {
    async readAll(): Promise<User[]> {
        const users = await User.find({}, 'id email createdAt');
        if (!users) {
            throw new ApiError(404, 'No users found');
        }
        return users;
    }
    async read(id: UUID): Promise<Nullable<User>> {
        const user = await User.findOne({id: id}, 'id email createdAt');
        if (!user) {
            throw new ApiError(404, 'User with id ' + id + ' not found');
        }
        return user;
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