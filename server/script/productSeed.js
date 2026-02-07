import mongoose from 'mongoose';
import Product from '../src/database/models/Product.js';

await mongoose.connect('mongodb://localhost:27017/ecommerce');

const products = [
  // Electronics (3)
  {
    name: 'iPhone 17 Pro',
    brand: 'Apple',
    price: 999,
    color: 'Titanium Blue',
    description: 'Latest iPhone with A17 Pro chip and titanium design.',
    image: 'https://cdn.thewirecutter.com/wp-content/media/2025/09/BG-IPHONE-2048px_IPHONE-17-PRO-MAX_BACK.jpg?auto=webp&quality=75&width=980&dpr=2',
    category: 'electronics'
  },
  {
    name: 'Samsung 55" 4K TV',
    brand: 'Samsung',
    price: 699,
    color: 'Black',
    description: 'Smart TV with 4K UHD, HDR, and built-in streaming apps.',
    image: 'https://f.nooncdn.com/p/pnsku/N70196084V/45/_/1769067679/87919168-d66d-4c95-9a24-4cecbbbf4ba8.jpg?width=800',
    category: 'electronics'
  },
  {
    name: 'MacBook Pro 16"',
    brand: 'Apple',
    price: 2499,
    color: 'Space Gray',
    description: 'Powerful laptop with M3 Max chip for professionals.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    category: 'electronics'
  },
  // Clothing (3)
  {
    name: 'Nike Air Max',
    brand: 'Nike',
    price: 160,
    color: 'White/Black',
    description: 'Classic sneakers with Air cushioning for all-day comfort.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
    category: 'clothing'
  },
  {
    name: "Levi's Denim Jacket",
    brand: "Levi's",
    price: 98,
    color: 'Classic Blue',
    description: 'Timeless denim jacket, durable and versatile.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
    category: 'clothing'
  },
  {
    name: 'Polo Sport T-Shirt',
    brand: 'Ralph Lauren',
    price: 85,
    color: 'Navy Blue',
    description: 'Premium cotton polo shirt with classic design.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    category: 'clothing'
  },
  // Accessories (3)
  {
    name: 'Headphones',
    brand: 'Apple',
    price: 249,
    type: 'Wireless Earbuds',
    color: 'White',
    description: 'Premium wireless headphones with active noise cancellation and spatial audio.',
    image: 'https://www.apple.com/v/airpods-max/j/images/overview/bento/midnight/bento_1_airpod_max_midnight__4jy1tkqh9qay_xlarge_2x.jpg',
    category: 'accessory'
  },
  {
    name: 'Mechanical Keyboard',
    brand: 'Corsair',
    price: 129,
    type: 'Gaming Keyboard',
    color: 'Gray/Beige',
    description: 'Professional mechanical keyboard with RGB backlighting and custom switches.',
    image: 'https://m.media-amazon.com/images/I/71zRfPyG--L._AC_SL1500_.jpg',
    category: 'accessory'
  },
  {
    name: 'Wireless Mouse',
    brand: 'Logitech',
    price: 49,
    type: 'Computer Mouse',
    color: 'Black',
    description: 'Precision wireless mouse with smooth tracking and long battery life.',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800',
    category: 'accessory'
  }
];

let created = 0;
let updated = 0;
for (const p of products) {
  const exists = await Product.findOne({ name: p.name, brand: p.brand });
  if (!exists) {
    await Product.create(p);
    created++;
    console.log('Created:', p.name);
  } else {
    await Product.updateOne({ name: p.name, brand: p.brand }, { image: p.image });
    updated++;
    console.log('Updated image:', p.name);
  }
}

console.log(`Done. Created ${created} new, updated ${updated} images.`);
mongoose.disconnect();
