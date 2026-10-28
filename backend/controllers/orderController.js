import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const SHIPPING_FLAT_RATE = 49;
const FREE_SHIPPING_THRESHOLD = 999;

/**
 * @desc    Create a new order from the provided items
 * @route   POST /api/orders
 * @access  Private
 */
export const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, paymentMethod = 'COD' } = req.body;

  if (!items || items.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  // Build order items from authoritative product data (never trust client prices).
  const orderItems = [];
  let itemsPrice = 0;

  for (const i of items) {
    const product = await Product.findById(i.product);
    if (!product) {
      res.status(404);
      throw new Error(`Product not found: ${i.product}`);
    }
    const unitPrice = product.finalPrice;
    itemsPrice += unitPrice * i.quantity;
    orderItems.push({
      product: product._id,
      name: product.name,
      image: product.images[0],
      price: unitPrice,
      quantity: i.quantity,
      size: i.size,
      color: i.color,
    });
  }

  const shippingPrice =
    itemsPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
  const totalPrice = itemsPrice + shippingPrice;

  // All orders are created unpaid. COD is pay-on-delivery; CARD/UPI flip to
  // isPaid:true only after the Razorpay signature is verified in paymentController.
  const order = await Order.create({
    user: req.user._id,
    items: orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
    isPaid: false,
  });

  // Cart-clearing is conditional:
  // - COD: clear the cart now (order is final, no payment step follows).
  // - CARD/UPI: leave the cart intact here; it is cleared only after a verified
  //   payment (paymentController.verifyPayment). This prevents a failed/cancelled
  //   card/UPI payment from leaving the user with an empty cart and an unpaid
  //   order with no retry path.
  if (paymentMethod === 'COD') {
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
  }

  res.status(201).json(order);
});

/**
 * @desc    Get orders of the current user
 * @route   GET /api/orders/myorders
 * @access  Private
 */
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(orders);
});

/**
 * @desc    Get an order by id (owner or admin)
 * @route   GET /api/orders/:id
 * @access  Private
 */
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  const isOwner = order.user._id.toString() === req.user._id.toString();
  if (!isOwner && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to view this order');
  }

  res.json(order);
});
