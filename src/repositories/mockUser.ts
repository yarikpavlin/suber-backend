import { UUID } from "crypto";
import { User } from "../models/user";
import { Repository } from "./abstraction/repo";
import * as mockData from '../mock/users.json';
import { Nullable } from "../lib/types";

export class MockUserRepository extends Repository<User, UUID> {
    async readAll(): Promise<User[]> {
        const users: User[] = (mockData as any[]).map((user: User) => ({
            ...user,
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

    create(t: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    update(t: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    delete(t: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
}