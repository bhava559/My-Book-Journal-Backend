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
exports.BookModel = exports.BaseBookModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const readPageSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    completedPages: { type: Number },
});
const bookSchema = new mongoose_1.default.Schema({
    bookId: { type: String, required: true, unique: true },
    bookName: { type: String, required: true },
    authorName: { type: [String] },
    totalPages: { type: Number },
    bookTag: { type: String },
    description: { type: String },
    thumbnail: { type: String },
    readPage: { type: [readPageSchema], default: [] },
});
exports.BaseBookModel = mongoose_1.default.model('Book', bookSchema);
class BookModel {
    static dbFindOne(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.BaseBookModel.findOne({ bookId }).lean();
        });
    }
    static dbCreate(book) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield exports.BaseBookModel.create(book)).toObject();
        });
    }
    static dbFindAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.BaseBookModel.find({}).lean();
        });
    }
    static dbUpdate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.BaseBookModel.updateOne({ bookId: data.bookId }, {
                $set: {
                    bookName: data.bookName,
                    authorName: data.authorName,
                    totalPages: data.totalPages,
                    description: data.description,
                    thumbnail: data.thumbnail,
                },
            });
        });
    }
    static dbDelete(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.BaseBookModel.deleteOne({ bookId });
        });
    }
    static dbUpdateReadPages(bookId, readPage) {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.BaseBookModel.updateOne({ bookId }, { $set: { readPage } });
        });
    }
}
exports.BookModel = BookModel;
