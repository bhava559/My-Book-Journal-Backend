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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistController = void 0;
const wishlist_service_1 = require("../services/wishlist_service");
class WishlistController {
    static ioAddToWishlist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, bookId } = req.body;
                if (!userId) {
                    return res.status(500).json({ success: false, message: 'userId is null' });
                }
                if (!bookId) {
                    return res.status(500).json({ success: false, message: 'bookId is null' });
                }
                yield (0, wishlist_service_1.addToWishlist)(userId, bookId);
                res.json({ success: true, message: 'Book added to wishlist' });
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error adding to wishlist' });
            }
        });
    }
    static ioRemoveFromWishlist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, bookId } = req.body;
                if (!userId) {
                    return res.status(500).json({ success: false, message: 'userId is null' });
                }
                if (!bookId) {
                    return res.status(500).json({ success: false, message: 'bookId is null' });
                }
                yield (0, wishlist_service_1.removeFromWishlist)(userId, bookId);
                res.json({ success: true, message: 'Book removed from wishlist' });
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error removing from wishlist' });
            }
        });
    }
    static ioGetWishlist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.body;
                if (!userId) {
                    return res.status(500).json({ success: false, message: 'userId is null' });
                }
                const books = yield (0, wishlist_service_1.getWishlistBooks)(userId);
                res.json({ success: true, message: 'Wishlist fetched', data: books });
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error fetching wishlist' });
            }
        });
    }
}
exports.WishlistController = WishlistController;
