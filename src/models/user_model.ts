import { randomUUID } from 'crypto';
import mongoose from 'mongoose';

//TODO: remove required.
const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true, default: () => randomUUID() },
  email: { type: String },
  name: { type: String },
  image: { type: String, default: '' },
  roleArray: { type: [String], default: ['user'] },
  token: { type: String, default: '' },
});

export const BaseModel = mongoose.model('User', userSchema);

//TODO: create interface for user.
export interface IUser {
  userId?: string;
  email: string;
  name: string;
  image: string;
  roleArray?: string[];
  token: string;
}

export class UserModel {
  static async dbFindOne(email: string) {
    return BaseModel.findOne({ email }).lean();
  }

  static async dbFindOneAndUpdate(user: IUser) {
    return BaseModel.findOneAndUpdate(
      { email: user.email },
      { $set: user },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean(); //TODO study this and modify this.
  }
}
