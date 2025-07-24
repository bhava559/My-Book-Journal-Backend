import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, default: '' },
  roleArray: { type: [String], default: ['user'] },
  token: { type: String, default: '' },
});

export const UserModel = mongoose.model('User', userSchema);
