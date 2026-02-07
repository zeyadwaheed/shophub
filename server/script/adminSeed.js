import mongoose from 'mongoose';
import User from '../src/database/models/User.js';
import bcrypt from 'bcrypt';

await mongoose.connect('mongodb://localhost:27017/ecommerce');

const email = 'admin@example.com';
const password = '123456';
const fullName = 'Admin User';

// check if admin exists
let user = await User.findOne({ email });
if (!user) {
  user = await User.create({
    email,
    fullName,
    password,
    role: 'admin'
  });
  console.log('Admin created:', user.email);
} else {
  console.log('Admin already exists');
}

mongoose.disconnect();