"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const uuid_1 = require("uuid");
const book_service_1 = require("../services/book_service");
class BookController {
    static async ioCreateBook(req, res) {
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
            const created = await (0, book_service_1.createBook)(bookData);
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
    }
    static async ioGetBookArray(req, res) {
        try {
            const bookArray = await (0, book_service_1.getBookArray)();
            res.json({ success: true, data: bookArray, currentUserId: req.body.currentUser.userId });
        }
        catch (err) {
            res.status(500).json({ success: false, message: 'Error fetching books' });
        }
    }
    static async ioUpdateBook(req, res) {
        try {
            const result = await (0, book_service_1.updateBookService)(req.body);
            res.status(200).json({ success: true, data: result });
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Error updating book' });
        }
    }
    static async ioDeleteBook(req, res) {
        try {
            const result = await (0, book_service_1.deleteBookService)(req.body);
            res.status(200).json({ success: true, data: result });
        }
        catch (error) {
            res.status(500).json({ success: false, message: 'Error deleting book' });
        }
    }
    static async ioUpdateReadPages(req, res) {
        try {
            const { bookId, completedPages } = req.body;
            const user = req.body.currentUser;
            if (!bookId) {
                return res.status(400).json({ success: false, message: 'Missing bookId' });
            }
            if (completedPages == null) {
                return res.status(400).json({ success: false, message: 'Missing completedPages' });
            }
            const updatedBook = await (0, book_service_1.updateReadPagesService)(bookId, user.userId, completedPages);
            res.status(200).json({ success: true, data: updatedBook });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Error updating read pages' });
        }
    }
}
exports.BookController = BookController;
