import { Request, Response } from 'express';
import {
  createBook,
  getBookArray,
  updateReadPage,
  deleteBook,
  updateBook,
} from '../services/book_service';
import { v4 as uuidv4 } from 'uuid';

export const ioCreateBook = async (req: Request, res: Response) => {
  try {
    const { bookName, authorName, totalPages, bookTag } = req.body;

    const bookId = uuidv4();
    const book = await createBook(bookId, bookName, authorName, totalPages, bookTag);

    res.status(200).json({
      success: true,
      message: 'Book created or already exists',
      data: book,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

export const ioGetBookArray = async (req: Request, res: Response) => {
  const bookArray = await getBookArray();
  res.json({ success: true, data: bookArray });
};

export const ioUpdateReadPage = async (req: Request, res: Response) => {
  const { bookId, userId, completedPages } = req.body;

  await updateReadPage(bookId, userId, completedPages);
  res.json({ success: true, message: 'Read page updated' });
};

export const ioDeleteBook = async (req: Request, res: Response) => {
  const { bookId } = req.body;

  await deleteBook(bookId);
  res.json({ success: true, message: 'Book deleted' });
};

export const ioUpdateBook = async (req: Request, res: Response) => {
  const { bookId, bookName, authorName, totalPages, bookTag } = req.body;

  await updateBook(bookId, bookName, authorName, totalPages, bookTag);
  res.json({ success: true, message: 'Book updated' });
};
