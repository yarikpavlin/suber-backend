import { Nullable } from "../../lib/types";

export abstract class Repository<T, K = string> {
    abstract readAll(): Promise<T[]>;
    abstract read(id: K): Promise<Nullable<T>>;
    abstract create(t: T): Promise<T>;
    abstract update(t: T): Promise<T>;
    abstract delete(t: T): Promise<T>;
}