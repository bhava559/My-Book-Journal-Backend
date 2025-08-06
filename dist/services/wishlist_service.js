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
exports.getWishlistBooks = exports.removeFromWishlist = exports.addToWishlist = void 0;
const wishlist_model_1 = require("../models/wishlist_model");
const book_model_1 = require("../models/book_model");
const addToWishlist = (userId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield wishlist_model_1.WishlistModel.dbFindOne(userId, bookId);
    if (!existing) {
        yield wishlist_model_1.WishlistModel.dbAddBook(userId, bookId);
    }
});
exports.addToWishlist = addToWishlist;
const removeFromWishlist = (userId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    yield wishlist_model_1.WishlistModel.dbDelete(userId, bookId);
});
exports.removeFromWishlist = removeFromWishlist;
const getWishlistBooks = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const bookIdArray = yield wishlist_model_1.WishlistModel.dbFind(userId);
    const books = [];
    for (const bookId of bookIdArray) {
        const book = yield book_model_1.BookModel.dbFindOne(bookId);
        if (book) {
            const filteredReadPage = (book.readPage || []).filter((entry) => entry.userId === userId);
            const bookWithFilteredReadPage = Object.assign(Object.assign({}, book), { readPage: filteredReadPage });
            books.push(bookWithFilteredReadPage);
        }
    }
    return books;
});
exports.getWishlistBooks = getWishlistBooks;
