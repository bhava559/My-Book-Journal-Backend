import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { createBook, deleteBookService, getBookArray, getBookByIdService, updateBookService, updateReadPagesService } from '../services/book_service';
import { IBook } from '../models/book_model';

export class BookController {
  static async ioCreateBook(req: Request, res: Response) {
    try {
      const { bookName, authorName, description, thumbnail, totalPages, bookTag } = req.body;

      const bookData: IBook = {
        bookId: uuidv4(),
        bookName,
        authorName,
        description,
        thumbnail,
        totalPages,
        bookTag,
        readPage: [],
      };

      const created = await createBook(bookData);

      res.status(200).json({
        success: true,
        message: 'Book created or already exists',
        data: created,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  static async ioGetBookArray(req: Request, res: Response) {
    try {
      console.log("Fetching books for user:", req.body.currentUser);
      const bookArray = await getBookArray();
      res.json({ success: true, data: bookArray, currentUserId: req.body.currentUser.userId });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error fetching books' });
    }
  }

  static async ioGetBookById(req: Request, res: Response) {
  try {
    const { bookId } = req.body;
    // console.log('📥 Received bookId:', bookId);

    if (!bookId) {
      return res.status(400).json({ success: false, message: 'Missing bookId' });
    }

    const book = await getBookByIdService(bookId);

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching book by ID' });
  }
}


  static async ioUpdateBook(req: Request, res: Response) {
    try {
      const result = await updateBookService(req.body);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error updating book' });
    }
  }

  static async ioDeleteBook(req: Request, res: Response) {
    try {
      const result = await deleteBookService(req.body);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error deleting book' });
    }
  }

  static async ioUpdateReadPages(req: Request, res: Response) {
    try {
      const { bookId, completedPages } = req.body;
      const user = req.body.currentUser;

      if (!bookId) {
        return res.status(400).json({ success: false, message: 'Missing bookId' });
      }
      if (completedPages == null) {
        return res.status(400).json({ success: false, message: 'Missing completedPages' });
      }

      const updatedBook = await updateReadPagesService(bookId, user.userId, completedPages);

      res.status(200).json({ success: true, data: updatedBook });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Error updating read pages' });
    }
  }


}
