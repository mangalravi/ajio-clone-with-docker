import jwt from 'jsonwebtoken';

/**
 * Generate a signed JWT for the given user id.
 * @param {string} userId - Mongo ObjectId of the user.
 * @returns {string} signed JWT
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

export default generateToken;
