import mongoose from 'mongoose';

const readPageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  completedPages: { type: Number },
});

const bookSchema = new mongoose.Schema({
  bookId: { type: String, required: true, unique: true },
  bookName: { type: String, required: true },
  authorName: { type: [String] },
  totalPages: { type: Number },
  bookTag: { type: String },
  description: { type: String },              
  thumbnail: { type: String },                
  readPage: { type: [readPageSchema], default: [] },
});

export const BaseBookModel = mongoose.model('Book', bookSchema);

export interface IBook {
  bookId: string;
  bookName: string;
  authorName?: string[];
  totalPages?: number;
  bookTag?: string;
  description?: string;          
  thumbnail?: string;           
  readPage?: {
    userId: string;
    completedPages?: number;
  }[];
}

export class BookModel {
  static async dbFindOne(bookId: string) {
    return BaseBookModel.findOne({ bookId }).lean();
  }

  static async dbCreate(book: IBook) {
    return (await BaseBookModel.create(book)).toObject();
  }

  static async dbFindAll(): Promise<IBook[]> {
    return BaseBookModel.find({}).lean();
  }

  static async dbUpdate(data: any): Promise<any> {
    return BaseBookModel.updateOne(
      { bookId: data.bookId },
      {
        $set: {
          bookName: data.bookName,
          authorName: data.authorName,
          totalPages: data.totalPages,
          description: data.description,         
          thumbnail: data.thumbnail,             
        },
      }
    );
  }

  static async dbDelete(bookId: string): Promise<any> {
    return BaseBookModel.deleteOne({ bookId });
  }

  static async dbUpdateReadPages(bookId: string, readPage: { userId: string; completedPages: number }[]) {
    return BaseBookModel.updateOne(
      { bookId },
      { $set: { readPage } }
    );
  }
}
