import { Product, Order, User } from './models/index.js';

const toProductResponse = (doc) => {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : doc;
  return { ...obj, id: (obj._id || doc._id).toString() };
};

const toOrderResponse = (doc) => {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    ...obj,
    id: (obj._id || doc._id).toString(),
    productId: (obj.productId || doc.productId)?.toString?.() || obj.productId
  };
};

// Product functions
export const getProducts = async () => {
  const docs = await Product.find().lean();
  return docs.map((d) => ({ ...d, id: d._id.toString() }));
};

export const getProductById = async (id) => {
  const doc = await Product.findById(id);
  return toProductResponse(doc);
};

export const addProduct = async (product) => {
  const { id: _omit, ...rest } = product;
  const doc = await Product.create(rest);
  return toProductResponse(doc);
};

export const updateProduct = async (id, updates) => {
  const doc = await Product.findByIdAndUpdate(id, updates, { new: true });
  return toProductResponse(doc);
};

export const deleteProduct = async (id) => {
  const doc = await Product.findByIdAndDelete(id);
  return toProductResponse(doc);
};

// Car helpers (same collection, filter by category)
export const getCars = async () => {
  const docs = await Product.find({ category: 'car' }).lean();
  return docs.map((d) => ({ ...d, id: d._id.toString() }));
};

export const getCarById = async (id) => {
  const doc = await Product.findOne({ _id: id, category: 'car' });
  return toProductResponse(doc);
};

export const addCar = async (car) => addProduct({ ...car, category: 'car' });

export const updateCar = async (id, updates) => updateProduct(id, updates);

export const deleteCar = async (id) => deleteProduct(id);

// Orders
export const addOrder = async (order) => {
  const { id: _omit, ...rest } = order;
  const doc = await Order.create(rest);
  return toOrderResponse(doc);
};

export const getOrders = async () => {
  const docs = await Order.find().lean();
  return docs.map((d) => ({
    ...d,
    id: d._id.toString(),
    productId: d.productId?.toString?.() || d.productId
  }));
};

// Orders with populated product (for admin dashboard)
export const getOrdersWithProductDetails = async () => {
  const docs = await Order.find().populate('productId', 'name brand price category').sort({ createdAt: -1 }).lean();

  // Batch fetch user info for display
  const userIds = [...new Set(docs.map((d) => d.userId).filter(Boolean))];
  const users = userIds.length
    ? await User.find({ _id: { $in: userIds } }).select('fullName email').lean()
    : [];
  const userMap = Object.fromEntries(users.map((u) => [u._id.toString(), { fullName: u.fullName, email: u.email }]));

  return docs.map((d) => {
    const product = d.productId;
    const uid = d.userId?.toString?.() || d.userId;
    const u = userMap[uid] || {};
    return {
      id: d._id.toString(),
      userId: uid,
      userFullName: u.fullName || '-',
      userEmail: u.email || '-',
      productId: product?._id?.toString() || d.productId?.toString?.() || d.productId,
      productName: product?.name || 'Unknown',
      productBrand: product?.brand || '',
      quantity: d.quantity,
      totalPrice: d.totalPrice,
      status: d.status || 'pending',
      createdAt: d.createdAt
    };
  });
};
