import { User } from './models/index.js';

export const registerUser = async (user) => {
  const { id: _omit, ...rest } = user;  // eslint-disable-line no-unused-vars
  const doc = await User.create(rest);
  return {
    id: doc._id.toString(),
    email: doc.email,
    fullName: doc.fullName,
    role: doc.role || 'user',
    createdAt: doc.createdAt
  };
};

export const getUserByEmail = async (email) => {
  const doc = await User.findOne({ email: email?.toLowerCase?.() || email });
  if (!doc) return null;
  return doc;
};

export const getUserById = async (id) => {
  const doc = await User.findById(id).select('-password');
  if (!doc) return null;
  return {
    id: doc._id.toString(),
    email: doc.email,
    fullName: doc.fullName,
    role: doc.role || 'user',
    createdAt: doc.createdAt
  };
};

export const getAllUsers = async () => {
  const docs = await User.find().select('-password').lean();
  return docs.map((d) => ({
    id: d._id.toString(),
    email: d.email,
    fullName: d.fullName,
    role: d.role || 'user',
    createdAt: d.createdAt
  }));
};
