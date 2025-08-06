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
exports.BookController = void 0;
const uuid_1 = require("uuid");
const book_service_1 = require("../services/book_service");
class BookController {
    static ioCreateBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { bookName, authorName, description, thumbnail, totalPages, bookTag } = req.body;
                const bookData = {
                    bookId: (0, uuid_1.v4)(),
                    bookName,
                    authorName,
                    description,
                    thumbnail,
                    totalPages,
                    bookTag,
                    readPage: [],
                };
                const created = yield (0, book_service_1.createBook)(bookData);
                res.status(200).json({
                    success: true,
                    message: 'Book created or already exists',
                    data: created,
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ success: false, message: 'Server error' });
            }
        });
    }
    static ioGetBookArray(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Fetching books for user:", req.body.currentUser);
                const bookArray = yield (0, book_service_1.getBookArray)();
                res.json({ success: true, data: bookArray, currentUserId: req.body.currentUser.userId });
            }
            catch (err) {
                res.status(500).json({ success: false, message: 'Error fetching books' });
            }
        });
    }
    static ioGetBookById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { bookId } = req.body;
                // console.log('📥 Received bookId:', bookId);
                if (!bookId) {
                    return res.status(400).json({ success: false, message: 'Missing bookId' });
                }
                const book = yield (0, book_service_1.getBookByIdService)(bookId);
                if (!book) {
                    return res.status(404).json({ success: false, message: 'Book not found' });
                }
                res.status(200).json({ success: true, data: book });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: 'Error fetching book by ID' });
            }
        });
    }
    static ioUpdateBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, book_service_1.updateBookService)(req.body);
                res.status(200).json({ success: true, data: result });
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error updating book' });
            }
        });
    }
    static ioDeleteBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, book_service_1.deleteBookService)(req.body);
                res.status(200).json({ success: true, data: result });
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error deleting book' });
            }
        });
    }
    static ioUpdateReadPages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { bookId, completedPages } = req.body;
                const user = req.body.currentUser;
                if (!bookId) {
                    return res.status(400).json({ success: false, message: 'Missing bookId' });
                }
                if (completedPages == null) {
                    return res.status(400).json({ success: false, message: 'Missing completedPages' });
                }
                const updatedBook = yield (0, book_service_1.updateReadPagesService)(bookId, user.userId, completedPages);
                res.status(200).json({ success: true, data: updatedBook });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ success: false, message: 'Error updating read pages' });
            }
        });
    }
}
exports.BookController = BookController;
