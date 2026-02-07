import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true, min: 0 },
    status: { type: String, default: 'pending', trim: true }
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
