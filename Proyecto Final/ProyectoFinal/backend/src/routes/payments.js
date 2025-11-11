import express from 'express';
import { createPayment, paymentWebhook, getPaymentStatus } from '../controllers/paymentController.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.post('/create', verifyToken, createPayment);

router.post('/webhook', paymentWebhook);

router.get('/status/:order_id', verifyToken, getPaymentStatus);

export default router;

