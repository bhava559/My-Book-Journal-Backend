import { BookModel, IBook } from '../models/book_model';

export const createBook = async (book: IBook) => {
  const existing = await BookModel.dbFindOne(book.bookId);
  if (!existing) {
    return await BookModel.dbCreate(book);
  }
  return existing;
};

export const getBookArray = async () => {
  return await BookModel.dbFindAll();
};

export const getBookByIdService = async (data: any) => {
  return await BookModel.dbFindOne(data);
}

export const updateBookService = async (data: any) => {
  return await BookModel.dbUpdate(data);
};

export const deleteBookService = async (data: any) => {
  return await BookModel.dbDelete(data.bookId);
};

export const updateReadPagesService = async (
  bookId: string,
  userId: string,
  completedPages: number
) => {
  const book = await BookModel.dbFindOne(bookId);
  if (!book) throw new Error('Book not found');

  const readPages = book.readPage || [];

  const existingEntryIndex = readPages.findIndex((entry) => entry.userId === userId);

  if (existingEntryIndex !== -1) {
    readPages[existingEntryIndex].completedPages = completedPages;
  }

  if (existingEntryIndex === -1) {
    readPages.push({ userId, completedPages });
  }

  return await BookModel.dbUpdateReadPages(
    bookId,
    readPages.map((entry) => ({
      userId: entry.userId,
      completedPages: entry.completedPages || 0, // or handle default
    }))
  );
};

