import { Nullable } from "../../lib/types";

export abstract class Repository<T, K = string> {
    abstract readAll(): Promise<T[]>;
    abstract read(id: K): Promise<Nullable<T>>;
    abstract create(t: T): Promise<T>;
    abstract update(id: K, t: Partial<T>): Promise<Nullable<T>>;
    abstract delete(id: K): Promise<Nullable<T>>;
}