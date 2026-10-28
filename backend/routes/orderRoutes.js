import express from 'express';
import { body } from 'express-validator';
import {
  createOrder,
  getMyOrders,
  getOrderById,
} from '../controllers/orderController.js';
import validate from '../middleware/validate.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post(
  '/',
  [
    body('items').isArray({ min: 1 }).withMessage('Items are required'),
    body('shippingAddress').notEmpty().withMessage('Shipping address is required'),
  ],
  validate,
  createOrder
);
router.get('/myorders', getMyOrders);
router.get('/:id', getOrderById);

export default router;
