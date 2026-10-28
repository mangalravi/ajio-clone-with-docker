import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

/**
 * @desc    Get the current user's wishlist
 * @route   GET /api/wishlist
 * @access  Private
 */
export const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist');
  res.json(user.wishlist);
});

/**
 * @desc    Add a product to the wishlist
 * @route   POST /api/wishlist/:productId
 * @access  Private
 */
export const addToWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { productId } = req.params;

  if (!user.wishlist.some((id) => id.toString() === productId)) {
    user.wishlist.push(productId);
    await user.save();
  }

  const populated = await user.populate('wishlist');
  res.status(201).json(populated.wishlist);
});

/**
 * @desc    Remove a product from the wishlist
 * @route   DELETE /api/wishlist/:productId
 * @access  Private
 */
export const removeFromWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { productId } = req.params;

  user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
  await user.save();

  const populated = await user.populate('wishlist');
  res.json(populated.wishlist);
});
