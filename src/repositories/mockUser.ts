import { randomUUID, UUID } from "crypto";
import { User } from "../models/user";
import { Repository } from "./abstraction/repo";
import mockData from '../mock/users.json';
import { Nullable } from "../lib/types";
import { ApiError } from "../lib/errors";
import fs from 'fs';
import path from 'path';

export class MockUserRepository extends Repository<User, UUID> {
    async readAll(): Promise<User[]> {
        const users: User[] = (mockData as any[]).map((user: any) => ({
            ...user,
            id: user.id as UUID,
            createdAt: new Date(user.createdAt)
        }));
        return Promise.resolve(users);
    }

    async read(id: UUID): Promise<Nullable<User>> {
        const allUsers = await this.readAll();
        const user = allUsers.find(user => user.id === id);
        if(!user) {
            return null;
        }
        return Promise.resolve(user);
    }

    async findByEmail(email: string): Promise<Nullable<User>> {
        const allUsers = await this.readAll();
        const user = allUsers.find(user => user.email === email);
        return user || null;
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

        const existingUser = await this.findByEmail(t.email);
        if (existingUser) {
            throw new ApiError(409, 'User with this email already exists');
        }

        const newUser: User = {
            ...t,
            id: randomUUID() as UUID,
            createdAt: new Date()
        };
        const newData = [...mockData, newUser];
        this.updateMockFile(newData);
        return Promise.resolve(newUser);
    }
    update(t: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    delete(t: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

    private updateMockFile(data: (User | { id: string; email: string; password: string; createdAt: string })[]) {
        const mockFile = path.join(__dirname, '../mock/users.json');
        fs.writeFileSync(mockFile, JSON.stringify(data, null, 2));
    }
}