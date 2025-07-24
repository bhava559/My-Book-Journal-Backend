"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const readPageSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    completedPages: { type: Number },
});
const bookSchema = new mongoose_1.default.Schema({
    bookId: { type: String, unique: true },
    bookName: { type: String, required: true },
    authorName: { type: String },
    totalPages: { type: Number },
    bookTag: { type: String, },
    readPage: { type: [readPageSchema], default: [] },
});
exports.BookModel = mongoose_1.default.model('Book', bookSchema);
