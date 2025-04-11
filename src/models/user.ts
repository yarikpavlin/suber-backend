import { randomUUID, UUID } from "crypto"
import mongoose, {Schema} from "mongoose";

export interface User extends Document {
    id: UUID;
    email: string;
    password: string;
    createdAt: Date;
}

const userSchema = new Schema<User>({
    id: { type: String, default: randomUUID() },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: () => new Date() },
});

export const User = mongoose.model<User>("User", userSchema);