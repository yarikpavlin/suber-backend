import { Response } from "express";
import { ApiError } from "../errors/apiError";

export const handleApiResponse = async (
    res: Response,
    operation: () => Promise<any>,
    successStatus: number = 200
) => {
    try {
        const result = await operation();
        res.status(successStatus).json(result);
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}; 