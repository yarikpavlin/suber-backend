import { UUID } from "crypto";
import { User } from "../models/user";
import { Repository } from "./abstraction/repo";

class UserRepository extends Repository<User, UUID> {
    async readAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    async read(id: UUID): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async create(t: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async update(t: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async delete(t: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    
}