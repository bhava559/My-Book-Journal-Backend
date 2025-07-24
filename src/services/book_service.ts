import { BookModel } from '../models/book_model';

export const createBook = async (
  bookId: string,
  bookName: string,
  authorName: string,
  totalPages: number,
  bookTag: string
) => {
  let book = await BookModel.findOne({ bookId }).lean();

  if (!book) {
    const createdBook = await BookModel.create({
      bookId: bookId,
      bookName: bookName,
      authorName: authorName,
      totalPages: totalPages,
      bookTag: bookTag,
    });

    book = createdBook.toObject();

    return book;
  };
};


export const getBookArray = async () => {
 return await BookModel.find({}).lean();
};

export const updateReadPage = async (
  bookId: string,
  userId: string,
  completedPages: number
) => {
  await BookModel.updateOne(
    { bookId: bookId, 'readPage.userId': userId },
    { $set: { 'readPage.$.completedPages': completedPages } }
  );

  await BookModel.updateOne(
    { bookId: bookId, 'readPage.userId': { $ne: userId } },
    { $push: { readPage: { userId, completedPages } } }
  );
};

export const deleteBook = async (bookId: string) => {
  await BookModel.deleteOne({ bookId });
};

export const updateBook = async (
  bookId: string,
  bookName: string,
  authorName: string,
  totalPages: number,
  bookTag: string
) => {
  await BookModel.updateOne(
    { bookId },
    {
      $set: {
        bookName: bookName,
        authorName: authorName,
        totalPages: totalPages,
        bookTag: bookTag,
      },
    }
  );
};
