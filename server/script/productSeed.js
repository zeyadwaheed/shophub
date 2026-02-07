import mongoose from 'mongoose';
import Product from '../src/database/models/Product.js';

await mongoose.connect('mongodb://localhost:27017/ecommerce');

const products = [
  // Cars
  {
    name: 'Tesla Model 3',
    brand: 'Tesla',
    price: 42990,
    year: 2024,
    mileage: 0,
    color: 'Pearl White',
    description: 'Electric sedan with autopilot, long range battery.',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600',
    category: 'car'
  },
  {
    name: 'BMW 3 Series',
    brand: 'BMW',
    price: 41950,
    year: 2023,
    mileage: 12000,
    color: 'Jet Black',
    description: 'Luxury sports sedan with premium interior.',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600',
    category: 'car'
  },
  // Electronics
  {
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    price: 999,
    year: 2024,
    mileage: 0,
    color: 'Titanium Blue',
    description: 'Latest iPhone with A17 Pro chip and titanium design.',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600',
    category: 'electronics'
  },
  {
    name: 'Samsung 55" 4K TV',
    brand: 'Samsung',
    price: 699,
    year: 2024,
    mileage: 0,
    color: 'Black',
    description: 'Smart TV with 4K UHD, HDR, and built-in streaming apps.',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600',
    category: 'electronics'
  },
  // Clothing
  {
    name: 'Nike Air Max',
    brand: 'Nike',
    price: 160,
    year: 2024,
    mileage: 0,
    color: 'White/Black',
    description: 'Classic sneakers with Air cushioning for all-day comfort.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
    category: 'clothing'
  },
  {
    name: 'Levi\'s Denim Jacket',
    brand: 'Levi\'s',
    price: 98,
    year: 2024,
    mileage: 0,
    color: 'Classic Blue',
    description: 'Timeless denim jacket, durable and versatile.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600',
    category: 'clothing'
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
