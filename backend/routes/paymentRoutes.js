import express from 'express';
import { body } from 'express-validator';
import {
  createRazorpayOrder,
  verifyPayment,
} from '../controllers/paymentController.js';
import validate from '../middleware/validate.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post(
  '/create-order',
  [body('orderId').notEmpty().withMessage('Order id is required')],
  validate,
  createRazorpayOrder
);

router.post(
  '/verify',
  [
    body('razorpay_order_id').notEmpty().withMessage('razorpay_order_id is required'),
    body('razorpay_payment_id').notEmpty().withMessage('razorpay_payment_id is required'),
    body('razorpay_signature').notEmpty().withMessage('razorpay_signature is required'),
    body('orderId').notEmpty().withMessage('Order id is required'),
  ],
  validate,
  verifyPayment
);

export default router;
