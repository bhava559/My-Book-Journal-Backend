// controllers/wishlist_controller.ts
import { Request, Response } from 'express';
import { addToWishlist, removeFromWishlist, getWishlistBooks } from '../services/wishlist_service';

export class WishlistController {
  static async ioAddToWishlist(req: Request, res: Response) {
    try {
      const { userId, bookId } = req.body;
      if (!userId) return res.status(500).json({ success: false, message: 'userId is null' });
      if (!bookId) return res.status(500).json({ success: false, message: 'bookId is null' });

      await addToWishlist(userId, bookId);
      res.json({ success: true, message: 'Book added to wishlist' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error adding to wishlist' });
    }
  }

  static async ioRemoveFromWishlist(req: Request, res: Response) {
    try {
      const { userId, bookId } = req.body;
      if (!userId) return res.status(500).json({ success: false, message: 'userId is null' });
      if (!bookId) return res.status(500).json({ success: false, message: 'bookId is null' });

      await removeFromWishlist(userId, bookId);
      res.json({ success: true, message: 'Book removed from wishlist' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error removing from wishlist' });
    }
  }

  static async ioGetWishlist(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      if (!userId) return res.status(500).json({ success: false, message: 'userId is null' });

      const books = await getWishlistBooks(userId);
      res.json({ success: true, message: 'Wishlist fetched', data: books });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching wishlist' });
    }
  }
}
