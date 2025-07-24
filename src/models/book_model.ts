import mongoose from 'mongoose';

const readPageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  completedPages: { type: Number },
});

const bookSchema = new mongoose.Schema({
  bookId: { type: String, unique: true },
  bookName: { type: String, required: true },
  authorName: { type: String },
  totalPages: { type: Number },
  bookTag: { type: String, },
  readPage: { type: [readPageSchema], default: [] },
});

export const BookModel = mongoose.model('Book', bookSchema);
