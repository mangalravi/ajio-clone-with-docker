import crypto from 'crypto';
import asyncHandler from 'express-async-handler';
import Razorpay from 'razorpay';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

/**
 * @desc    Create a Razorpay order for an existing unpaid CARD/UPI order.
 * @route   POST /api/payment/create-order
 * @access  Private
 *
 * The amount is derived ONLY from the persisted Order.totalPrice. No
 * client-supplied amount is ever trusted.
 */
export const createRazorpayOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  if (order.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to pay for this order');
  }

  if (order.paymentMethod === 'COD') {
    res.status(400);
    throw new Error('COD orders do not require online payment');
  }

  if (order.isPaid) {
    res.status(400);
    throw new Error('Order is already paid');
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  // Amount in paise, derived from the authoritative server-side total.
  const rzpOrder = await razorpay.orders.create({
    amount: Math.round(order.totalPrice * 100),
    currency: 'INR',
    receipt: order._id.toString(),
  });

  order.razorpayOrderId = rzpOrder.id;
  await order.save();

  res.json({
    razorpayOrderId: rzpOrder.id,
    amount: rzpOrder.amount,
    currency: 'INR',
    keyId: process.env.RAZORPAY_KEY_ID,
    orderId: order._id,
  });
});

/**
 * @desc    Verify a Razorpay payment signature and mark the order paid.
 * @route   POST /api/payment/verify
 * @access  Private
 *
 * The HMAC-SHA256 of `${razorpay_order_id}|${razorpay_payment_id}` is
 * recomputed with the server-side secret and compared safely. An order is
 * never marked paid without a verified signature.
 */
export const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } =
    req.body;

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
  const receivedBuffer = Buffer.from(razorpay_signature || '', 'utf8');

  // timingSafeEqual throws on length mismatch, so reject unequal lengths first.
  const isValid =
    expectedBuffer.length === receivedBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, receivedBuffer);

  if (!isValid) {
    res.status(400);
    throw new Error('Payment verification failed');
  }

  const order = await Order.findById(orderId);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  if (order.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to pay for this order');
  }

  if (order.razorpayOrderId !== razorpay_order_id) {
    res.status(400);
    throw new Error('Razorpay order mismatch');
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.razorpayPaymentId = razorpay_payment_id;
  order.razorpaySignature = razorpay_signature;
  await order.save();

  // CARD/UPI cart-clear point: only after a verified payment do we empty the
  // cart, so a failed/cancelled payment leaves the cart intact for retry.
  await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });

  res.json(order);
});
