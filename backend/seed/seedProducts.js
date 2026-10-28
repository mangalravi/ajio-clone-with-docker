import dns from 'node:dns';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Product from '../models/Product.js';
import products from './products.js';

dotenv.config();

// Workaround for the Node.js DNS SRV lookup issue (mirrors server.js).
dns.setServers(['8.8.8.8']);

/**
 * Wipe the products collection and insert the sample catalog.
 * Run with: npm run seed
 */
const seed = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products.`);
    process.exit(0);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seed();
