import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    year: { type: Number, default: () => new Date().getFullYear() },
    mileage: { type: Number, default: 0, min: 0 },
    color: { type: String, default: 'Unknown', trim: true },
    description: { type: String, default: '', trim: true },
    image: { type: String, default: 'https://via.placeholder.com/400', trim: true },
    category: { type: String, default: 'other', trim: true }
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
