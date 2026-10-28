// Sample product catalog used by the seed script.
const products = [
  // ---------------------------------------------------------------------------
  // MEN
  // ---------------------------------------------------------------------------
  {
    name: 'Classic Cotton Crew Neck T-Shirt',
    brand: 'Teamspirit',
    description:
      'Soft breathable cotton t-shirt with a regular fit. A wardrobe essential for everyday wear.',
    category: 'men',
    subCategory: 'tshirts',
    price: 1299,
    discountPercent: 40,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Navy'],
    countInStock: 50,
    rating: 4.3,
    numReviews: 120,
    isFeatured: true,
  },
  {
    name: 'Slim Fit Denim Jeans',
    brand: 'Flying Machine',
    description:
      'Stretchable slim fit jeans with a mid-rise waist. Perfect for casual outings.',
    category: 'men',
    subCategory: 'jeans',
    price: 2999,
    discountPercent: 50,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600',
    ],
    sizes: ['30', '32', '34', '36'],
    colors: ['Blue', 'Black'],
    countInStock: 35,
    rating: 4.1,
    numReviews: 85,
    isFeatured: true,
  },
  {
    name: 'Checked Casual Shirt',
    brand: 'Roadster',
    description:
      'Full-sleeve checked shirt in pure cotton with a button-down collar. Smart casual staple.',
    category: 'men',
    subCategory: 'shirts',
    price: 1899,
    discountPercent: 45,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Red', 'Blue', 'Green'],
    countInStock: 42,
    rating: 4.2,
    numReviews: 96,
    isFeatured: false,
  },
  {
    name: 'Hooded Puffer Jacket',
    brand: 'HRX',
    description:
      'Water-resistant quilted puffer jacket with a detachable hood for cold-weather comfort.',
    category: 'men',
    subCategory: 'jackets',
    price: 4499,
    discountPercent: 35,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600',
    ],
    sizes: ['M', 'L', 'XL'],
    colors: ['Olive', 'Black'],
    countInStock: 25,
    rating: 4.4,
    numReviews: 140,
    isFeatured: true,
  },
  {
    name: 'Tapered Fit Chinos',
    brand: 'Levis',
    description:
      'Versatile cotton-blend chinos with a tapered leg. Dress them up or down with ease.',
    category: 'men',
    subCategory: 'trousers',
    price: 2499,
    discountPercent: 30,
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600',
    ],
    sizes: ['30', '32', '34', '36'],
    colors: ['Beige', 'Navy', 'Khaki'],
    countInStock: 38,
    rating: 4.0,
    numReviews: 58,
    isFeatured: false,
  },

  // ---------------------------------------------------------------------------
  // WOMEN
  // ---------------------------------------------------------------------------
  {
    name: 'Floral Print A-Line Dress',
    brand: 'AJIO Own',
    description:
      'Elegant floral print dress with an A-line silhouette. Lightweight and comfortable.',
    category: 'women',
    subCategory: 'dresses',
    price: 2499,
    discountPercent: 55,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Pink', 'Blue'],
    countInStock: 40,
    rating: 4.5,
    numReviews: 210,
    isFeatured: true,
  },
  {
    name: 'High-Waist Skinny Jeggings',
    brand: 'DNMX',
    description:
      'Comfortable high-waist jeggings with a flattering skinny fit and all-day stretch.',
    category: 'women',
    subCategory: 'jeans',
    price: 1799,
    discountPercent: 45,
    images: [
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=600',
    ],
    sizes: ['26', '28', '30', '32'],
    colors: ['Blue', 'Grey'],
    countInStock: 28,
    rating: 4.0,
    numReviews: 64,
    isFeatured: false,
  },
  {
    name: 'Oversized Graphic Sweatshirt',
    brand: 'Bewakoof',
    description:
      'Trendy oversized sweatshirt with soft fleece lining and bold graphics.',
    category: 'women',
    subCategory: 'sweatshirts',
    price: 1999,
    discountPercent: 50,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Beige', 'Black'],
    countInStock: 33,
    rating: 4.2,
    numReviews: 78,
    isFeatured: true,
  },
  {
    name: 'Rayon Anarkali Kurta',
    brand: 'Libas',
    description:
      'Flowy printed Anarkali kurta in breathable rayon. Perfect for festive and daily wear.',
    category: 'women',
    subCategory: 'kurtas',
    price: 1599,
    discountPercent: 40,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Maroon', 'Teal', 'Mustard'],
    countInStock: 47,
    rating: 4.4,
    numReviews: 185,
    isFeatured: true,
  },
  {
    name: 'Ribbed Bodycon Top',
    brand: 'ONLY',
    description:
      'Fitted ribbed knit top with a round neck. A versatile layering piece for any outfit.',
    category: 'women',
    subCategory: 'tops',
    price: 999,
    discountPercent: 35,
    images: [
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['White', 'Black', 'Lilac'],
    countInStock: 55,
    rating: 4.1,
    numReviews: 73,
    isFeatured: false,
  },

  // ---------------------------------------------------------------------------
  // KIDS
  // ---------------------------------------------------------------------------
  {
    name: 'Kids Graphic Print Hoodie',
    brand: 'Juniors',
    description:
      'Cozy fleece hoodie with a fun graphic print. Keeps little ones warm and stylish.',
    category: 'kids',
    subCategory: 'sweatshirts',
    price: 1599,
    discountPercent: 30,
    images: [
      'https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?w=600',
    ],
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    colors: ['Yellow', 'Red'],
    countInStock: 60,
    rating: 4.4,
    numReviews: 42,
    isFeatured: true,
  },
  {
    name: 'Boys Cotton Printed T-Shirt Pack',
    brand: 'Max',
    description:
      'Pack of soft cotton t-shirts with playful prints. Comfortable for active kids.',
    category: 'kids',
    subCategory: 'tshirts',
    price: 899,
    discountPercent: 40,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600',
    ],
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    colors: ['Multi'],
    countInStock: 70,
    rating: 4.3,
    numReviews: 88,
    isFeatured: false,
  },
  {
    name: 'Girls Party Frock',
    brand: 'Hopscotch',
    description:
      'Adorable layered party frock with sequin detailing. Perfect for special occasions.',
    category: 'kids',
    subCategory: 'dresses',
    price: 2199,
    discountPercent: 50,
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600',
    ],
    sizes: ['2-3Y', '4-5Y', '6-7Y'],
    colors: ['Pink', 'Lavender'],
    countInStock: 30,
    rating: 4.6,
    numReviews: 54,
    isFeatured: true,
  },
  {
    name: 'Kids Denim Dungarees',
    brand: 'US Polo Kids',
    description:
      'Classic denim dungarees with adjustable straps and front pocket. Durable and cute.',
    category: 'kids',
    subCategory: 'dungarees',
    price: 1799,
    discountPercent: 35,
    images: [
      'https://images.unsplash.com/photo-1476234251651-f353703a034d?w=600',
    ],
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    colors: ['Blue'],
    countInStock: 44,
    rating: 4.2,
    numReviews: 37,
    isFeatured: false,
  },

  // ---------------------------------------------------------------------------
  // FOOTWEAR
  // ---------------------------------------------------------------------------
  {
    name: 'Running Sports Shoes',
    brand: 'Puma',
    description:
      'Lightweight running shoes with cushioned soles and breathable mesh upper.',
    category: 'footwear',
    subCategory: 'sports',
    price: 4999,
    discountPercent: 35,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
    ],
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Black', 'Grey'],
    countInStock: 45,
    rating: 4.6,
    numReviews: 330,
    isFeatured: true,
  },
  {
    name: 'Classic White Sneakers',
    brand: 'Adidas',
    description:
      'Timeless low-top sneakers in clean white leather. Pairs with practically everything.',
    category: 'footwear',
    subCategory: 'sneakers',
    price: 3999,
    discountPercent: 30,
    images: [
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600',
    ],
    sizes: ['6', '7', '8', '9', '10'],
    colors: ['White'],
    countInStock: 52,
    rating: 4.5,
    numReviews: 275,
    isFeatured: true,
  },
  {
    name: 'Leather Formal Derby Shoes',
    brand: 'Hush Puppies',
    description:
      'Genuine leather derby shoes with cushioned insole. Refined choice for formal wear.',
    category: 'footwear',
    subCategory: 'formal',
    price: 5499,
    discountPercent: 25,
    images: [
      'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600',
    ],
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Brown', 'Black'],
    countInStock: 26,
    rating: 4.3,
    numReviews: 112,
    isFeatured: false,
  },
  {
    name: 'Women Block Heel Sandals',
    brand: 'Catwalk',
    description:
      'Elegant block heel sandals with ankle strap. Comfortable support for all-day wear.',
    category: 'footwear',
    subCategory: 'heels',
    price: 2299,
    discountPercent: 45,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600',
    ],
    sizes: ['4', '5', '6', '7', '8'],
    colors: ['Nude', 'Black'],
    countInStock: 34,
    rating: 4.1,
    numReviews: 69,
    isFeatured: false,
  },

  // ---------------------------------------------------------------------------
  // ACCESSORIES
  // ---------------------------------------------------------------------------
  {
    name: 'Leather Analog Wristwatch',
    brand: 'Fossil',
    description:
      'Classic analog watch with a genuine leather strap and stainless steel case.',
    category: 'accessories',
    subCategory: 'watches',
    price: 7999,
    discountPercent: 20,
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600',
    ],
    sizes: ['Free'],
    colors: ['Brown', 'Black'],
    countInStock: 20,
    rating: 4.7,
    numReviews: 150,
    isFeatured: false,
  },
  {
    name: 'Polarized Aviator Sunglasses',
    brand: 'Ray-Ban',
    description:
      'Iconic aviator sunglasses with polarized UV-protected lenses and a metal frame.',
    category: 'accessories',
    subCategory: 'sunglasses',
    price: 6499,
    discountPercent: 15,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600',
    ],
    sizes: ['Free'],
    colors: ['Gold', 'Silver'],
    countInStock: 30,
    rating: 4.6,
    numReviews: 198,
    isFeatured: true,
  },
  {
    name: 'Genuine Leather Wallet',
    brand: 'Tommy Hilfiger',
    description:
      'Bi-fold leather wallet with multiple card slots and a sleek slim profile.',
    category: 'accessories',
    subCategory: 'wallets',
    price: 2499,
    discountPercent: 40,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600',
    ],
    sizes: ['Free'],
    colors: ['Tan', 'Black'],
    countInStock: 48,
    rating: 4.4,
    numReviews: 123,
    isFeatured: false,
  },
  {
    name: 'Structured Tote Handbag',
    brand: 'Caprese',
    description:
      'Spacious structured tote in faux leather with a zip closure and inner pockets.',
    category: 'accessories',
    subCategory: 'bags',
    price: 3299,
    discountPercent: 50,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600',
    ],
    sizes: ['Free'],
    colors: ['Maroon', 'Beige', 'Black'],
    countInStock: 36,
    rating: 4.3,
    numReviews: 101,
    isFeatured: true,
  },
  {
    name: 'Woven Leather Belt',
    brand: 'Allen Solly',
    description:
      'Reversible woven-pattern leather belt with a polished metal buckle.',
    category: 'accessories',
    subCategory: 'belts',
    price: 1499,
    discountPercent: 35,
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600',
    ],
    sizes: ['32', '34', '36', '38'],
    colors: ['Brown', 'Black'],
    countInStock: 58,
    rating: 4.2,
    numReviews: 64,
    isFeatured: false,
  },
];

export default products;
