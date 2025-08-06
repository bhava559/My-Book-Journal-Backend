"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReadPagesService = exports.deleteBookService = exports.updateBookService = exports.getBookArray = exports.createBook = void 0;
const book_model_1 = require("../models/book_model");
const createBook = async (book) => {
    const existing = await book_model_1.BookModel.dbFindOne(book.bookId);
    if (!existing) {
        return await book_model_1.BookModel.dbCreate(book);
    }
    return existing;
};
exports.createBook = createBook;
const getBookArray = async () => {
    return await book_model_1.BookModel.dbFindAll();
};
exports.getBookArray = getBookArray;
const updateBookService = async (data) => {
    return await book_model_1.BookModel.dbUpdate(data);
};
exports.updateBookService = updateBookService;
const deleteBookService = async (data) => {
    return await book_model_1.BookModel.dbDelete(data.bookId);
};
exports.deleteBookService = deleteBookService;
const updateReadPagesService = async (bookId, userId, completedPages) => {
    const book = await book_model_1.BookModel.dbFindOne(bookId);
    if (!book)
        throw new Error('Book not found');
    const readPages = book.readPage || [];
    const existingEntryIndex = readPages.findIndex((entry) => entry.userId === userId);
    if (existingEntryIndex !== -1) {
        readPages[existingEntryIndex].completedPages = completedPages;
    }
    if (existingEntryIndex === -1) {
        readPages.push({ userId, completedPages });
    }
    return await book_model_1.BookModel.dbUpdateReadPages(bookId, readPages.map((entry) => ({
        userId: entry.userId,
        completedPages: entry.completedPages || 0, // or handle default
    })));
};
exports.updateReadPagesService = updateReadPagesService;
