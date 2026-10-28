import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['men', 'women', 'kids', 'accessories', 'footwear'],
    },
    subCategory: { type: String, trim: true },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    discountPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 90,
    },
    images: [{ type: String, required: true }],
    sizes: [{ type: String }],
    colors: [{ type: String }],
    countInStock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    reviews: [reviewSchema],
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Virtual: price after applying the discount percentage.
productSchema.virtual('finalPrice').get(function () {
  return Math.round(this.price - (this.price * this.discountPercent) / 100);
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
