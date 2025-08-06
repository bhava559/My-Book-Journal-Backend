import { randomUUID } from 'crypto';
import mongoose from 'mongoose';

// TODO: remove required.
const wishlistSchema = new mongoose.Schema({
  wishlistId: { type: String, unique: true, default: () => randomUUID() },
  userId: { type: String },
  bookId: { type: String },
});

export const BaseWishlistModel = mongoose.model('Wishlist', wishlistSchema);

// TODO: create interface for wishlist.
export interface IWishlist {
  wishlistId?: string;
  userId: string;
  bookId: string;
}

export class WishlistModel {
  static find(_arg0: { userId: string; }) {
      throw new Error('Method not implemented.');
  }
  static deleteOne(_arg0: { userId: string; bookId: string; }) {
      throw new Error('Method not implemented.');
  }
  static async dbCreate(wishlistData: IWishlist) {
    return new BaseWishlistModel(wishlistData).save();
  }

  static async dbFind(userId: string) {
    return BaseWishlistModel.find({ userId }).lean();
  }

  static async dbFindOne(userId: string, bookId: string) {
    return BaseWishlistModel.findOne({ userId, bookId }).lean();
  }

  static async dbDelete(userId: string, bookId: string) {
    return BaseWishlistModel.deleteOne({ userId, bookId });
  }
}
