import { Router, RequestHandler } from "express";
import * as userController from '../controllers/userController';
import { auth } from "../middleware/auth";

const router = Router();

router.use(auth as RequestHandler);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
export default router;