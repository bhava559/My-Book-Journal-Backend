"use strict";
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
    description: { type: String }, // ✅ NEW FIELD
    thumbnail: { type: String }, // ✅ NEW FIELD
    readPage: { type: [readPageSchema], default: [] },
});
exports.BaseBookModel = mongoose_1.default.model('Book', bookSchema);
class BookModel {
    static async dbFindOne(bookId) {
        return exports.BaseBookModel.findOne({ bookId }).lean();
    }
    static async dbCreate(book) {
        return (await exports.BaseBookModel.create(book)).toObject();
    }
    static async dbFindAll() {
        const result = await exports.BaseBookModel.find({}).lean();
        console.log("Books found in DB:", result.length);
        return result;
        // return BaseBookModel.find({}).lean();
    }
    static async dbUpdate(data) {
        return exports.BaseBookModel.updateOne({ bookId: data.bookId }, {
            $set: {
                bookName: data.bookName,
                authorName: data.authorName,
                totalPages: data.totalPages,
                description: data.description, // ✅ UPDATE FIELD
                thumbnail: data.thumbnail, // ✅ UPDATE FIELD
            },
        });
    }
    static async dbDelete(bookId) {
        return exports.BaseBookModel.deleteOne({ bookId });
    }
    static async dbUpdateReadPages(bookId, readPage) {
        return exports.BaseBookModel.updateOne({ bookId }, { $set: { readPage } });
    }
}
exports.BookModel = BookModel;
