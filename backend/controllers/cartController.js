import asyncHandler from 'express-async-handler';
import Cart from '../models/Cart.js';

/**
 * Fetch or create the cart for the current user, with products populated.
 */
const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
    cart = await cart.populate('items.product');
  }
  return cart;
};

/**
 * @desc    Get current user's cart
 * @route   GET /api/cart
 * @access  Private
 */
export const getCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  res.json(cart);
});

/**
 * @desc    Add an item to the cart (or increment if already present)
 * @route   POST /api/cart
 * @access  Private
 */
export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1, size, color } = req.body;
  const cart = await Cart.findOne({ user: req.user._id }) ||
    (await Cart.create({ user: req.user._id, items: [] }));

  const existing = cart.items.find(
    (i) =>
      i.product.toString() === productId &&
      i.size === size &&
      i.color === color
  );

  if (existing) {
    existing.quantity += Number(quantity);
  } else {
    cart.items.push({ product: productId, quantity, size, color });
  }

  await cart.save();
  const populated = await cart.populate('items.product');
  res.status(201).json(populated);
});

/**
 * @desc    Update quantity of a cart item
 * @route   PUT /api/cart/:itemId
 * @access  Private
 */
export const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  const item = cart.items.id(req.params.itemId);
  if (!item) {
    res.status(404);
    throw new Error('Cart item not found');
  }

  item.quantity = Number(quantity);
  if (item.quantity < 1) {
    item.deleteOne();
  }

  await cart.save();
  const populated = await cart.populate('items.product');
  res.json(populated);
});

/**
 * @desc    Remove an item from the cart
 * @route   DELETE /api/cart/:itemId
 * @access  Private
 */
export const removeCartItem = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  const item = cart.items.id(req.params.itemId);
  if (item) item.deleteOne();

  await cart.save();
  const populated = await cart.populate('items.product');
  res.json(populated);
});

/**
 * @desc    Clear the cart
 * @route   DELETE /api/cart
 * @access  Private
 */
export const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (cart) {
    cart.items = [];
    await cart.save();
  }
  res.json({ message: 'Cart cleared', items: [] });
});
