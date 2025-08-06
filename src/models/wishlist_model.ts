import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  bookIdArray: [{ type: String }],
});

export const BaseWishlistModel = mongoose.model('Wishlist', wishlistSchema);

export interface IWishlist {
  userId: string;
  bookIdArray: string[];
}

export class WishlistModel {
  static find(_arg0: { userId: string; }) {
      throw new Error('Method not implemented.');
  }
  static deleteOne(_arg0: { userId: string; bookId: string; }) {
      throw new Error('Method not implemented.');
  }

  // Create new wishlist for user with first book
  static async dbCreate(userId: string, bookId: string) {
    return new BaseWishlistModel({ userId, bookIds: [bookId] }).save();
  }

  // Get user's complete wishlist
  static async dbFind(userId: string) {
    const wishlist = await BaseWishlistModel.findOne({ userId }).lean();
    if (wishlist) {
      return wishlist.bookIdArray;
    }
    return [];
  }

  // Check if specific book exists in user's wishlist
  static async dbFindOne(userId: string, bookId: string) {
    const wishlist = await BaseWishlistModel.findOne({ 
      userId, 
      bookIdArray: { $in: [bookId] } 
    }).lean();
    if (wishlist) {
      return true;
    }
    return false;
  }

  // Add book to user's wishlist (creates wishlist if doesn't exist)
  static async dbAddBook(userId: string, bookId: string) {
    return BaseWishlistModel.findOneAndUpdate(
      { userId },
      { $addToSet: { bookIdArray: bookId } },
      { upsert: true, new: true }
    );
  }

  // Remove specific book from user's wishlist
  static async dbDelete(userId: string, bookId: string) {
    return BaseWishlistModel.findOneAndUpdate(
      { userId },
      { $pull: { bookIdArray: bookId } },
      { new: true }
    );
  }

  // Remove entire wishlist for user
  static async dbDeleteUserWishlist(userId: string) {
    return BaseWishlistModel.deleteOne({ userId });
  }
}