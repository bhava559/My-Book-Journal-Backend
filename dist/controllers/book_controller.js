"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ioUpdateBook = exports.ioDeleteBook = exports.ioUpdateReadPage = exports.ioGetBookArray = exports.ioCreateBook = void 0;
const book_service_1 = require("../services/book_service");
const uuid_1 = require("uuid");
const ioCreateBook = async (req, res) => {
    try {
        const { bookName, authorName, totalPages, bookTag } = req.body;
        const bookId = (0, uuid_1.v4)();
        const book = await (0, book_service_1.createBook)(bookId, bookName, authorName, totalPages, bookTag);
        res.status(200).json({
            success: true,
            message: 'Book created or already exists',
            data: book,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};
exports.ioCreateBook = ioCreateBook;
const ioGetBookArray = async (req, res) => {
    const bookArray = await (0, book_service_1.getBookArray)();
    res.json({ success: true, data: bookArray });
};
exports.ioGetBookArray = ioGetBookArray;
const ioUpdateReadPage = async (req, res) => {
    const { bookId, userId, completedPages } = req.body;
    await (0, book_service_1.updateReadPage)(bookId, userId, completedPages);
    res.json({ success: true, message: 'Read page updated' });
};
exports.ioUpdateReadPage = ioUpdateReadPage;
const ioDeleteBook = async (req, res) => {
    const { bookId } = req.body;
    await (0, book_service_1.deleteBook)(bookId);
    res.json({ success: true, message: 'Book deleted' });
};
exports.ioDeleteBook = ioDeleteBook;
const ioUpdateBook = async (req, res) => {
    const { bookId, bookName, authorName, totalPages, bookTag } = req.body;
    await (0, book_service_1.updateBook)(bookId, bookName, authorName, totalPages, bookTag);
    res.json({ success: true, message: 'Book updated' });
};
exports.ioUpdateBook = ioUpdateBook;
