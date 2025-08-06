"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistModel = exports.BaseWishlistModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const wishlistSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true, unique: true },
    bookIdArray: [{ type: String }],
});
exports.BaseWishlistModel = mongoose_1.default.model('Wishlist', wishlistSchema);
class WishlistModel {
    static find(_arg0) {
        throw new Error('Method not implemented.');
    }
    static deleteOne(_arg0) {
        throw new Error('Method not implemented.');
    }
    // Create new wishlist for user with first book
    static dbCreate(userId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new exports.BaseWishlistModel({ userId, bookIds: [bookId] }).save();
        });
    }
    // Get user's complete wishlist
    static dbFind(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const wishlist = yield exports.BaseWishlistModel.findOne({ userId }).lean();
            if (wishlist) {
                return wishlist.bookIdArray;
            }
            return [];
        });
    }
    // Check if specific book exists in user's wishlist
    static dbFindOne(userId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const wishlist = yield exports.BaseWishlistModel.findOne({
                userId,
                bookIdArray: { $in: [bookId] }
            }).lean();
            if (wishlist) {
                return true;
            }
            return false;
        });
    }
    // Add book to user's wishlist (creates wishlist if doesn't exist)
    static dbAddBook(userId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.BaseWishlistModel.findOneAndUpdate({ userId }, { $addToSet: { bookIdArray: bookId } }, { upsert: true, new: true });
        });
    }
    // Remove specific book from user's wishlist
    static dbDelete(userId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.BaseWishlistModel.findOneAndUpdate({ userId }, { $pull: { bookIdArray: bookId } }, { new: true });
        });
    }
    // Remove entire wishlist for user
    static dbDeleteUserWishlist(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.BaseWishlistModel.deleteOne({ userId });
        });
    }
}
exports.WishlistModel = WishlistModel;
