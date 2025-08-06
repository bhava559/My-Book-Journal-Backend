import { WishlistModel } from '../models/wishlist_model';
import { BookModel, IBook } from '../models/book_model';

export const addToWishlist = async (userId: string, bookId: string) => {
  const existing = await WishlistModel.dbFindOne(userId, bookId);

  if (!existing) {
    await WishlistModel.dbAddBook(userId, bookId);
  }
};

export const removeFromWishlist = async (userId: string, bookId: string) => {
  await WishlistModel.dbDelete(userId, bookId);
};

export const getWishlistBooks = async (userId: string): Promise<IBook[]> => {
  const bookIdArray = await WishlistModel.dbFind(userId);

  const books: IBook[] = [];

  for (const bookId of bookIdArray) {
    const book = await BookModel.dbFindOne(bookId);

    if (book) {
      const filteredReadPage = (book.readPage || []).filter((entry) => entry.userId === userId);

      const bookWithFilteredReadPage: IBook = {
        ...book,
        readPage: filteredReadPage,
      };

      books.push(bookWithFilteredReadPage);
    }
  }

  return books;
};