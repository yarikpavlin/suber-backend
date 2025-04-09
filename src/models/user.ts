import { UUID } from "crypto"

export type User = {
    id: UUID;
    email: string;
    password: string;
    createdAt: Date;
}