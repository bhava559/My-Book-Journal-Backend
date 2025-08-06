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
exports.updateReadPagesService = exports.deleteBookService = exports.updateBookService = exports.getBookByIdService = exports.getBookArray = exports.createBook = void 0;
const book_model_1 = require("../models/book_model");
const createBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield book_model_1.BookModel.dbFindOne(book.bookId);
    if (!existing) {
        return yield book_model_1.BookModel.dbCreate(book);
    }
    return existing;
});
exports.createBook = createBook;
const getBookArray = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield book_model_1.BookModel.dbFindAll();
});
exports.getBookArray = getBookArray;
const getBookByIdService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield book_model_1.BookModel.dbFindOne(data);
});
exports.getBookByIdService = getBookByIdService;
const updateBookService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield book_model_1.BookModel.dbUpdate(data);
});
exports.updateBookService = updateBookService;
const deleteBookService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield book_model_1.BookModel.dbDelete(data.bookId);
});
exports.deleteBookService = deleteBookService;
const updateReadPagesService = (bookId, userId, completedPages) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.BookModel.dbFindOne(bookId);
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
    return yield book_model_1.BookModel.dbUpdateReadPages(bookId, readPages.map((entry) => ({
        userId: entry.userId,
        completedPages: entry.completedPages || 0, // or handle default
    })));
});
exports.updateReadPagesService = updateReadPagesService;
