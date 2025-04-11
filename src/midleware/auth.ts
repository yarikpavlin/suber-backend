import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
      interface Request {
        userId?: string;
      }
    }
  }

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.userId = decoded as string;
  } catch (error) {
    return res.status(401).json({ message: "Invalid token"});
  }
  next();
};

