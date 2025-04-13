import { Router, RequestHandler } from "express";
import { auth } from "../midleware/auth";
import * as subscriptionController from '../controllers/subscriptionController';
const router = Router();

router.use(auth as RequestHandler);
router.get('/', subscriptionController.getSubscriptions);
router.get('/:id', subscriptionController.getSubscriptionById);
router.post('/', subscriptionController.createSubscription);
router.put('/:id', subscriptionController.updateFullSubscription);
router.patch('/:id', subscriptionController.updatePartialSubscription);
router.delete('/:id', subscriptionController.deleteSubscription);
export default router;