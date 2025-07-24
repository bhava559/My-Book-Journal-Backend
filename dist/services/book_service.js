"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBook = exports.deleteBook = exports.updateReadPage = exports.getBookArray = exports.createBook = void 0;
const book_model_1 = require("../models/book_model");
const createBook = async (bookId, bookName, authorName, totalPages, bookTag) => {
    let book = await book_model_1.BookModel.findOne({ bookId }).lean();
    if (!book) {
        const createdBook = await book_model_1.BookModel.create({
            bookId: bookId,
            bookName: bookName,
            authorName: authorName,
            totalPages: totalPages,
            bookTag: bookTag,
        });
        book = createdBook.toObject();
        return book;
    }
    ;
};
exports.createBook = createBook;
const getBookArray = async () => {
    return await book_model_1.BookModel.find({}).lean();
};
exports.getBookArray = getBookArray;
const updateReadPage = async (bookId, userId, completedPages) => {
    await book_model_1.BookModel.updateOne({ bookId: bookId, 'readPage.userId': userId }, { $set: { 'readPage.$.completedPages': completedPages } });
    await book_model_1.BookModel.updateOne({ bookId: bookId, 'readPage.userId': { $ne: userId } }, { $push: { readPage: { userId, completedPages } } });
};
exports.updateReadPage = updateReadPage;
const deleteBook = async (bookId) => {
    await book_model_1.BookModel.deleteOne({ bookId });
};
exports.deleteBook = deleteBook;
const updateBook = async (bookId, bookName, authorName, totalPages, bookTag) => {
    await book_model_1.BookModel.updateOne({ bookId }, {
        $set: {
            bookName: bookName,
            authorName: authorName,
            totalPages: totalPages,
            bookTag: bookTag,
        },
    });
};
exports.updateBook = updateBook;
